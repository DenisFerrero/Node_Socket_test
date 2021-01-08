// Import libraries
const express = require("express");

// Counter variable for socket example
var counter = 0;

var app = express();

module.exports = function (io) {
  // Import pages
  app.use('/api/document', require('./documents')()); // call this page as localhost:3000/document/
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
      console.log(`Name inserted: ${req.body.name}`);
      res.render('pages/hello_world.ejs', { name: req.body.name });
    })

  // Knockout page serving
  app.route('/knockout_test')
    .get(function (req, res) {
      res.render('pages/document.ejs');
    })

  /*
  * IO vs Socket
  * - IO's a container of socket
  * - Socket's the single single socket
  *
  * To create a chat 1-to-1 between client-server
  * you have to check before the io.on connection
  * and then by using socket.on/socket.emit work with
  * the socket's data
  */

  io.on('connection', function (socket) {
    // Socket on 'toc' event
    socket.on('toc', function (data) {
      // Trigger 'tic'
      socket.emit('tic', { counter: counter++ });
    });
  });

  return app;
}