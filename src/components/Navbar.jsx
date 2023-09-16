import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import styles from '../assets/css/Navbar.module.css';

function Navbar() {
  const { state, dispatch } = useTheme();

  const toggleTheme = () => {
    dispatch({ type: state.theme === 'light' ? 'TOGGLE_DARK' : 'TOGGLE_LIGHT' });
  };

  return (
    <nav className={`${styles.navbar} ${state.theme === 'light' ? styles.lighttheme : styles.darktheme}`}>
      <Link to="/" className={styles.navbarbrand}>
        Front End 3
      </Link>
      <ul className={`${styles.navbarbuttons} ${state.theme === 'light' ? styles.lighttheme : styles.darktheme}`}>
        <li>
          <Link to="/" className={styles.navbarbutton}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/favs" className={styles.navbarbutton}>
            Favoritos
          </Link>
        </li>
        <li>
          <Link to="/contact" className={styles.navbarbutton}>
            Contacto
          </Link>
        </li>
      </ul>
      
      <p>Tema actual: {state.theme}</p>
      <button onClick={toggleTheme}>Cambiar Tema</button>
    </nav>
  );
}

export default Navbar;
