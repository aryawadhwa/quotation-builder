import React from 'react';
import { useQuoteStore } from '../../store/quoteStore';

const DocumentMetaForm = () => {
  const meta = useQuoteStore(state => state.meta);
  const setMeta = useQuoteStore(state => state.setMeta);

  return (
    <div className="form-section">
      <h3>Document Details</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Quote No.</label>
          <input 
            type="text" 
            value={meta.quoteNo} 
            onChange={(e) => setMeta({ quoteNo: e.target.value })}
            placeholder="e.g. WIN-QT-2026-001"
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input 
            type="text" 
            value={meta.date} 
            onChange={(e) => setMeta({ date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Valid Until</label>
          <input 
            type="text" 
            value={meta.validUntil} 
            onChange={(e) => setMeta({ validUntil: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Prepared By</label>
          <input 
            type="text" 
            value={meta.preparedBy} 
            onChange={(e) => setMeta({ preparedBy: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentMetaForm;
