import { useState } from "react";
import SupplierList from "./components/SupplierList";
import ProductList from "./components/ProductList";

export default function App() {
  const [view, setView] = useState("supplier"); // supplier | product

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">SGO Inventory</h1>

        {/* Toggle */}
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium">
            {view === "supplier" ? "Suppliers" : "Products"}
          </span>

          <button
            onClick={() =>
              setView(view === "supplier" ? "product" : "supplier")
            }
            className={`w-10 h-5 rounded-full relative transition ${
              view === "product" ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label="Toggle view"
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                view === "product" ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "supplier" ? <SupplierList /> : <ProductList />}
    </div>
  );
}
