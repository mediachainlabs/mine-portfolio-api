import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import ObjectType from '../objectType';

const NAME = 'Backlink';

const Backlink = new GraphQLObjectType(ObjectType({
  name: NAME,
  fields: () => ({
    backlink: {
      type: new GraphQLNonNull(GraphQLString),
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    }
  })
}));

export default Backlink;
