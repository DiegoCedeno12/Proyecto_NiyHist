"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderIndex = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Family = _interopRequireDefault(require("../models/Family"));
var renderIndex = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var families;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log(req.user.id);
          _context.next = 3;
          return _Family["default"].find({
            id_User: req.user.id
          }).sort({
            createdAt: -1
          });
        case 3:
          families = _context.sent;
          res.render("index", {
            families: families,
            PageTitle: 'Inicio'
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function renderIndex(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderIndex = renderIndex;