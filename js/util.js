'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var lastTimeOut;

  window.util = {
    getRangeRandomNumbers: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    debouce: function (func) {
      if (lastTimeOut) {
        clearInterval(lastTimeOut);
      }
      lastTimeOut = setTimeout(func, DEBOUNCE_TIME);
    },
    keyCode: {
      ESC: 27,
      ENTER: 13
    },
    className: {
      HIDDEN: 'hidden'
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.util.keyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.util.keyCode.ENTER) {
        action();
      }
    },
  };
})();
