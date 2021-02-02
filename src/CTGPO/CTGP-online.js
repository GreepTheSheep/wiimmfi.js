const fetch = require('node-fetch')
const ms = require('ms')
const url = require('./httpOptions.js')
const getData = () => {return fetch(`${url.protocol}://${url.host}/${url.online}`).then(r=>r.text());}
const cheerio = require('cheerio');
const { EventEmitter } = require('events');

// Private functions
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
async function getRooms(){
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
                uptime_ms: room[3] == "-" ? undefined : room[3].includes(':') ? ms(room[3].replace(':', ' hours, ').slice(0,-2)) + ms(room[3].slice(-2) + " minutes") : ms(room[3]),
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
                    uptime_ms: room[3] == "-" ? undefined : room[3].includes(':') ? ms(room[3].replace(':', ' hours').slice(0,-2)) + ms(room[3].slice(-2) + " minutes") : ms(room[3]),
                    joinable: Boolean(room[4] == 'Yes' ? true : false),
                    players: room[5].split(', ')
                })
            }
        }
    })
    return rooms
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

class CTGPOnline extends EventEmitter{
    /**
     * Creates an instance for CTGP Online servers
     * @param {object} options Options for this class, see the documantation
     * @param {boolean} options.events Default: true, enables or disables listener to get events
     */
    constructor(options = {
        events:true
    }){
        super();

        /** Get the CTGP stats
         * @returns Promise<Number>
         * @readonly
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

        if (options.events) this._roomListener()
    }
    /**
     * Get all online rooms
     * @param {string} type Optional: "CTWW" or "Countdown"
     */
    async getRooms(type){
        var rooms = await getRooms()
        if (type == 'CTWW' || type == 'Countdown') {
            var rooms_filtered = []
            rooms.forEach(r=>{
                if (r.type == type) rooms_filtered.push(r)
            })
            return rooms_filtered
        }
        else return rooms 
    }
    /**
     * Get all online players
     */
    async getPlayers(){
        var rooms = await getRooms()
        var players = []
        rooms.forEach(r=>{
            if (r.type != undefined){
                r.players.forEach(p=>{
                    players.push(p)
                })
            }
        })
        return players
    }
    /**
     * Get room information
     * @param {Number} roomID Room ID
     * @param {String} type Optional: "CTWW" or "Countdown"
     */
    getRoom(roomID, type){
        var rooms = getRooms()
        if (!type || type != 'CTWW' || type != 'Countdown') type = 'CTWW'
        return rooms.filter(r=>r.id == roomID && r.type == type)
    }

    /**
     * Triggers an event called 'test', use "new Wiimmfi.CTGPOnline().on('test', ...)" to catch it
     * @private
     */
    _testEvent(){
        this.emit('test')
    }

    /**
     * Enables the RoomListener module
     * @private
     */
    async _roomListener(){
        this.emit('debug', '[Listener] Started, awaiting updates from the server every 10 seconds')
        var rooms1 = await getRooms()
        var players1 = await this.getPlayers()

        setInterval(async ()=>{
            this.emit('debug', '[Listener] Checking...')
            var rooms2 = await getRooms()
            if (rooms1.length != rooms2.length){
                if (rooms1.length != 1 && rooms2.length != 0) this.emit('roomsUpdate', rooms1, rooms2)
            }
            rooms1 = rooms2

            var players2 = await this.getPlayers()
            if (players1.length != players2.length){
                if (players1.length != 1 && players2.length != 0) this.emit('playersUpdate', players1, players2)
            }
            players1 = players2
        }, 10000)
    }

}

module.exports = CTGPOnline