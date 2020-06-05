import {User} from '../models/user';

class UserService {

  static findById(id){
    return User.findByPk(id);
  }

  static findByEmail(email) {
    return User.findOne({
      where: {email}
    });
  }

  static create(body) {
    return User.create(body);
  }
}

export default UserService;