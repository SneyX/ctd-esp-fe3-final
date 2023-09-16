import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from '../assets/css/Home.module.css'

const DentistDetail = () => {
  const { id } = useParams();
  const [dentist, setDentist] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setDentist(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!dentist) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles['centered-container']}>
      <div key={dentist.id} className={styles.Card}>
        <h3>{dentist.name}</h3>
        <p>{dentist.email}</p>
        <p>{dentist.email}</p>
        <p>{dentist.website}</p>
      </div>
    </div>
  );
};

export default DentistDetail;
