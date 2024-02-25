// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list'); 
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item'); 
 
function addCard (card, callBackRemove) { 
  const cardClone = cardTemplate.cloneNode(true); 
  const cardTitle = cardClone.querySelector('.card__title'); 
  cardTitle.textContent = card.name; 
  const cardImage = cardClone.querySelector('.card__image'); 
  cardImage.setAttribute('src', card.link); 
  cardImage.setAttribute('alt', card.name);
  const deleteButton = cardClone.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', callBackRemove); 
  return cardClone 
} 
 
function removeCard(event) { 
  event.target.closest('.places__item').remove(); 
} 
 
initialCards.forEach(function (card) { 
  card = addCard(card, removeCard); 
  placesList.appendChild(card); 
});