// frontend/src/components/Header.jsx
import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import AdminModal from './AdminModal';
import '../styles/header.css';

function Header() {
  const { isAdmin, setIsAdmin } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setMenuOpen(false);
    } else {
      setShowModal(true);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (<>
    {showModal && <AdminModal onClose={() => setShowModal(false)} />}
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
      <div className='titulo'>
        <h1>Mi Portfolio</h1>
        <p>{isAdmin ? '(Modo admin)' : ''}</p>
      </div>
      
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
        <a onClick={handleAdminToggle}>
            <span className="material-symbols-outlined">
              {isAdmin ? 'edit_off' : 'ink_pen'}
            </span>
            {menuOpen ? (isAdmin ? 'Salir Admin' : 'Admin') : ''}
          </a>
      </nav>
    </motion.header>
  </>);
}

export default Header;
