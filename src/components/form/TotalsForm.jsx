import React from 'react';
import { useQuoteStore } from '../../store/quoteStore';
import { calculateTotals, normalizeDiscountType, formatInr } from '../../utils/calculateTotals';

const TotalsForm = () => {
  const totals = useQuoteStore((state) => state.totals);
  const items = useQuoteStore((state) => state.items);
  const setTotals = useQuoteStore((state) => state.setTotals);
  const discountType = normalizeDiscountType(totals.discountType);
  const applyGst = totals.applyGst !== false;
  const markup = totals.globalMarkup ?? 0;

  const summary = calculateTotals(items, totals);

  const setMarkup = (value) => {
    const n = Math.min(100, Math.max(0, parseFloat(value) || 0));
    setTotals({ globalMarkup: n });
  };

  return (
    <div className="form-section">
      <h3>Pricing & Totals</h3>
      <div className="form-grid">
        <div className="form-group span-half">
          <label>Discount Type</label>
          <select value={discountType} onChange={(e) => setTotals({ discountType: e.target.value })}>
            <option value="amount">Amount (₹)</option>
            <option value="%">Percentage (%)</option>
          </select>
        </div>
        <div className="form-group span-half">
          <label>Discount Value</label>
          <input
            type="number"
            step="0.1"
            value={totals.discount}
            onChange={(e) => setTotals({ discount: parseFloat(e.target.value) || 0 })}
            placeholder="0"
          />
        </div>
        <div className="form-group span-half">
          <label>Logistics (₹)</label>
          <input
            type="number"
            value={totals.logistics}
            onChange={(e) => setTotals({ logistics: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="form-group span-half">
          <label>Installation (₹)</label>
          <input
            type="number"
            value={totals.installation}
            onChange={(e) => setTotals({ installation: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      <h3 style={{ marginTop: '20px' }}>Tax & Margins</h3>
      <div className="form-grid">
        <div className="form-group span-half">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={applyGst}
              onChange={(e) => setTotals({ applyGst: e.target.checked })}
            />
            Apply GST (18%)
          </label>
        </div>

        {applyGst && (
          <div className="form-group span-half">
            <label>GST Type</label>
            <select
              value={totals.gstType || 'cgst_sgst'}
              onChange={(e) => setTotals({ gstType: e.target.value })}
            >
              <option value="cgst_sgst">CGST (9%) + SGST (9%)</option>
              <option value="igst">IGST (18%)</option>
            </select>
          </div>
        )}

        <div className="form-group span-full">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            Global Margin Markup (%)
            <span className="markup-value">{markup}%</span>
          </label>
          <div className="markup-controls">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
              aria-label="Global margin markup percentage"
            />
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
              className="markup-number"
              aria-label="Global margin markup percentage"
            />
          </div>
          <p className="form-hint">
            Markup is applied to item rates in the PDF only; stored base rates stay unchanged.
          </p>
        </div>
      </div>

      <div className="totals-summary" aria-live="polite">
        <div className="totals-summary-row">
          <span>Items subtotal (after markup)</span>
          <strong>{formatInr(summary.subtotal)}</strong>
        </div>
        {summary.discountAmount > 0 && (
          <div className="totals-summary-row">
            <span>Discount</span>
            <strong>- {formatInr(summary.discountAmount)}</strong>
          </div>
        )}
        <div className="totals-summary-row">
          <span>Taxable value (excl. GST)</span>
          <strong>{formatInr(summary.finalSubtotal)}</strong>
        </div>
        {summary.applyGst && summary.gstType === 'cgst_sgst' && (
          <>
            <div className="totals-summary-row muted">
              <span>CGST @ 9%</span>
              <span>{formatInr(summary.cgst)}</span>
            </div>
            <div className="totals-summary-row muted">
              <span>SGST @ 9%</span>
              <span>{formatInr(summary.sgst)}</span>
            </div>
          </>
        )}
        {summary.applyGst && summary.gstType === 'igst' && (
          <div className="totals-summary-row muted">
            <span>IGST @ 18%</span>
            <span>{formatInr(summary.igst)}</span>
          </div>
        )}
        <div className="totals-summary-row grand">
          <span>Grand total</span>
          <strong>{formatInr(summary.grandTotal)}</strong>
        </div>
      </div>
    </div>
  );
};

export default TotalsForm;
