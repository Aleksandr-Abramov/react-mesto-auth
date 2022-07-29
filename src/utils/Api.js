import { apiToken } from "./utils";

class Api {
  constructor(tokenData) {
    this._url = tokenData.url;
    this._token = tokenData.token;
  }
  thenFunction(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  /**
   * Данные пользовотеля
   */
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  /**
   * Изменение данных пользователя
   */
  changeInfoUser({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this.thenFunction(res));
  }

  /**
   * обновить аватар
   */
  changeAvatar(linkAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: linkAvatar,
      }),
    }).then((res) => this.thenFunction(res));
  }
  /**
   * Инициализация карточек
   */
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }

  createCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this.thenFunction(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
}

const api = new Api(apiToken);
export default api;
