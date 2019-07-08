import React, { Component } from "react";
import {Link} from "react-router-dom";
import {perPage} from "../../const";
import Service from "../../helpers/service";
import Search from "./Search";
import Pagination from "./Pagination";
import Card from "./Card";
import Edit from "./Edit";
import Modal from "react-awesome-modal";
import styles from "./styles";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      teams: [],
      players: [],
      player: {},
      page: 1,
      search: '',
      modalIsOpen: false
    };
    this.setSearch = this.setSearch.bind(this);
    this.setPageNumber = this.setPageNumber.bind(this);
    this.editPlayer = this.editPlayer.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.favoritePlayer = this.favoritePlayer.bind(this);

    this.handleFavorites = this.handleFavorites.bind(this);
    this.handleTeams = this.handleTeams.bind(this);
    this.handlePlayers = this.handlePlayers.bind(this);
    this.handlePlayer = this.handlePlayer.bind(this);

    this.service = new Service();
  }

  componentWillMount() {
    this.service.getTeams({}, this.handleTeams);
    this.service.getFavorites({}, this.handleFavorites);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.state.teams.length !== 0;
  }

  setPageNumber = (isNext) => {
    let page = this.state.page;
    page = isNext ? page + 1 : Math.max(page - 1, 1);
    this.setState({page: page}, function () {
      this.getPlayers();
    });
  }

  setSearch = (search) => {
    this.setState({search: search, page: 1}, function () {
      this.getPlayers();
    });
  }

  editPlayer = (playerId) => {
    const player = this.state.players.find(player => player.id === playerId);
    this.setState({player: player}, function () {
      this.setState({modalIsOpen: true});
    });
  }

  savePlayer = (newPlayer) => {
    this.service.updatePlayer(newPlayer.id, newPlayer, this.handlePlayer);
  }

  favoritePlayer = (player) => {
    let favorites = this.state.favorites;
    const favorite = favorites.find(item => item.player.id === player.id);

    if (favorite) {
      this.service.removeFavorite(favorite.id, this.handleFavorites);
    } else {
      let order = 0;
      favorites.forEach(favorite => order = Math.max(favorite.order+1, order));
      this.service.postFavorite({player: player, order: order}, this.handleFavorites);
    }
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  getPlayers = () => {
    let params = {};
    if (this.state.search.trim().length > 0) {
      params = {q: this.state.search, _page: this.state.page, _limit: perPage};
    } else {
      params = {_page: this.state.page, _limit: perPage};
    }

    this.service.getPlayers(params, this.handlePlayers);
  }

  handleTeams = data => {
    this.setState({teams: data}, function () {
      if (this.state.players.length === 0) this.getPlayers();
    });
  }

  handleFavorites = (data, id) => {
    let favorites = this.state.favorites;

    if (id === 0) {
      if (data instanceof Array) {
        favorites = favorites.concat(data);
      } else {
        favorites.push(data);
      }
    } else {
      const obj = favorites.find(item => item.id === id);
      const index = favorites.indexOf(obj);
      if (index > -1) favorites.splice(index, 1);
    }
    this.setState({favorites: favorites}, function () {
      this.configPlayers(this.state.players);
    });
  }

  handlePlayers = data => {
    this.configPlayers(data);
  }

  handlePlayer = newPlayer => {
    const teams = this.state.teams;
    const players = this.state.players.map(function (player) {
      if (player.id === newPlayer.id) {
        player = newPlayer;
        player.teamName = teams.find(team => team.id === player.team).name;
      }
      return player;
    });
    this.setState({players: players}, function () {
      this.setState({modalIsOpen: false});
    });
  }

  configPlayers = (data) => {
    const {teams, favorites} = this.state;
    const players = data.map(function (temp) {
      let player = temp;
      player.teamName = teams.find(team => team.id === temp.team).name;
      player.favorite = favorites.find(favorite => favorite.player.id === player.id);
      return player;
    });
    this.setState({players: players});
  }

  render() {
    const players = this.state.players;
    const comp = this;

    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={styles.title}>NBA Interview</div>
        <Link style={styles.favorite} to="/favorites">
          {this.state.favorites.length} favorites
        </Link>
        <div>
          <Search
            style={styles.search}
            setSearch={this.setSearch}
          />
          <label style={styles.pageLabel}>{`Page: ${this.state.page}`}</label>
          <Pagination setPageNumber={this.setPageNumber}/>
        </div>

        <div>
          {
            players.map(function (player) {
              return <Card
                key={player.id}
                player={player}
                editPlayer={comp.editPlayer}
                favoritePlayer={comp.favoritePlayer}
              />
            })
          }
        </div>

        <Modal
          width="380"
          height="380"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
          style={styles.modal}
          visible={this.state.modalIsOpen}>
          <Edit
            player={this.state.player}
            teams={this.state.teams}
            savePlayer={this.savePlayer}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

export default Main;
