'use strict';

(function () {
  var RANDOM_FACTOR = 0.5;
  var DEBOUNCE_TIME = 500;
  var filters = document.querySelector('.filters-inactive');
  var sorted;
  var filterTimeOut;
  var data;

  var sort = function (item) {
    var cloneData = data.slice(0);
    switch (item) {
      case 'popular':
        sorted = cloneData.sort(function (first, second) {
          return second.likes - first.likes;
        });
        break;
      case 'discussed':
        sorted = cloneData.sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
        break;
      case 'random':
        sorted = cloneData.sort(function () {
          return Math.random() - RANDOM_FACTOR;
        });
        break;
      default:
        sorted = cloneData;
    }
    window.picture.createDOMElements(sorted);
  };

  var getFilterName = function (event) {
    var filter = event.target.value;

    if (event.target.type !== 'radio') {
      return;
    }
    debouce(sort, filter);
  };

  var debouce = function (func, value) {
    if (filterTimeOut) {
      clearInterval(filterTimeOut);
    }
    filterTimeOut = setTimeout(function () {
      func(value);
    }, DEBOUNCE_TIME);
  };

  var successLoad = function (dataLoad) {
    data = dataLoad.slice(0);
    window.picture.createDOMElements(data);
    window.preview.renderBigPicture(data);
    filters.style.opacity = '1';
    filters.addEventListener('click', getFilterName);
  };

  window.backend.load(successLoad);
  window.preview.addHandlerForClickOnPicture();
})();
