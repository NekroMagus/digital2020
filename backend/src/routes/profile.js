import {Router} from 'express';
import ProfileController from "../controllers/ProfileController";

const router = new Router();

router
    .get('/', ProfileController.getCurrentUser)
    .put('/', ProfileController.update)
    .get('/referral', ProfileController.getReferralProfile)
    .get('/telegram', ProfileController.getUserByTelegramId)
    .put('/telegram', ProfileController.updateTelegramId);

export default router;