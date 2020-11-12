"use strict";

(function () {
  const ESC_KEY = `Escape`;
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCancel = document.querySelector(`#upload-cancel`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const textDescription = document.querySelector(`.text__description`);
  const textHashtags = document.querySelector(`.text__hashtags`);
  const imgForEffect = document.querySelector(`img`);
  const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);

  const onPopupEscPress = (evt) => {
    if (evt.key === ESC_KEY) {
      if (textDescription === document.activeElement || textHashtags === document.activeElement) {
        /* проверка, есть ли курсор в поле ввода */
        uploadOverlay.classList.remove(`hidden`);
      } else {
        closePopup();
      }
    }
  };

  /* функция открытия закрытого окна */
  const openPopup = () => {
    uploadOverlay.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
    document.querySelector(`body`).classList.add(`modal-open`);
    imgUploadEffectLevel.classList.add(`hidden`);
  };

  /* функция закрытия открытого окна */
  const closePopup = () => {
    uploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    imgForEffect.removeAttribute(`class`);
    imgForEffect.removeAttribute(`style`);
    imgForEffect.classList.add(`effect-none`);
  };

  uploadFile.addEventListener(`change`, () => {
    openPopup();
  });

  uploadCancel.addEventListener(`click`, () => {
    closePopup();
  });

  document.removeEventListener(`keydown`, onPopupEscPress);

  window.util = {
    ESC_KEYCODE: `Escape`,
  };
})();
