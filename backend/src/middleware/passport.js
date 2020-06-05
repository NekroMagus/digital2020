import {ExtractJwt, Strategy} from 'passport-jwt';


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || "NeLez1123"
};

const passportOptions = (passport) => {
  passport.use(
      new Strategy(options, async (payload, done) => {
        try {
          let user;
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