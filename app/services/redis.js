import bluebird from 'bluebird';
import redis from 'redis';
import env from 'require-env';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const REDIS_PROVIDER = env.require('REDIS_PROVIDER');
const REDIS_URL = env.require(REDIS_PROVIDER);

export const redisClient = redis.createClient(REDIS_URL);
