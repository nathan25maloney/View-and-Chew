//FIREBASE DATABASE
var config = {
    apiKey: "AIzaSyCWOSIGhQZ9E4xJ3f8HpZu8QsJiyCiD8f4",
    authDomain: "group-project-305bb.firebaseapp.com",
    databaseURL: "https://group-project-305bb.firebaseio.com",
    projectId: "group-project-305bb",
    storageBucket: "group-project-305bb.appspot.com",
    messagingSenderId: "898983937765"
 };
 firebase.initializeApp(config);



 function eventSearch(whatArg,whenArg,whereArg) {
 	var latLong = "";
 	 var geocoder =  new google.maps.Geocoder();
	    geocoder.geocode( { 'address': whereArg}, function(results, status) {
	          if (status == google.maps.GeocoderStatus.OK) {
	          	console.log(results[0].geometry.location.lat());
	          	console.log(results[0].geometry.location.lng());
	            latLong =results[0].geometry.location.lat()+"," +results[0].geometry.location.lng();
	            console.log(latLong);


	            var latLongString = latLong.toString();  
				console.log("the string of lat and long ",latLongString); 
				var when = whenArg;
				var what = whatArg;
			 	var eventQueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?latlong="+latLongString+"&endDateTime="+when +"T23:59:59Z&classificationName="+what+"&apikey=FPzWHn2ZYdKIpOOHgDw7rZMZpISVYwdG";

			 	$.ajax({
				    url: eventQueryURL,
				    method: "GET"
				}).done(function(response) { 
					console.log("this is ticketmasters response ",response);

				});
	          } else {
	            alert("Something got wrong " + status);
	          }
	        });


 }
 





 // $.ajax({
 //        url: yelpQueryURL,
 //        method: "GET"
 //    }).done(function(response) { 


 //    });



    $(document).ready( function(){
    	eventSearch("music","2017-05-30","chandler, az");
    	$("#search-btn").on("click", function(){

		}); 

    });

 

