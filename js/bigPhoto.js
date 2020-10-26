"use strict";

(function () {
  const MAX_PHOTO_COUNT = 25;
  const bigPicture = document.querySelector(`.big-picture`);
  const socialCommentTemplate = document.querySelector(`.social__comments`);
  const socialFooterText = document.querySelector(`.social__footer-text`);
  const closeBigPicture = document.querySelector(`.big-picture__cancel`);
  const socialComment = document.querySelector(`.social__comment`);
  const smallPictures = document.querySelectorAll(`.picture`);

  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const renderSinglePictures = function (item) {
    const pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = item.url;
    pictureElement.querySelector(`.picture__img`).alt = item.description;
    pictureElement.querySelector(`.picture__likes`).textContent = item.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = item.comments.length;

    return pictureElement;
  };

  const getSocialComment = function (item) {
    const socialCommentElement = socialComment.cloneNode(true);
    let commentsItem = item.comments[0];
    socialCommentElement.querySelector(`.social__picture`).src = commentsItem.avatar;
    socialCommentElement.querySelector(`.social__picture`).alt = commentsItem.name;
    socialCommentElement.querySelector(`p`).textContent = commentsItem.message;

    return socialCommentElement;
  };

  const successHandler = function (photo) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_PHOTO_COUNT; i++) {
      fragment.appendChild(renderSinglePictures(photo[i]));
    }

    similarListElement.appendChild(fragment);
  };

  const successSocialCommets = function (photo) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_PHOTO_COUNT; i++) {
      fragment.appendChild(getSocialComment(photo[i]));
    }
    socialCommentTemplate.innerHTML = ``;
    socialCommentTemplate.appendChild(fragment);
    // userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  const getOpenBigPhoto = function (item) {
    bigPicture.classList.remove(`hidden`);

    const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
    bigPictureImg.src = item.src;
    bigPicture.querySelector(`.likes-count`).textContent = item.likes;
    bigPicture.querySelector(`.comments-count`).textContent = item.comments[0].length;

    bigPicture.querySelector(`.social__caption`).textContent = item.description;

    document.querySelector(`body`).classList.add(`modal-open`);
  };

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

  const showBigPicture = function (photo, item) {
    photo.addEventListener(`click`, function () {
      getOpenBigPhoto(item);
    });
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

  fetch(`https://21.javascript.pages.academy/kekstagram/data`)
  .then(
      function (response) {
        if (response.status !== 200) {
          errorHandler(`Looks like there was a problem. Status Code: ` +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (json) {
          let data = json;
          successHandler(data);
          successSocialCommets(data);
          for (let i = 0; i < smallPictures.length; i++) {
            showBigPicture(smallPictures[i], data);
          }
        });
      }
  )
  .catch(
      function (err) {
        errorHandler(`Fetch Error :-S`, err);
      });

})();
