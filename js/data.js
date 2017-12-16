'use strict';

(function () {
  window.data = {
    getRangeRandomNumbers: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  };
})();
