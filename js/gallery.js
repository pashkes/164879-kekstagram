'use strict';

(function () {
  window.picture.renderThumbnail();
  window.preview.renderBigPicture(window.data.getPhotoData());
  window.preview.addHandlerForClickOnPicture();
})();
