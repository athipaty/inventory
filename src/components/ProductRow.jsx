import { useState } from "react";
import { updateProduct, deleteProduct } from "../api/productApi";
import { useSwipe } from "../utils/swipe";

export default function ProductRow({ product, reload }) {
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const swipe = useSwipe(() => setEditing(true));

  const save = async () => {
    await updateProduct(product._id, { price, stock });
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
      className="flex justify-between items-center border p-3 rounded bg-white"
    >
      <span className="font-medium">{product.name}</span>

      {editing ? (
        <div className="flex items-center gap-2">
          <input
            className="border w-16 px-1 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="border w-16 px-1 rounded"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button onClick={save} className="text-green-600">
            ✔
          </button>
          <button
            onClick={remove}
            className="text-red-600 font-bold"
            title="Delete product"
          >
            ✕
          </button>
        </div>
      ) : (
        <span className="text-gray-700">
          ${product.price} | {product.stock}
        </span>
      )}
    </div>
  );
}
