import ProjectService from "../services/ProjectService";
import ValidationService from "../services/ValidationService";

class ProjectController {

  static async findMyProjects(req, res, next) {
    try {
      const {limit, page} = req.query;
      const projects = await ProjectService.findAllMy(req.user.id, limit, page);
      res.status(200).json(projects);
    } catch (e) {
      next(e);
    }
  }

  static async findById(req, res, next) {
    try {
      const {id} = req.params;
      const project = await ProjectService.findById(id);
      await ValidationService.isNotExists(project, 'Project');
      res.status(200).json(project);
    } catch (e) {
      next(e);
    }
  }

  static async createOrUpdate(req, res, next) {
    try {
      const {id, title, projectType, shortDescription, description, category, resources, thanks, deadline} = req.body;
      const body = {
        shortDescription, description, category, resources, thanks, deadline
      };
      const project = await ProjectService.findById(id);
      if (!project) {
        body.title = title;
        body.projectType = projectType;
        body.userId = req.user.id;
        const projectDb = await ProjectService.create(body);
        return res.status(201).json(projectDb);
      } else {
        const project = await ProjectService.findById(id);
        await ValidationService.isNotExists(project, 'Project');
        if (project.userId !== req.user.id) {
          return res.status(403).json({
            success: false,
            message: "It's not you project"
          });
        }
        await ProjectService.update(id, body);
        res.status(200).json({
          success: true,
          message: "Project updated"
        })
      }
    } catch (e) {
      next(e);
    }
  }
}

export default ProjectController;