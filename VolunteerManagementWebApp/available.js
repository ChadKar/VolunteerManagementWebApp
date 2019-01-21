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



