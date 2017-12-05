'use strict';

(function () {
  /*
   * Создание дом нод для списка комментариев
   */
  var commentsDOMCreate = function (comments, item) {
    for (var j = 0; j < comments.commentsData.length; j++) {
      var commentsElement = item.querySelectorAll('.picture-comments')[0];
      var cloneComments = commentsElement.cloneNode(true);
      cloneComments.textContent = comments.commentsData[j];
      item.querySelector('.picture-stats').insertBefore(cloneComments, item.querySelector('.picture-likes'));
    }
    commentsElement.remove();
  };
  /*
   * Создание миниатюр для галереи
   */
  var createDOMElements = function (dataPhoto) {
    var fragment = document.createDocumentFragment();
    var templateItem = document.getElementById('picture-template').content.querySelector('.picture');
    for (var i = 0; i < dataPhoto.length; i++) {
      var itemElement = templateItem.cloneNode(true);
      itemElement.href = dataPhoto[i].url;
      itemElement.querySelector('img').src = dataPhoto[i].url;
      itemElement.querySelector('.picture-likes').textContent = dataPhoto[i].likes;
      commentsDOMCreate(dataPhoto[i], itemElement);
      fragment.appendChild(itemElement);
    }
    return fragment;
  };
  var renderPreview = function (dataHTML) {
    var pictures = document.querySelector('.pictures');
    pictures.appendChild(createDOMElements(dataHTML));
  };
  renderPreview(window.data.getPhotoData());
})();
