'use strict';
(function () {
  var HIDDEN_CLASS = 'hidden';
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var filtersContainer = document.querySelector('.upload-effect-controls');
  var hashTagsField = document.querySelector('.upload-form-hashtags');
  var formSubmit = document.querySelector('.upload-form-submit');
  var imgPreview = document.querySelector('.effect-image-preview');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var closeButton = document.querySelector('.upload-form-cancel');
  var zoomValue = document.querySelector('.upload-resize-controls-value');
  var resizeControls = document.querySelector('.upload-resize-controls');
  var form = document.querySelector('.upload-form');

  /**
   * Показать попап настройки загруженного изображения
   * Добавляет хэндлеры которые нужны только внутри открытого состояния попапа
   */
  var showUploadOverlay = function () {
    addHandlerForClosedState();
    addFocusHandlerCommentsField();
    addFilterSelector();
    addHandlerCheckValidHashTagsFocus();
    resetWhenShipped();
    checkForFormErrors();
    addHandlerMovePin();
    addHandlerToggleZoom();
    window.initializeScale(resizeControls, setImgZoom);
    uploadOverlay.classList.remove(HIDDEN_CLASS);
  };
  /*
   *
   * Добавление обработчика на изменения поля загрузки фото
   */
  var addHandlerUploadPhoto = function () {
    var areaUploadPicture = document.querySelector('.upload-input');
    areaUploadPicture.addEventListener('change', showUploadOverlay);
  };

  var hideUploadOverlay = function () {
    uploadOverlay.classList.add(HIDDEN_CLASS);
    resetFilter();
    removeFilter();
    totalResetOnClosing();
  };

  /*
  * Callback функция для изменение масштаба картанки
  * Присвоение значение зума для картинки
  */
  var setImgZoom = function (value) {
    var MAX_VALUE = 100;
    imgPreview.style.transform = 'scale(' + value / MAX_VALUE + ')';
  };

  var zoomToggle = function () {
    window.initializeScale(resizeControls, setImgZoom);
  };

  var addHandlerToggleZoom = function () {
    resizeControls.addEventListener('click', zoomToggle);
  };

  /**
   * Сбросить зумм для картинки по умолчанию
   */
  var resetZoomImgOnClosing = function () {
    imgPreview.style.transform = 'scale(1)';
    zoomValue.value = MAX_VALUE + '%';
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
    form.addEventListener('submit', handlerSaveData);
  };

  var checkForFormErrors = function () {
    formSubmit.addEventListener('click', checkValidHashTags);
  };

  var renderGallery = function () {
    addHandlerUploadPhoto();
  };
  renderGallery();

  /**
   * Добавление бработчиков которые нужны внутри попапа
   */
  var addHandlerForClosedState = function () {
    closeButton.addEventListener('click', hideUploadOverlay);
    closeButton.addEventListener('keydown', hideWhenKeyDownEnter);
    document.addEventListener('keydown', hideWhenKeyDownEsc);
  };

  /**
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


  /*
   * Добавить обработчик для выбора фильтров
   */
  var filterToggle = function (event) {
    var element = event.target.closest('.upload-effect-label');
    window.initializeFilter(element, resetFilter, sliderState);
  };
  var addFilterSelector = function () {
    filtersContainer.addEventListener('click', filterToggle);
  };

  /**
   * Удаление обработчика выбора фильтра
   */
  var removeFilterSelector = function () {
    filtersContainer.removeEventListener('click', filterToggle);
  };

  /**
   * Удаление текущего эффекта с изображения
   */
  var removeFilter = function () {
    var listClass = imgPreview.classList;
    var LAST_CLASS = listClass[listClass.length - 1];
    listClass.remove(LAST_CLASS);
  };

  /**
   * Сброс параметров для картинки загрузки
   * Сброс фильтра, сброс уровня увеличения, сброс
   * Удаление обработчиков событие для кнопки закрытия
   * Удаление обработчика события для выбора фильтров
   * Вызов функции закрытие попапа
   */
  var removeError = function (error) {
    var TIME_WAIT = 5000;
    setTimeout(function () {
      error.remove();
    }, TIME_WAIT);
  };

  var createErrorBlock = function (text) {
    var fragment = document.createElement('div');
    fragment.style = 'width: 300px; position: fixed; top: 50%; left: 50%; z-index: 2; text-align: center; transform: translate(-50%, -50%); min-height: 100px; padding: 20px; border-radius: 10px; background-color: #fff';
    var message = document.createElement('p');
    message.textContent = text;
    message.style.fontSize = '20px';
    message.style.fontWeight = 'bold';
    message.style.color = '#000';
    fragment.appendChild(message);
    document.body.appendChild(fragment);
    removeError(fragment);
  };

  var successFormSend = function () {
    createErrorBlock('Форма успешно отправлена');
    totalResetOnClosing();
  };

  var errorFormSend = function (message) {
    createErrorBlock(message);
  };
  var handlerSaveData = function (event) {
    event.preventDefault();
    window.backend.save(new FormData(form), successFormSend, errorFormSend);
  };

  var totalResetOnClosing = function () {
    removeFilter();
    resetZoomImgOnClosing();
    resetValueField();
    removeClickCloseUpload();
    removeFilterSelector();
    resetZoomImgOnClosing();
    hideUploadOverlay();
  };

  /*
   * Валидация списка хэш тегов
   * Если не валидно добавлять стиль ошибки полю
   * Иначе сбрасывать стиль ошибки
   */
  var checkValidHashTags = function (event) {
    var MAX_AMOUNT = 5;
    var MAX_SYMBOL = 20;
    var FIRST_INDEX = 0;
    var MIN_SYMBOL = 1;
    var hashTags = hashTagsField.value.toLowerCase().trim().split(' ').sort();
    var resetStyleError = true;
    if (hashTags[FIRST_INDEX] === '') {
      return;
    }
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags.length > MAX_AMOUNT
        || hashTags[FIRST_INDEX] === ''
        || hashTags[i][FIRST_INDEX] !== '#'
        || hashTags[i] === ' '
        || hashTags[i] === hashTags[i + 1]
        || hashTags[i].length <= MIN_SYMBOL
        || hashTags[i].length >= MAX_SYMBOL) {
        event.preventDefault();
        addStyleErrorForField();
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
    hashTagsField.style = '';
    message.value = '';
  };

  var line = document.querySelector('.upload-effect-level-line');
  var pin = line.querySelector('.upload-effect-level-pin');
  var lineValue = line.querySelector('.upload-effect-level-val');
  var sliderField = document.querySelector('.upload-effect-level-value');
  var lineContainer = document.querySelector('.upload-effect-level');
  var sliderValue = sliderField.value;
  var mainLine = document.querySelector('.upload-effect-level-val');
  var PERCENT_SYMBOL = '%';
  var MAX_VALUE = 100;
  var MIN_VALUE = 0;
  var FIELD_DEFAULT = 20;

  /*
   *
   * @param value - текущее значение поля фильтра
   * @param maxValueFilter - максимальное значение для выбранного фильтра
   * @returns {string}
   */
  var getEffectValue = function (value, maxValueFilter) {
    return (maxValueFilter - (value * maxValueFilter / MAX_VALUE)).toFixed(2);
  };

  var removeHandlerMovePin = function () {
    document.removeEventListener('mousemove', movePin);
  };

  var addHandlerMovePin = function () {
    pin.addEventListener('mousedown', addHandlerForMouse);
  };

  var addHandlerForMouse = function () {
    document.addEventListener('mousemove', movePin);
    document.addEventListener('mouseup', removeHandlerMovePin);
  };

  /*
   * Получаем стартовые координаты мыши по оси х
   * Получаем смещение пина относительно минимального значения
   * Проверяем смещение пина в диапазоне от 0 - 100
   * Применяем текущее значение пина для фото
   */
  var movePin = function (event) {
    var lineWidth = line.offsetWidth;
    var startX = event.clientX;
    var offsetLeft = mainLine.getBoundingClientRect().left;
    var shift = Math.floor((startX - offsetLeft) * MAX_VALUE / lineWidth);
    var shiftString = shift + PERCENT_SYMBOL;
    if (shift >= MAX_VALUE) {
      pin.style.lef = MAX_VALUE;
      sliderValue = MAX_VALUE;
      lineValue.style.width = MAX_VALUE;
    } else if (shift <= MIN_VALUE) {
      pin.style.left = MIN_VALUE;
      sliderValue = MIN_VALUE;
      lineValue.style.width = MIN_VALUE;
    } else {
      pin.style.left = shiftString;
      lineValue.style.width = shiftString;
      sliderValue = shift;
    }
    setFilterStyle();
  };

  var sliderState = {
    showSlider: function () {
      lineContainer.classList.remove('hidden');
    },
    hideSlider: function () {
      lineContainer.classList.add('hidden');
    }
  };

  /**
   * Проверяем наличие последнего класса в фото
   * Если совпало применять фильтры
   */
  var setFilterStyle = function () {
    var imgList = imgPreview.classList;
    var lastClass = imgList[imgList.length - 1];
    switch (lastClass) {
      case 'effect-chrome':
        imgPreview.style.filter = 'grayscale(' + getEffectValue(sliderValue, 1) + ')';
        break;
      case 'effect-sepia':
        imgPreview.style.filter = 'sepia(' + getEffectValue(sliderValue, 1) + ')';
        break;
      case 'effect-marvin':
        imgPreview.style.filter = 'invert(' + getEffectValue(sliderValue, 100) + '%)';
        break;
      case 'effect-phobos':
        imgPreview.style.filter = 'blur(' + getEffectValue(sliderValue, 3) + 'px)';
        break;
      case 'effect-heat':
        imgPreview.style.filter = 'brightness(' + getEffectValue(sliderValue, 3) + ')';
        break;
    }
  };

  /**
   * Сброс стилей фильтра для фото
   * Сброс поля значения фильтра до значение по умолчанию
   * Сброс слайдера до значения по умолчанию
   */
  var resetFilter = function () {
    imgPreview.style.filter = '';
    sliderValue = FIELD_DEFAULT;
    pin.style.left = FIELD_DEFAULT + PERCENT_SYMBOL;
    lineValue.style.width = FIELD_DEFAULT + PERCENT_SYMBOL;
  };

})();
