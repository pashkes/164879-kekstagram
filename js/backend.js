'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';
  var STATUS_OK = 200;
  var TIME_WAIT = 10000;

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_WAIT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };

})();
