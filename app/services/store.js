import DataLoader from 'dataloader';

import {setNodeType} from '../objectType';
import db from './db';
import User from '../types/User';
import Image from '../types/Image';

DataLoader.prototype.prime = function(key, value) {
  if (this._options && this._options.cache === false) {
    return;
  }
  if (!(this._promiseCache instanceof Map)) {
    throw new Error('DataLoader implementation changed. Need to change impl of DataLoader.prime');
  }
  this._promiseCache.set(key, Promise.resolve(value));
};

DataLoader.prototype.primeManyById = function(records) {
  for (let record of records) {
    if (record.id === undefined) {
      console.warn(`DataLoader.primeManyById() called with record that lacks 'id' field`);
    } else {
      this.prime(record.id, record);
    }
  }
};

const tables = {
  'users': User,
  'images': Image,
};

const createLoader = ({tableName, type}) => {
  const toNodeType = setNodeType.bind(null, type);

  const query = async (cb) => {
    let records = await cb(db(tableName));
    records = records.map(toNodeType);
    loader.primeManyById(records);
    return records;
  };

  const batchFn = async (keys) => {
    const results = await query(q => q.whereIn('id', keys));
    return keys.map(k => results.find(({id}) => id === k));
  };

  const loader = new DataLoader(batchFn);
  loader.query = query;
  return loader;
};

export const createStore = (cache = {}) => {
  const store = {db};

  for (let tableName of Object.keys(tables)) {
    store[tables[tableName].name] = createLoader({
      tableName,
      type: tables[tableName]
    });
  }

  for (let name of Object.keys(cache)) {
    // TODO - prime loader
    name;
  }

  return store;
};
