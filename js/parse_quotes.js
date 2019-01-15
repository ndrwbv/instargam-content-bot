var request = require('request');
var iconv  = require('iconv-lite');

//var fs = require('fs');
var cheerio = require('cheerio');

var opt = {
    url: 'https://www.brainyquote.com/topics/celebrity',
    encoding: null
}

var authors = [];
var quotes = [];
function parseQuots(){
  request(opt, function (err, res, body) {
    if (err) throw err;
    var $ = cheerio.load(iconv.decode(body, 'utf8'));
    //bq-aut b-qt

    $(".bq-aut").each(function(i, elem) {
      authors.push( $(this).text() );
    });
    $(".b-qt").each(function(i, elem) {
      quotes.push( $(this).text() );
    });
  });
}
function getQuote(){
  //create and write in file quoute.txt one quoute with \n
  for(let i in authors){
    //console.log({aut: authors[i], quot: quotes[i]});
    console.log(quotes[i] + '\n\n' + authors[i]);
    return 0;
  } 
}
//длина 18 M значит 9 символов в строке должно быть
if(!empty(file)) getQuote();
else{
  //promise or set timeout 
  parseQuots();
  getQuote();
} 

