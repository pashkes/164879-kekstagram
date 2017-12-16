'use strict';

(function () {
  var successLoad = function (data) {
    window.picture.createDOMElements(data);
    window.preview.renderBigPicture(data);
  };

  window.backend.load(successLoad);
  window.preview.addHandlerForClickOnPicture();
})();
