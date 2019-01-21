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
      }}

    $("#inputGroupFile04").change(function(){
    $("#inputLabel").text(this.files[0].name);
  });
  //var x = document.getElementById("inputGroupFile04");
  //if(document.getElementById("btn_submit").onclick  &&  x.files.length!=0){
    //  csvJSON(x);}

    function Upload() {
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
                            if(checkCSVtype[0] === "FirstName"){
                              
                              getVolunteerParameters(lines);
              
                            }else if(checkCSVtype[0] === "volunteerID"){

                              getRecordParmeters(lines);
                             
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

  function getRecordParmeters(lines){
                for(var i = 1;i<lines.length-1;i++){//i = 1,,,...,19 SHOULD add vounteers e.g. row number starting from 1
                    var obj = [];
                    var currentline = lines[i].split(",");


                    for(var j=0;j< currentline.length;j++){//populate a volunteer Array
                        obj[j] = currentline[j];//going through a line of data
                    }
                    //NEED csv. file with following format so can get all things needed for a successful insert:
                    //(volunteerID, firstName, lastName, email, role, scheduledDateStart, scheduledTimeStart, scheduledDateEnd, scheduledTimeEnd, locAddL1, locAddL2, locDistrict, locPcode)
                    
                                var volunteerID = obj[0];
                                console.log("volunteerID = "+ obj[0]);
                                var volunteerNname = obj[1]+" "+obj[2];//First name + Last name, need to adjust csv.
                                console.log("volunteerName = "+ obj[1]+" "obj[2]);
                                var email = obj[3];
                                console.log("email = "+ obj[3]);
                                var role = obj[4];
                                console.log("role = "+ obj[4]);
                                //Dates and Times and timestamps.
                                var schedDateStart = obj[5];
                                console.log("schedDateStart = "+ obj[5]);
                                var schedTimeStart = obj[6];
                                console.log("schedTimeStart = "+ obj[6]);     
                                var schedTimestampStart = getSchedTimeStampStart(schedDateStart, schedTimeStart);
                                console.log("schedTimeStampStart = "+schedTimestampStart);
                                var schedDateEnd = obj[7];
                                console.log("schedDateEnd = "+ obj[7]);
                                var defaultTimeStamp = getDefaultTimestamp(schedDateEnd);
                                console.log("defaultTimestamp = "+ defaultTimeStamp);
                                var schedTimeEnd = obj[8];
                                console.log("schedTimeEnd = "+ obj[8]);
                                var schedTimestampEnd = getSchedTimestampEnd(schedDateEnd, schedTimeEnd);
                                console.log("schedTimeStampEnd = "+schedTimestampEnd);
                                //Address
                                var locAddL1 = obj[9];
                                console.log("locAddL1 = "+ obj[9]);
                                var locAddL2 = obj[10];
                                console.log("locAddL2 = "+ obj[10]);
                                var locDistrict = obj[11];
                                console.log("locDistrict = "+ obj[11]);
                                var locPcode = obj[12];
                                console.log("locPcode = "+ obj[12]);
                                  
                                addRecords(volunteerID, volunteerName, email, role, scheduledDateStart, scheduledTimeStart, scheduledDateEnd, scheduledTimeEnd, defaultTimeStamp, locAddL1, locAddL2, locDistrict, locPcode);
                }
  }
  //Getting the schedTimestampStart for inserting a record.
  function getSchedTimeStampStart(schedDateStart, schedTimeStart){
    //Need to calculate timestamps for schedule start and schedul end to put into the code. Do quick check that end timestamp is greater than start timestamp after this method call.
    //Getting timestamp1:
    var date1Parts = schedDateStart.split("-");//[0] = 2019, [1] = 02, [2] = 02
    var time1Parts = schedTimeStart.split(":");//[0] = 22, [1] = 00
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2016, 6, 27, 13, 30, 0);
    var startDateObject = new Date(date1Parts[0], date1Parts[1] - 1, date1Parts[2], time1Parts[0], time1Parts[1], 0);
    var schedTimestampStart = startDateObject.getTime();

    return schedTimestampStart;
  }

  function getSchedTimestampEnd(schedDateEnd, schedTimeEnd){
    //Getting timestamp2:
    var date2Parts = schedDateEnd.split("-");//[0] = 2019, [1] = 02, [2] = 02
    var time2Parts = schedTimeEnd.split(":");//[0] = 22, [1] = 00
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2016, 6, 27, 13, 30, 0);
    var endDateObject = new Date(date2Parts[0], date2Parts[1] - 1, date2Parts[2], time2Parts[0], time2Parts[1], 0);
    var schedTimestampEnd = endDateObject.getTime();  

    return schedTimestampEnd;
    
  } 

  function getDefaultTimestamp(schedDateEnd){

    //Getting default timestamp from date of schedDateEnd, and default time 23:59:00 PM (for actual start/end times which will be overwritten).
    var date2Parts = schedDateEnd.split("-");//[0] = 2019, [1] = 02, [2] = 02
    //new Date(year, month, day, hours, minutes, seconds) e.g. var date = new Date(2019, 6, 27, 23, 59, 0);
    var defaultDate = new Date(date2Parts[0], date2Parts[1] - 1, date2Parts[2], 23, 59, 0);
    var defaultTimestamp = defaultDate.getTime(); 
    return defaultTimestamp;
  }

  function getVolunteerParameters(lines){
                        for(var i = 1;i<lines.length-1;i++){//i = 1,,,...,19 SHOULD add vounteers e.g. row number starting from 1
                              var obj = [];
                              var currentline = lines[i].split(",");


                                for(var j=0;j< currentline.length;j++){//populate a volunteer Array
                                    obj[j] = currentline[j];//going through a line of data
                                  }

                                console.log("exit inner loop");
                                var line1 = obj[5];
                                console.log("c1 = "+ obj[5]);
                                var line2 = obj[6];
                                console.log("c1 = "+ obj[6]);
                                var district = obj[8];
                                console.log("c1 = "+ obj[8]);
                                var postcode = obj[7];
                                console.log("c1 = "+ obj[7]);
                                var monday = obj[9];
                                console.log("c1 = "+ obj[9]);
                                var tuesday = obj[10];
                                console.log("c1 = "+ obj[10]);
                                var wednesday = obj[11];
                                console.log("c1 = "+ obj[11]);
                                var thursday = obj[12];
                                console.log("c1 = "+ obj[12]);
                                var friday = obj[13];
                                console.log("c1 = "+ obj[13]);
                                var saturday = obj[14];
                                console.log("c1 = "+ obj[14]);
                                var sunday = obj[15];
                                console.log("c1 = "+ obj[15]);
                                var dob = obj[2];
                                console.log("c1 = "+ obj[2]);
                                var email = obj[4];
                                console.log("c1 = "+ obj[4]);
                                var emName = obj[16];
                                console.log("c1 = "+ obj[16]);
                                var emPhone = obj[17];
                                console.log("c1 = "+ obj[17]);
                                var emRelationship = obj[18];
                                console.log("c1 = "+ obj[18]);
                                var volunteerName = obj[0] + " " + obj[1];
                                console.log("c1 = "+ obj[0]+ " " + obj[1]);
                                var phone = obj[3];
                                console.log("c1 = "+ obj[3]);
                                var startDate = obj[19];
                                console.log("c1 = "+ obj[19]);
                                var status = obj[20];
                                console.log("c1 = "+ obj[20]);

                                addVolunteer(line1, line2, district, postcode, monday, tuesday, wednesday, thursday, friday, saturday, sunday, dob, email, emName, emPhone, emRelationship, volunteerName, phone, startDate, status);
                              }
                            }
  function addRecords(){
    //Will take all parmeters. 
      console.log("recordsCSV added");
     alert("Your csv file of record details has successfully been added.");
  }


  function addVolunteer(line1, line2, district, postcode, monday, tuesday, wednesday, thursday, friday, saturday, sunday, dob, email, emName, emPhone, emRelationship, volunteerName, phone, startDate, status) {
    //Getting volunteerID for correct database path to set.
    var password = "notusedcurrently";
    var volunteerEmail = email;
    console.log("inside adVolunteer method"+ volunteerEmail);
    var emailArray = volunteerEmail.split("@");
    console.log("first part = " + emailArray[0]+ "second part = "+ emailArray[1]);
    var emailEnd = emailArray[1];
    console.log("emailEnd = "+ emailEnd);
    var myStr = emailEnd;
    console.log("myStr = "+ myStr);
    var newStr = myStr.replace(".", "~");
    console.log("newStr = "+ newStr);
    var volunteerID = emailArray[0] + "@" + newStr;
    console.log("volunteerID = "+ volunteerID);
    var volunteerName = volunteerName;
    console.log("volunteerName = " + volunteerName);

    console.log("add Volunteer Method starts..");

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

