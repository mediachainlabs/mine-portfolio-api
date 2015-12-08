import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import {
  fromGlobalId,
} from 'graphql-relay';

import Image from '../types/Image';

export default {
  type: Image,
  args: {
    imageId: {
      description: 'The id of the image to fetch',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (obj, {imageId}, {rootValue: {store}}) => {
    const {id} = fromGlobalId(imageId);
    const [image] = await store.Image.query(q => q.where({id}));
    return image;
  }
};


