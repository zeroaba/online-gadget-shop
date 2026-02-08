const id = new URLSearchParams(location.search).get("id");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productSpecs = document.getElementById("productSpecs");
const productPrice = document.getElementById("productPrice");
const actionStatus = document.getElementById("actionStatus");

let product;

const formatPrice = value => new Intl.NumberFormat("ru-RU").format(value);

const setStatus = message => {
  if (actionStatus) actionStatus.textContent = message;
};

const loadProduct = async () => {
  try {
    product = await apiFetch(`/products/${id}`);
    productImage.src = product.image || "assets/placeholder.svg";
    productImage.alt = product.name;
    productName.textContent = product.name;
    productDesc.textContent = product.description || "Описание скоро появится.";
    productSpecs.textContent = product.specs || "Характеристики уточняются.";
    productPrice.textContent = `${formatPrice(product.price)} ₸`;
  } catch (err) {
    productName.textContent = "Товар не найден";
    productDesc.textContent = "Проверьте ссылку или вернитесь в каталог.";
    productSpecs.textContent = "";
    productPrice.textContent = "";
  }
};

const addToCart = async () => {
  if (!product) return;
  setStatus("Добавляем в корзину...");
  try {
    await apiFetch("/users/profile", {
      method: "PUT",
      body: JSON.stringify({ $push: { cart: product._id } })
    });
    setStatus("Добавлено в корзину.");
  } catch (err) {
    setStatus("Не удалось добавить. Проверьте вход.");
  }
};

const addToFavorites = async () => {
  if (!product) return;
  setStatus("Добавляем в избранное...");
  try {
    await apiFetch("/users/profile", {
      method: "PUT",
      body: JSON.stringify({ $push: { favorites: product._id } })
    });
    setStatus("Добавлено в избранное.");
  } catch (err) {
    setStatus("Не удалось добавить. Проверьте вход.");
  }
};

loadProduct();
