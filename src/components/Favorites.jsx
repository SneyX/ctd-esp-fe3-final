import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from '../assets/css/Favorites.module.css';

const Favorites = () => {
  const { state, dispatch } = useTheme();
  const { apiData } = state;

  // Recupera la lista de dentistas destacados del localStorage
  const favoriteDentists = JSON.parse(localStorage.getItem('favoriteDentists')) || [];

  const removeFavorite = (dentist) => {
    // Elimina el dentista de la lista de favoritos en el localStorage
    const updatedFavorites = favoriteDentists.filter((favorite) => favorite.id !== dentist.id);
    localStorage.setItem('favoriteDentists', JSON.stringify(updatedFavorites));

    // Actualiza el estado para reflejar el cambio en la lista de favoritos
    const updatedApiData = apiData.map((d) =>
      d.id === dentist.id ? { ...d, isFavorite: false } : d
    );
    dispatch({ type: 'SET_API_DATA', payload: updatedApiData });
  };

  return (
    <div>
      <h2>Dentistas Destacados</h2>
      <div className={`${styles.CardContainer} ${state.theme === 'light' ? styles.lighttheme : styles.darktheme}`}>
        {apiData.map((dentist) => {
          // Verifica si el dentista está en la lista de favoritos
          const isFavorite = favoriteDentists.some((favorite) => favorite.id === dentist.id);

          if (isFavorite) {
            return (
              <div key={dentist.id} className={styles.Card}>
                <h3>{dentist.name}</h3>
                <p>{dentist.email}</p>
                <button onClick={() => removeFavorite(dentist)}>Eliminar de Favoritos</button>
              </div>
            );
          }

          return null; // No mostrar dentistas que no son favoritos
        })}
      </div>
    </div>
  );
};

export default Favorites;
