var cityInput = document.getElementById("cityInput").value;
var APIKey = "56aab3faba12a50138eb8a46ffc3825b";


$('button').on('click', function () {
    event.preventDefault();
    cityInput = $("#cityInput").val().trim()
    console.log(cityInput);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;

    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response){
        console.log(response)
    
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
        $(".city").html("<h2>" + response.name + " Weather Details</h2>")
        var tempF = ((response.main.temp -273.15) * 1.80 + 32);
        var fixedF = Math.round(tempF)
        $(".temp").html("<h3>" + fixedF + " degrees Fahrenheit")
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
        })
})