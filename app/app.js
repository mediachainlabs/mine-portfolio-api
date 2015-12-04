import express from 'express';
import env from 'require-env';
import passport from 'passport';
import expressSession from 'express-session';

import graphql from './routers/graphql';
import auth from './routers/auth';
import schema from './routers/schema';

const PORT = env.require('PORT');
const SESSION_SECRET = env.require('SESSION_SECRET');

const app = express();

app.use(expressSession({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize());
app.use('/schema', schema);
app.use('/auth', auth);
app.use('/graphql', graphql);

app.listen(PORT, () => {
  console.log(`GraphQL app listening on PORT: ${PORT}`);
});
