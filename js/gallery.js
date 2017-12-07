'use strict';

(function () {
  window.picture.renderingThumbnail(window.data.getPhotoData());
  window.preview.renderBigPicture(window.data.getPhotoData());
  window.preview.addHandlerForClickOnPicture();
})();
