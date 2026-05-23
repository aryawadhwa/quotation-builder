import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const ImageCropModal = ({ imageSrc, onSave, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onMediaLoaded = useCallback((mediaSize) => {
    setAspect(mediaSize.width / mediaSize.height);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImageBase64 = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(croppedImageBase64);
    } catch (e) {
      console.error(e);
      alert("Error cropping image");
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, color: 'var(--navy)', fontFamily: 'var(--font-serif)' }}>Crop Technical Drawing</h3>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        
        <div style={cropperContainerStyle}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onMediaLoaded={onMediaLoaded}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            style={{ containerStyle: { background: '#f8fafc' } }}
          />
        </div>

        <div style={controlsContainerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <span style={{ fontSize: '12px', color: 'var(--text-soft)', fontWeight: 600 }}>Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          
          <button onClick={handleSave} style={saveBtnStyle}>
            Save Crop
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 9999
};

const modalContentStyle = {
  background: '#fff',
  width: '90%', maxWidth: '600px',
  borderRadius: '8px', padding: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  display: 'flex', flexDirection: 'column',
  maxHeight: '90vh'
};

const cropperContainerStyle = {
  position: 'relative',
  width: '100%',
  height: '400px',
  backgroundColor: '#f1f5f9',
  borderRadius: '6px',
  overflow: 'hidden',
  marginBottom: '20px'
};

const controlsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px'
};

const closeBtnStyle = {
  background: 'transparent', border: 'none',
  fontSize: '20px', cursor: 'pointer',
  color: 'var(--text-soft)'
};

const saveBtnStyle = {
  background: 'var(--gold)',
  color: 'var(--navy)',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '4px',
  fontWeight: '700',
  cursor: 'pointer'
};

export default ImageCropModal;
