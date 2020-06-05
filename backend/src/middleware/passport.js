import {ExtractJwt, Strategy} from 'passport-jwt';
import UserService from "../services/UserService";


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || "NeLez1123"
};

const passportOptions = (passport) => {
  passport.use(
      new Strategy(options, async (payload, done) => {
        try {
          const user = await UserService.findById(payload.id);
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          console.log(err.message);
        }
      })
  );
};

export default passportOptions;