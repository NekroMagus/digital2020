import CommentService from "../services/CommentService";
import ValidationService from "../services/ValidationService";
import ProjectService from "../services/ProjectService";

class CommentController {

  static async findAllByProjectId(req, res, next) {
    try {
      const {projectId} = req.params;
      const {limit,page} = req.query;
      const comments = await CommentService.findAllByProjectId(projectId, limit, page);
      res.status(200).json(comments);
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const {projectId, text} = req.body;
      await ValidationService.isBodyFieldEmpty(projectId, 'projectId');
      await ValidationService.isBodyFieldEmpty(text, 'text');
      const project = await ProjectService.findById(projectId);
      await ValidationService.isNotExists(project, 'project');
      const comment = await CommentService.findByUserIdAndProjectId(req.user.id, projectId);
      if (comment) {
        return res.status(409).json({
          success: false,
          message: "You already commented this project"
        });
      }
      const commentDb = await CommentService.create({text, userId: req.user.id, projectId});
      res.status(201).json(commentDb);
    } catch (e) {
      next(e);
    }
  }
}

export default CommentController;