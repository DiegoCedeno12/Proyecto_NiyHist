import { Router } from "express";
import { renderFamilyADD, renderFamily, familyAdd, familiyDelete, renderFamilyQr,  } from "../controllers/family.controllers";
import {renderFamilyUpdate, familyUpdate} from '../controllers/familyUpdate.controllers'

import Family from '../models/Family';

const router = Router();

router.get("/family/add", isAuthenticated, renderFamilyADD);
router.post("/family/add", isAuthenticated, familyAdd);
router.get('/family', isAuthenticated,  renderFamily);
router.get('/family/view/:id', renderFamilyQr);
router.get('/family/update/:id', isAuthenticated, renderFamilyUpdate);
router.put('/family/update/:id', isAuthenticated, familyUpdate);
router.get('/family/delete/:id', isAuthenticated, familiyDelete);
router.get('/family/Qr/Reported/:id/response', );

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

export default router;