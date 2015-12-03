import {GraphQLSchema} from 'graphql';
import RootQuery from './queries/Root';
//import RootMutation from './mutations';

export default new GraphQLSchema({
  query: RootQuery,
  //mutation: RootMutation
});

