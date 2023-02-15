"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rendermissingAdd = exports.renderMissing = exports.missingUpdate = exports.missingAdd = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Family = _interopRequireDefault(require("../models/Family"));
var _Missing = _interopRequireDefault(require("../models/Missing"));
var renderMissing = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var familiares, desaparecidos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _Family["default"].find().sort({
            createdAt: -1
          });
        case 2:
          familiares = _context.sent;
          _context.next = 5;
          return _Missing["default"].find().sort({
            createdAt: -1
          });
        case 5:
          desaparecidos = _context.sent;
          res.render("missing", {
            familiares: familiares,
            desaparecidos: desaparecidos,
            PageTitle: 'Familiares Desaparecidos'
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function renderMissing(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderMissing = renderMissing;
var rendermissingAdd = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var missingFamily, desaparecidos;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _Family["default"].findOne({
            _id: req.params.id
          });
        case 2:
          missingFamily = _context2.sent;
          _context2.next = 5;
          return _Missing["default"].findOne({
            id_Family: req.params.id
          });
        case 5:
          desaparecidos = _context2.sent;
          res.render("missingAdd", {
            missingFamily: missingFamily,
            desaparecidos: desaparecidos,
            PageTitle: 'Reportar Familiar'
          });
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function rendermissingAdd(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.rendermissingAdd = rendermissingAdd;
var missingUpdate = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, sex, nationality, height, eyeColor, hairColor, skinColor, shirt, shoes, pants, found;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, sex = _req$body.sex, nationality = _req$body.nationality, height = _req$body.height, eyeColor = _req$body.eyeColor, hairColor = _req$body.hairColor, skinColor = _req$body.skinColor, shirt = _req$body.shirt, shoes = _req$body.shoes, pants = _req$body.pants, found = _req$body.found;
          console.log(found);
          if (!(found == 'on')) {
            _context3.next = 7;
            break;
          }
          _context3.next = 5;
          return _Missing["default"].findByIdAndUpdate(req.params.id, {
            sex: sex,
            nationality: nationality,
            height: height,
            eyeColor: eyeColor,
            hairColor: hairColor,
            skinColor: skinColor,
            shirt: shirt,
            shoes: shoes,
            pants: pants,
            found: true
          });
        case 5:
          _context3.next = 9;
          break;
        case 7:
          _context3.next = 9;
          return _Missing["default"].findByIdAndUpdate(req.params.id, {
            sex: sex,
            nationality: nationality,
            height: height,
            eyeColor: eyeColor,
            hairColor: hairColor,
            skinColor: skinColor,
            shirt: shirt,
            shoes: shoes,
            pants: pants,
            found: false
          });
        case 9:
          req.flash('success_msg', "Se Actualiz\xF3 el familiar a Desaparecidos");
          res.redirect('/family');
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function missingUpdate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.missingUpdate = missingUpdate;
var missingAdd = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var newMissing, missingSaved;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          newMissing = new _Missing["default"]({
            id_Family: req.params.id,
            reportedDate: req.body.dateNow,
            timeNow: req.body.timeNow,
            sex: req.body.sex,
            nationality: req.body.nationality,
            height: req.body.height,
            eyeColor: req.body.eyeColor,
            hairColor: req.body.hairColor,
            skinColor: req.body.skinColor,
            shirt: req.body.shirt,
            shoes: req.body.shoes,
            pants: req.body.pants
          });
          _context4.next = 3;
          return newMissing.save();
        case 3:
          missingSaved = _context4.sent;
          req.flash('success_msg', "Se agreg\xF3 el familiar a Desaparecidos");
          res.redirect('/family');
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function missingAdd(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.missingAdd = missingAdd;