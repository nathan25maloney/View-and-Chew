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

var d = new Date();

function testJS(whatArg, whenArg, whereArg) {
    var a = whatArg.toString();
    var b = whenArg.toString();
    var c = whereArg.toString();
    // enter your own file path here!!

        url = 'https://nathan25maloney.github.io/View-and-Chew/?what=' + encodeURIComponent(a)+'&when='+encodeURIComponent(b)+'&where='+encodeURIComponent(c);

    document.location.href = url;
}


$(document).ready(function() {
	
    
    $("#addChar").on("click", function(e) {
    	e.preventDefault();

    	var a = $("#whatEvent").val().trim();
    	var b = $("#whenEvent").val().trim();
    	var c = $("#whereEvent").val().trim();

    	

        //Function that checks date entered
        checkInfo(b) {

        if (parseInt(d) < parseInt(b) ){

    	testJS(a,b,c);

        } else {
            prompt("Please Enter in Valid Date");
        }
    };
});
    

});






  


