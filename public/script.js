//get the previously scraped data from /articles
$.getJSON('/articles', function(data) {
  for (var i = 0; i<10; i++){
    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '</p>');
  }
});

$("#clear").click(function(){
    $('#articles').empty();
});

$("#save").click(function(){

})


$("#get").click(function(){
  $('#notes').empty();
  var id = $(this).attr('data-id');
  $.ajax({
    method: "GET",
    url: "/articles/" + id,
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').append('<h2>' + data.title + '</h2>');
      $('#notes').append('<input id="titleinput" name="title" >');
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>');
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      if(data.note){
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
      }
    });
});

// $(document).on('click', '#save', function(){
//   var thisId = $(this).attr('data-id');
//
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       title: $('#titleinput').val(),
//       body: $('#bodyinput').val()
//     }
//   })
//     .done(function( data ) {
//       console.log(data);
//       $('#notes').empty();
//     });
//
//
//   $('#titleinput').val("");
//   $('#bodyinput').val("");
// });
