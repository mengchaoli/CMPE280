$("#doSignUp").click(function() {
  var signUpForm = $("#signUpForm")[0];
  var signInForm = $("#signInForm")[0];
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

$("#doSignIn").click(function() {
  var signUpForm = $("#signUpForm")[0];
  var signInForm = $("#signInForm")[0];
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});
