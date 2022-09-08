// This javascript access the DOM with a mixture of jquery and vanilla js for practice. 
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var todaycontainer = document.querySelector("#weather-container");
var cityButtonsEl = document.querySelector("#history-buttons");
var buttons = [];

var saveButtons = function () {
    localStorage.setItem("buttons", JSON.stringify(buttons));
};

// loads when page is loaded, if there are any in local storage
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

// takes info put into submit form and passes it to create button and getWeather
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var cityname = cityInputEl.value.trim();
  
    if (cityname) {
        createButton(cityname);
        getWeather(cityname);
  
      // clear old content
      cityInputEl.value = "";
    } else {
      alert("Please enter a City");
    }
};

// creates buttons when called by formSubmitHandler
var createButton = function (cityObj) {
    // create button
    var cityEl = document.createElement("button");
    cityEl.id = "searched"
    // for styling
    var buttonHolder = document.querySelector("#history-buttons");
    cityEl.className = "btn btn-secondary mb-1";
    cityEl.innerHTML = cityObj;

    // check if button is there already
    if (!buttons.includes(cityEl.innerHTML)) {
      // append to <div id="history-buttons">
      buttonHolder.appendChild(cityEl);
      buttons.push(cityObj);
      saveButtons();
    } else {
      return;
    }
}

// creates elements to store weather organizes the data and appends to page
var displayWeather = function (weather, city) {
  // no city found
  if (weather.length === 0) {
    todaycontainer.textContent = "City not found.";
    return;
  }
  // converts temp from Kelvin to degrees F
  var degreeF = function(K) {
    return (K - 273.15)*(9/5)+32;
  } 
  // fetches icon for all the days
  var icon = function(day) {
    return $("<img>").attr("src", "http://openweathermap.org/img/wn/" + weather.list[day].weather[0].icon + ".png");
  };

  
  // today's forcast
  var citySearched = $("#city-search-term")
  citySearched.text(city + " (" + weather.list[0].dt_txt.split(" ")[0] + ") ");
  citySearched.append(icon(0));
  var todaysWeather = $("#today-weather-container");
  var todaysTemp = $("<p>").text("Temp: " + degreeF(weather.list[0].main.temp).toPrecision(2) + "\u00b0 F");
  var todaysWind = $("<p>").text("Wind: " + weather.list[0].wind.speed + " MPH");
  var uvValue = $("<span>").css("background-color", "green").text("0.47");
  var todaysHumidity = $("<p>").text("Humidity: " + weather.list[0].main.humidity + "%");
  var uvIndex = $("<p>").text("UV Index: ").append(uvValue);
  todaysWeather.empty();
  todaysWeather.append(todaysTemp).append(todaysWind).append(todaysHumidity).append(uvIndex);

  // 5 day forcast
 
  var forcast = $("#forcast-weather");
  forcast.empty();
    for (var i = 1; i < 6; i++) {
      var listEl = $("<div>").css({"background-color": "#7FFFD4", "margin-right": "5px"}).addClass("col");
      var date = weather.list[i].dt_txt.split(" ")[0]
      var forcastIcon = icon(i);
      var forcastWind = $("<p>").text("Wind: " + weather.list[i].wind.speed + " MPH");
      var forcastTemp = $("<p>").text("Temp: " + degreeF(weather.list[i].main.temp).toPrecision(2) + "\u00b0 F");
      listEl.append(date).append(forcastIcon).append(forcastWind).append(forcastTemp)
      forcast.append(listEl)
    }
}

// fetches the json that has weather data
var getWeather = function(city) {
    // format the github api url
  
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=11988be7e9227615c1560b01dd5dbd6a";
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
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

// handles clicking on grey buttons and calls getWeather 
var buttonClickHandler = function(event) {
  id = event.target.getAttribute("id")
  city = event.target.innerHTML;
  if (id = searched) {
    getWeather(city);
  }
}
  
cityFormEl.addEventListener("submit", formSubmitHandler);

cityButtonsEl.addEventListener("click", buttonClickHandler);

loadButtons();