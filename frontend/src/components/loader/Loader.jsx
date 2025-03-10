import React from "react";
import styles from './Loader.module.css';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <>
    <div className= {styles.loaderOverlay}>
      <div className= {styles.loader}></div>
    </div>
    </>
  );
};

export default Loader;
