import {redisClient} from '../services/redis';
import Tineye from 'tineye';
import env from 'require-env';

const TINEYE_PUBLIC_KEY = env.require('TINEYE_PUBLIC_KEY');
const TINEYE_PRIVATE_KEY = env.require('TINEYE_PRIVATE_KEY');

const cacheKey = (url) => `imageQuery:${url}`;
const cacheTime = 24 * 60 * 60; // 1 day in seconds

const tineye = new Tineye(TINEYE_PUBLIC_KEY, TINEYE_PRIVATE_KEY);

const searchImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    tineye.search(imageUrl, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(data);
    });
  });
};

export default async (imageUrl) => {
  const cachedResults = await redisClient.getAsync(cacheKey(imageUrl));

  if (cachedResults) {
    console.log('Using cache for', imageUrl);
    return JSON.parse(cachedResults);
  }

  console.log('Searching tineye for', imageUrl);
  const results = await searchImage(imageUrl);

  console.log('Caching results for', imageUrl);
  await redisClient.setexAsync([cacheKey(imageUrl), cacheTime, JSON.stringify(results)]);
  return results;
};
