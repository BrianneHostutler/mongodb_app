//get the previously scraped data from /articles
$.getJSON('/articles', function(data) {
  for (var i = 0; i<10; i++){
    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '</p>');
  }
});
