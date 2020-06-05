import {Router} from 'express';
import ProfileController from "../controllers/ProfileController";

const router = new Router();

router
    .get('/', ProfileController.getCurrentUser)
    .put('/', ProfileController.update)
    .get('/referral', ProfileController.getReferralProfile);

export default router;