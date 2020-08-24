//var cityInput = document.getElementById("cityInput").value;
var APIKey = "56aab3faba12a50138eb8a46ffc3825b";
var current = moment().format('MMMM Do YYYY, h:mm:ss a');
var searched = [];

var weatherSearch = $('button').on('click', function(){
        getWeather($("#cityInput").val().trim())
});

$("#cityPop").on("click", "li", function(){
        console.log($(this).text())
        getWeather($(this).text())
});

function getWeather(cityInput) {
        event.preventDefault();
        searched.push(cityInput);
        console.log(searched)
        localStorage.setItem('search', JSON.stringify(searched));
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;
        $.ajax({
                url: queryURL,
                method: "GET"
        }).then(function (response) {
                console.log(response)
                var tempF = ((response.main.temp - 273.15) * 1.80 + 32);
                var fixedF = Math.round(tempF)
                var imageW = response.weather[0].icon
                var humidity = response.main.humidity
                var wind = response.wind.speed
                var lat = response.coord.lat
                var lon = response.coord.lon
                var currentWeather = response.weather[0].main
                var sunburn = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${response.coord.lat}&lon=${response.coord.lon}`
                var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
                var imageUrl = "https://openweathermap.org/img/w/";
                var imageFinal = imageUrl + imageW + ".png"
                // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
                $(".city").html("<h2>" + response.name + " Weather Details</h2>")
                $(".temp").html("<h3>" + fixedF + " degrees Fahrenheit")
                $("#outside").attr("src", imageFinal);
                $(".date").text(current);
                $(".humidity").html("<h3>Humidity: " + humidity);
                $(".wind").html("<h3>Wind Speed: " + wind + " mph.");
                $('.weatherCurrent').html("<h3>Weather: " + currentWeather);

                $.ajax({
                        url: sunburn,
                        method: "GET"
                }).then(function (response2) {
                        // console.log(response2)
                        var uvIndex = response2.value
                        // console.log(uvIndex)
                        $("#uvInput").html("<h3>UV Index: " + uvIndex);
                        if (uvIndex < 2) {
                                $("#uvInput").attr("class", "lowSun");
                        } else if (2 <= uvIndex <= 5) {
                                $("#uvInput").attr("class", "moderateSun");
                        } else if (5 < uvIndex <= 7) {
                                $("#uvInput").attr("class", "highSun");
                        } else if (7 < uvIndex) {
                                $("#uvInput").attr("class", "veryHighSun")
                        }
                })

                $.ajax({
                        url: fiveDay,
                        method: "GET"
                }).then(function (response3) {
                        console.log(response3)
                        for (var i = 1; i < 6; i++) {
                                var future = moment().add(i, `d`).format('D')
                                console.log(future)
                                $("#" + i + ">.future").text(future);
                                $("#" + i + ">div>#forecastDaily").attr("src", imageUrl + response3.list[i].weather[0].icon + ".png");
                                var fTemp = ((response3.list[i].main.temp - 273.15) * 1.80 + 32);
                                var fTempFinal = Math.round(fTemp);
                                $("#" + i + ">.forecastTemp").text("Temp: " + fTempFinal + "Degrees");
                                $("#" + i + ">.forecastHumidity").text("Humidity: " + response3.list[i].main.humidity);
                        }

                })

        });
};



$("#document").ready(function () {
        // searched.push
        searched = (JSON.parse(localStorage.getItem('search')));
        console.log(searched);
        if (searched == null) {
                searched = []
        } else {
                for (var i = 0; i < searched.length; i++) {
                        $("#cityPop").append(`<li>${searched[i]}</li>`)
                        
                }
                console.log(searched)
        }
})