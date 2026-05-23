import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotals, getEffectiveRate, getMarkupMultiplier } from './calculateTotals.js';

const baseItems = [
  { qty: 2, rate: 1000, area: 10 },
];

const baseTotals = {
  discountType: 'amount',
  discount: 0,
  logistics: 0,
  installation: 0,
  applyGst: true,
  gstType: 'cgst_sgst',
  globalMarkup: 0,
};

describe('getMarkupMultiplier', () => {
  it('applies percent markup', () => {
    assert.equal(getMarkupMultiplier(10), 1.1);
  });
});

describe('calculateTotals', () => {
  it('applies global markup to subtotal', () => {
    const plain = calculateTotals(baseItems, baseTotals);
    const marked = calculateTotals(baseItems, { ...baseTotals, globalMarkup: 10 });
    assert.equal(plain.subtotal, 20000);
    assert.equal(marked.subtotal, 22000);
    assert.equal(getEffectiveRate(1000, marked.markupMultiplier), 1100);
  });

  it('splits CGST and SGST', () => {
    const r = calculateTotals(baseItems, { ...baseTotals, gstType: 'cgst_sgst' });
    assert.equal(r.cgst, r.finalSubtotal * 0.09);
    assert.equal(r.sgst, r.finalSubtotal * 0.09);
    assert.equal(r.gst, r.cgst + r.sgst);
    assert.equal(r.grandTotal, r.finalSubtotal + r.gst);
  });

  it('uses IGST for interstate', () => {
    const r = calculateTotals(baseItems, { ...baseTotals, gstType: 'igst' });
    assert.equal(r.igst, r.finalSubtotal * 0.18);
    assert.equal(r.cgst, 0);
    assert.equal(r.sgst, 0);
    assert.equal(r.grandTotal, r.finalSubtotal + r.igst);
  });

  it('skips GST when disabled', () => {
    const r = calculateTotals(baseItems, { ...baseTotals, applyGst: false });
    assert.equal(r.gst, 0);
    assert.equal(r.grandTotal, r.finalSubtotal);
  });

  it('applies percent discount on marked-up subtotal', () => {
    const r = calculateTotals(baseItems, {
      ...baseTotals,
      globalMarkup: 10,
      discountType: '%',
      discount: 5,
    });
    assert.equal(r.subtotal, 22000);
    assert.equal(r.discountAmount, 1100);
    assert.equal(r.finalSubtotal, 20900);
  });
});
