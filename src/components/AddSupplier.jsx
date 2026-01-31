import { useState } from "react";
import { createSupplier } from "../api/supplierApi";

export default function AddSupplier({ reload }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async () => {
    if (!name.trim()) return alert("Supplier name required");

    await createSupplier({ name, phone });
    setName("");
    setPhone("");
    reload();
  };

  return (
    <div className="border rounded-lg p-3 mb-4 bg-gray-50">
      <h2 className="font-semibold mb-2">➕ Add Supplier</h2>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Supplier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-32 rounded"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button
        onClick={submit}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add Supplier
      </button>
    </div>
  );
}
