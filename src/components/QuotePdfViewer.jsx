import { PDFViewer } from '@react-pdf/renderer';
import QuotationPDFDocument from './QuotationPDFDocument';

export default function QuotePdfViewer({ meta, client, project, items, totals, logoUrl, qrCodeUrl }) {
  return (
    <PDFViewer width="100%" height="100%" style={{ border: 'none', backgroundColor: '#525659' }}>
      <QuotationPDFDocument
        meta={meta}
        client={client}
        project={project}
        items={items}
        totals={totals}
        logoUrl={logoUrl}
        qrCodeUrl={qrCodeUrl}
      />
    </PDFViewer>
  );
}
