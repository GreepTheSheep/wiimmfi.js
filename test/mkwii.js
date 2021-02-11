const Wiimmfi = require('../')

const mkwii = new Wiimmfi.MKWii()

async function run(){
    try{
        console.log('Wiimmfi Mario Kart Wii Online services:')
        console.log('Options:',await mkwii.options())
        console.log('Rooms:',await mkwii.getRooms())
    } catch(e){
        console.error(e)
        process.exit(1)
    }
}

run()