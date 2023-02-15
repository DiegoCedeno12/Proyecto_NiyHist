"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = require("mongoose");
var _path = _interopRequireDefault(require("path"));
var familySchema = new _mongoose.Schema({
  id_User: {
    type: String,
    require: true
  },
  identify: {
    type: Number,
    require: true
  },
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  birth_date: {
    type: Date,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  latitude: {
    type: String,
    require: true
  },
  longitud: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  blood_type: {
    type: Number,
    require: true
  },
  disability: {
    type: Number,
    require: true
  },
  allergies: {
    type: String,
    require: true
  },
  medices: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
});
familySchema.virtual('uniqueId').get(function () {
  return this.image.replace(_path["default"].extname(this.image), '');
});
module.exports = (0, _mongoose.model)('Family', familySchema);