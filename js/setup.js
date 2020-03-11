'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARDS = 4;


  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomElement = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  var getNewElement = function (oldElement, array) {
    var newElement = getRandomElement(array);
    while (newElement === oldElement) {
      newElement = getRandomElement(array);
    }
    return newElement;
  };

  var makeWizards = function () {
    var wizards = [];
    for (var i = 0; i < MAX_WIZARDS; i++) {
      wizards.push({
        name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
        coatColor: getRandomElement(WIZARD_COATS),
        eyesColor: getRandomElement(WIZARD_EYES)
      });
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var addWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    var similarListElement = userDialog.querySelector('.setup-similar-list');
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var userDialog = document.querySelector('.setup');

  var userFireBall = document.querySelector('.setup-fireball-wrap');
  var userCoat = document.querySelector('.setup-wizard .wizard-coat');
  var userEyes = document.querySelector('.setup-wizard .wizard-eyes');

  addWizards(makeWizards());

  userCoat.addEventListener('click', function () {
    var userCoatInput = document.querySelector('input[name=coat-color]');
    var coatColor = getNewElement(userCoatInput.value, WIZARD_COATS);
    userCoat.style.fill = coatColor;
    userCoatInput.value = coatColor;
  });

  userEyes.addEventListener('click', function () {
    var eyesColorInput = document.querySelector('input[name=eyes-color]');
    var eyesColor = getNewElement(eyesColorInput.value, WIZARD_EYES);
    userEyes.style.fill = eyesColor;
    eyesColorInput.value = eyesColor;
  });

  userFireBall.addEventListener('click', function () {
    var fireBallColorInput = document.querySelector('input[name=fireball-color]');
    var fireBallColor = getNewElement(fireBallColorInput.value, WIZARD_FIREBALLS);
    userFireBall.style.backgroundColor = fireBallColor;
    fireBallColorInput.value = fireBallColor;
  });


})();
