// frontend/src/components/Projects.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../services/api';
import '../styles/projects.css';

// import CalculadoraImg from '../assets/Calculadora.png';
// import TatetiImg from '../assets/Tateti.png';


// const projectData = [
//   {
//     title: 'Calculadora',
//     description: 'Calculadora funcional con operaciones básicas.',
//     tech: ['HTML', 'CSS', 'JavaScript'],
//     image: CalculadoraImg,
//     repo: 'https://github.com/tuusuario/calculadora'
//   },
//   {
//     title: 'Tateti',
//     description: 'Juego clásico con lógica de turnos y ganador.',
//     tech: ['HTML', 'CSS', 'JavaScript'],
//     image: TatetiImg,
//     repo: 'https://github.com/tuusuario/tateti'
//   },
// ];

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([]);

   useEffect(() => {
    async function cargarProyectos() {
      try {
        const data = await fetchProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      }
    }
    cargarProyectos();
  }, [])

  return (
    <section id="projects">
      <h3>Proyectos</h3>
      <div className="projects-container">
        <AnimatePresence>
        {projects ? projects.slice(0, showAll ? projects.length : 1).map((project, index) => (
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
        )): "Sin datos proyectos disponibles"}
        </AnimatePresence>
      </div>
      <button onClick={() => setShowAll(!showAll)} className="toggle-button">
        {showAll ? 'Ver menos' : 'Ver más'}
      </button>
    </section>
  );
}

export default Projects;
