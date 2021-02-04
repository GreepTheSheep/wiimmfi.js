const Wiimmfi = require('../')
const CTGP = new Wiimmfi.CTGP()

CTGP.on('debug', msg=>{
    console.log(msg)
})

CTGP.on('cache-update', async (key, data)=>{
    if (key == 'players'){
        console.log(data.players.find(p=>p.miiName == 'Greep'))
        var greep = await CTGP.getPlayerLeaderboard(await CTGP.getPlayer('Greep'))
        console.log(greep)
    }
})

async function run(){
    console.log(CTGP.url,await CTGP.getLinks())
}
run()