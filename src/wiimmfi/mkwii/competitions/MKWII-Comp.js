const fetch = require('node-fetch')
const url = require('./httpOptions.js')
const cheerio = require('cheerio');

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        // Do something if you want with the group
        tempArray.push(myArray.slice(index, index+chunk_size));
    }

    return tempArray;
}
var compURL =`${url.protocol}://${url.host}/${url.path}`
async function getData(compID = 'latest'){
    var url = compURL+'/'+compID
    return fetch(url).then(r=>r.text());
}

class Competitions {
    constructor(){
        this.compURL = compURL
    }

    /** @private */
    async getCompLeaderboard(compID = 'latest'){
        var data = await getData(compID);
        const $ = cheerio.load(data)
        var text = [];
        $('.table11 tr.tr0 td, .table11 tr.tr1 td').each((i, title) => {
            const titleNode = $(title);
            const titleText = titleNode.text();

            text.push(titleText.trim());
        });
        text = chunkArray(text,9)

        var arr_tmp = []
        var obj_tmp = {}

        text.forEach(t=>{
            obj_tmp = {}
            obj_tmp['place'] = t[0]
            obj_tmp['time'] = t[1]
            obj_tmp['name'] = t[2]
            obj_tmp['freindCode'] = t[3]
            obj_tmp['country'] = t[4] != '—' ? t[4] : undefined
            obj_tmp['driver'] = t[5]
            obj_tmp['vehicle'] = t[6]
            obj_tmp['controller'] = t[7]
            obj_tmp['video'] = t[8] != '—' ? t[8] : undefined

            arr_tmp.push(obj_tmp)
        })

        return arr_tmp
    }

    /** @private */
    async getCompInfo(compID){
        var data = await getData(compID);
        const $ = cheerio.load(data)
        var text = {};
        text['title'] = $('div.text h2.subhead').text()
        text['img'] = $('div.text img').attr('src')
        text['info'] = $('div.text div.subhead').text()
        text['description'] = $('div.text span.hover-text:nth-child(2) div p:nth-child(2)').html().replace('<br>', ' ') + ' ' + $('div.text span.hover-text:nth-child(2) div p:nth-child(3)').html().replace('<br>', ' ')
        text['ends'] = $('div.text p:nth-child(7)').text()
        return text
    }

    /**
     * Get Information on a competition
     * @param {number | string} compID The ID of the competition, defaults to latest
     * @returns {object} The data of the competition
     */
    async getComp(compID = 'latest'){
        var obj = {}
        obj['information'] = await this.getCompInfo(compID)
        obj['leaderboard'] = await this.getCompLeaderboard(compID)
        return obj
    }
}

module.exports = Competitions