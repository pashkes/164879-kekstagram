'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var lastTimeOut;

  window.util = {
    debounce: function (func) {
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
    eventKey: {
      enter: function (event, func) {
        if (event.keyCode === ENTER_KEY) {
          func();
        }
      },
      escape: function (event, func) {
        if (event.keyCode === ESC_KEY) {
          func();
        }
      }
    }
  };
})();
