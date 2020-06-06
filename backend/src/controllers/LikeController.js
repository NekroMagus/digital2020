import LikeService from "../services/LikeService";
import ValidationService from "../services/ValidationService";
import ProjectService from "../services/ProjectService";
import UserService from "../services/UserService";

class LikeController {

  static async getCountLikes(req, res, next) {
    try {
      const {projectId} = req.params;
      const {isLike} = req.query;
      await ValidationService.isQueryFieldEmpty(isLike, 'isLike');
      const project = await ProjectService.findById(projectId);
      await ValidationService.isNotExists(project, 'project');
      const reputation = isLike === 'true' ? 1 : -1;
      const likes = await LikeService.countByProjectIdAndReputation(projectId, reputation);
      res.status(200).json(likes);
    } catch (e) {
      next(e);
    }
  }

  static async upsertLike(req, res, next) {
    try {
      const {projectId, isLike} = req.body;
      await ValidationService.isBodyFieldEmpty(projectId, 'projectId');
      const project = await ProjectService.findById(projectId);
      await ValidationService.isNotExists(project, 'project');
      const user = await UserService.findById(project.userId);
      await ValidationService.isNotExists(user, 'user');
      const like = await LikeService.findByUserIdAndProjectId(req.user.id, projectId);
      const body = {
        reputation: isLike ? 1 : -1,
        userId: req.user.id
      };
      if (!like) {
        body.projectId = projectId;
        await LikeService.upsertLike(body);
        await user.increment(['points'], {by: 1});
      } else {
        if (like.reputation === body.reputation) {
          return res.status(400).json({
            success: false,
            message: "You can't like/dislike 2 times"
          });
        } else {
          body.id = like.id;
          await LikeService.upsertLike(body);
        }
      }
      res.status(201).json({
        success: true,
        message: "Like created"
      });
    } catch (e) {
      next(e);
    }
  }

  static async deleteLike(req, res, next) {
    try {
      const {projectId} = req.params;
      const project = await ProjectService.findById(projectId);
      await ValidationService.isNotExists(project, 'project');
      const like = await LikeService.findByUserIdAndProjectId(req.user.id, project.id);
      await ValidationService.isNotExists(like, 'like');
      const user = await UserService.findById(project.userId);
      await ValidationService.isNotExists(user, 'user');
      await LikeService.deleteLike(like.id);
      await user.increment(['points'],{by: -1});
      res.status(200).json({
        success: true,
        message: "Like deleted"
      });
    } catch (e) {
      next(e);
    }
  }
}

export default LikeController;