import { useState } from "react";
import { createProduct } from "../api/productApi";

export default function AddProduct({ supplierId, reload }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        className="border p-2 rounded flex-1"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 rounded sm:w-24"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border p-2 rounded sm:w-24"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}
