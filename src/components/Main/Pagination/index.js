import React from "react";
import styles from "./styles";

const Pagination = props => {
  function handlePrev() {
    props.setPageNumber(false);
  }

  function handleNext() {
    props.setPageNumber(true);
  }

  return (
    <div style={{ ...styles.container, ...props.style }}>
      <button style={styles.button}
        onClick={handlePrev.bind(this)}>
        Prev
      </button>
      <button style={styles.button}
        onClick={handleNext.bind(this)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
