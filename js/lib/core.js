const PATH = __dirname.substring(0, __dirname.length-6);
const fs = require('fs');

const Debug = require('./debug');
var debug = new Debug("core");

function makeJson(quotes, authors) {
    debug.log("Making json..");

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

function getPageNum(){
  const path = 'resources/page_number.txt';
  debug.file("Reading: " + path);
  var pages;
  try{
    pages = fs.readFileSync(PATH + path, 'utf8');
  }
  catch(err){
    debug.error(path + " not exists");
    fs.writeFileSync(path, "100");
    return 100;
  }
  return Number(pages);
}

function getJsonData(path_to_json){
  debug.file("Reading: " + path_to_json);
  var json;
  try{
    json = JSON.parse(fs.readFileSync(PATH + path_to_json, 'utf8'));
  }
  catch(err){
    debug.error(path_to_json + " not exists");
    fs.writeFileSync(path_to_json, "[]");
    return JSON.parse("[]");
  }
  return json;
}

function saveData(page, quotes, authors){
  fs.writeFileSync(PATH + 'resources/quotes.json', makeJson(quotes, authors));
  fs.writeFileSync(PATH + 'resources/page_number.txt' , page);
  debug.file("Data saved");
}

function saveQuote(quote, author, json) {
  fs.writeFileSync(PATH + 'resources/quotes.json', json);
  if(quote.length > 110)
  {
    fs.writeFileSync(PATH + 'resources/is_long.txt', 1);
    fs.writeFileSync(PATH + 'resources/quote.txt', quote);
    fs.writeFileSync(PATH + 'resources/author.txt', author);
  }
  else{
    fs.writeFileSync(PATH + 'resources/quote.txt', makePadding(quote));
    fs.writeFileSync(PATH + 'resources/is_long.txt', 0);
    fs.writeFileSync(PATH + 'resources/author.txt', author);
  }

  debug.file("Quote saved");
}

module.exports = { getPageNum, saveData, getJsonData, saveQuote }