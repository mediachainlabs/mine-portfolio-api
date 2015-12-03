import redis from './redis';

const key = (id) => `user:${id}`;

export const saveUser = async (user) => {
  await redis.set(key(user.id), JSON.stringify(user));
  return user;
};

export const getUser = async (id) => {
  const user = await redis.get(key(id));
  return JSON.parse(user);
};
