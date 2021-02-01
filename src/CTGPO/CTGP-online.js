const fetch = require('node-fetch')
const url = require('./httpOptions.js')
const getData = () => {return fetch(`${url.protocol}://${url.host}/${url.online}`).then(r=>r.text());}
const cheerio = require('cheerio')

async function getLiNbValue(search){
    var data = await getData()
    const $ = cheerio.load(data)
    var text;
    $('li').each((i, title) => {
        const titleNode = $(title);
        const titleText = titleNode.text();

        if (titleText.includes(search)) text = titleText;
    });
    if (text.includes('(')) text = text.substring(text.indexOf(':')+1, text.indexOf('('))
    else text = text.substring(text.indexOf(':')+1)
    text = text.trim()
    return Number(text)
}
async function getLiStrValue(search){
    var data = await getData()
    const $ = cheerio.load(data)
    var text;
    $('li').each((i, title) => {
        const titleNode = $(title);
        const titleText = titleNode.text();

        if (titleText.includes(search)) text = titleText;
    });
    if (text.includes('(')) text = text.substring(text.indexOf(':')+1, text.indexOf('('))
    else text = text.substring(text.indexOf(':')+1)
    text = text.trim()
    return String(text)
}

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

class CTGPOnline {
    constructor(){
        /** Get the CTGP stats
         * @returns Promise<Number>
        */
        this.stats = {
            /** Get the actual number of players active in CTWW 
             * @returns Promise<Number>
            */
            ctww_players: getLiNbValue('Players on CTWW'),
            /** Get the actual numbers of players active on Countdown
            * @returns Promise<Number>
            */
            cd_players: getLiNbValue('Players on Countdown'),
            /** Get the most ever players in CTWW at once
             * @returns Promise<Number>
             */
            most_ctww_players: getLiNbValue('Most ever players in CTWW at once'),
            /** Get the most ever players in Countdown at once
             * @returns Promise<Number>
             */
            most_cd_players: getLiNbValue('Most ever players in Countdown at once'),
            /** Get the most ever CTWW rooms at once
             * @returns Promise<Number>
             */
            most_ctww_rooms: getLiNbValue('Most ever CTWW rooms at once'),
            /** Get the most ever CTWW rooms at once
             * @returns Promise<Number>
             */
            most_cd_rooms: getLiNbValue('Most ever Countdown rooms at once'),
            /** Get the longest ever logged CTWW room
             * @returns Promise<String>
             */
            longest_ctww_logged: getLiStrValue('Longest ever logged CTWW'),
            /** Get the longest ever logged Countdown room
             * @returns Promise<String>
             */
            longest_cd_logged: getLiStrValue('Longest ever logged Countdown Room'),
        }
    }
    /**
     * Get all online rooms
     */
    async getRooms(){
        var data = await getData()
        const $ = cheerio.load(data)
        var list = [];
        $('td').each((i, title) => {
            const titleNode = $(title);
            const titleText = titleNode.text();
    
            list.push(titleText);
        });

        var rooms_tmp = chunkArray(list,6)
        const rooms = []
        var ctww = true
        rooms_tmp.forEach(room=>{
            if (room[0] == 'Searching'){
                rooms.push({
                    id: 'Searching',
                    type: 'Unknown',
                    playersNb: Number(room[1].substring(0,2).trim()),
                    host_vr: 0,
                    uptime: room[3],
                    joinable: Boolean(room[4] == 'Yes' ? true : false),
                    players: room[5].split(', ')
                })
            } else {
                var id = Number(room[0].substring('Room'.length).trim())
                if (id == 1 && rooms.length != 0) ctww = false
                if (!isNaN(id)){
                    rooms.push({
                        id: id,
                        type: ctww ? 'CTWW' : 'Countdown',
                        playersNb: Number(room[1].substring(0,2).trim()),
                        host_vr:  Number(room[2].substring(0,4).trim()),
                        uptime: room[3],
                        joinable: Boolean(room[4] == 'Yes' ? true : false),
                        players: room[5].split(', ')
                    })
                }
            }
        })
        return rooms
    }
    /**
     * Get room information
     * @param {Number} roomID Room ID
     * @param {String} type Optional: "CTWW" or "Countdown"
     */
    async getRoom(roomID, type){
        var rooms = await this.getRooms()
        if (!type || type != 'CTWW' || type != 'Countdown') type = 'CTWW'
        return rooms.filter(r=>r.id == roomID && r.type == type)
    }
}

module.exports = CTGPOnline