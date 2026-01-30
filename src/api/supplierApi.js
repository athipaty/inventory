const API = "https://center-kitchen-backend.onrender.com/suppliers";

export const getSuppliers = async () =>
  fetch(API).then(res => res.json());

export const createSupplier = async (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateSupplier = async (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteSupplier = async (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" });
