import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

const NAME = 'User';

import ObjectType from '../objectType';
import {INode} from './Node';
import Image from './Image';

export default new GraphQLObjectType(ObjectType({
  name: NAME,
  interfaces: [INode],
  description: 'A user of the app.',
  fields: (type) => {
    return {
      id: type.id(NAME),
      username: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The username of the user',
      },
      images: {
        type: new GraphQLList(Image),
        resolve: ({id}, _, {rootValue: {store}}) => {
          return store.Image.query(q => q.where({user_id: id}));
        }
      },
      isCurrentUser: {
        type: GraphQLBoolean,
        resolve: ({id}, _, {rootValue: {user}}) => !!(user && user.id === id)
      },
    };
  }
}));


