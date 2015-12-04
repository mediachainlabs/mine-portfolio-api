import env from 'require-env';

const dbString = env.require('DATABASE_URL');
const dbURL = env.requireUrl('DATABASE_URL');

export default {
  development: {
    client: 'postgresql',
    connection: dbString
  },
  production: {
    client: 'postgresql',
    connection: {
      host: dbURL.hostname,
      port: dbURL.port,
      user: dbURL.user,
      password: dbURL.pass,
      database: dbURL.path,
      ssl: true
    }
  },
};

