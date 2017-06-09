var mapLat;
var mapLng;
var map;
var infowindow;
var location;

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
		

		btn.html(argument[i].name+"<br>"+ "Appearing on " + date +" at "+ argument[i].dates.start.localTime+"<br>"+"Location: " +argument[i]._embedded.venues[0].address.line1+" in "+argument[i]._embedded.venues[0].city.name);
		
		btn.on("click", function(e) {
	    	
	    	e.preventDefault();
	    	var holder;
	    	holder = this.id.split(" ");
	    	console.log(parseFloat(holder[0]));
	    	mapLat = parseFloat(holder[0]);
	    	mapLng = parseFloat(holder[1]);
	    	
	    	initMap(mapLat,mapLng); 


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





  function initMap(mapLat,mapLng) {
  		console.log("mapLat = "+mapLat+" mapLng = "+mapLng);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,

          center: {lat: 33.3031475, lng: -111.8426259}
        });

        if(mapLat === undefined || mapLng === undefined){

        }else {
	        
	        pos = {lat: mapLat, lng: mapLng};
	        var marker = new google.maps.Marker({
	          map: map,
	          position: pos,
	          label: 'The Event'
	        });
	        
	        map.setCenter(pos);

	        
	        console.log("step1");

	        
	        var request = {
	          location: pos,
	          radius: '1500',
	          types: ['restaurant']
	        };
	        service = new google.maps.places.PlacesService(map);
	        service.nearbySearch(request, callback);
	        var clickHandler = new ClickEventHandler(map, pos);
		}
      }


function callback(results, status) {
		console.log("step2");
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          for (var i = 0; i < results.length; i++) {
          	
            	createMarker(results[i],results[i].name, i*400);
           
          }
        }
      }


function createMarker(place,name,timeout) {
	setTimeout(function() {
		var photos = place.photos;

		if (!photos) {
		    return;
		  }
		

		var placeLoc = place.geometry.location;
        
        var marker = new google.maps.Marker({

          map: map,
          position: placeLoc,
          animation: google.maps.Animation.DROP,
          icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})
        });


        // infowindow = new google.maps.InfoWindow;

        google.maps.event.addListener(marker, 'click', function() {
        	console.log(marker.icon);
        	console.log(marker);
            marker.icon = changeSize(marker.icon);
         
        });
	}, timeout);

      }      
function changeSize(str) {
	
	var ending = str.slice(-9);
	var strHolder = str.split("/")
	var emptyStr = "";
	if (ending === "50-h50-k/"){

		strHolder[7] = "w150-h150-k";
		for (var i = 0; i < strHolder.length-1; i++) {
			
			emptyStr += strHolder[i]+"/";
			console.log(strHolder[i]);
			console.log(i);
		}
		console.log("the new String " +emptyStr);
	}
	return emptyStr;


  
}  

 var ClickEventHandler = function(map, origin) {
        this.origin = origin;
        this.map = map;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);
        this.placesService = new google.maps.places.PlacesService(map);
        this.infowindow = new google.maps.InfoWindow;
        this.infowindowContent = document.getElementById('infowindow-content');
        this.infowindow.setContent(this.infowindowContent);

        // Listen for clicks on the map.
        this.map.addListener('click', this.handleClick.bind(this));
      };

 ClickEventHandler.prototype.handleClick = function(event) {
        console.log('You clicked on: ' + event.latLng);
        // If the event has a placeId, use it.
        if (event.placeId) {
          console.log('You clicked on place:' + event.placeId);

          // Calling e.stop() on the event prevents the default info window from
          // showing.
          // If you call stop here when there is no placeId you will prevent some
          // other map click event handlers from receiving the event.
          event.stop();
          this.calculateAndDisplayRoute(event.placeId);
          this.getPlaceInformation(event.placeId);
        }
      };      

ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId) {
        var me = this;
        this.directionsService.route({
          origin: this.origin,
          destination: {placeId: placeId},
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };
  ClickEventHandler.prototype.getPlaceInformation = function(placeId) {
        var me = this;
        this.placesService.getDetails({placeId: placeId}, function(place, status) {
          if (status === 'OK') {
            me.infowindow.close();
            me.infowindow.setPosition(place.geometry.location);
            me.infowindowContent.children['place-icon'].src = place.icon;
            me.infowindowContent.children['place-name'].textContent = place.name;
            
            me.infowindowContent.children['place-address'].textContent =
                place.formatted_address;
            me.infowindow.open(me.map);
          }
        });
      };     