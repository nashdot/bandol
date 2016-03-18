import Hashids from 'hashids';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  name = 'uid-hashids';
  version = '0.1.0';

  constructor() {
    super();

    this._hashids = new Hashids('Oh Bandol');
    this._varCounter = 1;

    this.init();
  }

  generateUid() {
    return `b${this._hashids.encode(this._varCounter++)}`;
  }
}
