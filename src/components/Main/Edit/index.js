import React from "react";
import styles from "./styles";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    const player = props.player;
    this.state = {
      player: {
        id: player.id || '',
        name: player.name || '',
        college: player.college || '',
        position: player.position || '',
        team: player.team || ''
      },
      changed: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const player = nextProps.player;
    this.setState({
      player: {
        id: player.id || '',
        name: player.name || '',
        college: player.college || '',
        position: player.position || '',
        team: player.team || ''
      },
      changed: false
    });
  }

  handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let player = this.state.player;
    player[key] = value;
    this.setState({player: player, changed: true});
  }

  save = () => {
    const player = this.state.player;
    if (player.name.trim().length === 0 || player.college.trim().length === 0 || player.position.trim().length === 0) {
      alert("Please fill in the blank fields");
      return;
    }

    this.props.savePlayer(player);
  }

  close = () => {
    this.props.closeModal();
  }

  render() {
    const player = this.state.player;

    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <h2>Edit Player</h2>
        <table style={styles.table}>
          <tbody>
          <tr>
            <td><label>Name: </label></td>
            <td style={styles.inputContainer}>
              <input type="text"
                name="name"
                style={styles.input}
                value={player.name}
                onChange={this.handleInputChange} />
            </td>
          </tr>
          <tr>
            <td><label>College: </label></td>
            <td style={styles.inputContainer}>
              <input type="text"
                name="college"
                style={styles.input}
                value={player.college}
                onChange={this.handleInputChange} />
            </td>
          </tr>
          <tr>
            <td><label>Position: </label></td>
            <td style={styles.inputContainer}>
              <input type="text"
                name="position"
                style={styles.input}
                value={player.position}
                onChange={this.handleInputChange} />
            </td>
          </tr>
          <tr>
            <td><label>Team: </label></td>
            <td style={styles.inputContainer}>
              <select
                name="team"
                style={styles.select}
                onChange={this.handleInputChange}>
              {
                this.props.teams.map(function (team) {
                  if (player.team === team.id) {
                    return <option value={team.id} selected key={team.id}>
                      {team.name}
                    </option>
                  } else {
                    return <option value={team.id} key={team.id}>
                      {team.name}
                    </option>
                  }
                })
              }
              </select>
            </td>
          </tr>
          </tbody>
        </table>

        <button
          style={styles.save}
          disabled={!this.state.changed}
          onClick={this.save.bind(this)}>
          Save
        </button>
        <button
          style={styles.cancel}
          onClick={this.close.bind(this)}>
          Cancel
        </button>
      </div>
    );
  }
}

export default Edit;
