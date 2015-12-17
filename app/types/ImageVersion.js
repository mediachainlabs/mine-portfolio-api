import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import {
  connectionDefinitions
} from 'graphql-relay';

import ObjectType, {setNodeType} from '../objectType';
import Backlink from './Backlink';

const NAME = 'ImageVersion';

const ImageVersion = new GraphQLObjectType(ObjectType({
  description: 'A specific instance of an Image that exists somewhere online',
  name: NAME,
  fields: (type) => ({
    id: type.id(NAME),
    height: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    width: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    imageUrl: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({image_url}) => image_url
    },
    backlinks: {
      type: new GraphQLList(Backlink),
      resolve: ({backlinks}) => backlinks.map(b => setNodeType(Backlink, b))
    }
  })
}));

export default ImageVersion;

const {
  connectionType: Connection,
  edgeType: Edge,
} = connectionDefinitions({name: NAME, nodeType: ImageVersion});

export const ImageVersionConnection = Connection;
export const ImageVersionEdge = Edge;

