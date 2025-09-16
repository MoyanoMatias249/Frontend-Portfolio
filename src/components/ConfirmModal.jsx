// frontend/src/components/ConfirmModal.jsx
import { useState } from 'react';
import '../styles/confirmModal.css';

function ConfirmModal({ mensaje, onConfirm, onCancel }) {
    const [borrando, setBorrando] = useState(false);

    const handleConfirm = async () => {
        setBorrando(true);
        await onConfirm();
        setBorrando(false);
    };
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <p>{borrando ? 'Borrando experiencia...' : mensaje}</p>
        <div className="confirm-buttons">
          <button onClick={handleConfirm} disabled={borrando}>
            {borrando ? 'Procesando...' : 'Sí, borrar'}
            </button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;