// frontend/src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.8, 0.25, 1],
        type: "spring",
        stiffness: 60,
        damping: 12
      }}
    >
      <h1>Mi Portfolio</h1>
      
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
         <span className="material-symbols-outlined">menu</span>
      </button>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <span className="material-symbols-outlined">home</span> Inicio
        </Link>
        <Link to="/skills" onClick={() => setMenuOpen(false)}>
          <span className="material-symbols-outlined">code</span> Habilidades
        </Link>
        <Link to="/projects" onClick={() => setMenuOpen(false)}>
          <span className="material-symbols-outlined">folder_code</span>  Proyectos
        </Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          <span className="material-symbols-outlined">mail</span> Contacto
        </Link>
      </nav>
    </motion.header>
  );
}


export default Header;
