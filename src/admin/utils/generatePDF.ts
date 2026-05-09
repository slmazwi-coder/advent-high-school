import jsPDF from 'jspdf';
import type { Application } from './storage';

export function generateApplicationPDF(app: Application): void {
  const doc = new jsPDF();
  const red = [200, 16, 46];

  doc.setFillColor(red[0], red[1], red[2]);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Advent Comprehensive High School', 105, 18, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Student Application Form', 105, 30, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  let y = 55;

  const addField = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(label + ':', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value || 'N/A', 80, y);
    y += 10;
  };

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(red[0], red[1], red[2]);
  doc.text('Learner Details', 20, y);
  doc.setTextColor(0, 0, 0);
  y += 10;

  addField('First Name', app.firstName);
  addField('Last Name', app.lastName);
  addField('Date of Birth', app.dob);
  addField('Grade Applied', app.grade);
  addField('Previous School', app.previousSchool);

  y += 5;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(red[0], red[1], red[2]);
  doc.text('Guardian Details', 20, y);
  doc.setTextColor(0, 0, 0);
  y += 10;

  addField('Guardian Name', app.guardianName);
  addField('Phone', app.guardianPhone);
  addField('Email', app.guardianEmail);
  addField('Address', app.address);

  y += 5;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(red[0], red[1], red[2]);
  doc.text('Application Status', 20, y);
  doc.setTextColor(0, 0, 0);
  y += 10;

  addField('Status', app.status);
  addField('Submitted', app.submittedDate);

  doc.setFillColor(red[0], red[1], red[2]);
  doc.rect(0, 280, 210, 17, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('"The fear of the Lord is the beginning of wisdom"', 105, 290, { align: 'center' });

  doc.save(`application_${app.firstName}_${app.lastName}.pdf`);
}
