import { escHandler } from "./index.js";
import { addCard, removeCard } from "./cards.js";
import { cardLike } from "./cards.js";
import { placesList, placeName, placeLink } from "./index.js";

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escHandler);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escHandler);
}

export function openCard(evt) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imageInPopup = imagePopup.querySelector(".popup__image");
  openPopup(imagePopup);
  imageInPopup.src = evt.target.src;
}

export function addNewCard(evt) {
  evt.preventDefault();
  const card = {
    name: placeName.value,
    link: placeLink.value,
  };
  const cardClone = addCard(card, removeCard, cardLike, openCard);
  placesList.prepend(cardClone);
  closePopup(evt.target.closest(".popup"));
}
