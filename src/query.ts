import { QueryBuilder } from './interfaces';

const createQueryBuilder = (prop: any) => {
  const queryObject = function() {};
  queryObject.chain = [prop];
  const toJS: () => QueryBuilder = function() {
    return queryObject.chain.map(item => {
      if (item.type == 'nested') {
        return {
          type: 'nested',
          query: item.query.toJS(),
        };
      }
      return item;
    });
  };
  const instance: any = new Proxy(queryObject, {
    //@ts-ignore
    get: function(obj, prop) {
      if (prop == 'toJS') return toJS;
      queryObject.chain.push(prop);
      return instance;
    },
    //@ts-ignore
    apply: function(target, thisArg, argumentsList) {
      if (typeof argumentsList[0] == 'function') {
        queryObject.chain.push({
          type: 'nested',
          query: argumentsList[0](db),
        });
        return instance;
      }
      queryObject.chain.push({
        type: 'function',
        args: argumentsList,
      });
      return instance;
    },
  });
  return instance;
};
export const db: any = new Proxy(function() {}, {
  //@ts-ignore
  get: (obj, prop) => {
    return createQueryBuilder(prop);
  },
});
