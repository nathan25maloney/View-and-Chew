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
var database = firebase.database();


function testJS(whatArg, whenArg, whereArg) {
    var a = whatArg.toString();
    var b = whenArg.toString();
    var c = whereArg.toString();
    // enter your own file path here!!
        url = 'file:///Users/saulpg/Desktop/Project/View-and-Chew/index-2.html?what=' + encodeURIComponent(a)+'&when='+encodeURIComponent(b)+'&where='+encodeURIComponent(c);

    document.location.href = url;
}





	      


 

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
		var btn = $("<button>");
		btn.attr("class","eventButton")

		btn.attr("id",argument[i]._embedded.venues[0].location.latitude + " "+ argument[i]._embedded.venues[0].location.longitude);
		date = dateConverter(argument[i].dates.start.localDate);
		console.log("date "+date);

		btn.text(argument[i].name+" appearing on "+date +" at "+ argument[i].dates.start.localTime+" in " +argument[i]._embedded.venues[0].city.name+" at "+argument[i]._embedded.venues[0].address.line1 );
		head.append(btn);
		$("#result-div").append(head);
		

	}
}



 




$(document).ready(function() {
	
    
    $("#addChar").on("click", function(e) {
    	e.preventDefault();

    	var a = $("#whatEvent").val().trim();
    	var b = $("#whenEvent").val().trim();
    	var c = $("#whereEvent").val().trim();

    	

    	testJS(a,b,c);


});
    

});






  //YELP CLIENT ID: MGCEQJQ38cNnywFdTjCotw

  // var yelpURL = "https://api.yelp.com/v2/search?term=" + blah
  // $.ajax({
  //     url: yelpURL,
  //     method: "GET"
  // }).done(function(x){
  //     console.log(TEST REQUEST FROM FIRST HTML PAGE HERE);
  // });


