import {
  GraphQLObjectType,
} from 'graphql';

import node from '../types/Node';
import viewer from './Viewer';
import user from './User';

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    node,
    viewer,
    user,
  }
});


