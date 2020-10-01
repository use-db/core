import { QueryData } from './../query';
export class Cache {
  private data: Map<string, any>;
  constructor() {
    this.data = new Map();
  }
  get(query: QueryData) {
    return this.data.get(JSON.stringify(query));
  }
  update(query: QueryData, manipulators: any) {
    const stringified = JSON.stringify(query);
    let cachedManipulators = this.data.get(stringified);
    if (cachedManipulators) {
      cachedManipulators.push(manipulators);
    } else {
      this.data.set(stringified, [manipulators]);
    }
  }
}
