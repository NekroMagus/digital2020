import {Comment} from "../models/user";

class CommentService {

  static findByUserIdAndProjectId(userId, projectId) {
    return Comment.findOne({where: {userId, projectId}});
  }

  static findAllByProjectId(projectId, limit = 50, page = 1) {
    const offset = limit * (page - 1);
    return Comment.findAll({
      where: {projectId},
      limit,
      offset
    });
  }

  static create(body) {
    return Comment.create(body);
  }
}

export default CommentService;