export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function addCard(card, callBackRemove, callBackLike, openPopup) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");
  const cardClone = cardTemplate.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  cardTitle.textContent = card.name;
  const cardImage = cardClone.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  const deleteButton = cardClone.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", callBackRemove);
  const likeButton = cardClone.querySelector(".card__like-button");
  likeButton.addEventListener("click", callBackLike);
  const image = cardClone.querySelector(".card__image");
  image.addEventListener("click", openPopup);

  return cardClone;
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function removeCard(event) {
  event.target.closest(".places__item").remove();
}
