import { useEffect } from "react";
import styles from "./App.module.scss";
import api from "./services/api";

function App() {
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
      </main>
    </div>
  );
}

export default App;
