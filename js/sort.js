"use strict";

(function () {
  document
    .querySelector(`.img-filters`)
    .classList.remove(`img-filters--inactive`);

  const shufflePictures = function (arr) {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  const sortPicturesByComments = function (arr) {
    arr.sort(function (picture1, picture2) {
      return picture2.comments.length - picture1.comments.length;
    });
  };


  window.sort = {
    shufflePictures,
    sortPicturesByComments,
  };
})();
