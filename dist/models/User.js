"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = require("mongoose");
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var userSchema = new _mongoose.Schema({
  first_name_user: {
    type: String,
    require: true
  },
  last_name_user: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  cellphone: {
    type: String,
    require: true
  },
  cellphone2: {
    type: String,
    require: true
  },
  address_user: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  confirm_password: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
});
userSchema.methods.encryptPassword = function (password) {
  return _bcryptNodejs["default"].hashSync(password, _bcryptNodejs["default"].genSaltSync(10));
};
userSchema.methods.matchPassword = function (password) {
  return _bcryptNodejs["default"].compareSync(password, this.password);
};
module.exports = (0, _mongoose.model)('User', userSchema);