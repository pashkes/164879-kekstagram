'use strict';

var commentsData = [
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
    // get random commentsData
    var firstHalfComments = Math.round(getRangeRandomNumbers(0, Math.ceil(commentsData.length - 1) / 2));
    var secondHalfComments = Math.round(getRangeRandomNumbers(Math.ceil((commentsData.length - 1) / 2), commentsData.length - 1));
    dataObjects[i] = {
      url: 'photos/' + [photoStart] + '.jpg',
      likes: getRangeRandomNumbers(15, 200),
      commentsData: [
        commentsData[firstHalfComments],
        commentsData[secondHalfComments]
      ]
    };
    photoStart++;
  }
  return dataObjects;
};

var createDOMElement = function (dataPhoto) {
  var fragment = document.createDocumentFragment();
  var templateItem = document.getElementById('picture-template').content.querySelector('.picture');
  for (var i = 0; i < dataPhoto.length; i++) {
    var itemElement = templateItem.cloneNode(true);
    itemElement.href = dataPhoto[i].url;
    itemElement.querySelector('img').src = dataPhoto[i].url;
    itemElement.querySelector('.picture-likes').textContent = dataPhoto.likes;
    for (var j = 0; j < dataPhoto[i].commentsData.length; j++) {
      var commentsElement = itemElement.querySelectorAll('.picture-comments')[0];
      var cloneComments = commentsElement.cloneNode(true);
      cloneComments.textContent = dataPhoto[i].commentsData[j];
      itemElement.querySelector('.picture-stats').insertBefore(cloneComments, itemElement.querySelector('.picture-likes'));
    }
    commentsElement.remove();
    fragment.appendChild(itemElement);
  }
  return fragment;
};

var renderPhoto = function (dataHTML) {
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(createDOMElement(dataHTML));
};

var renderPreview = function (dataArray) {
  var overlay = document.querySelector('.gallery-overlay');
  var mainImage = overlay.querySelector('.gallery-overlay-image');
  var likes = overlay.querySelector('.likes-count');
  var commentsCount = overlay.querySelector('.comments-count');
  overlay.classList.remove('hidden');
  mainImage.src = dataArray[0].url;
  likes.textContent = Math.round(getRangeRandomNumbers(15, 200));
  commentsCount.textContent = dataArray[0].commentsData.length;
};

var renderGallery = function () {
  var dataGallery = createPhotoData();
  renderPhoto(dataGallery);
  renderPreview(dataGallery);
};
renderGallery();
