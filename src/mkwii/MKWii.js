const fetch = require('node-fetch')
const url = require('./httpOptions.js')
const getData = () => {return fetch(`${url.protocol}://${url.host}/stats/${url.games.find(game=>game.abbr == 'mkw').abbr}${url.json_param}`).then(r=>r.json());}

async function getOptions(){
    var data = await getData()
    return data.filter(res=>res.type == 'options')[0];
}
class MKWii {
    constructor(){
        /**
         * Get options from Wiimmfi's MKWii rooms database
         * 
         * @returns Promise { Object }
         */
        this.options = getOptions()

        /**
         * Get all data from Wiimmfi's MKWii rooms database
         * 
         * @returns Promise { Array }
         */
        this.data = getData()
    }
    /**
     * Get all rooms from Wiimmfi's MKWii rooms database
     * 
     * @param roomName Optional: Room name
     * @returns Promise { Array }
     */
    async getRooms(roomName){
        var data = await getData()
        data = data.filter(res=>res.type == 'room');
        if (roomName) {
            if (data.some(res=>res.room_name == roomName)) data = data.find(res=>res.room_name == roomName)
            else throw 'Room not found'
        }
        return data     
    }
}

module.exports = MKWii