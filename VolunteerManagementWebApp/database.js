//We were unable to successfully export the below code to all pages.
//Because of this a developer will have to go through every page to change 
//the database reference.
export function callDatabase(){
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
return database;
}