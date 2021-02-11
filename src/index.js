module.exports = {
    // Classes
    MKWii: require('./wiimmfi/mkwii/MKWii.js'),
    GameStatus: require('./wiimmfi/game-status/games-stat.js'),
    CTGPOnline : require('./CTGP/CTGPO/CTGP-online.js'),
    CTGP : require('./CTGP/CTGP.js'),

    // single methods
    getError : require('./wiimmfi/error-codes/error-codes.js')
}