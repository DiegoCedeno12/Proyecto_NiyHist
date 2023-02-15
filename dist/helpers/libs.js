"use strict";

var helpers = {};
helpers.randomNumber = function () {
  var posible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var randomSerial = '';
  for (var i = 0; i < 6; i++) {
    randomSerial += posible.charAt(Math.floor(Math.random() * posible.length));
  }
  return randomSerial;
};
module.exports = helpers;