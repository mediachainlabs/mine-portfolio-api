import fs from 'fs';
import path from 'path';
import {graphql}  from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import schema from '../app/schema';

const targetPath = path.join(__dirname, '..', '..', 'mine-portfolio-web', 'tmp');

if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath);
}

graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    path.join(targetPath, 'schema.json'),
    JSON.stringify(result, null, 2)
  );
});

