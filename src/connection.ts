import { QueryData } from './query';
import { Binding } from './binding';
import { Cache } from './cache';
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
  query(query: QueryData): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      try {
        resolve(this.bind.perform(query));
      } catch (err) {
        reject(err);
      }
    });
  }
}
