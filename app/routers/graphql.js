import {Router} from 'express';
import passport from 'passport';
import {Strategy as JwtStrategy} from 'passport-jwt';
import graphqlHTTP from 'express-graphql';
import env from 'require-env';

import {setNodeType} from '../objectType';
import User from '../types/User.js';
import {getUser} from '../services/users';
import schema from '../schema';

const router = Router();

const opts = {
  secretOrKey: env.require('JWT_SECRET')
};

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await getUser(jwtPayload.d.uid);
    done(null, user ? setNodeType(User, user) : null);
  } catch(e) {
    done(e);
  }
}));

router.use(graphqlHTTP(() => ({
  schema,
  graphiql: true
})));

export default router;
