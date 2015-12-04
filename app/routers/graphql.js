import {Router} from 'express';
import passport from 'passport';
import {Strategy as JwtStrategy} from 'passport-jwt';
import graphqlHTTP from 'express-graphql';
import env from 'require-env';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';

import {setNodeType} from '../objectType';
import User from '../types/User.js';
import {getUser} from '../services/users';
import schema from '../schema';

const router = Router();

router.use(cors());
router.use(bodyParser.json());

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

router.use((req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user/*, info */) => {
    if (err) { return next(err); }
    if (user) req.user = user; // setNodeType(User.name, user);
    next();
  })(req, res, next);
});

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) {
  const colors = require('colors/safe');
  const {print} = require('graphql/language/printer');
  const {parse} = require('graphql/language/parser');

  router.use((req, res, next) => {
    const query = req.body.query || req.query.query;
    if (!query) return next();
    const variables = req.body.variables || req.query.variables;
    const prettyQuery = print(parse(query));
    const pQuery = colors.green(prettyQuery);
    const pVariables = variables ?
      colors.cyan('\nVariables: ') + colors.green(JSON.stringify(variables)) :
      '';
    winston.info(colors.cyan('Running GraphQL query\n'), pQuery, pVariables);
    next();
  });

  const responseTime = require('response-time');
  router.use(responseTime());
}

router.use(graphqlHTTP(({user}) => ({
  schema,
  graphiql: true,
  rootValue: {user}
})));

export default router;
