import { useEffect, useState } from "react";
import { getSuppliers } from "../api/supplierApi";
import { getProducts } from "../api/productApi";
import SupplierItem from "./SupplierItem";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const load = async () => {
    const s = await getSuppliers();
    const p = await getProducts();
    setSuppliers(s);
    setProducts(p);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-3">
      {suppliers.map(s => (
        <SupplierItem
          key={s._id}
          supplier={s}
          products={products.filter(p => p.supplier?._id === s._id)}
          reload={load}
        />
      ))}
    </div>
  );
}
