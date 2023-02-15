"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _family = require("../controllers/family.controllers");
var _familyUpdate = require("../controllers/familyUpdate.controllers");
var _Family = _interopRequireDefault(require("../models/Family"));
var router = (0, _express.Router)();
router.get("/family/add", isAuthenticated, _family.renderFamilyADD);
router.post("/family/add", isAuthenticated, _family.familyAdd);
router.get('/family', isAuthenticated, _family.renderFamily);
router.get('/family/view/:id', _family.renderFamilyQr);
router.get('/family/update/:id', isAuthenticated, _familyUpdate.renderFamilyUpdate);
router.put('/family/update/:id', isAuthenticated, _familyUpdate.familyUpdate);
router.get('/family/delete/:id', isAuthenticated, _family.familiyDelete);
router.get('/family/Qr/Reported/:id/response');
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}
var _default = router;
exports["default"] = _default;