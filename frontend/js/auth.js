const email = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("username");
const authError = document.getElementById("authError");

const showError = message => {
  if (!authError) return;
  authError.textContent = message;
};

const login = async () => {
  showError("");
  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (data && data.token) {
      localStorage.setItem("token", data.token);
      location.href = "profile.html";
      return;
    }
    showError("Не удалось войти. Проверьте данные.");
  } catch (err) {
    showError(err.message || "Не удалось войти. Проверьте данные.");
  }
};

const register = async () => {
  showError("");
  try {
    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      })
    });

    location.href = "login.html";
  } catch (err) {
    showError(err.message || "Регистрация не удалась. Проверьте данные.");
  }
};
