$(document).ready(function () {

  var animals = ["Dog", "Cat", "Bird", "Snake", "Giraffe", "Mouse", "Fish", "Bug",];


  // Renders buttons for animals already in array
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < animals.length; i++) {
      var a = $("<button class='btn btn-primary'>");
      a.addClass("animal-btn");
      a.attr("data-animal", animals[i]);
      a.text(animals[i]);
      $("#buttons-view").append(a);
    }
  }

  renderButtons();

  // Adds additional buttons in search box
  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
  })

  // Displays GIFs
  function displayAnimalInfo() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=qXmzGsZI4v039l2oVSrlHS3AJZAY0mDC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        console.log(response.data);
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var animalImage = $("<img>");
          // Attributes multiple URLs to GIFs for *hopeful* playback
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-still", response.data[i].images.original_still.url);
          animalImage.attr("data-animate", response.data[i].images.original.url);
          animalImage.attr("data-state", "still");
          animalImage.attr("class", "gif");
          animalDiv.append(p);
          animalDiv.append(animalImage);
          $("#gifs-appear-here").prepend(animalDiv);
        }
      });
  };

  $(".gif").on("click", function () {
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  // Actions on buttons to display GIFs
  $(document).on("click", ".animal-btn", displayAnimalInfo);
});