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
                          //recent
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
                              //result.push(obj);
                          }

                      }
                      alert("Your csv file volunteers have successfully been added.")
                      reader.readAsText(fileUpload.files[0]);
                  } else {
                      alert("This browser does not support HTML5.");
                  }
              } else {
                  alert("Please upload a valid CSV file.");
              }
}


function addVolunteer(line1, line2, district, postcode, monday, tuesday, wednesday, thursday, friday, saturday, sunday, dob, email, emName, emPhone, emRelationship, volunteerName, phone, startDate, status) {
  //Getting volunteerID for correct database path to set.
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
      status: status
    });
      console.log("volunteer Added");
  }
