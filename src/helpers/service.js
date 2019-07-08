import axios from "axios";
import {baseUrl} from "../const";

class Service {
  getPlayers(params, handleHttpResponse) {
    axios
      .get(
        `${baseUrl}/players`,
        {params})
      .then(res => handleHttpResponse(res.data))
      .catch(err => console.log(err));
  }

  updatePlayer(id, params, handleHttpResponse) {
    axios
      .patch(
        `${baseUrl}/players/${id}`,
        params,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => handleHttpResponse(res.data))
      .catch(err => console.log(err));
  }

  getTeams(params, handleHttpResponse) {
    axios
      .get(
        `${baseUrl}/teams`,
        {params})
      .then(res => handleHttpResponse(res.data))
      .catch(err => console.log(err));
  }

  getFavorites(params, handleHttpResponse) {
    axios
      .get(`${baseUrl}/favorites`, params)
      .then(res => handleHttpResponse(res.data, 0))
      .catch(err => console.log(err));
  }

  postFavorite(params, handleHttpResponse) {
    axios
      .post(
        `${baseUrl}/favorites`,
        params,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => handleHttpResponse(res.data, 0))
      .catch(err => console.log(err));
  }

  updateFavorite(id, params, handleHttpResponse) {
    axios
      .patch(
        `${baseUrl}/favorites/${id}`,
        params,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => handleHttpResponse(res.data))
      .catch(err => console.log(err));
  }

  removeFavorite(id, handleHttpResponse) {
    axios
      .delete(
        `${baseUrl}/favorites/${id}`
      )
      .then(res => handleHttpResponse(res.data, id))
      .catch(err => console.log(err));
  }
}

export default Service
