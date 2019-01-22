var record;
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


 firebase.database().ref('/record/').once('value', function(snap){
    //console.log(snap.val());
    record = snap.val();
    console.log(record);
    //download_csv(record);
});

function download_csv(){

      const replacer = (key, value) => value === null ? '' : value ;// specify how you want to handle null values here
      let obj1 = Object.keys(record)[0];
      const header = Object.keys(record[obj1]);//Problem
      console.log(header);
      let csv = Object.keys(record).map(row => header.map(fieldName => JSON.stringify(record[row][fieldName], replacer)).join(','));
      csv = csv.join('\r\n');
      console.log(csv);

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'records.csv';
      hiddenElement.click();
    }











// function gotData(data){
//   //console.log(data.val());
//   var records = data.val();
//   var keys= Object.keys(records);
//   console.log(keys);
//  for(var i=0; i<keys.length;i++){
//     var k = keys[i];
//     var role = records[k].role;
//     console.log("role = "+role);
//     var name = records[k].name;
//       console.log("name = "+name);
//     //var creationTime = records[k].creationTime;
//   //  var duration = records[k].duration;
//     var scheduleStart = records[k].scheduleStart;
//       console.log("scheduleStart = "+scheduleStart);
//     var signIn = records[k].signIn;
//     console.log("signIn = "+signIn);
//     var volunteerID = records[k].volunteerID;
//     console.log("volunteerID = "+volunteerID);
//     var scheduleEnd = records[k].scheduleEnd;
//     console.log("scheduleEnd = "+scheduleEnd);
//       var status = records[k].status;
//       console.log("status = "+status);
//     var signOut = records[k].signOut;
//         console.log("signOut = "+signOut);
//     }
//   }


 //console.log(volunteerID,name,role,scheduleStart,scheduleEnd,signIn,signOut,status);

//mySessionRef.update({ creationTime: Firebase.ServerValue.TIMESTAMP });
//mySessionRef.on('value', function(snapshot){ console.log(snapshot.val()) })

//
// function errData(err){
//   console.log('Error!');
//   console.log(err);
// }
//
// //Accessing location address record data from DB
// var refAddress= database.ref('/record/'+"locationAddress");
// refAddress.on('value',gotAddressData,errAddressData);
//
// function gotAddressData(data1){
//   //console.log(data.val());
//   var recordAddress = data1.val();
//   var addressKeys= Object.keys(recordAddress);
//   //console.log(addressKeys);
//  for(var i=0; i<addressKeys.length;i++){
//     var k = addressKeys[i];
//     var locDistrict = recordAddress[k].locDistrict;
//     var locLine1 = recordAddress[k].locLine1;
//     var locline2 = recordAddress[k].locLine2;
//     var locPostcode = records[k].locPostcode;
//  console.log(locDistrict,locLine1,locline2,locPostcode);
//
// //mySessionRef.update({ creationTime: Firebase.ServerValue.TIMESTAMP });
// //mySessionRef.on('value', function(snapshot){ console.log(snapshot.val()) })
//   }
// }
//
// function errAddressData(err){
//   console.log('Error Address!');
//   console.log(err);
// }

//getting records from db
// function getVolunteer() {
//   //Getting volunteerID for correct database path to set.
//   var volunteerID = document.getElementById("volunteerID").value,
//   console.log("inside adVolunteer method"+ volunteerID);
//   var emailArray = volunteerEmail.split("@");
//   console.log("first part = " + emailArray[0]+ "second part = "+ emailArray[1]);
//   var emailEnd = emailArray[1];
//   console.log("emailEnd = "+ emailEnd);
//   var myStr = emailEnd;
//   console.log("myStr = "+ myStr);
//   var newStr = myStr.replace(".", "~");
//   console.log("newStr = "+ newStr);
//   var volunteerID = emailArray[0] + "@" + newStr;
//   console.log("volunteerID = "+ volunteerID);
//   var volunteerName = volunteerName;
//   console.log("volunteerName = " + volunteerName);
//   console.log("get Volunteer Method starts..");
//
//   //database.ref('/record/'+ volunteerID).set({
//     address: {line1: line1, line2: line2 , district: district, postcode: postcode},
//     available:{monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday},
//       dob: dob,
//       email: email,
//       emergency:{emName: emName, emPhone: emPhone, emRelationship: emRelationship},
//       name: volunteerName,
//       phone: phone,
//       startDate: startDate,
//       status: status
//     });
//       console.log("volunteer Added");
//   }


// // JSON to CSV Converter
//         function ConvertToCSV(objArray) {
//             var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//             var str = '';
//
//             for (var i = 0; i < array.length; i++) {
//                 var line = '';
//                 for (var index in array[i]) {
//                     if (line != '') line += ','
//
//                     line += array[i][index];
//                 }
//
//                 str += line + '\r\n';
//             }
//
//             return str;
//         }
//
//         // Example
//         $(document).ready(function () {
//
//             // Create Object
//             var items = [
//                   { name: "Item 1", color: "Green", size: "X-Large" },
//                   { name: "Item 2", color: "Green", size: "X-Large" },
//                   { name: "Item 3", color: "Green", size: "X-Large" }];
//
//             // Convert Object to JSON
//             var jsonObject = JSON.stringify(items);
//
//             // Display JSON
//             $('#json').text(jsonObject);
//
//             // Convert JSON to CSV & Display CSV
//             $('#csv').text(ConvertToCSV(jsonObject));
//         });
