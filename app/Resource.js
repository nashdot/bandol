export default class Resource {
  constructor(id, dependencies, props) {
    this.id = id;
    this.dependencies = dependencies;
    this.props = props;
  }
}
