export interface RootQueryBuilder {
  [key: string]: QueryBuilder;
}
export interface QueryData {
  collection: string;
  operation: string;
  payload: any;
}
export interface KeyPair {
  [key: string]: any;
}

export class QueryBuilder {
  collection: any;
  constructor(collection: string) {
    this.collection = collection;
  }
  create(obj: { data: KeyPair; select?: Array<string> }): QueryData {
    return {
      collection: this.collection,
      operation: 'create',
      payload: obj,
    };
  }
  findOne(obj: { where: KeyPair; select?: Array<string> }): QueryData {
    return {
      collection: this.collection,
      operation: 'findOne',
      payload: obj,
    };
  }
  findMany(obj: { where: KeyPair; select?: Array<string> }): QueryData {
    return {
      collection: this.collection,
      operation: 'findMany',
      payload: obj,
    };
  }
  update(obj: {
    where: KeyPair;
    data: KeyPair;
    select?: Array<string>;
  }): QueryData {
    return {
      collection: this.collection,
      operation: 'update',
      payload: obj,
    };
  }
  updateMany(obj: {
    where: KeyPair;
    data: KeyPair;
    select?: Array<string>;
  }): QueryData {
    return {
      collection: this.collection,
      operation: 'updateMany',
      payload: obj,
    };
  }
  delete(obj: { where: KeyPair; select?: Array<string> }): QueryData {
    return {
      collection: this.collection,
      operation: 'delete',
      payload: obj,
    };
  }
  deleteMany(obj: { where: KeyPair }): QueryData {
    return {
      collection: this.collection,
      operation: 'deleteMany',
      payload: obj,
    };
  }
  count(obj: { where: KeyPair }): QueryData {
    return {
      collection: this.collection,
      operation: 'count',
      payload: obj,
    };
  }
}
export const db: RootQueryBuilder = new Proxy(
  {},
  {
    get: (obj, prop: string) => {
      return new QueryBuilder(prop);
    },
  }
);
