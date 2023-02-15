"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _missing = require("../controllers/missing.controllers");
var router = (0, _express.Router)();
router.get("/missing", isAuthenticated, _missing.renderMissing);
router.get("/missing/add/:id", isAuthenticated, _missing.rendermissingAdd);
router.put("/missing/update/:id", isAuthenticated, _missing.missingUpdate);
router.post("/missing/add/:id", isAuthenticated, _missing.missingAdd);
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}
var _default = router;
exports["default"] = _default;