// nodejs for testing ui-only.  delete this file soon.
/**
given a bitcoin address,
show all the urls that has this btc address.  

result is a json array.  
eg.
["http://taistock.com", "http://example.com/example2"]

data structure on the file:
folder name is the bitcion address.
each url is a file inside that folder.  
the url file name has \ instead of /

inside each file, the first line is the url (with correct /).
the rest is the html content of that site from commoncrawl.  
*/

var http = require('http');
var fs = require('fs');

var express = require('express')
var app = express();

var addr = ""; // btc addr in parameter or in url

var config = {
	datadir: __dirname + "/data/",
}

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, resp) {
	console.log("/");
	resp.end();
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

