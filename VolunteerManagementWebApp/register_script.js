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
    if(document.getElementById("addL1Entry").value === "") {
        document.getElementById("addL1Entry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("addL2Entry").value === "") {
        document.getElementById("addL2Entry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("districtEntry").value === "") {
        document.getElementById("districtEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("pcodeEntry").value === "") {
        document.getElementById("pcodeEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("emPhEntry").value === "") {
        document.getElementById("emPhEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("emNameEntry").value === "") {
        document.getElementById("emNameEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("emRelEntry").value === "") {
        document.getElementById("emRelEntry").style.background = colourbackground;
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
    }else if(okay === false){
        alert("Please check all fields are complete and try again.");
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
    var password2 = document.getElementById("passwordEntry2").value.trim();
    var addL1 = document.getElementById("addL1Entry").value.trim();
    var addL2 = document.getElementById("addL2Entry").value.trim();
    var district = document.getElementById("districtEntry").value.trim();
    var pcode = document.getElementById("pcodeEntry").value.trim();
    var emPhEntry = document.getElementById("emPhEntry").value.trim();
    var emName = document.getElementById("emNameEntry").value.trim();
    var emRel = document.getElementById("emRelEntry").value.trim();
    console.log(firstname + "," + lastname + ", " + email + ", " + dob + ", " + phone + ", " + password + "," + addL1 + "," + addL2 + ", " + district + ", " + pcode + ", " + emPhEntry + ", " + emName + ", " +  emRel);
    checkUserExists();
}

function addUser(em, birth, usern, namE, pass, ph, addL1, addL2, district, pcode, emPh, emName, emRel) {
    var active = "active";
    firebase.database().ref('/manager/' + usern).set({
    address:{district: district, line1: addL1, line2: addL2, postcode: pcode},//not sure on syntax
    dob: birth,
    email: em,
    emergency:{phone: emPh, name: emName, relationship: emRel},//not sure on syntax
    name: namE,
    password: pass,
    phone: ph,
    status: active //note this is added because want to set so can get into log-in which ha condition
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
    var addL1 = document.getElementById("addL1Entry").value.trim();
    var addL2 = document.getElementById("addL2Entry").value.trim();
    var district = document.getElementById("districtEntry").value.trim();
    var pcode = document.getElementById("pcodeEntry").value.trim();
    var emPhone = document.getElementById("emPhEntry").value.trim();
    var emName = document.getElementById("emNameEntry").value.trim();
    var emRel = document.getElementById("emRelEntry").value.trim();
    var Name = firstname + " " + lastname;
    var enteredEmail = document.getElementById("regemailEntry").value, user = enteredEmail.split("@"), ending = user[1];
    var myStr = ending;
    var newStr = myStr.replace(".", "~");
    var username = user[0] + "@" + newStr;
    console.log("This is true username: " + username);
    
     database.ref('/manager/' + username).once("value").then(function (data) {
        if (data.val() === null) {
            console.log("No Account exists with this email address");
            addUser(enteredEmail, dob, username, Name, password, phone, addL1, addL2, district, pcode, emPhone, emName, emRel);
            window.location = "register.html";
            alert("New manager succesfully created. Try going to login page to test login.");
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
    database.ref('/manager/' + username).once("value").then(function (data) {
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