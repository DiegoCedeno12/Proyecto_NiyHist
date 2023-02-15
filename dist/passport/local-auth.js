"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _passport = _interopRequireDefault(require("passport"));
var _User = _interopRequireDefault(require("../models/User"));
var localStrategy = require('passport-local').Strategy;
_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});
_passport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _User["default"].findById(id);
        case 2:
          user = _context.sent;
          done(null, user);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_passport["default"].use('local-singup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, email, password, done) {
    var existeemail, existeusername, newuser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _User["default"].findOne({
            email: email
          });
        case 2:
          existeemail = _context2.sent;
          console.log(existeemail);
          console.log(req.body);
          _context2.next = 7;
          return _User["default"].findOne({
            username: req.body.username
          });
        case 7:
          existeusername = _context2.sent;
          if (!existeusername) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", done(null, false, req.flash('signupMessage', 'El nombre de Usuario ya está en uso')));
        case 12:
          if (!existeemail) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return", done(null, false, req.flash('signupMessage', 'El Correo Electronico ya está en uso')));
        case 16:
          if (!(password != req.body.confirm_password)) {
            _context2.next = 20;
            break;
          }
          return _context2.abrupt("return", done(null, false, req.flash('signupMessage', 'Las contraseñas no son iguales')));
        case 20:
          newuser = new _User["default"]();
          newuser.first_name_user = req.body.first_name_user;
          newuser.last_name_user = req.body.last_name_user;
          newuser.username = req.body.username;
          newuser.email = email;
          newuser.password = newuser.encryptPassword(password);
          newuser.confirm_password = newuser.encryptPassword(req.body.confirm_password);
          _context2.next = 29;
          return newuser.save();
        case 29:
          done(null, newuser);
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()));
_passport["default"].use('local-singin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, email, password, done) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _User["default"].findOne({
            email: email
          });
        case 2:
          user = _context3.sent;
          if (user) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", done(null, false, req.flash('signinMessage', 'Usuario no encontrado')));
        case 5:
          if (user.matchPassword(password)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", done(null, false, req.flash('signinMessage', 'Contraseña incorrecta')));
        case 7:
          done(null, user);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}()));