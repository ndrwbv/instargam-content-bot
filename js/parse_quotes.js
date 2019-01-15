var request = require('request');
var iconv = require('iconv-lite');

var fs = require('fs');
var cheerio = require('cheerio');

var opt = {
  url: 'https://www.brainyquote.com/topics/celebrity',
  encoding: null
}

var authors = [];
var quotes = [];

function parseQuots() {
  request(opt, function (err, res, body) {
    if (err) throw err;
    var $ = cheerio.load(iconv.decode(body, 'utf8'));
    //bq-aut b-qt

    $(".bq-aut").each(function (i, elem) {
      authors.push($(this).text());
    });
    $(".b-qt").each(function (i, elem) {
      quotes.push($(this).text());
    });
  });

  //make quotes in json
  //"0" { 'quote': 'Lorem','author':'John, Coraline' } 
}
function makeJson() {
  return json;
}

function makePadding(source_string) {
  let words_counter = 0;
  let indexes = [];
  indexes.push(0);
  for (let i in source_string) {
    words_counter++;
    if (words_counter == 27) {
      for (let k = i; k < source_string.length; k++) {
        if (source_string[k] == ' ') {
          indexes.push(k);
          break;
        }
      }
      words_counter = 0;
    }
  }
  let padding_string = "";
  for (let i = 0; i < indexes.length; i++) {
    padding_string += source_string.substring(indexes[i], indexes[i+1]) + "\n";
  }

  return padding_string.replace(/\n /g ,"\n");
}

function writeIn(path, data) {
  fs.writeFile(path, data, function(err){
    if(err) throw err;
    console.log("written: " + path);
  });
}
function getQuote() {
  //parse quotes json
  //get first element
  //write it in resources/quote.txt and in resources/author.txt
  let _author = "Neil Gaiman\nCoraline"
  let _quote = "“Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.”";

  writeIn('resources/quote.txt', makePadding(_quote));
  writeIn('resources/author.txt', _author);
  
  //remove first emlement 
  //write new json
}

getQuote();
// if(!empty(file)) getQuote();
// else{
//   //promise or set timeout 
//   parseQuots();
//   getQuote();
// } 



