const Wiimmfi = require('../')
const CTGP = new Wiimmfi.CTGP()

async function run(){
    const data = await CTGP._getData()
    console.log(data)
}
run()