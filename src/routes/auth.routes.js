import { Router } from "express";
import {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  renderProfile,
  profile,
  logout,
} from "../controllers/auth.controllers.js";

const router = Router();

// Routes
router.get("/signup", renderSignUpForm);

router.post("/signup", signup);

router.get('/profile', isAuthenticated, renderProfile);

router.put('/profile', isAuthenticated, profile);

router.get("/signin", renderSigninForm);

router.post("/signin", signin);

router.get("/logout", logout);

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/signin');
}

export default router;