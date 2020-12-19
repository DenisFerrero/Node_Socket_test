// Import libraries
const express = require ("express");
const bodyparser = require("body-parser");
const path = require("path");

// Page management page
var app = express();

// Use ejs as view engine (allow parsing data received from server-side)
app.set('view engine', 'ejs');

// Default action to parse data from request
app.use(bodyparser.urlencoded({extended:false}));

// Serve and access node_modules as localhost:3000/modules (used to use library in frontend)
app.use("/modules", express.static(path.join(__dirname, 'node_modules')));

// Import the route from ./controller/index.js
app.use('/', require('./controllers/index.js'));

// Start the server on port 3000
app.listen(3000, function () {
  console.log('Server running on localhost:3000');
});

/* 
* Exporting the variable app
* when you'll import this file you'll get the app variable content
*/
module.exports = app;