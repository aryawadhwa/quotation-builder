import React, { useState, useEffect } from 'react';
import QuotationPreview from './QuotationPreview';
import { Plus, Trash2, Printer, ChevronDown, ChevronUp, Download, Upload, Copy, Save, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import jpgLogo from './assets/brand_assets/LOGO_Blue.jpg';
import pngLogo from './assets/brand_assets/LOGO_Blue.png';
import QRCode from 'qrcode';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Split from 'react-split';
import QuotationPDFDocument from './components/QuotationPDFDocument';
import ImageCropModal from './components/ImageCropModal';
import './App.css';

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage quota exceeded or unavailable.", e);
    }
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const [cropModalData, setCropModalData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    // Generate UPI QR Code
    const upiString = 'upi://pay?pa=09410400008722@barodampay&pn=WADHWA%20ENTERPRISES';
    QRCode.toDataURL(upiString, { width: 300, margin: 1, color: { dark: '#1e293b', light: '#ffffff' } })
      .then(url => setQrCodeUrl(url))
      .catch(err => console.error(err));
  }, []);

  const [meta, setMeta] = useStickyState({
    quoteNo: 'WIN-QT-2026-001',
    date: new Date().toLocaleDateString('en-IN'),
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
    preparedBy: 'Samir Wadhwa'
  }, 'windal_meta');

  const [client, setClient] = useStickyState({
    name: 'Ajay Verma',
    address: 'IIM Road',
    city: 'Lucknow, Uttar Pradesh — 226013',
    contact: '+91 98765 43210  ·  ajay@example.com'
  }, 'windal_client');

  const [project, setProject] = useStickyState({
    name: 'Verma Residence',
    address: 'Plot 42, IIM Road',
    architect: 'Design Studio',
    refNo: 'DS-2026-11'
  }, 'windal_project');

  const [items, setItems] = useStickyState([
    {
      id: Date.now(),
      code: 'W-01',
      system: 'Aluminium Slim Sliding Window',
      type: '3 Track - 2 Glass + 1 SS Mesh · All Sliding',
      dimension: 'W 2743 mm x H 1676 mm',
      width: '2743',
      height: '1676',
      area: '49.48',
      location: 'Master Bedroom',
      glazing: '8 mm Clear Toughened Glass',
      profile: 'AluK · Powder Coat . Graphite Grey',
      hardware: 'dormakaba Single Point Flush Handle (Black)',
      track: '',
      qty: 2,
      rate: 1210,
      imageBlob: null
    }
  ], 'windal_items');

  const [totals, setTotals] = useStickyState({
    discountType: 'amount',
    discount: 0,
    logistics: 10000,
    installation: 12500
  }, 'windal_totals');

  // DEBOUNCE PDF RENDERING TO FIX TYPING LAG
  const [debouncedData, setDebouncedData] = useState({ meta, client, project, items, totals });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData({ meta, client, project, items, totals });
    }, 800);
    return () => clearTimeout(handler);
  }, [meta, client, project, items, totals]);

  const [templates, setTemplates] = useStickyState([], 'windal-templates');

  // Dynamically update document title so PDF saves with correct name
  useEffect(() => {
    const safeQuoteNo = meta.quoteNo ? meta.quoteNo.trim() : 'Quotation';
    const safeClient = client.name ? client.name.trim() : 'Client';
    const safeProject = project.name ? project.name.trim() : 'Project';
    document.title = `${safeQuoteNo} - ${safeClient} - ${safeProject}`;
  }, [meta.quoteNo, client.name, project.name]);

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

  const currentSubtotal = items.reduce((acc, item) => acc + (item.qty * item.rate * parseFloat(item.area || 0)), 0);

  const handleDimensionChange = (index, field, value) => {
    const newItems = [...items];
    const item = newItems[index];
    item[field] = value;
    
    const w = parseFloat(item.width) || 0;
    const h = parseFloat(item.height) || 0;
    
    if (w > 0 || h > 0) {
      item.dimension = `W ${w} mm × H ${h} mm`;
      item.area = ((w * h) / 92903.04).toFixed(2);
    } else {
      item.dimension = '';
      item.area = '';
    }
    
    setItems(newItems);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type === 'application/pdf') {
          handleItemChange(index, 'imageBlob', reader.result);
        } else {
          setCropModalData({ index, imageSrc: reader.result });
        }
      };
      reader.readAsDataURL(file);
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
      width: '',
      height: '',
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
    if(window.confirm("Delete this line item?")) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      const newExpanded = { ...expandedItems };
      delete newExpanded[index];
      setExpandedItems(newExpanded);
    }
  };

  const duplicateItem = (index) => {
    const itemToCopy = items[index];
    const newItem = { 
      ...itemToCopy, 
      id: Date.now(), 
      code: `${itemToCopy.code || 'Item'} (Copy)` 
    };
    const newItems = [...items];
    newItems.splice(index + 1, 0, newItem);
    setItems(newItems);
    
    setExpandedItems(prev => ({ ...prev, [newItems.length - 1]: true }));
  };

  const clearForm = () => {
    if(window.confirm("Are you sure you want to clear all fields?")) {
      setMeta({ quoteNo: '', date: '', validUntil: '', preparedBy: '' });
      setClient({ name: '', address: '', city: '', phone: '', email: '' });
      setProject({ name: '', address: '', architect: '', refNo: '' });
      setItems([]);
      setTotals({ discount: 0, logistics: 0, installation: 0 });
    }
  };

  const saveTemplate = () => {
    const name = window.prompt("Enter a name for this template (e.g., 'Standard 3BHK'):");
    if (name) {
      const newTemplate = { id: Date.now(), name, items: items.map(item => ({...item, id: Date.now() + Math.random()})) };
      setTemplates([...templates, newTemplate]);
      alert(`Template '${name}' saved!`);
    }
  };

  const loadTemplate = (e) => {
    if (!e.target.value) return;
    const template = templates.find(t => t.id.toString() === e.target.value);
    if (template) {
      if (items.length > 0 && !window.confirm("This will replace your current items. Continue?")) {
        e.target.value = '';
        return;
      }
      setItems(template.items.map(item => ({...item, id: Date.now() + Math.random()})));
      setExpandedItems({ 0: true });
    }
    e.target.value = '';
  };

  const importExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        const importedItems = data.map((row, index) => ({
          id: Date.now() + index,
          code: row['Code'] || row['Item Code'] || `Item ${index + 1}`,
          location: row['Location'] || row['Room'] || '',
          system: row['System'] || row['System Name'] || row['Profile'] || '',
          type: row['Type'] || row['System Type'] || '',
          width: parseFloat(row['Width']) || 0,
          height: parseFloat(row['Height']) || 0,
          area: parseFloat(row['Area']) || 0,
          qty: parseInt(row['Qty'] || row['Quantity']) || 1,
          rate: parseFloat(row['Rate'] || row['Price']) || 0,
          glazing: row['Glazing'] || row['Glass'] || row['Glass Type'] || '',
          profile: row['Profile Color'] || row['Color'] || '',
          hardware: row['Hardware'] || '',
          track: row['Track'] || row['Track Details'] || '',
          imageBlob: null
        }));

        setItems([...items, ...importedItems]);
        setExpandedItems(prev => ({ ...prev, [items.length]: true }));
        alert(`Successfully imported ${importedItems.length} items!`);
      } catch (err) {
        alert("Error parsing spreadsheet. Please make sure it's a valid Excel or CSV file.");
        console.error(err);
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = ''; // reset input
  };

  const exportQuote = () => {
    const data = { meta, client, project, items, totals };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (project.name || client.name || 'Quote').replace(/[^a-zA-Z0-9 -]/g, '');
    a.download = `${safeName}_Template.windal`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importQuote = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.meta) setMeta(data.meta);
        if (data.client) setClient(data.client);
        if (data.project) setProject(data.project);
        if (data.items) setItems(data.items);
        if (data.totals) setTotals(data.totals);
      } catch (err) {
        alert("Failed to parse the template file.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <>
    <Split 
      className="quote-builder-layout"
      sizes={[40, 60]} 
      minSize={400}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
    >
      {/* LEFT SIDE: FORM (Hidden when printing) */}
      <div className="quote-form-panel no-print">
        <datalist id="system-options">
          <option value="Aluminium Slim Sliding Window" />
          <option value="Aluminium Sliding Window" />
          <option value="Aluminium Casement Window" />
          <option value="Aluminium Fixed Window" />
          <option value="Aluminium Sliding Door" />
          <option value="Aluminium Casement Door" />
          <option value="Aluminium Folding Door" />
          <option value="Frameless Glass Door" />
          <option value="Shower Enclosure" />
        </datalist>

        <datalist id="track-options">
          <option value="2.5 Track Bottom" />
          <option value="3 Track Bottom" />
          <option value="3.5 Track Bottom" />
          <option value="Slim Outer Frame" />
          <option value="Concealed Frame" />
        </datalist>

        <datalist id="glazing-options">
          <option value="6mm Clear Toughened" />
          <option value="8mm Clear Toughened" />
          <option value="10mm Clear Toughened" />
          <option value="12mm Clear Toughened" />
          <option value="6mm Tinted Toughened" />
          <option value="8mm Tinted Toughened" />
          <option value="5mm + 1.52 PVB + 5mm Laminated" />
          <option value="DGU (5mm + 12mm Air + 5mm)" />
        </datalist>

        <datalist id="color-options">
          <option value="Matte Black" />
          <option value="Champagne Anodized" />
          <option value="Silver Anodized" />
          <option value="Wood Finish" />
          <option value="White Powder Coated" />
        </datalist>

        <datalist id="hardware-options">
          <option value="Standard Windal" />
          <option value="Premium Cmech" />
          <option value="Premium Giesse" />
        </datalist>

        <div className="form-header">
          <img src={pngLogo} alt="Windal" style={{ height: '32px', objectFit: 'contain' }} />
          <div className="header-actions">
            <button onClick={exportQuote} className="action-btn" title="Save as Template">
              <Download size={16} /> Save
            </button>
            <label className="action-btn" title="Load Template">
              <Upload size={16} /> Load
              <input type="file" accept=".windal,.json" style={{ display: 'none' }} onChange={importQuote} />
            </label>
            <button onClick={clearForm} className="clear-btn">Clear All</button>
            <PDFDownloadLink 
              document={<QuotationPDFDocument meta={debouncedData.meta} client={debouncedData.client} project={debouncedData.project} items={debouncedData.items} totals={debouncedData.totals} logoUrl={jpgLogo} qrCodeUrl={qrCodeUrl} />} 
              fileName={`${meta.quoteNo || 'Quote'}.pdf`}
              className="print-btn"
              style={{ textDecoration: 'none' }}
            >
              {({ loading }) => (
                <><Printer size={16} /> {loading ? 'Loading...' : 'Save PDF'}</>
              )}
            </PDFDownloadLink>
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
            <div className="grid-2">
              <div className="input-group">
                <label>City, State, PIN</label>
                <input type="text" value={client.city} onChange={e => setClient({...client, city: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" value={client.phone || ''} onChange={e => setClient({...client, phone: e.target.value})} placeholder="+91 98765 43210"/>
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" value={client.email || ''} onChange={e => setClient({...client, email: e.target.value})} placeholder="client@email.com"/>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <h3 style={{ borderBottom: 'none', margin: 0, paddingBottom: 0, flexShrink: 0, whiteSpace: 'nowrap' }}>Line Items</h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', flex: '1 1 auto', justifyContent: 'flex-end' }}>
                <select onChange={loadTemplate} style={{ padding: '6px 10px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', flexShrink: 0, minWidth: '130px', color: '#1e293b' }}>
                  <option value="">Load Template...</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <button type="button" onClick={saveTemplate} className="action-btn" style={{ padding: '6px 12px', fontSize: '13px', height: 'auto', background: '#f8fafc', color: '#1e293b', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                  <Save size={14} style={{ marginRight: '6px' }}/> Save as Template
                </button>
                <label className="action-btn" style={{ padding: '6px 12px', fontSize: '13px', height: 'auto', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', cursor: 'pointer', margin: 0, flexShrink: 0 }}>
                  <FileSpreadsheet size={14} style={{ marginRight: '6px' }}/> Import Excel/CSV
                  <input type="file" accept=".xlsx, .xls, .csv" onChange={importExcel} hidden />
                </label>
              </div>
            </div>
            
            {items.map((item, index) => (
              <div key={item.id} className={`item-card ${expandedItems[index] ? 'expanded' : 'collapsed'}`}>
                <div className="item-card-header" onClick={() => toggleItem(index)}>
                  <div className="item-title-bar">
                    {expandedItems[index] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    <h4 style={{ margin: 0 }}>{item.code || `Item ${index + 1}`} - {item.system || "New Item"}</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={(e) => { e.stopPropagation(); duplicateItem(index); }} className="del-btn" style={{ color: '#3b82f6', background: '#eff6ff', padding: '6px', borderRadius: '4px' }} title="Duplicate Item"><Copy size={14}/></button>
                    <button onClick={(e) => { e.stopPropagation(); removeItem(index); }} className="del-btn" style={{ padding: '6px', borderRadius: '4px' }} title="Delete Item"><Trash2 size={14}/></button>
                  </div>
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
                      <input type="text" list="system-options" value={item.system} onChange={e => handleItemChange(index, 'system', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>System Type (e.g. 3 Track · 2 Glass)</label>
                      <input type="text" value={item.type} onChange={e => handleItemChange(index, 'type', e.target.value)} />
                    </div>
                    
                    <div className="grid-2">
                      <div className="input-group">
                        <label>Width (mm)</label>
                        <input type="number" value={item.width || ''} onChange={e => handleDimensionChange(index, 'width', e.target.value)} placeholder="e.g. 2400"/>
                      </div>
                      <div className="input-group">
                        <label>Height (mm)</label>
                        <input type="number" value={item.height || ''} onChange={e => handleDimensionChange(index, 'height', e.target.value)} placeholder="e.g. 1200"/>
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="input-group">
                        <label>Total Area (Sq.ft)</label>
                        <input type="number" step="0.01" value={item.area} onChange={e => handleItemChange(index, 'area', e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label>Quantity</label>
                        <input type="number" value={item.qty} onChange={e => handleItemChange(index, 'qty', parseInt(e.target.value)||0)} />
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="input-group">
                        <label>Rate per Sq.ft (₹)</label>
                        <input type="number" value={item.rate} onChange={e => handleItemChange(index, 'rate', parseFloat(e.target.value)||0)} />
                      </div>
                    </div>
                    
                    <div className="form-divider">Specifications</div>

                    <div className="grid-2">
                      <div className="input-group">
                        <label>Glazing</label>
                        <input type="text" list="glazing-options" value={item.glazing} onChange={e => handleItemChange(index, 'glazing', e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label>Profile Color</label>
                        <input type="text" list="color-options" value={item.profile} onChange={e => handleItemChange(index, 'profile', e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="grid-2">
                      <div className="input-group">
                        <label>Hardware</label>
                        <input type="text" list="hardware-options" value={item.hardware} onChange={e => handleItemChange(index, 'hardware', e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label>Track / Frame Details</label>
                        <input type="text" list="track-options" value={item.track} onChange={e => handleItemChange(index, 'track', e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="input-group image-upload">
                      <label>Technical Drawing / Image</label>
                      <div className="upload-box">
                        {!item.imageBlob ? (
                          <input type="file" accept=".pdf, application/pdf, .png, image/png, .jpg, .jpeg, image/jpeg" onChange={(e) => handleImageUpload(index, e)} />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
                            <span className="upload-success">✓ Attached</span>
                            <button type="button" onClick={() => handleItemChange(index, 'imageBlob', null)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}>Remove Drawing</button>
                          </div>
                        )}
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
            <div className="grid-2">
              <div className="input-group">
                <label>Discount Type</label>
                <select value={totals.discountType || '₹'} onChange={e => setTotals({...totals, discountType: e.target.value})}>
                  <option value="₹">Amount (₹)</option>
                  <option value="%">Percentage (%)</option>
                </select>
              </div>
              <div className="input-group">
                <label>Discount Value</label>
                <input type="number" step="0.1" value={totals.discount} onChange={e => setTotals({...totals, discount: parseFloat(e.target.value)||0})} placeholder="0" />
              </div>
            </div>
            <div className="grid-2" style={{ marginTop: '12px' }}>
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
        <PDFViewer width="100%" height="100%" style={{ border: 'none', backgroundColor: '#525659' }}>
          <QuotationPDFDocument 
            meta={debouncedData.meta} 
            client={debouncedData.client} 
            project={debouncedData.project} 
            items={debouncedData.items} 
            totals={debouncedData.totals}
            logoUrl={jpgLogo}
            qrCodeUrl={qrCodeUrl}
          />
        </PDFViewer>
      </div>
    </Split>

      {cropModalData && (
        <ImageCropModal
          imageSrc={cropModalData.imageSrc}
          onSave={(croppedImg) => {
            handleItemChange(cropModalData.index, 'imageBlob', croppedImg);
            setCropModalData(null);
          }}
          onClose={() => setCropModalData(null)}
        />
      )}
    </>
  );
}

export default App;
