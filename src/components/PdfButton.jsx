import { generateSupplierPdf } from "../utils/pdf";

export default function PdfButton({ supplier, products }) {
  return (
    <button
      onClick={() => generateSupplierPdf(supplier, products)}
      className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
    >
      PDF
    </button>
  );
}
