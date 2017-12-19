'use strict';

(function () {
  var thumbnail = document.querySelector('.pictures');

  var createCommentsDOM = function (elements, node) {
    for (var j = 0; j < elements.comments.length; j++) {
      var commentsElement = node.querySelectorAll('.picture-comments')[0];
      var cloneComments = commentsElement.cloneNode(true);
      cloneComments.textContent = elements.comments[j];
      node.querySelector('.picture-stats').insertBefore(cloneComments, node.querySelector('.picture-likes'));
    }
    commentsElement.remove();
  };

  window.picture = {
    createDOMElements: function (dataPhotos) {
      while (thumbnail.hasChildNodes()) {
        thumbnail.removeChild(thumbnail.firstChild);
      }
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#picture-template');
      var templateContent = template.content.querySelector('.picture');
      for (var i = 0; i < dataPhotos.length; i++) {
        var itemNodeElement = templateContent.cloneNode(true);
        itemNodeElement.href = dataPhotos[i].url;
        itemNodeElement.querySelector('img').src = dataPhotos[i].url;
        itemNodeElement.querySelector('.picture-likes').textContent = dataPhotos[i].likes;
        createCommentsDOM(dataPhotos[i], itemNodeElement);
        fragment.appendChild(itemNodeElement);
      }
      thumbnail.appendChild(fragment);
    }
  };

})();
