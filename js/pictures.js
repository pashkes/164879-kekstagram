'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var getRangeRandomNumbers = function (min, max) {
  return Math.random() * (max - min) + min;
};

var createPhotoData = function () {
  var quantityObject = 25;
  var dataObjects = [];
  var photoStart = 1;
  for (var i = 0; i < quantityObject; i++) {
    // get random comments
    var firstHalfComments = Math.round(getRangeRandomNumbers(0, Math.ceil(comments.length - 1) / 2));
    var secondHalfComments = Math.round(getRangeRandomNumbers(Math.ceil((comments.length - 1) / 2), comments.length - 1));
    dataObjects[i] = {
      url: 'photos/' + [photoStart] + '.jpg',
      likes: Math.round(getRangeRandomNumbers(15, 200)),
      comments: [
        comments[firstHalfComments],
        comments[secondHalfComments]
      ]
    };
    photoStart++;
  }
  return dataObjects;
};

var data = createPhotoData();

var createDOMElement = function (dataPhoto) {
  var templateItem = document.getElementById('picture-template').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var itemElement = templateItem.cloneNode(true);
  itemElement.href = dataPhoto.url;
  itemElement.querySelector('img').src = dataPhoto.url;
  itemElement.querySelector('.picture-likes').textContent = dataPhoto.likes;
  for (var j = 0; j < dataPhoto.comments.length; j++) {
    var cloneComments = itemElement.querySelector('.picture-comments').cloneNode(true);
    cloneComments.textContent = dataPhoto.comments[j];
    itemElement.querySelector('.picture-stats').insertBefore(cloneComments, itemElement.querySelector('.picture-likes'));
  }
  fragment.appendChild(itemElement);
  return fragment;
};

var renderPhoto = function () {
  for (var i = 0; i < data.length; i++) {
    createDOMElement(data[i]);
  }
};

console.log(renderPhoto());
