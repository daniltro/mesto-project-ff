// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

// @todo: Функция создания карточки

function addCard (name, link) {
  const cardClone = cardTemplate.cloneNode(true);

  const cardTitle = cardClone.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardImage = cardClone.querySelector('.card__image');
  cardImage.setAttribute('src', link);

  const deleteButton = cardClone.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    removeCard();
  })

    placesList.appendChild(cardClone);
}

function removeCard() {
  const card = document.querySelector('.places__item')
  card.closest('.places__item').remove();
}

initialCards.forEach(function (card) {
  addCard(card.name, card.link)
});

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
