var cityInput = document.getElementById("cityInput").value;
console.log(cityInput)
var APIKey = "56aab3faba12a50138eb8a46ffc3825b";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;

$('button').on('click', function () {
    event.preventDefault();
    cityInput.name = $("#cityInput").val().trim()
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response){
        })

})