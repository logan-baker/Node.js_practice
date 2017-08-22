// Section 7 - Persisting Data



// --------------EXERCISES-------------------------

// 7.2 Let's start practicing using the redis key-value store from our node application.
// Task 1：
// Require the redis module and assign it to a variable called redis.
//
// Task 2：
// Create a redis client and assign it to a variable called client.
//
// Task 3：
// On the client, set the name property to your name.
var redis = require('redis');
var client = redis.createClient();
client.set('name', 'Answer');










// 7.3 We have already stored a value in the question key. Use the redis client to issue a get command to redis to retrieve and then log the value.
var redis = require('redis');
var client = redis.createClient();
// Task 1：
// Use the redis client to issue a get command using the 'question' key to retrieve a value. Remember, the get function takes a callback which expects two arguments, error and data.
//
// Task 2：
// Log the value retrieved with console.log
var redis = require('redis');
var client = redis.createClient();
client.get('question', function(err, data){
  console.log(data);
});







// 7.4 As we saw in the video, redis can do more than just simple key-value pairs. We are going to be using redis' LISTS later to add persistence to our live-moderation app, so let's practice using them now.
var redis = require('redis');
var client = redis.createClient();

var question1 = "Where is the dog?";
var question2 = "Where is the cat?";
// Task 1：
// Using the redis client's lpush command, insert question1 into the questions list. Then, console.log the result you receive. Remember, the lpush function takes a callback as its last argument, which expects an error and value to be passed as arguments.
//
// Task 2：
// Using the redis client's lpush command, insert question2 into the questions list. Then console.log the result you receive.
var redis = require('redis');
var client = redis.createClient();

var question1 = "Where is the dog?";
var question2 = "Where is the cat?";

client.lpush('questions', question1, function(err, data){
    console.log(data);
});

client.lpush('questions', question2, function(err, data){
    console.log(data);
});



// 7.5 Now that we have seeded the questions list, use the lrange() command to return all of the items and log them
var redis = require('redis');
var client = redis.createClient();
// Task 1：
// Use the lrange() command to return all of the items from the questions key.
//
// Task 2：
// Now that we have called lrange(), use console.log to log the result from redis
var redis = require('redis');
var client = redis.createClient();

client.lrange('questions', 0, -1, function(err, data){
  console.log(data);
});





// 7.6 Let's go back to our live-moderation app and add some persistence, first to the questions people ask.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
 client.on('answer', function(question, answer) {
   client.broadcast.emit('answer', question, answer);
 });

 client.on('question', function(question) {
   if(!client.question_asked) {
     client.question_asked = true;
     client.broadcast.emit('question', question);
     // add the question to the list here
 // Task：
 // Use the lpush command to add new questions to the list named questions. Do this inside the listener for the 'question' event.
 var express = require('express');
var app = express();
var server = require('http').createServer(app);

var socket = require('socket.io');
var io = socket.listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
  client.on('answer', function(question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
      redisClient.lpush('questions', question);
    }
  });
});




// 7.7 Now that we have questions stored in redis, let's emit them whenever a new client connects to the server through socket.io.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {

  client.on('answer', function(question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
      redisClient.lpush("questions", question);
    }
  });
});
// Task 1：
// Use the lrange command to retrieve a list of questions that represent the questions list within redis.
//
// Task 2：
// Inside of the lrange callback, use a forEach loop to iterate through the questions and emit() each question to the client. Remember, don't use broadcast.emit because we only want to send the questions to the client that is connecting to the server.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
  redisClient.lrange('questions', 0, -1, function(err, questions){
    questions.forEach(function(question){
      client.emit("question", question);
    });
  });

  client.on('answer', function(question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
      redisClient.lpush("questions", question);
    }
  });
});







// 7.8 Great work! One last thing though, since every time a new question comes in we store it in the questions list, we might run into a problem where there are just too many questions stored in that list.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
  redisClient.lrange("questions", 0, -1, function(err, questions) {
    questions.forEach(function(question) {
      client.emit("question", question);
    });
  });

  client.on('answer', function(question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
      redisClient.lpush("questions", question);
// Task 1：
// Add a callback to lpush that will be used to limit the size of the list down to a max of 20.
//
// Task 2：
// Use the ltrim command to limit the size of the list stored within redis to a maximum size of 20
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
  redisClient.lrange("questions", 0, -1, function(err, questions) {
    questions.forEach(function(question) {
      client.emit("question", question);
    });
  });

  client.on('answer', function(question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
      redisClient.lpush("questions", question, function(){
        redisClient.ltrim('questions', 0, 19);
      });
    }
  });
});
