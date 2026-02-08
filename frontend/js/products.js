const category = document.getElementById("category");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const productsDiv = document.getElementById("products");
const resultsMeta = document.getElementById("resultsMeta");

const formatPrice = value => new Intl.NumberFormat("ru-RU").format(value);

const loadProducts = async () => {
  const query = `?category=${category.value}&minPrice=${minPrice.value}&maxPrice=${maxPrice.value}`;
  productsDiv.innerHTML = "";
  resultsMeta.textContent = "Загрузка...";

  try {
    const products = await apiFetch("/products" + query);
    resultsMeta.textContent = `Найдено: ${products.length}`;

    if (!products.length) {
      productsDiv.innerHTML = `<div class="empty-state">Ничего не найдено. Попробуйте другие фильтры.</div>`;
      return;
    }

    products.forEach(p => {
      productsDiv.innerHTML += `
        <div class="card" onclick="openProduct('${p._id}')">
          <img src="${p.image || 'assets/placeholder.svg'}" alt="${p.name}" loading="lazy">
          <h3>${p.name}</h3>
          <p class="price">${formatPrice(p.price)} ₸</p>
        </div>
      `;
    });
  } catch (err) {
    resultsMeta.textContent = "Ошибка загрузки";
    productsDiv.innerHTML = `<div class="empty-state">Не удалось загрузить товары. Проверьте API.</div>`;
  }
};

const openProduct = id => {
  location.href = `product.html?id=${id}`;
};

loadProducts();
