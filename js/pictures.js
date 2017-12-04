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
var showBigPictureWithOverlay = function (event) {
  event.preventDefault();
  var currentElement = event.target.closest('.picture');
  if (!currentElement) {
    return;
  }
  var srcPicture = currentElement.querySelector('img').src;
  var mainPicture = overlay.querySelector(OVERLAY_IMAGE_CLASS);
  var likesCount = currentElement.querySelector('.picture-likes').textContent;
  var commentCount = currentElement.querySelectorAll('.picture-comments').length;
  overlay.querySelector(OVERLAY_LIKES_COUNT).textContent = likesCount;
  mainPicture.src = srcPicture;
  overlay.querySelector(OVERLAY_COMMENTS_CLASS).textContent = commentCount.toString();
  overlay.classList.remove(HIDDEN_CLASS);
  addHandlerForClosePicture();
};

var removeOverlayClass = function () {
  overlay.classList.add(HIDDEN_CLASS);
};

/*
 * On the click event of pictures, insert data into the overlay received from the current item
 */
var addHandlerForClickOnPicture = function () {
  var container = document.querySelector('.pictures');
  container.addEventListener('click', showBigPictureWithOverlay);
};

/*
 * Check which button is pressed.
 * Closing an overlay with a picture.
 */
var checkKeyDown = function (event) {
  if ((event.keyCode === ESC_KEY) || (event.keyCode === ENTER_KEY)) {
    totalResetOnClosing();
  }
};

/*
 * If there is no class 'hidden' - add events (Click, keyDown) to the close button of the overlay and the overlay itself
 */
var addHandlerForClosePicture = function () {
  var closeButton = document.querySelector('.gallery-overlay-close');
  closeButton.addEventListener('click', removeOverlayClass);
  document.addEventListener('keydown', checkKeyDown);
};

/**
 * Добавление обработчика на изменения поля загрузки фото
 */
var addHandlerUploadPhoto = function () {
  var areaUploadPicture = document.querySelector('.upload-input');
  areaUploadPicture.addEventListener('change', showUploadOverlay);
};

/**
 * Показать попап настройки загруженного изображения
 * Добавляет хэндлеры которые нужны только внутри открытого состояния попапа
 */
var showUploadOverlay = function () {
  uploadOverlay.classList.remove(HIDDEN_CLASS);
  addHandlerForClosedState();
  addFocusHandlerCommentsField();
  addFilterSelector();
  zoomTheImage();
  addHandlerCheckValidHashTagsFocus();
  resetWhenShipped();
  checkForFormErrors();
};

var hideUploadOverlay = function () {
  uploadOverlay.classList.add(HIDDEN_CLASS);
};

/*
 * При клике на "+/-" увеличивать/уменьшать значени поля зума
 * В зависимости от значения внутри поля значения зума вызывывать функции которая присваивает картинке
 * текущее значение зума
 */
var handlerResizeButton = function (event) {
  var zoomOut = event.target.closest('.upload-resize-controls-button-dec');
  var zoomIn = event.target.closest('.upload-resize-controls-button-inc');
  var zoomValue = resizeControls.querySelector('.upload-resize-controls-value');
  var STEP_ZOOM = 25;
  var MIN_ZOOM = STEP_ZOOM;
  var MAX_ZOOM = 100;
  var currentValueZoom = parseInt(zoomValue.value, 10);
  if (zoomOut) {
    if (currentValueZoom <= MIN_ZOOM || currentValueZoom > MAX_ZOOM) {
      return;
    }
    currentValueZoom -= STEP_ZOOM;
    zoomValue.value = currentValueZoom + '%';
    setImgZoom(currentValueZoom, MAX_ZOOM);
  }
  if (zoomIn) {
    if (currentValueZoom < MIN_ZOOM || currentValueZoom >= MAX_ZOOM) {
      return;
    }
    currentValueZoom += STEP_ZOOM;
    zoomValue.value = currentValueZoom + '%';
    setImgZoom(currentValueZoom, MAX_ZOOM);
  }
};

/**
 * Добавление обработчика клика для кнопок зума
 */
var zoomTheImage = function () {
  resizeControls.addEventListener('click', handlerResizeButton);
};

/**
 * Добавление обработчика валидации хэш тегов при изменения значения
 */
var addHandlerCheckValidHashTagsFocus = function () {
  hashTagsField.addEventListener('change', checkValidHashTags);
};

/**
 * Добавление общего сброса всех полей и значения при отправке формы
 */
var resetWhenShipped = function () {
  formSubmit.addEventListener('submit', totalResetOnClosing);
};

var checkForFormErrors = function () {
  formSubmit.addEventListener('click', checkValidHashTags);
};
var renderGallery = function () {
  var photoGallery = getPhotoData();
  renderPhoto(photoGallery);
  renderPreviewPictures(photoGallery);
  addHandlerForClickOnPicture();
  addHandlerUploadPhoto();
};
renderGallery();

var uploadOverlay = document.querySelector('.upload-overlay');
var closeButton = document.querySelector('.upload-form-cancel');
var resizeControls = document.querySelector('.upload-resize-controls');
var filtersContainer = document.querySelector('.upload-effect-controls');
var hashTagsField = document.querySelector('.upload-form-hashtags');
var formSubmit = document.querySelector('.upload-form-submit');
var imgPreview = document.querySelector('.effect-image-preview');

/*
 * Добавление бработчиков которые нужны внутри попапа
 */
var addHandlerForClosedState = function () {
  closeButton.addEventListener('click', hideUploadOverlay);
  closeButton.addEventListener('keydown', hideWhenKeyDownEnter);
  document.addEventListener('keydown', hideWhenKeyDownEsc);
};

/*
 * Удаление обработчиков события для кнопки закрытия попапа и для документа
 */
var removeClickCloseUpload = function () {
  closeButton.removeEventListener('click', hideUploadOverlay);
  document.removeEventListener('keydown', hideWhenKeyDownEsc);
};

/*
 * При нажатии ескейп сбрасывать все значения, удалять обработчики которые нужны внутри попапа
 * скрывать попап
 */
var hideWhenKeyDownEsc = function (event) {
  if (event.keyCode === ESC_KEY) {
    totalResetOnClosing();
  }
};

/*
 * При нажатии ентер сбрасывать все значения, удалять обработчики которые нужны внутри попапа
  * скрывать попап
 */
var hideWhenKeyDownEnter = function (event) {
  if (event.keyCode === ENTER_KEY) {
    totalResetOnClosing();
  }
};

/**
 * Если в фокусе - удалять обработчики закрытие попапа при нажатии эскейп
 * Если вышел с фокуса добавлять этот обработчик обратно
 */
var addFocusHandlerCommentsField = function () {
  var commentsField = document.querySelector('.upload-form-description');
  commentsField.addEventListener('focus', removeClickCloseUpload);
  commentsField.addEventListener('blur', addHandlerForClosedState);
};

/*
 * Выбор фильтра
 * Если нажатие вне фильтра - выйти из функции
 * Получить for для текущего элемента, убрать префикс
 * Если в изображения больше 2-х классов - удалить второй
 * Иначе добавить класс выбранного фильтра для изображения
 */
var filterSelection = function (event) {
  var targetElement = event.target.closest('.upload-effect-label');
  if (!targetElement) {
    return;
  }
  var currentFilterName = targetElement.htmlFor.replace('upload-', '');
  if (imgPreview.classList.length >= 2) {
    imgPreview.classList.remove(imgPreview.classList[1]);
  }
  imgPreview.classList.add(currentFilterName);
};

/**
 * Добавить обработчик для выбора фильтров
 */
var addFilterSelector = function () {
  filtersContainer.addEventListener('click', filterSelection);
};

/**
 * Удаление текущего эффекта с изображения
 */
var removeFilter = function () {
  imgPreview.classList.remove(imgPreview.classList[1]);
};

/**
 * Удаление обработчика выбора фильтра
 */
var removeFilterSelector = function () {
  filtersContainer.removeEventListener('click', filterSelection);
};

/*
 * Присвоение значение зума для картинки
 */
var setImgZoom = function (value, maxValue) {
  var levelScale = value / maxValue;
  imgPreview.style.transform = 'scale(' + levelScale + ')';
};

/**
 * Сбросить зумм для картинки по умолчанию
 */
var resetZoomImgOnClosing = function () {
  imgPreview.style.transform = 'scale(1)';
};

/**
 * Сброс параметров для картинки загрузки
 * Сброс фильтра, сброс уровня увеличения, сброс
 * Удаление обработчиков событие для кнопки закрытия
 * Удаление обработчика события для выбора фильтров
 * Вызов функции закрытие попапа
 */
var totalResetOnClosing = function () {
  removeFilter();
  resetZoomImgOnClosing();
  resetValueField();
  removeClickCloseUpload();
  removeFilterSelector();
  hideUploadOverlay();
};

/*
 * Валидация списка хэш тегов
 * Если не валидно добавлять стиль ошибки полю
 * Иначе сбрасывать стиль ошибки
 */
var checkValidHashTags = function (event) {
  var hashTags = hashTagsField.value.toLowerCase().trim().split(' ').sort();
  var maxAmount = 5;
  var maxLength = 20;
  var FIRST_INDEX = 0;
  var minLength = 1;
  var resetStyleError = true;
  if (hashTags[0] === '') {
    return;
  }
  for (var i = 0; i < hashTags.length; i++) {
    if (hashTags.length > maxAmount
      || hashTags[FIRST_INDEX] === ''
      || hashTags[i][FIRST_INDEX] !== '#'
      || hashTags[i] === ' '
      || hashTags[i] === hashTags[i + 1]
      || hashTags[i].length <= minLength
      || hashTags[i].length >= maxLength) {
      addStyleErrorForField();
      event.preventDefault();
      break;
    }
    addStyleErrorForField(resetStyleError);
  }
};

/*
 * Добавление красной тени
 * Если resetStyle передан в метод сбросывать красную тень
 */
var addStyleErrorForField = function (resetStyle) {
  hashTagsField.style.boxShadow = '0 0 2px 2px red';
  if (resetStyle) {
    hashTagsField.style.boxShadow = 'none';
  }
};

/**
 * Сброс полей формы
 */
var resetValueField = function () {
  var message = document.querySelector('.upload-form-description');
  hashTagsField.value = '';
  message.value = '';
};
