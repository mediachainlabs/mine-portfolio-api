import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import User from '../types/User';

export default {
  type: User,
  args: {
    username: {
      description: 'The username of the user to fetch',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (obj, {username}, {rootValue: {store}}) => {
    const [user] = await store.User.query(q => q.where({username}));
    return user;
  }
};

