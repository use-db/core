import { QueryData } from './../query';
export interface Binding {
  perform: (query: QueryData) => Promise<any>;
}

export { default as RuntimeBinding } from './Runtime';
export { default as LocalStorageBinding } from './LocalStorage';
