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

        Object.entries(data._links).forEach(entry => {
            const [key, value] = entry;

            if (key == 'self') links['index'] = this.url + value.href
            else links[key] = this.url + value.href
        });

        return links
    }

    /**
     * Gets data from this.url
     * @private
     */
    async _getData(link = "index"){
        if (link == "index") return await fetch(this.url + `/${url.index}`).then(r=>r.text()).then(text=>JSON.parse(text.substring(1)))
        else {
            var links = await this._getLinks()
            var seletedLink = links[link]
            if (!seletedLink) throw 'Bad link name, check index'
            else return await fetch(seletedLink).then(r=>r.text()).then(text=>JSON.parse(text.substring(1)))
        }
    }
}

module.exports = CTGP