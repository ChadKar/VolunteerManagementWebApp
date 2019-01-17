var config = {
    apiKey: "AIzaSyCPvM0PidSAxE5ev5iNGl7qfbVj5vK4zv8",
    authDomain: "stackover-burger.firebaseapp.com",
    databaseURL: "https://stackover-burger.firebaseio.com",
    projectId: "stackover-burger",
    storageBucket: "stackover-burger.appspot.com",
    messagingSenderId: "359154422713"
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


