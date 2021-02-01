const Wiimmfi = require('../')

const CTGPo = new Wiimmfi.CTGPOnline()

async function run(){
    console.log('CTGP Online stats:')
    console.log('Players on CTWW:', await CTGPo.stats.ctww_players)
    console.log('Players on Countdown:', await CTGPo.stats.cd_players)
    console.log('Most ever players on CTWW:', await CTGPo.stats.most_ctww_players)
    console.log('Most ever players on Countdown:', await CTGPo.stats.most_cd_players)
    console.log('Most ever rooms on CTWW:', await CTGPo.stats.most_ctww_rooms)
    console.log('Most ever rooms on Countdown:', await CTGPo.stats.most_cd_rooms)
    console.log('Longest ever logged CTWW Room:', await CTGPo.stats.longest_ctww_logged)
    console.log('Longest ever logged Countdown Room:', await CTGPo.stats.longest_cd_logged)
    var rooms = await CTGPo.getRooms()
    console.log('CTGP Rooms:',rooms)
}

run()