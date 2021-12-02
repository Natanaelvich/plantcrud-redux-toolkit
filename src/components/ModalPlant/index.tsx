import React from "react";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlantAsync,
  Plant,
  selectPlants,
} from "../../store/slices/plantsSlice";
import LoadingCircle from "../LoadingCircle";

import styles from "./styles.module.scss";

type Props = {
  handleClose: () => void;
  plant: Plant;
};

const ModalPlant: React.FC<Props> = ({ handleClose, plant }) => {
  const dispatch = useDispatch();
  const { loadingDelete } = useSelector(selectPlants);

  function handleDeletePlant() {
    dispatch(deletePlantAsync(plant.id, handleClose));
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button onClick={handleClose}>
          <MdClose />
        </button>
        <img src={plant.photo} alt="plant=photo" width={100} height={100} />
        <h1>{plant.name}</h1>

        <h3>Sobre</h3>
        <p>{plant.about}</p>

        <h3>Dicas de água</h3>
        <p>{plant.water_tips}</p>

        <div>
          <button>
            <MdEdit />
          </button>
          <button onClick={handleDeletePlant}>
            {loadingDelete ? <LoadingCircle /> : <MdDelete />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPlant;
