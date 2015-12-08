import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import {mutationWithClientMutationId} from 'graphql-relay';

import User from '../types/User';

export default mutationWithClientMutationId({
  name: 'createImages',
  inputFields: {
    imageUrls: {
      type: new GraphQLList(GraphQLString)
    },
  },

  outputFields: {
    user: {
      type: new GraphQLNonNull(User),
    },
  },

  mutateAndGetPayload: async ({imageUrls}, {rootValue: {user, db}}) => {
    try {
      const user_id = user.id;
      const images = imageUrls.map(image_url => ({image_url, user_id}));
      await db('images').insert(images);

      return {
        user,
      };
    } catch (e) {
      console.log(e);
      throw(e);
    }
  }

});

