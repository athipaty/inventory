import { useEffect, useState } from "react";
import { getSuppliers } from "../api/supplierApi";
import { getProducts } from "../api/productApi";
import SupplierItem from "./SupplierItem";
import AddSupplier from "./AddSupplier";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const load = async () => {
    const s = await getSuppliers();
    const p = await getProducts();
    setSuppliers(s);
    setProducts(p);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <AddSupplier reload={load} />

      {suppliers.length === 0 && (
        <div className="text-gray-500 text-center mt-10">
          No suppliers yet. Add your first supplier 👆
        </div>
      )}

      <div className="space-y-2">
        {suppliers.map((s) => (
          <SupplierItem
            key={s._id}
            supplier={s}
            products={products.filter(
              (p) => p.supplier?._id === s._id
            )}
            reload={load}
          />
        ))}
      </div>
    </>
  );
}
