'use strict';

(function () {
  const DEFAULT_VALUE_MAX = 100;
  const DEFAULT_VALUE_MIN = 25;
  const DEFAULT_VALUE_STEP = 25;

  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const scaleControlMinus = document.querySelector(`.scale__control--smaller`);
  const scaleControlPlus = document.querySelector(`.scale__control--bigger`);
  const imgForEffect = document.querySelector(`img`);

  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);
  const effectLevelDepth = effectLevelLine.querySelector(`.effect-level__depth`);
  const effectsRadio = document.querySelectorAll(`.effects__radio`);
  const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);
  let currentEffect = document.querySelector(`.effects__radio:checked`).value;

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
    const effectValue = (value === undefined) ? EFFECTS_VALUE_MAX[effect].max : currentValue;
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
      let minWidthofLine = 0; // передвижение в границах

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
})();
