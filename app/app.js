import express from 'express';
import env from 'require-env';
import graphqlHTTP from 'express-graphql';

import schema from './schema';

const PORT = env.require('PORT');
const app = express();

app.use('/graphql', graphqlHTTP({schema, graphiql: true}));

app.listen(PORT, () => {
  console.log(`GraphQL app listening on PORT: ${PORT}`);
});
