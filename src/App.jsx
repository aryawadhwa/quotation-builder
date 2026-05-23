import React, { useState, useEffect } from 'react';
import QuotationPreview from './QuotationPreview';
import { Plus, Trash2, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import './App.css';

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const [meta, setMeta] = useStickyState({
    quoteNo: 'WIN-QT-2026-001',
    date: '15 March 2026',
    validUntil: '30 March 2026',
    preparedBy: 'Samir Wadhwa'
  }, 'windal-meta');

  const [client, setClient] = useStickyState({
    name: 'Ajay Verma',
    address: 'IIM Road',
    city: 'Lucknow, Uttar Pradesh — 226013',
    contact: '+91 98765 43210  ·  ajay@example.com'
  }, 'windal-client');

  const [project, setProject] = useStickyState({
    name: 'Verma Residence',
    address: 'Plot 42, IIM Road',
    architect: 'Design Studio',
    refNo: 'DS-2026-11'
  }, 'windal-project');

  const [items, setItems] = useStickyState([
    {
      id: 1,
      code: 'W-01',
      system: 'Aluminium Slim Sliding Window',
      type: '3 Track · 2 Glass + 1 SS Mesh · All Sliding',
      dimension: 'W 2743 mm × H 1676 mm',
      area: '49.48',
      location: 'Master Bedroom',
      glazing: '8 mm Clear Toughened Glass',
      profile: 'AluK · Powder Coat · Graphite Grey',
      hardware: 'dormakaba Single Point Flush Handle (Black)',
      track: '3.5 Bottom Track 120.1 mm × 45 mm',
      qty: 1,
      rate: 2419,
      imageBlob: null
    }
  ], 'windal-items');

  const [totals, setTotals] = useStickyState({
    discount: 0,
    logistics: 10000,
    installation: 12500
  }, 'windal-totals');

  // State to manage collapsed items
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const toggleItem = (index) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleItemChange(index, 'imageBlob', url);
    }
  };

  const addItem = () => {
    const newIndex = items.length;
    setItems([...items, {
      id: Date.now(),
      code: `W-0${newIndex + 1}`,
      system: '',
      type: '',
      dimension: '',
      area: '',
      location: '',
      glazing: '',
      profile: '',
      hardware: '',
      track: '',
      qty: 1,
      rate: 0,
      imageBlob: null
    }]);
    setExpandedItems(prev => ({ ...prev, [newIndex]: true }));
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const clearForm = () => {
    if(window.confirm("Are you sure you want to clear all fields?")) {
      setMeta({ quoteNo: '', date: '', validUntil: '', preparedBy: '' });
      setClient({ name: '', address: '', city: '', contact: '' });
      setProject({ name: '', address: '', architect: '', refNo: '' });
      setItems([]);
      setTotals({ discount: 0, logistics: 0, installation: 0 });
    }
  };

  return (
    <div className="quote-builder-layout">
      {/* LEFT SIDE: FORM (Hidden when printing) */}
      <div className="quote-form-panel no-print">
        <div className="form-header">
          <h2>Windal Quote Builder</h2>
          <div className="header-actions">
            <button onClick={clearForm} className="clear-btn">Clear All</button>
            <button onClick={() => window.print()} className="print-btn">
              <Printer size={16} /> Print / PDF
            </button>
          </div>
        </div>

        <div className="form-scroll-area">
          
          <section className="form-card">
            <h3>Document Details</h3>
            <div className="grid-2">
              <div className="input-group">
                <label>Quote No.</label>
                <input type="text" value={meta.quoteNo} onChange={e => setMeta({...meta, quoteNo: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Date</label>
                <input type="text" value={meta.date} onChange={e => setMeta({...meta, date: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Valid Until</label>
                <input type="text" value={meta.validUntil} onChange={e => setMeta({...meta, validUntil: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Prepared By</label>
                <input type="text" value={meta.preparedBy} onChange={e => setMeta({...meta, preparedBy: e.target.value})} />
              </div>
            </div>
          </section>

          <section className="form-card">
            <h3>Client Details</h3>
            <div className="input-group">
              <label>Client Name</label>
              <input type="text" value={client.name} onChange={e => setClient({...client, name: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Address Line 1</label>
              <input type="text" value={client.address} onChange={e => setClient({...client, address: e.target.value})} />
            </div>
            <div className="input-group">
              <label>City, State, PIN</label>
              <input type="text" value={client.city} onChange={e => setClient({...client, city: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Phone / Email</label>
              <input type="text" value={client.contact} onChange={e => setClient({...client, contact: e.target.value})} />
            </div>
          </section>

          <section className="form-card">
            <h3>Project Details</h3>
            <div className="input-group">
              <label>Project Name</label>
              <input type="text" value={project.name} onChange={e => setProject({...project, name: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Site Address</label>
              <input type="text" value={project.address} onChange={e => setProject({...project, address: e.target.value})} />
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Architect / ID</label>
                <input type="text" value={project.architect} onChange={e => setProject({...project, architect: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Reference No.</label>
                <input type="text" value={project.refNo} onChange={e => setProject({...project, refNo: e.target.value})} />
              </div>
            </div>
          </section>

          <section className="form-card items-section">
            <h3 style={{ borderBottom: 'none', marginBottom: 0 }}>Line Items</h3>
            
            {items.map((item, index) => (
              <div key={item.id} className={`item-card ${expandedItems[index] ? 'expanded' : 'collapsed'}`}>
                <div className="item-card-header" onClick={() => toggleItem(index)}>
                  <div className="item-title-bar">
                    {expandedItems[index] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    <h4 style={{ margin: 0 }}>{item.code || `Item ${index + 1}`} - {item.system || "New Item"}</h4>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeItem(index); }} className="del-btn" title="Delete Item"><Trash2 size={14}/></button>
                </div>
                
                {expandedItems[index] && (
                  <div className="item-card-body">
                    <div className="grid-2">
                      <div className="input-group">
                        <label>Item Code (e.g. W-01)</label>
                        <input type="text" value={item.code} onChange={e => handleItemChange(index, 'code', e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label>Location (e.g. Master Bed)</label>
                        <input type="text" value={item.location} onChange={e => handleItemChange(index, 'location', e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="input-group">
                      <label>System Name (e.g. Aluminium Slim Sliding)</label>
                      <input type="text" value={item.system} onChange={e => handleItemChange(index, 'system', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>System Type (e.g. 3 Track · 2 Glass)</label>
                      <input type="text" value={item.type} onChange={e => handleItemChange(index, 'type', e.target.value)} />
                    </div>
                    
                    <div className="grid-2">
                      <div className="input-group">
                        <label>Dimensions (W × H)</label>
                        <input type="text" value={item.dimension} onChange={e => handleItemChange(index, 'dimension', e.target.value)} placeholder="W 1000 mm × H 1000 mm"/>
                      </div>
                      <div className="input-group">
                        <label>Total Area (Sq.ft)</label>
                        <input type="number" step="0.01" value={item.area} onChange={e => handleItemChange(index, 'area', e.target.value)} />
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="input-group">
                        <label>Quantity</label>
                        <input type="number" value={item.qty} onChange={e => handleItemChange(index, 'qty', parseInt(e.target.value)||0)} />
                      </div>
                      <div className="input-group">
                        <label>Rate per Sq.ft (₹)</label>
                        <input type="number" value={item.rate} onChange={e => handleItemChange(index, 'rate', parseFloat(e.target.value)||0)} />
                      </div>
                    </div>
                    
                    <div className="form-divider">Specifications</div>

                    <div className="input-group">
                      <label>Glazing</label>
                      <input type="text" value={item.glazing} onChange={e => handleItemChange(index, 'glazing', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>Profile</label>
                      <input type="text" value={item.profile} onChange={e => handleItemChange(index, 'profile', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>Hardware</label>
                      <input type="text" value={item.hardware} onChange={e => handleItemChange(index, 'hardware', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>Track / Frame Details</label>
                      <input type="text" value={item.track} onChange={e => handleItemChange(index, 'track', e.target.value)} />
                    </div>
                    
                    <div className="input-group image-upload">
                      <label>Technical Drawing / Image</label>
                      <div className="upload-box">
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} />
                        {item.imageBlob && <span className="upload-success">✓ Image attached</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <button onClick={addItem} className="add-btn"><Plus size={16}/> Add New Line Item</button>
          </section>

          <section className="form-card">
            <h3>Pricing & Totals</h3>
            <div className="grid-3">
              <div className="input-group">
                <label>Discount (₹)</label>
                <input type="number" value={totals.discount} onChange={e => setTotals({...totals, discount: parseFloat(e.target.value)||0})} />
              </div>
              <div className="input-group">
                <label>Logistics (₹)</label>
                <input type="number" value={totals.logistics} onChange={e => setTotals({...totals, logistics: parseFloat(e.target.value)||0})} />
              </div>
              <div className="input-group">
                <label>Installation (₹)</label>
                <input type="number" value={totals.installation} onChange={e => setTotals({...totals, installation: parseFloat(e.target.value)||0})} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      <div className="quote-preview-panel">
        <QuotationPreview 
          meta={meta} 
          client={client} 
          project={project} 
          items={items} 
          totals={totals} 
        />
      </div>
    </div>
  );
}

export default App;
