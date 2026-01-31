import { useState, useEffect } from "react";
import { updateProduct, deleteProduct } from "../api/productApi";
import { useSwipe } from "../utils/swipe";

export default function ProductRow({
  product,
  reload,
  isEditing,
  startEdit,
  stopEdit,
}) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const swipe = useSwipe(startEdit);

  // Reset fields if editing is cancelled externally
  useEffect(() => {
    if (!isEditing) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [isEditing, product]);

  const save = async () => {
    await updateProduct(product._id, {
      name,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
    });
    stopEdit();
    reload();
  };

  const remove = async () => {
    const ok = window.confirm(
      `Delete product "${product.name}"?`
    );
    if (!ok) return;

    await deleteProduct(product._id);
    stopEdit();
    reload();
  };

  return (
    <div
      {...swipe}
      className="border rounded p-3 bg-white space-y-2 touch-pan-y"
    >
      {/* NAME */}
      {isEditing ? (
        <input
          className="border p-2 rounded w-full font-medium text-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          autoFocus
        />
      ) : (
        <div
          className="font-semibold text-gray-900"
          onClick={startEdit}
        >
          {product.name}
        </div>
      )}

      {/* PRICE + STOCK */}
      {isEditing ? (
        <div className="flex items-center gap-3">
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

          {/* BIG NICE BUTTONS */}
          <button
            onClick={save}
            className="w-12 h-12 rounded-full bg-green-500 text-white text-xl flex items-center justify-center"
            title="Save"
          >
            ✔
          </button>

          <button
            onClick={stopEdit}
            className="w-12 h-12 rounded-full bg-gray-300 text-gray-700 text-xl flex items-center justify-center"
            title="Cancel"
          >
            ✕
          </button>

          <button
            onClick={remove}
            className="w-12 h-12 rounded-full bg-red-500 text-white text-xl flex items-center justify-center"
            title="Delete"
          >
            🗑️
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
