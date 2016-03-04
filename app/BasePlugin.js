
export default class BasePlugin {
  name = 'base';
  version = '0.0.0';

  log(message) {
    console.log(`${this.name}/${this.version}: ${message}`);
  }
}
