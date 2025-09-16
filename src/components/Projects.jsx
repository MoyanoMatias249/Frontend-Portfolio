// frontend/src/components/Projects.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject
} from '../services/api';
import ConfirmModal from './ConfirmModal';
import { useAdmin } from '../context/AdminContext';
import '../styles/projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const [modoCreacion, setModoCreacion] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    captura: '',
    repo: '',
    tech: []
  });
  const [cantidadTech, setCantidadTech] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [idAEditar, setIdAEditar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    async function cargarProyectos() {
      try {
        const data = await fetchProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarProyectos();
  }, []);

  const handleGuardar = async () => {
     const { titulo, descripcion, captura, repo, tech } = formData;

    const soloTextoRegex = /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[\w\s.,\-()]/;
    const urlImagenRegex = /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp|svg)$/i;
    const githubRegex = /^https:\/\/github\.com\/[\w\-]+\/[\w\-]+$/i;
    const techRegex = /^[A-Za-z0-9]+$/;

    if (!titulo.trim() || !soloTextoRegex.test(titulo)) {
      setMensaje('Error al introducir título');
      setTipoMensaje('error');
      return;
    }

    if (!descripcion.trim() || !soloTextoRegex.test(descripcion)) {
      setMensaje('Error al introducir descripción');
      setTipoMensaje('error');
      return;
    }

    if (!captura.trim() || !urlImagenRegex.test(captura)) {
      setMensaje('Error al introducir la URL de captura. Debe ser válida y terminar en .png, .jpg, .jpeg, .gif, .webp o .svg');
      setTipoMensaje('error');
      return;
    }

    if (!repo.trim() || !githubRegex.test(repo)) {
      setMensaje('Error al introducir la URL del repositorio. Debe ser un enlace válido de GitHub');
      setTipoMensaje('error');
      return;
    }

    if (tech.some(t => !t.trim() || !techRegex.test(t))) {
      setMensaje('Error al introducir las tecnologías');
      setTipoMensaje('error');
      return;
    }

    try {
      if (modoEdicion) {
        await updateProject(idAEditar, formData);
        setMensaje('Proyecto actualizado');
      } else {
        await addProject(formData);
        setMensaje('Proyecto agregado');
      }
      setTipoMensaje('exito');
      const data = await fetchProjects();
      setProjects(data);
      resetFormulario();
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
      setMensaje('Error al guardar');
      setTipoMensaje('error');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deleteProject(id);
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
    }
  };

  const resetFormulario = () => {
    setModoCreacion(false);
    setModoEdicion(false);
    setFormData({
      titulo: '',
      descripcion: '',
      captura: '',
      repo: '',
      tech: []
    });
    setCantidadTech(1);
    setIdAEditar(null);
    setTimeout(() => setMensaje(''), 2000);
  };

  return (
    <>
      <section id="projects">
        <h3>Proyectos</h3>
        {loading ? (
          <p>Cargando proyectos...</p>
        ) : modoCreacion || modoEdicion ? (
          <div className="add-project">
            <label>
              <p>Título</p>
              <input
                type="text"
                maxLength={28}
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className={!formData.titulo.trim() ? 'input-error' : ''}
              />
            </label>
            <label>
              <p>Descripción</p>
              <input
                type="text"
                maxLength={62}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className={!formData.descripcion.trim() ? 'input-error' : ''}
              />
            </label>
            <label>
              <p>URL de captura</p>
              <input
                type="text"
                value={formData.captura}
                onChange={(e) => setFormData({ ...formData, captura: e.target.value })}
                className={!formData.captura.trim() ? 'input-error' : ''}
              />
            </label>
            <label>
              <p>URL del repositorio</p>
              <input
                type="text"
                maxLength={70}
                value={formData.repo}
                onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
                className={!formData.repo.trim() ? 'input-error' : ''}
              />
            </label>
            <label>
              <p>Cantidad de tecnologías principales (max 4)</p>
              <select
                value={cantidadTech}
                onChange={(e) => {
                  const nuevaCantidad = parseInt(e.target.value);
                  setCantidadTech(nuevaCantidad);
                  setFormData({
                    ...formData,
                    tech: Array(nuevaCantidad).fill('')
                  });
                }}
              >
                {[1, 2, 3, 4].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <div className="inputs-tecnologias">
            {formData.tech.map((tecnologia, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={10}
                  placeholder={`Tecnología ${i + 1}`}
                  value={tecnologia}
                  onChange={(e) => {
                    const nuevaLista = [...formData.tech];
                    nuevaLista[i] = e.target.value;
                    setFormData({ ...formData, tech: nuevaLista });
                  }}
                  className={`input-cant ${!tecnologia.trim() ? 'input-error' : ''}`} 
                />
            ))}
            </div>
            <div className="form-buttons">
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={resetFormulario}>Cancelar</button>
            </div>
            <p className={tipoMensaje === 'error' ? 'feedback-error' : tipoMensaje === 'exito' ? 'feedback-exito' : ''}>
              {mensaje}
            </p>
          </div>
        ) : (
          <>
            <div className="projects-container">
              <AnimatePresence>
                {projects.slice(0, showAll ? projects.length : 1).map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="project-card"
                    style={{ backgroundImage: `url(${project.captura})` }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="project-info">
                      <div className="project-desciption">
                        <h4>{project.titulo}</h4>
                        <p>{project.descripcion}</p>
                        <ul>
                          {(project.tech || []).map((tech, i) => (
                            <li key={i}>{tech}</li>
                          ))}
                        </ul>
                        <a href={project.repo} target="_blank" rel="noopener noreferrer">Ver repositorio</a>
                      </div>
                      {isAdmin && (
                        <div className="edit-delete-buttons">
                          <a href="#projects">  <button onClick={() => {
                            setFormData({
                              titulo: project.titulo,
                              descripcion: project.descripcion,
                              captura: project.captura,
                              repo: project.repo,
                              tech: project.tech
                            });
                            setModoCreacion(true);
                            setModoEdicion(true);
                            setIdAEditar(project.id);
                            setCantidadTech(project.tech.length || 1);
                          }}>
                            <span className="material-symbols-outlined">edit</span>
                          </button> </a>
                          <a href="#projects"> <button className="delete" onClick={() => {
                            setIdAEliminar(project.id);
                            setMostrarConfirmacion(true);
                          }}>
                            <span className="material-symbols-outlined">delete</span>
                          </button> </a>
                        </div>
                      )}
                    </div>
                    
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="bottom-actions">
              <a href='#projects'> <button onClick={() => setShowAll(!showAll)} className="toggle-button">
                {showAll ? 'Ver menos' : 'Ver más'}
              </button> </a>
              {isAdmin && (
                <a href='#projects'><button onClick={() => {
                  resetFormulario();
                  setModoCreacion(true);
                }} className="add-button">
                  <span className="material-symbols-outlined">add</span> Agregar proyecto
                </button> </a>
              )}
            </div>
          </>
        )}
      </section>

      {mostrarConfirmacion && (
        <ConfirmModal
          mensaje="¿Seguro que deseas borrar este proyecto?"
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
    </>
  );
}
export default Projects;
