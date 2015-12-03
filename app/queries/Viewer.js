import Viewer from '../types/Viewer';
import {VIEWER_OBJECT} from '../types/Viewer';
import {setNodeType} from '../objectType';

import {
  GraphQLNonNull,
} from 'graphql';

export default {
  type: new GraphQLNonNull(Viewer),
  resolve: () => VIEWER_OBJECT
};


