"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlCv = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _qrcode = _interopRequireDefault(require("qrcode"));
var urlCv = '';
exports.urlCv = urlCv;
var run = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var QR, imagen;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _qrcode["default"].toDataURL(urlCv);
        case 2:
          QR = _context.sent;
          imagen = "\n    <img src=\"".concat(QR, "\">");
          _fs["default"].writeFileSync('./index.html', imagen);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function run() {
    return _ref.apply(this, arguments);
  };
}();