var userPick = prompt("pick a response to see if it is right");
// display their pick
// select the element
var userPickSpan = document.getElementById("user-pick");
// add the user's pick as text content
userPickSpan.textContent = userPick;
// get the real answer



// computer pick yo
var computerPick = 40;
// select the element
var computerPickSpan = document.getElementById("computer-pick");
// display the real answer
computerPickSpan.textContent = computerpick;
// do the picks match???
if (userPick === computerpick){
// if yes, display a winning message
    var message = "Yay! you won!"
    // create element
    var winningAlert = document.createElement("p");
    // build element so the user can read the message
    winningAlert.textContent = message;
    winningAlert.setAttribute("class", "winning-message");
    // display and place
    document.body.appendChild(winningAlert);
    
// if no, display a losing message
var message = "Yo! you lost!"
// create element
var losingAlert = document.createElement("p");
// build element so the user can read the message
losingAlert.textContent = message;