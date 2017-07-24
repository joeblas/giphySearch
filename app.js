$(document).ready(function() {
  var topics = [ "happy", "excited", "scared", "confused", "crying", "surprised", "tired", "bored", "hungry"]
  

  function giphySearch() {
      var gif = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=c4076e983b4045dfaf01e7e40d3a468e&q=" + gif + 
      "&limit=10&offset=0&rating=G&lang=en"

      $.ajax({
          type: "GET",
          url: queryURL,
      }).done(function(response){
        var results = response.data;

        for (var i = 0; i <results.length; i++){
            var gifDiv = $("<div class ='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var giphyGif = $("<img class = 'rounded float-left'>");
            giphyGif.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(giphyGif);

            $("#gif-area").prepend(gifDiv);
        }

          console.log(response);
          $("#gif-area").html("<img>", response.data.images.original.url);
      })
  }

  function showButtons() {
      $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var p = $("<p>");
      var button = $("<button>");
      button.addClass("btn btn-primary");

      button.attr("data-name", topics[i]);

      button.text(topics[i]);

      $("#buttons").append(button);
      console.log(topics[i]);
    }
  }

  $("#searchButton").on("click", function(event) {
    event.preventDefault();
    

    var userInput = $("#search").val().trim();
    
    console.log(userInput);
    topics.push(userInput);
    showButtons();

    
  });

  $(document).on("click", "button", giphySearch); 
      
showButtons();
});
