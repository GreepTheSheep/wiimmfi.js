const fetch = require('node-fetch')
const url = require('./httpOptions.js')
const {EventEmitter} = require('events')

class CTGP extends EventEmitter{
    /**
     * Leaderboard for CTGP-R (https://chadsoft.co.uk/time-trials/)
     * @param {object} options Options for CTGP-R Leaderboard
     * @param {boolean} options.cache Default: true, enables caching at start
     * @param {boolean} options.autoCache Default: true, refresh caches, this uses setInterval, this works if options.cache is true
     * @param {number} options.autoCacheRefresh Default: 2, The delay in minutes to refresh the cache, if options.autoCache is true
     */
    constructor(options = {
        cache: true,
        autoCache: true,
        autoCacheRefresh: 2
    }){
        super()

        this.options = options
        this.url = `${url.protocol}://${url.host}`

        /**@private*/
        this.cache = {}

        if (options.cache) this._startCache()
        if (options.cache && options.autoCache) this._autoCache(options.autoCacheRefresh)
    }

    /**
     * Simplify links return
     * @returns {object} All links with their key
     */
    async getLinks(){
        const data = await this._getData("index")
        var links = {}

        Object.entries(data._links).forEach(entry => {
            const [key, value] = entry;

            if (key == 'self') links['index'] = this.url + value.href
            else links[key] = this.url + value.href
        });

        return links
    }

    /** 
     * Gets player data
     * @param {string} playerName The player (mii) name
     */
    async getPlayer(playerName){
        if (this.cache['players'] == null || !this.cache['players']){
            if (!this.options.cache) {
                this.cache['players'] = await this._getData('players')
                if (!this.cache['players'].players.some(p=>p.miiName == playerName)) throw 'Player not found'
                return this.cache['players'].players.find(p=>p.miiName == playerName)
            }
            else {
                var players = await this._getData('players')
                if (!players.players.some(p=>p.miiName == playerName)) throw 'Player not found'
                return players.players.find(p=>p.miiName == playerName)
            }
        } else return this.cache['players'].players.find(p=>p.miiName == playerName)
    }

    /**
     * Gets Leaserboard from the player
     * @param {object} player The player from getPlayer()
     * @returns {Promise<Object>} 
     */
    async getPlayerLeaderboard(player){
        if (!this.cache.leaderboards) this.cache.leaderboards = {}
        if (this.cache.leaderboards[player.playerId] == null || !this.cache.leaderboards[player.playerId]){
            if (!this.options.cache) {
                this.cache.leaderboards[player.playerId] = await fetch(this.url + player._links.item.href).then(r=>r.text()).then(text=>JSON.parse(text.substring(1)))
                return this.cache.leaderboards[player.playerId]
            }
            else return await fetch(this.url + player._links.item.href).then(r=>r.text()).then(text=>JSON.parse(text.substring(1)))
        } else return this.cache.leaderboards[player.playerId]
    }

    /**
     * Gets simplifed data for a specific track
     * @param {string} trackName The track Name or track ID (that can be found at https://chadsoft.co.uk/time-trials/leaderboards.html)
     * @param {string} category Optional: The category ID ("Shortcut", "Glitch", "No-shortcut"), defaults to "no-shortcut"
     * @returns {Promise<Object>} Track info
     */
    async getTrack(trackName, category = "no-shortcut"){
        var categoryId
        if (category.toLowerCase() == "shortcut") categoryId = 16
        else if (category.toLowerCase() == "glitch") categoryId = 1
        else if (category.toLowerCase() == "no-shortcut") categoryId = 2
        else throw "Category not found"

        if (this.cache['original-tracks'] == null || !this.cache['original-tracks']){
            if (!this.options.cache) {
                this.cache['original-tracks'] = await this._getData('original-tracks')
                if (!this.cache['original-tracks'].leaderboards.some(p=>(p.name == trackName || p.trackId == trackName))) throw 'Track not found'
                var track = this.cache['original-tracks'].leaderboards.filter(p=>(p.name == trackName || p.trackId == trackName))
                if (categoryId != undefined) return track.find(t=>t.categoryId == categoryId)
                else return track
            }
            else {
                var leaderboards = await this._getData('original-tracks')
                if (!leaderboards.leaderboards.some(p=>(p.name == trackName || p.trackId == trackName))) throw 'Track not found'
                // eslint-disable-next-line no-redeclare
                var track = leaderboards.leaderboards.filter(p=>(p.name == trackName || p.trackId == trackName))
                if (categoryId != undefined) return track.find(t=>t.categoryId == categoryId)
                else return track
            }
        } else {
            if (!this.cache['original-tracks'].leaderboards.some(p=>(p.name == trackName || p.trackId == trackName))) throw 'Track not found'
            // eslint-disable-next-line no-redeclare
            var track = this.cache['original-tracks'].leaderboards.filter(p=>(p.name == trackName || p.trackId == trackName))
            if (categoryId != undefined) return track.find(t=>t.categoryId == categoryId)
            else return track
        }
    }

    /**
     * Gets full leaderboard
     * @param {object} track The data from getTrack()
     * @returns {Promise<Object>} The full leaderboard
     * @example
     * var track = await CTGP.getLeaderboard(await CTGP.getTrack('Mushroom Gorge'))
     */
    async getLeaderboard(track){
        if (!this.cache.trackLeaderboards) this.cache.trackLeaderboards = {}
        if (this.cache.trackLeaderboards[track.trackId] == null || !this.cache.trackLeaderboards[track.trackId]){
            if (!this.options.cache) {
                this.cache.trackLeaderboards[track.trackId] = await fetch(this.url + track._links.item.href).then(r=>r.json())
                return this.cache.trackLeaderboards[track.trackId]
            }
            else return await fetch(this.url + track._links.item.href).then(r=>r.json())
        } else return this.cache.trackLeaderboards[track.trackId]
    }

    /**
     * Gets simplifed data for a specific track (200cc category)
     * @param {string} trackName The track Name or track ID (that can be found at https://chadsoft.co.uk/time-trials/leaderboards-200cc.html)
     * @param {string} category Optional: The category ID ("Shortcut", "Glitch", "No-shortcut"), defaults to "no-shortcut"
     * @returns {Promise<Object>} Track info
     */
    async getTrack200cc(trackName, category = "no-shortcut"){
        var categoryId
        if (category.toLowerCase() == "shortcut") categoryId = 16
        else if (category.toLowerCase() == "glitch") categoryId = 1
        else if (category.toLowerCase() == "no-shortcut") categoryId = 2
        else throw "Category not found"

        if (this.cache['original-tracks-200cc'] == null || !this.cache['original-tracks-200cc']){
            if (!this.options.cache) {
                this.cache['original-tracks-200cc'] = await this._getData('original-tracks-200cc')
                if (!this.cache['original-tracks-200cc'].leaderboards.some(p=>(p.name == trackName || p.trackId == trackName))) throw 'Track not found'
                var track = this.cache['original-tracks-200cc'].leaderboards.filter(p=>(p.name == trackName || p.trackId == trackName))
                if (categoryId != undefined) return track.find(t=>t.categoryId == categoryId)
                else return track
            }
            else {
                var leaderboards = await this._getData('original-tracks-200cc')
                if (!leaderboards.leaderboards.some(p=>(p.name == trackName || p.trackId == trackName))) throw 'Track not found'
                // eslint-disable-next-line no-redeclare
                var track = leaderboards.leaderboards.filter(p=>(p.name == trackName || p.trackId == trackName))
                if (categoryId != undefined) return track.find(t=>t.categoryId == categoryId)
                else return track
            }
        } else {
            if (!this.cache['original-tracks-200cc'].leaderboards.some(p=>(p.name == trackName || p.trackId == trackName))) throw 'Track not found'
            // eslint-disable-next-line no-redeclare
            var track = this.cache['original-tracks-200cc'].leaderboards.filter(p=>(p.name == trackName || p.trackId == trackName))
            if (categoryId != undefined) return track.find(t=>t.categoryId == categoryId)
            else return track
        }
    }

    /**
     * Gets full leaderboard (200cc category)
     * @param {object} track The data from getTrack200cc()
     * @returns {Promise<Object>} The full leaderboard
     * @example
     * var track = await CTGP.getLeaderboard200cc(await CTGP.getTrack200cc('Mushroom Gorge'))
     */
    async getLeaderboard200cc(track){
        if (!this.cache.trackLeaderboards200) this.cache.trackLeaderboards200 = {}
        if (this.cache.trackLeaderboards200[track.trackId] == null || !this.cache.trackLeaderboards200[track.trackId]){
            if (!this.options.cache) {
                this.cache.trackLeaderboards200[track.trackId] = await fetch(this.url + track._links.item.href).then(r=>r.json())
                return this.cache.trackLeaderboards[track.trackId]
            }
            else return await fetch(this.url + track._links.item.href).then(r=>r.json())
        } else return this.cache.trackLeaderboards200[track.trackId]
    }

    /**
     * Gets data from this.url
     * @returns {object} RAW JSON for this API
     * @private
     */
    async _getData(link = "index"){
        if (link == "index") return await fetch(this.url + `/${url.index}`).then(r=>r.text()).then(text=>JSON.parse(text.substring(1)))
        else {
            var links = await this.getLinks()
            var seletedLink = links[link]
            if (!seletedLink) throw 'Bad link name, check index'
            if (this.cache[link] == null || !this.cache[link]){
                if (!this.options.cache) {
                    this.cache[link] = await fetch(seletedLink).then(r=>r.text()).then(text=>JSON.parse(text.substring(1)))
                    return this.cache[link]
                }
                else return await fetch(seletedLink).then(r=>r.text()).then(text=>JSON.parse(text.substring(1)))
            }
            else return this.cache[link]
        }
    }

    /**
     * Start caching all main links
     * @private
     */
    async _startCache(){
        var links = await this.getLinks()
        Object.entries(links).forEach(async entry => {
            const [key] = entry;
            this.emit('debug', '[Cache] Starting caching for ' + key)
            this.cache[key] = null
            const data = await this._getData(key)
            this.cache[key] = data
            this.emit('cacheUpdate', key, data)
            this.emit('debug', '[Cache] Caching successful for ' + key)
        });
    }

    /**
     * Auto-caching all main links method
     * @param {number} refreshTimeMin The delay to refresh in minutes
     * @private 
     */
    async _autoCache(refreshTimeMin){
        var links = await this.getLinks()
        Object.entries(links).forEach(async entry => {
            const [key] = entry;
            setInterval(async ()=>{
                this.emit('debug', '[Cache] Starting caching for ' + key)
                const data = await this._getData(key)
                this.cache[key] = data
                this.emit('cacheUpdate', key, data)
                this.emit('debug', '[Cache] Caching successful for ' + key)
            }, refreshTimeMin*60*1000)
        });
    }
}

module.exports = CTGP