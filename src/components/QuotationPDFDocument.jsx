import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts if needed. For now we use built-in Helvetica and Times-Roman for reliability.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#334155',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '2px solid #0f172a',
    paddingBottom: 15,
    marginBottom: 20
  },
  logo: {
    height: 40,
    width: 'auto',
  },
  tagline: {
    fontSize: 7,
    marginTop: 4,
    color: '#d4af37',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  contactInfo: {
    textAlign: 'right',
    fontSize: 8,
    lineHeight: 1.4
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontFamily: 'Times-Roman',
    fontSize: 28,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 4
  },
  titleAccent: {
    color: '#d4af37'
  },
  metaBox: {
    textAlign: 'right',
    fontSize: 8,
    lineHeight: 1.5
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 25
  },
  infoCard: {
    flex: 1,
    padding: 12,
    border: '1px solid #e2e8f0',
    borderTop: '2px solid #0f172a',
    backgroundColor: '#f8fafc'
  },
  infoCardGold: {
    borderTop: '2px solid #d4af37'
  },
  cardLabel: {
    fontSize: 6,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6
  },
  cardName: {
    fontFamily: 'Times-Roman',
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 4
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  sectionNum: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    width: 16,
    height: 16,
    borderRadius: 8,
    fontSize: 7,
    textAlign: 'center',
    paddingTop: 3,
    marginRight: 10
  },
  sectionTitle: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    color: '#0f172a',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
    marginLeft: 10
  },
  introText: {
    lineHeight: 1.6,
    marginBottom: 20
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    fontFamily: 'Helvetica-Bold'
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 6
  },
  tableCell: {
    fontSize: 8,
    lineHeight: 1.4
  },
  itemCode: {
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 4
  },
  itemSystem: {
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: '#0f172a',
    marginBottom: 2
  },
  totalsSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  totalsBox: {
    width: 200
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottom: '1px solid #e2e8f0'
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    marginTop: 4
  },
  grandTotalText: {
    color: '#ffffff',
    fontFamily: 'Times-Roman',
    fontSize: 12
  },
  grandTotalValue: {
    color: '#d4af37',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 10,
    fontSize: 7,
    color: '#94a3b8'
  }
});

const QuotationPDFDocument = ({ meta, client, project, items, totals, logoUrl }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate * parseFloat(item.area || 0)), 0);
  const discountAmount = totals.discountType === '%' 
    ? (subtotal * (parseFloat(totals.discount) || 0)) / 100 
    : (parseFloat(totals.discount) || 0);

  const finalSubtotal = subtotal - discountAmount + totals.logistics + totals.installation;
  const gst = finalSubtotal * 0.18;
  const grandTotal = finalSubtotal + gst;

  const formatCurrency = (amount) => {
    return 'INR ' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Document>
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
            <Text style={{ color: '#d4af37', fontSize: 6, marginTop: 4 }}>GSTIN: 09AABPW2030P1ZD</Text>
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
            <Text>{client.address}</Text>
            <Text>{client.city}</Text>
            <Text>{client.contact || client.phone}</Text>
          </View>
          <View style={[styles.infoCard, styles.infoCardGold]}>
            <Text style={styles.cardLabel}>Project / Site</Text>
            <Text style={styles.cardName}>{project.name}</Text>
            <Text>{project.address}</Text>
            <Text>Architect: {project.architect}</Text>
            <Text>Ref No: {project.refNo}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNum}>1</Text>
          <Text style={styles.sectionTitle}>Scope of Supply & Pricing</Text>
          <View style={styles.sectionLine}></View>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableCell}>Code & Drawing</Text></View>
            <View style={[styles.tableCol, { width: '35%' }]}><Text style={styles.tableCell}>System Specification</Text></View>
            <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.tableCell}>Qty</Text></View>
            <View style={[styles.tableCol, { width: '15%' }]}><Text style={styles.tableCell}>Rate</Text></View>
            <View style={[styles.tableCol, { width: '15%' }]}><Text style={styles.tableCell}>Amount</Text></View>
          </View>

          {/* Table Rows */}
          {items.map((item, idx) => {
            const itemAmount = item.qty * item.rate * parseFloat(item.area || 0);
            return (
              <View style={styles.tableRow} key={idx} wrap={false}>
                <View style={[styles.tableCol, { width: '25%' }]}>
                  <Text style={styles.itemCode}>{item.code}</Text>
                  {item.imageBlob && !item.imageBlob.startsWith('data:application/pdf') && (
                    <Image src={item.imageBlob} style={{ width: '100%', marginTop: 5 }} />
                  )}
                </View>
                <View style={[styles.tableCol, { width: '35%' }]}>
                  <Text style={styles.itemSystem}>{item.system}</Text>
                  <Text style={[styles.tableCell, { color: '#64748b', marginBottom: 4 }]}>{item.type}</Text>
                  {item.dimension && <Text style={styles.tableCell}>Dim: {item.dimension}</Text>}
                  {item.area && <Text style={styles.tableCell}>Area: {item.area} sq.ft</Text>}
                  {item.location && <Text style={styles.tableCell}>Loc: {item.location}</Text>}
                  {item.glazing && <Text style={styles.tableCell}>Glazing: {item.glazing}</Text>}
                </View>
                <View style={[styles.tableCol, { width: '10%' }]}>
                  <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item.qty}</Text>
                </View>
                <View style={[styles.tableCol, { width: '15%' }]}>
                  <Text style={[styles.tableCell, { textAlign: 'right' }]}>{formatCurrency(item.rate)}</Text>
                </View>
                <View style={[styles.tableCol, { width: '15%' }]}>
                  <Text style={[styles.tableCell, { textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>{formatCurrency(itemAmount)}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.totalsSection} wrap={false}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>Basic Value</Text>
              <Text style={styles.tableCell}>{formatCurrency(subtotal)}</Text>
            </View>
            {discountAmount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.tableCell}>Discount</Text>
                <Text style={[styles.tableCell, { color: 'red' }]}>- {formatCurrency(discountAmount)}</Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>Logistics</Text>
              <Text style={styles.tableCell}>{formatCurrency(totals.logistics)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>Installation</Text>
              <Text style={styles.tableCell}>{formatCurrency(totals.installation)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>Subtotal</Text>
              <Text style={[styles.tableCell, { fontFamily: 'Helvetica-Bold' }]}>{formatCurrency(finalSubtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tableCell}>GST @ 18%</Text>
              <Text style={styles.tableCell}>{formatCurrency(gst)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(grandTotal)}</Text>
            </View>
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
