const Wiimmfi = require('../')
const CTGP = new Wiimmfi.CTGP()

async function run(){
    console.log(await CTGP.getLinks())
}
run()