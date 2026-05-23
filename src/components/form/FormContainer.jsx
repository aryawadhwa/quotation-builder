import React from 'react';
import DocumentMetaForm from './DocumentMetaForm';
import ClientProjectForm from './ClientProjectForm';
import ItemListForm from './ItemListForm';
import TotalsForm from './TotalsForm';

const FormContainer = () => {
  return (
    <div className="quote-form-panel">
      {/* Hidden Data Lists for Autocomplete */}
      <datalist id="system-options">
        <option value="Aluminium Slim Sliding" />
        <option value="Thermal Break Casement" />
        <option value="Frameless Partition" />
        <option value="Curtain Wall Glazing" />
      </datalist>
      <datalist id="glazing-options">
        <option value="8 mm Clear Toughened Glass" />
        <option value="12 mm Clear Toughened Glass" />
        <option value="6 mm + 12A + 6 mm DGU" />
        <option value="5 mm + 1.52 PVB + 5 mm Laminated" />
      </datalist>
      <datalist id="color-options">
        <option value="AluK · Powder Coat . Graphite Grey" />
        <option value="Jindal · Anodized . Champagne" />
        <option value="Schüco · Powder Coat . Pure White" />
      </datalist>
      <datalist id="hardware-options">
        <option value="dormakaba Single Point Flush Handle (Black)" />
        <option value="Lavaal Multi-Point Lock" />
        <option value="Geze Floor Spring & Patch Fittings" />
      </datalist>
      <datalist id="track-options">
        <option value="Concealed Bottom Track" />
        <option value="Standard 3-Track Frame" />
      </datalist>

      <div className="form-content">
        <DocumentMetaForm />
        <ClientProjectForm />
        <ItemListForm />
        <TotalsForm />
      </div>
    </div>
  );
};

export default FormContainer;
