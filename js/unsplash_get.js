var request = require('request');
var iconv  = require('iconv-lite');
var fs = require('fs');
var cheerio = require('cheerio');

var opt = {
    url: 'https://source.unsplash.com/1080x1080/',
    encoding: null
}
const PATH = __dirname.substring(0, __dirname.length-3) + '/';

request(opt, function (err, res, body) {
    if (err) throw err;
    var $ = cheerio.load(iconv.decode(body, 'utf8'));

    fs.writeFile(PATH + 'img/pic-source.png', body, function(err){
        if(err) throw err;
        console.log('  unsplash:out Picture saved.');
    })
});
