import React from 'react';
import { useQuoteStore } from '../../store/quoteStore';

const ClientProjectForm = () => {
  const client = useQuoteStore(state => state.client);
  const project = useQuoteStore(state => state.project);
  const setClient = useQuoteStore(state => state.setClient);
  const setProject = useQuoteStore(state => state.setProject);

  return (
    <>
      <div className="form-section">
        <h3>Client Details</h3>
        <div className="form-grid">
          <div className="form-group span-half">
            <label>Name</label>
            <input type="text" value={client.name} onChange={(e) => setClient({ name: e.target.value })} />
          </div>
          <div className="form-group span-half">
            <label>Contact Info</label>
            <input type="text" value={client.contact} onChange={(e) => setClient({ contact: e.target.value })} />
          </div>
          <div className="form-group span-half">
            <label>Address</label>
            <input type="text" value={client.address} onChange={(e) => setClient({ address: e.target.value })} />
          </div>
          <div className="form-group span-half">
            <label>City & PIN</label>
            <input type="text" value={client.city} onChange={(e) => setClient({ city: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Project Details</h3>
        <div className="form-grid">
          <div className="form-group span-half">
            <label>Project Name</label>
            <input type="text" value={project.name} onChange={(e) => setProject({ name: e.target.value })} />
          </div>
          <div className="form-group span-half">
            <label>Site Address</label>
            <input type="text" value={project.address} onChange={(e) => setProject({ address: e.target.value })} />
          </div>
          <div className="form-group span-half">
            <label>Architect / Designer</label>
            <input type="text" value={project.architect} onChange={(e) => setProject({ architect: e.target.value })} />
          </div>
          <div className="form-group span-half">
            <label>Reference No.</label>
            <input type="text" value={project.refNo} onChange={(e) => setProject({ refNo: e.target.value })} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProjectForm;
