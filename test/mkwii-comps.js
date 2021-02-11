const Wiimmfi = require('../')

const mkwii = new Wiimmfi.MKWiiCompetitions()

async function run (){
    try{
        const comp = await mkwii.getComp()
        console.log(comp)
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}

run()