  var date;
  var volunteers;
  var button;
  var initialInput;
  var submitButton;
   
  function setup(){
	  volunteers = null;
	  button.mousePressed(increaseVolunteers);
	  initialInput = createInput('date');
	  submitButton = createButton('submit');
	  submitButton.mousePressed(submitdate);
  }

var ref = database.ref('volunteer');
ref.on('value',gotData, errData);


function gotData(data){
	 
	var volunteerListing = selectAll('volunteerListing');
	for ( var i = 0; i < volunteerListing.length; i++){
		volunteerListing[i].remove();
		
	}
	
	
	//console.log(data.val());
	var volunteer = data.val();
	var keys = Object.keys(volunteer);
	console.log(keys);
	for (var i = 0; i < keys.length;i++){
		var k = keys[i];
		var date = volunteer[k].date;
		var id = volunteer[k].id;
	//	console.log(date, id);
		var li = createElement('li'+ date +':'+volunteer);
		li.class('volunteerListing');
		li.parent('volunteerList');
	}
	
}
function errData(err){
	console.log('Error!');
	console.log(err);
	
}
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


