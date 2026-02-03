import { useState } from "react";
import SupplierList from "./components/SupplierList";
import ProductList from "./components/ProductList";
import AddSupplier from "./components/AddSupplier";
import exportAllProductsPdf from "./utils/exportAllProductsPdf";


export default function App() {
  const [view, setView] = useState("product");
  const [menuOpen, setMenuOpen] = useState(false);

  const selectView = (v) => {
    setView(v);
    setMenuOpen(false);
  };

  const downloadAllProductsPdf = async () => {
  await exportAllProductsPdf();
};

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">SGO Inventory</h1>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-3xl leading-none px-2"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {view === "supplier" && <SupplierList />}
      {view === "product" && <ProductList />}
      {view === "addSupplier" && (
        <div className="max-w-md mx-auto">
          <AddSupplier reload={() => setView("supplier")} />
        </div>
      )}

      {/* MODAL */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-72 p-4 space-y-3">
            {/* Supplier View */}
            <button
              onClick={() => selectView("supplier")}
              className="w-full border rounded-lg p-2 text-center hover:bg-gray-50"
            >
              <div className="font-medium">🏬Supplier View</div>
            </button>

            {/* Product View */}
            <button
              onClick={() => selectView("product")}
              className="w-full border rounded-lg p-2 text-center hover:bg-gray-50"
            >
              <div className="font-medium">📦Product View</div>
            </button>

            {/* Add Supplier */}
            <button
              onClick={() => selectView("addSupplier")}
              className="w-full border rounded-lg p-2 text-center hover:bg-gray-50"
            >
              <div className="font-medium">➕Add Supplier</div>
            </button>

            {/* Download All Products */}
            <button
              onClick={async () => {
                setMenuOpen(false);
                await downloadAllProductsPdf();
              }}
              className="w-full border rounded-lg p-3 text-left hover:bg-gray-50"
            >
              <div className="font-medium">📄Download</div>
            </button>

            <button
              onClick={() => setMenuOpen(false)}
              className="w-full text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
