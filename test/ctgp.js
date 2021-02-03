const Wiimmfi = require('../')
const CTGP = new Wiimmfi.CTGP()

async function run(){
    console.log(CTGP.url,await CTGP._getLinks())
    const players = await CTGP._getData("players")
    console.log(players.filter(p=>p.miiName == 'Greep'))
}
run()