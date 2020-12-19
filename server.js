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

// Import the route from ./controller/index.js
app.use('/', require('./controllers/index.js'));

// Start the server on port 3000
app.listen(3000, function () {
  console.log('Server running on localhost:3000');
});

module.exports = app;