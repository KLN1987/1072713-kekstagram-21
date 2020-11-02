'use strict';

(function () {

  const NUMBER_LAST_PHOTO = 25;
  const NUMBER_FIRST_AVATAR = 1;
  const NUMBER_LAST_AVATAR = 6;
  const LIKE_START = 15;
  const LIKE_END = 200;
  const COUNT_OF_START_COMMENTS = 5;
  const COUNT_OF_END_COMMENTS = 150;
  const COMMETS = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];

  const NAME_AUTHORS = [`Лев`, `Александр`, `Игорь`, `Даниил`, `Владимир`, `Антон`, `Михаил`, `Екатерина`, `Варвара`, `София`];

  const DESCRIPTIONS = [`Мое лето`, `Такая милота`, `Лучшее, что я видел на земле`, `Ммм...Классно!`, `Всё отлично!`, `Люблю свою жизнь!`, `Давайте просто улыбаться!`, `Мечты сбываются!`];

  const getRandomElement = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


  const getRandomComments = function () {
    const comments = [];
    const randomCount = getRandomNumber(COUNT_OF_START_COMMENTS, COUNT_OF_END_COMMENTS);
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
        photo: `photos/${j}.jpg`,
        likes: getRandomNumber(LIKE_START, LIKE_END),
        comments: getRandomComments(),
        description: DESCRIPTIONS[getRandomElement(DESCRIPTIONS)]
      };
      pictures.push(picture);
    }
  };

  generateTestData();

  window.data = {
    pictures
  };
})();
