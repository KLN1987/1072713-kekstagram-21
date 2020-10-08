"use strict";
/* задаем постоянные значения*/
const NUMBER_LAST_PHOTO = 25;
const NUMBER_FIRST_AVATAR = 1;
const NUMBER_LAST_AVATAR = 6;
const LIKE_START = 15;
const LIKE_END = 200;
const COUNT_OF_START_COMMENTS = 5;
const COUNT_OF_END_COMMENTS = 150;
const ESC = `Escape`;

const bigPicture = document.querySelector(`.big-picture`);
const socialCommentTemplate = document.querySelector(`.social__comments`);
const socialFooterText = document.querySelector(`.social__footer-text`);
const closeBigPicture = document.querySelector(`.big-picture__cancel`);
const socialComment = document.querySelector(`.social__comment`);

/* массив комментариев*/
const COMMETS = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
/* имя автора комента */
const NAME_AUTHORS = [`Лев`, `Александр`, `Игорь`, `Даниил`, `Владимир`, `Антон`, `Михаил`, `Екатерина`, `Варвара`, `София`];

/* Описание фото */
const DESCRIPTIONS = [`Мое лето`, `Такая милота`, `Лучшее, что я видел на земле`, `Ммм...Классно!`, `Всё отлично!`, `Люблю свою жизнь!`, `Давайте просто улыбаться!`, `Мечты сбываются!`];

const similarListElement = document.querySelector(`.pictures`);
const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

// нахождение рандомного чила в цикле
const getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// нахождение целого случайного числа
const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


const getRandomComments = function () {
  // создаем массив
  const comments = [];
  // рандомное количество комментариев
  const randomCount = getRandomNumber(COUNT_OF_START_COMMENTS, COUNT_OF_END_COMMENTS);
  // создаем цикл с последующим заполнением созданного выше массива рандомным количеством комментариев
  for (let i = 0; i < randomCount; i++) {
    const comment = {
      avatar: `img/avatar-` + getRandomNumber(NUMBER_FIRST_AVATAR, NUMBER_LAST_AVATAR) + `.svg`,
      message: COMMETS[getRandomElement(COMMETS)],
      name: NAME_AUTHORS[getRandomElement(NAME_AUTHORS)]
    };
    comments.push(comment);
  }
  return comments;
};

const pictures = [];
const generateTestData = function () {
  for (let j = 1; j <= NUMBER_LAST_PHOTO; j++) {
    const picture = {
      photo: `photos/` + /* randomNumber(NUMBER_FIRST_PHOTO, NUMBER_LAST_PHOTO) */ j + `.jpg`,
      likes: getRandomNumber(LIKE_START, LIKE_END),
      comments: getRandomComments(),
      description: DESCRIPTIONS[getRandomElement(DESCRIPTIONS)]
    };
    pictures.push(picture);
  }
};

generateTestData();

const renderSinglePictures = function (item) {
  const pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = item.photo;
  pictureElement.querySelector(`.picture__img`).alt = item.description;
  pictureElement.querySelector(`.picture__likes`).textContent = item.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = item.comments.length;

  return pictureElement;
};

const renderListPictures = function (arr) {
  const fragment = document.createDocumentFragment();
  for (let k = 0; k < arr.length; k++) {
    fragment.appendChild(renderSinglePictures(arr[k]));
  }
  similarListElement.appendChild(fragment);
};

renderListPictures(pictures);

const getSocialComment = function (item) {
  const socialCommentElement = socialComment.cloneNode(true);
  // заполняемые элементы блока - аватар, имя
  socialCommentElement.querySelector(`.social__picture`).src = item.avatar;
  socialCommentElement.querySelector(`.social__picture`).alt = item.name;
  // Заполняем текстом комментария
  socialCommentElement.querySelector(`p`).textContent = item.message;

  return socialCommentElement;
};

const getOpenBigPhoto = function (item) {
  // Показываем картинку большую
  bigPicture.classList.remove(`hidden`);
  // Находим элементы для заполнения
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
  // адрес картинки
  bigPictureImg.src = item.photo;
  // кол-во лайков
  bigPicture.querySelector(`.likes-count`).textContent = item.likes;
  // комментарии
  bigPicture.querySelector(`.comments-count`).textContent = item.comments.length;
  // Создает фрагмент, для вставки комменатриев
  const fragment = document.createDocumentFragment();
  // Заполняет новые комментарии
  for (let i = 0; i < item.comments.length; i++) {
    fragment.appendChild(getSocialComment(item.comments[i]));
  }
  // Чистит блок комментариев в разметке
  socialCommentTemplate.innerHTML = ``;
  // Добавляет новые комментарии
  socialCommentTemplate.appendChild(fragment);
  // Описание фотографии
  bigPicture.querySelector(`.social__caption`).textContent = item.description;
  // return showBigPicture;
  document.querySelector(`body`).classList.add(`modal-open`);
};

const showBigPicture = function (photo, item) {
  photo.addEventListener(`click`, function () {
    getOpenBigPhoto(item);
  });
};

// Запускаем функцию открытия большой фотографии
const smallPictures = document.querySelectorAll(`.picture`);
for (let i = 0; i < smallPictures.length; i++) {
  showBigPicture(smallPictures[i], pictures[i]);
}

// открываем большую картинку
// document.querySelector(`.social__comment-count`).classList.add(`hidden`);
// скрываем счетчик комментариев
// document.querySelector(`.comments-loader`).classList.add(`hidden`);

closeBigPicture.addEventListener(`click`, function () {
  document.querySelector(`.big-picture`).classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
});

// ???
const onEscClose = function (evt) {
  if (evt.key === ESC || socialFooterText === document.activeElement) {
    document.querySelector(`.big-picture`).classList.remove(`hidden`);
  } else {
    document.querySelector(`.big-picture`).classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  }
};

document.addEventListener(`keydown`, onEscClose);
