"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderFamilyQr = exports.renderFamilyADD = exports.renderFamily = exports.familyQr = exports.familyAdd = exports.familiyDelete = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _path = _interopRequireDefault(require("path"));
var _libs = require("../helpers/libs");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _pdfkitConstruct = _interopRequireDefault(require("pdfkit-construct"));
var _fs = _interopRequireDefault(require("fs"));
var _Family = _interopRequireDefault(require("../models/Family"));
var _User = _interopRequireDefault(require("../models/User"));
var renderFamilyADD = function renderFamilyADD(req, res) {
  res.render("familyAdd", {
    PageTitle: 'Agregar Familiar'
  });
};
exports.renderFamilyADD = renderFamilyADD;
var familyAdd = function familyAdd(req, res) {
  var saveImage = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var imagUrl, images, imageTempPath, ext, targetPath, newFamily, familySaved;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            imagUrl = (0, _libs.randomNumber)();
            _context.next = 3;
            return _Family["default"].find({
              image: imagUrl
            });
          case 3:
            images = _context.sent;
            if (!(images.length > 0)) {
              _context.next = 8;
              break;
            }
            saveImage();
            _context.next = 35;
            break;
          case 8:
            _context.prev = 8;
            console.log(imagUrl);
            imageTempPath = req.file.path; //carpeta temporal donde se encuentra
            console.log(imageTempPath);
            ext = _path["default"].extname(req.file.originalname).toLocaleLowerCase(); // el tipo de formato del archivo
            targetPath = _path["default"].resolve("src/public/upload/".concat(imagUrl).concat(ext));
            if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif")) {
              _context.next = 27;
              break;
            }
            _context.next = 17;
            return _fsExtra["default"].rename(imageTempPath, targetPath);
          case 17:
            //
            newFamily = new _Family["default"]({
              id_User: req.user.id,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              image: imagUrl + ext,
              identify: req.body.identify,
              birth_date: req.body.birth_date,
              age: req.body.age,
              email: req.body.email,
              address: req.body.address,
              latitude: req.body.latitude,
              longitud: req.body.longitud,
              disability: req.body.disability,
              blood_type: req.body.blood_type,
              allergies: req.body.allergies,
              medices: req.body.medices
            });
            console.log(req.body);
            _context.next = 21;
            return newFamily.save();
          case 21:
            familySaved = _context.sent;
            console.log(familySaved);
            req.flash('success_msg', "Se agreg\xF3 ".concat(req.body.first_name.toUpperCase(), " ").concat(req.body.last_name.toUpperCase(), " como nuevo familiar"));
            res.redirect('/family');
            _context.next = 30;
            break;
          case 27:
            _context.next = 29;
            return _fsExtra["default"].unlink(imageTempPath);
          case 29:
            res.json({
              error: "El archivo que desea guardar no es una imagen"
            });
          case 30:
            _context.next = 35;
            break;
          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](8);
            res.status(500).json({
              message: 'El archivo que desea guardar no es una imagen',
              error: _context.t0
            });
          case 35:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[8, 32]]);
    }));
    return function saveImage() {
      return _ref.apply(this, arguments);
    };
  }();
  saveImage();
};
exports.familyAdd = familyAdd;
var renderFamily = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var familiares;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _Family["default"].find({
            id_User: req.user.id
          }).sort({
            createdAt: -1
          });
        case 2:
          familiares = _context2.sent;
          res.render('family', {
            familiares: familiares,
            PageTitle: 'Familias'
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function renderFamily(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.renderFamily = renderFamily;
var renderFamilyQr = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var family, userFamily;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _Family["default"].findOne({
            _id: req.params.id
          });
        case 2:
          family = _context3.sent;
          _context3.next = 5;
          return _User["default"].findOne({
            _id: family.id_User
          });
        case 5:
          userFamily = _context3.sent;
          console.log(family);
          res.render("templates", {
            family: family,
            userFamily: userFamily
          });
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function renderFamilyQr(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
exports.renderFamilyQr = renderFamilyQr;
var familiyDelete = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var family;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _Family["default"].findOne({
            _id: req.params.id
          });
        case 2:
          family = _context4.sent;
          if (!family) {
            _context4.next = 10;
            break;
          }
          _context4.next = 6;
          return _fsExtra["default"].unlink(_path["default"].resolve('./src/public/upload/' + family.image));
        case 6:
          _context4.next = 8;
          return family.remove();
        case 8:
          req.flash('success_msg', "Se elimin\xF3 el familiar ".concat(family.first_name.toUpperCase(), " ").concat(family.last_name.toUpperCase()));
          res.redirect('/family');
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function familiyDelete(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
exports.familiyDelete = familiyDelete;
var familyQr = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(res, req) {
    var family;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          family = _Family["default"].findOne({
            _id: req.params.id
          });
          console.log(family);
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function familyQr(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
exports.familyQr = familyQr;