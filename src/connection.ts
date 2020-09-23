import { QueryBuilder } from './interfaces';
import { Binding } from './binding';
export class Connection {
  bind: Binding;
  constructor({ bind }: { bind: Binding }) {
    this.bind = bind;
  }
  setBinding(bind: Binding) {
    this.bind = bind;
  }
  query(query: any): Promise<any> {
    let queryBuilder: QueryBuilder = query.toJS();
    return new Promise((resolve: any, reject: any) => {
      try {
        resolve(this.bind.perform(queryBuilder));
      } catch (err) {
        reject(err);
      }
    });
  }
}
