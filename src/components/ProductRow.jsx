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
    const ok = window.confirm(`Delete product "${product.name}"?`);
    if (!ok) return;

    await deleteProduct(product._id);
    stopEdit();
    reload();
  };

  return (
    <div
      {...swipe}
      className="border flex items-center justify-between gap-2 rounded p-3 bg-white"
    >
      {/* NAME */}
      {isEditing ? (
        <div className="border w-full p-2 flex flex-col gap-2">
          <input
            className="p-2 rounded font-medium text-sm inline-block w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            />
          <div className="flex items-center gap-2">
            <input
              className="border px-1 py-1.5 rounded w-16 text-sm text-center"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              autoFocus
            />

            {/* BIG NICE BUTTONS */}
            <button
              onClick={save}
              className="w-full py-1 rounded bg-green-500 text-white text-l flex items-center justify-center"
              title="Save"
            >
              Save
            </button>

            <button
              onClick={stopEdit}
              className="w-full py-1 rounded bg-gray-300 text-gray-700 text-l flex items-center justify-center"
              title="Cancel"
            >
              Cancel
            </button>
          </div>
          <div className="mt-2 flex justify-end items-center gap-2 text-xs text-red-500">
            <span
              onClick={remove}
            
            >Delete this product</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center text-sm w-full">
          <div className="text-sm text-gray-900 truncate max-w-[230px]" onClick={startEdit}>
            {product.name}
          </div>
          <div className="text-sm text-gray-600">Stock : {product.stock}</div>
        </div>
      )}
    </div>
  );
}
