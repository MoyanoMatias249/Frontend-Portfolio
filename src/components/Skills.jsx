// frontend/src/components/Skills.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSkills } from '../services/api';
import '../styles/skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const skillData = skills.find(skill => skill.nombre === selectedSkill);

  return (
    <section id="skills">
      <h3>Mis habilidades</h3>
      {loading ? (
        <p>Cargando habilidades...</p>
      ) : skills.length > 0 ? (
        <>
          <ul>
            {skills.map((skill, index) => (
              <li
                key={index}
                onClick={() => setSelectedSkill(skill.nombre)}
                className={selectedSkill === skill.nombre ? 'selected' : ''}
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
        </>
      ) : (
        <p>Sin habilidades disponibles</p>
      )}
    </section>
  );
}


export default Skills;
