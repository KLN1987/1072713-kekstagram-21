"use strict";

(function () {

  fetch(`https://21.javascript.pages.academy/kekstagram/data`)
.then(
    function (response) {
      if (response.status !== 200) {
        window.bigPhoto.errorHandler(`Looks like there was a problem. Status Code: ` +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (json) {
        let data = json;
        window.bigPhoto.successHandler(data);
        window.bigPhoto.showBigPhoto(data);
      });
    }
);
})();
