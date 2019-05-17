    $("button").on("click", function() {
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=qXmzGsZI4v039l2oVSrlHS3AJZAY0mDC&limit=10";
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            console.log(queryURL);
  
            console.log(response);
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
      });

// **CODE FROM IN-CLASS EXAMPLE, USE FOR REFERENCE/GUIDANCE**
// 	var searchTerms = ['fox', 'cow', 'chicken', 'pig', 'lizard'];

// 	var createButton = function (name) {
// 		var button = $('<button>');
// 		button.text(name);

// 		button.click(function () {
// 			gifQuery($(this).text());
// 		});

// 		$('.button-container').append(button);
// 	}

// 	var createButtonsFromArray = function (arr) {
// 		for (var i = 0; i < arr.length; i++) {
// 			createButton(arr[i]);
// 		}
// 	}

// 	var gifQuery = function (term) {
// 		var apiKey = "qXmzGsZI4v039l2oVSrlHS3AJZAY0mDC";
// 		var queryURL = "http://api.giphy.com/v1/gifs/search?apiKey="
// 			+ apiKey
// 			+ "&q=" + term;

// 		$.ajax({
// 			method: "GET",
// 			url: queryURL,
// 		}).then(function (result) {
// 			console.log(result);
// 		});
// 	}

// 	gifQuery("cat");

// 	createButtonsFromArray(searchTerms);
// });