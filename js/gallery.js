'use strict';

(function () {
  window.picture.renderThumbnail(window.data.getPhotoData());
  window.preview.renderBigPicture(window.data.getPhotoData());
  window.preview.addHandlerForClickOnPicture();
})();
