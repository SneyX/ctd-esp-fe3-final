import React, { useState } from "react";
import styles from "../assets/css/Contact.module.css";
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  
  const { state, dispatch } = useTheme()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.fullName.length <= 5 || !emailRegex.test(formData.email)) {
      setErrorMessage("Por favor verifique su información nuevamente...");
      setSuccessMessage("")
      return;
    }

    setSuccessMessage(`Gracias ${formData.fullName}, te contactaremos cuando antes vía mail`);
    setErrorMessage("");
  };

  return (
    <div className={`${styles.Contact} ${state.theme === 'light' ? styles.lighttheme : styles.darktheme}`}>
      <h2>Contacto</h2>
      {errorMessage && <div className={styles.Error}>{errorMessage}</div>}
      {successMessage && <div className={styles.Success}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.FormGroup}>
          <label htmlFor="fullName">Nombre Completo:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
