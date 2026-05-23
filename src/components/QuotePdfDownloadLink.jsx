import { PDFDownloadLink } from '@react-pdf/renderer';
import { Printer } from 'lucide-react';
import QuotationPDFDocument from './QuotationPDFDocument';

export default function QuotePdfDownloadLink({
  meta,
  client,
  project,
  items,
  totals,
  logoUrl,
  qrCodeUrl,
  fileName,
}) {
  return (
    <PDFDownloadLink
      document={
        <QuotationPDFDocument
          meta={meta}
          client={client}
          project={project}
          items={items}
          totals={totals}
          logoUrl={logoUrl}
          qrCodeUrl={qrCodeUrl}
        />
      }
      fileName={fileName}
      className="print-btn"
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <>
          <Printer size={16} /> {loading ? 'Loading...' : 'Save PDF'}
        </>
      )}
    </PDFDownloadLink>
  );
}
