"use strict";

(function () {

  const main = document.querySelector(`main`);
  const elem = document.createElement(`div`);
  const bigPhoto = document.querySelector(`.img-upload__overlay`);
  const success = document.querySelector(`#success`);
  const error = document.querySelector(`#error`);

  const onEscCloseSuccesWindow = function (evt) {
    if (evt.key === window.util.ESC_KEYCODE) {
      document.querySelector(`.success`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const onEscCloseErrorWindow = function (evt) {
    if (evt.key === window.util.ESC_KEYCODE) {
      document.querySelector(`.error`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const openSuccessWindow = function () {
    bigPhoto.classList.add(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    elem.append(success.content.cloneNode(true));
    main.append(elem);
    document.querySelector(`.success__button`).addEventListener(`click`, function () {
      document.querySelector(`.success`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    });
    document.addEventListener(`keydown`, onEscCloseSuccesWindow);
  };

  const openErrorWindow = function () {
    bigPhoto.classList.add(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    elem.append(error.content.cloneNode(true));
    main.append(elem);
    document.querySelector(`.error__button`).addEventListener(`click`, function () {
      document.querySelector(`.error`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    });
    document.addEventListener(`keydown`, onEscCloseErrorWindow);
  };

  window.infoPost = {
    openErrorWindow: openErrorWindow,
    openSuccessWindow: openSuccessWindow,
  };

})();
