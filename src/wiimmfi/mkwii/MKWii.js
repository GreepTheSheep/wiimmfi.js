const fetch = require('node-fetch');
const Competitions = require('./competitions/MKWII-Comp.js');
const url = require('./httpOptions.js')

class MKWii extends Competitions {
    constructor(){
        super()
        /**
         * Get options from Wiimmfi's MKWii rooms database
         * 
         * @returns Promise { Object }
         */
        this.options = async () =>{
            var data = await this.getData()
            return data.find(res=>res.type == 'options');
        } 

        /**
         * Get all data from Wiimmfi's MKWii rooms database
         * 
         * @returns Promise { Array }
         */
        this.data = this.getData()

        this.url = `${url.protocol}://${url.host}/stats/${url.games.find(game=>game.abbr == 'mkw').abbr}${url.json_param}`

    }
    
    /** @private */
    getData(){return fetch(this.url).then(r=>r.json());}

    /**
     * Get all rooms from Wiimmfi's MKWii rooms database
     * 
     * @param roomName Optional: Room name
     * @returns Promise { Array }
     */
    async getRooms(roomName){
        var data = await this.getData()
        data = data.filter(res=>res.type == 'room');
        if (roomName) {
            if (data.some(res=>res.room_name == roomName)) data = data.find(res=>res.room_name == roomName)
            else throw 'Room not found'
        }
        return data     
    }
}

module.exports = MKWii