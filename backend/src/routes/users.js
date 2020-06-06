import {Router} from 'express';
import UserController from "../controllers/UserController";

const router = new Router();

router.get('/:id', UserController.findById);

export default router;