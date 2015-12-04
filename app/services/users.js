import redis from './redis';

const key = (id) => `user:${id}`;

export const saveUser = async (user) => {
  await redis.setAsync(key(user.id), JSON.stringify(user));
  return user;
};

export const getUser = async (id) => {
  const user = await redis.getAsync(key(id));
  return JSON.parse(user);
};
