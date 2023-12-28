/* eslint-disable react/prop-types */
import styles from "./Loader.module.css";
function Loader({ margin }) {
  return (
    <span
      style={{ margin: `${margin}px` }}
      className={`${styles.loader}`}
    ></span>
  );
}

export default Loader;
