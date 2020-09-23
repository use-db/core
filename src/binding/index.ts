import { QueryBuilder } from './../interfaces';
export interface Binding {
  perform: (query: QueryBuilder) => Promise<any>;
}

export { default as RuntimeBinding } from './Runtime';
