import { useState } from "react";
import { createProduct } from "../api/productApi";

export default function AddProduct({ supplierId, reload }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const submit = async () => {
    if (!name) return alert("Product name required");

    await createProduct({
      name,
      price: Number(price),
      stock: Number(stock),
      supplier: supplierId,
    });

    setName("");
    setPrice("");
    setStock("");
    reload();
  };

  return (
    <div className="flex gap-1 mt-2">
      <input
        className="border p-1 flex-1 rounded"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-1 w-16 rounded"
        placeholder="$"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="border p-1 w-16 rounded"
        placeholder="Qty"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button
        onClick={submit}
        className="bg-green-600 text-white px-2 rounded"
      >
        +
      </button>
    </div>
  );
}
