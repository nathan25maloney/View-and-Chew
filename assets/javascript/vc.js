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
                method: "GET"
            }).done(function(response) {
                console.log("this is ticketmasters response ",response);
				var results = response._embedded.events;
				updatePage(results);
            });
        } else {
            alert("Something got wrong " + status);
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


 
function updatePage(argument) {
	var name;
	var date;
	var time;
	var priceMax;
	var priceMin;
	var address;


	for (var i = 0; i < argument.length; i++) {
		var head = $("<div>");
		head.attr("class","panel-body");
		var title = $("<button>");
		date = dateConverter(argument[i].dates.start.localDate);
		console.log("date "+date);
		title.text(argument[i].name+" appearing on "+date +" at "+ argument[i].dates.start.localTime+" at " +argument[i]._embedded.venues[0].address.line1 );
		head.append(title);
		$("#result-div").append(head);
		

	}
}



 




$(document).ready(function() {
    
    $("#addChar").on("click", function(e) {
    	e.preventDefault();

    	var a = $("#whatEvent").val().trim();
    	var b = $("#whenEvent").val().trim();
    	var c = $("#whereEvent").val().trim();

    	console.log(a, b, c);

    	eventSearch(a, b, c);


});

});
