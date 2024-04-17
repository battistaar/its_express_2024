import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { UserModel } from "../../../api/user/user.model";

export const JWT_SECRET = 'token_secret';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await UserModel.findById(payload.id);
        if (user) {
          done(null, user.toObject());
        } else {
          done(null, false, { message: 'invalid token'});
        }

      } catch(err) {
        done(err);
      }
    }
  )
)