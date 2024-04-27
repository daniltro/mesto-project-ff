import { putLike } from "./api.js";

export function addCard(card, { like, openPopup, handleDeleteCard }, userId) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");
  const cardClone = cardTemplate.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  cardTitle.textContent = card.name;
  const cardImage = cardClone.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardClone.dataset.id = card._id;
  const deleteButton = cardClone.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    handleDeleteCard(card._id, cardClone);
  });
  const likeButton = cardClone.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    like(likeButton, cardClone.dataset.id, likesCounter);
  });
  const likesCounter = cardClone.querySelector(".like-counter");
  const likeCounterClone = card.likes.length;
  likesCounter.textContent = likeCounterClone;

  const hasLikes = card.likes.some((like) => {
    return like._id === userId;
  });

  if (hasLikes) {
    likeButton.classList.add("card__like-button_is-active");
  }

  const image = cardClone.querySelector(".card__image");
  image.addEventListener("click", openPopup);

  if (card.owner._id !== userId) {
    deleteButton.classList.add("delete__button_is-hidden");
  }
  return cardClone;
}

export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

export function likeToServ(likeButton, cardId, likesCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likePromise = isLiked? putLike(cardId, true) : putLike(cardId, false);
  likePromise
  .then((result) => {
    likeCard(likeButton);
    likesCounter.textContent = result.likes.length;
  })
  .catch((error) => {
    console.log(error);
  });
}
