const content = document.getElementById("content");
const profileMeta = document.getElementById("profileMeta");
const tabs = document.querySelectorAll(".tab");

let user;

const formatPrice = value => new Intl.NumberFormat("ru-RU").format(value);

const setActiveTab = section => {
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.section === section);
  });
};

const renderEmpty = message => {
  content.innerHTML = `<div class="empty-state">${message}</div>`;
};

const show = section => {
  if (!user) return;
  setActiveTab(section);
  content.innerHTML = "";
  const items = user[section] || [];

  if (!items.length) {
    renderEmpty("Пока пусто. Добавьте товары из каталога.");
    return;
  }

  items.forEach(p => {
    content.innerHTML += `
      <div class="card">
        <img src="${p.image || "assets/placeholder.svg"}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">${formatPrice(p.price)} ₸</p>
      </div>
    `;
  });
};

const loadProfile = async () => {
  if (!localStorage.getItem("token")) {
    location.href = "login.html";
    return;
  }

  try {
    profileMeta.textContent = "Загрузка...";
    user = await apiFetch("/users/profile");
    profileMeta.textContent = "Ваши сохраненные товары";
    show("cart");
  } catch (err) {
    profileMeta.textContent = "Ошибка профиля";
    renderEmpty("Нужен вход в аккаунт.");
  }
};

loadProfile();

const logout = () => {
  localStorage.removeItem("token");
  location.href = "index.html";
};
