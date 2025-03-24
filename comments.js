// create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up static files
app.use(express.static(path.join(__dirname, 'public')));

// set up comments file
var commentsFile = path.join(__dirname, 'data', 'comments.json');

// get comments
app.get('/comments', function(req, res) {
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading comments file');
      return;
    }     
    res.json(JSON.parse(data));
  });
});

// add comment
app.post('/comments', function(req, res) {
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading comments file');
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsFile, JSON.stringify(comments), function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Error writing comments file');
        return;
      }
      res.json(comments);
    });
  });
});

// start server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
