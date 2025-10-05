// src/utils/exportUtils.ts
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";

/* ------------------------------------------------------------------
   CSV EXPORT
------------------------------------------------------------------ */
export const exportToCSV = (data: any[], filename = "results.csv") => {
  if (!data.length) return alert("No data to export.");
  const headers = Object.keys(data[0]);
  const rows = [
    headers.join(","),
    ...data.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")),
  ];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  triggerDownload(blob, filename);
};

/* ------------------------------------------------------------------
   EXCEL EXPORT
------------------------------------------------------------------ */
export const exportToExcel = (data: any[], filename = "results.xlsx") => {
  if (!data.length) return alert("No data to export.");
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Results");
  writeFile(wb, filename);
};

/* ------------------------------------------------------------------
   TEXT EXPORT
------------------------------------------------------------------ */
export const exportToTXT = (data: any[], filename = "results.txt") => {
  if (!data.length) return alert("No data to export.");
  const text = data
    .map(
      (item, i) =>
        `Result ${i + 1}\n${Object.entries(item)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")}\n\n`
    )
    .join("");
  const blob = new Blob([text], { type: "text/plain" });
  triggerDownload(blob, filename);
};

/* ------------------------------------------------------------------
   PDF EXPORT  (Improved Formatting)
------------------------------------------------------------------ */
export const exportToPDF = (data: any[], filename = "results.pdf") => {
  if (!data.length) return alert("No data to export.");

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 40;
  let y = 60;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("NASA Space Biology Search Results", marginX, y);
  y += 25;

  doc.setDrawColor(0, 255, 255);
  doc.setLineWidth(1);
  doc.line(marginX, y, 550, y);
  y += 25;

  // Results
  data.forEach((item, i) => {
    if (y > 740) {
      doc.addPage();
      y = 60;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${item.title || "Untitled"}`, marginX, y);
    y += 18;

    if (item.keywords) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const wrapped = doc.splitTextToSize(`Keywords: ${item.keywords}`, 520);
      doc.text(wrapped, marginX, y);
      y += wrapped.length * 14;
    }

    if (item.link) {
      doc.setTextColor(0, 102, 255);
      doc.textWithLink("🔗 Source Link", marginX, y, { url: item.link });
      doc.setTextColor(0);
      y += 18;
    }

    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, 550, y);
    y += 24;
  });

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generated on ${new Date().toLocaleString()}`, marginX, 810);

  doc.save(filename);
};

/* ------------------------------------------------------------------
   Helper
------------------------------------------------------------------ */
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
