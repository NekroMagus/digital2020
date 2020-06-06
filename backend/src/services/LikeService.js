import {Like} from "../models/user";

class LikeService {

  static findById(id) {
    return Like.findByPk(id);
  }

  static findByUserIdAndProjectId(userId, projectId) {
    return Like.findOne({where: {userId, projectId}});
  }

  static countByProjectIdAndReputation(projectId, reputation) {
    return Like.count({
      where: {projectId, reputation},
      distinct: true
    });
  }

  static upsertLike(body,) {
    return Like.upsert(body, {returning: true});
  }

  static deleteLike(id) {
    return Like.destroy({where: {id}});
  }

}

export default LikeService;