const authLink = document.getElementById("authLink");

if (authLink) {
  const token = localStorage.getItem("token");
  if (token) {
    authLink.textContent = "Профиль";
    authLink.href = "profile.html";
  } else {
    authLink.textContent = "Вход";
    authLink.href = "login.html";
  }
}
