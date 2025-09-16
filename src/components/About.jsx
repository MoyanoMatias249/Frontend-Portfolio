// frontend/src/components/About.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { fetchAbout, updateAbout } from '../services/api';
import '../styles/about.css';

function About() {
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(true);

  const { isAdmin } = useAdmin();
  const [editando, setEditando] = useState(false);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const handleGuardar = async () => {
    const soloTextoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.,\-()¡!¿?]+$/;

    if (!nuevoTexto.trim() || nuevoTexto.trim().length < 5 || !soloTextoRegex.test(nuevoTexto)) {
      setMensaje('Error al intoducir datos');
      setTipoMensaje('error');
      return;
    }

    try {
      await updateAbout(1, nuevoTexto); // Asumiendo que el ID es 1
      setTexto(nuevoTexto);
      setMensaje('Texto actualizado');
      setTipoMensaje('exito');
      setEditando(false);
      setTimeout(() => setMensaje(''), 2000);
    } catch (error) {
      console.error("Error al actualizar About:", error);
      setMensaje('Error al guardar');
      setTipoMensaje('error');
    }
  };

  useEffect(() => {
    async function cargarAbout() {
      try {
        const data = await fetchAbout();
        setTexto(data.texto || '');
      } catch (error) {
        console.error("Error al cargar About:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarAbout();
  }, []);

  return (
    <section id="about">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Sobre mí
      </motion.h2>
      {loading ? (
        <p>Cargando...</p>
        ) : isAdmin ? (
          editando ? (
            <div className='add-about'>
              <label>
                <p>Editar comentario</p>
                <textarea
                  value={nuevoTexto}
                  onChange={(e) => setNuevoTexto(e.target.value)}
                  rows={6}
                  style={{ width: '100%', padding: '1em' }}
                />
              </label>
              <div className="form-buttons">
                <button onClick={handleGuardar}>Guardar</button>
                <button onClick={() => setEditando(false)}>Cancelar</button>
              </div>
              <p className={tipoMensaje === 'error' ? 'feedback-error' : tipoMensaje === 'exito' ? 'feedback-exito' : ''}>
              {mensaje}
              </p>
            </div>
          ) : (
          <div className="about-info">
            <p>{texto}</p>
            <div className="add-button">
              <button onClick={() => {
                  setNuevoTexto(texto);
                  setEditando(true);
                }}>
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>
        )
      ) : (
        <p>{texto || "Sin datos disponibles"}</p>
      )}
    </section>
  );
}

export default About;
