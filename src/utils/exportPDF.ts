import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportElementToPDF(el: HTMLElement) {
  const clone = el.cloneNode(true) as HTMLElement;

  clone.style.position = "fixed";
  clone.style.left = "-9999px";

  document.body.appendChild(clone);

  const canvas = await html2canvas(clone, {
    scale: 3,
    backgroundColor: "#ffffff",
  });

  document.body.removeChild(clone);

  const img = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "pt", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(img, "PNG", 0, position, pageWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(img, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("output.pdf");
}
