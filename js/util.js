'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var lastTimeOut;

  window.util = {
    debounc: function (func) {
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
        if (event.keyCode === window.util.keyCode.ENTER) {
          func();
        }
      },
      esc: function (event, func) {
        if (event.keyCode === window.util.keyCode.ESC) {
          func();
        }
      }
    }
  };
})();
