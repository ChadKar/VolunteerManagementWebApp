  //import {callDatabase} from './database.js';
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



  function fileValidation(){
    var fileInput = document.getElementById('inputGroupFile04');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.csv)$/i;
    if(!allowedExtensions.exec(filePath)){
      alert('Please upload file having extensions .csv only.');
      fileInput.value = '';
      return false;
    }else{
      alert('your csv file selected!');
    }
  }

  $("#inputGroupFile04").change(function(){
    $("#inputLabel").text(this.files[0].name);
  });

  var x = document.getElementById("inputGroupFile04");
  if(document.getElementById("btn_submit").onclick  &&  x.files.length!=0){
    csvJSON(x);
  }

  function uploadCSV() {
    var fileUpload = document.getElementById("inputGroupFile04");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();
        reader.onload = function (e) {
        console.log("Raw File");
        console.log(e.target.result);
        var lines=e.target.result.split('\r');//getting separate lines e.g. header, volunteer1, volunteer2, volunteer3
        for(let i = 0; i<lines.length; i++){//4
          lines[i] = lines[i].replace(/\s/,'')//delete all blanks
        }
        //Check here for which csv file it is.
        var checkCSVtype = lines[0].split(",");
        if(checkCSVtype[3] === "phone"){
                              
          getVolunteerParameters(lines);
          console.log("volunteer added from csv line");                 
              
        }else if(checkCSVtype[3] === "role"){

          getRecordParmeters(lines);
          console.log("record added from csv line");
                                                
        }else{
          alert("Your csv must either be for record details or volunteer details. Please check uploaded csv has correct format.");
          Window.location = "import.html";
        }

      }
                        
        reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
  }
  //Create volunteerID from email
  function getVolunteerID(email){
    var emailArray = email.split("@");
    var emailEnd = emailArray[1];
    var myStr = emailEnd;
    var tildaStr = myStr.replace(".", "~");
    var volunteerID = emailArray[0] + "@" + tildaStr;
    return volunteerID;
  }
  //Getting the schedTimestampStart for inserting a record. 
  function getSchedTimestampStart(schedDateStart, schedTimeStart){
    //Getting timestamp1:
    var date1Parts = schedDateStart.split("/");//[0] = 2, [1] = 2, [2] = 2019
    var time1Parts = schedTimeStart.split(":");//[0] = 22, [1] = 00
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2016, 6, 27, 13, 30, 0);
    var startDateObject = new Date(date1Parts[2], date1Parts[1] - 1, date1Parts[0], time1Parts[0], time1Parts[1], 0);
    var schedTimestampStart = startDateObject.getTime();
    return schedTimestampStart;
  }
  //Getting the schedTimestampEnd for inserting a record. 
  function getSchedTimestampEnd(schedDateEnd, schedTimeEnd){
    var date2Parts = schedDateEnd.split("/");//[0] = 2, [1] = 2, [2] = 2019
    var time2Parts = schedTimeEnd.split(":");//[0] = 22, [1] = 00
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2016, 6, 27, 13, 30, 0);
    var endDateObject = new Date(date2Parts[2], date2Parts[1] - 1, date2Parts[0], time2Parts[0], time2Parts[1], 0);
    var schedTimestampEnd = endDateObject.getTime(); 
    return schedTimestampEnd;
  }
  //Getting the defaultTimestamp for inserting a record. 
  function defaultTimestampEnd(schedDateEnd){
    var date2Parts = schedDateEnd.split("/");//[0] = 2, [1] = 2, [2] = 2019   
    //Getting default timestamp from date of schedDateEnd, and default time 23:59:00 PM,(for actual start/end times which will be overwritten).
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2019, 6, 27, 23, 59, 0);
    var defaultDate = new Date(date2Parts[2], date2Parts[1] - 1, date2Parts[0], 23, 59, 0);
    var defaultTimestamp = defaultDate.getTime(); 
    return defaultTimestamp;
  }

  //NEED csv. file with following format so can get all things needed for a successful insert:
  //(firstName, lastName, email, role, scheduledDateStart, scheduledTimeStart, scheduledDateEnd, scheduledTimeEnd, locAddL1, locAddL2, locDistrict, locPcode)
  function getRecordParmeters(lines){
    for(var i = 1;i<lines.length-1;i++){//i = 1,,,...,19 SHOULD add vounteers e.g. row number starting from 1
      var obj = [];
      var currentline = lines[i].split(",");

      for(var j=0;j< currentline.length;j++){//populate a volunteer Array
        obj[j] = currentline[j];//going through a line of data
      }
                          
      var volunteerName = obj[0]+" "+obj[1];//First name + Last name, need to adjust csv.
      var email = obj[2];
      var volunteerID = getVolunteerID(email);
      
      var role = obj[3];
      //Dates and Times: schedTimestampStart.
      var schedDateStart = obj[4];
      var schedTimeStart = obj[5];  
      var schedTimestampStart = getSchedTimestampStart(schedDateStart, schedTimeStart);
      //Dates and Times: schedTimestampEnd.
      var schedDateEnd = obj[6];
      var schedTimeEnd = obj[7];
      var schedTimestampEnd = getSchedTimestampEnd(schedDateEnd, schedTimeEnd);
      //Checking for invalid timestamps in csv file. Needs more code as doesn't stop invalid schedule going into database.
      if(schedTimestampStart >= schedTimestampEnd){
        alert("Your csv file contains an entry with an invalid dates and times.");
      }
      //Dates and Times: defaultTimestamp.
      var defaultTimestamp = defaultTimestampEnd(schedDateEnd);
      //Address
      var locAddL1 = obj[8];
      var locAddL2 = obj[9];
      var locDistrict = obj[10];
      var locPcode = obj[11];
      //console.log("addRecord function called.");                          
      addRecord(volunteerName, volunteerID, role, schedTimestampStart, schedTimestampEnd, defaultTimestamp, locAddL1, locAddL2, locDistrict, locPcode);
    }
  }
  //duplicating method: both should be imported here from database.js file.
  function addRecord(volunteerName, volunteerID, role, schedTimestampStart, schedTimestampEnd, defaultTimestamp, locAddL1, locAddL2, locDistrict, locPcode) {
    var recordStatus = "Scheduled";
    var creationTime = new Date().getTime();
    var duration = 0;

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
     
    database.ref('/record/').push(postData);
    console.log("volunteersCSV added");
        alert("Your csv file of volunteer schedules has successfully been added.");
    
  }
  

  function getVolunteerParameters(lines){
    for(var i = 1;i<lines.length-1;i++){//i = 1,,,...,19 SHOULD add vounteers e.g. row number starting from 1
      var obj = [];
      var currentline = lines[i].split(",");

        for(var j=0;j< currentline.length;j++){//populate a volunteer Array
          obj[j] = currentline[j];//going through a line of data
        }
        //address
        var line1 = obj[5];
        var line2 = obj[6];
        var district = obj[8];
        var postcode = obj[7];
        //available
        var monday = obj[9];
        var tuesday = obj[10];
        var wednesday = obj[11];
        var thursday = obj[12];
        var friday = obj[13];
        var saturday = obj[14];
        var sunday = obj[15];
        //volunteer details                        
        var dob = obj[2];             
        var email = obj[4];
        var emName = obj[16];
        var emPhone = obj[17];
        var emRelationship = obj[18];
        var volunteerName = obj[0] + " " + obj[1];
        var phone = obj[3];
        var startDate = obj[19];
        var status = obj[20];
        
        console.log("addVolunteer function called.")
        addVolunteer(line1, line2, district, postcode, monday, tuesday, wednesday, thursday, friday, saturday, sunday, dob, email, emName, emPhone, emRelationship, volunteerName, phone, startDate, status);
    }
  }
  
  function addVolunteer(line1, line2, district, postcode, monday, tuesday, wednesday, thursday, friday, saturday, sunday, dob, email, emName, emPhone, emRelationship, volunteerName, phone, startDate, status) {
    //Getting volunteerID for correct database path to set.
    var password = "notusedcurrently";
    var volunteerEmail = email;
    var volunteerID = getVolunteerID(email);
    var volunteerName = volunteerName;
    
    //console.log("add Volunteer Method starts..");

    database.ref('/volunteer/'+ volunteerID).set({
      address: {line1: line1, line2: line2 , district: district, postcode: postcode},
      available:{monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday},
        dob: dob,
        email: email,
        emergency:{emName: emName, emPhone: emPhone, emRelationship: emRelationship},
        name: volunteerName,
        phone: phone,
        startDate: startDate,
        status: status,
        password: password

      });
        console.log("volunteersCSV added");
        alert("Your csv file of volunteer details has successfully been added.");
    }

