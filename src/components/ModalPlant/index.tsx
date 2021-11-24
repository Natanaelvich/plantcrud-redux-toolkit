import React from 'react';
import {MdClose} from 'react-icons/md'
import { Plant } from '../../store/slices/plantsSlice';

import styles from './styles.module.scss'

type Props = {
handleClose : () => void
plant : Plant
}

const ModalPlant : React.FC<Props> = ({handleClose, plant}) => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <button onClick={handleClose}>
                    <MdClose />
                </button>
                <img src={plant.photo} alt="plant=photo" width={100} height={100} />
                <h1>{plant.name}</h1>
                <h1>{plant.about}</h1>
                <h1>{plant.water_tips}</h1>
            </div>
        </div>
    );
};

export default ModalPlant;
