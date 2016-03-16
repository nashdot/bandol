import * as fs from 'fs';
import generate from 'babel-generator';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'finalizer-iife';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  finalizeResource(id) {
    const currentPath = process.cwd();
    const outputPath = `${currentPath}/out/${id}.js`;

    const intro = '(function () {\n';
    const outro = '\n}());';

    fs.appendFileSync(outputPath, `${intro}`);

    this.bundle.code = '';
    for (let i = 0; i < this.bundle.sortedResources.length; i++) {
      const resource = this.bundle.sortedResources[i];
      if (resource.type === this.resourceType) {
        try {
          resource.props.code = generate(
            resource.props.ast,
            {
              comments: false
            },
            resource.props.originalCode).code;
        } catch (err) {
          this.log(err.stack);
        }

        fs.appendFileSync(outputPath, `/* bandol: ${this.bundle.getShortPath(resource.id)} */\n`);
        fs.appendFileSync(outputPath, `/* dependencies:\n${JSON.stringify(resource.dependencies, null, ' ')}\n*/\n`);
        fs.appendFileSync(outputPath, `/* imports:\n${JSON.stringify(resource.props.imports, null, ' ')}\n*/\n`);
        fs.appendFileSync(outputPath, `/* exports:\n${JSON.stringify(resource.props.exports, null, ' ')}\n*/\n`);
        fs.appendFileSync(outputPath, `${resource.props.code}\n`);
        this.bundle.code += resource.props.code;
      }
    }
    fs.appendFileSync(outputPath, `${outro}`);

    return outputPath;
  }
}
