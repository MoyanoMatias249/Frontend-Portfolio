// frontend/src/components/AdminModal.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { verificarAdmin } from '../services/api';
import '../styles/adminModal.css';

function AdminModal({ onClose }) {
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('');
    const [success, setSuccess] = useState(false);
    const { setIsAdmin } = useAdmin();

    useEffect(() => {
        document.body.classList.add('modal-abierto');
        return () => {
            document.body.classList.remove('modal-abierto');
        };
    }, []);

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await verificarAdmin(password);
    setIsAdmin(true);
    setSuccess(true);
    setFeedback('Modo admin activado');
    setTimeout(() => {
      onClose();
    }, 1250);
  } catch (error) {
    setSuccess(false);
    setFeedback(error.message || 'Error al verificar');
  }
};

  return (
    <motion.div
      className="admin-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="admin-modal"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h4>Acceso Admin</h4>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Ingrese contraseña para tener funciones admin</p>
            <input
              type="password"
              placeholder="Ingresá la contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          
          <div className="admin-buttons">
            <button type="submit">Ingresar</button>
            <button className="close-btn" onClick={onClose}>Cerrar</button>
          </div>
          <p className={`feedback ${success ? 'success' : 'error'}`}>
            {feedback}
          </p>
         
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AdminModal;
