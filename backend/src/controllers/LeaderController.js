import UserService from "../services/UserService";
import ProjectService from "../services/ProjectService";
import request from 'request';

class LeaderController {

  static async getLeaderUsers(req, res, next) {
    try {
      const users = await UserService.findLeaders();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  static async getLeaderProjects(req, res, next) {
    try {
      const projects = await ProjectService.findLeadersProjects();
      res.status(200).json(projects);
    } catch (e) {
      next(e);
    }
  }

  static async getLeaderFromVK(req, res, next) {
    try {
      const url = `https://api.vk.com/method/users.search?sort=0&count=20&fields=followers_count,photo_max_orig&city=46&access_token=${process.env.ACCESS_TOKEN}&v=5.107`;
      await request(url, (error, response, body) => {
        let result = JSON.parse(body);
        result = result.response.items.map(el => {
          el.vkId = "vk.com/id" + el.id
          return el;
        });
        return res.status(200).json(result);
      });
    } catch (e) {
      next(e);
    }
  }
}

export default LeaderController;