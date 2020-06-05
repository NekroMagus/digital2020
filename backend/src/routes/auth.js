import {Router} from 'express';
import AuthController from "../controllers/AuthController";

const router = new Router();

router.post('/', AuthController.login);
router.post('/registration', AuthController.registration);

export default router;