import { Router } from "express";
import { renderMissing, rendermissingAdd, missingAdd, missingUpdate } from "../controllers/missing.controllers";

const router = Router();

router.get("/missing", isAuthenticated, renderMissing);
router.get("/missing/add/:id", isAuthenticated, rendermissingAdd);
router.put("/missing/update/:id", isAuthenticated, missingUpdate);
router.post("/missing/add/:id", isAuthenticated, missingAdd);

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

export default router;

