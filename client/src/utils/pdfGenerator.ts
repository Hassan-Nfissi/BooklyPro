import { jsPDF } from 'jspdf';
import { AppointmentItem } from '../types';

interface BusinessDetails {
  name: string;
  city?: string;
  address?: string;
  phone?: string;
}

export const generateBookingReceiptPdf = (
  appointment: AppointmentItem,
  business?: BusinessDetails
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Top Teal Accent Bar
  doc.setFillColor(13, 148, 136); // #0d9488 (Teal 600)
  doc.rect(0, 0, pageWidth, 8, 'F');

  // Establishment Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42); // Slate 900
  const busName = business?.name || 'BooklyPro';
  doc.text(busName, 14, 20);

  // Establishment Details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // Slate 500
  let subHeader = [];
  if (business?.city) subHeader.push(business.city);
  if (business?.address) subHeader.push(business.address);
  if (business?.phone) subHeader.push(`Tél: ${business.phone}`);
  if (subHeader.length > 0) {
    doc.text(subHeader.join(' • '), 14, 25);
  }

  // Receipt Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(13, 148, 136);
  doc.text('BON DE RÉSERVATION / REÇU OFFICIEL', 14, 34);

  // Booking Reference Card Box
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.roundedRect(14, 38, pageWidth - 28, 18, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('RÉFÉRENCE UNIQUE', 20, 44);
  doc.text('STATUT', pageWidth - 45, 44);

  doc.setFont('courier', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(13, 148, 136);
  doc.text(appointment.bookingReference, 20, 51);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129); // Emerald 500
  doc.text('CONFIRMÉ', pageWidth - 45, 51);

  // Details Section Header
  let y = 64;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('DÉTAILS DU RENDEZ-VOUS', 14, y);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y + 2, pageWidth - 14, y + 2);

  // Items
  y += 9;
  const addRow = (label: string, value: string, isBold: boolean = false) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(label, 14, y);

    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(value, pageWidth - 14, y, { align: 'right' });

    y += 7;
  };

  addRow('Client(e) :', appointment.customerName);
  if (appointment.customerPhone) addRow('Téléphone :', appointment.customerPhone);
  if (appointment.customerEmail) addRow('Email :', appointment.customerEmail);
  addRow('Prestation :', appointment.serviceName, true);
  addRow('Durée :', `${appointment.durationMinutes} minutes`);
  addRow('Collaborateur / Praticien :', appointment.staffName);

  const appDate = new Date(appointment.startsAt);
  const formattedDate = appDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = appDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  addRow('Date & Heure :', `${formattedDate} à ${formattedTime}`, true);

  if (appointment.customerNote) {
    addRow('Note client :', `"${appointment.customerNote}"`);
  }

  // Total Box
  y += 4;
  doc.setFillColor(240, 253, 250); // Teal 50
  doc.setDrawColor(204, 251, 241); // Teal 100
  doc.roundedRect(14, y, pageWidth - 28, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Montant à régler sur place :', 20, y + 9);

  doc.setFontSize(12);
  doc.setTextColor(13, 148, 136);
  doc.text(`${appointment.priceMad.toFixed(2)} MAD`, pageWidth - 20, y + 9, { align: 'right' });

  // Instructions & Terms
  y += 22;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('• Le règlement s\'effectue directement à l\'accueil en dirhams marocains (MAD).', 14, y);
  doc.text('• Merci de vous présenter 5 minutes avant le début de votre prestation.', 14, y + 4.5);
  doc.text('• Pour modifier ou annuler, veuillez contacter l\'établissement au moins 2h à l\'avance.', 14, y + 9);

  // Footer Branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('BooklyPro.ma — Solution de prise de rendez-vous en ligne au Maroc', pageWidth / 2, 195, { align: 'center' });

  // Trigger Save
  doc.save(`Recu-Reservation-${appointment.bookingReference}.pdf`);
};
