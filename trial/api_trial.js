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

// url is /data/<addr>
app.get('/data/:addr', function(req, resp) {
	// get address in url
	addr = req.param("addr");
	console.log("addr=" + addr);
	readDir(config.datadir + addr, req, resp);
});

// show all the relevant info at the address.
// url is /api/addr?addr=<addr>
app.get('/api/addr', function(req, resp) {
	addr = req.param("addr");
	console.log("addr=" + addr);
	readDir(config.datadir + addr, req, resp);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

/**
 * read dir and display all the files.  
 */
function readDir(dirname, req, resp) {
	var result;
	var convertedFilenames; // array of converted filenames

	// read dir using async
	// after reading it, we should print 
	fs.readdir(dirname, function(err, filenames) {
		if (err) {
			console.error(err);
			result = {
				success: "false",
				errmsg: "address not found.",
			};
			resp.send(JSON.stringify(result));
		} else {
			// convert filenames
			convertedFilenames = convertFilenames(filenames);
			resp.send(JSON.stringify(convertedFilenames));
			// for (var i=0; i < filenames.length; i++) {
			// 	var filename = filenames[i];
			// }
		}

		resp.end();
	});


}

/**
 * replace \ with / in the filename.  
 * because our system store url / as \. 
 */
function convertFilenames(filenames) {
	var results = [];
	var filename;
	for (var i=0; i<filenames.length; i++) {
		filename = filenames[i];
		filename = filename.replace(/\\/g,"/");
		results[i] = filename;
	}
	return results;
}
