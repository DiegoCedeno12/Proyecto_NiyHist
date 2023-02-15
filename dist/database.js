"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var MONGODB_URI = "mongodb+srv://admin:Armando.02@api-mongodb.mhrw02x.mongodb.net/?retryWrites=true&w=majority";
_mongoose["default"].set('strictQuery', true);
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return _mongoose["default"].connect(MONGODB_URI);
      case 3:
        console.log('Databases is connected');
        _context.next = 9;
        break;
      case 6:
        _context.prev = 6;
        _context.t0 = _context["catch"](0);
        console.error(_context.t0);
      case 9:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 6]]);
}))();