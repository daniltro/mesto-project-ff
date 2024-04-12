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
import { validationConfig } from "./validation.js";
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
const popupCaption = imagePopup.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const userAvatar = document.querySelector(".profile__image");
const popupTypeDelete = document.querySelector(".popup_type-delete");
const deleteYes = document.querySelector(".popup__button-type-yes");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const editAvatar = document.querySelector(".profile__image");
const avatarImage = document.querySelector(".profile__image");
const formTypeAvatar = document.forms["avatar"];

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
      const card = addCard(res, likeToServ, openCard, userId, openDeletePopup);
      placesList.prepend(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
      closePopup(submitButton.closest(".popup"));
      placeName.value = "";
      placeLink.value = "";
    });
}

formAddProfile.addEventListener("submit", addNewCard);

editProfileButton.addEventListener("click", () => {
  formEditProfile.elements["name"].value = profileTitle.textContent;
  formEditProfile.elements["description"].value =
    profileDescription.textContent;
  openPopup(editProfilePopup);
  clearValidation(formEditProfile, validationConfig);
  clearValidation(formEditProfile, validationConfig);
});

addProfileButton.addEventListener("click", () => {
  openPopup(newCardPopup);
  formAddProfile.elements["place-name"].value = "";
  formAddProfile.elements["link"].value = "";
  clearValidation(formAddProfile, validationConfig);
  clearValidation(formAddProfile, validationConfig);
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
  const submitButton = evt.submitter;
  renderLoading(submitButton, true);
  const name = nameInput.value;
  const job = jobInput.value;
  saveUserName(name, job)
    .then(() => {
      profileTitle.textContent = name;
      profileDescription.textContent = job;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((evt) => {
      renderLoading(submitButton, false);
      closePopup(submitButton.closest(".popup"));
    });
}

formEditProfile.addEventListener("submit", handleFormSubmit);

function openCard(evt) {
  openPopup(imagePopup);
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
}
enableValidation(validationConfig);

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
      likeToServ,
      openCard,
      userId,
      openDeletePopup
    );
    placesList.appendChild(card);
  });
};

loadData()
  .then(([userData, cardData]) => {
    loadUserName(userData);
    loadCards(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

let cardDelete;

deleteYes.addEventListener("click", () => {
  removeCard(cardDelete);
  closePopup(popupTypeDelete);
});

function removeCard(cardElement) {
  removeData(cardElement.dataset.id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function openDeletePopup(cardElement) {
  cardDelete = cardElement;
  openPopup(popupTypeDelete);
}

editAvatar.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
  clearValidation(formTypeAvatar, validationConfig);
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
