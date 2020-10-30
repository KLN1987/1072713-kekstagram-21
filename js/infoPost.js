"use strict";

(function () {

  const main = document.querySelector(`main`);
  const elem = document.createElement(`div`);
  const bigPhoto = document.querySelector(`.img-upload__overlay`);
  const success = document.querySelector(`#success`);
  const error = document.querySelector(`#error`);

  const openSuccessWindow = function () {
    bigPhoto.classList.add(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    elem.append(success.content.cloneNode(true));
    main.append(elem);
    document.querySelector(`.success__button`).addEventListener(`click`, function () {
      document.querySelector(`.success`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    });
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
  };

  window.infoPost = {
    openErrorWindow: openErrorWindow,
    openSuccessWindow: openSuccessWindow
  };

})();
