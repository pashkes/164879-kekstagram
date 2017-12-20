'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var COMMENTS_CLASS = '.picture-comments';
  var LIKES_CLASS = '.picture-likes';
  var template = document.querySelector('#picture-template');
  var templateContent = template.content.querySelector('.picture');

  var createCommentsDOM = function (elements, node) {
    for (var j = 0; j < elements.comments.length; j++) {
      var commentsElement = node.querySelectorAll(COMMENTS_CLASS)[0];
      var cloneComments = commentsElement.cloneNode(true);
      cloneComments.textContent = elements.comments[j];
      node.querySelector('.picture-stats').insertBefore(cloneComments, node.querySelector(LIKES_CLASS));
    }
    commentsElement.remove();
  };

  window.picture = {
    createDOMElements: function (dataPhotos) {
      while (picturesContainer.hasChildNodes()) {
        picturesContainer.removeChild(picturesContainer.firstChild);
      }
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < dataPhotos.length; i++) {
        var itemNodeElement = templateContent.cloneNode(true);
        itemNodeElement.href = dataPhotos[i].url;
        itemNodeElement.querySelector('img').src = dataPhotos[i].url;
        itemNodeElement.querySelector(LIKES_CLASS).textContent = dataPhotos[i].likes;
        createCommentsDOM(dataPhotos[i], itemNodeElement);
        fragment.appendChild(itemNodeElement);
      }
      picturesContainer.appendChild(fragment);
    }
  };

})();
