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

var getLatLon = function (submit) {
    
};

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var cityname = cityInputEl.value.trim();
  
    if (cityname) {
    //   getWeather(cityname);
        createButton(cityname);
        // getLatLon();
  
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
    cityEl.className = "btn btn-secondary";
    cityEl.innerHTML = cityObj;


    // going to need to add something here that will specificy what
    // it's going to search for when it's clicked

    // append to <div id="history-buttons">
    buttonHolder.appendChild(cityEl);
    buttons.push(cityObj);
    console.log(buttons);
    saveButtons();
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

loadButtons()