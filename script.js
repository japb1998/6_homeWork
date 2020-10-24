var cityInput = $('.city-input');
var cityButton = $('#city-button');
//array of cities
var citiesArray = [];
var cityExample;
var key = 'f055730f6bf5880a78764b59ff3e1dff'
storedArray = JSON.parse(localStorage.getItem('cities'));
console.log(storedArray);
//this will check if localStorage has anything on
if (Array.isArray(storedArray)) {
    citiesArray = storedArray;
}
generateCity();

function giveMeFive(city) {
    $('.fiveDays').empty();
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=e6283d37d723963b63a443d7e415a531`,
        method: 'GET'
    }).then(
        function (res) {
            console.log(res);
            var fiveDays = res.list;
            console.log(fiveDays)
            for (var i = 0; i < res.list.length; i += 8) {
                var container = $('<div class="col-md-3 col-sm-6 weather">');
                var dateDiv = $('<div>');
                var tempDiv = $('<div>');
                var humDiv = $('<div>');
                //get the dt key and converting it so people can read it
                var dtConvertion = new Date(parseInt(fiveDays[i].dt) * 1000)
                var date = `${dtConvertion.getMonth()}/${dtConvertion.getDate()}/${dtConvertion.getFullYear()}`;
                var weatherImg = $('<img>');
                var weatherIcon = fiveDays[i].weather[0].icon;
                weatherImg.attr('src', `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
                dateDiv.text(date);
                tempDiv.text(fiveDays[i].main.temp);
                humDiv.text(fiveDays[i].main.temp);


                container.append(dateDiv).append(weatherImg).append(tempDiv).append(humDiv);
                $('.fiveDays').append(container);
            }
        })
}

//loop through the array and append them to the HTML
function generateCity() {
    console.log('hello')
    $('.city-display').empty();
    $('.weatherDisplay').empty();
    citiesArray.forEach(function (city) {
        var cityDiv = $('<div>');
        cityDiv.addClass(`cityList`)
        cityDiv.attr('id', city)
        cityDiv.text(city);
        $('.city-display').append(cityDiv);



    });
    cityExample = citiesArray[citiesArray.length - 1];
    displayWeather(cityExample);
    //     var tempDiv = $('<div class ="temp">');
    //     var humDiv = $('<div class="humidity" >');
    //     var windDiv = $('<div class="wind">');
    //     var uvDiv = $('<div>');
    //     var uvSpan = $('<span class="uv">');
    //     //asigning the city

    //     //Url for the api
    //     currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityExample}&units=imperial&appid=${key}`;
    //     $.ajax({
    //         'url': currentUrl,
    //         'method': 'GET'
    //     }).then(function (res) {
    //         console.log(res);
    //         tempDiv.text(`Tempeture:${res.main.temp}F`);
    //         humDiv.text(`Humidity:${res.main.humidity}%`);
    //         windDiv.text(`Wind:${res.wind.speed}MPH`);
    //         $.ajax({url:`http://api.openweathermap.org/data/2.5/uvi?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${key}`,
    //     method:'GET'}).then(function(response){console.log(response);
    //     uvSpan.text(`${response.value}`);
    //     uvDiv.text('UV Index: ').append(uvSpan)
    //     if (parseInt(response.value) > 5 ){ uvSpan.attr('style',"background-color : red")} else { uvSpan.attr('style',"background-color : green")}
    // });
    //         // uvDiv.text(res.)

    //         // weatherDiv.text(JSON.stringify(res));
    //         $('.weatherDisplay').append(tempDiv).append(humDiv).append(windDiv).append(uvDiv);
    //         giveMeFive(cityExample);
    //     })


};
//push to the array
function pushCities() {
    var storedCity = cityInput.val().toLowerCase();
    cityInput.val('');
    citiesArray.push(storedCity);
    localStorage.setItem('cities', JSON.stringify(citiesArray));
    generateCity();
}



function displayWeather(cityName) {
    $('.weatherDisplay').empty();
    var tempDiv = $('<div class ="temp">');
    var humDiv = $('<div class="humidity" >');
    var windDiv = $('<div class="wind">');
    var uvDiv = $('<div>');
    var uvSpan = $('<span class="uv">');
    // var weatherClass = $(e.target).attr('id')
    currentUrl = currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${key}`
    $.ajax({
        'url': currentUrl,
        'method': 'GET'
    }).then(function (res) {
        console.log(res);
        tempDiv.text(`Tempeture:${res.main.temp} F`);
        humDiv.text(`Humidity:${res.main.humidity}%`);
        windDiv.text(`Wind:${res.wind.speed} MPH`);
        // uvDiv.text(res.)
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/uvi?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${key}`,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            uvSpan.text(`${response.value}`);
            uvDiv.text('UV Index:').append(uvSpan)
            if (parseInt(response.value) > 5) {
                uvSpan.attr('style', "background-color : red")
            } else {
                uvSpan.attr('style', "background-color : green")
            }
        })
        // weatherDiv.text(JSON.stringify(res));
        $('.weatherDisplay').append(tempDiv).append(humDiv).append(windDiv).append(uvDiv);
    })
    giveMeFive(cityName);

}

$(document).on('click', '#city-button', pushCities);
$(document).on('click', '.cityList', function (e) {
    displayWeather($(e.target).attr('id'))
});