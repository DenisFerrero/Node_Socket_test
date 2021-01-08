// Import libraries
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const socket = require("socket.io");
// Init the database by requiring it
const database = require('./models/index');

// Page management page
var app = express();

// Use ejs as view engine (allow parsing data received from server-side)
app.set('view engine', 'ejs');

// Default action to parse data from request
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));

// Serve and access node_modules as localhost:3000/modules (used to use library in frontend)
app.use("/modules", express.static(path.join(__dirname, 'node_modules')));

// Start the server on port 3000
var server = app.listen(3000, function () {
  console.log('Server running on localhost:3000');
});

// Create a new instance of a socket on the same path of the website
var io = socket(server);
io.on('connection', function (socket) {
  console.log('New user connected!');
})

// Import the route from ./controller/index.js,
// Pass the socket instance to be used also in other files
app.use('/', require('./controllers/index.js')(io));

/* 
* Exporting the variable app
* when you'll import this file you'll get the app variable content
*/
module.exports = app;