import {Router} from 'express';
import LeaderController from "../controllers/LeaderController";

const router = new Router();

router
    .get('/users', LeaderController.getLeaderUsers)
    .get('/projects', LeaderController.getLeaderProjects)
    .get('/vk',LeaderController.getLeaderFromVK);

export default router;