import React from "react";

import styles from "./styles.module.scss";

const LoadingCircle: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingCircle;
