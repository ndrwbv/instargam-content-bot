const photo = require('./lib/photo');

const Debug = require('./lib/debug');
var debug = new Debug("index");

debug.log("Start getting quote");
photo.getQuote().then(result => debug.done("Quote for photo ready") );

