import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductRow from "./ProductRow";
import PdfButton from "./PdfButton";

export default function SupplierItem({ supplier, products, reload }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-white">
      {/* HEADER */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg font-semibold">
          {supplier.name}
        </span>

        <PdfButton supplier={supplier} products={products} />
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
