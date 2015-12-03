import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const NAME = 'User';

import ObjectType from '../objectType';

export default new GraphQLObjectType(ObjectType({
  name: NAME,
  description: 'A user of the app.',
  fields: (type) => {
    return {
      id: type.id(NAME),
      username: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The username of the user',
      }
    };
  }
}));


