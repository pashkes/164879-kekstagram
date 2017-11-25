'use strict';

var MOCK_COMMENTS_DATA = [
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

var getPhotoData = function () {
  var gallerySize = 26;
  var dataObjects = [];
  for (var i = 1; i < gallerySize; i++) {
    // get random MOCK_COMMENTS_DATA
    var firstCommentIndex = Math.round(getRangeRandomNumbers(0, Math.ceil(MOCK_COMMENTS_DATA.length - 1) / 2));
    var secondCommentIndex = Math.round(getRangeRandomNumbers(Math.ceil((MOCK_COMMENTS_DATA.length - 1) / 2), MOCK_COMMENTS_DATA.length - 1));
    dataObjects[i - 1] = {
      url: 'photos/' + i + '.jpg',
      likes: getRangeRandomNumbers(15, 200),
      commentsData: [
        MOCK_COMMENTS_DATA[firstCommentIndex],
        MOCK_COMMENTS_DATA[secondCommentIndex]
      ]
    };
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
    renderComments(dataPhoto[i], itemElement);
    fragment.appendChild(itemElement);
  }
  return fragment;
};

var renderComments = function (comments, item) {
  for (var j = 0; j < comments.commentsData.length; j++) {
    var commentsElement = item.querySelectorAll('.picture-comments')[0];
    var cloneComments = commentsElement.cloneNode(true);
    cloneComments.textContent = comments.commentsData[j];
    item.querySelector('.picture-stats').insertBefore(cloneComments, item.querySelector('.picture-likes'));
  }
  commentsElement.remove();
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
  var photoGallery = getPhotoData();
  renderPhoto(photoGallery);
  renderPreview(photoGallery);
};
renderGallery();
