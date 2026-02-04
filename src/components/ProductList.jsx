import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://center-kitchen-backend.onrender.com";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editUnit, setEditUnit] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // swipe tracking
  const [touchStartX, setTouchStartX] = useState(null);

  // Load + sort A-Z
  const loadProducts = async () => {
    const res = await axios.get(`${API}/products`);
    const sorted = [...res.data].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
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
    setEditUnit(p.unit);
    setEditPrice(p.price);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditStock("");
    setEditUnit("");
    setEditPrice("");
  };

  // Save edit
  const saveEdit = async (id) => {
    await axios.put(`${API}/products/${id}`, {
      name: editName,
      stock: Number(editStock),
      unit: editUnit,
      price: editPrice,
    });
    cancelEdit();
    loadProducts();
  };

  // swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e, product) => {
    if (touchStartX === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX;

    // swipe RIGHT to edit
    if (diff > 60) {
      startEdit(product);
    }

    setTouchStartX(null);
  };

  return (
    <div className="">
      {products.map((p) => (
        <div
          key={p._id}
          className="rounded px-1 py-1 bg-white"
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => handleTouchEnd(e, p)}
        >
          {editingId === p._id ? (
            /* 🔧 EDIT MODE */
            <div className="space-y-1">
              <input
                className="border px-2 py-1 rounded w-full text-sm"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
              />

              <div className="flex gap-2 justify-end">
                <input
                  type="number"
                  className="border px-2 py-1 text-center rounded text-sm w-full"
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                />

                <input
                  type="text"
                  className="border px-2 py-1 text-center rounded text-sm w-full"
                  value={editUnit}
                  onChange={(e) => setEditUnit(e.target.value)}
                />

                <input
                  type="number"
                  className="border px-2 py-1 text-center rounded text-sm w-full"
                  value={editPrice}
                  onChange={(e) => serEditPrice(e.target.value)}
                />

                <button
                  onClick={() => saveEdit(p._id)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-gray-300 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* 👀 VIEW MODE */
            <div className="flex flex-col border px-2 py-1 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm truncate">{p.name}</span>
                <div>
                  <span className="text-sm text-gray-600">
                  {p.stock}
                </span>
                  <span className="text-sm text-gray-600">
                  {p.unit}
                  </span>
                </div>
                
              </div>

              <div className="flex justify-between">
                <span className="text-[10px] text-gray-500 truncate">
                  {p.supplier?.name || "No supplier"}
                </span>
                <span className="text-[10px]">{`$ ${p.price}`e}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
