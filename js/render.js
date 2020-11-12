"use strict";

(function () {
  const RANDOM_PICTURES_COUNT = 10;
  const btnsFilter = document.querySelectorAll(`.img-filters__button`);
  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const renderSinglePictures = (item) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = item.url;
    pictureElement.querySelector(`.picture__img`).alt = item.description;
    pictureElement.querySelector(`.picture__likes`).textContent = item.likes;
    pictureElement.querySelector(`.picture__comments`).textContent =
      item.comments.length;

    return pictureElement;
  };

  const successHandler = (photos) => {
    const fragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      fragment.appendChild(renderSinglePictures(photo));
    });

    similarListElement.appendChild(fragment);
  };

  const makeButtonInactive = () => {
    const filterButtonActive = document.querySelector(`.img-filters__button--active`);
    if (filterButtonActive) {
      filterButtonActive.classList.remove(`img-filters__button--active`);
    }
  };

  const removePictures = () => {
    Array.prototype.forEach.call(similarListElement.querySelectorAll(`.picture`), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  let photosArray = [];
  const switchPhotosList = window.debounce((data) => {

    photosArray = data.slice();
    successHandler(photosArray);
    window.bigPhoto.showBigPhoto(photosArray);

    btnsFilter.forEach((btn) => {
      btn.addEventListener(`click`, function (evt) {
        makeButtonInactive();
        evt.target.classList.add(`img-filters__button--active`);
        removePictures();
        if (evt.target.id === `filter-default`) {
          successHandler(data);
          window.bigPhoto.showBigPhoto(data);
        }
        if (evt.target.id === `filter-discussed`) {
          window.sort.sortPicturesByComments(photosArray);
          successHandler(photosArray);
          window.bigPhoto.showBigPhoto(photosArray);
        }
        if (evt.target.id === `filter-random`) {
          window.sort.shufflePictures(photosArray);
          successHandler(photosArray.slice(0, RANDOM_PICTURES_COUNT));
          window.bigPhoto.showBigPhoto(photosArray);
        }
      });
    });
  });

  window.render = {
    successHandler,
    switchPhotosList
  };

})();
