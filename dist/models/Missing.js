"use strict";

var _mongoose = require("mongoose");
var missingSchema = new _mongoose.Schema({
  id_Family: {
    type: String,
    require: true
  },
  reportedDate: {
    type: Date,
    require: true
  },
  found: {
    type: Boolean,
    "default": false
  },
  timeNow: {
    type: String,
    require: true
  },
  sex: {
    type: String,
    require: true
  },
  fechaNacimiento: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  nationality: {
    type: String,
    require: true
  },
  height: {
    type: String,
    require: true
  },
  eyeColor: {
    type: String,
    require: true
  },
  hairColor: {
    type: String,
    require: true
  },
  skinColor: {
    type: String,
    require: true
  },
  shirt: {
    type: String,
    require: true
  },
  shoes: {
    type: String,
    require: true
  },
  pants: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = (0, _mongoose.model)('Missing', missingSchema);