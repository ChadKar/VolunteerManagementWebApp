 var config = {
    apiKey: "AIzaSyAefGkmEiYGdjYTspccWr2zA_ilYOwfQxU",
    authDomain: "volunteer-management-20853.firebaseapp.com",
    databaseURL: "https://volunteer-management-20853.firebaseio.com",
    projectId: "volunteer-management-20853",
    storageBucket: "volunteer-management-20853.appspot.com",
    messagingSenderId: "574062360222"
 };
firebase.initializeApp(config);
var database = firebase.database();

function getAvailability(){
	 alert("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");	

"use strict";
event.preventDefault();

var day = document.getElementById("dateEntry").value ;
alert("--BB---"+day);	

console.log("searching volunteer availibility for :" + day);
alert("---1---");	

//database.ref('/volunteer/volunteer1@gmail~com').once("value").then(function (data) {
//database.ref('/availability/'+day).once("value").then(function (data) {
database.ref('/availability/'+day).once("value").then(function (data) {
	
	console.log("Volunteer available  --" + data.val());
	alert("Volunteer available  --"+data.val());
//	alert("available --"+data.val().available.friday);
//	data.forEach(function(childData){
//		var key = childData.ket;
//	})
   if (data.val() === null) {
       console.log("Data could not be found");
       alert("---2  A---");
   } else {
   	alert("---2  B ---");
       var emailId = (data.val().emailId) ;
       if (emailId != null) {
    	   alert("---2  C ---");
           localStorage.setItem("emailId", emailId);
           //localStorage.setItem("", );
          window.location = "available.html";
       } 
   }
   localStorage.setItem("user_name", "Tanaya");
   localStorage.setItem("user_email", "tanaya@gmail.com");
});

}


function setButtons(){
    document.getElementById("add").addEventListener("click", function(){

    });
}


function logout() {
    event.preventDefault();
    console.log(localStorage.getItem("user_email"));
    localStorage.clear();
    window.location = "login.html";
}

function goToLogin() {
    event.preventDefault();
    window.location = "login.html";
}


