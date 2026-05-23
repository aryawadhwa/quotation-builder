import { useState } from 'react';
import QuotationPreview from './QuotationPreview';
import { Plus, Trash2, Printer } from 'lucide-react';
import './App.css';

function App() {
  const [meta, setMeta] = useState({
    quoteNo: 'WIN-QT-2026-001',
    date: '15 March 2026',
    validUntil: '30 March 2026',
    preparedBy: 'Samir Wadhwa'
  });

  const [client, setClient] = useState({
    name: 'Ajay Verma',
    address: 'IIM Road',
    city: 'Lucknow, Uttar Pradesh — 226013',
    contact: '+91 98765 43210  ·  ajay@example.com'
  });

  const [project, setProject] = useState({
    name: 'Verma Residence',
    address: 'Plot 42, IIM Road',
    architect: 'Design Studio',
    refNo: 'DS-2026-11'
  });

  const [items, setItems] = useState([
    {
      id: 1,
      code: 'W-01',
      system: 'Aluminium Slim Sliding Window',
      type: '3 Track · 2 Glass + 1 SS Mesh · All Sliding',
      dimension: 'W 2743 mm × H 1676 mm',
      area: '49.48 Sq.ft.',
      location: 'Master Bedroom',
      glazing: '8 mm Clear Toughened Glass',
      profile: 'AluK · Powder Coat · Graphite Grey',
      hardware: 'dormakaba Single Point Flush Handle (Black)',
      track: '3.5 Bottom Track 120.1 mm × 45 mm',
      qty: 1,
      rate: 2419,
      imageBlob: null
    }
  ]);

  const [totals, setTotals] = useState({
    discount: 0,
    logistics: 10000,
    installation: 12500
  });

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
    setItems([...items, {
      id: Date.now(),
      code: `W-0${items.length + 1}`,
      system: 'New System',
      type: 'Description',
      dimension: 'W 0 mm × H 0 mm',
      area: '0 Sq.ft.',
      location: 'Room',
      glazing: '8 mm Glass',
      profile: 'AluK',
      hardware: 'dormakaba',
      track: 'Standard',
      qty: 1,
      rate: 0,
      imageBlob: null
    }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="quote-builder-layout">
      {/* LEFT SIDE: FORM (Hidden when printing) */}
      <div className="quote-form-panel no-print">
        <div className="form-header">
          <h2>Windal Quote Builder</h2>
          <button onClick={() => window.print()} className="print-btn">
            <Printer size={16} /> Save to PDF
          </button>
        </div>

        <div className="form-scroll-area">
          <section className="form-section">
            <h3>Metadata</h3>
            <input type="text" value={meta.quoteNo} onChange={e => setMeta({...meta, quoteNo: e.target.value})} placeholder="Quote No" />
            <input type="text" value={meta.date} onChange={e => setMeta({...meta, date: e.target.value})} placeholder="Date" />
            <input type="text" value={meta.validUntil} onChange={e => setMeta({...meta, validUntil: e.target.value})} placeholder="Valid Until" />
            <input type="text" value={meta.preparedBy} onChange={e => setMeta({...meta, preparedBy: e.target.value})} placeholder="Prepared By" />
          </section>

          <section className="form-section">
            <h3>Client Details</h3>
            <input type="text" value={client.name} onChange={e => setClient({...client, name: e.target.value})} placeholder="Client Name" />
            <input type="text" value={client.address} onChange={e => setClient({...client, address: e.target.value})} placeholder="Address Line 1" />
            <input type="text" value={client.city} onChange={e => setClient({...client, city: e.target.value})} placeholder="City, State PIN" />
            <input type="text" value={client.contact} onChange={e => setClient({...client, contact: e.target.value})} placeholder="Phone · Email" />
          </section>

          <section className="form-section">
            <h3>Project Details</h3>
            <input type="text" value={project.name} onChange={e => setProject({...project, name: e.target.value})} placeholder="Project Name" />
            <input type="text" value={project.address} onChange={e => setProject({...project, address: e.target.value})} placeholder="Site Address" />
            <input type="text" value={project.architect} onChange={e => setProject({...project, architect: e.target.value})} placeholder="Architect" />
            <input type="text" value={project.refNo} onChange={e => setProject({...project, refNo: e.target.value})} placeholder="Ref No" />
          </section>

          <section className="form-section">
            <h3>Line Items</h3>
            {items.map((item, index) => (
              <div key={item.id} className="item-card">
                <div className="item-card-header">
                  <h4>Item {index + 1} ({item.code})</h4>
                  <button onClick={() => removeItem(index)} className="del-btn"><Trash2 size={14}/></button>
                </div>
                
                <input type="text" value={item.code} onChange={e => handleItemChange(index, 'code', e.target.value)} placeholder="Code (e.g. W-01)" />
                <input type="text" value={item.system} onChange={e => handleItemChange(index, 'system', e.target.value)} placeholder="System Name" />
                <input type="text" value={item.type} onChange={e => handleItemChange(index, 'type', e.target.value)} placeholder="System Type" />
                
                <div className="grid-2">
                  <input type="text" value={item.dimension} onChange={e => handleItemChange(index, 'dimension', e.target.value)} placeholder="Dimension" />
                  <input type="text" value={item.area} onChange={e => handleItemChange(index, 'area', e.target.value)} placeholder="Area (Sq.ft)" />
                  <input type="number" value={item.qty} onChange={e => handleItemChange(index, 'qty', parseInt(e.target.value)||0)} placeholder="Qty" />
                  <input type="number" value={item.rate} onChange={e => handleItemChange(index, 'rate', parseFloat(e.target.value)||0)} placeholder="Rate per Sq.ft" />
                </div>
                
                <input type="text" value={item.location} onChange={e => handleItemChange(index, 'location', e.target.value)} placeholder="Location" />
                <input type="text" value={item.glazing} onChange={e => handleItemChange(index, 'glazing', e.target.value)} placeholder="Glazing" />
                <input type="text" value={item.profile} onChange={e => handleItemChange(index, 'profile', e.target.value)} placeholder="Profile" />
                <input type="text" value={item.hardware} onChange={e => handleItemChange(index, 'hardware', e.target.value)} placeholder="Hardware" />
                <input type="text" value={item.track} onChange={e => handleItemChange(index, 'track', e.target.value)} placeholder="Track Details" />
                
                <div className="image-upload">
                  <label>Technical Drawing / Image:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} />
                </div>
              </div>
            ))}
            <button onClick={addItem} className="add-btn"><Plus size={16}/> Add Item</button>
          </section>

          <section className="form-section">
            <h3>Additional Costs</h3>
            <div className="grid-2">
              <label>Discount</label>
              <input type="number" value={totals.discount} onChange={e => setTotals({...totals, discount: parseFloat(e.target.value)||0})} />
              <label>Logistics</label>
              <input type="number" value={totals.logistics} onChange={e => setTotals({...totals, logistics: parseFloat(e.target.value)||0})} />
              <label>Installation</label>
              <input type="number" value={totals.installation} onChange={e => setTotals({...totals, installation: parseFloat(e.target.value)||0})} />
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
