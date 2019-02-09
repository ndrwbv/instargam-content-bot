const request = require('request');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const core = require('./core');

var opt = {
  url: 'https://www.goodreads.com/quotes/tag/books?page=',
  page_number: 0,
  encoding: null
}

var authors = [];
var quotes = [];

function parseQuots() {
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
       //if(temp[0].length > )
       authors.push(temp.join("\n"));
      });

      resolve(core.makeJson(quotes));

    });
  });
}

function getFirstQuote(quotes){
  console.log("Getting first quote..");
  let _author = ""
  let _quote = "";

  for(let i in quotes ){
    _quote = quotes[i].quote;
    _author = quotes[i].author;
    quotes.splice(0,1);
    break;
  }
  let json = JSON.stringify(quotes, null, 2);

  core.writeIn('resources/quotes.json',json);
  console.log("Length: "+_quote.length);
  if(_quote.length > 110)
  {
    core.writeIn('resources/is_long.txt', 1);
    core.writeIn('resources/quote.txt', _quote);
  }
  else{
    core.writeIn('resources/quote.txt', core.makePadding(_quote));
    core.writeIn('resources/is_long.txt', 0);
    core.writeIn('resources/author.txt', _author);
  }

}

module.exports = { getFirstQuote, parseQuots }