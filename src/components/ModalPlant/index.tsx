import React, { useState } from "react";
import {
  MdCancel,
  MdCheck,
  MdCheckCircle,
  MdClose,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlantAsync,
  editPlantAsync,
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
  const { loadingDelete, loadingEdit } = useSelector(selectPlants);

  const [showEditMode, setShowEditMode] = useState(false);
  const [about, setAbout] = useState(plant.about);
  const [waterTips, setWaterTips] = useState(plant.water_tips);

  function handleDeletePlant() {
    dispatch(deletePlantAsync(plant.id, handleClose));
  }

  function handleEditPlant() {
    const plantEdit = { ...plant, about, waterTips };

    dispatch(editPlantAsync(plantEdit, () => setShowEditMode(false)));
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
        {showEditMode ? (
          <textarea
            value={about}
            onChange={(value) => setAbout(value.target.value)}
          />
        ) : (
          <p>{about}</p>
        )}

        <h3>Dicas de água</h3>

        {showEditMode ? (
          <textarea
            value={waterTips}
            onChange={(value) => setWaterTips(value.target.value)}
          />
        ) : (
          <p>{waterTips}</p>
        )}

        <div>
          {showEditMode ? (
            <>
              <button onClick={handleEditPlant}>
                {loadingEdit ? <LoadingCircle /> : <MdCheck />}
              </button>
              <button onClick={() => setShowEditMode(false)}>
                <MdClose />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setShowEditMode(true)}>
                <MdEdit />
              </button>
              <button onClick={handleDeletePlant}>
                {!loadingDelete ? <LoadingCircle /> : <MdDelete />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPlant;
