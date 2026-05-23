const GST_RATE = 0.18;
const CGST_RATE = 0.09;
const SGST_RATE = 0.09;

/** Canonical discount types: 'amount' (flat ₹) or '%' (percentage). */
export function normalizeDiscountType(type) {
  if (type === '%') return '%';
  return 'amount';
}

export function normalizeGstType(type) {
  return type === 'igst' ? 'igst' : 'cgst_sgst';
}

export function getMarkupMultiplier(globalMarkup) {
  const pct = Math.max(0, parseFloat(globalMarkup) || 0);
  return 1 + pct / 100;
}

/** Client-facing rate after global margin markup (base rate unchanged in store). */
export function getEffectiveRate(rate, markupMultiplier) {
  return (parseFloat(rate) || 0) * markupMultiplier;
}

export function getItemLineAmount(item, markupMultiplier) {
  const qty = parseFloat(item.qty) || 0;
  const area = parseFloat(item.area) || 0;
  const rate = getEffectiveRate(item.rate, markupMultiplier);
  return qty * rate * area;
}

export function calculateTotals(items, totals) {
  const markupMultiplier = getMarkupMultiplier(totals?.globalMarkup);
  const globalMarkup = Math.max(0, parseFloat(totals?.globalMarkup) || 0);

  const subtotal = (items || []).reduce(
    (acc, item) => acc + getItemLineAmount(item, markupMultiplier),
    0
  );

  const discountType = normalizeDiscountType(totals?.discountType);
  const discountRaw = parseFloat(totals?.discount) || 0;
  const discountAmount =
    discountType === '%' ? (subtotal * discountRaw) / 100 : discountRaw;

  const logistics = parseFloat(totals?.logistics) || 0;
  const installation = parseFloat(totals?.installation) || 0;
  const finalSubtotal = subtotal - discountAmount + logistics + installation;

  const applyGst = totals?.applyGst !== false;
  const gstType = normalizeGstType(totals?.gstType);

  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  let gst = 0;

  if (applyGst) {
    if (gstType === 'igst') {
      igst = finalSubtotal * GST_RATE;
      gst = igst;
    } else {
      cgst = finalSubtotal * CGST_RATE;
      sgst = finalSubtotal * SGST_RATE;
      gst = cgst + sgst;
    }
  }

  const grandTotal = finalSubtotal + gst;

  return {
    subtotal,
    markupMultiplier,
    globalMarkup,
    discountType,
    discountAmount,
    logistics,
    installation,
    finalSubtotal,
    applyGst,
    gstType,
    cgst,
    sgst,
    igst,
    gst,
    grandTotal,
  };
}

export function formatInr(amount, { currency = true } = {}) {
  return new Intl.NumberFormat('en-IN', {
    style: currency ? 'currency' : 'decimal',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
