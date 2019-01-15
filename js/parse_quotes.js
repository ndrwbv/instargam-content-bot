var request = require('request');
var iconv = require('iconv-lite');

var fs = require('fs');
var cheerio = require('cheerio');

var opt = {
  url: 'https://www.goodreads.com/quotes?page=100',
  encoding: null
}

var authors = [];
var quotes = [];

function parseQuots() {
  request(opt, function (err, res, body) {
    if (err) throw err;
    var $ = cheerio.load(iconv.decode(body, 'utf8'));
    //bq-aut b-qt

  
    // $(".authorOrTitle").each(function (i, elem) {
    //   //console.log($(this).text());
    //   //authors.push($(this).text());
    // });
    $(".quoteText").each(function (i, elem) {
     let array = $(this).text().replace(/\s{2,}/g, ' ').split("”");
     quotes.push(array[0].replace(" “",""));
     authors.push(array[1].replace(" ― ", "").split(', ').join("\n"));
    });
    
    
    writeIn('resources/quotes.json',makeJson());
  });

  //make quotes in json
  //"0" { 'quote': 'Lorem','author':'John, Coraline' } 
}
function makeJson() {
  var quotes_json = [];
  for(q in quotes)
  {
    var obj = {
      quote: quotes[q],
      author: authors[q]
    };
    quotes_json.push(obj);
    
  }
  return JSON.stringify(quotes_json, null, 2);

  // let n = JSON.parse(json);

  // for(let i in n ){
  //   console.log(n[i].quote);
  //   return 0;
  // }
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

// if(json.empty) parseQuots();
// else getQuote();
parseQuots();

