var animals = ["Dog", "Cat", "Bird", "Snake", "Giraffe", "Mouse", "Fish", "Bug",];

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

$("#add-animal").on("click", function(event){
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
})


function displayAnimalInfo () {
  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=qXmzGsZI4v039l2oVSrlHS3AJZAY0mDC&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#gifs-appear-here").prepend(animalDiv);
      }
    });
};

$(document).on("click", ".animal-btn", displayAnimalInfo);