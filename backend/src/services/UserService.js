import {Referral, User} from '../models/user';
import {Op} from "sequelize";

class UserService {

  static findById(id) {
    return User.findByPk(id, {
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'password']
      }
    });
  }

  static getReferralByUserId(id) {
    return User.findByPk(id, {
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'password']
      },
      include: [{
        model: Referral
      }]
    })
  }

  static findAllByIds(ids) {
    return User.findAll({
      where: {id: {[Op.or]: ids}}
    });
  }

  static findByEmail(email) {
    return User.findOne({
      where: {email}
    });
  }

  static create(body) {
    return User.create(body);
  }

  static update(id, body) {
    return User.update(body, {
      where: {id}
    });
  }
}

export default UserService;