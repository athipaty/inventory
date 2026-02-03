import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductRow from "./ProductRow";
// import PdfButton from "./PdfButton";
import { deleteSupplier, updateSupplier } from "../api/supplierApi";
import toTitleCase from "../utils/toTitleCase";

export default function SupplierItem({
  supplier,
  products,
  reload,

  // controlled by parent
  isOpen,
  onToggle,
  isEditingSupplier,
  startEditSupplier,
  stopEditSupplier,
}) {
  const [editingProductId, setEditingProductId] = useState(null);
  const [supplierName, setSupplierName] = useState(supplier.name);
  const [showAddProduct, setShowAddProduct] = useState(false);

  // swipe tracking
  const [touchStartX, setTouchStartX] = useState(null);

  // keep input in sync with backend
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
      startEditSupplier(); // only one supplier can edit
    }

    setTouchStartX(null);
  };

  const saveSupplierName = async () => {
    const formatted = toTitleCase(supplierName.trim());
    if (!formatted) return;

    await updateSupplier(supplier._id, { name: formatted });
    stopEditSupplier();
    reload();
  };

  return (
    <div
      className={`border rounded-lg bg-white ${isOpen ? "bg-blue-300" : ""}`}
    >
      {/* HEADER */}
      <div
        className="flex justify-between items-center pl-2 py-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onToggle}
          disabled={isEditingSupplier}
          className="text-sm flex flex-1 text-left"
        >
          {isEditingSupplier ? (
            <input
              className="border p-1 rounded w-full text-sm"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              onBlur={() => setSupplierName(toTitleCase(supplierName))}
              autoFocus
            />
          ) : (
            <span className="text-gray-500 max-w-[230px] inline-block truncate">
              {isOpen ? `▲ ${supplier.name}` : `▼ ${supplier.name}`}
            </span>
          )}
        </button>

        {/* RIGHT ACTIONS */}
        {isEditingSupplier ? (
          <div className="flex gap-4 ml-2">
            <button
              onClick={saveSupplierName}
              className="text-green-600 text-lg"
              title="Save"
            >
              ✓
            </button>
            <button
              onClick={() => {
                stopEditSupplier();
                setSupplierName(supplier.name);
              }}
              className="text-gray-500 text-lg mr-2 front"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        ) : isOpen ? (
          <div className="flex items-center gap-3">
            {/* <PdfButton supplier={supplier} products={products} /> */}

            {/* ➕ Add Product */}
            <button
              onClick={() => setShowAddProduct(true)}
              className="font-bold text-3xl text-green-600 m-0"
              title="Add product"
            >
              +
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* BODY */}
      {isOpen && (
        <div className="p-2 space-y-1 bg-gray-50">
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
          <button
            onClick={async () => {
              const ok = window.confirm(
                `Delete supplier "${supplier.name}" and ALL its products?`,
              );
              if (!ok) return;
              await deleteSupplier(supplier._id);
              reload();
            }}
            className="text-red-600 text-xs text-end w-full px-2 pt-2"
            title="Delete supplier"
          >
            Delete this supplier
          </button>
        </div>
      )}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-4">
            <h3 className="text-lg font-semibold mb-2">Add Product</h3>

            <AddProduct
              supplierId={supplier._id}
              reload={async () => {
                await reload();
                setShowAddProduct(false);
              }}
            />

            <button
              onClick={() => setShowAddProduct(false)}
              className="text-sm text-gray-500 mt-3 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
