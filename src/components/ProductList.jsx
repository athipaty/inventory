import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://center-kitchen-backend.onrender.com";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editStock, setEditStock] = useState("");

  // Load + sort A-Z
  const loadProducts = async () => {
    const res = await axios.get(`${API}/products`);
    const sorted = [...res.data].sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sorted);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Start editing
  const startEdit = (p) => {
    setEditingId(p._id);
    setEditName(p.name);
    setEditStock(p.stock);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditStock("");
  };

  // Save edit
  const saveEdit = async (id) => {
    await axios.put(`${API}/products/${id}`, {
      name: editName,
      stock: Number(editStock),
    });
    cancelEdit();
    loadProducts();
  };

  return (
    <div className="space-y-2">
      {products.map((p) => (
        <div key={p._id} className="border rounded px-2 py-1 bg-white">
          {editingId === p._id ? (
            /* 🔧 EDIT MODE */
            <div className="space-y-1">
              <input
                className="border px-2 py-1 rounded w-full"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <div className="flex gap-2 justify-end">
                <input
                  type="number"
                  className="border px-2 py-1 text-center rounded w-full"
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                />

                <button
                  onClick={() => saveEdit(p._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* 👀 VIEW MODE */
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm truncate">{p.name}</span>
                <span className="text-sm text-gray-600">Stock: {p.stock}</span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-gray-500 truncate">
                  {p.supplier?.name || "No supplier"}
                </span>

                <button
                  onClick={() => startEdit(p)}
                  className="text-blue-600 text-xs"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
