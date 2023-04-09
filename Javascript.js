let _errorArray = new Array();

function validateForm() {
    //declare the variables
    let successbox = document.getElementById("successbox");
    let errorbox = document.getElementById("errorbox");
    let paymentbox = document.getElementById("paymentbox");

    //clear boxes
    successbox.innerHTML = "";
    errorbox.innerHTML = "";

    // reset the error array
    _errorArray = new Array();


    //getting all the values from the form
    // VOORNAAM
    let firstName = document.getElementById("firstName").value; 
    // NAAM
    let lastName = document.getElementById("lastName").value;
    // GEBRUIKERSNAAM
    let username = document.getElementById("username").value;
    // ADRES
    let address = document.getElementById("address").value;
    // LAND
    let country = document.getElementById("country").value;
    // PROVINCIE
    let state = document.getElementById("state").value;
    // EMAIL
    let email = document.getElementById("email").value;
    // WACHTWOORD
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatPassword").value;
    // POSTCODE
    let zip = document.getElementById("zip").value;
    //algemene voorwaarden
    let terms = document.getElementById("terms").checked;
    // BETALINGSWIJZE
    let payment = document.querySelector('input[name="paymentMethod"]:checked').value;

    // check if the fields are valid
    checkEmptyField(firstName, "Vul uw voornaam in");
    checkEmptyField(lastName, "Vul uw naam in");
    checkEmptyField(username, "Vul uw gebruikersnaam in");
    checkEmptyField(address, "Vul uw adres in");
    checkEmptyField(country, "Vul uw land in");
    checkEmptyField(state, "Vul uw provincie in");
    if(!checkEmail(email)){
        _errorArray.push("E-mailaders is niet correct");
    }
    checkPassword(password, repeatPassword);
    checkPC(zip);
    checkTerms(terms);

    if (_errorArray.length > 0) {
        // show the error message
        errorbox.innerHTML = "<h4>Yikes, errors</h4>";
        _errorArray.forEach(element => {
            errorbox.innerHTML += element + "<br>";
        });
        setValidationBoxes(false);
    }
    else {
        // submit the form
        successbox.innerHTML = "<h4>Goed gedaan</h4><p>Aww yeah, je werd geregistreerd.</p>";
        paymentbox.innerHTML = "<h4>Betalingswijze</h4><p>Je betalingswijze is "+ payment + ".</p>";
        setValidationBoxes(true);
        //clear form
        let form = document.getElementById("form");
        form.reset();
    }
}

function checkEmptyField(field, message) {
    if (field == "") {
        _errorArray.push(message);
    }
    
}

function checkEmail(email) {
    let emailRegEx = /([a-zA-Z0-9_]+)@([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,5})/;
    if (emailRegEx.test(email)) {
        return true;
    } else {
        return false;
    }
}

function setValidationBoxes(valid){
    let successbox = document.getElementById("successbox");
    let errorbox = document.getElementById("errorbox");
    let paymentbox = document.getElementById("paymentbox");

    if(valid){
        errorbox.style.display = "none";
        successbox.style.display = "block";
        paymentbox.style.display = "block";
    }else{
        errorbox.style.display = "block";
        successbox.style.display = "none";
        paymentbox.style.display = "none";
    }
}

//d. 2 voor de lege velden, 1 indien het te kort is en 1 
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
