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

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const formAddProfile = document.forms["new-place"];
const placeName = formAddProfile.elements["place-name"];
const placeLink = formAddProfile.elements["link"];
const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

initialCards.forEach(function (card) {
  card = addCard(card, removeCard, likeCard, openCard);
  placesList.appendChild(card);
});

function addNewCard(evt) {
  evt.preventDefault();
  const card = {
    name: placeName.value,
    link: placeLink.value,
  };
  const cardClone = addCard(card, removeCard, likeCard, openCard);
  placesList.prepend(cardClone);
  closePopup(evt.target.closest(".popup"));
}

formAddProfile.addEventListener("submit", addNewCard);

editProfileButton.addEventListener("click", () => {
  formEditProfile.elements["name"].value = profileTitle.textContent;
  formEditProfile.elements["description"].value =
    profileDescription.textContent;
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

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopup(evt.target.closest(".popup"));
}

formEditProfile.addEventListener("submit", handleFormSubmit);

function openCard(evt) {
  openPopup(imagePopup);
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
}
