import {compareSync, genSaltSync, hashSync} from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserService from "../services/UserService";
import ReferralService from "../services/ReferralService";

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

class AuthController {

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "email or password is empty"
        });
      }
      const candidate = await UserService.findByEmail(email);
      if (candidate) {
        const passwordResult = compareSync(password, candidate.password);
        if (passwordResult) {
          const token = jwt.sign({
            id: candidate.id
          }, SECRET_KEY, {expiresIn: 48 * 60 * 60});
          res.status(200).json({
            token
          });
        } else {
          res.status(401).json({
            message: "Invalid password"
          });
        }
      } else {
        res.status(404).json({
          message: "User is not exists"
        });
      }
    } catch (e) {
      next(e);
    }
  }

  static async registration(req, res, next) {
    try {
      const {email, password, firstName, lastName, refId} = req.body;
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          message: "email, password, firstName, lastName in body is empty"
        });
      }
      const user = await UserService.findByEmail(email);
      if (user) {
        return res.status(409).json({
          success: false,
          message: "User is already exists"
        })
      }
      const salt = genSaltSync(10);
      const passwordDb = hashSync(password, salt);

      const userDb = await UserService.create({email, password: passwordDb, firstName, lastName});
      const token = await jwt.sign({
        id: userDb.id
      }, SECRET_KEY, {expiresIn: 48 * 60 * 60});
      if (refId && (Number.isInteger(refId) && refId !== +userDb.id)) {
        const reference = await UserService.findById(refId);
        if (reference) {
          await ReferralService.create({userId: refId});
        }
      }
      return res.status(201).json({
        email: userDb.email,
        password: password,
        firstName: userDb.firstName,
        lastName: userDb.lastName,
        token
      });
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;