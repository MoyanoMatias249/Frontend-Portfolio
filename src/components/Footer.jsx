// frontend/src/components/Footer.jsx
import { motion } from 'framer-motion';
import '../styles/footer.css';

function Footer() {
    return (
      <motion.footer
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.8, 0.25, 1],
        type: "spring",
        stiffness: 60,
        damping: 12
      }}
    >
        
        <p>&copy; 2025 - Mi Portfolio</p>
        <a href="https://github.com/tu-usuario" target="_blank">GitHub</a>
      </motion.footer>
    );
  }
  
  export default Footer;
  