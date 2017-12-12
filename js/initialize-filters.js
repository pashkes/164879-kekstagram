'use strict';

(function () {
  var imgPreview = document.querySelector('.effect-image-preview');
  var listClass = imgPreview.classList;
  var LAST_CLASS = listClass[listClass.length - 1];

  /*

   * Выбор фильтра
   * Если нажатие вне фильтра - выйти из функции
   * Получить for для текущего элемента, убрать префикс
   * Если в изображения больше 2-х классов - удалить второй
   * Иначе добавить класс выбранного фильтра для изображения
   */
  window.initializeFilter = function (event) {
    var targetElement = event.target.closest('.upload-effect-label');
    var currentFilterName = targetElement.htmlFor.replace('upload-', '');
    if (!targetElement) {
      return;
    }
    if (imgPreview.classList.length >= 2) {
      imgPreview.classList.remove(LAST_CLASS);
    }
    imgPreview.classList.add(currentFilterName);
    resetFilter();
    if (targetElement.htmlFor === 'upload-effect-none') {
      hideSlider();
    } else {
      showSlider();
    }
  };
})();
