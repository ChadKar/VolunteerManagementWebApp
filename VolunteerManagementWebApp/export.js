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
var record;
database.ref('/record/').once('value', function(snapshot){
    //console.log(snap.val());
    record = snapshot.val();
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


