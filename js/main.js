
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

// задание 8(2). Все константы надо понять на верх, но позже мы будем разбивать все на отдельные файлы
// проще будет переносить и сейчас ориентироваться.
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
const imageBig = bigPictureImg.getElementsByTagName(`img`)[0];
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentCount = bigPicture.querySelector(`.comments-count`);
const socialCaption = document.querySelector(`.social__caption`);
const socialComments = document.querySelector(`.social__comments`);
const socialPictures = socialComments.querySelectorAll(`.social__picture`);
const socialText = socialComments.querySelectorAll(`.social__text`);
const socialCommentCount = document.querySelector(`.social__comment-count`);
const commentsLoader = document.querySelector(`.comments-loader`);

document.body.classList.add(`modal-open`);
commentsLoader.classList.add(`hidden`);
socialCommentCount.classList.add(`hidden`);
bigPicture.classList.add(`hidden`);
imageBig.src = pictures[0].url;
likesCount.textContent = pictures[0].like;
commentCount.textContent = pictures[0].comment;
socialCaption.textContent = pictures[0].description;

for (let i = 0; i < socialPictures.length; i++) {
  socialPictures[i].src = comments[i].avatar;
  socialPictures[i].alt = comments[i].name;
  socialText[i].textContent = comments[i].message;
}

