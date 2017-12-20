'use strict';

(function () {
  var overlay = document.querySelector('.gallery-overlay');
  var previewPicture = overlay.querySelector('.gallery-overlay-image');
  var likes = overlay.querySelector('.likes-count');
  var closeButton = overlay.querySelector('.gallery-overlay-close');
  var commentsCount = overlay.querySelector('.comments-count');
  var pictures = document.querySelector('.pictures');

  var openPopup = function () {
    overlay.classList.remove(window.util.className.HIDDEN);
    addHandlerForClosePicture();
  };

  var closePopup = function () {
    overlay.classList.add(window.util.className.HIDDEN);
    removeHandlerForClosePicture();
  };


  var addHandlerForClosePicture = function () {
    closeButton.addEventListener('click', closePopup);
    closeButton.addEventListener('keydown', closeOnEnter);
    document.addEventListener('keydown', closeOnEsc);
  };
  var removeHandlerForClosePicture = function () {
    closeButton.removeEventListener('click', closePopup);
    closeButton.removeEventListener('keydown', closeOnEnter);
    document.removeEventListener('keydown', closeOnEsc);
  };

  var closeOnEsc = function (event) {
    window.util.eventKey.esc(event, closePopup);
  };

  var closeOnEnter = function (event) {
    window.util.eventKey.enter(event, closePopup);
  };

  var getDataPreview = function (event) {
    event.preventDefault();
    var target = event.target.closest('.picture');
    if (!target) {
      return;
    }
    var srcPicture = target.querySelector('img').src;
    var likesCount = target.querySelector('.picture-likes').textContent;
    var commentCount = target.querySelectorAll('.picture-comments').length;
    likes.textContent = likesCount;
    previewPicture.src = srcPicture;
    commentsCount.textContent = commentCount;
    overlay.classList.remove(window.util.className.HIDDEN);
    openPopup();
  };

  window.preview = {
    addHandlerForClickOnPicture: function () {
      pictures.addEventListener('click', getDataPreview);
    }
  };

})();
