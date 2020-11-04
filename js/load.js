"use strict";

(function () {

  fetch(`https://21.javascript.pages.academy/kekstagram/data`)
    .then(
        function (response) {
          return response.json();
        })
      .then(
          function (data) {
            window.bigPhoto.successHandler(data);
            window.bigPhoto.showBigPhoto(data);
          })
          .catch(
              function (error) {
                window.bigPhoto.errorHandler(`Looks like there was a problem. Status Code: ` +
                  error);
              });

})();
