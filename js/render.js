"use strict";

(function () {

  const socialCommentTemplate = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);

  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  let photos = [];

  const renderSinglePictures = function (item) {
    const pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = item.url;
    pictureElement.querySelector(`.picture__img`).alt = item.description;
    pictureElement.querySelector(`.picture__likes`).textContent = item.likes;
    pictureElement.querySelector(`.picture__comments`).textContent =
      item.comments.length;

    return pictureElement;
  };

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

  const successHandler = function (photo) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < photo.length; i++) {
      fragment.appendChild(renderSinglePictures(photo[i]));
    }

    similarListElement.appendChild(fragment);
  };

  const removePictures = function () {
    Array.prototype.forEach.call(similarListElement.querySelectorAll(`.picture`), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  const renderListPhotos = window.debounce(function (data) {
    document.querySelector(`#filter-default`).addEventListener(`click`, function () {
      removePictures(data);
      window.sort.shuffle(data);
      successHandler(data);
    });
  });

  const renderPhotos = window.debounce(function (data) {
    photos = data;
    document.querySelector(`#filter-discussed`).addEventListener(`click`, function () {
      removePictures(data);
      window.sort.sortPicturesByComments(data);
      successHandler(photos);
    });
  });

  const renderTenPhotos = window.debounce(function (data) {
    photos = data;
    document.querySelector(`#filter-random`).addEventListener(`click`, function () {
      removePictures(data);
      window.sort.shuffle(data);
      successHandler(photos.slice(0, 10));
    });
  });

  window.render = {
    successHandler,
    renderPhotos,
    renderListPhotos,
    renderTenPhotos,
    insertSocialCommets,
    removePictures
  };

})();
