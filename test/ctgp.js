const Wiimmfi = require('../')
const CTGP = new Wiimmfi.CTGP()

// CTGP.on('debug', msg=>{
//     console.log(msg)
// })

CTGP.on('cache-update', (key, data)=>{
    console.log(key, data)
})

async function run(){
    console.log(CTGP.url,await CTGP._getLinks())
}
run()