const API = "https://center-kitchen-backend.onrender.com/products";

export const getProducts = async () =>
  fetch(API).then(res => res.json());

export const createProduct = async (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateProduct = async (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteProduct = async (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" });
