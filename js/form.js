'use strict';
(function () {
  var MAX_AMOUNT = 5;
  var MAX_SYMBOL = 20;
  var PERCENT_SYMBOL = '%';
  var MAX_VALUE = 100;
  var FIELD_DEFAULT = 20;
  var form = document.querySelector('.upload-form');
  var filtersContainer = form.querySelector('.upload-effect-controls');
  var hashTagsField = form.querySelector('.upload-form-hashtags');
  var formSubmit = form.querySelector('.upload-form-submit');
  var imgPreview = form.querySelector('.effect-image-preview');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var closeButton = form.querySelector('.upload-form-cancel');
  var zoomValue = form.querySelector('.upload-resize-controls-value');
  var resizeControls = form.querySelector('.upload-resize-controls');
  var areaUploadPicture = form.querySelector('.upload-input');
  var thumbnailsFilter = form.querySelectorAll('.upload-effect-preview');
  var comment = form.querySelector('.upload-form-description');
  var line = document.querySelector('.upload-effect-level-line');
  var pin = line.querySelector('.upload-effect-level-pin');
  var lineValue = line.querySelector('.upload-effect-level-val');
  var mainLine = line.querySelector('.upload-effect-level-val');
  var lineContainer = document.querySelector('.upload-effect-level');
  var filterRadio = document.querySelector('.upload-effect-level-value');
  var resetStyleError = true;

  var formState = {
    close: function () {
      resetZoomImgOnClosing();
      removeFilter();
      resetZoomImgOnClosing();
      resetValueField();
      resetFilter();
      removeClickCloseUpload();
      removeFilterSelector();
      uploadOverlay.classList.add(window.util.className.HIDDEN);
      addStyleErrorForField(resetStyleError);
    },
    open: function () {
      addHandlerForClosedState();
      setSelectedPicture();
      addFocusHandlerCommentsField();
      addFilterSelector();
      addHandlerCheckValidHashTagsFocus();
      saveDataForm();
      checkForFormErrors();
      sliderState.hideSlider();
      uploadOverlay.classList.remove(window.util.className.HIDDEN);
    }
  };

  /*
   * Добавление обработчика на изменения поля загрузки фото
   */
  var addHandlerUploadPhoto = function () {
    areaUploadPicture.addEventListener('change', formState.open);
  };

  /*
  * Callback функция для изменение масштаба картанки
  * Присвоение значение зума для картинки
  */
  var setImgZoom = function (value) {
    imgPreview.style.transform = 'scale(' + value / MAX_VALUE + ')';
  };

  var renderGallery = function () {
    addHandlerUploadPhoto();
    window.initializeScale(resizeControls, setImgZoom);
  };
  renderGallery();


  var setSelectedPicture = function () {
    var srcSelectImg = window.URL.createObjectURL(areaUploadPicture.files[0]);
    imgPreview.src = srcSelectImg;
    for (var i = 0; i < thumbnailsFilter.length; i++) {
      thumbnailsFilter[i].style.backgroundImage = 'url(' + srcSelectImg + ')';
    }
  };

  /*
  * Сбросить зумм для картинки по умолчанию
  */
  var resetZoomImgOnClosing = function () {
    imgPreview.style.transform = 'scale(1)';
    zoomValue.value = MAX_VALUE + '%';
  };

  /*
   * Добавление обработчика валидации хэш тегов при изменения значения
   */
  var addHandlerCheckValidHashTagsFocus = function () {
    hashTagsField.addEventListener('change', checkValidHashTags);
  };

  /*
   * Добавление общего сброса всех полей и значения при отправке формы
   */
  var saveDataForm = function () {
    form.addEventListener('submit', sendDataForm);
  };

  var checkForFormErrors = function () {
    formSubmit.addEventListener('click', checkValidHashTags);
  };

  /*
   * Добавление бработчиков которые нужны внутри попапа
   */
  var addHandlerForClosedState = function () {
    closeButton.addEventListener('click', formState.close);
    closeButton.addEventListener('keydown', hideWhenKeyDownEnter);
    document.addEventListener('keydown', hideWhenKeyDownEsc);
  };

  /*
   * Удаление обработчиков события для кнопки закрытия попапа и для документа
   */
  var removeClickCloseUpload = function () {
    closeButton.removeEventListener('click', formState.close);
    document.removeEventListener('keydown', hideWhenKeyDownEsc);
  };

  /*
   * При нажатии ескейп сбрасывать все значения, удалять обработчики которые нужны внутри попапа
   * скрывать попап
   */
  var hideWhenKeyDownEsc = function (evt) {
    window.util.eventKey.escape(evt, formState.close);
  };

  /*
   * При нажатии ентер сбрасывать все значения, удалять обработчики которые нужны внутри попапа
   * скрывать попап
   */
  var hideWhenKeyDownEnter = function (evt) {
    window.util.eventKey.enter(evt, formState.close);
  };

  /*
   * Если в фокусе - удалять обработчики закрытие попапа при нажатии эскейп
   * Если вышел с фокуса добавлять этот обработчик обратно
   */
  var addFocusHandlerCommentsField = function () {
    var commentsField = document.querySelector('.upload-form-description');
    commentsField.addEventListener('focus', removeClickCloseUpload);
    commentsField.addEventListener('blur', addHandlerForClosedState);
  };

  /*
   * Добавить обработчик для выбора фильтров
   */
  var filterSwitching = function (evt) {
    var element = evt.target.closest('.upload-effect-label');
    window.initializeFilter(element, resetFilter, sliderState);
  };
  var addFilterSelector = function () {
    filtersContainer.addEventListener('click', filterSwitching);
  };

  /*
   * Удаление обработчика выбора фильтра
   */
  var removeFilterSelector = function () {
    filtersContainer.removeEventListener('click', filterSwitching);
  };

  /*
   * Удаление текущего эффекта с изображения
   */
  var removeFilter = function () {
    var listClass = imgPreview.classList;
    var LAST_CLASS = listClass[listClass.length - 1];
    listClass.remove(LAST_CLASS);
  };

  /*
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
    formState.close();
  };

  var errorFormSend = function (message) {
    createErrorBlock(message);
  };

  var sendDataForm = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successFormSend, errorFormSend);
  };
  var hashTags;
  var errorBlock = form.querySelector('.error-messages');
  var checkValidHashTags = function (evt) {
    hashTags = hashTagsField.value.toLowerCase().trim().split(' ').sort();
    if (hashTags[0] === '') {
      addStyleErrorForField(resetStyleError);
      return;
    }
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i][0] !== '#') {
        evt.preventDefault();
        errorBlock.textContent = 'Хэш тег должен начинатся с символа "#"';
        addStyleErrorForField();
        break;
      } else if (hashTags[i].length <= 1) {
        evt.preventDefault();
        errorBlock.textContent = 'Минимальное количество символов в хэш теге 1';
        addStyleErrorForField();
        break;
      } else if (hashTags[i].length >= MAX_SYMBOL) {
        evt.preventDefault();
        errorBlock.textContent = 'максимальная длина одного хэш-тега ' + MAX_SYMBOL + ' символов';
        addStyleErrorForField();
        break;
      } else if (hashTags[i] === hashTags[i + 1]) {
        evt.preventDefault();
        errorBlock.textContent = 'Один и тот же хэш-тег не может быть использован дважды';
        addStyleErrorForField();
        break;
      } else if (hashTags.length > MAX_AMOUNT) {
        evt.preventDefault();
        errorBlock.textContent = 'нельзя указать больше ' + MAX_AMOUNT + ' хэш-тегов';
        addStyleErrorForField();
        break;
      }
      addStyleErrorForField(resetStyleError);
    }

  };

  var addStyleErrorForField = function (resetStyle) {
    var defaultValue = 'none';
    hashTagsField.style.boxShadow = '0 0 2px 2px red';
    if (resetStyle) {
      hashTagsField.style.boxShadow = defaultValue;
      errorBlock.textContent = '';
    }
  };

  var resetValueField = function () {
    hashTagsField.value = '';
    hashTagsField.style = '';
    comment.value = '';
  };

  var getEffectValue = function (value, maxValueFilter) {
    var outputValue = maxValueFilter - (value * maxValueFilter / MAX_VALUE);
    return outputValue.toFixed(2);
  };

  var addHandlerMouseDown = function () {
    pin.addEventListener('mousedown', addHandlerMovePin);
    pin.addEventListener('touchstart', addHandlerMovePin);
  };

  var onLineOver = function () {
    lineContainer.addEventListener('click', movePin);
  };

  var removeLineOver = function () {
    lineContainer.removeEventListener('click', movePin);
  };

  var addHandlerClickMouse = function () {
    lineContainer.addEventListener('mouseover', onLineOver);
    lineContainer.addEventListener('mouseout', removeLineOver);
  };

  var removeHandlerClickMouse = function () {
    lineContainer.removeEventListener('mouseover', onLineOver);
    lineContainer.removeEventListener('mouseout', removeLineOver);
  };

  var addHandlerMovePin = function () {
    document.addEventListener('mousemove', movePin);
    document.addEventListener('touchmove', movePin);
    document.addEventListener('mouseup', removeHandlerMovePin);
    document.addEventListener('touchend', removeHandlerMovePin);
  };

  var removeHandlerMovePin = function () {
    document.removeEventListener('mousemove', movePin);
    document.removeEventListener('touchmove', movePin);
  };

  var removeHandlerMouseDown = function () {
    document.removeEventListener('mousedown', addHandlerMovePin);
    pin.addEventListener('touchstart', addHandlerMovePin);
  };


  /*
   * Получаем стартовые координаты мыши по оси х
   * Получаем смещение пина относительно минимального значения
   * Проверяем смещение пина в диапазоне от 0 - 100
   * Применяем текущее значение пина для фото
   */
  var movePin = function (evt) {
    var lineWidth = line.offsetWidth;
    var startX;
    if (evt.changedTouches) {
      startX = evt.changedTouches[0].clientX;
    } else {
      startX = evt.clientX;
    }
    var offsetLeft = mainLine.getBoundingClientRect().left;
    var shift = Math.floor((startX - offsetLeft) * MAX_VALUE / lineWidth);
    var shiftString = shift + PERCENT_SYMBOL;
    if (shift >= MAX_VALUE) {
      pin.style.lef = MAX_VALUE;
      lineValue.style.width = MAX_VALUE;
    } else if (shift <= 0) {
      pin.style.left = 0;
      lineValue.style.width = 0;
    } else {
      pin.style.left = shiftString;
      lineValue.style.width = shiftString;
      filterRadio.value = shift;
    }
    setFilterStyle();
  };

  var sliderState = {
    showSlider: function () {
      addHandlerMouseDown();
      addHandlerClickMouse();
      lineContainer.classList.remove(window.util.className.HIDDEN);
    },
    hideSlider: function () {
      removeHandlerMouseDown();
      removeHandlerClickMouse();
      resetFilter();
      lineContainer.classList.add(window.util.className.HIDDEN);
    }
  };

  /*
   * Проверяем наличие последнего класса в фото
   * Если совпало применять фильтры
   */
  var setFilterStyle = function () {
    var imgList = imgPreview.classList;
    var lastClass = imgList[imgList.length - 1];
    switch (lastClass) {
      case 'effect-chrome':
        imgPreview.style.filter = 'grayscale(' + getEffectValue(filterRadio.value, 1) + ')';
        break;
      case 'effect-sepia':
        imgPreview.style.filter = 'sepia(' + getEffectValue(filterRadio.value, 1) + ')';
        break;
      case 'effect-marvin':
        imgPreview.style.filter = 'invert(' + getEffectValue(filterRadio.value, 100) + '%)';
        break;
      case 'effect-phobos':
        imgPreview.style.filter = 'blur(' + getEffectValue(filterRadio.value, 3) + 'px)';
        break;
      case 'effect-heat':
        imgPreview.style.filter = 'brightness(' + getEffectValue(filterRadio.value, 3) + ')';
        break;
      default:
        break;
    }
  };

  /*
   * Сброс стилей фильтра для фото
   * Сброс поля значения фильтра до значение по умолчанию
   * Сброс слайдера до значения по умолчанию
   */
  var resetFilter = function () {
    imgPreview.style.filter = '';
    filterRadio.value = FIELD_DEFAULT;
    pin.style.left = FIELD_DEFAULT + PERCENT_SYMBOL;
    lineValue.style.width = FIELD_DEFAULT + PERCENT_SYMBOL;
  };

})();
