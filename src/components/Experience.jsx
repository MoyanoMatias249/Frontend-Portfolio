// frontend/src/components/Experience.jsx
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { fetchExperience } from '../services/api';
import '../styles/experience.css';

function Experience() {
   const [experiencias, setExperiencias] = useState([]);

  useEffect(() => {
    async function cargarExperiencia() {
      const data = await fetchExperience();
      setExperiencias(data);
    }
    cargarExperiencia();
  }, []);
  return (
    <section id="experience">
      <Fade direction="up" triggerOnce >
         <h3>Experiencia</h3>
        <ul>
          {experiencias ? experiencias.map((exp) => (
            <li key={exp.id}>
              {exp.anio} - {exp.experiencia}
            </li>
          )) : "Sin datos disponibles"}
        </ul>
      </Fade>
    </section>
  );
}

export default Experience;
  