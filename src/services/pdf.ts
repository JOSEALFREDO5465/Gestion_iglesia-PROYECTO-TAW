import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (title: string, headers: string[][], data: any[][], filename: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  
  const date = new Date().toLocaleDateString();
  doc.text(`Fecha de reporte: ${date}`, 14, 30);

  (doc as any).autoTable({
    head: headers,
    body: data,
    startY: 35,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 9 },
  });

  doc.save(`${filename}_${date.replace(/\//g, '-')}.pdf`);
};
