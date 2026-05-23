import React, { useState, useEffect } from 'react';
import { Printer, Download, Upload, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import QRCode from 'qrcode';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Split from 'react-split';

import { useQuoteStore } from './store/quoteStore';
import FormContainer from './components/form/FormContainer';
import QuotationPDFDocument from './components/QuotationPDFDocument';
import ImageCropModal from './components/ImageCropModal';
import './App.css';

import jpgLogo from './assets/brand_assets/LOGO_Blue.jpg';
import pngLogo from './assets/brand_assets/LOGO_Blue.png';
import { buildUpiPaymentUri } from './constants/upi';

function App() {
  const meta = useQuoteStore(state => state.meta);
  const client = useQuoteStore(state => state.client);
  const project = useQuoteStore(state => state.project);
  const items = useQuoteStore(state => state.items);
  const totals = useQuoteStore(state => state.totals);
  
  const setMeta = useQuoteStore(state => state.setMeta);
  const setClient = useQuoteStore(state => state.setClient);
  const setProject = useQuoteStore(state => state.setProject);
  const setItems = useQuoteStore(state => state.setItems);
  const setTotals = useQuoteStore(state => state.setTotals);
  const clearAll = useQuoteStore(state => state.clearAll);
  
  const cropModalData = useQuoteStore(state => state.cropModalData);
  const setCropModalData = useQuoteStore(state => state.setCropModalData);
  const updateItem = useQuoteStore(state => state.updateItem);

  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    const upiString = buildUpiPaymentUri();
    QRCode.toDataURL(upiString, { width: 300, margin: 1, color: { dark: '#1e293b', light: '#ffffff' } })
      .then(url => setQrCodeUrl(url))
      .catch(err => console.error(err));
  }, []);

  // DEBOUNCE PDF RENDERING TO FIX TYPING LAG
  const [debouncedData, setDebouncedData] = useState({ meta, client, project, items, totals });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData({ meta, client, project, items, totals });
    }, 800);
    return () => clearTimeout(handler);
  }, [meta, client, project, items, totals]);

  // Dynamically update document title so PDF saves with correct name
  useEffect(() => {
    const safeQuoteNo = meta.quoteNo ? meta.quoteNo.trim() : 'Quotation';
    const safeClient = client.name ? client.name.trim() : 'Client';
    const safeProject = project.name ? project.name.trim() : 'Project';
    document.title = `${safeQuoteNo} - ${safeClient} - ${safeProject}`;
  }, [meta.quoteNo, client.name, project.name]);

  const clearForm = () => {
    if(window.confirm("Are you sure you want to clear all fields?")) {
      clearAll();
    }
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
      } catch {
        alert("Failed to parse the template file.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
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
        alert(`Successfully imported ${importedItems.length} items!`);
      } catch (err) {
        alert("Error parsing spreadsheet. Please make sure it's a valid Excel or CSV file.");
        console.error(err);
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = ''; // reset input
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
        <div className="quote-form-panel no-print" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
          
          {/* HEADER (Sticky) */}
          <div className="form-header" style={{ flexShrink: 0 }}>
            <img src={pngLogo} alt="Windal" style={{ height: '32px', objectFit: 'contain' }} />
            <div className="header-actions">
              <label className="action-btn" title="Import from Excel/CSV">
                <FileSpreadsheet size={16} color="#10b981" /> Excel
                <input type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }} onChange={importExcel} />
              </label>
              <button onClick={exportQuote} className="action-btn" title="Save as Template">
                <Download size={16} /> Save
              </button>
              <label className="action-btn" title="Load Template">
                <Upload size={16} /> Load
                <input type="file" accept=".windal,.json" style={{ display: 'none' }} onChange={importQuote} />
              </label>
              <button onClick={clearForm} className="clear-btn">Clear All</button>
              <PDFDownloadLink 
                document={
                  <QuotationPDFDocument 
                    meta={debouncedData.meta} 
                    client={debouncedData.client} 
                    project={debouncedData.project} 
                    items={debouncedData.items} 
                    totals={debouncedData.totals} 
                    logoUrl={jpgLogo} 
                    qrCodeUrl={qrCodeUrl} 
                  />
                } 
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

          {/* SCROLLABLE FORM BODY */}
          <div className="form-scroll-area" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <FormContainer />
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

      {/* MODALS */}
      {cropModalData && (
        <ImageCropModal
          imageSrc={cropModalData.imageSrc}
          onSave={(croppedImg) => {
            updateItem(cropModalData.index, 'imageBlob', croppedImg);
            setCropModalData(null);
          }}
          onClose={() => setCropModalData(null)}
        />
      )}
    </>
  );
}

export default App;
