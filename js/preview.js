'use strict';

(function () {
  var overlay = document.querySelector('.gallery-overlay');
  var previewPicture = overlay.querySelector('.gallery-overlay-image');
  var likes = overlay.querySelector('.likes-count');
  var commentsCount = overlay.querySelector('.comments-count');

  var removeOverlayClass = function () {
    overlay.classList.add(window.util.className.HIDDEN);
  };

  window.preview = {
    renderBigPicture: function (dataComments) {
      previewPicture.src = dataComments[0].url;
      likes.textContent = Math.round(window.util.getRangeRandomNumbers(15, 200)).toString();
      commentsCount.textContent = dataComments[0].comments.length.toString();
    },
    addHandlerForClickOnPicture: function () {
      var container = document.querySelector('.pictures');
      container.addEventListener('click', getDataPreview);
    }
  };

  var addHandlerForClosePicture = function () {
    var closeButton = document.querySelector('.gallery-overlay-close');
    closeButton.addEventListener('click', removeOverlayClass);
    document.addEventListener('keydown', checkKeyDown);
  };

  var getDataPreview = function (event) {
    event.preventDefault();
    var currentElement = event.target.closest('.picture');
    if (!currentElement) {
      return;
    }
    var srcPicture = currentElement.querySelector('img').src;
    var mainPicture = overlay.querySelector('.gallery-overlay-image');
    var likesCount = currentElement.querySelector('.picture-likes').textContent;
    var commentCount = currentElement.querySelectorAll('.picture-comments').length;
    overlay.querySelector('.likes-count').textContent = likesCount;
    mainPicture.src = srcPicture;
    overlay.querySelector('.comments-count').textContent = commentCount.toString();
    overlay.classList.remove(window.util.className.HIDDEN);
    addHandlerForClosePicture();
  };

  var checkKeyDown = function (event) {
    if ((event.keyCode === window.util.keyCode.ESC) || (event.keyCode === window.util.keyCode.ENTER)) {
      removeOverlayClass();
    }
  };
})();
