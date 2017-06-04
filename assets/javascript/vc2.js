

function updatePage(argument,what) {
	var name;
	var date;
	var time;
	var priceMax;
	var priceMin;
	var address;


	for (var i = 0; i < argument.length; i++) {
		
		var btn = $("<button>");
		btn.attr("class","eventButton")

		btn.attr("id",argument[i]._embedded.venues[0].location.latitude + " "+ argument[i]._embedded.venues[0].location.longitude);
		date = dateConverter(argument[i].dates.start.localDate);
		

		btn.html(argument[i].name+"<br>"+ "Appearing on " + date +" at "+ argument[i].dates.start.localTime+"<br>"+"Location: " +argument[i]._embedded.venues[0].city.name+" at "+argument[i]._embedded.venues[0].address.line1 );
		btn.on("click", function(e) {
	    	
	    	e.preventDefault();
	    	var holder;
	    	holder = this.id.split(" ");
	    	console.log(parseFloat(holder[0]));
	    	initMap(parseFloat(holder[0]),parseFloat(holder[1])); 


		});
		$("#result-div").append(btn);

		

	}
}

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;

    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[i] = tmp[1];
         console.log("data " +data[i]);
    }

    tmp = data[2].split('%20');
    data[2]= tmp[0]+tmp[1];

    
    eventSearch(data[0],data[1],data[2]);
    
}



function eventSearch(whatArg, whenArg, whereArg) {
    var latLong = "";
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': whereArg }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location.lat());
            console.log(results[0].geometry.location.lng());
            latLong = results[0].geometry.location.lat() + "," + results[0].geometry.location.lng();
            console.log(latLong);


            var latLongString = latLong.toString();
            console.log("the string of lat and long ", latLongString);
            var when = dateConverter(whenArg);
            var what = whatArg;
            var eventQueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + latLongString + "&endDateTime=" + when + "T23:59:59Z&classificationName=" + what + "&apikey=FPzWHn2ZYdKIpOOHgDw7rZMZpISVYwdG";

            $.ajax({
                url: eventQueryURL,
                method: "GET",
                async:true,
			    dataType: "json",
			    success: function(json) {
			              console.log(json);
			              // Parse the response.
			              // Do other things.
			           },
			    error: function(xhr, status, err) {
			              // This time, we do not end up here!
			           }

            }).done(function(response) {
                console.log("this is ticketmasters response ",response);
				var results = response._embedded.events;
				updatePage(results);

				
				



            });
        } else {
            alert("Something went wrong " + status);
        }
    });
   };

   function dateConverter(startDate) {
 	var x = startDate.length;
 	var date = startDate.toString();
 	
 	var res;
 	var month;
 	var day;
 	var year;
 	if (date.charAt(2)==="%" || date.charAt(1)==="%"){
 		res = date.split("%2F");
 		month = res[0];
 		day = res[1];
 		year = res[2];
 		date = month+"/"+day+"/"+year;
 	}

 	if (date.charAt(2)==="/" || date.charAt(1)==="/"){
 		res = date.split("/");
 		if(parseInt(res[0])<=12){
 			month = res[0];
 			day = res[1];
 			year = res[2];
 			if(month.length === 1){
 				month = "0"+month;
 			}
 			if(day.length ===1){
 				day = "0"+day;
 			}
 			if(parseInt(year) < 100) {
 				year = "20"+year;
 				
 			} 
 			
 			date = year+"-"+month+"-"+day;
 		}
 		
 	} else {
 		res = date.split("-");
 		year = res[0];
 		month = res[1];
 		day = res[2];
 		
 		date = month+"/"+day+"/"+year
 		
 		
 	}
 	return date;
 }


 //YELP CLIENT ID: MGCEQJQ38cNnywFdTjCotw

  // var yelpURL = "https://api.yelp.com/v2/search?term=" + blah
  // $.ajax({
  //     url: yelpURL,
  //     method: "GET"
  // }).done(function(x){
  //     console.log(TEST REQUEST FROM FIRST HTML PAGE HERE);
  // });


  function initMap(mapLat,mapLng) {
  		console.log("mapLat = "+mapLat+" mapLng = "+mapLng);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,

          center: {lat: 33.3031475, lng: -111.8426259}
        });

        if(mapLat === undefined || mapLng === undefined){

        } else {
	        var infoWindow = new google.maps.InfoWindow;
	        pos = {lat: mapLat, lng: mapLng}
	        infoWindow.setPosition(pos);
	        infoWindow.setContent('Location of the venue.');
	        infoWindow.open(map);
	        map.setCenter(pos);
	    }
      }

  

  