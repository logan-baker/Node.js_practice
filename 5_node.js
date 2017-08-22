// Section 5 - Express
// Express is a sinatra inspired web dev framework for Node.js. gives it: easy route URLs, middleware, redirection helpers, file uploads.



// --------------EXERCISES-------------
// 5.2 Let's create an express route that accepts GET requests on '/tweets' and responds by sending back a static HTML file.
var express = require('express');
var app = express();


// TASK 1/3 Create a GET route for '/tweets' and give it the proper callback. The callback function should accept two arguments: the request and the response.
// 2/3 Send back the file tweets.html, which lives under the project's root path. Remeberto use __dirname to locate tweets.html
// 3/3 Finally, have the express app listen on port 8080


// ----------------------------------------------------

// 5.3 Let's create a route that accepts dynamic arguments in the URL path and responds with the quote from the proper author.
var express = require('express');
var app = express();

var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};



app.listen(8080);


// TASK  1/2 Start by creating a GET route for '/quotes' that takes a name parameter as part of the URL path.
// 2/2 Now, use the name parameter from the URL to retrieve a quote from the quotes object and write it out to the response. Note: No piping here, just write the quote string to the response like you did in previous levels (and then close the response).


var app = express();

var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function(req, response){
  response.end(quotes[req.params.name]);
});

app.listen(8080);




// ----------------------------------------------------

// 5.4 Instead of just writing out the quote to the response, let's try using an EJS template to render the response.
var express = require('express');
var app = express();

var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function(req, res) {
  var quote = quotes[req.params.name];


});

app.listen(8080);
// Task 1：
// First, render the quote.ejs template to the response.
//
// Task 2：
// Next, make the name and the quote data available to the template.
//
// Task 3：
// Inside quote.ejs, add the code needed to render the data you passed to the template.
// app.js
var express = require('express');
var app = express();

var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function(req, res) {
  var quote = quotes[req.params.name];
  res.render('quote.ejs', {
    name: req.params.name,
    quote: quote
  });
});

app.listen(8080);
var express = require('express');
// views/quote.ejs
<h2>Quote by <%= name %></h2>
<blockquote>
  <%= quote %>
</blockquote>


// ----------------------------------------------------


// 5.5 Let's create a page which calls the Twitter search API and displays the last few results for Code School. The first step is to construct the proper URL, which is all you need to do in this challenge.
//
// Complete the URL options which will be sent into the the url module's format method. The URL you'll want to construct is the following: http://search.twitter.com/search.json?q=codeschool
var url = require('url');

options = {
  // add URL options here

};

var searchURL = url.format(options);
console.log(searchURL);

// Task 1：
// Add the protocol attribute to options.
//
// Task 2：
// Add the host attribute to options.
//
// Task 3：
// Add the pathname attribute to options.
//
// Task 4：
// Add an attribute which takes an object of query parameters, in this case we only need q to search Twitter.
var url = require('url');

options = {
  // add URL options here
  protocol: 'http:',
  host : 'search.twitter.com',
  pathname : '/search.json',
  query: {q:'codeschool'}
};

var searchURL = url.format(options);
console.log(searchURL);



// -------------------------------------------------------

// 5.6 Next, we'll use the request module to make a simple web request and log the response to the console. You can use this example in the README.
var url = require('url');

var options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: { q: "codeschool"}
};

var searchURL = url.format(options);

// Task 1：
// To start, require the request module and assign the return function to a variable.
//
// Task 2：
// Next, issue a request to searchURL. Remember, the callback function for the request function takes three arguments: error, response and body.
//
// Task 3：
// Finally, log the response body to the console using console.log()
var url = require('url');

var options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: { q: "codeschool"}
};

var searchURL = url.format(options);
var request = require('request');
request(searchURL, function(error, response , body){
    console.log(body);
});


// -------------------------------------------------------
// 5.7 Now, let's create an Express server which queries out for the search term and then returns the JSON
var url = require('url');
var request = require('request');

var options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: {
    q: "codeschool"
  }
};

var searchURL = url.format(options);

var app; // Create server here
// Task 1：
// Require the express module.
//
// Task 2：
// Create the Express server and name it app.
//
// Task 3：
// Create a route for GET requests to / (root path). Remember, the callback function takes two arguments: a request req and a response res.
//
// Task 4：
// In our new route, issue a request to searchURL and pipe the results into the response.
//
// Task 5：
// Finally, tell app to listen on port 8080.
var url = require('url');
var request = require('request');
var express = require('express');
var options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: {
    q: "codeschool"
  }
};

var searchURL = url.format(options);

var app = express();
app.get('/', function(req, res){
    request(searchURL).pipe(res);
}).listen(8080);
