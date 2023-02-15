import { Router } from "express";
import { renderIndex } from "../controllers/index.controllers";

const router = Router();

router.get("/", isAuthenticated, renderIndex);

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

export default router;