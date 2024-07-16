const loginEmail = document.querySelector(".login_email_input");
const loginPassword = document.querySelector(".login_password_input");
const loginSubmit = document.querySelector(".login_supmit_btn");

function getCookie(cookieName) {
  var cookiesArr = allCookiesList();

  for (var i = 0; i < cookiesArr.length; i++) {
    var cookie = cookiesArr[i].split("=");
    if (cookie[0] === cookieName) {
      return cookie[1];
    }
  }
  return null;
}

function allCookiesList() {
  return document.cookie.split(";").map(function (cookie) {
    return cookie.trim();
  });
}

loginSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    loginEmail.value != getCookie("Email") ||
    loginPassword.value != getCookie("password")
  ) {
    const loginPassword = document.querySelector(".login_password");
    const checkData = document.querySelector(".check_your_Data");
    checkData.style.cssText =
      "position: absolute;font-weight: bold;color: rgb(174, 8, 8);top: 118%;left: 0%;width: 100%;";
    checkData.textContent = "check your email or password";
    loginPassword.append(checkData);
  } else {
    location.replace("exam.html");
  }
});
