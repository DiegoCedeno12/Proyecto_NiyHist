"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _morgan = _interopRequireDefault(require("morgan"));
var _methodOverride = _interopRequireDefault(require("method-override"));
var _multer = _interopRequireDefault(require("multer"));
var _ejsMate = _interopRequireDefault(require("ejs-mate"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var _moment = _interopRequireDefault(require("moment/moment"));
require("moment/locale/es");
require("./passport/local-auth");
var _index = _interopRequireDefault(require("./routes/index.routes"));
var _family = _interopRequireDefault(require("./routes/family.routes"));
var _missing = _interopRequireDefault(require("./routes/missing.routes"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
// without this line it didn't work
_moment["default"].locale('es');
//import "./config/passport.js";

// Initializations
var app = (0, _express["default"])();

// Settings
app.set('port', process.env.PORT || 4000);
app.set("views", _path["default"].join(__dirname, "views"));
app.engine('ejs', _ejsMate["default"]);
app.set('view engine', 'ejs');

// Middlewars
app.use((0, _morgan["default"])('dev'));
app.use((0, _multer["default"])({
  dest: _path["default"].join(__dirname, 'public/upload/temp')
}).single('image'));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _methodOverride["default"])('_method'));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: 'mysecretsession',
  resave: true,
  saveUninitialized: true
}));
app.use((0, _connectFlash["default"])());
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

// Globals variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.signupMessage = req.flash("signupMessage");
  res.locals.signinMessage = req.flash('signinMessage');
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
app.locals.timeago = function (timestamp) {
  return (0, _moment["default"])(timestamp).startOf('minute').fromNow();
};
app.locals.fechaCalculada = function (fecha) {
  var date = new Date(fecha),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, parseInt(day) + 1].join("-");
};
app.locals.generarQR = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(urlQR) {
    var QR;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return QRCode.toDataURL(urlQR);
        case 2:
          QR = _context.sent;
          console.log(QR);
          return _context.abrupt("return", QR);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

//Routs
app.use(_index["default"]);
app.use(_family["default"]);
app.use(_missing["default"]);
app.use(_authRoutes["default"]); /*
                                 app.use(notesRoutes); */

// static/files
app.use('/public', _express["default"]["static"](_path["default"].join(__dirname, 'public')));
module.exports = app;