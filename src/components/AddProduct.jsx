import { useState } from "react";
import { createProduct } from "../api/productApi";

export default function AddProduct({ supplierId, reload }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      alert("Product name required");
      return;
    }

    try {
      setLoading(true);
      await createProduct({
        name,
        price: Number(price) || 0,
        stock: Number(stock) || 0,
        supplier: supplierId, // 👈 IMPORTANT
      });

      setName("");
      setPrice("");
      setStock("");
      await reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row p-2 rounded gap-1 border ${showAdd ? "bg-gray-200" : ""}`}>
      {/* Toggle button */}
      <button
        onClick={() => setShowAdd((prev) => !prev)}
        className="text-sm text-blue-600 w-full text-start"
      >
        {showAdd ? "▲ Add Product" : "▼ Add Product"}
      </button>

      {showAdd && (

      <div className="flex flex-col gap-1">
        <input
          className="border px-2 py-1 rounded flex-1 text-center"
          placeholder="Product name (Must)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border px-2 py-1 rounded sm:w-24 text-center"
          placeholder="Price (Optional)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border px-2 py-1 rounded sm:w-24 text-center"
          placeholder="Stock (Optional)"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button
          disabled={loading || !name.trim()}
          onClick={submit}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add
        </button>
      </div>
      )}
    </div>
  );
}
