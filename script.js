// When the search button is clicked
$(".btn").on("click", function(e)
{
    event.preventDefault();

    todayWeather();
    forecast();
    recents();
});

// Functions
// =========================================================================================================================
// Save recent search to local storage
let cities = [];
var apiKey = "503b94b7fc0f576d3f21c4ab45acef8a";
const recents = function ()
{
    // Push the search value into an array
    cities.push($("#search").val());

    // Store that array in local storage
    localStorage.setItem("city", JSON.stringify(cities));

    // Create a new div block for each recently searched item
    for(let i = 0; i < cities.length; i++)
    {
        let cityDiv = $("<div>").addClass("form-inline form-group row " + [i]).appendTo($("#recents"));
        let cityBtn = $("<button>").html(cities[i]).addClass("form-control col-8")

    }
    console.log(cities);
}

// Get today's weather
const todayWeather = function (search)
{
    // Open weather map API URL
    search = $("#search").val();
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&APPID=" + apiKey;

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

        lat = JSON.stringify(response.coord.lat);
        lon = JSON.stringify(response.coord.lon);

        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        // Get the UV index from 'Open weather map' API
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) 
        {
            // API Object in Console
            console.log(response);

            // Replace card UV with API UV
            $("#UV").html("UV Index: " + response.value);
        });
    });
};

// Get the 5-day Forecast
const forecast = function(search)
{
    // Get the forecast from 'Open weather map' API
    search = $("#search").val();
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&APPID=" + apiKey;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) 
    {
        console.log(response);
        for(var i = 0; i < 5; i++)
        {
            $("<div>").attr({class:"col-sm", id: "card" + i}).appendTo($("#forecast"));
            $("<div>").attr({class:"card", id:"cardBody" + i}).appendTo($("#card" + i));
            $("<h2>").attr({class:"card-title", id: "title" + i}).appendTo($("#cardBody" + i));
            
        }
    })
})



