"use strict";

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const socialFooterText = document.querySelector(`.social__footer-text`);
  const closeBigPicture = document.querySelector(`.big-picture__cancel`);

  const socialCommentTemplate = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);

  const getSocialComment = function (item) {
    const socialCommentElement = socialComment.cloneNode(true);

    socialCommentElement.querySelector(`.social__picture`).src = item.avatar;
    socialCommentElement.querySelector(`.social__picture`).alt = item.name;
    socialCommentElement.querySelector(`p`).textContent = item.message;

    return socialCommentElement;
  };

  const insertSocialCommets = function (photo) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < photo.comments.length; i++) {
      fragment.appendChild(getSocialComment(photo.comments[i]));
    }
    socialCommentTemplate.innerHTML = ``;
    socialCommentTemplate.appendChild(fragment);
  };

  const openBigPhoto = function (item) {
    bigPicture.classList.remove(`hidden`);

    const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
    bigPictureImg.src = item.url;
    bigPicture.querySelector(`.likes-count`).textContent = item.likes;
    // bigPicture.querySelector(`.comments-count`).textContent = item.comments.length;

    bigPicture.querySelector(`.social__caption`).textContent = item.description;
    bigPicture.querySelector(`.social__comment-count`).textContent = ``;
    bigPicture.querySelector(`.social__comment-count`).textContent = `${item.comments.length} из ${item.comments.length} комментариев`;

    document.querySelector(`body`).classList.add(`modal-open`);
  };

  const showBigPhoto = function (data) {
    const smallPictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < smallPictures.length; i++) {
      smallPictures[i].addEventListener(`click`, function (evt) {
        evt.preventDefault();
        insertSocialCommets(data[i]);
        openBigPhoto(data[i]);
      });
    }
  };

  closeBigPicture.addEventListener(`click`, function () {
    document.querySelector(`.big-picture`).classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  });

  const onEscClose = function (evt) {
    if (
      evt.key === window.util.ESC_KEYCODE &&
      socialFooterText === document.activeElement
    ) {
      document.querySelector(`.big-picture`).classList.remove(`hidden`);
    } else {
      document.querySelector(`.big-picture`).classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  document.addEventListener(`keydown`, onEscClose);

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.bigPhoto = {
    errorHandler,
    showBigPhoto
  };
})();
