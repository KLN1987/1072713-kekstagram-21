"use strict";

(function () {
  const RANDOM_PICTURES_COUNT = 10;
  const btnsFilter = document.querySelectorAll(`.img-filters__button`);
  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

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

  const makeButtonInactive = function () {
    const filterButtonActive = document.querySelector(`.img-filters__button--active`);
    if (filterButtonActive) {
      filterButtonActive.classList.remove(`img-filters__button--active`);
    }
  };

  const removePictures = function () {
    Array.prototype.forEach.call(similarListElement.querySelectorAll(`.picture`), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  const switchPhotosList = window.debounce(function (data) {

    btnsFilter.forEach(function (btn) {
      btn.addEventListener(`click`, function (evt) {
        makeButtonInactive();
        evt.target.classList.add(`img-filters__button--active`);
        removePictures();
        if (evt.target.id === `filter-default`) {
          successHandler(data);
        }
        if (evt.target.id === `filter-discussed`) {
          window.sort.sortPicturesByComments(data);
          successHandler(data);
        }
        if (evt.target.id === `filter-random`) {
          window.sort.shufflePictures(data);
          successHandler(data.slice(0, RANDOM_PICTURES_COUNT));
        }
        window.bigPhoto.showBigPhoto(data);
      });
    });
  });

  window.render = {
    successHandler,
    switchPhotosList
  };

})();
