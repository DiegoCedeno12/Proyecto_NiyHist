"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = exports.renderSigninForm = exports.renderSignUpForm = exports.renderProfile = exports.profile = exports.logout = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _passport = _interopRequireDefault(require("passport"));
var _User = _interopRequireDefault(require("../models/User"));
var renderSignUpForm = function renderSignUpForm(req, res) {
  res.render('users/register');
};
exports.renderSignUpForm = renderSignUpForm;
var signup = _passport["default"].authenticate('local-singup', {
  successRedirect: '/signin',
  failureRedirect: '/signup',
  passReqToCallback: true
});
exports.signup = signup;
var renderSigninForm = function renderSigninForm(req, res) {
  res.render('users/login');
};
exports.renderSigninForm = renderSigninForm;
var signin = _passport["default"].authenticate('local-singin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  passReqToCallback: true
});
exports.signin = signin;
var renderProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var usersesion;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _User["default"].findOne({
            _id: req.user._id
          });
        case 2:
          usersesion = _context.sent;
          res.render('profile', {
            usersesion: usersesion,
            PageTitle: 'Perfil de Usuario'
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function renderProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderProfile = renderProfile;
var profile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, first_name_user, last_name_user, username, email, cellphone, cellphone2, address_user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, first_name_user = _req$body.first_name_user, last_name_user = _req$body.last_name_user, username = _req$body.username, email = _req$body.email, cellphone = _req$body.cellphone, cellphone2 = _req$body.cellphone2, address_user = _req$body.address_user;
          _context2.next = 3;
          return _User["default"].findByIdAndUpdate(req.user._id, {
            first_name_user: first_name_user,
            last_name_user: last_name_user,
            username: username,
            email: email,
            cellphone: cellphone,
            cellphone2: cellphone2,
            address_user: address_user
          });
        case 3:
          res.redirect('/');
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function profile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.profile = profile;
var logout = function logout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/signin');
  });
};
exports.logout = logout;