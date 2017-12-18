'use strict';

(function () {
  var thumbnail = document.querySelector('.pictures');

  var createCommentsDOM = function (element, node) {
    for (var j = 0; j < element.comments.length; j++) {
      var commentsElement = node.querySelectorAll('.picture-comments')[0];
      var cloneComments = commentsElement.cloneNode(true);
      cloneComments.textContent = element.comments[j];
      node.querySelector('.picture-stats').insertBefore(cloneComments, node.querySelector('.picture-likes'));
    }
    commentsElement.remove();
  };

  window.picture = {
    createDOMElements: function (dataPhoto) {
      while (thumbnail.hasChildNodes()) {
        thumbnail.removeChild(thumbnail.firstChild);
      }
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#picture-template');
      var templateContent = template.content.querySelector('.picture');
      for (var i = 0; i < dataPhoto.length; i++) {
        var itemNodeElement = templateContent.cloneNode(true);
        itemNodeElement.href = dataPhoto[i].url;
        itemNodeElement.querySelector('img').src = dataPhoto[i].url;
        itemNodeElement.querySelector('.picture-likes').textContent = dataPhoto[i].likes;
        createCommentsDOM(dataPhoto[i], itemNodeElement);
        fragment.appendChild(itemNodeElement);
      }
      thumbnail.appendChild(fragment);
    }
  };

})();
