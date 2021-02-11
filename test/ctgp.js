const Wiimmfi = require('../')
const CTGP = new Wiimmfi.CTGP({autoCache: false})

CTGP.on('debug', msg=>{
    console.log(msg)
})

CTGP.on('cacheUpdate', async (key)=>{
    console.log(key, "updated")
})

async function run(){
    try{
        console.log(CTGP.url,await CTGP.getLinks())

        var greep = await CTGP.getPlayerLeaderboard(await CTGP.getPlayer('Greep'))
        console.log(greep)

        var track = await CTGP.getTrack('Mushroom Gorge', "Shortcut")
        console.log(track)

        var trackLeader = await CTGP.getLeaderboard(await CTGP.getTrack('Mushroom Gorge', "Shortcut"))
        console.log(trackLeader)

        var track200cc = await CTGP.getTrack200cc('SM64 Castle Grounds')
        console.log(track200cc)

        var track200ccLeader = await CTGP.getLeaderboard200cc(await CTGP.getTrack200cc('SM64 Castle Grounds'))
        console.log(track200ccLeader)
    } catch(e){
        console.error(e)
        process.exit(1)
    }
}

run()