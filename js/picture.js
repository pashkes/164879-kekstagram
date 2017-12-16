'use strict';

(function () {
  var thumbnail = document.querySelector('.pictures');

  var createCommentsDOM = function (comments, item) {
    for (var j = 0; j < comments.comments.length; j++) {
      var commentsElement = item.querySelectorAll('.picture-comments')[0];
      var cloneComments = commentsElement.cloneNode(true);
      cloneComments.textContent = comments.comments[j];
      item.querySelector('.picture-stats').insertBefore(cloneComments, item.querySelector('.picture-likes'));
    }
    commentsElement.remove();
  };

  window.picture = {
    createDOMElements: function (dataPhoto) {
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
