const express = require("express");

var app = express();

// Get the page / as index.html
app.get('/', function (req, res) {
  /* By setting the view engine as EJS,
  the server will go automatically into views folder */
  res.render('pages/index.ejs');
})

app.get('/hello', function (req, res) {
  res.render('pages/hello_world.ejs', { name: 'Hello world' });
})

module.exports = app;