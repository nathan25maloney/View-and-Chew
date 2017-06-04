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

var isCorrectDate = false;

function testJS(whatArg, whenArg, whereArg) {
    var a = whatArg.toString();
    var b = whenArg.toString();
    var c = whereArg.toString();
    
    // enter your own file path here!!

        url = 'https://nathan25maloney.github.io/View-and-Chew/index-2.html?what=' + encodeURIComponent(a)+'&when='+encodeURIComponent(b)+'&where='+encodeURIComponent(c);
        // url = 'file:///C:/Users/Nathan/Desktop/code/View-and-Chew/index-2.html?what=' + encodeURIComponent(a)+'&when='+encodeURIComponent(b)+'&where='+encodeURIComponent(c);
        // url = 'file:///Users/saulpg/Desktop/Project/View-and-Chew/index-2.html?what=' + encodeURIComponent(a)+'&when='+encodeURIComponent(b)+'&where='+encodeURIComponent(c);


    document.location.href = url;
}

function testDate(a,b,c) {
    var d = new Date();
    var e = new Date(b);
    console.log("Today's date to int: "+d+".  Enterred date to Int: "+e);

    if (d.getTime() < e.getTime() ){

        testJS(a,b,c);

        } else {
            console.log("Please Enter in Valid Date");
        }
}


$(document).ready(function() {
	


    $("#addChar").on("click", function(e) {
        console.log("hey I got clicked");
    	e.preventDefault();

    	var a = $("#whatEvent").val().trim();
    	var b = $("#whenEvent").val().trim();
    	var c = $("#whereEvent").val().trim();
    	
    	
    	
    	testDate(a,b,c);
    	

});

    

});






  


