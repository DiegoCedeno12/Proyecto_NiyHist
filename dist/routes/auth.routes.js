"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authControllers = require("../controllers/auth.controllers.js");
var router = (0, _express.Router)();

// Routes
router.get("/signup", _authControllers.renderSignUpForm);
router.post("/signup", _authControllers.signup);
router.get('/profile', isAuthenticated, _authControllers.renderProfile);
router.put('/profile', isAuthenticated, _authControllers.profile);
router.get("/signin", _authControllers.renderSigninForm);
router.post("/signin", _authControllers.signin);
router.get("/logout", _authControllers.logout);
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}
var _default = router;
exports["default"] = _default;