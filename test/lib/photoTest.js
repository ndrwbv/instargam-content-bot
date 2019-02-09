var assert = require('chai').assert;
var fs = require('fs');
const PATH = __dirname.substring(0, __dirname.length-8);
var photo = require('../../js/lib/photo');
const core = require('../../js/core/core.js');
const expect = require('chai').expect;

describe('PHOTO', function(){
    var source = fs.readFileSync(PATH + 'resources/quote.txt', 'utf8');
    var source_json = core.getJsonData('resources/quotes.json');
    
    // it('assertion success', async () => {
    //     const result = await photo.getQuote();
    //     let updated = await fs.readFileSync(PATH + 'resources/quote.txt', 'utf8');
    //     assert.notEqual(source, updated);
    //   });
    //   it('resolves', (done) => {
    //     photo.getQuote()
    //     .then( (result) => {
    //         let updated = fs.readFileSync(PATH + 'resources/quote.txt', 'utf8');
    //         assert.notEqual(source, updated);
    //     }).finally(done);
    //   });
    // it('Should change quote.txt', function () {
    //     photo.getQuote()
    //     .then(result => {
    //         let updated = fs.readFileSync(PATH + 'resources/quote.txt', 'utf8');
    //         assert.notEqual(source, updated);
    //     });
    // });
    // it('Should change quotes.json', function () {
    //     photo.getQuote()
    //     .then(result => {
    //         let updated_json = core.getJsonData('resources/quotes.json');
    //         console.log(source_json.length + " " + updated_json.length);
    //         assert.notEqual(source_json, updated_json);
    //     });
    // });
});