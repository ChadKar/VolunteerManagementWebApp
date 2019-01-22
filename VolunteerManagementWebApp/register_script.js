var config = {
    apiKey: "AIzaSyAiegKkVjXgfaSXlWtAl30vL3kHDO-zDRE",
    authDomain: "volunteer-c70c1.firebaseapp.com",
    databaseURL: "https://volunteer-c70c1.firebaseio.com",
    projectId: "volunteer-c70c1",
    storageBucket: "volunteer-c70c1.appspot.com",
    messagingSenderId: "228261304897"
  };

firebase.initializeApp(config);
var database = firebase.database();

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

    if(document.getElementById("regemailEntry").value === "") {
        document.getElementById("regemailEntry").style.background = colourbackground;
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
        checkPasswordEquals();
    }

}

function checkPasswordEquals() {
    var check = false;
    var pass1 = document.getElementById("passwordEntry").value.trim();
    var pass2 = document.getElementById("passwordEntry2").value.trim();
    if(pass1 === pass2) {
        check = true;
        console.log("passwords equal");
        getParameters();
         window.location = "available.html";
    }
}

function getParameters() {
    console.log("getParameters called");
    var firstname = document.getElementById("firstNameEntry").value.trim();
    var email = document.getElementById("regemailEntry").value.trim();
    var password = document.getElementById("passwordEntry").value.trim();
    var password2 = document.getElementById("passwordEntry2").value.trim();

    console.log(firstname + ", " + email + ", " + password );//to get the data
    addUser(firstname, password, email);
    database.ref('/manager/' + firstname).once("value").then(function (data) {
        console.log("FOUND IT YAYYYYYYYY+>    " + data.val().email +"  "+ firstname);
    });//to get the
    printDbValues();
    checkUserExists();
}

function addUser(namE, pass,email) {// to write in the node 3 children
  firebase.database().ref('/manager/' + namE).set({
    email: email,
    name: namE,
    password: pass,

  });
    console.log("User Added");
}


function checkUserExists() {

    console.log("CheckUserExists called");

    var name = document.getElementById("firstNameEntry").value.trim();
    
    var password = document.getElementById("passwordEntry").value.trim();
    
    
    var enteredEmail = document.getElementById("regemailEntry").value, user = enteredEmail.split("@"), ending = user[1];
    var myStr = ending;
    var newStr = myStr.replace(".", "~");
    var username = user[0] + "@" + newStr;
    console.log("This is true username: " + name);

     database.ref('/manager/' + name).once("value").then(function (data) {
        if (data.val() === null) {
            console.log("No Account exists with this email address");
            addUser(enteredEmail, name, password);
            window.location = "available.html";
        }
         else {
             console.log("Account Exists");
             alert("An account already exists associated with this email address");
           document.getElementById("loginFeedback").innerHTML = "An account already exists associated with this email address";
         }
        })
}


function getUserData() {//
    "use strict";
    event.preventDefault();
    // get email string into username
    var enteredEmail = document.getElementById("emailEntry").value, enteredPassword =
    document.getElementById("passwordEntry").value, user = enteredEmail.split("@"), username = user[0];
    database.ref('/manager/' + name).once("value").then(function (data) {
        console.log(data.value().email);

      
    });
    }


function printDbValues() {
	var ref = firebase.database().ref('/manager/');

	ref.once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
	    //$scope.foo[childKey] = childData;
	    console.log(childData.name + " - " + childData.email );
      var tbody = document.getElementById('tbody');
      var tr = "<tr>";

      /* Must not forget the $ sign */
      tr += "<td>" + childData.name + "</td>" + "<td>$" + childData.email + "</td></tr>";
      console.log("ajkdjaksjdkasjd");

      /* We add the table row to the table body */
      tbody.innerHTML += tr;
      window.location = "available.html";

	  });
	});
}
