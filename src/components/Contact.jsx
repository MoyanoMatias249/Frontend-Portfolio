// frontend/src/components/Contact.jsx
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { sendMessage } from '../services/api';
import '../styles/contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombreValido = /^[a-zA-Z\s]{3,}$/.test(form.name);
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const mensajeValido = form.message.length >= 10;

    if (!nombreValido || !emailValido || !mensajeValido) {
      setFeedback('Por favor, completá los campos correctamente.');
      return;
    }

    try{
      const response = await sendMessage({
        nombre: form.name,
        email: form.email,
        mensaje: form.message
      });
      setFeedback(response.mensaje || 'Mensaje enviado correctamente.');
      setForm({ name: '', email: '', message: '' });
    } catch (error){
      setFeedback('Hubo un error al enviar el mensaje. Intentá nuevamente.');
    }
  };

  return (
    <section id="contact">
      <Fade direction="up" triggerOnce>
        <h3>Contacto</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Ingrese su nombre</p>             
            <input
              type="text"
              name="name"
              placeholder="nombre y apellido"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <p>Ingrese email</p>     
            <input
              type="email"
              name="email"
              placeholder="ejemplo@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <p>Ingrese mensaje</p>     
            <textarea
              name="message"
              placeholder="Su mensaje..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Enviar</button>
          {feedback && <p className="feedback-message">{feedback}</p>}
        </form>
      </Fade>
    </section>
  );
}

export default Contact;
