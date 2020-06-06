import {genSaltSync, hashSync} from "bcryptjs";
import UserService from "../services/UserService";
import {User} from "../models/user";
import ValidationService from "../services/ValidationService";

class ProfileController {

  static async getCurrentUser(req, res, next) {
    try {
      const user = await UserService.getReferralByUserId(req.user.id);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  static async getReferralProfile(req, res, next) {
    try {
      const me = await UserService.getReferralByUserId(req.user.id);
      const ref = await me.getReferrals();
      const ids = ref.map(el => el.userId);
      const users = await UserService.findAllByIds(ids);
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const {
        password, firstName, lastName, patronymic, gender, information, description, projectDescription,
        interests, zipCode, city, areaCity, areaRegion, street, socialPosition, phone,birthday, vkLink,
        youtubeLink, instagramLink, twitterLink, facebookLink
      } = req.body;
      const body = {};
      body.password = password || hashSync(password, genSaltSync(10));
      body.firstName = firstName || req.user.firstName;
      body.lastName = lastName || req.user.lastName;
      body.patronymic = patronymic || req.user.patronymic;
      body.gender = gender || req.user.gender;
      body.information = information || req.user.information;
      body.description = description || req.user.description;
      body.projectDescription = projectDescription || req.user.projectDescription;
      body.interests = interests || req.user.interests;
      body.zipCode = zipCode || req.user.zipCode;
      body.city = city || req.user.city;
      body.areaCity = areaCity || req.user.areaCity;
      body.areaRegion = areaRegion || req.user.areaRegion;
      body.street = street || req.user.street;
      body.socialPosition = socialPosition || req.user.socialPosition;
      body.phone = phone || req.user.phone;
      body.birthday = birthday ? new Date(birthday) : req.user.birthday;
      body.vkLink = vkLink || req.user.vkLink;
      body.youtubeLink = youtubeLink || req.user.youtubeLink;
      body.instagramLink = instagramLink || req.user.instagramLink;
      body.twitterLink = twitterLink || req.user.twitterLink;
      body.facebookLink = facebookLink || req.user.facebookLink;
      await UserService.update(req.user.id, body);
      const userDb = await User.findByPk(req.user.id);
      const valid = await ValidationService.isAllUserProfileCompleted(userDb);
      if (valid) {
        await req.user.increment('points', {by: 50});
      }
      res.status(200).json(body);
    } catch (e) {
      next(e);
    }
  }

  static async getUserByTelegramId(req, res, next) {
    try {
      const {telegramId} = req.query;
      await ValidationService.isQueryFieldEmpty(telegramId, 'telegramId');
      const user = await UserService.findByTelegramId(telegramId);
      await ValidationService.isNotExists(user, 'User');
      if (user.id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "It's not you profile"
        });
      }
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }

  }

  static async updateTelegramId(req, res, next) {
    try {
      const {telegramId} = req.body;
      await ValidationService.isBodyFieldEmpty(telegramId, 'telegramId');
      await UserService.update(req.user.id, {telegramId, points: req.user.points + 50});
      res.status(200).json({
        success: true,
        message: "telegramId added"
      });
    } catch (e) {
      next(e);
    }
  }

}

export default ProfileController;