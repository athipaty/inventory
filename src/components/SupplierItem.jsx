import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductRow from "./ProductRow";
import PdfButton from "./PdfButton";

export default function SupplierItem({ supplier, products, reload }) {
  const [open, setOpen] = useState(false);

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

  <PdfButton
    supplier={supplier}
    products={products}
    onClick={(e) => e.stopPropagation()}
  />
</div>


      {/* EXPAND AREA */}
      {open && (
        <div className="border-t p-3 space-y-3 bg-gray-50">
          {/* ADD PRODUCT */}
          <AddProduct
            supplierId={supplier._id}
            reload={reload}
          />

          {/* PRODUCT LIST */}
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
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
