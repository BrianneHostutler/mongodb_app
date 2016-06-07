var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});


// Routes
app.get('/', function(req, res) {
  res.send("Hello world");
});

//Get from DB
app.get('/all', function(req, res) {
  db.scrapedData.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.get('/scrape', function(req, res) {
  request('https://www.reddit.com/r/webdev', function(error, response, html) {
    var $ = cheerio.load(html);
    $('.title').each(function(i, element) {
      var title = $(this).children('a').text();
      var link = $(this).children('a').attr('href');

      if (title && link) {
        db.scrapedData.save({ //or use db.scrapedData.insert
          title: title,
          link: link
        }, function(err, saved) {
          if (err) {
            console.log(err);
          } else {
            console.log(saved);
            var textDiv = $('<div>');
            textDiv.addClass('textStyling');
            textDiv.append(saved);
            $('#text').prepend(textDiv);
          }
        });
      }
    });
  });
  res.send("Scrape Complete");

});

// ============================================================

//Find One in DB
app.get('/find/:id', function(req, res){

    //when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))
    console.log(req.params.id);
    db.notes.findOne({
        '_id': mongojs.ObjectId(req.params.id)
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(found);
            res.send(found);
        }
    });
});


//Update One in the DB
app.post('/update/:id', function(req, res) {
    //when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))

//updating with req.body info based on ID
	db.notes.update({
    '_id': mongojs.ObjectId(req.params.id)
  }, {
    $set: {
            'title': req.body.title,
      'note': req.body.note,
            'modified': Date.now()
    }
  }, function(err, edited) {
    if (err) {
      console.log(err);
            res.send(err);
    } else {
      console.log(edited);
            res.send(edited);
    }
  });
});


//Delete One from the DB
app.get('/delete/:id', function(req, res) {
  db.notes.remove({
    "_id": req.params.id
  }, function(err, removed) {
    if (err) {
      console.log(err);
            res.send(err);
    } else {
      console.log(removed);
      res.send(removed);
    }
  });
});






app.listen(3000, function() {
  console.log('App running on port 3000!');
});
