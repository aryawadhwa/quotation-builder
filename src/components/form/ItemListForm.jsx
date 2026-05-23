import React from 'react';
import { useQuoteStore } from '../../store/quoteStore';
import { Plus } from 'lucide-react';
import QuoteItemCard from './QuoteItemCard';
import { calculateTotals, formatInr } from '../../utils/calculateTotals';

const ItemListForm = () => {
  const items = useQuoteStore(state => state.items);
  const totals = useQuoteStore(state => state.totals);
  const addItem = useQuoteStore(state => state.addItem);

  const { subtotal } = calculateTotals(items, totals);

  return (
    <div className="form-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0 }}>Quotation Items ({items.length})</h3>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--navy)' }}>
          Subtotal: {formatInr(subtotal)}
        </div>
      </div>
      
      {items.map((item, index) => (
        <QuoteItemCard key={item.id} index={index} item={item} />
      ))}

      <button onClick={addItem} className="add-item-btn">
        <Plus size={16} /> Add New Item
      </button>
    </div>
  );
};

export default ItemListForm;
