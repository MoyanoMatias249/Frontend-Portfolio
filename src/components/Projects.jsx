// frontend/src/components/Projects.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../services/api';
import '../styles/projects.css';

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="projects">
      <h3>Proyectos</h3>
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : projects.length > 0 ? (
        <>
          <div className="projects-container">
            <AnimatePresence>
              {projects.slice(0, showAll ? projects.length : 1).map((project, index) => (
                <motion.div
                  key={project.title}
                  className="project-card"
                  style={{ backgroundImage: `url(${project.captura})` }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="project-info">
                    <h4>{project.titulo}</h4>
                    <p>{project.descripcion}</p>
                    <ul>
                      {(project.tech || []).map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">Ver repositorio</a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button onClick={() => setShowAll(!showAll)} className="toggle-button">
            {showAll ? 'Ver menos' : 'Ver más'}
          </button>
        </>
      ) : (
        <p>Sin proyectos disponibles</p>
      )}
    </section>
  );
}


export default Projects;
