import {Router} from 'express'
import ProjectController from "../controllers/ProjectController";
import passport from "passport";

const router = new Router();

router
    .get('/', passport.authenticate('jwt', {session: false}), ProjectController.findMyProjects)
    .post('/', passport.authenticate('jwt', {session: false}), ProjectController.createOrUpdate)
    .get('/:id', ProjectController.findById);

export default router;