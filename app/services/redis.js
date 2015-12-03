import bluebird from 'bluebird';
import redis from 'redis';
import env from 'require-env';

const REDIS_PROVIDER = env.require('REDIS_PROVIDER');
const REDIS_URL = env.require(REDIS_PROVIDER);

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(REDIS_URL);
client.on('error', (err) => console.log('Redis error ' + err));

export default client;

