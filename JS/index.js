var loginBox = document.getElementById("login");
var signupBox = document.getElementById("signup");
var homeBox = document.getElementById("home");
var loginLink = document.getElementById("signuppage");
var signupLink = document.getElementById("loginpage");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginpassword");
var loginBtn = document.getElementById("loginbtn");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupBtn = document.getElementById("signupbtn");
var success = document.getElementById("sucess");
var exist = document.getElementById("exist");
var signupList = [];
if (localStorage.getItem("account") != null) {
  signupList = JSON.parse(localStorage.getItem("account"));
}

loginLink.addEventListener("click", function () {
  loginBox.classList.add("d-none");
  signupBox.classList.remove("d-none");
});
signupLink.addEventListener("click", function () {
  loginBox.classList.remove("d-none");
  signupBox.classList.add("d-none");
});

function signUp() {
  if (validationName() && validationEmail() && validationPassword()) {
    var signupform = {
      sname: signupName.value,
      semail: signupEmail.value,
      spass: signupPassword.value,
    };
    signupList.push(signupform);
    localStorage.setItem("account", JSON.stringify(signupList));
    success.classList.remove("d-none");
    signupBtn.classList.add("shade");
  }
}
function existEmail() {
  var i = 0;
  while (i < signupList.length) {
    if (signupList[i].semail != signupEmail.value) {
      i++;
    } else {
      return true;
    }
  }
}

signupBtn.addEventListener("click", function () {
  if (existEmail()) {
    success.classList.add("d-none");
    exist.classList.remove("d-none");
    signupBtn.classList.add("shade");
  } else {
    exist.classList.add("d-none");
    signUp();
  }
});

var nameAlret = document.getElementById("namealret");
var emailAlret = document.getElementById("emailalret");
var passAlret = document.getElementById("passalret");

function validationName() {
  var regexName = /^[A-Za-z][A-Za-z ]{2,30}$/;
  var SignName = signupName.value;
  if (regexName.test(SignName)) {
    nameAlret.classList.add("d-none");
    return true;
  } else {
    passAlret.classList.add("d-none");
    nameAlret.classList.remove("d-none");
    return false;
  }
}

function validationEmail() {
  var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var signEmail = signupEmail.value;
  if (regexEmail.test(signEmail)) {
    emailAlret.classList.add("d-none");
    return true;
  } else {
    passAlret.classList.add("d-none");
    emailAlret.classList.remove("d-none");
    return false;
  }
}

function validationPassword() {
  var regexPass = /^\w{4,}$/;
  var signPass = signupPassword.value;
  if (regexPass.test(signPass)) {
    passAlret.classList.add("d-none");
    return true;
  } else {
    passAlret.classList.remove("d-none");
    return false;
  }
}

var incorrect = document.getElementById("incorrect");

function login() {
  for (var i = 0; i < signupList.length; i++) {
    if (loginEmail.value == "" && loginPassword.value == "") {
      incorrect.innerHTML = "All inputs is required";
    } else if (
      signupList[i].semail == loginEmail.value &&
      signupList[i].spass == loginPassword.value
    ) {
      homeBox.classList.remove("d-none");
      loginBox.classList.add("d-none");
      document.getElementById(
        "welcome"
      ).innerHTML = `Welcome ${signupList[i].sname}`;
    } else {
      incorrect.innerHTML = "incorrect email or password";
    }
  }
}

loginBtn.addEventListener("click", function () {
  if (localStorage.getItem("account") == null) {
    incorrect.innerHTML = "You need to sign up first";
  } else {
    login();
  }
});
