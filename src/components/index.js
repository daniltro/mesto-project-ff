// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу
import "../styles/index.css";
import { addCard } from "./cards.js";
import { likeToServ } from "./cards.js";
import { removeData } from "./api.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { enableValidation } from "./validation.js";
import { clearValidation } from "./validation.js";
import { loadData } from "./api.js";
import { saveUserName } from "./api.js";
import { saveNewCard } from "./api.js";
import { patchAvatar } from "./api.js";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const formAddProfile = document.forms["new-place"];
const placeName = formAddProfile.elements["place-name"];
const placeLink = formAddProfile.elements["link"];
const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const userAvatar = document.querySelector(".profile__image");
const popupTypeDelete = document.querySelector(".popup_type-delete");
const buttonDeleteYes = document.querySelector(".popup__button-type-yes");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const editAvatar = document.querySelector(".profile__image");
const avatarImage = document.querySelector(".profile__image");
const formTypeAvatar = document.forms["avatar"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function addNewCard(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(submitButton, true);

  const card = {
    name: placeName.value,
    link: placeLink.value,
  };

  saveNewCard(card.name, card.link)
    .then((res) => {
      const card = addCard(res, {like: likeToServ, openPopup: openCard, handleDeleteCard: removeCard}, userId);
      placesList.prepend(card);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
      formAddProfile.reset();
    });
}

formAddProfile.addEventListener("submit", addNewCard);

editProfileButton.addEventListener("click", () => {
  formEditProfile.elements["name"].value = profileTitle.textContent;
  formEditProfile.elements["description"].value =
    profileDescription.textContent;
  openPopup(editProfilePopup);
  clearValidation(formEditProfile, validationConfig);
});

addProfileButton.addEventListener("click", () => {
  openPopup(newCardPopup);
  formAddProfile.reset();
  clearValidation(formAddProfile, validationConfig);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(evt.target.closest(".popup"));
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(evt.target.closest(".popup"));
    }
  });
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(submitButton, true);
  const name = nameInput.value;
  const job = jobInput.value;
  saveUserName(name, job)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((evt) => {
      renderLoading(submitButton, false);
    });
}

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

function openCard(evt) {
  openPopup(imagePopup);
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;
}
enableValidation(validationConfig);


loadData()
  .then(([userData, cardData]) => {
    loadUserName(userData);
    loadCards(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

let userId = "";

const loadUserName = (userData) => {
  userId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  userAvatar.style.backgroundImage = `url(${userData.avatar})`;
};

const loadCards = (cardData) => {
  cardData.forEach(function (cardDataElem) {
    const card = addCard(
      cardDataElem,
      {
      like: likeToServ,
      openPopup: openCard,
      handleDeleteCard: removeCard},
      userId
    );
    placesList.appendChild(card);
  });
};

let submitFormConfirm = () => {};

const removeCard = (cardId, cardElement) => {
  submitFormConfirm = () => {
    removeData(cardId)
    .then(() => {
      cardElement.remove();
      closePopup(popupTypeDelete);
    })
    .catch((err) => {
      console.log(err)
    });
  }
  openPopup(popupTypeDelete);
}

buttonDeleteYes.addEventListener("click", (evt) => {
    evt.preventDefault();
    submitFormConfirm();
  });

editAvatar.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
  clearValidation(formTypeAvatar, validationConfig);
  formTypeAvatar.reset();
});

function saveAvatar(popup) {
  const inputElement = popup.querySelector(".popup__input-type-avatar-edit");
  const inputLink = inputElement.value;
  const popupButton = popup.querySelector(".popup__button");
  let avatarLink;
  patchAvatar(inputLink)
    .then((result) => {
      avatarLink = result.avatar;
      avatarImage.style.backgroundImage = `url('${avatarLink}')`;
      inputElement.value = "";
      closePopup(popup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupButton, false);
    });
}

formTypeAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  saveAvatar(popupTypeAvatar);
});

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
