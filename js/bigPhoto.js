"use strict";

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const socialCommentTemplate = document.querySelector(`.social__comments`);
  const socialFooterText = document.querySelector(`.social__footer-text`);
  const closeBigPicture = document.querySelector(`.big-picture__cancel`);
  const socialComment = document.querySelector(`.social__comment`);

  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const renderSinglePictures = function (item) {
    const pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = item.photo;
    pictureElement.querySelector(`.picture__img`).alt = item.description;
    pictureElement.querySelector(`.picture__likes`).textContent = item.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = item.comments.length;

    return pictureElement;
  };

  const renderListPictures = function (arr) {
    const fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderSinglePictures(item));
    });
    similarListElement.appendChild(fragment);
  };

  renderListPictures(window.data.pictures);

  const getSocialComment = function (item) {
    const socialCommentElement = socialComment.cloneNode(true);
    socialCommentElement.querySelector(`.social__picture`).src = item.avatar;
    socialCommentElement.querySelector(`.social__picture`).alt = item.name;
    socialCommentElement.querySelector(`p`).textContent = item.message;

    return socialCommentElement;
  };

  const getOpenBigPhoto = function (item) {
    bigPicture.classList.remove(`hidden`);

    const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);

    bigPictureImg.src = item.photo;
    bigPicture.querySelector(`.likes-count`).textContent = item.likes;
    bigPicture.querySelector(`.comments-count`).textContent = item.comments.length;

    const fragment = document.createDocumentFragment();

    item.comments.forEach(function (i) {
      fragment.appendChild(getSocialComment(i));
    });

    socialCommentTemplate.innerHTML = ``;

    socialCommentTemplate.appendChild(fragment);

    bigPicture.querySelector(`.social__caption`).textContent = item.description;

    document.querySelector(`body`).classList.add(`modal-open`);
  };

  const showBigPicture = function (photo, item) {
    photo.addEventListener(`click`, function () {
      getOpenBigPhoto(item);
    });
  };

  // Запускаем функцию открытия большой фотографии
  const smallPictures = document.querySelectorAll(`.picture`);
  for (let i = 0; i < smallPictures.length; i++) {
    showBigPicture(smallPictures[i], window.data.pictures[i]);
  }

  closeBigPicture.addEventListener(`click`, function () {
    document.querySelector(`.big-picture`).classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  });

  const onEscClose = function (evt) {
    if (evt.key === window.util.ESC_KEYCODE || socialFooterText === document.activeElement) {
      document.querySelector(`.big-picture`).classList.remove(`hidden`);
    } else {
      document.querySelector(`.big-picture`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  document.addEventListener(`keydown`, onEscClose);

})();
