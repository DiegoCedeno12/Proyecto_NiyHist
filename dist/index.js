"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _server = _interopRequireDefault(require("./server"));
require("./database");
_server["default"].listen(_server["default"].get('port'), function () {
  console.log('Server on port ' + _server["default"].get('port'));
  console.log("Url http://127.0.0.1:4000");
});