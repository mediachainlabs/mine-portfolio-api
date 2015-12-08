import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay';

import User from '../types/User';

export default mutationWithClientMutationId({
  name: 'deleteImage',
  inputFields: {
    imageId: {
      type: GraphQLID
    },
  },

  outputFields: {
    user: {
      type: new GraphQLNonNull(User),
    },
  },

  mutateAndGetPayload: async ({imageId}, {rootValue: {user, db}}) => {
    try {
      const user_id = user.id;
      const {id} = fromGlobalId(imageId);
      await db('images').where({user_id, id}).del();

      return {
        user,
      };
    } catch (e) {
      console.log(e);
      throw(e);
    }
  }

});


