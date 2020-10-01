import { QueryData, GETTER_QUERIES } from './query';
import { Binding } from './binding';
import { Cache } from './cache';
import { isNil } from 'lodash';

export class Connection {
  bind: Binding;
  cache: Cache;
  constructor({ bind }: { bind: Binding }) {
    this.bind = bind;
    this.cache = new Cache();
  }
  setBinding(bind: Binding) {
    this.bind = bind;
  }
  query(query: QueryData, disableCache?: boolean): Promise<any> {
    if (
      !disableCache &&
      GETTER_QUERIES.includes(query.operation) &&
      this.cache.has(query)
    ) {
      let cachedValue = this.cache.get(query);
      if (!isNil(cachedValue)) {
        return new Promise((resolve: any, reject: any) => {
          resolve(cachedValue);
        });
      }
    }
    return new Promise((resolve: any, reject: any) => {
      try {
        this.bind.perform(query).then(resp => {
          if (GETTER_QUERIES.includes(query.operation)) {
            this.cache.put(query, resp);
          }
          resolve(resp);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
