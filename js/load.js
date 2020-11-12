"use strict";

(function () {
  fetch(`https://21.javascript.pages.academy/kekstagram/data`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.render.switchPhotosList(data);
    })
    .catch((error) => {
      window.bigPhoto.errorHandler(`Looks like there was a problem. Status Code: ` + error
      );
    });
})();
