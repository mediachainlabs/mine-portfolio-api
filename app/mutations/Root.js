import {
  GraphQLObjectType,
} from 'graphql';

import createImages from './createImages';
import deleteImage from './deleteImage';

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    createImages,
    deleteImage,
  }),
});

export default RootMutation;
