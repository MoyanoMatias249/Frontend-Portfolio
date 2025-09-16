// frontend/src/components/Experience.jsx
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { fetchExperience, addExperience, updateExperience, deleteExperience } from '../services/api';
import { useAdmin } from '../context/AdminContext';
import ConfirmModal from './ConfirmModal'
import '../styles/experience.css';

function Experience() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [formData, setFormData] = useState({ anio: '', experiencia: '', id: null });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); 
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    async function cargarExperiencia() {
      try {
        const data = await fetchExperience();
        setExperiencias(data || []);
      } catch (error) {
        console.error("Error al cargar experiencia:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarExperiencia();
  }, []);

  const handleGuardar = async () => {
    const anioRegex = /^\d{4}$/;
    const descripcionRegex = /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[\w\s°.,\-()]/;
    const anioValido = anioRegex.test(formData.anio) && 
                     parseInt(formData.anio) >= 1925 && 
                     parseInt(formData.anio) <= 2025;

     if (!anioValido) {
      setMensaje('Error al introducir año');
      setTipoMensaje('error');
      return;
    }

    if (!formData.experiencia.trim() || !descripcionRegex.test(formData.experiencia)) {
      setMensaje('Error al introducir descipcion');
      setTipoMensaje('error');
      return;
    }

    try {
      if (modoCreacion) {
        await addExperience(formData);
        setMensaje('Experiencia agregada');
      } else if (modoEdicion) {
        await updateExperience(formData.id, formData);
        setMensaje('Experiencia actualizada');
      }
      setTipoMensaje('exito');
      const data = await fetchExperience();
      setExperiencias(data);
      resetFormulario();
    } catch (error) {
      console.error("Error al guardar experiencia:", error);
      setMensaje('Error al guardar');
      setTipoMensaje('error');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deleteExperience(id);
      const data = await fetchExperience();
      setExperiencias(data);
    } catch (error) {
      console.error("Error al eliminar experiencia:", error);
    }
  };

  const resetFormulario = () => {
    setModoEdicion(false);
    setModoCreacion(false);
    setFormData({ anio: '', experiencia: '', id: null });
    setTimeout(() => setMensaje(''), 2000);
  };
  
  const experienciasOrdenadas = [...experiencias].sort((a, b) => {
    const añoA = parseInt(a.anio);
    const añoB = parseInt(b.anio);
    return añoA !== añoB ? añoA - añoB : a.id - b.id;
  });

  return (<>
    <section id="experience">
      <Fade direction="up" triggerOnce>
        <h3>Experiencia</h3>

        {loading ? (
          <p>Cargando experiencia...</p>
        ) : (modoEdicion || modoCreacion) ? (
          <div className='add-experience'>
            <label>
              <p>Ingrese año de la Experiencia</p>
              <input
                type="text"
                maxLength={4}
                placeholder="Año"
                value={formData.anio}
                onChange={(e) => setFormData({ ...formData, anio: e.target.value })}
                required
              />
            </label>
            <label>
              <p>Ingrese descripcion minima a la experiencia</p>
              <input
                type="text"
                maxLength={42}
                placeholder="Descripción"
                value={formData.experiencia}
                onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                required
              />
            </label>
            <div className="form-buttons">
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={resetFormulario}>Cancelar</button>
            </div>
            <p className={tipoMensaje === 'error' ? 'feedback-error' : tipoMensaje === 'exito' ? 'feedback-exito' : ''}>
              {mensaje}
            </p>
          </div>
          
        ) : (
          <div>
            {experienciasOrdenadas.length > 0 ? (
              <ul>
                 {experienciasOrdenadas.map((exp) => (
                  <li key={exp.id}>
                    {exp.anio} - {exp.experiencia}
                    {isAdmin && (
                      <span className="exp-actions">
                        <button onClick={() => {
                          setFormData(exp);
                          setModoEdicion(true);
                        }}>
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="delete" onClick={() => {
                          setIdAEliminar(exp.id);
                          setMostrarConfirmacion(true);
                        }}>
                          <span className="material-symbols-outlined ">delete</span>
                        </button>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin datos disponibles</p>
            )}
            {isAdmin && (
              <div className="add-button">
                <button onClick={() => setModoCreacion(true)}>
                  <span className="material-symbols-outlined">add</span> Agregar experiencia
                </button>
              </div>
            )}
          </div>
        )}
      </Fade>
    </section>
    {mostrarConfirmacion && (
        <ConfirmModal
          mensaje="¿Seguro que deseas borrar esta experiencia?"
          onConfirm={async () => {
            await handleEliminar(idAEliminar);
            setMostrarConfirmacion(false);
            setIdAEliminar(null);
          }}
          onCancel={() => {
            setMostrarConfirmacion(false);
            setIdAEliminar(null);
          }}
        />
      )}
  </>);
}

export default Experience;