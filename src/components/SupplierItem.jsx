import { useState } from "react";
import ProductRow from "./ProductRow";
import PdfButton from "./PdfButton";
import AddProduct from "./AddProduct";

export default function SupplierItem({ supplier, products, reload }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setOpen(!open)}
          className="font-semibold text-lg"
        >
          {supplier.name}
        </button>

        <PdfButton supplier={supplier} products={products} />
      </div>

      {open && (
        <>
          <AddProduct supplierId={supplier._id} reload={reload} />

          <div className="mt-2 space-y-2">
            {products.map((p) => (
              <ProductRow
                key={p._id}
                product={p}
                reload={reload}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
