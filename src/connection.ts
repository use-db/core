import { QueryData } from './query';
import { Binding } from './binding';
export class Connection {
  bind: Binding;
  constructor({ bind }: { bind: Binding }) {
    this.bind = bind;
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
