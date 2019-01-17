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
        

function getUserData() {
    "use strict";
    event.preventDefault();
    // get email string into username
    var enteredEmail = document.getElementById("emailEntry").value, enteredPassword = document.getElementById("passwordEntry").value, user = enteredEmail.split("@"), ending = user[1];
    var myStr = ending;
    var newStr = myStr.replace(".", "~");
    var username = user[0] + "@" + newStr;
    console.log("This is true username: " + username);
    
    database.ref('/manager/' + username).once("value").then(function (data) {
        if (data.val() === null) {
            console.log("No Account exists with this email address. Please register.");
            alert("No Account exists with this email address. Please register");
        } else {

            var realEm = (data.val().email), realPass = (data.val().password);
            if ((realEm === enteredEmail) && (realPass === enteredPassword) && (data.val().status) === "active") {
                localStorage.setItem("user_email", data.val().email);
                localStorage.setItem("user_name", data.val().name);
                //localStorage.setItem("", );
                window.location = "followUp.html";
            } else {
                console.log("Please try again. Invalid email and password combination.");
            	alert("Please try again. Invalid email and password combination.");
            }
        }
    });
}