var cityInput = $('.city-input');
var cityButton = $('#city-button');
//array of cities
var citiesArray = [];
var cityExample;
var key = 'f055730f6bf5880a78764b59ff3e1dff'
var currentUrl;




//loop through the array and append them to the HTML
function generateCity() {
    console.log('hello')
    $('.city-display').empty();
    $('.weatherDisplay').empty();
    citiesArray.forEach(function (city) {
        var cityDiv = $('<div>');
        cityDiv.addClass(`cityList`)
        cityDiv.attr('id',`${city}`)
        cityDiv.text(city);
        $('.city-display').append(cityDiv);
        
        
        
    });
    var tempDiv = $('<div class ="temp">');
var humDiv = $('<div class="humidity" >');
var windDiv = $('<div class="wind">');
var uvDiv = $('<div class="uv">');
    //asigning the city
    cityExample = citiesArray[citiesArray.length - 1];
    //Url for the api
    currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityExample}&units=imperial&appid=${key}`;
    $.ajax({
        'url': currentUrl,
        'method':'GET'
    }).then(function(res){ console.log(res);
        tempDiv.text(res.main.temp);
        humDiv.text(res.main.humidity);
        windDiv.text(res.wind.speed);
        // uvDiv.text(res.)
    
        // weatherDiv.text(JSON.stringify(res));
        $('.weatherDisplay').append(tempDiv).append(humDiv).append(windDiv);
    })
    
    
};
//push to the array
function pushCities() {
    var storedCity = cityInput.val().toLowerCase();
    citiesArray.push(storedCity);
    generateCity();
}


//Generates the Weather once we click it 
function displayWeather (e) { 
    $('.weatherDisplay').empty();
var tempDiv = $('<div class ="temp">');
var humDiv = $('<div class="humidity" >');
var windDiv = $('<div class="wind">');
var uvDiv = $('<div class="uv">');
var weatherClass = $(e.target).attr('id')
currentUrl = currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherClass}&units=imperial&appid=${key}`
$.ajax({
    'url': currentUrl,
    'method':'GET'
}).then(function(res){ console.log(res);
    tempDiv.text(res.main.temp);
    humDiv.text(res.main.humidity);
    windDiv.text(res.wind.speed);
    // uvDiv.text(res.)

    // weatherDiv.text(JSON.stringify(res));
    $('.weatherDisplay').append(tempDiv).append(humDiv).append(windDiv);
})


}

$(document).on('click', '#city-button', pushCities);
$(document).on('click', '.cityList', displayWeather);