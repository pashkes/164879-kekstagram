'use strict';

(function () {
  var imgPreview = document.querySelector('.effect-image-preview');

  /*
   * Выбор фильтра
   * Если нажатие вне фильтра - выйти из функции
   * Получить for для текущего элемента, убрать префикс
   * Если в изображения больше 2-х классов - удалить второй
   * Иначе добавить класс выбранного фильтра для изображения
   */
  window.initializeFilter = function (target, resetFilter, state) {
    var listClass = imgPreview.classList;
    var lastClass = listClass[listClass.length - 1];
    if (!target) {
      return;
    }
    var currentFilterName = target.htmlFor.replace('upload-', '');
    listClass.remove(lastClass);
    imgPreview.classList.add(currentFilterName);
    resetFilter();
    if (target.htmlFor === 'upload-effect-none') {
      state.hideSlider();
    } else {
      state.showSlider();
    }
  };
})();
