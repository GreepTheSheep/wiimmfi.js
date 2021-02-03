const fetch = require('node-fetch')
const url = require('./httpOptions.js')

class CTGP {
    constructor(){
        this.url = `${url.protocol}://${url.host}`
    }

    /**
     * Simplify links return
     * @private
     */
    async _getLinks(){
        const data = await this._getData("index")
        var links = {}

        Object.entries(data).forEach(entry => {
            const [key, value] = entry;

            links[key] = value.href
        });

        return links
    }

    /**
     * Gets data from this.url
     * @private
     */
    async _getData(link){
        if (!link || link == "index") {
            const r = await fetch(this.url + `/${url.index}`)
            const json = await r.json()
            return json
        } else {
            var links = await this._getLinks()
            var seletedLink = links.link
            if (!seletedLink) throw 'Bad link name, check index'
            else {
                const r = await fetch(this.url + seletedLink)
                const json = await r.json()
                return json
            }
        }
    }
}

module.exports = CTGP