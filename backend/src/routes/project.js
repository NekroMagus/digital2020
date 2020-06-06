import {Router} from 'express'
import ProjectController from "../controllers/ProjectController";
import passport from "passport";
import LikeController from "../controllers/LikeController";
import CommentController from "../controllers/CommentController";

const router = new Router();

router
    .get('/', passport.authenticate('jwt', {session: false}), ProjectController.findMyProjects)
    .post('/', passport.authenticate('jwt', {session: false}), ProjectController.createOrUpdate)
    .get('/:id', ProjectController.findById);

router
    .get('/like/:projectId', LikeController.getCountLikes)
    .post('/like', passport.authenticate('jwt', {session: false}), LikeController.upsertLike)
    .delete('/like/:projectId', passport.authenticate('jwt', {session: false}), LikeController.deleteLike);

router
    .post('/comment', passport.authenticate('jwt', {session: false}), CommentController.create);

export default router;