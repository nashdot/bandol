import Types from './Types';

export default class Resource {
  constructor(id) {
    this.id = id;
    this.type = Types.UNKNOWN;
    this.dependencies = [];
    this.props = [];
  }
}
