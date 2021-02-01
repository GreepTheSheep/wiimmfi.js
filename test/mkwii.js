const Wiimmfi = require('../')

const mkwii = new Wiimmfi.MKWii()

async function run(){
    console.log('Wiimmfi Mario Kart Wii Online services:')
    console.log('Options:',await mkwii.options)
    console.log('Rooms:',await mkwii.getRooms())
}
run()