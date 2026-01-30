import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateSupplierPdf(supplier, products) {
  const doc = new jsPDF("p", "mm", "a4");

  doc.setFontSize(16);
  doc.text(supplier.name, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Product", "Price", "Stock"]],
    body: products.map((p) => [p.name, p.price ?? "-", p.stock ?? "-"]),
    styles: { fontSize: 10 },
  });

  doc.save(`${supplier.name}.pdf`);
}
