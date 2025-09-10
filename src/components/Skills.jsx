// frontend/src/components/Skills.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSkills } from '../services/api';
import '../styles/skills.css';

/*
import html from '../assets/html.png';
import css from '../assets/css.png';
import js from '../assets/js.png';
import node from '../assets/node.png';
import react from '../assets/react.png';

css: https://i.ibb.co/fYmLvpZD/css.png
html: https://i.ibb.co/SFPh7J8/html.png
js: https://i.ibb.co/DgQjCZ4q/js.png
node: https://i.ibb.co/Cs8dx7Ph/node.png
react: https://i.ibb.co/ymMgzVQx/react.png

const skillDetails = {
  HTML: { nivel: 'Avanzado', descripcion: 'Estructura semántica y accesible', icono: html },
  CSS: { nivel: 'Avanzado', descripcion: 'Diseño responsivo y animaciones', icono: css },
  JavaScript: { nivel: 'Avanzado', descripcion: 'Manipulación DOM y lógica', icono: js },
  Nodejs: { nivel: 'Intermedio', descripcion: 'APIs y manejo de rutas', icono: node },
  React: { nivel: 'Intermedio', descripcion: 'Componentes, hooks y animaciones', icono: react }
};
*/

function Skills() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    async function cargarSkills() {
      try {
        const data = await fetchSkills();
        setSkills(data || []);
      } catch (error) {
        console.error("Error al cargar skills:", error);
      }
    }
    cargarSkills();
  }, []);

  const skillData = skills.find(skill => skill.nombre === selectedSkill);
  return (
    <section id="skills">
      <h3>Mis habilidades</h3>
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
      {skillData  && (
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

    </section>
  );
}

export default Skills;
