import React from 'react';
import { useQuoteStore } from '../../store/quoteStore';
import { ChevronDown, ChevronUp, Copy, Trash2 } from 'lucide-react';

const QuoteItemCard = ({ index, item }) => {
  const expandedItems = useQuoteStore(state => state.expandedItems);
  const toggleItemExpanded = useQuoteStore(state => state.toggleItemExpanded);
  const updateItem = useQuoteStore(state => state.updateItem);
  const removeItem = useQuoteStore(state => state.removeItem);
  const setCropModalData = useQuoteStore(state => state.setCropModalData);

  const isExpanded = expandedItems[index];

  const handleDimensionChange = (field, value) => {
    const val = parseFloat(value) || 0;
    const currentW = field === 'width' ? val : (parseFloat(item.width) || 0);
    const currentH = field === 'height' ? val : (parseFloat(item.height) || 0);
    const areaSqFt = ((currentW * currentH) / 92903).toFixed(2);
    
    updateItem(index, field, value);
    updateItem(index, 'area', areaSqFt);
    updateItem(index, 'dimension', `W ${currentW} mm x H ${currentH} mm`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      window.alert(
        'PDF drawings are not supported in exported quotations. Please upload a PNG or JPEG image of the technical drawing.'
      );
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCropModalData({ index, imageSrc: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const duplicateItem = (e) => {
    e.stopPropagation();
    // Use addItem logic to duplicate but override the fields
    const items = useQuoteStore.getState().items;
    const newItem = { ...item, id: Date.now(), imageBlob: null };
    useQuoteStore.setState({ 
      items: [...items, newItem],
      expandedItems: { ...expandedItems, [items.length]: true }
    });
  };

  return (
    <div className={`item-card ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="item-card-header" onClick={() => toggleItemExpanded(index)}>
        <div className="item-title-bar">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <h4 style={{ margin: 0 }}>{item.code || `Item ${index + 1}`} - {item.system || "New Item"}</h4>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={duplicateItem} className="del-btn" style={{ color: '#3b82f6', background: '#eff6ff', padding: '6px', borderRadius: '4px' }} title="Duplicate Item"><Copy size={14}/></button>
          <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} className="del-btn" style={{ padding: '6px', borderRadius: '4px' }} title="Delete Item"><Trash2 size={14}/></button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="item-card-body">
          <div className="grid-2">
            <div className="input-group">
              <label>Item Code (e.g. W-01)</label>
              <input type="text" value={item.code} onChange={e => updateItem(index, 'code', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Location (e.g. Master Bed)</label>
              <input type="text" value={item.location} onChange={e => updateItem(index, 'location', e.target.value)} />
            </div>
          </div>
          
          <div className="input-group">
            <label>System Name (e.g. Aluminium Slim Sliding)</label>
            <input type="text" list="system-options" value={item.system} onChange={e => updateItem(index, 'system', e.target.value)} />
          </div>
          <div className="input-group">
            <label>System Type (e.g. 3 Track · 2 Glass)</label>
            <input type="text" value={item.type} onChange={e => updateItem(index, 'type', e.target.value)} />
          </div>
          
          <div className="grid-2">
            <div className="input-group">
              <label>Width (mm)</label>
              <input type="number" value={item.width || ''} onChange={e => handleDimensionChange('width', e.target.value)} placeholder="e.g. 2400"/>
            </div>
            <div className="input-group">
              <label>Height (mm)</label>
              <input type="number" value={item.height || ''} onChange={e => handleDimensionChange('height', e.target.value)} placeholder="e.g. 1200"/>
            </div>
          </div>

          <div className="grid-2">
            <div className="input-group">
              <label>Total Area (Sq.ft)</label>
              <input type="number" step="0.01" value={item.area} onChange={e => updateItem(index, 'area', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Quantity</label>
              <input type="number" value={item.qty} onChange={e => updateItem(index, 'qty', parseInt(e.target.value)||0)} />
            </div>
          </div>

          <div className="grid-2">
            <div className="input-group">
              <label>Rate per Sq.ft (₹)</label>
              <input type="number" value={item.rate} onChange={e => updateItem(index, 'rate', parseFloat(e.target.value)||0)} />
            </div>
          </div>
          
          <div className="form-divider">Specifications</div>

          <div className="grid-2">
            <div className="input-group">
              <label>Glazing</label>
              <input type="text" list="glazing-options" value={item.glazing} onChange={e => updateItem(index, 'glazing', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Profile Color</label>
              <input type="text" list="color-options" value={item.profile} onChange={e => updateItem(index, 'profile', e.target.value)} />
            </div>
          </div>
          
          <div className="grid-2">
            <div className="input-group">
              <label>Hardware</label>
              <input type="text" list="hardware-options" value={item.hardware} onChange={e => updateItem(index, 'hardware', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Track / Frame Details</label>
              <input type="text" list="track-options" value={item.track} onChange={e => updateItem(index, 'track', e.target.value)} />
            </div>
          </div>
          
          <div className="input-group image-upload">
            <label>Technical Drawing / Image</label>
            <div className="upload-box">
              {!item.imageBlob ? (
                <input type="file" accept=".png,image/png,.jpg,.jpeg,image/jpeg" onChange={handleImageUpload} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
                  <span className="upload-success">✓ Attached</span>
                  <button type="button" onClick={() => updateItem(index, 'imageBlob', null)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}>Remove Drawing</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteItemCard;
