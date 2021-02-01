const Wiimmfi = require('../')

const mkwii = new Wiimmfi.MKWii()

async function run(){
    var res = await mkwii.getRooms()
    console.log(res)
}
run()