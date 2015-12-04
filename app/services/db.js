import knex from 'knex';
import config from '../../config/db';

const env = process.env.NODE_ENV || 'development';
export default knex(config[env]);
