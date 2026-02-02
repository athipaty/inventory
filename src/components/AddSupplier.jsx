import { useState } from "react";
import { createSupplier } from "../api/supplierApi";
import toTitleCase from "../utils/toTitleCase";

export default function AddSupplier({ reload }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      alert("Supplier name required");
      return;
    }

    try {
      setLoading(true);
      await createSupplier({ name, phone });
      setName("");
      setPhone("");
      await reload(); // 👈 IMPORTANT: await
    } catch (err) {
      console.error(err);
      alert("Failed to add supplier. Check backend / CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`border rounded-lg px-3 py-2 mb-2  ${showAdd ? "bg-gray-200" : ""}`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setShowAdd((prev) => !prev)}
        className="text-sm text-blue-600 w-full text-start"
      >
        {showAdd ? "▲ Add Supplier" : "▼ Add Supplier"}
      </button>

      {/* Add Supplier Form */}
      {showAdd && (
        <>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
              className="border p-2 rounded w-full text-center"
              placeholder="Supplier name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setName(toTitleCase(name))}
            />
          </div>

          <button
            disabled={loading || !name.trim()}
            onClick={submit}
            className="mt-2 bg-blue-600 text-white px-4 py-2 w-full rounded disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Supplier"}
          </button>
        </>
      )}
    </div>
  );
}
