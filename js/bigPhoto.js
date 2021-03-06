"use strict";

(function () {
  const VALUE_MIN_VISIBLE_COMMENTS = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const socialFooterText = document.querySelector(`.social__footer-text`);
  const closeBigPicture = document.querySelector(`.big-picture__cancel`);
  const btnCommentsLoader = document.querySelector(`.comments-loader`);

  const socialCommentTemplate = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);

  const getSocialComment = (item) => {
    const socialCommentElement = socialComment.cloneNode(true);

    socialCommentElement.querySelector(`.social__picture`).src = item.avatar;
    socialCommentElement.querySelector(`.social__picture`).alt = item.name;
    socialCommentElement.querySelector(`p`).textContent = item.message;

    return socialCommentElement;
  };

  const insertMinSocialCommets = (photos) => {
    const fragment = document.createDocumentFragment();

    socialCommentTemplate.innerHTML = ``;

    photos.forEach((photo) => {
      fragment.appendChild(getSocialComment(photo));
    });

    socialCommentTemplate.appendChild(fragment);
  };

  let commentsCopyArray = [];
  let currentComments = [];
  let startCommentsLength = VALUE_MIN_VISIBLE_COMMENTS;

  const openBigPhoto = (item) => {
    bigPicture.classList.remove(`hidden`);

    currentComments = item.comments;
    startCommentsLength = VALUE_MIN_VISIBLE_COMMENTS;
    commentsCopyArray = currentComments.slice();
    let comments = commentsCopyArray.slice(0, startCommentsLength);

    btnCommentsLoader.classList.remove(`hidden`);

    const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
    bigPictureImg.src = item.url;
    bigPicture.querySelector(`.likes-count`).textContent = item.likes;
    bigPicture.querySelector(`.social__caption`).textContent = item.description;
    bigPicture.querySelector(`.social__comment-count`).textContent = ``;
    bigPicture.querySelector(`.social__comment-count`).textContent = `${comments.length} из ${currentComments.length} комментариев`;

    if (comments.length === currentComments.length) {
      btnCommentsLoader.classList.add(`hidden`);
    }

    insertMinSocialCommets(comments);
    document.querySelector(`body`).classList.add(`modal-open`);
  };

  const showBigPhoto = (data) => {
    const smallPictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < smallPictures.length; i++) {
      smallPictures[i].addEventListener(`click`, function (evt) {
        evt.preventDefault();
        openBigPhoto(data[i]);
      });
    }
  };


  btnCommentsLoader.addEventListener(`click`, () => {
    commentsCopyArray = currentComments.slice();
    let comments = commentsCopyArray.slice(0, startCommentsLength);
    startCommentsLength += VALUE_MIN_VISIBLE_COMMENTS;
    comments = commentsCopyArray.slice(0, startCommentsLength);
    if (comments.length < currentComments.length) {
      insertMinSocialCommets(comments);
      bigPicture.querySelector(`.social__comment-count`).textContent = `${comments.length} из ${currentComments.length} комментариев`;
    }
    if (comments.length === currentComments.length) {
      insertMinSocialCommets(comments);
      bigPicture.querySelector(`.social__comment-count`).textContent = `${currentComments.length} из ${currentComments.length} комментариев`;
      btnCommentsLoader.classList.add(`hidden`);
    }
  });

  closeBigPicture.addEventListener(`click`, () => {
    document.querySelector(`.big-picture`).classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  });

  const onEscClose = (evt) => {
    if (evt.key === window.util.ESC_KEYCODE) {
      if (socialFooterText === document.activeElement) {
        document.querySelector(`.big-picture`).classList.remove(`hidden`);
      } else {
        document.querySelector(`.big-picture`).classList.add(`hidden`);
        document.querySelector(`body`).classList.remove(`modal-open`);
      }
    }
  };

  document.addEventListener(`keydown`, onEscClose);

  const errorHandler = (errorMessage) => {
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
