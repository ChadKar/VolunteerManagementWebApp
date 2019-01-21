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
    console.log("getRecordParameters called");
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
    checkUserExists();
}


var recordNum;


function addRecord(volunteerName, volunteerID, role, schedTimestampStart, schedTimestampEnd, defaultTimestamp, locAddL1, locAddL2, locDistrict, locPcode) {
    var recordStatus = "incomplete";
    var creationTime = new Date().getTime();
    var duration = 0;

    var loopValues = [];
    var lastRecordNum;
    var recordID;

    var postData = {
        creationTime: creationTime,
        duration: duration,        
        locationAddress:{locDistrict: locDistrict, locLine1: locAddL1, locLine2: locAddL2, locPostcode: locPcode},
        name: volunteerName,
        role: role,
        scheduleEnd: schedTimestampEnd,
        scheduleStart: schedTimestampStart,
        signIn: defaultTimestamp,
        signOut: defaultTimestamp,
        status: recordStatus, //"incomplete"
        volunteerID: volunteerID
    }

    recordID = "record"+recordNum;

    console.log("recordID = "+ recordID);
       // Go to last reference on creation creationTime. Get the key of creationTime.
    // var lastRef = database.ref('/record/').orderByChild('creationTime').limitToLast(1);
    // lastRef.on("value", function(data){
    //     console.log("Danielle");
    //     var recordObject = data.val();//e.g. {record3: {…}}
    //     console.log("Julian"+recordObject);
        
    //     for(var key in recordObject){
    //         lastRecordNum = parseInt(key.split("d")[1]);//3
    //         recordNum = lastRecordNum + 1;//4
    //         console.log("recordNum = "+ recordNum+", prev="+ lastRecordNum);//10 9
    //         recordID = "record"+recordNum;
    //         loopValues.push(recordID);
    //     }
    //     console.log(recordID); //record11
    //     //database.ref('/record/'+recordID).set(postData);//creates 100 from 10
    //    //return loopValues;
    // });
    
    // loopValues.forEach(function(entry) {
    // console.log(entry);
    // });
    
    //var stringNum = recordNum.toString();
    //var recordID = "record"+stringNum;
    //console.log("stringNum = "+stringNum+" recordID= "+recordID);//4 record4

    database.ref('/record/').push(postData);
    console.log("New Record Added END");
    
}


function checkUserExists() {
    console.log("CheckUserExists called");
    
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
    var volunteerName = firstname + " " + lastname;
    var user = email.split("@"), ending = user[1];
    var myStr = ending;
    var newStr = myStr.replace(".", "~");
    var volunteerID = user[0] + "@" + newStr;
    console.log("This is true volunteerID: " + volunteerID);

    //Need to calculate timestamps for schedule start and schedul end to put into the code. Do quick check that end timestamp is greater than start timestamp.
    //Getting timestamp1:
    var date1Parts = schedDateStart.split("-");//[0] = 2019, [1] = 02, [2] = 02
    var time1Parts = schedTimeStart.split(":");//[0] = 22, [1] = 00
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2016, 6, 27, 13, 30, 0);
    var sStartDateObject = new Date(date1Parts[0], date1Parts[1], date1Parts[2], time1Parts[0], time1Parts[1], 0);
    var schedTimestampStart = sStartDateObject.getTime();

    //Getting timestamp2:
    var date2Parts = schedDateEnd.split("-");//[0] = 2019, [1] = 02, [2] = 02
    var time2Parts = schedTimeEnd.split(":");//[0] = 22, [1] = 00
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2016, 6, 27, 13, 30, 0);
    var sEndDateObject = new Date(date2Parts[0], date2Parts[1], date2Parts[2], time2Parts[0], time2Parts[1], 0);
    var schedTimestampEnd = sEndDateObject.getTime();  

    //Getting default timestamp from date of time stamp 2 (for actual start/end times which will be overwritten).
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2016, 6, 27, 13, 30, 0);
    var defaultDate = new Date(date2Parts[0], date2Parts[1], date2Parts[2], 23, 59, 0);
    var defaultTimestamp = defaultDate.getTime(); 

    //Checking valid time range for a record to be made.
    if(schedTimestampEnd>schedTimestampStart){
        console.log("Correct timestamps.");
        database.ref('/volunteer/' + volunteerID).once("value").then(function (data) {
        if (data.val() === null) {
            console.log("No Account exists with this email address");
            alert("No volunteer exists associated with this email address. You need to create a new volunteer before a record can be created.");
                        
        }
         else {
            console.log("Account Exists");
            addRecord(volunteerName, volunteerID, role, schedTimestampStart, schedTimestampEnd, defaultTimestamp, locAddL1, locAddL2, locDistrict, locPcode);
             
             alert("New record succesfully created. Details are as follows: name = "+ firstname +" "+ lastname + ", email = " + email+ ", role = "+ role + 
                ", scheduled start = " + time1Parts[0]+":"+time1Parts[1]+":00, "+ date1Parts[2]+"-"+ date1Parts[1]+"-"+ date1Parts[0]+
                ", scheduled end = " + time2Parts[0]+":"+time2Parts[1]+":00, "+ date2Parts[2]+"-"+ date2Parts[1]+"-"+ date2Parts[0]+ 
                ", location address = " + locAddL1 + ", " + locAddL2 + ", " +locDistrict  + ", " +locPcode);
            
         }
        });

    }else{
    console.log("invalid timestamps");
    alert("Your scheduled end date/time is equal to or prior to your scheduled start date/time. Please check dates/times are valid.");
    }

     
}



    
