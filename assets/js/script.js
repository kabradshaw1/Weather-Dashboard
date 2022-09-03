var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaycontainer = document.querySelector("#weather-container");
var cityButtonsEl = document.querySelector("#city-buttons");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var cityname = cityInputEl.value.trim();
  
    if (cityname) {
    //   getWeather(cityname);
        console.log(cityname);
  
      // clear old content
      cityInputEl.value = "";
    } else {
      alert("Please enter a City");
    }
};

var createButton = function (CityObj) {
    // create button
    var cityEl = document.createElement("button");
    // for styling
    var buttonHolder = document.querySelector("#history-buttons");
    cityEl.className = "btn btn-secondary";
    cityEl.innerHTML

    // going to need to add something here that will specificy what
    // it's going to search for when it's clicked

    // append to <div id="history-buttons">
    buttonHolder.appendChild(CityEl);

}

var getWeather = function(user) {
    // format the github api url
    // var lat = ;
    // var lon = ;
    // var part = ;
    // var appid = ;

    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat
    // "&lon=" + lon "&exclude=" + part "&appid=" + appid;
  
    // make a get request to url
    // fetch(apiUrl)
    //   .then(function(response) {
    //     console.log(response);
    //   }
        // request was successful
    //     if (response.ok) {
    //       console.log(response);
    //       response.json().then(function(data) {
    //         console.log(data);
    //         displayCity(data, user);
    //       });
    //     } else {
    //       alert('Error: City Not Found');
    //     }
    //   })
    //   .catch(function(error) {
    //     alert("Unable to get weather.");
    // });
};
  

cityFormEl.addEventListener("submit", formSubmitHandler);

// cityButtonsEl.addEventListener("click", buttonClickHandler);