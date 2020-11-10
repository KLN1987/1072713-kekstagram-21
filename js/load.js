"use strict";

(function () {
  fetch(`https://21.javascript.pages.academy/kekstagram/data`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
      window.render.switchPhotosList(data);
    })
    .catch(function (error) {
      window.bigPhoto.errorHandler(`Looks like there was a problem. Status Code: ` + error
      );
    });
})();
