import { useState } from "react";
import { updateProduct, deleteProduct } from "../api/productApi";
import { useSwipe } from "../utils/swipe";

export default function ProductRow({ product, reload }) {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const swipe = useSwipe(() => setEditing(true));

  const save = async () => {
    await updateProduct(product._id, {
      name,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
    });
    setEditing(false);
    reload();
  };

  const remove = async () => {
    const ok = window.confirm(
      `Delete product "${product.name}"?`
    );
    if (!ok) return;

    await deleteProduct(product._id);
    reload();
  };

  return (
    <div
      {...swipe}
      className="border rounded p-3 bg-white space-y-2 touch-pan-y"
    >
      {/* PRODUCT NAME */}
      {editing ? (
        <input
          className="border p-2 rounded w-full font-medium"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
      ) : (
        <div className="font-semibold text-gray-900">
          {product.name}
        </div>
      )}

      {/* PRICE + STOCK */}
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            className="border p-2 rounded w-24"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <input
            className="border p-2 rounded w-24"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
          />

          <button
            onClick={save}
            className="text-green-600 font-bold text-lg"
            title="Save"
          >
            ✔
          </button>

          <button
            onClick={remove}
            className="text-red-600 font-bold text-lg"
            title="Delete"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          ${product.price} | Stock: {product.stock}
        </div>
      )}
    </div>
  );
}
