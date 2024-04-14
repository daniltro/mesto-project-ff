

function showError(formElement, inputElement, errorMessage, validationConfig) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorClass);
}

const hideError = (formElement, inputElement, validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(validationConfig.errorClass);
};

function checkValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideError(formElement, inputElement, validationConfig)
  }
}

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formlist = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formlist.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

const toggleButtonState = (inputList, toggleElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    toggleElement.disabled = true;
    toggleElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    toggleElement.disabled = false;
    toggleElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, validationConfig)
  })
}