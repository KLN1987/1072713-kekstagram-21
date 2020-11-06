"use strict";

(function () {
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
      window.sort.shufflePictures(data);
      successHandler(data);
      window.bigPhoto.showBigPhoto(data);
    });
  });

  const renderPhotos = window.debounce(function (data) {
    photos = data;
    document.querySelector(`#filter-discussed`).addEventListener(`click`, function () {
      removePictures(data);
      window.sort.sortPicturesByComments(data);
      successHandler(photos);
      window.bigPhoto.showBigPhoto(photos);
    });
  });

  const renderTenPhotos = window.debounce(function (data) {
    photos = data;
    document.querySelector(`#filter-random`).addEventListener(`click`, function () {
      removePictures(data);
      window.sort.shufflePictures(data);
      successHandler(photos.slice(0, 10));
      window.bigPhoto.showBigPhoto(photos);
    });
  });

  window.render = {
    successHandler,
    renderPhotos,
    renderListPhotos,
    renderTenPhotos,
    removePictures
  };

})();
