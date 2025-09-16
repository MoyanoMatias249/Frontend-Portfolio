// frontend/src/components/Skills.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSkills, addSkill, updateSkill, deleteSkill } from '../services/api';
import { useAdmin } from '../context/AdminContext';
import ConfirmModal from './ConfirmModal';
import '../styles/skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modoCreacion, setModoCreacion] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idAEditar, setIdAEditar] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', nivel: '', icono: '' });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    async function cargarSkills() {
      try {
        const data = await fetchSkills();
        setSkills(data || []);
      } catch (error) {
        console.error("Error al cargar skills:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarSkills();
  }, []);

  const handleGuardar = async () => {
    const { nombre, descripcion, nivel, icono } = formData;

    const soloTextoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.,\-()¡!¿?]+$/;
    const urlImagenRegex = /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp|svg)$/i;

    if (!nombre.trim() || !soloTextoRegex.test(nombre)) {
      setMensaje('Error al intoducir nombre');
      setTipoMensaje('error');
      return;
    }

    if (!descripcion.trim() || !soloTextoRegex.test(descripcion) || descripcion.trim().length < 5) {
      setMensaje('Error al intoducir descripción');
      setTipoMensaje('error');
      return;
    }

    if (!nivel.trim() || !soloTextoRegex.test(nivel) || nivel.trim().length > 20) {
      setMensaje('Error al intoducir nivel');
      setTipoMensaje('error');
      return;
    }

    if (!icono.trim() || !urlImagenRegex.test(icono)) {
      setMensaje('Error al intoducir la URL del icono. Debe ser válida y terminar en .png, .jpg, .jpeg, .gif, .webp o .svg');
      setTipoMensaje('error');
      return;
    }

    try {
      if (modoEdicion && idAEditar) {
        await updateSkill(idAEditar, formData);
        setMensaje('Habilidad actualizada');
      } else {
        await addSkill(formData);
        setMensaje('Habilidad agregada');
      }
      setTipoMensaje('exito');
      const data = await fetchSkills();
      setSkills(data);
      resetFormulario();
    } catch (error) {
      console.error("Error al guardar habilidad:", error);
      setMensaje('Error al guardar');
      setTipoMensaje('error');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deleteSkill(id);
      const data = await fetchSkills();
      setSkills(data);
    } catch (error) {
      console.error("Error al eliminar habilidad:", error);
    }
  };

  const resetFormulario = () => {
    setModoCreacion(false);
    setModoEdicion(false);
    setIdAEditar(null);
    setFormData({ nombre: '', descripcion: '', nivel: '', icono: '' });
    setTimeout(() => setMensaje(''), 2000);
  };

  const skillData = skills.find(skill => skill.id === selectedSkill);

  return (
    <>
      <section id="skills">
        <h3>Mis habilidades</h3>
        {loading ? (
          <p>Cargando habilidades...</p>
        ) : modoCreacion ? (
          <div className="add-skill">
            <label>
              <p>Nombre de la habilidad</p>
              <input
                type="text"
                maxLength={11}
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={!formData.nombre.trim() ? 'input-error' : ''}
              />
            </label>
            <label>
              <p>Descripción</p>
              <input
                type="text"
                maxLength={40}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className={!formData.descripcion.trim() ? 'input-error' : ''}
              />
            </label>
            <label>
              <p>Nivel</p>
              <input
                type="text"
                maxLength={14}
                value={formData.nivel}
                onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                className={!formData.nivel.trim() ? 'input-error' : ''}
              />
            </label>
            <label>
              <p>URL del icono</p>
              <input
                type="text"
                value={formData.icono}
                onChange={(e) => setFormData({ ...formData, icono: e.target.value })}
                className={!formData.icono.trim() ? 'input-error' : ''}
              />
            </label>
            <div className="form-buttons">
              <button onClick={handleGuardar}>
                {modoEdicion ? 'Actualizar' : 'Guardar'}
              </button>
              <button onClick={resetFormulario}>Cancelar</button>
            </div>
            <p className={tipoMensaje === 'error' ? 'feedback-error' : tipoMensaje === 'exito' ? 'feedback-exito' : ''}>
              {mensaje}
            </p>
          </div>
        ) : (
          <>
            <ul>
              {skills.map((skill) => (
                <li
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  className={selectedSkill === skill.id ? 'selected' : ''}
                >
                  <motion.span whileTap={{ scale: 1.2 }}>{skill.nombre}</motion.span>
                </li>
              ))}
            </ul>
            {skillData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="skill-detail"
              >
                <div className="skill-info">
                  <h4>{skillData.nombre}</h4>
                  <p>{skillData.descripcion}</p>
                  <p>Nivel: {skillData.nivel}</p>
                </div>
                <div className="skill-img">
                  <img src={skillData.icono} alt={`imagen ${skillData.nombre}`} />
                </div>
              </motion.div>
            )}
            {isAdmin && (
              <div className="admin-actions">
                {selectedSkill && (
                  <div className="edit-delete-buttons">
                  
                     <a href="#skills"> <button onClick={() => {
                      const skill = skills.find(s => s.id === selectedSkill);
                      if (skill) {
                        setFormData({
                          nombre: skill.nombre || '',
                          descripcion: skill.descripcion || '',
                          nivel: skill.nivel || '',
                          icono: skill.icono || ''
                        });
                        setModoCreacion(true);
                        setModoEdicion(true);
                        setIdAEditar(skill.id);
                      }
                    }}>
                      <span className="material-symbols-outlined">edit</span>
                    </button> </a>
                    
                    <a href="#skills"><button className="delete" onClick={() => {
                      setIdAEliminar(selectedSkill);
                      setMostrarConfirmacion(true);
                    }}>
                      <span className="material-symbols-outlined">delete</span>
                    </button> </a>
                  </div>
                )}
                <div className="add-button">
                  <a href="#skills"> <button onClick={() => {
                    resetFormulario();
                    setModoCreacion(true);
                  }}>
                    <span className="material-symbols-outlined">add</span> Agregar habilidad
                  </button> </a>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {mostrarConfirmacion && (
        <ConfirmModal
          mensaje="¿Seguro que deseas borrar esta habilidad?"
          onConfirm={async () => {
            await handleEliminar(idAEliminar);
            setMostrarConfirmacion(false);
            setIdAEliminar(null);
            if (selectedSkill === idAEliminar) setSelectedSkill(null);
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

export default Skills;
