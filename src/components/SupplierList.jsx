import { useEffect, useState } from "react";
import { getSuppliers } from "../api/supplierApi";
import { getProducts } from "../api/productApi";
import SupplierItem from "./SupplierItem";
import AddSupplier from "./AddSupplier";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [openSupplierId, setOpenSupplierId] = useState(null);
  const [editingSupplierId, setEditingSupplierId] = useState(null);

  // Load suppliers + products
  const load = async () => {
    const s = await getSuppliers();
    const p = await getProducts();

    // optional: sort suppliers A–Z
    s.sort((a, b) => a.name.localeCompare(b.name));

    setSuppliers(s);
    setProducts(p);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {/* EMPTY STATE */}
      {suppliers.length === 0 && (
        <div className="text-gray-500 text-center mt-10">
          No suppliers yet. Add your first supplier 👆
        </div>
      )}

      {/* SUPPLIER LIST */}
      <div className="space-y-2">
        {suppliers.map((supplier) => (
          <SupplierItem
            key={supplier._id}
            supplier={supplier}
            products={products.filter((p) => p.supplier?._id === supplier._id)}
            reload={load}
            isOpen={openSupplierId === supplier._id}
            onToggle={() =>
              setOpenSupplierId((prev) =>
                prev === supplier._id ? null : supplier._id,
              )
            }
            // ✅ NEW
            isEditingSupplier={editingSupplierId === supplier._id}
            startEditSupplier={() => setEditingSupplierId(supplier._id)}
            stopEditSupplier={() => setEditingSupplierId(null)}
          />
        ))}
      </div>
    </>
  );
}
