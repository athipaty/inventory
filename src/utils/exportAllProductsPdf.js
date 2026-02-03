import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const API = "https://center-kitchen-backend.onrender.com";

export default async function exportAllProductsPdf() {
  const res = await axios.get(`${API}/products`);

  const products = res.data.map((p) => [
    p.name,
    p.stock,
    p.unit || "",
    p.supplier?.name || "",
  ]);

  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("All Products", 14, 15);

  autoTable(doc, {
    startY: 20,
    head: [["Product", "Stock", "Unit", "Supplier"]],
    body: products,
    styles: { fontSize: 10 },
  });

  doc.save("all-products.pdf");
}
