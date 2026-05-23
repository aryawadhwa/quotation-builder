import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

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
    color: NAVY_MID
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
    fontFamily: 'Times-Roman',
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

const QuotationPDFDocument = ({ meta, client, project, items, totals, logoUrl, qrCodeUrl }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate * parseFloat(item.area || 0)), 0);
  const discountAmount = totals.discountType === '%' 
    ? (subtotal * (parseFloat(totals.discount) || 0)) / 100 
    : (parseFloat(totals.discount) || 0);

  const finalSubtotal = subtotal - discountAmount + totals.logistics + totals.installation;
  const gst = finalSubtotal * 0.18;
  const grandTotal = finalSubtotal + gst;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Document>
      {/* ════ PAGE 1: COVER LETTER ════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {logoUrl && <Image src={logoUrl} style={styles.logo} />}
            <Text style={styles.tagline}>Premium Architectural Glass & Aluminium Systems</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Wadhwa Enterprises</Text>
            <Text>11, Gumti Gurudwara Building, GT Road</Text>
            <Text>Kanpur — 208012, Uttar Pradesh</Text>
            <Text>+91 98390 36334  ·  samir.w@windal.in</Text>
            <Text style={{ color: BLUE, fontSize: 6, marginTop: 4 }}>GSTIN: 09AABPW2030P1ZD</Text>
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
          <Text style={{ marginBottom: 10 }}>Dear {client.name},</Text>
          <Text style={{ marginBottom: 10 }}>Thank you for considering Windal Systems for your project. It is a privilege to present this quotation, and we look forward to being a trusted part of your space from start to finish.</Text>
          <Text style={{ marginBottom: 10 }}>Every system we supply is custom-fabricated to your exact openings using <Text style={{fontFamily: 'Helvetica-Bold'}}>AluK aluminium profiles</Text>, a globally certified European brand used in landmark residential and commercial projects across India. Our systems are built and tested for thermal comfort, sound control, wind resistance, and long-term structural strength.</Text>
          <Text style={{ marginBottom: 15 }}>We are confident the solution below will enhance both the beauty and functionality of your space for decades to come. Our team is available at every step — from survey to installation and beyond.</Text>
          
          <Text style={{ fontStyle: 'italic', color: TEXT_SOFT, marginBottom: 15 }}>We value this opportunity and look forward to a long-standing association with you.</Text>
          
          <Text>Warm regards,</Text>
          <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY, marginTop: 2 }}>Samir Wadhwa</Text>
          <Text style={{ fontSize: 7, color: TEXT_SOFT }}>Director, Wadhwa Enterprises</Text>
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

        <View style={styles.footer} fixed>
          <Text>windal.in  ·  samir.w@windal.in  ·  +91 98390 36334</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>

      {/* ════ PAGE 2: ITEMS & PRICING ════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerCompact} fixed>
          {logoUrl && <Image src={logoUrl} style={styles.logoCompact} />}
          <Text style={{ fontSize: 7, color: NAVY_MID }}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>{meta.quoteNo}</Text>  ·  {client.name}  ·  {project.name}
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNum}>2</Text>
          <Text style={styles.sectionTitle}>Scope of Supply & Pricing</Text>
          <View style={styles.sectionLine}></View>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeaderRow]} fixed>
            <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableHeaderCell}>Code & Drawing</Text></View>
            <View style={[styles.tableCol, { width: '37%' }]}><Text style={styles.tableHeaderCell}>System Specification</Text></View>
            <View style={[styles.tableCol, { width: '8%', textAlign: 'center' }]}><Text style={styles.tableHeaderCell}>Qty</Text></View>
            <View style={[styles.tableCol, { width: '15%', textAlign: 'right' }]}><Text style={styles.tableHeaderCell}>Rate / Unit</Text></View>
            <View style={[styles.tableCol, { width: '15%', textAlign: 'right' }]}><Text style={styles.tableHeaderCell}>Amount (₹)</Text></View>
          </View>

          {/* Table Rows */}
          {items.map((item, idx) => {
            const itemAmount = item.qty * item.rate * parseFloat(item.area || 0);
            return (
              <View style={styles.tableRow} key={idx} wrap={false}>
                <View style={[styles.tableCol, { width: '25%' }]}>
                  <Text style={styles.itemCode}>{item.code}</Text>
                  {item.imageBlob && !item.imageBlob.startsWith('data:application/pdf') && (
                    <Image src={item.imageBlob} style={{ width: '100%', marginTop: 5, borderRadius: 2 }} />
                  )}
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
                  <Text style={[styles.tableCell, { textAlign: 'right', fontFamily: 'Helvetica-Bold', fontSize: 10, color: NAVY }]}>{formatCurrency(item.rate)}</Text>
                </View>
                <View style={[styles.tableCol, { width: '15%', justifyContent: 'center' }]}>
                  <Text style={[styles.tableCell, { textAlign: 'right', fontFamily: 'Times-Roman', fontSize: 11, color: NAVY }]}>{formatCurrency(itemAmount)}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={{ fontSize: 7, color: TEXT_SOFT, marginTop: 10 }}>* <Text style={{fontFamily: 'Helvetica-Bold'}}>AluK</Text> — globally certified European aluminium systems brand used across India.</Text>

        <View style={styles.totalsSection} wrap={false}>
          {/* Bank Details */}
          <View style={styles.bankBox}>
            <Text style={styles.bankHeader}>Bank Details</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>Account Name</Text>
                  <Text style={styles.bankValue}>WADHWA ENTERPRISES</Text>
                </View>
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>Account No.</Text>
                  <Text style={styles.bankValue}>09410400008722</Text>
                </View>
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>Bank</Text>
                  <Text style={styles.bankValue}>Bank of Baroda, Sisamau, Kanpur</Text>
                </View>
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>IFSC Code</Text>
                  <Text style={styles.bankValue}>BARB0SISAMA</Text>
                </View>
                <Text style={{ marginTop: 10, fontSize: 8 }}>
                  <Text style={{ color: BLUE, fontFamily: 'Helvetica-Bold' }}>GSTIN  </Text>
                  <Text style={{ fontFamily: 'Helvetica-Bold' }}>09AABPW2030P1ZD</Text>
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

          {/* Totals */}
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>Basic Value</Text>
              <Text style={[styles.tableCell, {fontFamily: 'Helvetica-Bold'}]}>{formatCurrency(subtotal)}</Text>
            </View>
            {discountAmount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.tableCell}>Discount {totals.discountType === '%' ? `(@ ${totals.discount}%)` : ''}</Text>
                <Text style={[styles.tableCell, { color: '#ef4444', fontFamily: 'Helvetica-Bold' }]}>- {formatCurrency(discountAmount)}</Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>Logistics</Text>
              <Text style={[styles.tableCell, {fontFamily: 'Helvetica-Bold'}]}>{formatCurrency(totals.logistics)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>Installation</Text>
              <Text style={[styles.tableCell, {fontFamily: 'Helvetica-Bold'}]}>{formatCurrency(totals.installation)}</Text>
            </View>
            <View style={[styles.totalRow, { borderTop: `2px solid ${RULE}`, marginTop: 2, paddingTop: 6 }]}>
              <Text style={styles.tableCell}>Subtotal (excl. GST)</Text>
              <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold', color: NAVY }]}>{formatCurrency(finalSubtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>GST @ 18%</Text>
              <Text style={[styles.tableCell, {fontFamily: 'Helvetica-Bold'}]}>{formatCurrency(gst)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>₹ {formatCurrency(grandTotal)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>windal.in  ·  samir.w@windal.in  ·  +91 98390 36334</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>

      {/* ════ PAGE 3: TERMS & CONDITIONS ════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerCompact} fixed>
          {logoUrl && <Image src={logoUrl} style={styles.logoCompact} />}
          <Text style={{ fontSize: 7, color: NAVY_MID }}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>{meta.quoteNo}</Text>  ·  Terms & Conditions
          </Text>
        </View>

        <View style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'Times-Roman', fontSize: 20, color: NAVY, textTransform: 'uppercase', letterSpacing: 3 }}>Terms & Conditions</Text>
          <Text style={{ fontSize: 8, color: TEXT_SOFT, marginTop: 6 }}>Please read all terms carefully. Signing or emailing approval of this document constitutes full acceptance.</Text>
        </View>

        <View style={styles.tcGrid}>
          <View style={styles.tcCard}>
            <View style={styles.tcHeader}>
              <Text style={styles.tcNum}>01</Text>
              <Text style={styles.tcTitle}>PRODUCT & SPECIFICATIONS</Text>
            </View>
            <Text style={styles.tcText}>• All specifications, colours, and hardware are final upon sign-off. Minor visual variations from showroom samples may occur due to scale.</Text>
            <Text style={styles.tcText}>• Systems are custom-manufactured; no two units are identical.</Text>
            <Text style={styles.tcText}>• Signed document or email approval constitutes a binding contract.</Text>
          </View>
          
          <View style={styles.tcCard}>
            <View style={styles.tcHeader}>
              <Text style={styles.tcNum}>02</Text>
              <Text style={styles.tcTitle}>ORDER CONFIRMATION & PAYMENT</Text>
            </View>
            <Text style={styles.tcText}>• Quotation valid for 15 days from date of issue.</Text>
            <Text style={styles.tcText}>• Orders confirmed only on receipt of advance. No cancellations or refunds post-confirmation.</Text>
            <Text style={styles.tcText}>• Schedule: 50% Advance · 40% Before Dispatch · 10% Post Installation.</Text>
            <Text style={styles.tcText}>• Site must be ready within 3 months of order, else subject to price revision.</Text>
          </View>

          <View style={styles.tcCard}>
            <View style={styles.tcHeader}>
              <Text style={styles.tcNum}>03</Text>
              <Text style={styles.tcTitle}>SITE READINESS (CUSTOMER SCOPE)</Text>
            </View>
            <Text style={styles.tcText}>• Civil structure with plaster / POP complete. Jambs, soffits, and sills must be smooth, level, and finished.</Text>
            <Text style={styles.tcText}>• Scaffolding, electricity, and water to be provided by the customer at site.</Text>
            <Text style={styles.tcText}>• Aperture tapering or unevenness must be corrected prior to installation.</Text>
          </View>

          <View style={styles.tcCard}>
            <View style={styles.tcHeader}>
              <Text style={styles.tcNum}>04</Text>
              <Text style={styles.tcTitle}>SURVEY & TECHNICAL REVIEW</Text>
            </View>
            <Text style={styles.tcText}>• Survey is scheduled only after site readiness confirmation and advance receipt.</Text>
            <Text style={styles.tcText}>• Any post-sign-off specification change (size, colour, glass type) requires a revised quotation and may incur charges.</Text>
          </View>

          <View style={styles.tcCard}>
            <View style={styles.tcHeader}>
              <Text style={styles.tcNum}>05</Text>
              <Text style={styles.tcTitle}>PRODUCTION & DISPATCH</Text>
            </View>
            <Text style={styles.tcText}>• Production commences after survey sign-off. Lead time: 45 to 60 days for standard finishes.</Text>
            <Text style={styles.tcText}>• On delivery, material must be stored upright in a dry, protected area. Customer's responsibility.</Text>
          </View>

          <View style={styles.tcCard}>
            <View style={styles.tcHeader}>
              <Text style={styles.tcNum}>06</Text>
              <Text style={styles.tcTitle}>INSTALLATION & WARRANTY</Text>
            </View>
            <Text style={styles.tcText}>• Installation scheduled once major civil and interior work is complete.</Text>
            <Text style={styles.tcText}>• Protection tape must be removed within 30 days of installation.</Text>
            <Text style={styles.tcText}>• Warranty on hardware and profile integrity is valid only upon quality check, signed handover, and 100% payment clearance.</Text>
          </View>
        </View>

        <View style={styles.sigRow} wrap={false}>
          <View style={styles.sigBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>Wadhwa Enterprises</Text>
            <View style={styles.sigLine}></View>
            <Text style={{ fontSize: 7, color: TEXT_SOFT }}>Authorised Signatory  ·  Date: ___________</Text>
          </View>
          <View style={[styles.sigBox, { alignItems: 'flex-end' }]}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: NAVY }}>Customer Acceptance</Text>
            <View style={[styles.sigLine, { width: '100%' }]}></View>
            <Text style={{ fontSize: 7, color: TEXT_SOFT }}>Signature & Stamp  ·  Date: ___________</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>windal.in  ·  samir.w@windal.in  ·  +91 98390 36334</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export default QuotationPDFDocument;
