// Section 4 - Modules

// Let's create a simple module in a file called "custom_hello.js"
var hello = function() {
  console.log("hello!");
}
// In order to expose/make the method public
module.exports = hello;
// export defines what require returns

// then inside or app.js file we can write var hello equals require custom_hello
var hello = require('./custom_hello');
// then call the method
hello();

// Then in another module, we can call a goodbye method, setting multiple as public. Let's create another module with three. Call it my_module.js
var foo = function() { ... }
var bar = function() { ... }
var baz = function() { ...
// to have two of the methods accessible outside the module
exports.foo = foo
exports.bar = bar

// in our app.js, we'll require the module and call the functions
var myMod = require('./my_module');
myMod.foo();
myMod.bar();
// baz is a private function, only available in the module



// --------------EXERCISES-------------
// 4.2 Notice the two different files: high_five.js on the left side and app.js on the right. The code as it's written will not work, high_five.js isn't exporting anything.
var highfive = function() {
  console.log("smack!!");
};

// TASK - Add the proper exports line to have a successgul high five
var highfive = function() {
  console.log("smack!!");
};
module.exports = highfive;


//4.3 Notice the app.js file with the myRequest function below. Let's refactor myRequest out to its own my_request.js module.
var http = require('http');

var myRequest = function(message) {
  var request = http.request('http://codeschool.com', function(response) {
    response.pipe(process.stdout, { end: false });
  });

  request.write(message);
  request.end();
};

myRequest('Hello, this is dog.');

// TASK 1/3-2/3 Move the myRequest function and the http require into my_request.js - put in my_request.js
var http = require('http');
var myRequest = function(message) {
  var request = http.request('http://codeschool.com', function(response) {
    response.pipe(process.stdout, { end: false });
  });

  request.write(message);
  request.end();
};
module.exports = myRequest;

// TASK 3/3 Require the my_request.js module in app.js
var myRequest = require('./my_request');
myRequest('Hello, this is dog.');



// 4.4 The app.js code on the right side does not work. Once again we forgot to export our functions.
var warn = function(message) {
  console.log("Warning: " + message);
};

var info = function(message) {
  console.log("Info: " + message);
};

var error = function(message) {
  console.log("Error: " + message);
};

// TASK 1 In the logger.js file, export the info function so we can use it in app.js by assigning it to the exports object.
// TASK 2 In the logger.js file, export the warn function so we can use it in app.js by assigning it to the exports object.
// TASK 3 In the logger.js file, export the error function so we can use it in app.js by assigning it to the exports object

exports.info = function(message) {
  console.log("Info: " + message);
};

exports.warn = function(message) {
  console.log("Warning: " + message);
};

exports.error = function(message) {
  console.log("Error: " + message);
};


// 4.5 Practice using npm by installing the npm module underscore using the npm install command.
```
help
npm install underscore
```



// 4.6 Now install the coffee-script module, but install it globally so you can use the coffee executable that comes with coffee-script.
```
npm install coffee-script -g
```

// 4.7 Add two dependencies to our package.json file, connect and underscore. We'll want to use version 2.1.1 of connect and version 1.3.3 of underscore
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {

  }
}
// TASK 1-2 Add the connect dependency to package.json, Add the underscore dependency to package.json
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {
    "connect": "2.1.1",
    "underscore": "1.3.3"
  }
}




// 4.8 We want to make sure we are always up-to-date with the most recent patch-level changes to our dependencies when we run npm install.
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {
    "connect": "2.2.1",
    "underscore": "1.3.3"
  }
}
// Task Update the connect version on package.json to fetch the latest patch-level changes. All we have to do is add one character to the beginning of the version number.
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {
    "connect": "~2.1.1",
    "underscore": "~1.3.3"
  }
}
