var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaycontainer = document.querySelector("#weather-container");
var cityButtonsEl = document.querySelector("#city-buttons");
var buttons = [];

var saveButtons = function () {
    localStorage.setItem("buttons", JSON.stringify(buttons));
};

var loadButtons = function() {
    var savedButtons = localStorage.getItem("buttons");
    // if there are no buttons saved, set buttons to an empty array and return of the funtion
    if(!savedButtons) {
        return false;
    };

    // else, load up buttons

    // parse into array of objects
    savedButtons = JSON.parse(savedButtons);

    // loop through savedButtons array
    for (var i = 0; i < savedButtons.length; i++) {
        // pass each button object to createButton() function
        createButton(savedButtons[i]);
    }
};

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var cityname = cityInputEl.value.trim();
  
    if (cityname) {
    //   getWeather(cityname);
        // createButton(cityname);
        getWeather(cityname);
  
      // clear old content
      cityInputEl.value = "";
    } else {
      alert("Please enter a City");
    }
};

var createButton = function (cityObj) {
    // create button
    var cityEl = document.createElement("button");
    // for styling
    var buttonHolder = document.querySelector("#history-buttons");
    cityEl.className = "btn btn-secondary mb-1";
    cityEl.innerHTML = cityObj;

    // going to need to add something here that will specificy what
    // it's going to search for when it's clicked

    // append to <div id="history-buttons">
    buttonHolder.appendChild(cityEl);
    buttons.push(cityObj);
    saveButtons();
}

 // if (weather.length === 0) {
  //   todaycontainer.textContent = "City not found.";
  //   return;
  // }

var displayWeather = function (weather, city) {
  console.log(weather)
  console.log(city);

  var degreeF = function(K) {
    return (K - 273.15)*(9/5)+32;
  } 
  iconUrl = "http://openweathermap.org/img/wn/" + weather.list[0].weather[0].icon + ".png";
  icon = $("<img>").attr("src", iconUrl);
  
  var citySearched = $("#city-search-term")
  citySearched.text(city + " (" + weather.list[0].dt_txt.split(" ")[0] + ") ");
  citySearched.append(icon);

  // today's forcast
  var todaysWeather = $("#today-weather-container");
  var todaysTemp = $("<p>").text("Temp: " + degreeF(weather.list[0].main.temp).toPrecision(2) + "\u00b0 F");
  var todaysWind = $("<p>").text("Wind: " + weather.list[0].wind.speed + " MPH");
  var uvValue = $("<span>").css("background-color", "green").text("0.47");
  var todaysHumidity = $("<p>").text("Humidity: " + weather.list[0].main.humidity + "%");
  var uvIndex = $("<p>").text("UV Index: ").append(uvValue);
  todaysWeather.append(todaysTemp).append(todaysWind).append(todaysHumidity).append(uvIndex);

  // 5 day forcast
  var forcast = ("forcast-weather");
  var forcastIcon = "http://openweathermap.org/img/wn/" + weather.list[1].weather[0].icon + ".png";


}

var getWeather = function(city) {
    // format the github api url
  
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=11988be7e9227615c1560b01dd5dbd6a";
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // console.log(response);
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            
            displayWeather(data, city);
          });
        } else {
          alert('Error: City Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to get weather.");
    });
};


  

cityFormEl.addEventListener("submit", formSubmitHandler);

// cityButtonsEl.addEventListener("click", buttonClickHandler);

loadButtons();