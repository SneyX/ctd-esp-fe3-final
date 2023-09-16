import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from '../assets/css/Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const { state, dispatch } = useTheme()
    const { apiData } = state

    useEffect(() => {
        if (apiData.length > 0) {
          console.log(apiData);
        }
      }, [apiData]);

    // Agregar dentista a favoritos
      const addToFavorites = (dentist) => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: dentist });
    };
    // Eliminar dentista de favoritos
    const removeFromFavorites = (dentist) => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: dentist });
    };

    return (
        <div className={`${styles.Card} ${state.theme === 'light' ? styles.lighttheme : styles.darktheme}`}>
            <h2>Listado de Dentistas</h2>
            <div className={styles.CardContainer}>
                {apiData.map((dentist) => (
                    <div className={styles.Card}>
                    <Link to={`/dentist/${dentist.id}`}>
                      <h3>{dentist.name}</h3>
                      <p>{dentist.username}</p>
                      <img src="././public/images/dentist-user.png" alt="" style={{width: "150px", height: "150px"}}/>
                    </Link>
                    {dentist.isFavorite ? (
                      <button onClick={() => removeFromFavorites(dentist)}>
                        Quitar de Favoritos
                      </button>
                    ) : (
                      <button onClick={() => addToFavorites(dentist)}>
                        Agregar a Favoritos
                      </button>
                    )}
                  </div>
                  
                ))}
            </div>
        </div>
    )
}

export default Home;