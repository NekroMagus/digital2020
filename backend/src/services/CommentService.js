import {Comment} from "../models/user";

class CommentService {

  static findByUserIdAndProjectId(userId, projectId) {
    return Comment.findOne({where:{userId, projectId}});
  }

  static create(body) {
    return Comment.create(body);
  }
}

export default CommentService;