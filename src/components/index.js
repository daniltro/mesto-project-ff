// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

import "../styles/index.css";
import { initialCards } from "./cards.js";
import { addCard } from "./cards.js";
import { likeCard } from "./cards.js";
import { removeCard } from "./cards.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { openCard } from "./modal.js";
import { addNewCard } from "./cards.js";

const placesList = document.querySelector(".places__list");

initialCards.forEach(function (card) {
  card = addCard(card, removeCard, likeCard, openCard);
  placesList.appendChild(card);
});

// ----------------------------- модальные окна------------------------------------------------

const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");

export function escHandler(evt) {
  console.log(evt.key);
  if (evt.key === "Escape") {
    if (editProfilePopup.classList.contains("popup_is-opened")) {
      closePopup(editProfilePopup);
    }
    if (newCardPopup.classList.contains("popup_is-opened")) {
      closePopup(newCardPopup);
    }
    if (popupTypeImage.classList.contains("popup_is-opened")) {
      closePopup(popupTypeImage);
    }
  }
}

const formAddProfile = document.forms["new-place"];
const placeName = formAddProfile.elements["place-name"];
const placeLink = formAddProfile.elements["link"];

export {placesList, placeName, placeLink};

formAddProfile.addEventListener("submit", addNewCard);

editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});

addProfileButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(evt.target.closest(".popup"));
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(evt.target.closest(".popup"));
    }
  });
});

// -------------------- Редактирование имени и информации о себе-------------------------------------------------

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];

formEditProfile.elements["name"].value = profileTitle.textContent;
formEditProfile.elements["description"].value = profileDescription.textContent;

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopup(evt.target.closest(".popup"));
}

formEditProfile.addEventListener("submit", handleFormSubmit);
