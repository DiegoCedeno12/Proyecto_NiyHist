"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = require("passport-local");
var _User = _interopRequireDefault(require("../models/User.js"));
_passport["default"].use(new _passportLocal.Strategy({
  usernameField: "email"
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, password, done) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _User["default"].findOne({
            email: email
          });
        case 2:
          user = _context.sent;
          if (user) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", done(null, false, {
            message: "Not User found."
          }));
        case 5:
          _context.next = 7;
          return user.matchPassword(password);
        case 7:
          isMatch = _context.sent;
          if (isMatch) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", done(null, false, {
            message: "Incorrect Password."
          }));
        case 10:
          return _context.abrupt("return", done(null, user));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));
_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});
_passport["default"].deserializeUser(function (id, done) {
  _User["default"].findById(id, function (err, user) {
    done(err, user);
  });
});