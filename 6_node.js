// Section 6 - Socket.io

// Websockets allow us to connect with each client over the server

// First we need to install socket.io and add it to our package.json
```
npm install --save socket.io
```
// Within the application we need to require the express module, initialize and express application, create an HTTP server and have it dispatch requests to express. Finally we'll require the Socket.IO module and also allow it to use the HTTP server to listen to requests. Seen below as:
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// Socket.IO and express are sharing the same HTTP server, we then need to listen to connection events inside Socket.IO and when a client connects, we're going to log out client connected to the console
io.on('connection', function(client) {
  console.log('Client connected...');
});
app.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});



// --------------EXERCISES-------------
// 6.2 So far we've created an Express server. Now we want to start building a real-time Q&A moderation service and we've decided to use socket.io.
var express = require('express');
var app = express();

// Task 1：
// Using the http module, create an new http server and pass the express app as the listener for that new server.
//
// Task 2：
// Using the socket.io module, listen for requests on the http server. Store the return object of this operation in a variable called io.
//
// Task 3：
// Use the object stored in io to listen for client 'connection' events. Remember, the callback function takes one argument, which is the client object that has connected.
//
// Task 4：
// When a new client connects, log a message using console.log().
//
// Task 5：
// Finally, we want to tell our http server to listen to requests on port 8080.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(client){
    console.log(client + "has connected.");
});
server.listen(8080);









// 6.3 In our html file, load the socket.io.js script and connect to the socket.io server.
<script>
  // use the socket.io server to connect to localhost:8080 here

</script>


// Task 1：
// Load the socket.io.js script. The socket.io.js path you should use is '/socket.io/socket.io.js'. Express knows to serve the socket.io client js for this path.
//
// Task 2：
// Using the global io object that's now available for us, connect to the socket.io server at http://localhost:8080
<script src="/socket.io/socket.io.js"></script>
<script>
  // use the socket.io server to connect to localhost:8080 here
  var server = io.connect('http://localhost:8080');
</script>






// 6.4 In our client below, listen for 'question' events from the server and call the insertQuestion function whenever the event fires.
<script src="/socket.io/socket.io.js"></script>
<script src="/insertQuestion.js"></script>

<script>
  var server = io.connect('http://localhost:8080');

  // Insert code here

</script>



// Task 1：
// First, listen for 'question' events from the server.
//
// Task 2：
// Now, have the event callback function call the insertQuestion function. The insertQuestion function is already created for you, and it's placed in its own file. It expects exactly one argument - the question.
<script src="/socket.io/socket.io.js"></script>
<script src="/insertQuestion.js"></script>

<script>
  var server = io.connect('http://localhost:8080');

  server.on('question', function(data){
    insertQuestion(data);
  });
</script>






// 6.5 When a question is submitted to our server, we want to broadcast it out to all the connected clients so they can have a chance to answer it.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  console.log("Client connected...");


});

server.listen(8080);



// Task 1：
// In the server, listen for 'question' events from clients.
//
// Task 2：
// Now, emit the 'question' event on all the other clients connected, passing them the question data.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  console.log("Client connected...");
  client.on('question', function(question){
    client.broadcast.emit('question', question);
  });
});

server.listen(8080);







// 6.6 In our real-time Q&A app, we want to allow each client only one question at a time, but how do we enforce this rule? We can use socket.io's ability to save data on the client, so whenever a question is asked, we first want to check the question_asked value on the client.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  console.log("Client connected...");

  client.on('question', function(question) {
    client.broadcast.emit('question', question);
  });
});

server.listen(8080);
// Task 1：
// First, when a client emits a 'question' event, we want to set the value of question_asked to true.
//
// Task 2：
// Second, when a client emits a 'question' event, we want to broadcast that question to the other clients.
//
// Task 3：
// Finally, when a client emits a 'question' event, check to make sure question_asked is not already set to true. We only want to allow one question per user, so make sure that we only set the value of question_asked and broadcast the question to other clients when the value of question_asked is not already true.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  console.log("Client connected...");

  client.on('question', function(question) {
    if(!client.question_asked){
      client.question_asked = true;
      client.broadcast.emit('question', question);
    }
  });
});

server.listen(8080);






// 6.7 Clients can also answer each other's questions, so let's build that feature by first listening for the 'answer' event on the client, which will send us both the question and answer, which we want to broadcast out to the rest of the connected clients.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.sockets.on('connection', function(client) {
  console.log("Client connected...");

  // listen for answers here


  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
    }
  });
});

server.listen(8080);
// Task 1：
// With the client, listen for the 'answer' event from clients.
//
// Task 2：
// Now, emit the 'answer' event on all the other clients connected, passing them the question data.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.sockets.on('connection', function(client) {
  console.log("Client connected...");

  client.on('answer', function(question, answer){
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
    }
  });
});

server.listen(8080);





// 6.8 Now on the client, listen for the 'answer' event and then broadcast both the question and the answer to the connected clients.
<script src="/socket.io/socket.io.js"></script>

<script>
  var server = io.connect('http://localhost:8080');

  server.on('question', function(question) {
    insertQuestion(question);
  });

  //Don't worry about these methods, just assume
  //they insert the correct html into the DOM
  // var insertQuestion = function(question) {
  // }

  // var answerQuestion = function(question, answer) {
  // }
</script>
// Task 1：
// Listen for the 'answer' event off of the server.
//
// Task 2：
// Call the answerQuestion function, passing in both the question and the answer that was broadcast from the server.
<script src="/socket.io/socket.io.js"></script>

<script>
  var server = io.connect('http://localhost:8080');

  server.on('question', function(question) {
    insertQuestion(question);
  });

  server.on('answer', function(question, answer){
    answerQuestion(question, answer);
  });
</script>
