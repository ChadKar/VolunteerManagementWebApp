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
  
function checkRecordFields() {
    var colourbackground = "#d5cdf3";
    console.log("Clicked add new record");
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
    if(document.getElementById("roleEntry").value === "") {
        document.getElementById("roleEntry").style.background = colourbackground;
         okay = false;
    }    
    if(document.getElementById("schedDateStartEntry").value === "") {
        document.getElementById("schedDateStartEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("schedTimeStartEntry").value === "") {
        document.getElementById("schedTimeStartEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("schedDateEndEntry").value === "") {
        document.getElementById("schedDateEndEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("schedTimeEndEntry").value === "") {
        document.getElementById("schedTimeEndEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("addLoc1Entry").value === "") {
        document.getElementById("addLoc1Entry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("addLoc2Entry").value === "") {
        document.getElementById("addLoc2Entry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("locDistrictEntry").value === "") {
        document.getElementById("locDistrictEntry").style.background = colourbackground;
         okay = false;
    }
    if(document.getElementById("locPcodeEntry").value === "") {
        document.getElementById("locPcodeEntry").style.background = colourbackground;
         okay = false;
    }
    console.log("Print:" + okay);
    if(okay === true) {
        console.log("parameters called");
        getRecordParameters()
    }else if(okay === false){
        alert("Please check all fields are complete and try again.");
    }
   
}

function getRecordParameters() {
    console.log("getParameters called");
    var firstname = document.getElementById("firstNameEntry").value.trim();
    var lastname = document.getElementById("lastNameEntry").value.trim();
    var email = document.getElementById("emailEntry").value.trim();
    var role = document.getElementById("roleEntry").value.trim();
    var schedDateStart = document.getElementById("schedDateStartEntry").value.trim();
    var schedTimeStart = document.getElementById("schedTimeStartEntry").value.trim();
    var schedDateEnd = document.getElementById("schedDateEndEntry").value.trim();
    var schedTimeEnd = document.getElementById("schedTimeEndEntry").value.trim();
    var locAddL1 = document.getElementById("addLoc1Entry").value.trim();
    var locAddL2 = document.getElementById("addLoc2Entry").value.trim();
    var locDistrict = document.getElementById("locDistrictEntry").value.trim();
    var locPcode = document.getElementById("locPcodeEntry").value.trim();
    
    console.log(firstname + "," + lastname + ", " + email+ ", "+ role + ", " + schedDateStart + ", " + schedTimeStart+", "+ schedDateEnd+", "+ schedTimeEnd + "," + locAddL1 + ", " + locAddL2 + ", " +locDistrict  + ", " +locPcode);
   // checkUserExists();
}

function addRecord(volunteerName, username, role, schedStart, schedEnd, locAddL1, locAddL2, locDistrict, locPcode) {
    var recordStatus = "incomplete";
    var creationTime = new Date().getTime();
    var signIn = null;
    var signOut = null;
    var duration = 0;
// got to create and get the record reference here e.g. record34.
    var lastRef = database.ref('/record/').orderByChild('creationTime').limitToLast(1);
    lastRef.on("value", function(data){
        var recordObject = data.val();
        console.log(recordObject);//record3
    })

  //   var recordNum = 

  //   firebase.database().ref('/record/' + recordNum).set({

  //   creationTime: creationTime,
  //   duration: duration,        
  //   locationAddress:{locDistrict: locDistrict, locLine1: locAddL1, locLine2: locAddL2, locPostcode: locPcode},//not sure on syntax
  //   name: volunteerName,
  //   role: role,
  //   scheduleEnd: schedEnd,
  //   scheduleStart: schedStart,
  //   signIn: signIn,
  //   signOut: signOut,
  //   status: recordStatus, //"incomplete"
  //   volunteerID: username
  // });
    console.log("Record Added");
    
}


function checkUserExists() {
    console.log("CheckUserExists called");
    
    var firstname = document.getElementById("firstNameEntry").value.trim();
    var lastname = document.getElementById("lastNameEntry").value.trim();
    var email = document.getElementById("emailEntry").value.trim();
    var role = document.getElementById("roleEntry").value.trim();
    var schedStart = document.getElementById("schedStartEntry").value.trim();
    var schedEnd = document.getElementById("schedEndEntry").value.trim();
    var locAddL1 = document.getElementById("addLoc1Entry").value.trim();
    var locAddL2 = document.getElementById("addLoc2Entry").value.trim();
    var locDistrict = document.getElementById("locDistrictEntry").value.trim();
    var locPcode = document.getElementById("locPcodeEntry").value.trim();
    var volunteerName = firstname + " " + lastname;


//Need to calculate timestamps for schedule start and schedul end to put into the code. Do quick check that end timestamp is greater than start timestamp.
//new Date(year, month, day, hours, minutes, seconds, milliseconds)
//var dateFromPicker = "2012-10-12";
// var timeFromPicker = "12:30";
var dateFromUI = "12-13-2012";
var timeFromUI = "10:20";
var dateParts = dateFromUI.split("-");
var timeParts = timefromUI.split(":");

var date = new Date(dateParts[2], dateParts[0]-1, dateParts[1], timeParts[0], timeParts[1]);

var dateISO = date.toISOString();
// var dateParts = dateFromPicker.split("-");
// var timeParts = timeFromPicker.split(":");
// var localDate = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
//     var calc = document.getElementById("calc")

// calc.addEventListener("click", function() {
//     var date = document.getElementById("date").value,
//         time = document.getElementById("time").value
    
//     console.log(new Date(date + " " + time))
// })


    var user = email.split("@"), ending = user[1];
    var myStr = ending;
    var newStr = myStr.replace(".", "~");
    var username = user[0] + "@" + newStr;
    console.log("This is true username: " + username);
    
     database.ref('/volunteer/' + username).once("value").then(function (data) {
        if (data.val() === null) {
            console.log("No Account exists with this email address");
            alert("No account exists associated with this email address. You need to create a new volunteer before a record can be created.");
            window.location = "addRecord.html";
            
        }
         else {
             console.log("Account Exists");
              addRecord(volunteerName, username, role, schedStart, schedEnd, locAddL1, locAddL2, locDistrict, locPcode);
             
             alert("New record succesfully created. Details are as follows: name = "+ firstname +" "+ lastname + ", email = " + email+ ", role = "+ role + ", scheduleStart = " + schedStart + ", scheduleEnd" + schedEnd + ", location address = " + addLoc1Entry + ", " + addLoc2Entry + ", " +locDistrict  + ", " +locPcode);
            //document.getElementById("loginFeedback").innerHTML = "An account already exists associated with this email address";
         }
        })
}
    
