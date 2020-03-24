// function showAlert(error, info) {
//     var alertClass = error ? "alert-danger" : "alert-success";
//     var alertDiv = document.createElement("div");
//     alertDiv.classList.add("animated", "fadeIn", "alert", alertClass, "alertPosition");
//     alertDiv.innerHTML = info;
//     var formNode = document.getElementById("signUpForm");
//     formNode.insertBefore(alertDiv,formNode.firstChild);
//     setTimeout(function() {
//         alertDiv.className = "";
//         alertDiv.classList.add("animated", "fadeOut", "alert", alertClass, "alertPosition");
//     }, 3000);
// }



// function checkPassword(event) {
//     var form = event.target;
//     var input1 = document.getElementById("password1").value;
//     var input2 = document.getElementById("password2").value;
//     if (input1 !== input2) {
//         // show error message
//         showAlert(true, "passwords are different!");
//     } else {
//         // passed the validation, use AJAX to call backend api to do sign up
//         form.submit();
//     } 
// }

// document.getElementsByTagName("form")[0].addEventListener("submit", formValidation);

// function formValidation(event) {
//     event.preventDefault();
//     checkPassword(event);
// }
