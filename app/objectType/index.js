import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {
  toGlobalId,
} from 'graphql-relay';

const objectType = {
  id(typeName, fieldConfig = {}) {
    fieldConfig.type = new GraphQLNonNull(GraphQLID);
    fieldConfig.resolve = (obj) => toGlobalId(typeName, obj.id);
    return fieldConfig;
  },
};

export default (config) => {
  const {fields} = config;
  config.fields = () => fields.call(null, objectType);
  config.isTypeOf = (obj) => obj._graphQLType === config.name;
  return config;
};

export const setNodeType = ({name}, record) => {
  return {
    ...record,
    _graphQLType: name,
    _globalId: toGlobalId(name, record.id)
  };
};
