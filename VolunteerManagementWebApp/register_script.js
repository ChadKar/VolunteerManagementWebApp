var config = {
    apiKey: "AIzaSyCPvM0PidSAxE5ev5iNGl7qfbVj5vK4zv8",
    authDomain: "stackover-burger.firebaseapp.com",
    databaseURL: "https://stackover-burger.firebaseio.com",
    projectId: "stackover-burger",
    storageBucket: "stackover-burger.appspot.com",
    messagingSenderId: "359154422713"
};

firebase.initializeApp(config);
var database = firebase.database();

function checkFields() {
    var colourbackground = "#d5cdf3";
    console.log("Clicked register");
    event.preventDefault();
    var okay = true;
    var xxx = document.getElementById("firstNameEntry").value.trim();
    if(document.getElementById("firstNameEntry").value === "") {
        document.getElementById("firstNameEntry").style.background = colourbackground;
        document.getElementById("regFeedback").innerHTML = "Please enter all fields";
        okay = false;
    }
    if(document.getElementById("lastNameEntry").value === "") {
        document.getElementById("lastNameEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("regemailEntry").value === "") {
        document.getElementById("regemailEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("dobEntry").value === "") {
        document.getElementById("dobEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("phoneEntry").value === "") {
        document.getElementById("phoneEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("passwordEntry").value === "") {
        document.getElementById("passwordEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("passwordEntry2").value === "") {
        document.getElementById("passwordEntry2").style.background = colourbackground;
         okay = false;
    }
    console.log("Print:" + okay);
    if(okay === true) {
        console.log("parameters called");
        checkPassowrdEquals();
    }

}

function checkPassowrdEquals() {
    var check = false;
    var pass1 = document.getElementById("passwordEntry").value.trim();
    var pass2 = document.getElementById("passwordEntry2").value.trim();
    if(pass1 === pass2) {
        check = true;
        console.log("passwords equal");
        getParameters();
    }
}

function getParameters() {
    console.log("getParameters called");
    var firstname = document.getElementById("firstNameEntry").value.trim();
    var lastname = document.getElementById("lastNameEntry").value.trim();
    var email = document.getElementById("regemailEntry").value.trim();
    var dob = document.getElementById("dobEntry").value.trim();
    var phone = document.getElementById("phoneEntry").value.trim();
    var password = document.getElementById("passwordEntry").value.trim();
    var password2 = document.getElementById("passwordEntry2").value.trim()
    console.log(firstname + "," + lastname + ", " + email + ", " + dob + ", " + phone + ", " + password);
    checkUserExists();
}

function addUser(em, birth, usern, namE, pass, ph) {
  firebase.database().ref('/customer/' + usern).set({
    dob: birth,
    email: em,
    name: namE,
    password: pass,
    phone: ph
  });
    console.log("User Added");
}


function checkUserExists() {
    console.log("CheckUserExists called");

    var firstname = document.getElementById("firstNameEntry").value.trim();
    var lastname = document.getElementById("lastNameEntry").value.trim();
    var dob = document.getElementById("dobEntry").value.trim();
    var phone = document.getElementById("phoneEntry").value.trim();
    var password = document.getElementById("passwordEntry").value.trim();
    var Name = firstname + " " + lastname;
    var enteredEmail = document.getElementById("regemailEntry").value, user = enteredEmail.split("@"), ending = user[1];
    var myStr = ending;
    var newStr = myStr.replace(".", "~");
    var username = user[0] + "@" + newStr;
    console.log("This is true username: " + username);

     database.ref('/customer/' + username).once("value").then(function (data) {
        if (data.val() === null) {
            console.log("No Account exists with this email address");
            addUser(enteredEmail, dob, username, Name, password, phone);
            window.location = "login.html";
        }
         else {
             console.log("Account Exists");
             alert("An account already exists associated with this email address");
            //document.getElementById("loginFeedback").innerHTML = "An account already exists associated with this email address";
         }
        })
}


function getUserData() {
    "use strict";
    event.preventDefault();
    // get email string into username
    var enteredEmail = document.getElementById("emailEntry").value, enteredPassword = document.getElementById("passwordEntry").value, user = enteredEmail.split("@"), username = user[0];
    database.ref('/customer/' + username).once("value").then(function (data) {
        if (data.val() === null) {
            console.log("No Account exists with this email address");
            document.getElementById("loginFeedback").innerHTML = "No Account exists with this email address";
        } else {
            var realEm = (data.val().email), realPass = (data.val().password);
            if ((realEm === enteredEmail) && (realPass === enteredPassword)) {
                window.location = "register.html";
            } else {
                window.document.getElementById("loginFeedback").innerHTML = "Something didnt match";
            }
        }
    });
}
