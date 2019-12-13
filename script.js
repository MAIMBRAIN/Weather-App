// When the search button is clicked
$(".btn").on("click", function(e)
{
    event.preventDefault();

    // Open weather map API URL
    var apiKey = "503b94b7fc0f576d3f21c4ab45acef8a";
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + $("#search").val() + "&APPID=" + apiKey;

    // Get Today's weather 'Open weather map' API
    $.ajax({
        url: weatherURL,
        method: "GET"
    
    }).then(function(response)
    {
        // API Object in Console
        console.log(response);

        // Replace card title with city name
        $("#title").html(response.name);

        // Replace card temp with API temperature
        $("#temp").html("Temperature: " + response.main.temp);

        // Replace card humidity with API humidity
        $("#humidity").html("Humidity: " + response.main.humidity);

        // Replace card windSpeed with API wind
        $("#windSpeed").html("Wind Speed: " + response.wind.speed);
    });
    
    // Get the UV index from 'Open weather map' API
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" + "appid=" + apiKey + "&" + $("#search").val();

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function(response)
    {
        console.log(response);
    })

    // Get the forecast from 'Open weather map' API
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + $("#search").val() + "&APPID=" + apiKey;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response)
    {
        console.log(response);
    })
})




