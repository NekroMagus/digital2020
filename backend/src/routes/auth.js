import {Router} from 'express';
import AuthController from "../controllers/AuthController";

const router = new Router();

router
    .post('/', AuthController.login)
    .post('/registration', AuthController.registration)
    .post('/vk',AuthController.authVk);

export default router;