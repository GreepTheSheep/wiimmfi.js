const fetch = require('node-fetch')
const url = require('./httpOptions.js')
const cheerio = require('cheerio');

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        // Do something if you want with the group
        tempArray.push(myArray.slice(index, index+chunk_size));
    }

    return tempArray;
}

/**
 * Gets information on a error code
 * @param {number | string} code The error code
 * @returns {object} The data for this error
 */
async function getErrorValue(code){
    var data = await fetch(`${url.protocol}://${url.host}/error?e=${String(code)}`).then(r=>r.text());
    const $ = cheerio.load(data)
    var text = [];
    $('td').each((i, title) => {
        const titleNode = $(title);
        const titleText = titleNode.text();

        text.push(titleText);
    });
    if (text[0].includes('is unknown.')){
        throw 'Error code '+code+' is unknown.'
    }
    
    text = chunkArray(text,3)
    var obj = {}

    text.forEach(t=>{
        obj[t[0]] = {
            code: t[1],
            description: t[2]
        }
    })

    return obj
}

module.exports = getErrorValue;