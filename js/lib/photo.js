const request = require('request');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const core = require('../core/core');

var opt = {
  url: 'https://www.goodreads.com/quotes/tag/books?page=',
  page_number: 0,
  encoding: null
}

var authors = [];
var quotes = [];

function parseQuots(current_pageNum) {
  opt.url += current_pageNum;
  console.log("Url: " + opt.url);

  return new Promise(function(resolve, reject){

    console.log("Start parsing..");
    request(opt, function (err, res, body) {
      if (err) reject(err);
      var $ = cheerio.load(iconv.decode(body, 'utf8'));

      $(".quoteText").each(function (i, elem) {
       let array = $(this).text().replace(/\s{2,}/g, ' ').split("”");
       quotes.push(array[0].replace(" “",""));
       let temp = array[1].replace(" ― ", "").split(', ')
       if(temp.length == 1) temp[1] = "Notes";
       if(temp.length > 2) temp.splice(2,temp.length);
      
       authors.push(temp.join("\n"));
      });

      core.saveData(current_pageNum-1, quotes, authors);

      resolve({"status": "ok"});

    });
  });
}

function getFirstQuote(){
  console.log("Getting first quote..");

  let quotes = core.getJsonData('resources/quotes.json');
  let _author = ""
  let _quote = "";

  for(let i in quotes ){
    _quote = quotes[i].quote;
    _author = quotes[i].author;
    quotes.splice(0,1);
    break;
  }
 
  core.saveQuote(_quote, _author, JSON.stringify(quotes, null, 2));

}
function getQuote(params) {
  return new Promise(function (resolve, reject) {
    if(core.isJsonEmpty('resources/quotes.json')){
      console.log("Json is empty");
    
      parseQuots(core.getPageNum())
      .then(
        result => {
          getFirstQuote();
          resolve('promise resolved');
        })
      .catch(err => reject(err));
    }
    else {
      getFirstQuote();
      resolve('promise resolved');
    };
  });

}
module.exports = { getQuote }