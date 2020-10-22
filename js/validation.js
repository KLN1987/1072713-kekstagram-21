'use strict';

(function () {

  const hashtagText = document.querySelector(`.text__hashtags`);
  const uploadSubmit = document.querySelector(`#upload-submit`);

  const validateHashtag = function (hashtag) {
    if (hashtag[0] !== `#`) {
      hashtagText.setCustomValidity(`Хэш-тег начинается с символа #`);
      return false;
    }
    if (hashtag.length < 2) {
      hashtagText.setCustomValidity(`Хеш-тег не может состоять только из одной решётки`);
      return false;
    }
    if (hashtag.length > 20) {
      hashtagText.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов включая решетку`);
      return false;
    }
    if (hashtag.indexOf(`#`, 1) > 0) {
      hashtagText.setCustomValidity(`Хэш-теги разделяются пробелами`);
      return false;
    }
    return true;
  };

  const onHashtagChange = function () {
    hashtagText.setCustomValidity(``);
  };

  const validateListHashtag = function () {
    const hashtagArray = hashtagText.value.toLowerCase().split(` `);

    hashtagArray.forEach((item, i) => {
      const isHashtagValid = validateHashtag(item);
      if (!isHashtagValid) {
        return;
      }
      if (hashtagArray.indexOf(item, i + 1) > 0) {
        hashtagText.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
        return;
      }
    });

    if (hashtagArray.length > 5) {
      hashtagText.setCustomValidity(`Хэштегов может быть максимум 5`);
      return;
    }

    if (hashtagText.value === ``) {
      return;
    }
  };

  uploadSubmit.addEventListener(`click`, validateListHashtag);
  hashtagText.addEventListener(`input`, onHashtagChange);
})();
