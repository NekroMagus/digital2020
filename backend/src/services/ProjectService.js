import {Like, Project} from "../models/user";
import sequelize from "../config/database";

class ProjectService {

  static findById(id) {
    return Project.findByPk(id);
  }

  static findAllMy(userId, limit = 10, page = 1) {
    const offset = limit * (page - 1);
    return Project.findAll({
      where: {userId},
      limit,
      offset
    });
  }

  static findLeadersProjects() {
    return Project.findAll({
      attributes: {
        include: [[sequelize.fn("COUNT", sequelize.col("likes.reputation")), "totalLikes"]]
      },
      include: [{
        model: Like,
        where: {reputation: 1},
        attributes: [],
      }],
        group: ['projects.id', ]

    })
  }

  static create(body) {
    return Project.create(body);
  }

  static update(id, body) {
    return Project.update(body, {
      where: {id},
    })
  }
}

export default ProjectService;