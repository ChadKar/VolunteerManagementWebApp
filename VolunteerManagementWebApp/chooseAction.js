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

function expandPanel() {
    var acc = document.getElementsByClassName("accordion");
    var i;
    var j;

    for(i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function(){
            var open;
            var panel = this.nextElementSibling;
            if(panel.style.display === "block"){
                open = true;
            }
            else{
                open = false;
            }
            for(j = 0; j < acc.length; j++){
                var panel = acc[j].nextElementSibling;
                if(panel.style.display === "block"){
                    panel.style.display = "none";
                    acc[j].classList.toggle("active");
                }
            }
            var panel = this.nextElementSibling;
            panel.style.display = "block";
            this.classList.toggle("active");
            if(open){
                panel.style.display = "none";
                this.classList.toggle("active");
            }
        });
    }


}

var cost = 0;
var breadCost = 0;
var pattyCost = 0;
var vegeCost = 0;
var cheeseCost = 0;
var sauceCost = 0;
var pattyChoice = [0,0,0,0];
var pattyFinal = "";
var vegeChoice = [0,0,0,0];
var vegeFinal = "";
var cheeseChoice = [0,0,0];
var cheeseFinal = "";
var sauceChoice = ["","",""];
var sauceFinal = "";

var beefNum = 0;
var chickenNum = 0;
var fishNum = 0;
var falafelNum = 0;
var lettuceNum = 0;
var tomatoNum = 0;
var picklesNum = 0;
var avocadoNum = 0;
var cheddarNum = 0;
var camembertNum = 0;
var halloumiNum = 0;
var breadChoice = "";
var burgerNum = 0;
var totalCost = 0;
function addOptions(){
    cost = breadCost + pattyCost + vegeCost + cheeseCost + sauceCost;
    document.getElementById("price").innerHTML = "Price: $" + cost;

}
function loadOptions() {
    var bread = document.getElementsByName("bread");

    for(var i = 0; i < bread.length; i++){
        bread[i].addEventListener("click", function(){
            if(this.id === "brioche"){
                breadCost = 10;
                breadChoice = "Brioche";
            }
            if(this.id === "sesame"){
                breadCost = 8;
                breadChoice = "Sesame Seed Bun";
            }
            addOptions();

            document.getElementById("breadButton").innerHTML = "Bread: " + breadChoice + " ($" + breadCost + ")"
        });
    }

    var sauce = document.getElementsByName("sauce");
    for(var i = 0; i < sauce.length; i++){
        sauce[i].addEventListener("click", function(){
            if(this.id === "ketchup"){
                if(this.checked){
                    sauceChoice[0] = "Ketchup";
                }
                else{
                    sauceChoice[0] = "";
                }
            }
            if(this.id === "mayo"){
                if(this.checked){
                    sauceChoice[1] = "Mayo";
                }
                else{
                    sauceChoice[1] = "";
                }
            }
            if(this.id === "mustard"){
                if(this.checked){
                    sauceChoice[2] = "Mustard";
                }
                else{
                    sauceChoice[2] = "";
                }
            }
            sauceFinal = "";
            for(var j = 0; j < sauceChoice.length; j++){
                if(sauceChoice[j] !== ""){
                    sauceFinal = sauceFinal + sauceChoice[j] + ", "
                }
            }
            sauceFinal = sauceFinal.substring(0, sauceFinal.length-2);
            addOptions();
            document.getElementById("sauceButton").innerHTML = "Sauce: " + sauceFinal + " ($0)";
        });
    }
}

function setButtons(){
    document.getElementById("add").addEventListener("click", function(){

    });
}

function changeQuant(val){
    if(beefNum < 3 && val === "beefPlus"){
        beefNum++;
        pattyChoice[0]++;
        pattyCost += 4;
        updatePatty();
        document.getElementById("beefQ").innerHTML = beefNum;
    }
    if(beefNum > 0 && val === "beefSub"){
        beefNum--;
        pattyChoice[0]--;
        pattyCost -= 4;
        updatePatty();
        document.getElementById("beefQ").innerHTML = beefNum;
    }
    if(chickenNum < 3 && val === "chickenPlus"){
        chickenNum++;
        pattyChoice[1]++;
        pattyCost += 3;
        updatePatty();
        document.getElementById("chickenQ").innerHTML = chickenNum;
    }
    if(chickenNum > 0 && val === "chickenSub"){
        chickenNum--;
        pattyChoice[1]--;
        pattyCost -= 3;
        updatePatty();
        document.getElementById("chickenQ").innerHTML = chickenNum;
    }
    if(fishNum < 3 && val === "fishPlus"){
        fishNum++;
        pattyChoice[2]++;
        pattyCost += 3;
        updatePatty();
        document.getElementById("fishQ").innerHTML = fishNum;
    }
    if(fishNum > 0 && val === "fishSub"){
        fishNum--;
        pattyChoice[2]--;
        pattyCost -= 3;
        updatePatty();
        document.getElementById("fishQ").innerHTML = fishNum;
    }
    if(falafelNum < 3 && val === "falafelPlus"){
        falafelNum++;
        pattyChoice[3]++;
        pattyCost += 2;
        updatePatty();
        document.getElementById("falafelQ").innerHTML = falafelNum;
    }
    if(falafelNum > 0 && val === "falafelSub"){
        falafelNum--;
        pattyChoice[3]--;
        pattyCost -= 2;
        updatePatty();
        document.getElementById("falafelQ").innerHTML = falafelNum;
    }
    if(lettuceNum < 3 && val === "lettucePlus"){
        lettuceNum++;
        vegeChoice[0]++;
        updateVege();
        document.getElementById("lettuceQ").innerHTML = lettuceNum;
    }
    if(lettuceNum > 0 && val === "lettuceSub"){
        lettuceNum--;
        vegeChoice[0]--;
        updateVege();
        document.getElementById("lettuceQ").innerHTML = lettuceNum;
    }
    if(tomatoNum < 3 && val === "tomatoPlus"){
        tomatoNum++;
        vegeChoice[1]++;
        updateVege();
        document.getElementById("tomatoQ").innerHTML = tomatoNum;
    }
    if(tomatoNum > 0 && val === "tomatoSub"){
        tomatoNum--;
        vegeChoice[1]--;
        updateVege();
        document.getElementById("tomatoQ").innerHTML = tomatoNum;
    }
    if(picklesNum < 3 && val === "picklesPlus"){
        picklesNum++;
        vegeChoice[2]++;
        vegeCost++;
        updateVege();
        document.getElementById("picklesQ").innerHTML = picklesNum;
    }
    if(picklesNum > 0 && val === "picklesSub"){
        picklesNum--;
        vegeChoice[2]--;
        vegeCost--;
        updateVege();
        document.getElementById("picklesQ").innerHTML = picklesNum;
    }
    if(avocadoNum < 3 && val === "avocadoPlus"){
        avocadoNum++;
        vegeChoice[3]++;
        vegeCost += 2;
        updateVege();
        document.getElementById("avocadoQ").innerHTML = avocadoNum;
    }
    if(avocadoNum > 0 && val === "avocadoSub"){
        avocadoNum--;
        vegeChoice[3]--;
        vegeCost -= 2;
        updateVege();
        document.getElementById("avocadoQ").innerHTML = avocadoNum;
    }
    if(cheddarNum < 3 && val === "cheddarPlus"){
        cheddarNum++;
        cheeseChoice[0]++;
        cheeseCost++;
        updateCheese();
        document.getElementById("cheddarQ").innerHTML = cheddarNum;
    }
    if(cheddarNum > 0 && val === "cheddarSub"){
        cheddarNum--;
        cheeseChoice[0]--;
        cheeseCost--;
        updateCheese();
        document.getElementById("cheddarQ").innerHTML = cheddarNum;
    }
    if(camembertNum < 3 && val === "camembertPlus"){
        camembertNum++;
        cheeseChoice[1]++;
        cheeseCost += 2;
        updateCheese();
        document.getElementById("camembertQ").innerHTML = camembertNum;
    }
    if(camembertNum > 0 && val === "camembertSub"){
        camembertNum--;
        cheeseChoice[1]--;
        cheeseCost -= 2;
        updateCheese();
        document.getElementById("camembertQ").innerHTML = camembertNum;
    }
    if(halloumiNum < 3 && val === "halloumiPlus"){
        halloumiNum++;
        cheeseChoice[2]++;
        cheeseCost++;
        updateCheese();
        document.getElementById("halloumiQ").innerHTML = halloumiNum;
    }
    if(halloumiNum > 0 && val === "halloumiSub"){
        halloumiNum--;
        cheeseChoice[2]--;
        cheeseCost--;
        updateCheese();
        document.getElementById("halloumiQ").innerHTML = halloumiNum;
    }
}

function updatePatty(){
    pattyFinal = "";
    for(var i = 0; i < pattyChoice.length; i++){
        if(pattyChoice[i]>0){
            switch (i){
                case 0: pattyFinal = pattyFinal + "Beef x " + pattyChoice[i] + ", ";
                    break;
                case 1: pattyFinal = pattyFinal + "Chicken x " + pattyChoice[i] + ", ";
                    break;
                case 2: pattyFinal = pattyFinal + "Fish x " + pattyChoice[i] + ", ";
                    break;
                case 3: pattyFinal = pattyFinal + "Falafel x " + pattyChoice[i] + ", ";
                    break;
            }
        }
    }
    pattyFinal = pattyFinal.substring(0, pattyFinal.length-2);
    document.getElementById("pattyButton").innerHTML = "Patty: " + pattyFinal + " ($" + pattyCost + ")";
    addOptions();
}

function updateVege(){
    vegeFinal = "";
    for(var i = 0; i < vegeChoice.length; i++){
        if(vegeChoice[i] > 0){
            switch (i){
                case 0: vegeFinal = vegeFinal + "Lettuce x " + vegeChoice[i] + ", ";
                    break;
                case 1: vegeFinal = vegeFinal + "Tomato x " + vegeChoice[i] + ", ";
                    break;
                case 2: vegeFinal = vegeFinal + "Pickles x " + vegeChoice[i] + ", ";
                    break;
                case 3: vegeFinal = vegeFinal + "Avocado x " + vegeChoice[i] + ", ";
                    break;
            }
        }
    }
    vegeFinal = vegeFinal.substring(0, vegeFinal.length-2);
    document.getElementById("vegeButton").innerHTML = "Vege: " + vegeFinal + " ($" + vegeCost + ")";
    addOptions();
}

function updateCheese(){
    cheeseFinal = "";
    for(var i = 0; i < cheeseChoice.length; i++){
        if(cheeseChoice[i] > 0){
            switch(i){
                case 0: cheeseFinal = cheeseFinal + "Cheddar x " + cheeseChoice[i] + ", ";
                    break;
                case 1: cheeseFinal = cheeseFinal + "Camembert x " + cheeseChoice[i] + ", ";
                    break;
                case 2: cheeseFinal = cheeseFinal + "Halloumi x " + cheeseChoice[i] + ", ";
                    break;
            }
        }
    }
    cheeseFinal = cheeseFinal.substring(0, cheeseFinal.length-2);
    document.getElementById("cheeseButton").innerHTML = "Cheese: " + cheeseFinal + "($" + cheeseCost + ")";
    addOptions();
}

var burgers = {};

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

var orderNum;


function addOneBurger(){

    var burgerDetail = {};
    var burgerString = "";
    if(beefNum) burgerDetail.beef = beefNum;
    if(chickenNum) burgerDetail.chicken = chickenNum;
    if(fishNum) burgerDetail.fish = fishNum;
    if(falafelNum) burgerDetail.falafel = falafelNum;

    if(lettuceNum) burgerDetail.lettuce = lettuceNum;
    if(tomatoNum) burgerDetail.tomato = tomatoNum;
    if(picklesNum) burgerDetail.pickle= picklesNum;
    if(avocadoNum) burgerDetail.avocado = avocadoNum;

    if(cheddarNum) burgerDetail.cheddar = cheddarNum;
    if(camembertNum) burgerDetail.camenber = camembertNum;
    if(halloumiNum) burgerDetail.halloumi = halloumiNum;

    if(breadChoice === "Brioche") burgerDetail.brioche =1;
    if(breadChoice === "Sesame Seed Bun") burgerDetail.sesame = 1;

    if(sauceChoice[0] === "Ketchup") burgerDetail.ketchup = 1;
    if(sauceChoice[1] === "Mayo") burgerDetail.mayo =1;
    if(sauceChoice[2] === "Mustard") burgerDetail.mustard = 1;

    if(!isEmpty(burgerDetail)) {
        console.log(burgerDetail);
        burgerNum++;

        var key = "burger" + burgerNum;

        burgers[key] = burgerDetail;

        burgerString= burgerString + key+" ";
        for(var ingredient in burgerDetail){

            burgerString = burgerString + ingredient +": "+ burgerDetail[ingredient]+" "
        }
    }
    var div = document.createElement("div");
    div.innerHTML = burgerString;
    document.getElementById("orderDetails").appendChild(div);

    totalCost = totalCost + cost;

    console.log("totalCost", totalCost);

}

function getLastOrder(){
    var lastRef = database.ref('/order/').orderByChild('createTime').limitToLast(1);
    lastRef.on("value", function(data){
        var orderObject = data.val();
        console.log(orderObject);

        for(var key in orderObject) {
            orderNum = key.split("r")[2];

            console.log("lastOrderNum", orderNum);
        }
    })
}

function completeOrder() {
    event.preventDefault();
    var data = JSON.stringify(burgers);
    localStorage.setItem("burgers", data);
    localStorage.setItem("totalCost", totalCost);
    console.log("burgers", localStorage.getItem("burgers"));
    console.log("totalCost", localStorage.getItem("totalCost"));
}

function completePayment(){
   // getLastOrder();

    event.preventDefault();
    var createTime = new Date().getTime();
    var modifyTime = new Date().getTime();

    var customer = "customer1@gmail.com";

    var status = "pending";

    var burgersJSON = localStorage.getItem("burgers");
    var details = JSON.parse(burgersJSON);

    console.log(details);

    //set order3 to be

    var postData = {
        createTime : createTime,
        modifyTime : modifyTime,
        customer: customer,
        status: status,
        details: details
    }



    orderNum++;

    console.log("num", orderNum);
    var order = "order"+orderNum;

    console.log("new order", order);
    console.log('orderInv', order);
    console.log('data',postData);

   database.ref('order/'+order).set(postData);

   localStorage.removeItem("totalCost");

   Object.keys(details).forEach(function(key){
       console.log(key);
       var burger = details[key];
       var eachBurgerString = key+"----"
       Object.keys(burger).forEach(function (childKey) {
           eachBurgerString = eachBurgerString+" " +childKey+":"+ burger[childKey];
       })

       var div = document.createElement("div");
       div.innerHTML = eachBurgerString;
       document.getElementById("modal-burgerDetail").appendChild(div);
   })


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

function getTotalPrice() {
    document.getElementById("orderTotal").innerHTML = "$"+localStorage.getItem("totalCost");
}

function closePayment() {
    event.preventDefault();
    console.log("close");

    localStorage.removeItem("burgers");
    window.location = "order_form.html";
}

