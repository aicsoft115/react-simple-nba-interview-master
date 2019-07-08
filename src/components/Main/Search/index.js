import React from "react";
import styles from "./styles";

const Search = props => {
  function handleSearch(e) {
    props.setSearch(e.target.value);
  }

  return (
    <div style={{ ...styles.container, ...props.style }}>
      <input
        placeholder="Search..."
        onChange={handleSearch.bind(this)}
        style={styles.input}
      />
    </div>
  );
}

export default Search;
