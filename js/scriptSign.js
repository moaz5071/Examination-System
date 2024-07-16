const inputField = document.querySelector(".inputName");
const emailField = document.querySelector(".emailAddress");
const passwordValue = document.querySelector(".passwordValue");
const registerBtn = document.querySelector(".register-btn");
var counter = 0;
var testname, testmail, testpass, testrepass;

function setCookie(name, value, days) {
  const expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function errorName() {
  const checkUserName = document.querySelector(".input-field");
  const showErrorName = document.querySelector(".showErrorName");
  if (!isNaN(inputField.value || inputField.value === "")) {
    showErrorName.textContent = "Please Enter Validate Data";
    showErrorName.style.cssText =
      "position: absolute;left: 57%;top: 111%;color: red;font-size: 13px;font-weight:bold;width:50%";
    checkUserName.append(showErrorName);
    return false;
  } else {
    showErrorName.textContent = "";
    testname = true;
    return true;
  }
}
function errorEmail() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const showErrorMail = document.querySelector(".showErrorMail");
  const checkEmail = document.querySelector(".email-field");
  if (!isNaN(emailField.value)) {
    showErrorMail.textContent = "Please Enter Validate Data";
    showErrorMail.style.cssText =
      "position: absolute;left: 57%;top: 111%;color: red;font-size: 13px;font-weight:bold ;width:50%";
    checkEmail.append(showErrorMail);
    return false;
  } else if (!emailPattern.test(emailField.value)) {
    showErrorMail.textContent = "Invalid Email Format";
    showErrorMail.style.cssText =
      "position: absolute;left: 58%;top: 111%;color: red;font-size: 14px;font-weight:bold;width:50%";
    return false;
  } else {
    showErrorMail.textContent = "";
    testmail = true;
    return true;
  }
}

function errorPassword() {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const showErrorPassword = document.querySelector(".showErrorPassword");
  const checkPassword = document.querySelector(".password-field");
  if (!passwordValue.value) {
    showErrorPassword.textContent = "Please Enter Password";
    showErrorPassword.style.cssText =
      "position: absolute;left: 57%;top: 111%;color:red;font-size: 13px;font-weight:bold ;width:50%";
    checkPassword.append(showErrorPassword);
    return false;
  } else if (passwordPattern.test(passwordValue.value) == false) {
    showErrorPassword.textContent = " must contain characters,uppercase,number.";
    showErrorPassword.style.cssText =
      "position: absolute;left: 43%;top: 111%;color: red;font-size: 12px;font-weight:bold;width:65%";
    checkPassword.append(showErrorPassword);
    return false;
  } else {
    showErrorPassword.textContent = "";
    testpass = true;
    return true;
  }
}

function errorRePassword() {
  const passwordValue = document.querySelector(".passwordValue");
  const confirmPassword = document.querySelector(".rePasswordValue");
  const showErrorRePassword = document.querySelector(".showErrorRePassword");
  const checkRePassword = document.querySelector(".rePassword-field");
  if (!confirmPassword.value) {
    showErrorRePassword.textContent = "Please Enter Confirm Password";
    showErrorRePassword.style.cssText =
      "position: absolute;left: 57%;top: 111%;color: red;font-size: 13px;font-weight:bold;width:50%";
    checkRePassword.append(showErrorRePassword);
    return false;
  } else if (passwordValue.value !== confirmPassword.value) {
    showErrorRePassword.textContent = "Passwords do not match";
    showErrorRePassword.style.cssText =
      "position: absolute;left: 62%;top: 111%;color: red;font-size: 13px;font-weight:bold;width:45%";
    checkRePassword.append(showErrorRePassword);
    return false;
  } else {
    showErrorRePassword.textContent = "";
    testrepass = true;
    return true;
  }
}

var x = (function () {
  const errorNameShow = errorName();
  const errorEmailShow = errorEmail();
  const errorPasswordShow = errorPassword();
  const errorRepasswordShow = errorRePassword();
  return [errorNameShow, errorEmailShow, errorPasswordShow, errorRepasswordShow];
})();
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var spans = document.querySelectorAll("span");
  spans.forEach(function (e) {
    e.style.display = "block";
  });
  if (!x[0]) {
    setCookie("userName", inputField.value);
  }
  if (!x[1]) {
    setCookie("Email", emailField.value);
  }
  if (!x[2]) {
    setCookie("password", passwordValue.value);
  }
  if (testname && testpass && testrepass && testmail) {
    location.replace("login.html");
  }
});
