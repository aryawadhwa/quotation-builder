import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { calculateTotals, formatInr, getEffectiveRate, getItemLineAmount } from '../utils/calculateTotals';
import { chunkItemsForPdf } from '../utils/chunkPdfItems';
import { company } from '../config/company';

import award1 from '../assets/awards/IIID_Best_Stall_Design_Award_2023.jpeg';
import award2 from '../assets/awards/IDEA_24_Trophy.jpeg';
import award3 from '../assets/awards/IDEA_25_Exhibitor.jpeg';
import award4 from '../assets/awards/IDEA_23_Exhibitor.jpeg';
import award5 from '../assets/awards/Fabricator_Certificate.png';

// Theme Colors
const NAVY = '#1e293b';
const NAVY_MID = '#334155';
const BLUE = '#3b82f6';
const BLUE_LT = '#60a5fa';
const TEXT_SOFT = '#64748b';
const RULE = '#e2e8f0';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 60, // Space for footer
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#334155',
    backgroundColor: '#ffffff'
  },
  
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${NAVY}`,
    paddingBottom: 15,
    marginBottom: 20
  },
  headerCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: `1px solid ${RULE}`,
    paddingBottom: 10,
    marginBottom: 20
  },
  logo: {
    height: 45,
    width: 'auto',
    objectFit: 'contain'
  },
  logoCompact: {
    height: 30,
    width: 'auto',
    objectFit: 'contain'
  },
  tagline: {
    fontSize: 6.5,
    marginTop: 6,
    color: BLUE_LT,
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  contactInfo: {
    textAlign: 'right',
    fontSize: 8,
    lineHeight: 1.4
  },
  
  // --- Titles ---
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontFamily: 'Times-Roman',
    fontSize: 32,
    color: NAVY,
    textTransform: 'uppercase',
    letterSpacing: 6
  },
  titleAccent: {
    color: BLUE
  },
  metaBox: {
    textAlign: 'right',
    fontSize: 8,
    lineHeight: 1.6
  },
  
  // --- Info Grid ---
  infoGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20
  },
  infoCard: {
    flex: 1,
    padding: 12,
    border: `1px solid ${RULE}`,
    borderTop: `2px solid ${NAVY}`,
    backgroundColor: '#f8fafc',
    justifyContent: 'flex-start'
  },
  infoCardBlue: {
    borderTop: `2px solid ${BLUE}`
  },
  cardLabel: {
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_SOFT,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8
  },
  cardName: {
    fontFamily: 'Times-Roman',
    fontSize: 16,
    color: NAVY,
    marginBottom: 4
  },
  
  // --- Section Headers ---
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10
  },
  sectionNum: {
    backgroundColor: NAVY,
    color: '#ffffff',
    width: 18,
    height: 18,
    borderRadius: 9,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    paddingTop: 4,
    marginRight: 10
  },
  sectionTitle: {
    fontFamily: 'Times-Roman',
    fontSize: 14,
    color: NAVY,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: RULE,
    marginLeft: 10
  },
  
  // --- Intro Text ---
  introText: {
    lineHeight: 1.6,
    fontSize: 9,
    marginBottom: 20,
    color: NAVY_MID
  },
  
  // --- Awards Strip ---
  awardsStrip: {
    backgroundColor: NAVY,
    padding: 15,
    flexDirection: 'row',
    marginTop: 'auto',
    alignItems: 'center'
  },
  awardsLabel: {
    fontFamily: 'Times-Roman',
    color: BLUE_LT,
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginRight: 15,
    paddingRight: 15,
    borderRight: `1px solid rgba(96, 165, 250, 0.3)`
  },
  awardsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  awardCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(96, 165, 250, 0.2)',
    padding: 8,
    alignItems: 'center'
  },
  awardImg: {
    height: 35,
    marginBottom: 6
  },
  awardName: {
    fontSize: 6,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 2
  },
  awardSub: {
    fontSize: 5,
    color: BLUE_LT,
    textAlign: 'center'
  },
  
  // --- Table ---
  table: {
    width: '100%',
    marginTop: 10,
    borderTop: `1px solid ${RULE}`,
    borderLeft: `1px solid ${RULE}`
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableHeaderRow: {
    backgroundColor: '#f8fafc',
    borderBottom: `2px solid ${NAVY}`
  },
  tableCol: {
    borderRight: `1px solid ${RULE}`,
    borderBottom: `1px solid ${RULE}`,
    padding: 8
  },
  tableHeaderCell: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: NAVY
  },
  tableCell: {
    fontSize: 8,
    lineHeight: 1.4,
    color: NAVY_MID
  },
  itemCode: {
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    fontSize: 10,
    marginBottom: 6
  },
  itemSystem: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    color: NAVY,
    marginBottom: 3
  },
  specRow: {
    flexDirection: 'row',
    marginTop: 2
  },
  specLabel: {
    width: 45,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_SOFT
  },
  specValue: {
    flex: 1,
    fontSize: 7,
    color: NAVY_MID
  },
  itemDrawing: {
    maxHeight: 72,
    maxWidth: '100%',
    marginTop: 5,
    objectFit: 'contain',
    alignSelf: 'flex-start'
  },
  continuationNote: {
    fontSize: 7,
    color: TEXT_SOFT,
    marginBottom: 8,
    fontStyle: 'italic'
  },
  
  // --- Totals & Bank ---
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  bankBox: {
    width: '45%'
  },
  bankHeader: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    color: NAVY,
    marginBottom: 8
  },
  bankRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  bankLabel: {
    width: 70,
    fontSize: 8,
    color: TEXT_SOFT
  },
  bankValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: NAVY_MID,
    flex: 1,
    flexWrap: 'wrap'
  },
  totalsBox: {
    width: '45%'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottom: `1px solid ${RULE}`
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: NAVY,
    paddingHorizontal: 10,
    marginTop: 4
  },
  grandTotalText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#ffffff'
  },
  grandTotalValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#ffffff'
  },
  
  // --- Terms ---
  tcGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 20
  },
  tcCard: {
    width: '47%',
    marginBottom: 10
  },
  tcHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  tcNum: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    marginRight: 6
  },
  tcTitle: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    letterSpacing: 1
  },
  tcText: {
    fontSize: 8,
    lineHeight: 1.5,
    color: TEXT_SOFT,
    marginBottom: 3
  },
  
  // --- Signatures ---
  sigRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50
  },
  sigBox: {
    width: '40%'
  },
  sigLine: {
    borderBottom: `1px solid ${NAVY}`,
    marginTop: 40,
    marginBottom: 6
  },
  
  // --- Footer ---
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `1px solid ${RULE}`,
    paddingTop: 10,
    fontSize: 7,
    color: TEXT_SOFT
  }
});

const FOOTER_TEXT = company.footerLine;

const PdfFooter = () => (
  <View style={styles.footer} fixed>
    <Text>{FOOTER_TEXT}</Text>
    <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
  </View>
);

const PricingPageHeader = ({ meta, client, project, logoUrl, continuation }) => (
  <>
    <View style={styles.headerCompact} fixed>
      {logoUrl && <Image src={logoUrl} style={styles.logoCompact} />}
      <Text style={{ fontSize: 7, color: NAVY_MID }}>
        <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>{meta.quoteNo}</Text>
        {'  ·  '}
        {client.name}
        {'  ·  '}
        {project.name}
        {continuation ? '  ·  (continued)' : ''}
      </Text>
    </View>
    {!continuation && (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionNum}>2</Text>
        <Text style={styles.sectionTitle}>Scope of Supply & Pricing</Text>
        <View style={styles.sectionLine} />
      </View>
    )}
    {continuation && (
      <Text style={styles.continuationNote}>Scope of Supply & Pricing (continued)</Text>
    )}
  </>
);

const ItemsTableHeader = () => (
  <View style={[styles.tableRow, styles.tableHeaderRow]} fixed>
    <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableHeaderCell}>Code & Drawing</Text></View>
    <View style={[styles.tableCol, { width: '37%' }]}><Text style={styles.tableHeaderCell}>System Specification</Text></View>
    <View style={[styles.tableCol, { width: '8%', textAlign: 'center' }]}><Text style={styles.tableHeaderCell}>Qty</Text></View>
    <View style={[styles.tableCol, { width: '15%', textAlign: 'right' }]}><Text style={styles.tableHeaderCell}>Rate / Unit</Text></View>
    <View style={[styles.tableCol, { width: '15%', textAlign: 'right' }]}><Text style={styles.tableHeaderCell}>Amount (₹)</Text></View>
  </View>
);

const ItemTableRow = ({ item, formatAmount, markupMultiplier }) => {
  const effectiveRate = getEffectiveRate(item.rate, markupMultiplier);
  const itemAmount = getItemLineAmount(item, markupMultiplier);
  const hasImage = item.imageBlob && !String(item.imageBlob).startsWith('data:application/pdf');

  return (
    <View style={styles.tableRow} wrap={false}>
      <View style={[styles.tableCol, { width: '25%' }]}>
        <Text style={styles.itemCode}>{item.code}</Text>
        {hasImage && <Image src={item.imageBlob} style={styles.itemDrawing} />}
      </View>
      <View style={[styles.tableCol, { width: '37%' }]}>
        <Text style={styles.itemSystem}>{item.system}</Text>
        <Text style={[styles.tableCell, { color: TEXT_SOFT, marginBottom: 6 }]}>{item.type}</Text>
        {item.dimension && <View style={styles.specRow}><Text style={styles.specLabel}>Dim</Text><Text style={styles.specValue}>{item.dimension}</Text></View>}
        {item.area && <View style={styles.specRow}><Text style={styles.specLabel}>Area</Text><Text style={styles.specValue}>{item.area} sq.ft</Text></View>}
        {item.location && <View style={styles.specRow}><Text style={styles.specLabel}>Location</Text><Text style={styles.specValue}>{item.location}</Text></View>}
        {item.glazing && <View style={styles.specRow}><Text style={styles.specLabel}>Glazing</Text><Text style={styles.specValue}>{item.glazing}</Text></View>}
        {item.profile && <View style={styles.specRow}><Text style={styles.specLabel}>Profile</Text><Text style={styles.specValue}>{item.profile}</Text></View>}
        {item.hardware && <View style={styles.specRow}><Text style={styles.specLabel}>Hardware</Text><Text style={styles.specValue}>{item.hardware}</Text></View>}
        {item.track && <View style={styles.specRow}><Text style={styles.specLabel}>Track</Text><Text style={styles.specValue}>{item.track}</Text></View>}
      </View>
      <View style={[styles.tableCol, { width: '8%', justifyContent: 'center' }]}>
        <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item.qty}</Text>
      </View>
      <View style={[styles.tableCol, { width: '15%', justifyContent: 'center' }]}>
        <Text style={{ fontSize: 6, color: TEXT_SOFT, textAlign: 'right', marginBottom: 2 }}>₹ PER SQ.FT</Text>
        <Text style={[styles.tableCell, { textAlign: 'right', fontFamily: 'Helvetica-Bold', fontSize: 10, color: NAVY }]}>{formatAmount(effectiveRate)}</Text>
      </View>
      <View style={[styles.tableCol, { width: '15%', justifyContent: 'center' }]}>
        <Text style={[styles.tableCell, { textAlign: 'right', fontFamily: 'Times-Roman', fontSize: 11, color: NAVY }]}>{formatAmount(itemAmount)}</Text>
      </View>
    </View>
  );
};

const PricingTotalsSection = ({
  formatAmount,
  subtotal,
  discountType,
  discountAmount,
  totals,
  finalSubtotal,
  applyGst,
  gstType,
  cgst,
  sgst,
  igst,
  grandTotal,
  qrCodeUrl,
}) => (
  <View style={styles.totalsSection} wrap={false}>
    <View style={styles.bankBox}>
      <Text style={styles.bankHeader}>Bank Details</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>Account Name</Text>
                  <Text style={styles.bankValue}>{company.bank.accountName}</Text>
                </View>
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>Account No.</Text>
                  <Text style={styles.bankValue}>{company.bank.accountNo}</Text>
                </View>
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>Bank</Text>
                  <Text style={styles.bankValue}>{company.bank.bankName}</Text>
                </View>
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>IFSC Code</Text>
                  <Text style={styles.bankValue}>{company.bank.ifsc}</Text>
                </View>
                <Text style={{ marginTop: 10, fontSize: 8 }}>
                  <Text style={{ color: BLUE, fontFamily: 'Helvetica-Bold' }}>GSTIN  </Text>
                  <Text style={{ fontFamily: 'Helvetica-Bold' }}>{company.gstin}</Text>
                </Text>
        </View>
        {qrCodeUrl && (
          <View style={{ marginLeft: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Image src={qrCodeUrl} style={{ width: 55, height: 55 }} />
            <Text style={{ fontSize: 5, color: TEXT_SOFT, marginTop: 4 }}>SCAN TO PAY</Text>
          </View>
        )}
      </View>
    </View>

    <View style={styles.totalsBox}>
      <View style={styles.totalRow}>
        <Text style={styles.tableCell}>Basic Value</Text>
        <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold' }]}>{formatAmount(subtotal)}</Text>
      </View>
      {discountAmount > 0 && (
        <View style={styles.totalRow}>
          <Text style={styles.tableCell}>Discount {discountType === '%' ? `(@ ${totals.discount}%)` : ''}</Text>
          <Text style={[styles.tableCell, { color: '#ef4444', fontFamily: 'Helvetica-Bold' }]}>- {formatAmount(discountAmount)}</Text>
        </View>
      )}
      <View style={styles.totalRow}>
        <Text style={styles.tableCell}>Logistics</Text>
        <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold' }]}>{formatAmount(totals.logistics)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.tableCell}>Installation</Text>
        <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold' }]}>{formatAmount(totals.installation)}</Text>
      </View>
      <View style={[styles.totalRow, { borderTop: `2px solid ${RULE}`, marginTop: 2, paddingTop: 6 }]}>
        <Text style={styles.tableCell}>{applyGst ? 'Subtotal (excl. GST)' : 'Total (GST not applied)'}</Text>
        <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold', color: NAVY }]}>{formatAmount(finalSubtotal)}</Text>
      </View>
      {applyGst && gstType === 'cgst_sgst' && (
        <>
          <View style={styles.totalRow}>
            <Text style={styles.tableCell}>CGST @ 9%</Text>
            <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold' }]}>{formatAmount(cgst)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.tableCell}>SGST @ 9%</Text>
            <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold' }]}>{formatAmount(sgst)}</Text>
          </View>
        </>
      )}
      {applyGst && gstType === 'igst' && (
        <View style={styles.totalRow}>
          <Text style={styles.tableCell}>IGST @ 18%</Text>
          <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold' }]}>{formatAmount(igst)}</Text>
        </View>
      )}
      <View style={styles.grandTotalRow}>
        <Text style={styles.grandTotalText}>Grand Total</Text>
        <Text style={styles.grandTotalValue}>₹ {formatAmount(grandTotal)}</Text>
      </View>
    </View>
  </View>
);

const QuotationPDFDocument = ({ meta, client, project, items, totals, logoUrl, qrCodeUrl }) => {
  const {
    subtotal,
    markupMultiplier,
    discountType,
    discountAmount,
    finalSubtotal,
    applyGst,
    gstType,
    cgst,
    sgst,
    igst,
    grandTotal,
  } = calculateTotals(items, totals);

  const formatAmount = (amount) => formatInr(amount, { currency: false });
  const itemPages = chunkItemsForPdf(items);

  return (
    <Document>
      {/* ════ PAGE 1: COVER LETTER ════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {logoUrl && <Image src={logoUrl} style={styles.logo} />}
            <Text style={styles.tagline}>{company.tagline}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>{company.legalName}</Text>
            <Text>{company.address.line1}</Text>
            <Text>{company.address.line2}</Text>
            <Text>{company.phone}  ·  {company.email}</Text>
            <Text style={{ color: BLUE, fontSize: 6, marginTop: 4 }}>GSTIN: {company.gstin}</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Quota<Text style={styles.titleAccent}>tion</Text></Text>
          <View style={styles.metaBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 2 }}>{meta.quoteNo || 'WIN-QT-YYYY-XXX'}</Text>
            <Text>Date: {meta.date}</Text>
            <Text>Valid Until: {meta.validUntil}</Text>
            <Text>Prepared by: {meta.preparedBy}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.cardLabel}>Prepared For</Text>
            <Text style={styles.cardName}>{client.name}</Text>
            <Text style={{lineHeight: 1.5}}>{client.address}</Text>
            <Text style={{lineHeight: 1.5}}>{client.city}</Text>
            <Text style={{lineHeight: 1.5}}>{client.contact || client.phone}</Text>
          </View>
          <View style={[styles.infoCard, styles.infoCardBlue]}>
            <Text style={styles.cardLabel}>Project / Site</Text>
            <Text style={styles.cardName}>{project.name}</Text>
            <Text style={{lineHeight: 1.5}}>{project.address}</Text>
            <Text style={{lineHeight: 1.5, marginTop: 4}}>Architect / ID: {project.architect}</Text>
            <Text style={{lineHeight: 1.5}}>Reference No: {project.refNo}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNum}>1</Text>
          <Text style={styles.sectionTitle}>A Note from Windal</Text>
          <View style={styles.sectionLine}></View>
        </View>

        <View style={styles.introText}>
          <Text style={{ marginBottom: 10 }}>{company.introLetter.greeting(client.name)}</Text>
          {company.introLetter.paragraphs.map((para, i) => (
            <Text key={i} style={{ marginBottom: 10 }}>{para}</Text>
          ))}
          <Text style={{ fontStyle: 'italic', color: TEXT_SOFT, marginBottom: 15 }}>
            {company.introLetter.closingLine}
          </Text>
          <Text>Warm regards,</Text>
          <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY, marginTop: 2 }}>{company.signatory.name}</Text>
          <Text style={{ fontSize: 7, color: TEXT_SOFT }}>{company.signatory.title}</Text>
        </View>

        <View style={styles.awardsStrip}>
          <Text style={styles.awardsLabel}>Recognition</Text>
          <View style={styles.awardsRow}>
            <View style={styles.awardCard}>
              <Image src={award5} style={styles.awardImg} />
              <Text style={styles.awardName}>Certified AluK</Text>
              <Text style={styles.awardSub}>Fabricator Partner</Text>
            </View>
            <View style={styles.awardCard}>
              <Image src={award1} style={styles.awardImg} />
              <Text style={styles.awardName}>Best Design</Text>
              <Text style={styles.awardSub}>IIID 2023</Text>
            </View>
            <View style={styles.awardCard}>
              <Image src={award2} style={styles.awardImg} />
              <Text style={styles.awardName}>Excellence</Text>
              <Text style={styles.awardSub}>IDEA 2024</Text>
            </View>
            <View style={styles.awardCard}>
              <Image src={award3} style={styles.awardImg} />
              <Text style={styles.awardName}>Exhibitor</Text>
              <Text style={styles.awardSub}>IDEA 2025</Text>
            </View>
            <View style={styles.awardCard}>
              <Image src={award4} style={styles.awardImg} />
              <Text style={styles.awardName}>Exhibitor</Text>
              <Text style={styles.awardSub}>IDEA 2023</Text>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>

      {/* ════ PRICING: ITEM PAGES (paginated) ════ */}
      {itemPages.map((pageItems, pageIndex) => (
        <Page key={`items-${pageIndex}`} size="A4" style={styles.page}>
          <PricingPageHeader
            meta={meta}
            client={client}
            project={project}
            logoUrl={logoUrl}
            continuation={pageIndex > 0}
          />
          <View style={styles.table}>
            <ItemsTableHeader />
            {pageItems.map((item) => (
              <ItemTableRow
                key={item.id}
                item={item}
                formatAmount={formatAmount}
                markupMultiplier={markupMultiplier}
              />
            ))}
          </View>
          <PdfFooter />
        </Page>
      ))}

      {/* ════ PRICING: TOTALS & BANK ════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerCompact} fixed>
          {logoUrl && <Image src={logoUrl} style={styles.logoCompact} />}
          <Text style={{ fontSize: 7, color: NAVY_MID }}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>{meta.quoteNo}</Text>
            {'  ·  '}
            {client.name}
            {'  ·  '}
            Summary
          </Text>
        </View>

        <Text style={{ fontSize: 7, color: TEXT_SOFT, marginTop: 12, marginBottom: 16 }}>
          * {company.pricingFootnote}
        </Text>

        <PricingTotalsSection
          formatAmount={formatAmount}
          subtotal={subtotal}
          discountType={discountType}
          discountAmount={discountAmount}
          totals={totals}
          finalSubtotal={finalSubtotal}
          applyGst={applyGst}
          gstType={gstType}
          cgst={cgst}
          sgst={sgst}
          igst={igst}
          grandTotal={grandTotal}
          qrCodeUrl={qrCodeUrl}
        />

        <PdfFooter />
      </Page>

      {/* ════ TERMS & CONDITIONS ════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerCompact} fixed>
          {logoUrl && <Image src={logoUrl} style={styles.logoCompact} />}
          <Text style={{ fontSize: 7, color: NAVY_MID }}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>{meta.quoteNo}</Text>  ·  Terms & Conditions
          </Text>
        </View>

        <View style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'Times-Roman', fontSize: 20, color: NAVY, textTransform: 'uppercase', letterSpacing: 3 }}>Terms & Conditions</Text>
          <Text style={{ fontSize: 8, color: TEXT_SOFT, marginTop: 6 }}>{company.termsIntro}</Text>
        </View>

        <View style={styles.tcGrid}>
          {company.termsSections.map((section) => (
            <View key={section.num} style={styles.tcCard}>
              <View style={styles.tcHeader}>
                <Text style={styles.tcNum}>{section.num}</Text>
                <Text style={styles.tcTitle}>{section.title}</Text>
              </View>
              {section.bullets.map((bullet, i) => (
                <Text key={i} style={styles.tcText}>• {bullet}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.sigRow} wrap={false}>
          <View style={styles.sigBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>{company.legalName}</Text>
            <View style={styles.sigLine}></View>
            <Text style={{ fontSize: 7, color: TEXT_SOFT }}>Authorised Signatory  ·  Date: ___________</Text>
          </View>
          <View style={[styles.sigBox, { alignItems: 'flex-end' }]}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>Customer Acceptance</Text>
            <View style={[styles.sigLine, { width: '100%' }]}></View>
            <Text style={{ fontSize: 7, color: TEXT_SOFT }}>Signature & Stamp  ·  Date: ___________</Text>
          </View>
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
};

export default QuotationPDFDocument;
