$(document).ready(function() {
  var latitude, longitude, urlWeather;
  var urlGeo = "http://freegeoip.net/json/";

  //Set the date
  var date = new Date();
  var weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  $(".weekday").html(weekdays[date.getDay()]);
  $(".month").html(months[date.getMonth()]);
  $(".day").html(date.getDate());

  //Uppercase the description
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  //Get an image based on the weather
  function interactiveImage(id) {
    id = id.toString()[0];
    switch (id) {
      case "2":
        id = "<img src='https://www.dropbox.com/s/mbfaragnrgofeqf/Cloud-Lightning.png?raw=1'> ";
        break;
      case "3":
        id = "<img src='https://www.dropbox.com/s/mzqytswngw8jc75/Cloud-Drizzle.png?raw=1'> ";
        break;
      case "5":
        id = "<img src='https://www.dropbox.com/s/w0b1vx5xihxcpb5/Cloud-Rain.png?raw=1'> ";
        break;
      case "6":
        id = "<img src='https://www.dropbox.com/s/fkoumkn5usvixge/Cloud-Snow.png?raw=1'> ";
        break;
      case "7":
        id = "<img src='https://www.dropbox.com/s/d2x31egif5vnpxp/Cloud-Fog.png?raw=1'> ";
        break;
      case "8":
        id = "<img src='https://www.dropbox.com/s/yvvi5ls9pcbs055/Sun.png?raw=1'> ";
        break;
    }
    return id;
  }

  //Get latitude and longitude
  $.getJSON(urlGeo, function(data) {
    latitude = data.latitude;
    longitude = data.longitude;
    urlWeather = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=99bca3772274d66ebc38f71a01621b7f&units=metric";
    $(".city").html(data.city);

    //Get Weather info based on lat/lon
    $.getJSON(urlWeather, function(data) {
      console.log(data);
      var temp = Math.round(data.main.temp);
      var windSpeed = Math.round(data.wind.speed * 1.9438445) + " knots";
      var windDirection = data.wind.deg;
      var description = data.weather[0].description.capitalize();
      var id = interactiveImage(data.weather[0].id);
      console.log(id);
      console.log(description);
      if (windDirection >= 123.75 && windDirection < 213.75) {
        windDirection = "<img src='https://www.dropbox.com/s/gjcnxwhiihy4nsi/down.png?raw=1'> ";
      }
      if (windDirection >= 213.75 && windDirection < 303.75) {
        windDirection = "<img src='https://www.dropbox.com/s/sbkhllp3ycgtbaw/left.png?raw=1'> ";
      }
      if (windDirection >= 303.75 || windDirection < 33.75) {
        windDirection = "<img src='https://www.dropbox.com/s/nof5w705ikamz6t/up.png?raw=1'> ";
      }
      if (windDirection >= 33.75 && windDirection < 123.75) {
        windDirection = "<img src='https://www.dropbox.com/s/gk48v29ewbpj4uh/right.png?raw=1'> ";
      }
      var wind = windDirection + windSpeed;
      $(".temperature").html(temp + " <sup>°</sup><span id='unit'>C</span>");
      $(".wind").html(wind);
      $(".description").html(id + description);
      //1 = celsius, 2 = fahrenheit
      var unit = 1;
      //Switch to fahrenheit
      $("#switch").click(function() {
        if (unit === 2) {
          temp = Math.round((temp - 32) * (5/9));
          unit = 1;
          $(".temperature").html(temp + " <sup>°</sup><span id='unit'>C</span>");
          $("#switch").html("<i class='fa fa-repeat'></i> F");
        }
        else if (unit === 1) {
          temp = Math.round((temp * (9/5)) + 32);
          unit = 2;
          $(".temperature").html(temp + " <sup>°</sup><span id='unit'>F</span>");
          $("#switch").html("<i class='fa fa-repeat'></i> C");
        }
      });
    });

  });
});