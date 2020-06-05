import {Router} from 'express';
import LeaderController from "../controllers/LeaderController";

const router = new Router();

router.get('/users', LeaderController.getLeaderUsers);

export default router;