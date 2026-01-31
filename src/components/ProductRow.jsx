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
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(product._id);
    reload();
  };

  return (
    <div
      {...swipe}
      className="flex justify-between items-center border p-2 rounded"
    >
      <span className="font-medium">{product.name}</span>

      {editing ? (
        <div className="flex gap-1 items-center">
          <input
            className="border w-16 px-1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="border w-16 px-1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button onClick={save} className="text-green-600">✔</button>
          <button
            onClick={remove}
            className="text-red-600 font-bold"
            title="Delete"
          >
            ✕
          </button>
        </div>
      ) : (
        <span>${product.price} | {product.stock}</span>
      )}
    </div>
  );
}
