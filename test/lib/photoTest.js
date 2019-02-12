const assert = require('chai').assert;
const fs = require('fs');
const PATH = __dirname.substring(0, __dirname.length-8);
const photo = require('../../js/lib/photo');
const core = require('../../js/lib/core');

describe('PHOTO', function(){
    var source_json = core.getJsonData('resources/quotes.json');

    //dont work if parsing.
    it('Should change quotes.json', async () => {
        var result = await photo.getQuote();
        let updated = await fs.readFileSync(PATH + 'resources/quotes.json', 'utf8');
        assert.notEqual(source_json, updated);
      });
    it('getQuote should return true', async () => {
        var result = await photo.getQuote();
        assert.equal(result, true);
      });
});