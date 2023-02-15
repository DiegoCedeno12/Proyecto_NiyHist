"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _index = require("../controllers/index.controllers");
var router = (0, _express.Router)();
router.get("/", isAuthenticated, _index.renderIndex);
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}
var _default = router;
exports["default"] = _default;