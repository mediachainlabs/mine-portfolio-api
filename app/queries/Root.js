import {
  GraphQLObjectType,
} from 'graphql';

import NodeType from '../types/Node';
import ViewerQuery from './Viewer';

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    node: NodeType,
    viewer: ViewerQuery,
  }
});


