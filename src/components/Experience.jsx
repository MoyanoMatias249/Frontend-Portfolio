// frontend/src/components/Experience.jsx
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { fetchExperience } from '../services/api';
import '../styles/experience.css';

function Experience() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="experience">
      <Fade direction="up" triggerOnce>
        <h3>Experiencia</h3>
        {loading ? (
          <p>Cargando experiencia...</p>
        ) : experiencias.length > 0 ? (
          <ul>
            {experiencias.map((exp) => (
              <li key={exp.id}>
                {exp.anio} - {exp.experiencia}
              </li>
            ))}
          </ul>
        ) : (
          <p>Sin datos disponibles</p>
        )}
      </Fade>
    </section>
  );
}

export default Experience;
  