import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./App.module.scss";
import ModalPlant from "./components/ModalPlant";
import {
  getPlantsAsync,
  Plant,
  selectPlants,
} from "./store/slices/plantsSlice";

function App() {
  const plants = useSelector(selectPlants);
  const dispatch = useDispatch();

  const [showModalPlant, setShowModalPlant] = useState(false);
  const [plantSelected, setPlantSelected] = useState<Plant | undefined>();

  useEffect(() => {
    dispatch(getPlantsAsync());
  }, []);

  function handleOpenModalPlant(plant: Plant) {
    setPlantSelected(plant);
    setShowModalPlant(true);
  }

  return (
    <div className="App">
      <main className={styles.contentWrapper}>
        <h1>Controle de Plantas</h1>

        <p>Selecione a planta que deseja atualizar.</p>

        <div className={styles.wrapperList}>
          {plants.map((p) => (
            <button
              className={styles.listPlants}
              onClick={() => handleOpenModalPlant(p)}
            >
              <img src={p.photo} alt="photo-plant" />
              <strong>{p.name}</strong>
              <p>{p.about}</p>
            </button>
          ))}
        </div>
      </main>

      {showModalPlant && !!plantSelected && (
        <ModalPlant
          handleClose={() => setShowModalPlant(false)}
          plant={plantSelected}
        />
      )}
    </div>
  );
}

export default App;
