'use strict';

const ESC_KEY = `Escape`;
const uploadFile = document.querySelector(`#upload-file`);
const uploadCancel = document.querySelector(`#upload-cancel`);
const uploadOverlay = document.querySelector(`.img-upload__overlay`);
const textDescription = document.querySelector(`.text__description`);

const onPopupEscPress = function (evt) {
  if (evt.key !== ESC_KEY || textDescription === document.activeElement) {
    /* проверка, есть ли курсор в поле ввода */
    uploadOverlay.classList.remove(`hidden`);
  } else {
    closePopup();
  }
};

/* функция открытия закрытого окна */
const openPopup = function () {
  uploadOverlay.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  document.querySelector(`body`).classList.add(`modal-open`);
  imgUploadEffectLevel.classList.add(`hidden`);
};

/* функция закрытия открытого окна */
const closePopup = function () {
  uploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  imgForEffect.removeAttribute(`class`);
  imgForEffect.removeAttribute(`style`);
  imgForEffect.classList.add(`effect-none`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

uploadFile.addEventListener(`change`, function () {
  openPopup();
});

uploadCancel.addEventListener(`click`, function () {
  closePopup();
});

/* уменьшение или увеличение фото */
const scaleControlValue = document.querySelector(`.scale__control--value`);
const scaleControlMinus = document.querySelector(`.scale__control--smaller`);
const scaleControlPlus = document.querySelector(`.scale__control--bigger`);
const imgForEffect = document.querySelector(`img`);
const DEFAULT_VALUE_MAX = 100;
const DEFAULT_VALUE_MIN = 25;
const DEFAULT_VALUE_STEP = 25;

const resizeImg = function (evt) {
  let elem = evt.target;
  let curValue = parseInt(scaleControlValue.value, 10);
  let newContorlValue = elem.classList.contains(`scale__control--smaller`) ? curValue - DEFAULT_VALUE_STEP : curValue + DEFAULT_VALUE_STEP;

  if (newContorlValue > DEFAULT_VALUE_MAX || newContorlValue < DEFAULT_VALUE_MIN) {
    return;
  }
  scaleControlValue.value = newContorlValue + `%`;
  imgForEffect.style.transform = `scale(` + newContorlValue / DEFAULT_VALUE_MAX + `)`;
};

scaleControlMinus.addEventListener(`click`, resizeImg);
scaleControlPlus.addEventListener(`click`, resizeImg);


/* добавление эффекта на фото*/
const effectLevel = document.querySelector(`.effect-level`);
const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);
const effectLevelDepth = effectLevelLine.querySelector(`.effect-level__depth`);
const effectsRadio = document.querySelectorAll(`.effects__radio`);
const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);
let currentEffect = document.querySelector(`.effects__radio:checked`).value;

const EFFECTS_VALUE_MAX = {
  none: `none`,
  chrome: {
    min: 0,
    max: 1
  },
  sepia: {
    min: 0,
    max: 1
  },
  marvin: {
    min: 0,
    max: 100
  },
  phobos: {
    min: 1,
    max: 3
  },
  heat: {
    min: 1,
    max: 3
  },
};

const onChangeEffect = function () {
  currentEffect = document.querySelector(`.effects__radio:checked`).value;
  imgForEffect.className = `effects__preview--${currentEffect}`;
  imgUploadEffectLevel.classList[(currentEffect === `none`) ? `add` : `remove`](`hidden`);
  setEffectsValue();
};

effectsRadio.forEach(function (effect) {
  effect.addEventListener(`change`, onChangeEffect);
});

const setEffectsValue = function () {
  const position = effectLevelLine.offsetWidth - effectLevelPin.offsetWidth / 2;

  effectLevelPin.style.left = position + `px`;
  effectLevelDepth.style.width = position + `px`;

  imgForEffect.style.filter = getEffectsStyle(currentEffect);
};

const getEffectsStyle = function (effect, value) {
  const currentValue = EFFECTS_VALUE_MAX[effect].min + (EFFECTS_VALUE_MAX[effect].max - EFFECTS_VALUE_MAX[effect].min) * value;
  const effectValue = (typeof value === `undefined`) ? EFFECTS_VALUE_MAX[effect].max : currentValue;
  switch (effect) {
    case `none`:
      return `none`;
    case `chrome`:
      return `grayscale(${effectValue})`;
    case `sepia`:
      return `sepia(${effectValue})`;
    case `marvin`:
      return `invert(${effectValue}%)`;
    case `phobos`:
      return `blur(${effectValue}px)`;
    case `heat`:
      return `brightness(${effectValue})`;
    default:
      return ``;
  }
};

effectLevelPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoordX = evt.clientX;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    let shiftX = startCoordX - moveEvt.clientX;
    let coordPin = effectLevelPin.offsetLeft - shiftX;

    startCoordX = moveEvt.clientX;
    let maxWidthOfLine = 450;
    let minWidthofLine = 0;// передвижение в границах

    if (coordPin <= minWidthofLine) {
      coordPin = minWidthofLine;
    }

    if (coordPin > maxWidthOfLine) {
      coordPin = maxWidthOfLine;
    }

    effectLevelPin.style.left = coordPin + `px`;
    effectLevelDepth.style.width = coordPin + `px`;
    effectLevelValue.setAttribute(`value`, coordPin);
    imgForEffect.style.filter = getEffectsStyle(currentEffect, coordPin / effectLevelLine.offsetWidth);

  };
  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

/* проверка правильности ввода хэштегов */

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
  }

  if (hashtagText.value === ``) {
    return;
  }
};

uploadSubmit.addEventListener(`click`, validateListHashtag);
hashtagText.addEventListener(`input`, onHashtagChange);
