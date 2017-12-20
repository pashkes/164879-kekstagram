'use strict';

(function () {
  var RANDOM_FACTOR = 0.5;

  var VISIBILITY = '1';
  var filters = document.querySelector('.filters-inactive');
  var sorted;
  var data;
  var filterOnClick;

  var doSorting = function () {
    var cloneData = data.slice(0);
    switch (filterOnClick) {
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
    filterOnClick = event.target.value;
    if (event.target.type !== 'radio') {
      return;
    }
    window.util.debounce(doSorting);
  };

  var successLoad = function (dataLoad) {
    data = dataLoad.slice(0);
    filters.style.opacity = VISIBILITY;
    window.picture.createDOMElements(data);
    filters.addEventListener('click', getFilterName);
  };

  window.backend.load(successLoad);
  window.preview.addHandlerForClickOnPicture();
})();
