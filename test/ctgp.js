const Wiimmfi = require('../')
const CTGP = new Wiimmfi.CTGP({autoCache: false})

CTGP.on('debug', msg=>{
    console.log(msg)
})

CTGP.on('cacheUpdate', async (key)=>{
    console.log(key, "updated")
})

async function run(){
    console.log(CTGP.url,await CTGP.getLinks())
    var greep = await CTGP.getPlayerLeaderboard(await CTGP.getPlayer('Greep'))
    console.log(greep)
    var track = await CTGP.getLeaderboard(await CTGP.getTrack('Mushroom Gorge'))
    console.log(track)
}
run()