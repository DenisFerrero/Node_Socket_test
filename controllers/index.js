// Import libraries
const express = require("express");

var app = express();

// Get the page / as index.html
app.get('/', function (req, res) {
  /* By setting the view engine as EJS,
  the server will go automatically into views folder */
  res.render('pages/index.ejs');
})

// Manage multiple routes using app.route
app.route('/hello')
  // Manage get route by returning Hello World as name
  .get(function (req, res) {
    res.render('pages/hello_world.ejs', { name: 'Hello world' });
  })

  // Manage post route by returning the input field as name
  .post(function (req, res) {
    /*
    * By using req.body.name you'll access data sended by the frontend
    * the .name parameter is the name attribute of the input field.
    * If you don't want to use form you could use an ajax call
    * (https://api.jquery.com/Jquery.ajax/)
    * if you do that the data'll be saved into req.query
    */
    console.log(`Save to database: ${req.body.name}`);
    res.render('pages/hello_world.ejs', { name: req.body.name });
  })

module.exports = app;