import fs from 'fs';

import sortDependencies from '../../utils/sortDependencies.js';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'finalizer-es6';
  version = '1.0.0';
  resourceType = Types.JAVASCRIPT;

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  finalizeResource(id) {
    const outputPath = `${process.cwd()}/out/${id}.js`;
    const sorted = sortDependencies(this.bundle.resources);

    for (let i = 0; i < sorted.length; i++) {
      const resource = sorted[i];
      if (resource.type === this.resourceType) {
        fs.appendFileSync(outputPath, `/* bandol: ${resource.id} */\n`);
        fs.appendFileSync(outputPath, `${resource.props.code}\n`);
        fs.appendFileSync(outputPath, `/* bandol: ------ */\n\n`);
      }
    }
    return outputPath;
  }
}
