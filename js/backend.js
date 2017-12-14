'use strict';

(function () {
  var URL = 'https://1510.dump.academy/kekstagram/data';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);
      xhr.send();
      xhr.addEventListener('load', function () {
        return xhr.response;
      });
    },
    save: function (data, onLoad, onError) {

    }
  };
  console.log(window.backend.load());
})();
