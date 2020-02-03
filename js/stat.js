'use strict';

window.renderStatistics = function (ctx, names, times) {
  var CLOUD_GAP = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var TEXT_GAP = 20;
  var HIISTOGRAM_HEIGHT = 150;
  var COL_WIDTH = 40;
  var COL_GAP = 50;
  var BLUE_HUE = 220;

  var renderCloud = function () {
    ctx.font = '16px PT Mono';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = 'white';
    ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = 'black';
    var firstLineY = CLOUD_Y + CLOUD_GAP + TEXT_GAP;
    ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, firstLineY);
    var secondLineY = firstLineY + TEXT_GAP;
    ctx.fillText('Список результатов: ', CLOUD_X + TEXT_GAP, secondLineY);
  };

  var getMaxValue = function (array) {
    if (array.length === 0) {
      return null;
    }
    var max = array[0];
    for (var i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  };

  var renderColumn = function (index, name, value) {
    ctx.fillStyle = 'black';
    var maxValue = getMaxValue(times);
    var nameY = CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP;
    var colHeight = Math.floor(value * HIISTOGRAM_HEIGHT / maxValue);
    var colX = CLOUD_X + (index + 1) * COL_WIDTH + index * COL_GAP;
    ctx.fillText(name, colX, nameY);

    var valueY = nameY - TEXT_GAP - CLOUD_GAP - colHeight;
    ctx.fillText(Math.floor(value), colX, valueY);

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    if (names[i] !== 'Вы') {
      var saturation = Math.floor(100 * Math.random());
      ctx.fillStyle = 'hsl(' + BLUE_HUE + ', ' + saturation + '%, 50%)';
    }
    ctx.fillRect(colX, valueY + CLOUD_GAP, COL_WIDTH, colHeight);
  };

  renderCloud();
  for (var i = 0; i < times.length; i++) {
    renderColumn(i, names[i], times[i]);
  }
};
