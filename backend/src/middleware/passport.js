import {ExtractJwt, Strategy} from 'passport-jwt';
const VKontakteStrategy = require('passport-vkontakte').Strategy;
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

  passport.use(new VKontakteStrategy({
        clientID:     process.env.CLIENT_ID || 0, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: process.env.CLIENT_SECRET || 'asdf',
        callbackURL:  "http://82.148.19.115:5555/auth/vkontakte/callback",
        apiVersion: '5.22'
      },
      function(accessToken, refreshToken, params, profile, done) {
        // console.log(params.email); // getting the email
        console.log(profile);
        done(null, profile);
      }
  ));
};



export default passportOptions;