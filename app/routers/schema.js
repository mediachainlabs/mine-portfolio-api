import { Router } from 'express';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import Schema from '../schema';

const router = Router();

router.get('/', (req, res) => {
  graphql(Schema, introspectionQuery).then(result => {
    res.json(result);
  });
});

router.get('/graphql', (req, res) => {
  res.send('<code style="white-space: pre">'+printSchema(Schema)+'</code>');
});

export default router;

