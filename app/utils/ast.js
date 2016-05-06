import * as t from 'babel-types';

export function isShorthand(key, name) {
  if (t.isIdentifier(key) && key.name === name) {
    return true;
  }

  return false;
}
