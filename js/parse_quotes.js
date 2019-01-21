var request = require('request');
var iconv = require('iconv-lite');
var fs = require('fs');
var cheerio = require('cheerio');
//https://www.goodreads.com/quotes?page=
//https://www.goodreads.com/quotes/tag/books?page=
var opt = {
  url: 'https://www.goodreads.com/quotes/tag/books?page=',
  page_number: 0,
  encoding: null
}
var PATH = '/Users/andrew/Desktop/instagram/vendor/mgp25/instagram-php/instargam-content-bot/';
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
      
      resolve(makeJson(quotes));
  
    });
  });
}
function makeJson(quotes) {
  console.log("Making json..");
  var quotes_json = [];
  for(q in quotes)
  {
    var obj = {
      quote: "“" + quotes[q] + "”",
      author: authors[q]
    };
    quotes_json.push(obj);
  }
  return JSON.stringify(quotes_json, null, 2);
}

function makePadding(source_string, type) {
  //type pic = 27,max at all = 217, max in line  = 34; book = ?

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
  fs.writeFile(PATH+path, data, function(err){
    if(err) throw err;
    console.log("written: " + path);
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

  writeIn('resources/quotes.json',json);
  console.log("Length: "+_quote.length);
  if(_quote.length > 110)
  {
    writeIn('resources/is_long.txt', 1);
    writeIn('resources/quote.txt', _quote);
  } 
  else{
    writeIn('resources/quote.txt', makePadding(_quote));
    writeIn('resources/is_long.txt', 0);
    writeIn('resources/author.txt', _author);
  }

}

fs.readFile(PATH+'resources/quotes.json', (err, data) => {  
  console.log("Reading resources/quotes.json");
  if (err) throw err;
  let quotes = JSON.parse(data);

  if(quotes.length == 0)
  {
    console.log("Json is empty");
    fs.readFile(PATH+'assets/page_number.txt',(err, data) => {
      opt.page_number = Number(data);
    
      opt.url += opt.page_number;
      console.log("Url: " + opt.url);

      parseQuots()
      .then(
        result => {
          getFirstQuote(JSON.parse(result));
          writeIn('assets/page_number.txt', opt.page_number-1);
        }
      )
      .catch(err => console.error(err));
    })
      
  }
  else getFirstQuote(quotes);
});

