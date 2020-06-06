import UserService from "../services/UserService";

class LeaderController {

  static async getLeaderUsers(req, res, next) {
    try {
      const users = await UserService.findLeaders();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default LeaderController;