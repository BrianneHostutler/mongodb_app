var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var cheerio = require('cheerio');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "hwScraping";
var collections = ["scrapData"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});

//Save to DB
app.post('/submit', function(req, res) {
  console.log(req.body);
  db.notes.save(req.body, function(err, saved) {
    if (err) {
      console.log(err);
    } else {
      res.send(saved);
    }
  });
});

//Get from DB  all the data and renders them to json
app.get('/all', function(req, res) {
  db.notes.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});
