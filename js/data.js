'use strict';

(function () {
  var MOCK_COMMENTS_DATA = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var GALLERY_SIZE = 26;
  var PATCH_TO_PHOTOS = 'photos/';
  var FILE_EXTENSION = '.jpg';
  var dataObjects = [];

  window.data = {
    getRangeRandomNumbers: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getPhotoData: function () {
      for (var i = 0; i < GALLERY_SIZE; i++) {
        var firstCommentIndex = window.data.getRangeRandomNumbers(0, Math.ceil(MOCK_COMMENTS_DATA.length - 1) / 2);
        var secondCommentIndex = window.data.getRangeRandomNumbers(Math.ceil((MOCK_COMMENTS_DATA.length - 1) / 2), MOCK_COMMENTS_DATA.length - 1);
        dataObjects[i] = {
          url: PATCH_TO_PHOTOS + (i + 1) + FILE_EXTENSION,
          likes: window.data.getRangeRandomNumbers(15, 200),
          commentsData: [
            MOCK_COMMENTS_DATA[firstCommentIndex],
            MOCK_COMMENTS_DATA[secondCommentIndex]
          ]
        };
      }
      return dataObjects;
    }
  };
})();
