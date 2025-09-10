// frontend/src/components/About.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAbout } from '../services/api';
import '../styles/about.css';

function About() {
  const [texto, setTexto] = useState('');

  useEffect(() => {
    async function cargarAbout() {
      const data = await fetchAbout();
      setTexto(data.texto);
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
      <p>{texto ? texto : "Sin datos disponibles"}
      </p>
    </section>
  );
}

export default About;
