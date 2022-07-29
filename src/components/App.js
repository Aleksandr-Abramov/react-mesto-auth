import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import React, { useState } from "react";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);
  const [avatarLink, setAvatarLink] = useState("");

  React.useEffect(() => {
    api
      .getInfoUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных карточек:${err}`)
      );
  }, []);

  function handleCardLike(card, like) {
    api
      .changeLikeCardStatus(card._id, !like)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка при попытки поставить лайк:${err}`));
  }

  function closeAllPopups() {
    setProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleEditProfileClick() {
    if (isEditProfilePopupOpen === false) {
      setProfileOpen(true);
    }
  }
  function handleEditAvatarClick() {
    if (isEditAvatarPopupOpen === false) {
      setEditAvatarOpen(true);
    }
  }
  function handleAddPlaceClick() {
    if (isAddPlacePopupOpen === false) {
      setAddPlaceOpen(true);
    }
  }

  function handleCardClick(card) {
    if (selectedCard) {
      setSelectedCard(card);
    }
  }
  function handleUpdateUser({ name, about }) {
    api
      .changeInfoUser({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }

  function handleAddCard({ name, link }) {
    api
      .createCard({ name, link })
      .then(function (card) {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }

  function handleUpdateAvatar({ avatar, ref }) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setAvatarLink(res.avatar);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevState) => {
          return prevState.filter(function (element) {
            return element._id !== card._id;
          });
        });
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          avatarLink={avatarLink}
          onCardDelete={handleCardDelete}
          cards={cards}
          handleCardLike={handleCardLike}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          closePopup={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          closePopup={closeAllPopups}
          createCard={handleAddCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="popup_delete"
          modClassForm="popup__form_height"
          btnText="Да"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
