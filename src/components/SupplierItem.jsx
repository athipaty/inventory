import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductRow from "./ProductRow";
import PdfButton from "./PdfButton";
import { deleteSupplier } from "../api/supplierApi";

export default function SupplierItem({ supplier, products, reload }) {
  const [open, setOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  return (
    <div className="border rounded-lg bg-white">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => setOpen(!open)}
          className="text-lg font-semibold flex-1 text-left"
        >
          {supplier.name}
          <span className="ml-2 text-gray-400">
            {open ? "▲" : "▼"}
          </span>
        </button>

        <div className="flex items-center gap-2">
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
      </div>

      {/* BODY */}
      {open && (
        <div className="border-t p-3 space-y-3 bg-gray-50">
          <AddProduct supplierId={supplier._id} reload={reload} />

          {products.length === 0 ? (
            <div className="text-gray-500 text-sm">
              No products yet
            </div>
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
