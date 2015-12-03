import {
  GraphQLObjectType,
} from 'graphql';

import ObjectType, {setNodeType} from '../objectType';

const NAME =  'Viewer';

export const VIEWER_OBJECT_ID = 'global';

export const VIEWER_OBJECT = setNodeType({name: NAME}, {
  id: VIEWER_OBJECT_ID
});

import {INode} from './Node';

export default new GraphQLObjectType(ObjectType({
  name: NAME,
  interfaces: [INode],
  description: 'A singleton object that represents the "window" into the global app state.',
  fields: (type) => ({
    id: type.id(NAME),
  })
}));


