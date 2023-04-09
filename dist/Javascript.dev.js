"use strict";

var _errorArray = new Array();

function validateForm() {
  //declare the variables
  var successbox = document.getElementById("successbox");
  var errorbox = document.getElementById("errorbox");
  var paymentbox = document.getElementById("paymentbox"); //clear boxes

  successbox.innerHTML = "";
  errorbox.innerHTML = ""; // reset the error array

  _errorArray = new Array(); //clear form

  var form = document.getElementById("form");
  form.reset(); //getting all the values from the form
  // VOORNAAM

  var firstName = document.getElementById("firstName").value; // NAAM

  var lastName = document.getElementById("lastName").value; // GEBRUIKERSNAAM

  var username = document.getElementById("username").value; // ADRES

  var address = document.getElementById("address").value; // LAND

  var country = document.getElementById("country").value; // PROVINCIE

  var state = document.getElementById("state").value; // EMAIL

  var email = document.getElementById("email").value; // WACHTWOORD

  var password = document.getElementById("password").value;
  var repeatPassword = document.getElementById("repeatPassword").value; // POSTCODE

  var zip = document.getElementById("zip").value; //algemene voorwaarden

  var terms = document.getElementById("terms").checked; // BETALINGSWIJZE

  var payment = document.querySelector('input[name="paymentMethod"]:checked').value; // check if the fields are valid

  checkEmptyField(firstName, "Vul uw voornaam in");
  checkEmptyField(lastName, "Vul uw naam in");
  checkEmptyField(username, "Vul uw gebruikersnaam in");
  checkEmptyField(address, "Vul uw adres in");
  checkEmptyField(country, "Vul uw land in");
  checkEmptyField(state, "Vul uw provincie in");

  if (!checkEmail(email)) {
    _errorArray.push("E-mailaders is niet correct");
  }

  checkPassword(password, repeatPassword);
  checkPC(zip);
  checkTerms(terms);

  if (_errorArray.length > 0) {
    // show the error message
    errorbox.innerHTML = "<h4>Yikes, errors</h4>";

    _errorArray.forEach(function (element) {
      errorbox.innerHTML += element + "<br>";
    });

    setValidationBoxes(false);
  } else {
    // submit the form
    successbox.innerHTML = "<h4>Goed gedaan</h4><p>Aww yeah, je werd geregistreerd.</p>";
    paymentbox.innerHTML = "<h4>Betalingswijze</h4><p>Je betalingswijze is " + payment + ".</p>";
    setValidationBoxes(true);
  }
}

function checkEmptyField(field, message) {
  if (field == "") {
    _errorArray.push(message);
  }
}

function checkEmail(email) {
  var emailRegEx = /([a-zA-Z0-9_]+)@([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,5})/;

  if (emailRegEx.test(email)) {
    return true;
  } else {
    return false;
  }
}

function setValidationBoxes(valid) {
  var successbox = document.getElementById("successbox");
  var errorbox = document.getElementById("errorbox");
  var paymentbox = document.getElementById("paymentbox");

  if (valid) {
    errorbox.style.display = "none";
    successbox.style.display = "block";
    paymentbox.style.display = "block";
  } else {
    errorbox.style.display = "block";
    successbox.style.display = "none";
    paymentbox.style.display = "none";
  }
} //d. 2 voor de lege velden, 1 indien het te kort is en 1 
//wanneer ze niet gelijk zijn aan elkaar.


function checkPassword(password, repeatPassword) {
  checkEmptyField(password, "Vul uw wachtwoord in");
  checkEmptyField(repeatPassword, "Herhaal uw wachtwoord");

  if (password.length < 8) {
    _errorArray.push("Wachtwoord moet minstens 8 karakters lang zijn");
  }

  if (password != repeatPassword) {
    _errorArray.push("Wachtwoorden komen niet overeen");
  }
}

function checkPC(zip) {
  checkEmptyField(zip, "Vul uw postcode in");

  if (zip < 1000 || zip > 9999) {
    _errorArray.push("De waarde van postcode moet tussen 1000 en 9999 liggen.");
  }
}

function checkTerms(terms) {
  if (!terms) {
    _errorArray.push("U moet de algemene voorwaarden accepteren");
  }
}