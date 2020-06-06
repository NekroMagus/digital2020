import UserService from "../services/UserService";
import ValidationService from "../services/ValidationService";

class UserController {

  static async findById(req, res, next) {
    try {
      const {id} = req.params;
      const user = await UserService.findById(id);
      await ValidationService.isNotExists(user, 'user');
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;