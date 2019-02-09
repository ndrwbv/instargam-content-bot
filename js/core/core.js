const PATH = __dirname.substring(0, __dirname.length-7);
const fs = require('fs');

function makeJson(quotes, authors) {
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

function writeIn(path, data, type) {
    // fs.writeFile(PATH+path, data, function(err){
    //   if(err) throw err;
    //   console.log("written: " + PATH + path);
    // });
    fs.writeFileSync(PATH + path, data);
    console.log("written: " + PATH + path);
}
function isJsonEmpty(path_to_json){
  //resources/quotes.json
  console.log("Reading: " + PATH + path_to_json);

  var json = JSON.parse(fs.readFileSync(PATH + path_to_json, 'utf8'));
  if(json.length == 0) return true;
  else return false;
}
function getPageNum(){
  console.log("Reading: " + PATH + 'assets/page_number.txt');

  var pages = fs.readFileSync(PATH + 'assets/page_number.txt', 'utf8');
  if(pages.length == 0) throw "Empty file!";
  else return Number(pages);
}

function getJsonData(path_to_json){
  console.log("Reading: " + PATH + path_to_json);

  var json = JSON.parse(fs.readFileSync(PATH + path_to_json, 'utf8'));
  if(json.length == 0) throw "Json empty!";
  else return json;
}

function saveData(page, quotes, authors){
  fs.writeFileSync(PATH + 'resources/quotes.json', makeJson(quotes, authors));
  console.log("written: " + PATH + 'resources/quotes.json');

  fs.writeFileSync(PATH + 'assets/page_number.txt' , page);
  console.log("written: " + PATH + 'assets/page_number.txt');
}
function saveQuote(quote, author, json) {
  writeIn('resources/quotes.json',json);
  if(quote.length > 110)
  {
    writeIn('resources/is_long.txt', 1);
    writeIn('resources/quote.txt', quote);
  }
  else{
    writeIn('resources/quote.txt', makePadding(quote));
    writeIn('resources/is_long.txt', 0);
    writeIn('resources/author.txt', author);
  }
}

module.exports = {makeJson, isJsonEmpty, getPageNum, saveData, getJsonData, saveQuote}