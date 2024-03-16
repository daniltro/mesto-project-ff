export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escHandler);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escHandler);
}

function escHandler(evt) {
  console.log(evt.key);
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
