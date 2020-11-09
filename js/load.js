"use strict";

(function () {
  fetch(`https://21.javascript.pages.academy/kekstagram/data`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
      // window.render.successHandler(data);
      // window.bigPhoto.showBigPhoto(data);
      // window.render.renderListPhotos(data);
      // window.render.renderTenPhotos(data);
      // window.render.renderMostCommentedPhotos(data);
      // window.render.arrPhotos(data);
      window.render.switchPhotosList(data);
    })
    .catch(function (error) {
      window.bigPhoto.errorHandler(`Looks like there was a problem. Status Code: ` + error
      );
    });
})();
