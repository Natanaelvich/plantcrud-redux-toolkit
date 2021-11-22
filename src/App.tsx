import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import styles from "./App.module.scss";
import api from "./services/api";
import { decrement, incrementAsync, selectCount } from "./store/slices/couterSlice";

function App() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()

  useEffect(() => {
    async function getPlants() {
      try {
        const response = await api.get("plants");

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPlants();
  }, []);

  return (
    <div className="App">
      <main className={styles.contentWrapper}>
        <h1>PlantCrud</h1>

        <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(incrementAsync(2))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      </main>
    </div>
  );
}

export default App;
