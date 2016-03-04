import Types from './Types';

export default class Resource {
  constructor(id, type = Types.UNKNOWN, dependencies = [], props = {}) {
    this.id = id;
    this.type = type;
    this.dependencies = dependencies;
    this.props = props;
  }
}
