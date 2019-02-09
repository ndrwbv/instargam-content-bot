const PATH = __dirname.substring(0, __dirname.length-3) + '/';
const fs = require('fs');

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
      console.log("written: " + PATH + path);
    });
  }
  