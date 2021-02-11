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

class GameStatus {
    constructor(){
        this.url = `${url.protocol}://${url.host}/stat?m=25`

        /** @private*/
        this.getData = () => {return fetch(this.url).then(r=>r.text());}

        this.games = this.getAllGames()
    }

    async getAllGames(){
        var data = await this.getData();
        const $ = cheerio.load(data)
        var text = [];
        $('#game tr.tr0 td, #game tr.tr1 td').each((i, title) => {
            const titleNode = $(title);
            const titleText = titleNode.text();

            text.push(titleText);
        });
        
        text = chunkArray(text,7)
        var arr = []

        text.forEach(t=>{
            var statusInfo;
            var status = t[2].trim()
            var possibleStatus = ['Testing', 'Full support', 'Partially working', 'Working with some issues', 'DISABLED', 'Working except online statistics']

            possibleStatus.forEach(s=>{
                if (status.startsWith(s) && status.length > s.length){
                    statusInfo = status.substr(s.length).trim()
                    status = status.substr(0, s.length)
                }
            })

            arr.push({
                ID: t[0],
                game: t[1].trim(),
                status: status,
                statusInfo: statusInfo ? statusInfo : undefined,
                profiles: isNaN(Number(t[3])) ? (t[3] == '—' ? null : t[3].trim()) : Number(t[3]),
                online: isNaN(Number(t[4])) ? (t[4] == '—' ? null : t[4].trim()) : Number(t[4]),
                logins: isNaN(Number(t[5])) ? (t[5] == '—' ? null : t[5].trim()) : Number(t[5]),
            })
        })

        return arr
    }
}

module.exports = GameStatus