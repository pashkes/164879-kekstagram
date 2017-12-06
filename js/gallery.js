'use strict';

(function () {
  window.picture.renderingThumbnail(window.data.getPhotoData());
  window.preview.getDataPreview(window.data.getPhotoData());
  window.preview.addHandlerForClickOnPicture();
})();
