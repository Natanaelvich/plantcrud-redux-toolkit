import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./App.module.scss";
import { getPlantsAsync, selectPlants } from "./store/slices/plantsSlice";

function App() {
  const plants = useSelector(selectPlants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlantsAsync());
  }, []);

  console.log(plants);
  return (
    <div className="App">
      <main className={styles.contentWrapper}>
        <h1>Controle de Plantas</h1>

        <p>Selecione a planta que deseja atualizar.</p>

        <div className={styles.wrapperList}>
          {plants.map((p) => (
            <div className={styles.listPlants}>
              <img src={p.photo} alt="photo-plant" />
              <strong>{p.name}</strong>
              <p>{p.about}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
