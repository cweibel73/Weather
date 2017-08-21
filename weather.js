 $.getJSON("https://ipinfo.io/json", function(json) {
    var locWeather = json.city+", "+json.region+" "+json.postal;
    $("#stuff").html("Weather for "+locWeather+":");

    $.getJSON(
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=" +
        json.postal +
        "&APPID=8bca6eeb0776d1fdcac847d84c82bbbe",
      function(data) {
         $("#temper").html(
            JSON.stringify(Math.floor(1.8 * (data.main.temp - 273)) + 32)+"&deg F"
          );
       
        var changeIt = 0;
        $("#toggler").on("click", function() {
          if(changeIt === 0) {
          $("#temper").html(
            JSON.stringify(Math.floor(data.main.temp - 273.15))+"&deg C"
          );
            changeIt = 1;
          } else {
            $("#temper").html(
            JSON.stringify(Math.floor(1.8 * (data.main.temp - 273) + 32))+"&deg F"
          );
            changeIt = 0;
          }
        });

       $("#humid").html("Humidity: "+JSON.stringify(data.main.humidity)+"%");
        $("#description").html(data.weather[0].main);
        var iconic = data.weather[0].icon;
        
        var iconImg = 
        "<img src = http://openweathermap.org/img/w/"+iconic+".png>";
       $("#theIcon").html(iconImg);
      });
  });

