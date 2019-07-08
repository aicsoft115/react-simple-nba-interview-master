import React, { Component } from "react";


import Service from "../../helpers/service";
import Card from "./Card";
import styles from "./styles";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {Link} from "react-router-dom";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const grid = 0;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "transparent" : "transparent",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "transparent" : "transparent",
  padding: grid,
  width: 340
});

class Favor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };

    this.handleFavorites = this.handleFavorites.bind(this);
    this.handleHttpResponse = this.handleHttpResponse.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.service = new Service();
  }

  componentWillMount() {
    this.service.getFavorites({}, this.handleFavorites);
  }

  handleFavorites = data => {
    const favorites = data.sort((a, b) => a.order >= b.order);
    this.setState({favorites});
  }

  onDragEnd = result => {
    if (!result.destination) return;
    let favorites = reorder(
      this.state.favorites,
      result.source.index,
      result.destination.index
    );

    favorites = favorites.map((favorite, index) => {
      const order = favorite.order;
      favorite.order = index;
      if (favorite.order !== order) {
        this.service.updateFavorite(favorite.id, favorite, this.handleHttpResponse);
      }
      return favorite;
    });

    this.setState({favorites});
  }

  handleHttpResponse = data => {
    console.log(data);
  }

  render() {
    const favorites = this.state.favorites;

    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={styles.title}>NBA Favorite Players</div>
        <Link style={styles.back} to="/">Main List</Link>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {favorites.map((favorite, index) => (
                  <Draggable key={favorite.id} draggableId={favorite.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Card player={favorite.player} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Favor;
