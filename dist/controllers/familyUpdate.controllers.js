"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderFamilyUpdate = exports.familyUpdate = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _path = _interopRequireDefault(require("path"));
var _libs = require("../helpers/libs");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var _Family = _interopRequireDefault(require("../models/Family"));
var _User = _interopRequireDefault(require("../models/User"));
var renderFamilyUpdate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var familiars;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _Family["default"].findOne({
            _id: req.params.id
          });
        case 2:
          familiars = _context.sent;
          res.render('familyUpdate', {
            familiars: familiars,
            PageTitle: 'Modificar Familiar'
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function renderFamilyUpdate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderFamilyUpdate = renderFamilyUpdate;
var familyUpdate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, identify, first_name, last_name, birth_date, age, email, address, latitude, length, blood_type, disability, allergies, medices, family, saveImage;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, identify = _req$body.identify, first_name = _req$body.first_name, last_name = _req$body.last_name, birth_date = _req$body.birth_date, age = _req$body.age, email = _req$body.email, address = _req$body.address, latitude = _req$body.latitude, length = _req$body.length, blood_type = _req$body.blood_type, disability = _req$body.disability, allergies = _req$body.allergies, medices = _req$body.medices;
          if (!req.file) {
            _context3.next = 12;
            break;
          }
          _context3.next = 4;
          return _Family["default"].findOne({
            _id: req.params.id
          });
        case 4:
          family = _context3.sent;
          if (!family) {
            _context3.next = 10;
            break;
          }
          _context3.next = 8;
          return _fsExtra["default"].unlink(_path["default"].resolve('./src/public/upload/' + family.image));
        case 8:
          saveImage = /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
              var imagUrl, images, imageTempPath, ext, targetPath;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    imagUrl = (0, _libs.randomNumber)();
                    console.log(imagUrl);
                    _context2.next = 4;
                    return _Family["default"].find({
                      image: imagUrl
                    });
                  case 4:
                    images = _context2.sent;
                    if (!(images.length > 0)) {
                      _context2.next = 9;
                      break;
                    }
                    saveImage();
                    _context2.next = 31;
                    break;
                  case 9:
                    _context2.prev = 9;
                    imageTempPath = req.file.path; //carpeta temporal donde se encuentra
                    console.log(req.file.originalname);
                    ext = _path["default"].extname(req.file.originalname).toLocaleLowerCase(); // el tipo de formato del archivo
                    console.log(imageTempPath + ext);
                    targetPath = _path["default"].resolve("src/public/upload/".concat(imagUrl).concat(ext));
                    if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif")) {
                      _context2.next = 24;
                      break;
                    }
                    _context2.next = 18;
                    return _fsExtra["default"].rename(imageTempPath, targetPath);
                  case 18:
                    _context2.next = 20;
                    return _Family["default"].findByIdAndUpdate(req.params.id, {
                      identify: identify,
                      first_name: first_name,
                      last_name: last_name,
                      birth_date: birth_date,
                      age: age,
                      email: email,
                      address: address,
                      latitude: latitude,
                      length: length,
                      blood_type: blood_type,
                      disability: disability,
                      allergies: allergies,
                      medices: medices,
                      image: imagUrl + ext
                    });
                  case 20:
                    req.flash('success_msg', "Se modific\xF3 el familiar ".concat(req.body.first_name.toUpperCase(), " ").concat(req.body.last_name.toUpperCase()));
                    res.redirect('/family');
                    _context2.next = 26;
                    break;
                  case 24:
                    _context2.next = 26;
                    return _fsExtra["default"].unlink(imageTempPath);
                  case 26:
                    _context2.next = 31;
                    break;
                  case 28:
                    _context2.prev = 28;
                    _context2.t0 = _context2["catch"](9);
                    res.status(500).json({
                      message: 'El archivo que desea guardar no es una imagen',
                      error: _context2.t0
                    });
                  case 31:
                    ;
                  case 32:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[9, 28]]);
            }));
            return function saveImage() {
              return _ref3.apply(this, arguments);
            };
          }();
          saveImage();
        case 10:
          _context3.next = 16;
          break;
        case 12:
          _context3.next = 14;
          return _Family["default"].findByIdAndUpdate(req.params.id, {
            identify: identify,
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            age: age,
            email: email,
            address: address,
            latitude: latitude,
            length: length,
            blood_type: blood_type,
            disability: disability,
            allergies: allergies,
            medices: medices
          });
        case 14:
          req.flash('success_msg', "Se modific\xF3 el familiar ".concat(req.body.first_name.toUpperCase(), " ").concat(req.body.last_name.toUpperCase()));
          res.redirect('/family');
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function familyUpdate(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.familyUpdate = familyUpdate;