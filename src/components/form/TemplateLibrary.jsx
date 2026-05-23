import { useState } from 'react';
import { useQuoteStore } from '../../store/quoteStore';
import { FolderOpen, Save, Trash2 } from 'lucide-react';

const TemplateLibrary = () => {
  const savedTemplates = useQuoteStore((s) => s.savedTemplates);
  const saveTemplate = useQuoteStore((s) => s.saveTemplate);
  const loadTemplate = useQuoteStore((s) => s.loadTemplate);
  const deleteTemplate = useQuoteStore((s) => s.deleteTemplate);
  const [name, setName] = useState('');

  const handleSave = () => {
    saveTemplate(name);
    setName('');
  };

  const handleLoad = (id) => {
    if (window.confirm('Load this template? Unsaved changes on the current quote will be replaced.')) {
      loadTemplate(id);
    }
  };

  return (
    <div className="form-section">
      <h3>Template Library</h3>
      <p className="form-hint" style={{ marginTop: 0, marginBottom: 12 }}>
        Save quotes in this browser (without drawings). Use .windal files to share across devices.
      </p>
      <div className="template-save-row">
        <input
          type="text"
          placeholder="Template name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" className="action-btn" onClick={handleSave}>
          <Save size={14} /> Save to library
        </button>
      </div>

      {savedTemplates.length === 0 ? (
        <p className="form-hint">No saved templates yet.</p>
      ) : (
        <ul className="template-list">
          {savedTemplates.map((t) => (
            <li key={t.id} className="template-list-item">
              <div>
                <strong>{t.name}</strong>
                <span className="form-hint" style={{ display: 'block', marginTop: 2 }}>
                  {new Date(t.savedAt).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="template-list-actions">
                <button type="button" className="action-btn" onClick={() => handleLoad(t.id)} title="Load">
                  <FolderOpen size={14} /> Load
                </button>
                <button
                  type="button"
                  className="del-btn"
                  onClick={() => deleteTemplate(t.id)}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TemplateLibrary;
