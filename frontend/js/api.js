const API_URL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api"
    : "https://online-gadget-shop.onrender.com/api";

const getToken = () => localStorage.getItem("token");

const apiFetch = async (url, options = {}) => {
  const res = await fetch(API_URL + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() ? `Bearer ${getToken()}` : ""
    },
    ...options
  });

  const raw = await res.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = { message: raw };
    }
  }

  if (!res.ok) {
    const message = data && data.message ? data.message : "API error";
    throw new Error(message);
  }

  return data;
};
