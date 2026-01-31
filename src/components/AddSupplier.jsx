import { useState } from "react";
import { createSupplier } from "../api/supplierApi";

export default function AddSupplier({ reload }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="border rounded-lg p-3 mb-4 bg-gray-50">
      <h2 className="font-semibold mb-2">➕ Add Supplier</h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Supplier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full sm:w-40"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button
        disabled={loading}
        onClick={submit}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Supplier"}
      </button>
    </div>
  );
}
