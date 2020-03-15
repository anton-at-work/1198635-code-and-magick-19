'use strict';

(function () {
  var coatColor = document.querySelector('input[name=coat-color]').value;
  var eyesColor = document.querySelector('input[name=eyes-color]').valuel;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function () {
    window.setup.addWizards(wizards.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        }
        return rankDiff;
      }));
  };

  window.setup.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.setup.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onSuccess = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onSuccess, window.dialog.error);
})();
