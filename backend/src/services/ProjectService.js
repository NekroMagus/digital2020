import {Project} from "../models/user";

class ProjectService {

  static findById(id) {
    return Project.findByPk(id);
  }

  static findAllMy(userId, limit = 10, page = 1) {
    const offset = limit * (page - 1);
    return Project.findAll({
      where:{userId},
      limit,
      offset
    });
  }

  static create(body) {
    return Project.create(body);
  }

  static update(id, body){
    return Project.update(body, {
      where: {id},
    })
  }
}

export default ProjectService;