// Section 3 - Streams

// Reading and writing a file

// First, we'll require a filesystem module
var fs = require('fs');
// Next we'll create a read stream from the original file
var file = fs.createReadStream("readme.md");
// Then we'll create a write stream to the destination file
var newFile = fs.createWriteStream("readme_copy.md");
// To store on the new file, we'll use the pipe function
file.pipe(newFile);

// Some 3rd party libraries that heavily depend on streaming, like http://gulpjs.com  which exposes the pipe function as its public API. You can see how to use streams in the wild

// We can pipe any read stream into any write stream, we'll combine the two examples, to read from the request and pipe it to the file.

var fs = require('fs');
var http = require('http');

http.createServer(function(request, response ){
  var newFile = fs.createWriteStream("readme_copy.md");
  request.pipe(newFile);

  // listen to the end event and close the response
  request.on('end', function(){
    response.end('uploaded! Yaaaassssss!');
  });
}).listen(8080);
// To call this from our client, we run
```
curl --upload-file readme.md http://localhost:8080
```
// and pass in a file as an argument
// Ultimately, we are streaming pieces of the file from the client to the server and the server is streaming those pieces to disk as its processing the request. Never holding the entire file in memory, always flowing continously in a non-block fashion.
// ------------------------------------------------------
// Implementing our own file upload with progress from command line or the web browser (like paperclip)
```
curl --upload-file file.jpg http://localhost:8080
```
// In order to do it, we just need the HTTP module and the File sytem module. Start with the upload code
http.createServer(function(request, response){
  var newFile = fs.createWriteStream("readme_copy.md");
  // We need to know what the entire size of the file is so we'll read the content length header from the request
  var fileBytes = request.headers['content-length'];
  // Next, we'll create another variable to keep track of how many bytes were uploaded and initialize it to 0
  var uploadedBytes = 0;
  // Listening to the readable event, we'll loop through and read each chunks from the request
  request.on('readable', function(){
    var chunk = null;
    while(null !== (chunk = request.read())){
      // Within the loop, we'll increment the uploadedBytes variable with the length of each chunk
      uploadedBytes += chunk.length;
      // Then we calculate progress by dividing uploaded bytes by file bytes and obviously multiply it by 100
      var progress = (uploadedBytes / fileBytes) * 100;
      // Then we send the progress back to the client, with the response.write function and use parseInt to round to an integer
      response.Write("progress: " + parseInt(progress, 10) + "%\n");
    }
  });
  // Pipe below takes care of the whole upload for us. Only reason we are using the readable event is to keep track of the current progress.
  request.pipe(newFile);
  ...
}).listen(8080);

// So we can run our commands and get a progress status
```
node.main.js
curl -- upload-file some_big_facking_file.jpg http://localhost8080
```


// --------------EXERCISES-------------
// 3.2 Lets use the fs module to read a file and log its contents to the console.
var fs = require('fs');

// Task 1/3 - Use the fs module to create a Readable stream for fruits.txt. Store the new stream in a variable called file.
var fs = require('fs');
var file = fs.createReadStream('fruits.txt');
// Task 2/3-3/3 Next, listen to the readable event on the newly created stream and give it a call back
var fs = require('fs');
var file = fs.createReadStream('fruits.txt');

file.on('readable', function(){
  var chunk;
  while(null !== (chunk = file.read())){
    console.log(chunk.toString());
  }
});
// -------------------------------------------------------


// 3.3 Instead of manually listening for the 'readable' event on the Readable stream, let's use pipe to read from the stream and write directly to process.stdout.
var fs = require('fs');

var file = fs.createReadStream('fruits.txt');

file.on('readable', function(){
  var chunk;
  while(null !== (chunk = file.read())){
    console.log(chunk.toString());
  }
});
// Task 1/2 -Start by removing the code for the readable handler.

var fs = require('fs');
var file = fs.createReadStream('fruits.txt');
// Task 2/2 - Call file.pipe(), passing it the stream to write to (HINT: Remember, you want to pipe the file to process.stdout)

var fs = require('fs');
var file = fs.createReadStream('fruits.txt');


// -------------------------------------------------------

// 3.4 The following code will throw an error because pipe automatically closed our writable stream.

var fs = require('fs');

var file = fs.createReadStream('origin.txt');
var destFile = fs.createWriteStream('destination.txt');

file.pipe(destFile);

file.on('end', function(){
  destFile.end('Finished!');
});

// Task - You'll need to consult the pipe documentation to figure out the option which keeps the Write stream open and dispatches the end event.

var fs = require('fs');

var file = fs.createReadStream('origin.txt');
var destFile = fs.createWriteStream('destination.txt');
// add end false to the stream
file.pipe(destFile, { end: false});

file.on('end', function(){
  destFile.end('Finished!');
});

// -------------------------------------------------------


// 3.5 Let's create an HTTP server that will serve index.html
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  var file = fs.createReadStream('index.html');
  // Add the call for the pipe here
  file.pipe(response);
}).listen(8080);
