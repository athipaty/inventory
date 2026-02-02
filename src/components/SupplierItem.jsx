import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductRow from "./ProductRow";
import PdfButton from "./PdfButton";
import { deleteSupplier, updateSupplier } from "../api/supplierApi";

export default function SupplierItem({
  supplier,
  products,
  reload,
  isOpen,
  onToggle,
}) {
  const [open, setOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // 🔹 NEW: supplier edit state
  const [editingSupplier, setEditingSupplier] = useState(false);
  const [supplierName, setSupplierName] = useState(supplier.name);

  // 🔹 NEW: swipe tracking
  const [touchStartX, setTouchStartX] = useState(null);

  // keep name in sync after reload
  useEffect(() => {
    setSupplierName(supplier.name);
  }, [supplier.name]);

  // swipe handlers (RIGHT swipe only)
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX;

    if (diff > 60) {
      setEditingSupplier(true);
    }

    setTouchStartX(null);
  };

  const saveSupplierName = async () => {
    if (!supplierName.trim()) return;
    await updateSupplier(supplier._id, { name: supplierName });
    setEditingSupplier(false);
    reload();
  };

  return (
    <div className={`border rounded-lg bg-white ${open ? "bg-gray-200" : ""}`}>
      {/* HEADER */}
      <div
        className="flex justify-between items-center px-2 py-1 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-semibold flex flex-1 text-left"
          disabled={editingSupplier}
        >
          {editingSupplier ? (
            <input
              className="border p-1 rounded w-full text-sm"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              autoFocus
            />
          ) : (
            <span className="ml-1 text-gray-500 max-w-[200px] inline-block truncate">
              {open ? `▲ ${supplier.name}` : `▼ ${supplier.name}`}
            </span>
          )}
        </button>

        {/* RIGHT ACTIONS */}
        {editingSupplier ? (
          <div className="flex gap-2 ml-2">
            <button
              onClick={saveSupplierName}
              className="text-green-600 text-lg"
              title="Save"
            >
              ✓
            </button>
            <button
              onClick={() => {
                setEditingSupplier(false);
                setSupplierName(supplier.name);
              }}
              className="text-gray-500 text-lg"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        ) : open ? (
          <div className="flex items-center gap-4">
            <PdfButton supplier={supplier} products={products} />
            <button
              onClick={async () => {
                const ok = window.confirm(
                  `Delete supplier "${supplier.name}" and ALL its products?`
                );
                if (!ok) return;
                await deleteSupplier(supplier._id);
                reload();
              }}
              className="text-red-600 text-xl"
              title="Delete supplier"
            >
              🗑️
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* BODY */}
      {open && (
        <div className="border-t p-3 space-y-3 bg-gray-50">
          <AddProduct supplierId={supplier._id} reload={reload} />

          {products.length === 0 ? (
            <div className="text-gray-500 text-sm">No products yet</div>
          ) : (
            products.map((p) => (
              <ProductRow
                key={p._id}
                product={p}
                reload={reload}
                isEditing={editingProductId === p._id}
                startEdit={() => setEditingProductId(p._id)}
                stopEdit={() => setEditingProductId(null)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
