'use strict';

var HIDDEN_CLASS = 'hidden';
var OVERLAY_CLASS = '.gallery-overlay';
var OVERLAY_IMAGE_CLASS = '.gallery-overlay-image';
var OVERLAY_COMMENTS_CLASS = '.comments-count';
var OVERLAY_LIKES_COUNT = '.likes-count';
var ESC_KEY = 27;
var ENTER_KEY = 13;
var overlay = document.querySelector(OVERLAY_CLASS);
var MOCK_COMMENTS_DATA = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

/*
 * Generating a random number in a fixed range of numbers.
 */
var getRangeRandomNumbers = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

/*
 * Generate an object based on artificial data.
 * @returns {Array}
 */
var getPhotoData = function () {
  var GALLERY_SIZE = 26;
  var dataObjects = [];
  for (var i = 0; i < GALLERY_SIZE; i++) {
    // get random MOCK_COMMENTS_DATA
    var firstCommentIndex = getRangeRandomNumbers(0, Math.ceil(MOCK_COMMENTS_DATA.length - 1) / 2);
    var secondCommentIndex = getRangeRandomNumbers(Math.ceil((MOCK_COMMENTS_DATA.length - 1) / 2), MOCK_COMMENTS_DATA.length - 1);
    dataObjects[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRangeRandomNumbers(15, 200),
      commentsData: [
        MOCK_COMMENTS_DATA[firstCommentIndex],
        MOCK_COMMENTS_DATA[secondCommentIndex]
      ]
    };
  }
  return dataObjects;
};

/*
 * Creating a fragment of HTML elements.
 * Retrieving data from an object.
 * Write data to the current NODE item.
 */
var createDOMElement = function (dataPhoto) {
  var fragment = document.createDocumentFragment();
  var templateItem = document.getElementById('picture-template').content.querySelector('.picture');
  for (var i = 0; i < dataPhoto.length; i++) {
    var itemElement = templateItem.cloneNode(true);
    itemElement.href = dataPhoto[i].url;
    itemElement.querySelector('img').src = dataPhoto[i].url;
    itemElement.querySelector('.picture-likes').textContent = dataPhoto[i].likes;
    renderComments(dataPhoto[i], itemElement);
    fragment.appendChild(itemElement);
  }
  return fragment;
};

/*
 * Rendering a comment
 * @param comments - массив данных
 * @param item - NODE элемент в котором будет отрисовка комментариев
 */
var renderComments = function (comments, item) {
  for (var j = 0; j < comments.commentsData.length; j++) {
    var commentsElement = item.querySelectorAll('.picture-comments')[0];
    var cloneComments = commentsElement.cloneNode(true);
    cloneComments.textContent = comments.commentsData[j];
    item.querySelector('.picture-stats').insertBefore(cloneComments, item.querySelector('.picture-likes'));
  }
  commentsElement.remove();
};

/*
 * Inserting an HTML snippet of items into a gallery container
 * @param dataHTML - fragment of generated HTML elements
 */
var renderPhoto = function (dataHTML) {
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(createDOMElement(dataHTML));
};

/*
 * Drawing previews of pictures from data
 */
var renderPreviewPictures = function (dataArray) {
  var bigPicture = overlay.querySelector(OVERLAY_IMAGE_CLASS);
  var likes = overlay.querySelector(OVERLAY_LIKES_COUNT);
  var commentsCount = overlay.querySelector(OVERLAY_COMMENTS_CLASS);
  bigPicture.src = dataArray[0].url;
  likes.textContent = Math.round(getRangeRandomNumbers(15, 200)).toString();
  commentsCount.textContent = dataArray[0].commentsData.length.toString();
};

/*
 * Undo the default action for the link
 * Interception of the ascent event on a link with a picture
 * Retrieving data from the element by which the click occurred
 * Set of received data in DOM overlay elements
 */
var insertCurrentContent = function (evt) {
  evt.preventDefault();
  var target = evt.target;
  var currentElement = target.closest('.picture');
  var srcPicture = currentElement.querySelector('img').src;
  var mainPicture = overlay.querySelector(OVERLAY_IMAGE_CLASS);
  var likesCount = currentElement.querySelector('.picture-likes').textContent;
  var commentCount = currentElement.querySelectorAll('.picture-comments').length;
  overlay.querySelector(OVERLAY_LIKES_COUNT).textContent = likesCount;
  mainPicture.src = srcPicture;
  overlay.querySelector(OVERLAY_COMMENTS_CLASS).textContent = commentCount.toString();
  overlay.classList.remove(HIDDEN_CLASS);
};

var removeOverlayClass = function () {
  overlay.classList.add(HIDDEN_CLASS);
};

/*
 * On the click event of pictures, insert data into the overlay received from the current item
 */
var showPicture = function () {
  var container = document.querySelector('.pictures');
  container.addEventListener('click', insertCurrentContent);
};

/*
 * Check which button is pressed.
 * Closing an overlay with a picture.
 */
var checkKeyDown = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    removeOverlayClass();
    return;
  }
  if (evt.keyCode === ENTER_KEY) {
    removeOverlayClass();
  }
};

/*
 * If there is no class 'hidden' - add events (Click, keyDown) to the close button of the overlay and the overlay itself
 */
var closePicture = function () {
  var closeButton = document.querySelector('.gallery-overlay-close');
  if (!overlay.classList.contains('hidden')) {
    return;
  }
  closeButton.addEventListener('click', removeOverlayClass);
  closeButton.addEventListener('keyDown', checkKeyDown);
  document.addEventListener('keydown', checkKeyDown);
};

var renderGallery = function () {
  var photoGallery = getPhotoData();
  renderPhoto(photoGallery);
  renderPreviewPictures(photoGallery);
  showPicture();
  closePicture();
};
renderGallery();
