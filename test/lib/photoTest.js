var assert = require('chai').assert;
var fs = require('fs');
const PATH = __dirname.substring(0, __dirname.length-8);
var photo = require('../../js/lib/photo');

describe('photo.js', function(){
    console.log(PATH);
    var source = fs.readFileSync(PATH + 'resources/quote.txt', 'utf8');

    it('Should change quote.txt', function () {
        photo.getQuote()
        .then(result => {
            let updated = fs.readFileSync(PATH + 'resources/quote.txt', 'utf8');
            assert.notEqual(source, updated);
        });
        
    });
});