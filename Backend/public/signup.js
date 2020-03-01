// Input fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email")
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


// Form
const form = document.getElementById("signUpForm");

// Validation color
const green = '#4CAF50';
const red = '#F44336';

// Handle form
form.addEventListener('submit', function(event) {
    if (
      !validateFirstName() ||
      !validateLastName() ||
      !validateEmail()||
      !validatePassword() || 
      !validateConfirmPassword()
    ) {
        event.preventDefault();
      }
    }
  );
  

// check if empty and only letter
function validateFirstName(){
    if(checkEmpty(firstName)) return;
    if(!checkIfOnlyLetter(firstName)) return;
    return true;
}
function validateLastName(){
    if(checkEmpty(lastName)) return;
    if(!checkIfOnlyLetter(lastName)) return;
    return true;
}

function validateEmail(){
    if (checkEmpty(email)) return;
    if(!containsCharacters(email,2)) return;
    return true;
}

function validatePassword(){
    if(checkEmpty(password)) return;
    if (!meetPasswordLength(password,6,12)) return;
    if (!containsCharacters(password, 1)) return;
    return true;
}

function validateConfirmPassword(){
    if (checkEmpty(confirmPassword)) return;
    if (password.classList.contains("invalid")){
        setInvalid(confirmPassword, "Password must be valid!")
    }
    //check if they match
    if (password.value !== confirmPassword.value){
        setInvalid(confirmPassword, "Password must match!");
        return;
    } else {
        setValid(confirmPassword);
        return true;
    }
}

function checkEmpty(field){
    if(isEmpty(field.value.trim())){
        setInvalid(field, `${field.name} must not be empty!`);
        return true;
    } else {
        setValid(field);
        return false;
    }
}

function isEmpty(str) {
    return (!str || str.length === 0);
}

function setInvalid(field, message){
    if(field.classList.contains("valid")){
        field.classList.remove("valid");
    }
    field.classList.add("invalid");
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}

function setValid(field){
    if(field.classList.contains("invalid")){
        field.classList.remove("invalid");
    }
    field.classList.add("valid");
    field.nextElementSibling.innerHTML = '';
}

function checkIfOnlyLetter(field){
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field);
        return true;
    } else {
        setInvalid(field,`${field.name} must contain only letters`)
    }
}

function meetPasswordLength(field,minLength,maxLength){
    if(field.value.length >= minLength && field.value.length <= maxLength){
        setValid(field);
        return true;
    } else if(field.value.length < minLength){
        setInvalid(field,`${field.name} must be at least ${minLength} long!`)
    }else {
        setInvalid(field,`${field.name} must be at most ${maxLength} characters!`)
    }
}

function containsCharacters(field, caseNumber){
    let regEx;
    switch(caseNumber){
        case 1:
            //one upper, one lower, one number, one special
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(regEx,field,"Must contain at least one uppercase, one lowercase letter, one number and one special character");
        case 2:
            // Email pattern
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx, field, 'Must be a valid email address');
        default:
            return false;
    }
}

function matchWithRegEx(regEx, field, message){
    if(field.value.match(regEx)){
        setValid(field);
        return true;
    } else{
        setInvalid(field,message);
        return false;
    }
}