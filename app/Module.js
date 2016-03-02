import { blank } from './utils/object.js';
import getLocation from './utils/getLocation.js';
import traverse from 'babel-traverse';
// import * as types from 'babel-types';

export default class Module {
  constructor({ id: id, code: code, ast: ast, bundle: bundle }) {
    console.log('ctor: ' + id);
    this.id = id;
    this.code = code;
    this.ast = ast;
    this.bundle = bundle;

    this.sources = [];
    this.imports = blank();
  }

  addImport(node) {
    const source = node.source.value;

    if (!~this.sources.indexOf(source)) {
      this.sources.push(source);
    }

    node.specifiers.forEach(specifier => {
      const localName = specifier.local.name;

      if (this.imports[localName]) {
        const err = new Error(`Duplicated import '${localName}'`);
        err.file = this.id;
        err.loc = getLocation(this.code, specifier.start);
        throw err;
      }

      const isDefault = specifier.type === 'ImportDefaultSpecifier';
      const isNamespace = specifier.type === 'ImportNamespaceSpecifier';

      let name;
      if (isDefault) {
        name = 'default';
      } else {
        if (isNamespace) {
          name = '*';
        } else {
          name = specifier.imported.name;
        }
      }
      this.imports[localName] = { source: source, name: name, module: null };
    });
  }

  parse() {
    traverse(this.ast, {
      ImportDeclaration: (path) => {
        this.addImport(path.node);
      }
    });
  }
}
