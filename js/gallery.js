'use strict';

(function () {
  window.backend.load(window.picture.createDOMElements);
  window.backend.load(window.preview.renderBigPicture);
  window.preview.addHandlerForClickOnPicture();
})();
