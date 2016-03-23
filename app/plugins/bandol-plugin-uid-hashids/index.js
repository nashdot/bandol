import Hashids from 'hashids';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor() {
    super();

    this.name = 'uid-hashids';
    this.version = '0.1.0';

    this._hashids = new Hashids('Oh Bandol');
    this._varCounter = 1;

    this.init();
  }

  generateUid() {
    return `b${this._hashids.encode(this._varCounter++)}`;
  }
}
