"use strict";
/* задаем постоянные значения*/
const LENGTH_ARR_PHOTO = 25;
const LIKE_START = 15;
const LIKE_END = 200;
const LENGTH_ARR_PICTURE = 25;
const COUNT_OF_COMMENTS = 5;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;

/* массив комментариев*/
const DESCRIPTION = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
/* имя автора комента */
const NAME_AUTHOR = [`Лев`, `Александр`, `Игорь`, `Даниил`, `Владимир`, `Антон`, `Михаил`, `Екатерина`, `Варвара`, `София`];

const similarListElement = document.querySelector(`.pictures`);
const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

/* нахождение рандомного чила */
const getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

/* массив аватарок */
const numberAvatar = [];
for (let g = MIN_NUMBER_AVATAR; g <= MAX_NUMBER_AVATAR; g++) {
  numberAvatar.push(g);
}

/* массив номера фото */
const numberPhoto = [];
for (let i = 1; i <= LENGTH_ARR_PHOTO; i++) {
  numberPhoto.push(i);
}

/* массив лайков */
const likes = [];
for (let j = LIKE_START; j <= LIKE_END; j++) {
  likes.push(j);
}

/* массив со случайными комментариями */
const comments = [];
for (let t = 0; t < COUNT_OF_COMMENTS; t++) {
  const randomComment = {
    avatar: `img/avatar-${numberAvatar[getRandomElement(numberAvatar)]}.svg`,
    name: NAME_AUTHOR[getRandomElement(NAME_AUTHOR)],
    message: DESCRIPTION[getRandomElement(DESCRIPTION)]
  };
  comments.push(randomComment);
}

/* массив со случайными картнками */
const pictures = [];
for (let k = 0; k < LENGTH_ARR_PICTURE; k++) {
  const randomPicture = {
    url: `photos/${numberPhoto[k]}.jpg`,
    like: likes[getRandomElement(likes)],
    description: `описание фото`,
    comment: comments.length
  };
  pictures.push(randomPicture);
}
/* функция добавляет в template, случайныt картиками, кол-вом лайков, и комментов  */
const renderPicture = function (picture) {
  const pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.like;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comment;

  return pictureElement;
};

const fragment = document.createDocumentFragment();
for (let m = 0; m < LENGTH_ARR_PICTURE; m++) {
  fragment.appendChild(renderPicture(pictures[m]));
}
similarListElement.appendChild(fragment);
