import React from "react";
import {baseUrl} from "../../../const";
import styles from "./styles";

const Card = props => {
  function handleEdit() {
    props.editPlayer(props.player.id);
  }

  function handleFavorite() {
    props.favoritePlayer(props.player);
  }

  return (
    <div style={{ ...styles.container, ...props.style }}>
      <div style={styles.name}>{props.player.name}</div>
      <img src={`${baseUrl}/${props.player.image}`} style={styles.playerImage} alt="player_image" />
      <div style={styles.team}>{props.player.teamName}</div>
      <button style={styles.edit}
        onClick={handleEdit.bind(this)}>
        Edit
      </button>
      <button style={styles.favorite}
        onClick={handleFavorite.bind(this)}>
        {
          props.player.favorite ? "Unfavorite" : "Favorite"
        }
      </button>
    </div>
  );
}

export default Card;
