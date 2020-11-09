"use strict";

(function () {
  let VALUE_MIN_VISIBLE_COMMENTS = 5;

  const bigPicture = document.querySelector(`.big-picture`);
  const socialFooterText = document.querySelector(`.social__footer-text`);
  const closeBigPicture = document.querySelector(`.big-picture__cancel`);
  const btnCommentsLoader = document.querySelector(`.comments-loader`);

  const socialCommentTemplate = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);

  const getSocialComment = function (item) {
    const socialCommentElement = socialComment.cloneNode(true);

    socialCommentElement.querySelector(`.social__picture`).src = item.avatar;
    socialCommentElement.querySelector(`.social__picture`).alt = item.name;
    socialCommentElement.querySelector(`p`).textContent = item.message;

    return socialCommentElement;
  };

  const insertMinSocialCommets = function (photo) {
    const fragment = document.createDocumentFragment();

    const takeNumber = photo.comments.length > VALUE_MIN_VISIBLE_COMMENTS
      ? VALUE_MIN_VISIBLE_COMMENTS
      : photo.comments.length;

    socialCommentTemplate.innerHTML = ``;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(getSocialComment(photo.comments[i]));
    }

    socialCommentTemplate.appendChild(fragment);
  };

  const addCountOpenComments = function (item) {
    if (item.comments.length <= VALUE_MIN_VISIBLE_COMMENTS) {
      bigPicture.querySelector(`.social__comment-count`).textContent = `${item.comments.length} из ${item.comments.length} комментариев`;
    } else {
      bigPicture.querySelector(`.social__comment-count`).textContent = `${VALUE_MIN_VISIBLE_COMMENTS} из ${item.comments.length} комментариев`;
    }
  };

  const openBigPhoto = function (item) {
    bigPicture.classList.remove(`hidden`);

    btnCommentsLoader.disabled = false;

    const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
    bigPictureImg.src = item.url;
    bigPicture.querySelector(`.likes-count`).textContent = item.likes;
    bigPicture.querySelector(`.social__caption`).textContent = item.description;
    bigPicture.querySelector(`.social__comment-count`).textContent = ``;

    addCountOpenComments(item);

    btnCommentsLoader.addEventListener(`click`, function () {
      VALUE_MIN_VISIBLE_COMMENTS += 5;
      insertMinSocialCommets(item);
      addCountOpenComments(item);
    });

    insertMinSocialCommets(item);
    document.querySelector(`body`).classList.add(`modal-open`);
  };

  const showBigPhoto = function (data) {
    const smallPictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < smallPictures.length; i++) {
      smallPictures[i].addEventListener(`click`, function (evt) {
        evt.preventDefault();
        openBigPhoto(data[i]);
      });
    }
  };

  closeBigPicture.addEventListener(`click`, function () {
    document.querySelector(`.big-picture`).classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    VALUE_MIN_VISIBLE_COMMENTS = 5;
  });

  const onEscClose = function (evt) {
    if (
      evt.key === window.util.ESC_KEYCODE &&
      socialFooterText === document.activeElement
    ) {
      document.querySelector(`.big-picture`).classList.remove(`hidden`);
      VALUE_MIN_VISIBLE_COMMENTS = 5;
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
    showBigPhoto,
  };
})();
