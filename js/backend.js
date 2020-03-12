'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var request = function (type, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    if (type === 'GET') {
      xhr.responseType = 'json';
    }
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(type, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      request ('GET', LOAD_URL, null, onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      request ('POST', SAVE_URL, data, onLoad, onError);
    }
  };
})();
