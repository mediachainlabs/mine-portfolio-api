import {GraphQLSchema} from 'graphql';
import RootQuery from './queries/Root';
import RootMutation from './mutations/Root';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

