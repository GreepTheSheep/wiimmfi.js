const Wiimmfi = require('../')

async function run(){
    var error_codes = [
        45245,
        31009,
        31101,
        31110,
        32003,
        90040,
        109042,
        109144,
        45154,
        68764
    ]

    error_codes.forEach(async code=>{
        await Wiimmfi.getError(code).then(result=>{
            console.log('Results for code '+code, result)
            console.log('')
        })
        .catch(err=>{
            console.error(err)
            console.log('')
        })
    })
}
run()