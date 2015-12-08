import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

const NAME = 'Image';

import ObjectType from '../objectType';
import {INode} from './Node';
import User from './User';
import {scaledImageUrl} from '../util/imgix';

export default new GraphQLObjectType(ObjectType({
  name: NAME,
  interfaces: [INode],
  description: 'A user\'s image',
  fields: (type) => {
    return {
      id: type.id(NAME),
      imageUrl: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The url for the image',
        args: {
          width: {
            type: GraphQLInt,
            description: 'If provided, return a URL for a scaled image that fits the given width.',
          },
          height: {
            type: GraphQLInt,
            description: 'If provided, return a URL for a scaled image that fits the given height.',
          },
          fit: {
            type: GraphQLString,
            description: 'If provided, return a URL for a scaled image that fits the given fit.',
          },
          pixelRatio: {
            type: GraphQLInt,
            description: 'If provided, return a URL for the given device pixel ratio.',
          },
        },
        resolve: ({image_url}, args) => scaledImageUrl(image_url, args)
      },
      user: {
        type: new GraphQLNonNull(User),
        resolve: ({user_id}, _, {rootValue: {store}}) => store.User.load(user_id)
      },
      viewerCanDelete: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: ({user_id}, _, {rootValue: {user}}) => !!(user && user.id === user_id)
      }
    };
  }
}));



