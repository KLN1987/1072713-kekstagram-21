"use strict";

(function () {
  const main = document.querySelector(`main`);
  const elem = document.createElement(`div`);
  const bigPhoto = document.querySelector(`.img-upload__overlay`);
  const success = document.querySelector(`#success`);
  const error = document.querySelector(`#error`);

  const onEscCloseSuccesWindow = (evt) => {
    if (evt.key === window.util.ESC_KEYCODE) {
      document.querySelector(`.success`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const onEscCloseErrorWindow = (evt) => {
    if (evt.key === window.util.ESC_KEYCODE) {
      document.querySelector(`.error`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const openSuccessWindow = () => {
    bigPhoto.classList.add(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    elem.append(success.content.cloneNode(true));
    main.append(elem);

    document.querySelector(`.success__button`).addEventListener(`click`, () => {
      document.querySelector(`.success`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
      document.querySelector(`.success`).remove();
    });

    document.addEventListener(`keydown`, onEscCloseSuccesWindow);
  };

  const openErrorWindow = () => {
    bigPhoto.classList.add(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    elem.append(error.content.cloneNode(true));
    main.append(elem);

    document.querySelector(`.error__button`).addEventListener(`click`, () => {
      document.querySelector(`.error`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
      document.querySelector(`.error`).remove();
    });

    document.addEventListener(`keydown`, onEscCloseErrorWindow);
  };


  window.infoPost = {
    openErrorWindow,
    openSuccessWindow,
  };
})();
