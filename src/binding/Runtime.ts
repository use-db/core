import { find, get, isNil } from 'lodash';
import { Binding } from './';
import { QueryBuilder } from './../';

export default class RuntimeBinding implements Binding {
  db: any = {
    users: [
      // { id: 0, name: 'name1', email: 'name1@email' },
      // { id: 1, name: 'name2', email: 'name2@email' },
      // { id: 2, name: 'name3', email: 'name3@email' },
    ],
  };
  // @ts-ignore
  perform(query: QueryBuilder): Promise<any> {
    // @ts-ignore
    window['db'] = this.db;
    return new Promise((resolve, reject) => {
      try {
        if (query.length < 2) {
          reject('Invalid query');
        }
        resolve(this.processQuery(query));
      } catch (err) {
        reject(err);
      }
    });
  }
  private processQuery(query: QueryBuilder) {
    const table: string = query[0].toString();
    const method = query[1];
    let returnValue: any;
    switch (method) {
      case 'get':
        returnValue = this.db[table];
        break;
      case 'find':
        if (query[2] !== 'string') {
          let findId = get(query, '2.args.0');
          if (!isNil(findId)) {
            returnValue = find(
              this.db[table],
              (item: any) => item.id === findId
            );
          }
        }
        break;
      case 'insert':
        let data = get(query, '[2].args');
        data.forEach((child: any) => {
          this.db[table].push(child);
        });
        break;
      default:
        break;
    }
    return returnValue;
  }
}
