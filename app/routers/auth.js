import {Router} from 'express';
import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import env from 'require-env';
import jwt from 'jwt-simple';

import {setNodeType} from '../objectType';
import db from '../services/db';
import User from '../types/User.js';

const JWT_SECRET = env.require('JWT_SECRET');
const CLIENT_ORIGIN = env.require('CLIENT_ORIGIN');
const TWITTER_CONSUMER_ID = env.require('TWITTER_CONSUMER_ID');
const TWITTER_CONSUMER_SECRET = env.require('TWITTER_CONSUMER_SECRET');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  if (!id) {
    cb(null, null);
  } else {
    const user = await db('users').where({id}).first();
    cb(null, user ? setNodeType(User, user) : null);
  }
});

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_ID,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: `/auth/twitter/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const username = profile.username;
    let user = await db('users').where({username}).first();
    if (!user) {
      [user] = await db('users').insert({username}, '*');
    }
    done(null, user ? setNodeType(User, user) : null);
  } catch(e) {
    console.log(e);
    done(e);
  }
}));


const router = Router();

const createToken = (user) => {
  const payload = {
    v: 0,
    iat: Date.now() / 1000,
    d: {
      uid: user.id,
      username: user.username
    }
  };
  return jwt.encode(payload, JWT_SECRET, 'HS256');
};

router.get('/twitter', passport.authenticate('twitter'), (/*req, res*/) => {
  //The request will be redirected to GitHub for authentication, so this
  //function will not be called.
});

const authenticate = passport
  .authenticate('twitter', { failureRedirect: `${CLIENT_ORIGIN}/login` });

router.get('/twitter/callback', authenticate, (req, res) => {
  const token = createToken(req.user);
  res.redirect(`${CLIENT_ORIGIN}/login?token=${encodeURIComponent(token)}`);
});

export default router;

