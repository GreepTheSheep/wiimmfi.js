const Wiimmfi = require('../')

const gameStats = new Wiimmfi.GameStatus()

async function run (){
    try{
        const games = await gameStats.getAllGames()
        console.log(games.find(g=>g.ID == 'WA7J'))
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}

run()