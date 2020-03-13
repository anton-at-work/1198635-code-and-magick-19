'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var setupOpen = document.querySelector('.setup-open-icon');
  var userDialog = document.querySelector('.setup');
  var dialogHandler = userDialog.querySelector('.upload');
  var setupClose = userDialog.querySelector('.setup-close');
  var userName = userDialog.querySelector('.setup-user-name');
  var userForm = userDialog.querySelector('.setup-wizard-form');

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && evt.target !== userName) {
      closePopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    dialogHandler.addEventListener('mousedown', onMouseDown);
    userForm.addEventListener('submit', onFormSubmit);
    setupClose.addEventListener('click', closePopup);
    setupClose.addEventListener('keydown', onPopupEnterPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    dialogHandler.removeEventListener('mousedown', onMouseDown);
    userForm.removeEventListener('submit', onFormSubmit);
    setupClose.removeEventListener('click', closePopup);
    setupClose.removeEventListener('keydown', onPopupEnterPress);
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), closePopup, onError);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.dialog = {
    error: onError
  };
})();
