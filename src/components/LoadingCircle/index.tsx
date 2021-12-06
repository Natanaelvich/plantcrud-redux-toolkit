import React from "react";

import styles from "./styles.module.scss";

const LoadingCircle: React.FC = () => {
  return (
    <div className={styles.ldsDualRing}>
      <div></div>
    </div>
  );
};

export default LoadingCircle;
