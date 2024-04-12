import { putLike } from "./api.js";

export function addCard(card, like, openPopup, userId, openDeletePopup) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");
  const cardClone = cardTemplate.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  cardTitle.textContent = card.name;
  const cardImage = cardClone.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardClone.dataset.id = card._id;
  const deleteButton = cardClone.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    openDeletePopup(cardClone);
  });
  const likeButton = cardClone.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    like(likeButton, cardClone);
  });
  const likesCounter = cardClone.querySelector(".like-counter");
  const likeCounterClone = card.likes.length || 0;
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

export function likeToServ(likeButton, cardElement) {
  const cardId = cardElement.dataset.id;
  const likeCounter = cardElement.querySelector(".like-counter");
  let like;
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    putLike(cardId, false)
      .then((result) => {
        likeCard(likeButton);
        like = result.likes.length || 0;
        likeCounter.textContent = like;
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (likeButton.classList.contains("card__like-button_is-active")) {
    putLike(cardId, true)
      .then((result) => {
        likeCard(likeButton);
        like = result.likes.length || 0;
        likeCounter.textContent = like;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
