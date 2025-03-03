// Purpose: To create a server that displays the size of a file and the creation date of the file
var fs = require('fs');
// Using the http module to create a server
var http = require('http');

var size;
var creationDate;

/* 
* Using the fs module to retrieve size of file and creation date
*/
fs.stat('someFile.txt', (err, stats) => {
	  if (err) {
		console.error('Error: ',err);
		return;
	}

	// returning size of File
	size = stats.size;

	// returning creation date
	creationDate = stats.birthtime;
});

// Creatig a server to display the size of file and creation date
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Size of File: ' + size + '<br>');
	res.write('Creation Date of File: ' + creationDate);
	res.end();
}).listen(8080);