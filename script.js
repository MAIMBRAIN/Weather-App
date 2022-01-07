// When the search button is clicked
$(".btn").on("click", function()
{
    todayWeather();
    forecast();
    recents();
});

// Functions
// =========================================================================================================================
$('form').keypress(function(event) { 
    return event.keyCode != 13;
}); 

// Convert Date to Day
function getDay(dateStr, locale)
{
    let yyyy = dateStr.slice(0,4)
    let mm = dateStr.slice(5,7)
    let dd = dateStr.slice(8,10)
    let format = mm+'-'+dd+'-'+yyyy
    var date = new Date(format);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

// Convert Kelvin to Fahrenheit
function convertKtoF (temp){
    return(Math.round(temp * 1.8 - 459.67))
}

// Save recent search to local storage
let cities = [];
var apiKey = "503b94b7fc0f576d3f21c4ab45acef8a";
const recents = function ()
{
    // Push the search value into an array
    cities.push($("#search").val());

    // Store that array in local storage
    localStorage.setItem("city", JSON.stringify(cities));

    // Clear recent div to populate new divs below
    $("#recent").empty();
    // Create a new div block for each recently searched item
    for(let i = 0; i < cities.length; i++)
    {
        $("<button>").attr({class:"btn my-1",id:cities[i], type:"button", value:cities[i]}).text(cities[i]).val(cities[i]).appendTo($("#recent"))
    }
    console.log(cities);
}

// Get today's weather
const todayWeather = function (search)
{
    // Open weather map API URL
    search = $("#search").val();
    var weatherURL = "//api.openweathermap.org/data/2.5/weather?q=" + search + "&APPID=" + apiKey;

    // Get Today's weather 'Open weather map' API
    $.ajax({
        url: weatherURL,
        method: "GET"
    
    }).then(function(response)
    {
        // API Object in Console
        console.log(response);
        let date = new Date()

        // Replace card title with city name
        $("#title").html(response.name + ' - ' + (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear());

        // Replace card temp with API temperature
        $("#temp").html("Temperature: " + convertKtoF(response.main.temp) + " F");

        // Replace card humidity with API humidity
        $("#humidity").html("Humidity: " + response.main.humidity + "%");

        // Replace card windSpeed with API wind
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + "mph");

        lat = JSON.stringify(response.coord.lat);
        lon = JSON.stringify(response.coord.lon);

        var uvURL = "//api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

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
    let forecastURL = "//api.openweathermap.org/data/2.5/forecast?q=" + search + "&APPID=" + apiKey;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) 
    {
        console.log(response);
        $('#forecast').empty();

        for(let i = 0; i < 5; i++)
        {
            let resList = response.list[i*8];
            let dt = resList.dt_txt;
            let dateStr = dt.substring(0,10);
            let day = getDay(dateStr, "en-US");
            let temp = resList.main.temp;
            let humidity = resList.main.humidity;
            let windSpd = resList.wind.speed;
            let desc = resList.weather[0].description;
            
            $("<div>").attr({class:"col-sm", id: "card" + i}).appendTo($("#forecast"));
            $("<div>").attr({class:"card", id:"cardBody" + i}).appendTo($("#card" + i));
            $("<h2>").attr({class:"card-title", id: "day" + i}).text(day).appendTo($("#cardBody" + i));
            $("<h4>").attr({id: "date"+ i}).text(dt.substring(0,16)).appendTo($("#cardBody" + i));
            $("<p>").attr({class:"card-text" , id:"temp" + i}).text("Temperature: "+convertKtoF(temp) + " F").appendTo($('#cardBody' + i));
            $("<p>").attr({class:"card-text" , id:"humidity" + i}).text("Humidity: "+ humidity + "%").appendTo($('#cardBody' + i));
            $("<p>").attr({class:"card-text" , id:"windSpd" + i}).text("Wind Speed: "+ windSpd + "MPH").appendTo($('#cardBody' + i));
            $("<h6>").attr({class:"card-text" , id:"desc" + i}).text(desc).appendTo($('#cardBody' + i));
        }
    })
}