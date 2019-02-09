const photo = require('./lib/photo');
const core = require('./lib/core');

if(core.isJsonEmpty('resources/text.json')){
  console.log("Json is empty");
  console.log(core.getPageNum());
}
// fs.readFile(PATH + 'resources/quotes.json', (err, data) => {
//   console.log("Reading: " + PATH + "resources/quotes.json");
//   if (err) throw err;
//   let quotes = JSON.parse(data);

//   if(quotes.length == 0)
//   {
//     console.log("Json is empty");
//     fs.readFile(PATH + 'assets/page_number.txt',(err, data) => {
//       opt.page_number = Number(data);

//       opt.url += opt.page_number;
//       console.log("Url: " + opt.url);

//       parseQuots()
//       .then(
//         result => {
//           getFirstQuote(JSON.parse(result));
//           writeIn('assets/page_number.txt', opt.page_number-1);
//         }
//       )
//       .catch(err => console.error(err));
//     })

//   }
//   else getFirstQuote(quotes);
// });
