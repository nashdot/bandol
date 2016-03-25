(function () {
/* bandol: node_modules/react/lib/deprecated.js */
/* imports:
[]
*/
/* default export: deprecated */
/* exports:
undefined
*/

function deprecated(fnName, newModule, newPackage, ctx, fn) {
  var warned = false;


  return fn;
}
/* bandol: node_modules/react/lib/Object.assign.js */
/* imports:
[]
*/
/* default export: assign */
/* exports:
undefined
*/


function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}
/* bandol: node_modules/fbjs/lib/invariant.js */
/* imports:
[]
*/
/* default export: invariant */
/* exports:
undefined
*/


function invariant(condition, format, a, b, c, d, e, f) {

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1;
    throw error;
  }
}
/* bandol: node_modules/react/lib/ReactCurrentOwner.js */
/* imports:
[]
*/
/* default export: ReactCurrentOwner */
/* exports:
undefined
*/

var ReactCurrentOwner = {
  current: null

};
/* bandol: node_modules/react/lib/ReactElement.js */
/* imports:
[]
*/
/* default export: ReactElement */
/* exports:
undefined
*/

var bQ6L = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var bPAZ = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: bQ6L,

    type: type,
    key: key,
    ref: ref,
    props: props,

    _owner: owner
  };

  return element;
};

ReactElement.createElement = function (type, config, children) {
  var propName;

  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    ref = config.ref === undefined ? null : config.ref;
    key = config.key === undefined ? null : '' + config.key;
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    for (propName in config) {
      if (config.hasOwnProperty(propName) && !bPAZ.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (typeof props[propName] === 'undefined') {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);

  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

ReactElement.cloneAndReplaceProps = function (oldElement, newProps) {
  var newElement = ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, newProps);

  return newElement;
};

ReactElement.cloneElement = function (element, config, children) {
  var propName;

  var props = assign({}, element.props);

  var key = element.key;
  var ref = element.ref;

  var self = element._self;

  var source = element._source;

  var owner = element._owner;

  if (config != null) {
    if (config.ref !== undefined) {
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (config.key !== undefined) {
      key = '' + config.key;
    }

    for (propName in config) {
      if (config.hasOwnProperty(propName) && !bPAZ.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === bQ6L;
};
/* bandol: node_modules/react/lib/onlyChild.js */
/* imports:
[]
*/
/* default export: onlyChild */
/* exports:
undefined
*/

function onlyChild(children) {
  !ReactElement.isValidElement(children) ? 'production' !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : undefined;
  return children;
}
/* bandol: node_modules/react/lib/ReactVersion.js */
/* imports:
[]
*/
/* default export: ReactVersion */
/* exports:
undefined
*/
var ReactVersion = '0.14.7';
/* bandol: node_modules/react/lib/getIteratorFn.js */
/* imports:
[]
*/
/* default export: getIteratorFn */
/* exports:
undefined
*/

var byaM = typeof Symbol === 'function' && Symbol.iterator;
var brEK = '@@iterator';
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (byaM && maybeIterable[byaM] || maybeIterable[brEK]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}
/* bandol: node_modules/fbjs/lib/emptyFunction.js */
/* imports:
[]
*/
/* default export: emptyFunction */
/* exports:
undefined
*/


function bqJy(arg) {
  return function () {
    return arg;
  };
}

function emptyFunction() {}

emptyFunction.thatReturns = bqJy;
emptyFunction.thatReturnsFalse = bqJy(false);
emptyFunction.thatReturnsTrue = bqJy(true);
emptyFunction.thatReturnsNull = bqJy(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};
/* bandol: node_modules/react/lib/ReactPropTypeLocationNames.js */
/* imports:
[]
*/
/* default export: ReactPropTypeLocationNames */
/* exports:
undefined
*/


var ReactPropTypeLocationNames = {};
/* bandol: node_modules/react/lib/ReactPropTypes.js */
/* imports:
[]
*/
/* default export: ReactPropTypes */
/* exports:
undefined
*/


var bY7a = '<<anonymous>>';

var ReactPropTypes = {
  array: b86g('array'),
  bool: b86g('boolean'),
  func: b86g('function'),
  number: b86g('number'),
  object: b86g('object'),
  string: b86g('string'),

  any: bNL1(),
  arrayOf: bd3G,
  element: b971(),
  instanceOf: bER4,
  node: b13l(),
  objectOf: bLvJ,
  oneOf: b7Zx,
  oneOfType: b0Vp,
  shape: bwqB
};

function bOyz(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    componentName = componentName || bY7a;
    propFullName = propFullName || propName;
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function b86g(expectedType) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bkpq(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];

      var preciseType = b5x5(propValue);

      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return bOyz(validate);
}

function bNL1() {
  return bOyz(emptyFunction.thatReturns(null));
}

function bd3G(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = bkpq(propValue);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return bOyz(validate);
}

function b971() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!ReactElement.isValidElement(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return bOyz(validate);
}

function bER4(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || bY7a;
      var actualClassName = bJB2(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return bOyz(validate);
}

function b7Zx(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    return bOyz(function () {
      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (propValue === expectedValues[i]) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return bOyz(validate);
}

function bLvJ(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bkpq(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return bOyz(validate);
}

function b0Vp(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    return bOyz(function () {
      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return bOyz(validate);
}

function b13l() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return bOyz(validate);
}

function bwqB(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bkpq(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return bOyz(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

function bkpq(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    return 'object';
  }
  return propType;
}

function b5x5(propValue) {
  var propType = bkpq(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

function bJB2(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name;
}
/* bandol: node_modules/fbjs/lib/mapObject.js */
/* imports:
[]
*/
/* default export: mapObject */
/* exports:
undefined
*/


var bBPz = Object.prototype.hasOwnProperty;

function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (bBPz.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}
/* bandol: node_modules/react/lib/ReactDOMFactories.js */
/* imports:
[]
*/
/* default export: ReactDOMFactories */
/* exports:
undefined
*/

function bee6(tag) {
  return ReactElement.createFactory(tag);
}

var ReactDOMFactories = mapObject({
  a: 'a',
  abbr: 'abbr',
  address: 'address',
  area: 'area',
  article: 'article',
  aside: 'aside',
  audio: 'audio',
  b: 'b',
  base: 'base',
  bdi: 'bdi',
  bdo: 'bdo',
  big: 'big',
  blockquote: 'blockquote',
  body: 'body',
  br: 'br',
  button: 'button',
  canvas: 'canvas',
  caption: 'caption',
  cite: 'cite',
  code: 'code',
  col: 'col',
  colgroup: 'colgroup',
  data: 'data',
  datalist: 'datalist',
  dd: 'dd',
  del: 'del',
  details: 'details',
  dfn: 'dfn',
  dialog: 'dialog',
  div: 'div',
  dl: 'dl',
  dt: 'dt',
  em: 'em',
  embed: 'embed',
  fieldset: 'fieldset',
  figcaption: 'figcaption',
  figure: 'figure',
  footer: 'footer',
  form: 'form',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  head: 'head',
  header: 'header',
  hgroup: 'hgroup',
  hr: 'hr',
  html: 'html',
  i: 'i',
  iframe: 'iframe',
  img: 'img',
  input: 'input',
  ins: 'ins',
  kbd: 'kbd',
  keygen: 'keygen',
  label: 'label',
  legend: 'legend',
  li: 'li',
  link: 'link',
  main: 'main',
  map: 'map',
  mark: 'mark',
  menu: 'menu',
  menuitem: 'menuitem',
  meta: 'meta',
  meter: 'meter',
  nav: 'nav',
  noscript: 'noscript',
  object: 'object',
  ol: 'ol',
  optgroup: 'optgroup',
  option: 'option',
  output: 'output',
  p: 'p',
  param: 'param',
  picture: 'picture',
  pre: 'pre',
  progress: 'progress',
  q: 'q',
  rp: 'rp',
  rt: 'rt',
  ruby: 'ruby',
  s: 's',
  samp: 'samp',
  script: 'script',
  section: 'section',
  select: 'select',
  small: 'small',
  source: 'source',
  span: 'span',
  strong: 'strong',
  style: 'style',
  sub: 'sub',
  summary: 'summary',
  sup: 'sup',
  table: 'table',
  tbody: 'tbody',
  td: 'td',
  textarea: 'textarea',
  tfoot: 'tfoot',
  th: 'th',
  thead: 'thead',
  time: 'time',
  title: 'title',
  tr: 'tr',
  track: 'track',
  u: 'u',
  ul: 'ul',
  'var': 'var',
  video: 'video',
  wbr: 'wbr',

  circle: 'circle',
  clipPath: 'clipPath',
  defs: 'defs',
  ellipse: 'ellipse',
  g: 'g',
  image: 'image',
  line: 'line',
  linearGradient: 'linearGradient',
  mask: 'mask',
  path: 'path',
  pattern: 'pattern',
  polygon: 'polygon',
  polyline: 'polyline',
  radialGradient: 'radialGradient',
  rect: 'rect',
  stop: 'stop',
  svg: 'svg',
  text: 'text',
  tspan: 'tspan'

}, bee6);
/* bandol: node_modules/fbjs/lib/warning.js */
/* imports:
[]
*/
/* default export: warning */
/* exports:
undefined
*/


var warning = emptyFunction;
/* bandol: node_modules/fbjs/lib/keyOf.js */
/* imports:
[]
*/
/* default export: keyOf */
/* exports:
undefined
*/


var keyOf = function (oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};
/* bandol: node_modules/fbjs/lib/keyMirror.js */
/* imports:
[]
*/
/* default export: keyMirror */
/* exports:
undefined
*/

var keyMirror = function (obj) {
  var ret = {};
  var key;
  !(obj instanceof Object && !Array.isArray(obj)) ? 'production' !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};
/* bandol: node_modules/fbjs/lib/emptyObject.js */
/* imports:
[]
*/
/* default export: emptyObject */
/* exports:
undefined
*/


var emptyObject = {};
/* bandol: node_modules/react/lib/ReactNoopUpdateQueue.js */
/* imports:
[]
*/
/* default export: ReactNoopUpdateQueue */
/* exports:
undefined
*/


function b2p4(publicInstance, callerName) {}

var ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false;
  },

  enqueueCallback: function (publicInstance, callback) {},

  enqueueForceUpdate: function (publicInstance) {
    b2p4(publicInstance, 'forceUpdate');
  },

  enqueueReplaceState: function (publicInstance, completeState) {
    b2p4(publicInstance, 'replaceState');
  },

  enqueueSetState: function (publicInstance, partialState) {
    b2p4(publicInstance, 'setState');
  },

  enqueueSetProps: function (publicInstance, partialProps) {
    b2p4(publicInstance, 'setProps');
  },

  enqueueReplaceProps: function (publicInstance, props) {
    b2p4(publicInstance, 'replaceProps');
  }

};
/* bandol: node_modules/react/lib/ReactComponent.js */
/* imports:
[]
*/
/* default export: ReactComponent */
/* exports:
undefined
*/

function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;

  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? 'production' !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : undefined;

  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
};

ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
};
/* bandol: node_modules/react/lib/ReactClass.js */
/* imports:
[]
*/
/* default export: ReactClass */
/* exports:
undefined
*/


var bG43 = keyOf({ mixins: null });

var bbem = keyMirror({
  DEFINE_ONCE: null,

  DEFINE_MANY: null,

  OVERRIDE_BASE: null,

  DEFINE_MANY_MERGED: null
});

var blna = [];

var bVYy = false;

var bgpx = {
  mixins: bbem.DEFINE_MANY,

  statics: bbem.DEFINE_MANY,

  propTypes: bbem.DEFINE_MANY,

  contextTypes: bbem.DEFINE_MANY,

  childContextTypes: bbem.DEFINE_MANY,

  getDefaultProps: bbem.DEFINE_MANY_MERGED,

  getInitialState: bbem.DEFINE_MANY_MERGED,

  getChildContext: bbem.DEFINE_MANY_MERGED,

  render: bbem.DEFINE_ONCE,

  componentWillMount: bbem.DEFINE_MANY,

  componentDidMount: bbem.DEFINE_MANY,

  componentWillReceiveProps: bbem.DEFINE_MANY,

  shouldComponentUpdate: bbem.DEFINE_ONCE,

  componentWillUpdate: bbem.DEFINE_MANY,

  componentDidUpdate: bbem.DEFINE_MANY,

  componentWillUnmount: bbem.DEFINE_MANY,

  updateComponent: bbem.OVERRIDE_BASE

};

var bMzR = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        bZYe(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    Constructor.childContextTypes = assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    Constructor.contextTypes = assign({}, Constructor.contextTypes, contextTypes);
  },

  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = bpYO(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    Constructor.propTypes = assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    bAy8(Constructor, statics);
  },
  autobind: function () {} };

function b6L5(proto, name) {
  var specPolicy = bgpx.hasOwnProperty(name) ? bgpx[name] : null;

  if (bvn7.hasOwnProperty(name)) {
    !(specPolicy === bbem.OVERRIDE_BASE) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : undefined;
  }

  if (proto.hasOwnProperty(name)) {
    !(specPolicy === bbem.DEFINE_MANY || specPolicy === bbem.DEFINE_MANY_MERGED) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : undefined;
  }
}

function bZYe(Constructor, spec) {
  if (!spec) {
    return;
  }

  !(typeof spec !== 'function') ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
  !!ReactElement.isValidElement(spec) ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;

  var proto = Constructor.prototype;

  if (spec.hasOwnProperty(bG43)) {
    bMzR.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === bG43) {
      continue;
    }

    var property = spec[name];
    b6L5(proto, name);

    if (bMzR.hasOwnProperty(name)) {
      bMzR[name](Constructor, property);
    } else {
      var isReactClassMethod = bgpx.hasOwnProperty(name);
      var isAlreadyDefined = proto.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        if (!proto.__reactAutoBindMap) {
          proto.__reactAutoBindMap = {};
        }
        proto.__reactAutoBindMap[name] = property;
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = bgpx[name];

          !(isReactClassMethod && (specPolicy === bbem.DEFINE_MANY_MERGED || specPolicy === bbem.DEFINE_MANY)) ? 'production' !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : undefined;

          if (specPolicy === bbem.DEFINE_MANY_MERGED) {
            proto[name] = bpYO(proto[name], property);
          } else if (specPolicy === bbem.DEFINE_MANY) {
            proto[name] = bmY5(proto[name], property);
          }
        } else {
          proto[name] = property;
        }
      }
    }
  }
}

function bAy8(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in bMzR;
    !!isReserved ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : undefined;

    var isInherited = name in Constructor;
    !!isInherited ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : undefined;
    Constructor[name] = property;
  }
}

function b3Vn(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : undefined;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : undefined;
      one[key] = two[key];
    }
  }
  return one;
}

function bpYO(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    b3Vn(c, a);
    b3Vn(c, b);
    return c;
  };
}

function bmY5(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

function bnY8(component, method) {
  var boundMethod = method.bind(component);

  return boundMethod;
}

function bznq(component) {
  for (var autoBindKey in component.__reactAutoBindMap) {
    if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
      var method = component.__reactAutoBindMap[autoBindKey];
      component[autoBindKey] = bnY8(component, method);
    }
  }
}

var bvn7 = {
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback);
    }
  },

  isMounted: function () {
    return this.updater.isMounted(this);
  },

  setProps: function (partialProps, callback) {
    this.updater.enqueueSetProps(this, partialProps);
    if (callback) {
      this.updater.enqueueCallback(this, callback);
    }
  },

  replaceProps: function (newProps, callback) {
    this.updater.enqueueReplaceProps(this, newProps);
    if (callback) {
      this.updater.enqueueCallback(this, callback);
    }
  }
};

var baeZ = function () {};
assign(baeZ.prototype, ReactComponent.prototype, bvn7);

var ReactClass = {
  createClass: function (spec) {
    var Constructor = function (props, context, updater) {
      if (this.__reactAutoBindMap) {
        bznq(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      var initialState = this.getInitialState ? this.getInitialState() : null;

      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? 'production' !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : undefined;

      this.state = initialState;
    };
    Constructor.prototype = new baeZ();
    Constructor.prototype.constructor = Constructor;

    blna.forEach(bZYe.bind(null, Constructor));

    bZYe(Constructor, spec);

    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    !Constructor.prototype.render ? 'production' !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : undefined;

    for (var methodName in bgpx) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      blna.push(mixin);
    }
  }

};
/* bandol: node_modules/react/lib/ReactRootIndex.js */
/* imports:
[]
*/
/* default export: ReactRootIndex */
/* exports:
undefined
*/


var b4dK = {
  injectCreateReactRootIndex: function (_createReactRootIndex) {
    ReactRootIndex.createReactRootIndex = _createReactRootIndex;
  }
};

var ReactRootIndex = {
  createReactRootIndex: null,
  injection: b4dK
};
/* bandol: node_modules/react/lib/ReactInstanceHandles.js */
/* imports:
[]
*/
/* default export: ReactInstanceHandles */
/* exports:
undefined
*/


var bG4p = '.';
var bbe3 = bG4p.length;

var blnv = 10000;

function bVYv(index) {
  return bG4p + index.toString(36);
}

function br8K(id, index) {
  return id.charAt(index) === bG4p || index === id.length;
}

function bQzL(id) {
  return id === '' || id.charAt(0) === bG4p && id.charAt(id.length - 1) !== bG4p;
}

function bPzZ(ancestorID, descendantID) {
  return descendantID.indexOf(ancestorID) === 0 && br8K(descendantID, ancestorID.length);
}

function bxnE(id) {
  return id ? id.substr(0, id.lastIndexOf(bG4p)) : '';
}

function bXw7(ancestorID, destinationID) {
  !(bQzL(ancestorID) && bQzL(destinationID)) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(false) : undefined;
  !bPzZ(ancestorID, destinationID) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(false) : undefined;
  if (ancestorID === destinationID) {
    return ancestorID;
  }

  var start = ancestorID.length + bbe3;
  var i;
  for (i = start; i < destinationID.length; i++) {
    if (br8K(destinationID, i)) {
      break;
    }
  }
  return destinationID.substr(0, i);
}

function bRYY(oneID, twoID) {
  var minLength = Math.min(oneID.length, twoID.length);
  if (minLength === 0) {
    return '';
  }
  var lastCommonMarkerIndex = 0;

  for (var i = 0; i <= minLength; i++) {
    if (br8K(oneID, i) && br8K(twoID, i)) {
      lastCommonMarkerIndex = i;
    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
      break;
    }
  }
  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
  !bQzL(longestCommonID) ? 'production' !== 'production' ? invariant(false, 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(false) : undefined;
  return longestCommonID;
}

function bKyB(start, stop, cb, arg, skipFirst, skipLast) {
  start = start || '';
  stop = stop || '';
  !(start !== stop) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(false) : undefined;
  var traverseUp = bPzZ(stop, start);
  !(traverseUp || bPzZ(start, stop)) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(false) : undefined;

  var depth = 0;
  var traverse = traverseUp ? bxnE : bXw7;
  for (var id = start;; id = traverse(id, stop)) {
    var ret;
    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
      ret = cb(id, traverseUp, arg);
    }
    if (ret === false || id === stop) {
      break;
    }
    !(depth++ < blnv) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop, id) : invariant(false) : undefined;
  }
}

var ReactInstanceHandles = {
  createReactRootID: function () {
    return bVYv(ReactRootIndex.createReactRootIndex());
  },

  createReactID: function (rootID, name) {
    return rootID + name;
  },

  getReactRootIDFromNodeID: function (id) {
    if (id && id.charAt(0) === bG4p && id.length > 1) {
      var index = id.indexOf(bG4p, 1);
      return index > -1 ? id.substr(0, index) : id;
    }
    return null;
  },

  traverseEnterLeave: function (leaveID, enterID, cb, upArg, downArg) {
    var ancestorID = bRYY(leaveID, enterID);
    if (ancestorID !== leaveID) {
      bKyB(leaveID, ancestorID, cb, upArg, false, true);
    }
    if (ancestorID !== enterID) {
      bKyB(ancestorID, enterID, cb, downArg, true, false);
    }
  },

  traverseTwoPhase: function (targetID, cb, arg) {
    if (targetID) {
      bKyB('', targetID, cb, arg, true, false);
      bKyB(targetID, '', cb, arg, false, true);
    }
  },

  traverseTwoPhaseSkipTarget: function (targetID, cb, arg) {
    if (targetID) {
      bKyB('', targetID, cb, arg, true, true);
      bKyB(targetID, '', cb, arg, true, true);
    }
  },

  traverseAncestors: function (targetID, cb, arg) {
    bKyB('', targetID, cb, arg, true, false);
  },

  getFirstCommonAncestorID: bRYY,

  _getNextDescendantID: bXw7,

  isAncestorIDOf: bPzZ,

  SEPARATOR: bG4p

};
/* bandol: node_modules/react/lib/traverseAllChildren.js */
/* imports:
[]
*/
/* default export: traverseAllChildren */
/* exports:
undefined
*/


var byP8 = ReactInstanceHandles.SEPARATOR;
var brq3 = ':';

var bQYm = {
  '=': '=0',
  '.': '=1',
  ':': '=2'
};

var bPYO = /[=.:]/g;

function bxQx(match) {
  return bQYm[match];
}

function bX7p(component, index) {
  if (component && component.key != null) {
    return bKZ2(component.key);
  }

  return index.toString(36);
}

function bRZP(text) {
  return ('' + text).replace(bPYO, bxQx);
}

function bKZ2(key) {
  return '$' + bRZP(key);
}

function b4Rp(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
    callback(traverseContext, children, nameSoFar === '' ? byP8 + bX7p(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0;
  var nextNamePrefix = nameSoFar === '' ? byP8 : nameSoFar + brq3;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + bX7p(child, i);
      subtreeCount += b4Rp(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + bX7p(child, ii++);
          subtreeCount += b4Rp(child, nextName, callback, traverseContext);
        }
      } else {
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + bKZ2(entry[0]) + brq3 + bX7p(child, 0);
            subtreeCount += b4Rp(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';

      var childrenString = String(children);
      !false ? 'production' !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : undefined;
    }
  }

  return subtreeCount;
}

function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return b4Rp(children, '', callback, traverseContext);
}
/* bandol: node_modules/react/lib/PooledClass.js */
/* imports:
[]
*/
/* default export: PooledClass */
/* exports:
undefined
*/

var b7OL = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var bL0z = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var b0QR = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var b1Pn = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var bwr6 = function (a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var bkX0 = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? 'production' !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : undefined;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var b5KY = 10;
var bJZN = b7OL;

var bqe3 = function (CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || bJZN;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = b5KY;
  }
  NewKlass.release = bkX0;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: bqe3,
  oneArgumentPooler: b7OL,
  twoArgumentPooler: bL0z,
  threeArgumentPooler: b0QR,
  fourArgumentPooler: b1Pn,
  fiveArgumentPooler: bwr6
};
/* bandol: node_modules/react/lib/ReactChildren.js */
/* imports:
[]
*/
/* default export: ReactChildren */
/* exports:
undefined
*/


var bzxb = PooledClass.twoArgumentPooler;
var bv6p = PooledClass.fourArgumentPooler;

var baPV = /\/(?!\/)/g;
function b2xy(text) {
  return ('' + text).replace(baPV, '//');
}

function beKg(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
beKg.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(beKg, bzxb);

function bB2L(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

function bYM2(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = beKg.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, bB2L, traverseContext);
  beKg.release(traverseContext);
}

function bOgk(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
bOgk.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(bOgk, bv6p);

function b8bw(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    bN2E(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild !== child ? b2xy(mappedChild.key || '') + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function bN2E(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = b2xy(prefix) + '/';
  }
  var traverseContext = bOgk.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, b8bw, traverseContext);
  bOgk.release(traverseContext);
}

function bdRd(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  bN2E(children, result, null, func, context);
  return result;
}

function b9Bk(traverseContext, child, name) {
  return null;
}

function bE5d(children, context) {
  return traverseAllChildren(children, b9Bk, null);
}

function toArray(children) {
  var result = [];
  bN2E(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: bYM2,
  map: bdRd,
  mapIntoWithKeyPrefixInternal: bN2E,
  count: bE5d,
  toArray: toArray
};
/* bandol: node_modules/react/lib/ReactIsomorphic.js */
/* imports:
[]
*/
/* default export: ReactIsomorphic */
/* exports:
undefined
*/


var bpLE = ReactElement.createElement;
var bmKz = ReactElement.createFactory;
var bn4K = ReactElement.cloneElement;

var ReactIsomorphic = {

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,

  createElement: bpLE,
  cloneElement: bn4K,
  isValidElement: ReactElement.isValidElement,

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: bmKz,
  createMixin: function (mixin) {
    return mixin;
  },

  DOM: ReactDOMFactories,

  version: ReactVersion,

  __spread: assign
};
/* bandol: node_modules/react/lib/ReactNativeComponent.js */
/* imports:
[]
*/
/* default export: ReactNativeComponent */
/* exports:
undefined
*/


var bbx3 = null;
var blRv = null;

var bVmv = {};
var bgr3 = null;

var bM7k = {
  injectGenericComponentClass: function (componentClass) {
    blRv = componentClass;
  },

  injectTextComponentClass: function (componentClass) {
    bgr3 = componentClass;
  },

  injectComponentClasses: function (componentClasses) {
    assign(bVmv, componentClasses);
  }
};

function b64r(element) {
  if (typeof element.type === 'function') {
    return element.type;
  }
  var tag = element.type;
  var componentClass = bVmv[tag];
  if (componentClass == null) {
    bVmv[tag] = componentClass = bbx3(tag);
  }
  return componentClass;
}

function bZvR(element) {
  !blRv ? 'production' !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : invariant(false) : undefined;
  return new blRv(element.type, element.props);
}

function bAee(text) {
  return new bgr3(text);
}

function b3XV(component) {
  return component instanceof bgr3;
}

var ReactNativeComponent = {
  getComponentClassForElement: b64r,
  createInternalComponent: bZvR,
  createInstanceForText: bAee,
  isTextComponent: b3XV,
  injection: bM7k
};
/* bandol: node_modules/react/lib/ReactOwner.js */
/* imports:
[]
*/
/* default export: ReactOwner */
/* exports:
undefined
*/

var ReactOwner = {
  isValidOwner: function (object) {
    return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
  },

  addComponentAsRefTo: function (component, ref, owner) {
    !ReactOwner.isValidOwner(owner) ? 'production' !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might ' + 'be adding a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
    owner.attachRef(ref, component);
  },

  removeComponentAsRefFrom: function (component, ref, owner) {
    !ReactOwner.isValidOwner(owner) ? 'production' !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might ' + 'be removing a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;

    if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
      owner.detachRef(ref);
    }
  }

};
/* bandol: node_modules/react/lib/ReactRef.js */
/* imports:
[]
*/
/* default export: ReactRef */
/* exports:
undefined
*/


var ReactRef = {};

function b4lp(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function bGZp(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(null);
  } else {
    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
  }
}

ReactRef.attachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    b4lp(ref, instance, element._owner);
  }
};

ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {

  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;

  return prevEmpty || nextEmpty || nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref;
};

ReactRef.detachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    bGZp(ref, instance, element._owner);
  }
};
/* bandol: node_modules/react/lib/ReactReconciler.js */
/* imports:
[]
*/
/* default export: ReactReconciler */
/* exports:
undefined
*/

function bKG2() {
  ReactRef.attachRefs(this, this._currentElement);
}

var ReactReconciler = {
  mountComponent: function (internalInstance, rootID, transaction, context) {
    var markup = internalInstance.mountComponent(rootID, transaction, context);
    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(bKG2, internalInstance);
    }
    return markup;
  },

  unmountComponent: function (internalInstance) {
    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
    internalInstance.unmountComponent();
  },

  receiveComponent: function (internalInstance, nextElement, transaction, context) {
    var prevElement = internalInstance._currentElement;

    if (nextElement === prevElement && context === internalInstance._context) {
      return;
    }

    var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);

    if (refsChanged) {
      ReactRef.detachRefs(internalInstance, prevElement);
    }

    internalInstance.receiveComponent(nextElement, transaction, context);

    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(bKG2, internalInstance);
    }
  },

  performUpdateIfNecessary: function (internalInstance, transaction) {
    internalInstance.performUpdateIfNecessary(transaction);
  }

};
/* bandol: node_modules/react/lib/ReactEmptyComponentRegistry.js */
/* imports:
[]
*/
/* default export: ReactEmptyComponentRegistry */
/* exports:
undefined
*/

var bPnO = {};

function bxEx(id) {
  return !!bPnO[id];
}

function bXxp(id) {
  bPnO[id] = true;
}

function bR7P(id) {
  delete bPnO[id];
}

var ReactEmptyComponentRegistry = {
  isNullComponentID: bxEx,
  registerNullComponentID: bXxp,
  deregisterNullComponentID: bR7P
};
/* bandol: node_modules/react/lib/ReactEmptyComponent.js */
/* imports:
[]
*/
/* default export: ReactEmptyComponent */
/* exports:
undefined
*/


var brL3;

var bQ0m = {
  injectEmptyComponent: function (component) {
    brL3 = ReactElement.createElement(component);
  }
};

var ReactEmptyComponent = function (instantiate) {
  this._currentElement = null;
  this._rootNodeID = null;
  this._renderedComponent = instantiate(brL3);
};
assign(ReactEmptyComponent.prototype, {
  construct: function (element) {},
  mountComponent: function (rootID, transaction, context) {
    ReactEmptyComponentRegistry.registerNullComponentID(rootID);
    this._rootNodeID = rootID;
    return ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, context);
  },
  receiveComponent: function () {},
  unmountComponent: function (rootID, transaction, context) {
    ReactReconciler.unmountComponent(this._renderedComponent);
    ReactEmptyComponentRegistry.deregisterNullComponentID(this._rootNodeID);
    this._rootNodeID = null;
    this._renderedComponent = null;
  }
});

ReactEmptyComponent.injection = bQ0m;
/* bandol: node_modules/react/lib/shouldUpdateReactComponent.js */
/* imports:
[]
*/
/* default export: shouldUpdateReactComponent */
/* exports:
undefined
*/

function shouldUpdateReactComponent(prevElement, nextElement) {
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  if (prevEmpty || nextEmpty) {
    return prevEmpty === nextEmpty;
  }

  var prevType = typeof prevElement;
  var nextType = typeof nextElement;
  if (prevType === 'string' || prevType === 'number') {
    return nextType === 'string' || nextType === 'number';
  } else {
    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
  }
  return false;
}
/* bandol: node_modules/react/lib/Transaction.js */
/* imports:
[]
*/
/* default export: Transaction */
/* exports:
undefined
*/

var by68 = {
  reinitializeTransaction: function () {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  getTransactionWrappers: null,

  isInTransaction: function () {
    return !!this._isInTransaction;
  },

  perform: function (method, scope, a, b, c, d, e, f) {
    !!this.isInTransaction() ? 'production' !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there ' + 'is already an outstanding transaction.') : invariant(false) : undefined;
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;

      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  initializeAll: function (startIndex) {
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      try {
        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
      } finally {
        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
          try {
            this.initializeAll(i + 1);
          } catch (err) {}
        }
      }
    }
  },

  closeAll: function (startIndex) {
    !this.isInTransaction() ? 'production' !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : invariant(false) : undefined;
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        errorThrown = true;
        if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
          wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        if (errorThrown) {
          try {
            this.closeAll(i + 1);
          } catch (e) {}
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

var Transaction = {

  Mixin: by68,

  OBSERVED_ERROR: {}

};
/* bandol: node_modules/react/lib/ReactPerf.js */
/* imports:
[]
*/
/* default export: ReactPerf */
/* exports:
undefined
*/

var ReactPerf = {
  enableMeasure: false,

  storedMeasure: bq93,

  measureMethods: function (object, objectName, methodNames) {},

  measure: function (objName, fnName, func) {
    return func;
  },

  injection: {
    injectMeasure: function (measure) {
      ReactPerf.storedMeasure = measure;
    }
  }
};

function bq93(objName, fnName, func) {
  return func;
}
/* bandol: node_modules/react/lib/CallbackQueue.js */
/* imports:
[]
*/
/* default export: CallbackQueue */
/* exports:
undefined
*/

function CallbackQueue() {
  this._callbacks = null;
  this._contexts = null;
}

assign(CallbackQueue.prototype, {
  enqueue: function (callback, context) {
    this._callbacks = this._callbacks || [];
    this._contexts = this._contexts || [];
    this._callbacks.push(callback);
    this._contexts.push(context);
  },

  notifyAll: function () {
    var callbacks = this._callbacks;
    var contexts = this._contexts;
    if (callbacks) {
      !(callbacks.length === contexts.length) ? 'production' !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : invariant(false) : undefined;
      this._callbacks = null;
      this._contexts = null;
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i].call(contexts[i]);
      }
      callbacks.length = 0;
      contexts.length = 0;
    }
  },

  reset: function () {
    this._callbacks = null;
    this._contexts = null;
  },

  destructor: function () {
    this.reset();
  }

});

PooledClass.addPoolingTo(CallbackQueue);
/* bandol: node_modules/react/lib/ReactUpdates.js */
/* imports:
[]
*/
/* default export: ReactUpdates */
/* exports:
undefined
*/


var bBAL = [];
var bYX2 = CallbackQueue.getPooled();
var bOnk = false;

var b89w = null;

function bN8E() {
  !(ReactUpdates.ReactReconcileTransaction && b89w) ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(false) : undefined;
}

var bdkd = {
  initialize: function () {
    this.dirtyComponentsLength = bBAL.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== bBAL.length) {
      bBAL.splice(0, this.dirtyComponentsLength);
      bw36();
    } else {
      bBAL.length = 0;
    }
  }
};

var b9Vk = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  close: function () {
    this.callbackQueue.notifyAll();
  }
};

var bEld = [bdkd, b9Vk];

function b70L() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue.getPooled();
  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(false);
}

assign(b70L.prototype, Transaction.Mixin, {
  getTransactionWrappers: function () {
    return bEld;
  },

  destructor: function () {
    this.dirtyComponentsLength = null;
    CallbackQueue.release(this.callbackQueue);
    this.callbackQueue = null;
    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
    this.reconcileTransaction = null;
  },

  perform: function (method, scope, a) {
    return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
  }
});

PooledClass.addPoolingTo(b70L);

function bLVz(callback, a, b, c, d, e) {
  bN8E();
  b89w.batchedUpdates(callback, a, b, c, d, e);
}

function b0OR(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function b1On(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === bBAL.length) ? 'production' !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, bBAL.length) : invariant(false) : undefined;

  bBAL.sort(b0OR);

  for (var i = 0; i < len; i++) {
    var component = bBAL[i];

    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;

    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);

    if (callbacks) {
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
      }
    }
  }
}

var bw36 = function () {
  while (bBAL.length || bOnk) {
    if (bBAL.length) {
      var transaction = b70L.getPooled();
      transaction.perform(b1On, null, transaction);
      b70L.release(transaction);
    }

    if (bOnk) {
      bOnk = false;
      var queue = bYX2;
      bYX2 = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};
bw36 = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', bw36);

function bk90(component) {
  bN8E();

  if (!b89w.isBatchingUpdates) {
    b89w.batchedUpdates(bk90, component);
    return;
  }

  bBAL.push(component);
}

function b50Y(callback, context) {
  !b89w.isBatchingUpdates ? 'production' !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(false) : undefined;
  bYX2.enqueue(callback, context);
  bOnk = true;
}

var bJeN = {
  injectReconcileTransaction: function (ReconcileTransaction) {
    !ReconcileTransaction ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : invariant(false) : undefined;
    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
  },

  injectBatchingStrategy: function (_batchingStrategy) {
    !_batchingStrategy ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : invariant(false) : undefined;
    !(typeof _batchingStrategy.batchedUpdates === 'function') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : invariant(false) : undefined;
    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(false) : undefined;
    b89w = _batchingStrategy;
  }
};

var ReactUpdates = {
  ReactReconcileTransaction: null,

  batchedUpdates: bLVz,
  enqueueUpdate: bk90,
  flushBatchedUpdates: bw36,
  injection: bJeN,
  asap: b50Y
};
/* bandol: node_modules/react/lib/ReactInstanceMap.js */
/* imports:
[]
*/
/* default export: ReactInstanceMap */
/* exports:
undefined
*/

var ReactInstanceMap = {
  remove: function (key) {
    key._reactInternalInstance = undefined;
  },

  get: function (key) {
    return key._reactInternalInstance;
  },

  has: function (key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function (key, value) {
    key._reactInternalInstance = value;
  }

};
/* bandol: node_modules/react/lib/ReactUpdateQueue.js */
/* imports:
[]
*/
/* default export: ReactUpdateQueue */
/* exports:
undefined
*/


function b2ly(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}

function bevg(publicInstance, callerName) {
  var internalInstance = ReactInstanceMap.get(publicInstance);
  if (!internalInstance) {
    return null;
  }

  return internalInstance;
}

var ReactUpdateQueue = {
  isMounted: function (publicInstance) {
    var internalInstance = ReactInstanceMap.get(publicInstance);
    if (internalInstance) {
      return !!internalInstance._renderedComponent;
    } else {
      return false;
    }
  },

  enqueueCallback: function (publicInstance, callback) {
    !(typeof callback === 'function') ? 'production' !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
    var internalInstance = bevg(publicInstance);

    if (!internalInstance) {
      return null;
    }

    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }

    b2ly(internalInstance);
  },

  enqueueCallbackInternal: function (internalInstance, callback) {
    !(typeof callback === 'function') ? 'production' !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    b2ly(internalInstance);
  },

  enqueueForceUpdate: function (publicInstance) {
    var internalInstance = bevg(publicInstance, 'forceUpdate');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingForceUpdate = true;

    b2ly(internalInstance);
  },

  enqueueReplaceState: function (publicInstance, completeState) {
    var internalInstance = bevg(publicInstance, 'replaceState');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingStateQueue = [completeState];
    internalInstance._pendingReplaceState = true;

    b2ly(internalInstance);
  },

  enqueueSetState: function (publicInstance, partialState) {
    var internalInstance = bevg(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    b2ly(internalInstance);
  },

  enqueueSetProps: function (publicInstance, partialProps) {
    var internalInstance = bevg(publicInstance, 'setProps');
    if (!internalInstance) {
      return;
    }
    ReactUpdateQueue.enqueueSetPropsInternal(internalInstance, partialProps);
  },

  enqueueSetPropsInternal: function (internalInstance, partialProps) {
    var topLevelWrapper = internalInstance._topLevelWrapper;
    !topLevelWrapper ? 'production' !== 'production' ? invariant(false, 'setProps(...): You called `setProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;

    var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
    var element = wrapElement.props;
    var props = assign({}, element.props, partialProps);
    topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));

    b2ly(topLevelWrapper);
  },

  enqueueReplaceProps: function (publicInstance, props) {
    var internalInstance = bevg(publicInstance, 'replaceProps');
    if (!internalInstance) {
      return;
    }
    ReactUpdateQueue.enqueueReplacePropsInternal(internalInstance, props);
  },

  enqueueReplacePropsInternal: function (internalInstance, props) {
    var topLevelWrapper = internalInstance._topLevelWrapper;
    !topLevelWrapper ? 'production' !== 'production' ? invariant(false, 'replaceProps(...): You called `replaceProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;

    var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
    var element = wrapElement.props;
    topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));

    b2ly(topLevelWrapper);
  },

  enqueueElementInternal: function (internalInstance, newElement) {
    internalInstance._pendingElement = newElement;
    b2ly(internalInstance);
  }

};
/* bandol: node_modules/react/lib/ReactPropTypeLocations.js */
/* imports:
[]
*/
/* default export: ReactPropTypeLocations */
/* exports:
undefined
*/


var ReactPropTypeLocations = keyMirror({
  prop: null,
  context: null,
  childContext: null
});
/* bandol: node_modules/react/lib/ReactComponentEnvironment.js */
/* imports:
[]
*/
/* default export: ReactComponentEnvironment */
/* exports:
undefined
*/


var bagV = false;

var ReactComponentEnvironment = {
  unmountIDFromEnvironment: null,

  replaceNodeWithMarkupByID: null,

  processChildrenUpdates: null,

  injection: {
    injectEnvironment: function (environment) {
      !!bagV ? 'production' !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : undefined;
      ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
      ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
      bagV = true;
    }
  }

};
/* bandol: node_modules/react/lib/ReactCompositeComponent.js */
/* imports:
[]
*/
/* default export: ReactCompositeComponent */
/* exports:
undefined
*/


function bmLz(component) {
  var owner = component._currentElement._owner || null;
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function bnLK(Component) {}
bnLK.prototype.render = function () {
  var Component = ReactInstanceMap.get(this)._currentElement.type;
  return Component(this.props, this.context, this.updater);
};

var bz6b = 1;

var bvNp = {
  construct: function (element) {
    this._currentElement = element;
    this._rootNodeID = null;
    this._instance = null;

    this._pendingElement = null;
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    this._renderedComponent = null;

    this._context = null;
    this._mountOrder = 0;
    this._topLevelWrapper = null;

    this._pendingCallbacks = null;
  },

  mountComponent: function (rootID, transaction, context) {
    this._context = context;
    this._mountOrder = bz6b++;
    this._rootNodeID = rootID;

    var publicProps = this._processProps(this._currentElement.props);
    var publicContext = this._processContext(context);

    var Component = this._currentElement.type;

    var inst;
    var renderedElement;

    var canInstantiate = 'prototype' in Component;

    if (canInstantiate) {
      inst = new Component(publicProps, publicContext, ReactUpdateQueue);
    }

    if (!canInstantiate || inst === null || inst === false || ReactElement.isValidElement(inst)) {
      renderedElement = inst;
      inst = new bnLK(Component);
    }

    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject;
    inst.updater = ReactUpdateQueue;

    this._instance = inst;

    ReactInstanceMap.set(inst, this);

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    !(typeof initialState === 'object' && !Array.isArray(initialState)) ? 'production' !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    if (inst.componentWillMount) {
      inst.componentWillMount();

      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    this._renderedComponent = this._instantiateReactComponent(renderedElement);

    var markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._processChildContext(context));
    if (inst.componentDidMount) {
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
    }

    return markup;
  },

  unmountComponent: function () {
    var inst = this._instance;

    if (inst.componentWillUnmount) {
      inst.componentWillUnmount();
    }

    ReactReconciler.unmountComponent(this._renderedComponent);
    this._renderedComponent = null;
    this._instance = null;

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;
    this._pendingCallbacks = null;
    this._pendingElement = null;

    this._context = null;
    this._rootNodeID = null;
    this._topLevelWrapper = null;

    ReactInstanceMap.remove(inst);
  },

  _maskContext: function (context) {
    var maskedContext = null;
    var Component = this._currentElement.type;
    var contextTypes = Component.contextTypes;
    if (!contextTypes) {
      return emptyObject;
    }
    maskedContext = {};
    for (var contextName in contextTypes) {
      maskedContext[contextName] = context[contextName];
    }
    return maskedContext;
  },

  _processContext: function (context) {
    var maskedContext = this._maskContext(context);

    return maskedContext;
  },

  _processChildContext: function (currentContext) {
    var Component = this._currentElement.type;
    var inst = this._instance;
    var childContext = inst.getChildContext && inst.getChildContext();
    if (childContext) {
      !(typeof Component.childContextTypes === 'object') ? 'production' !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;

      for (var name in childContext) {
        !(name in Component.childContextTypes) ? 'production' !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : invariant(false) : undefined;
      }
      return assign({}, currentContext, childContext);
    }
    return currentContext;
  },

  _processProps: function (newProps) {
    return newProps;
  },

  _checkPropTypes: function (propTypes, props, location) {
    var componentName = this.getName();
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error;
        try {
          !(typeof propTypes[propName] === 'function') ? 'production' !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually ' + 'from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : undefined;
          error = propTypes[propName](props, propName, componentName, location);
        } catch (ex) {
          error = ex;
        }
        if (error instanceof Error) {
          var addendum = bmLz(this);

          if (location === ReactPropTypeLocations.prop) {
            'production' !== 'production' ? warning(false, 'Failed Composite propType: %s%s', error.message, addendum) : undefined;
          } else {
            'production' !== 'production' ? warning(false, 'Failed Context Types: %s%s', error.message, addendum) : undefined;
          }
        }
      }
    }
  },

  receiveComponent: function (nextElement, transaction, nextContext) {
    var prevElement = this._currentElement;
    var prevContext = this._context;

    this._pendingElement = null;

    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
  },

  performUpdateIfNecessary: function (transaction) {
    if (this._pendingElement != null) {
      ReactReconciler.receiveComponent(this, this._pendingElement || this._currentElement, transaction, this._context);
    }

    if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
    }
  },

  updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
    var inst = this._instance;

    var nextContext = this._context === nextUnmaskedContext ? inst.context : this._processContext(nextUnmaskedContext);
    var nextProps;

    if (prevParentElement === nextParentElement) {
      nextProps = nextParentElement.props;
    } else {
      nextProps = this._processProps(nextParentElement.props);


      if (inst.componentWillReceiveProps) {
        inst.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    var nextState = this._processPendingState(nextProps, nextContext);

    var shouldUpdate = this._pendingForceUpdate || !inst.shouldComponentUpdate || inst.shouldComponentUpdate(nextProps, nextState, nextContext);

    if (shouldUpdate) {
      this._pendingForceUpdate = false;

      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
    } else {
      this._currentElement = nextParentElement;
      this._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  },

  _processPendingState: function (props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace && queue.length === 1) {
      return queue[0];
    }

    var nextState = assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
    }

    return nextState;
  },

  _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
    var inst = this._instance;

    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
    var prevProps;
    var prevState;
    var prevContext;
    if (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    if (inst.componentWillUpdate) {
      inst.componentWillUpdate(nextProps, nextState, nextContext);
    }

    this._currentElement = nextElement;
    this._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    this._updateRenderedComponent(transaction, unmaskedContext);

    if (hasComponentDidUpdate) {
      transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
    }
  },

  _updateRenderedComponent: function (transaction, context) {
    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._renderValidatedComponent();
    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
      ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
    } else {
      var thisID = this._rootNodeID;
      var prevComponentID = prevComponentInstance._rootNodeID;
      ReactReconciler.unmountComponent(prevComponentInstance);

      this._renderedComponent = this._instantiateReactComponent(nextRenderedElement);
      var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, thisID, transaction, this._processChildContext(context));
      this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
    }
  },

  _replaceNodeWithMarkupByID: function (prevComponentID, nextMarkup) {
    ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
  },

  _renderValidatedComponentWithoutOwnerOrContext: function () {
    var inst = this._instance;
    var renderedComponent = inst.render();


    return renderedComponent;
  },

  _renderValidatedComponent: function () {
    var renderedComponent;
    ReactCurrentOwner.current = this;
    try {
      renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
    } finally {
      ReactCurrentOwner.current = null;
    }
    !(renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)) ? 'production' !== 'production' ? invariant(false, '%s.render(): A valid ReactComponent must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
    return renderedComponent;
  },

  attachRef: function (ref, component) {
    var inst = this.getPublicInstance();
    !(inst != null) ? 'production' !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : invariant(false) : undefined;
    var publicComponentInstance = component.getPublicInstance();

    var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
    refs[ref] = publicComponentInstance;
  },

  detachRef: function (ref) {
    var refs = this.getPublicInstance().refs;
    delete refs[ref];
  },

  getName: function () {
    var type = this._currentElement.type;
    var constructor = this._instance && this._instance.constructor;
    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
  },

  getPublicInstance: function () {
    var inst = this._instance;
    if (inst instanceof bnLK) {
      return null;
    }
    return inst;
  },

  _instantiateReactComponent: null

};

ReactPerf.measureMethods(bvNp, 'ReactCompositeComponent', {
  mountComponent: 'mountComponent',
  updateComponent: 'updateComponent',
  _renderValidatedComponent: '_renderValidatedComponent'
});

var ReactCompositeComponent = {

  Mixin: bvNp

};
/* bandol: node_modules/react/lib/instantiateReactComponent.js */
/* imports:
[]
*/
/* default export: instantiateReactComponent */
/* exports:
undefined
*/

var bAge = function () {};
assign(bAge.prototype, ReactCompositeComponent.Mixin, {
  _instantiateReactComponent: instantiateReactComponent
});

function b36V(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function bp3E(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

function instantiateReactComponent(node) {
  var instance;

  if (node === null || node === false) {
    instance = new ReactEmptyComponent(instantiateReactComponent);
  } else if (typeof node === 'object') {
    var element = node;
    !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? 'production' !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, b36V(element._owner)) : invariant(false) : undefined;

    if (typeof element.type === 'string') {
      instance = ReactNativeComponent.createInternalComponent(element);
    } else if (bp3E(element.type)) {
      instance = new element.type(element);
    } else {
      instance = new bAge();
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    instance = ReactNativeComponent.createInstanceForText(node);
  } else {
    !false ? 'production' !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : invariant(false) : undefined;
  }

  instance.construct(node);

  instance._mountIndex = 0;
  instance._mountImage = null;

  return instance;
}
/* bandol: node_modules/react/lib/ReactServerRenderingTransaction.js */
/* imports:
[]
*/
/* default export: ReactServerRenderingTransaction */
/* exports:
undefined
*/

var bM2k = {
  initialize: function () {
    this.reactMountReady.reset();
  },

  close: emptyFunction
};

var b6gr = [bM2k];

function ReactServerRenderingTransaction(renderToStaticMarkup) {
  this.reinitializeTransaction();
  this.renderToStaticMarkup = renderToStaticMarkup;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = false;
}

var bZRR = {
  getTransactionWrappers: function () {
    return b6gr;
  },

  getReactMountReady: function () {
    return this.reactMountReady;
  },

  destructor: function () {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, bZRR);

PooledClass.addPoolingTo(ReactServerRenderingTransaction);
/* bandol: node_modules/react/lib/ReactServerBatchingStrategy.js */
/* imports:
[]
*/
/* default export: ReactServerBatchingStrategy */
/* exports:
undefined
*/


var ReactServerBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function (callback) {}
};
/* bandol: node_modules/react/lib/adler32.js */
/* imports:
[]
*/
/* default export: adler32 */
/* exports:
undefined
*/


var bgv3 = 65521;

function adler32(data) {
  var a = 1;
  var b = 0;
  var i = 0;
  var l = data.length;
  var m = l & ~0x3;
  while (i < m) {
    for (; i < Math.min(i + 4096, m); i += 4) {
      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
    }
    a %= bgv3;
    b %= bgv3;
  }
  for (; i < l; i++) {
    b += a += data.charCodeAt(i);
  }
  a %= bgv3;
  b %= bgv3;
  return a | b << 16;
}
/* bandol: node_modules/react/lib/ReactMarkupChecksum.js */
/* imports:
[]
*/
/* default export: ReactMarkupChecksum */
/* exports:
undefined
*/


var bVQv = /\/?>/;

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  addChecksumToMarkup: function (markup) {
    var checksum = adler32(markup);

    return markup.replace(bVQv, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
  },

  canReuseMarkup: function (markup, element) {
    var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
  }
};
/* bandol: node_modules/react/lib/ReactDefaultBatchingStrategy.js */
/* imports:
[]
*/
/* default export: ReactDefaultBatchingStrategy */
/* exports:
undefined
*/


var bKv2 = {
  initialize: emptyFunction,
  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var b4yp = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var bG2p = [b4yp, bKv2];

function bbZ3() {
  this.reinitializeTransaction();
}

assign(bbZ3.prototype, Transaction.Mixin, {
  getTransactionWrappers: function () {
    return bG2p;
  }
});

var blev = new bbZ3();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function (callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      blev.perform(callback, null, a, b, c, d, e);
    }
  }
};
/* bandol: node_modules/react/lib/ReactServerRendering.js */
/* imports:
[]
*/
/* default export: ReactServerRendering */
/* exports:
undefined
*/

function bXOp(element) {
  !ReactElement.isValidElement(element) ? 'production' !== 'production' ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : invariant(false) : undefined;

  var transaction;
  try {
    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);

    var id = ReactInstanceHandles.createReactRootID();
    transaction = ReactServerRenderingTransaction.getPooled(false);

    return transaction.perform(function () {
      var componentInstance = instantiateReactComponent(element, null);
      var markup = componentInstance.mountComponent(id, transaction, emptyObject);
      return ReactMarkupChecksum.addChecksumToMarkup(markup);
    }, null);
  } finally {
    ReactServerRenderingTransaction.release(transaction);

    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
  }
}

function bRpP(element) {
  !ReactElement.isValidElement(element) ? 'production' !== 'production' ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : invariant(false) : undefined;

  var transaction;
  try {
    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);

    var id = ReactInstanceHandles.createReactRootID();
    transaction = ReactServerRenderingTransaction.getPooled(true);

    return transaction.perform(function () {
      var componentInstance = instantiateReactComponent(element, null);
      return componentInstance.mountComponent(id, transaction, emptyObject);
    }, null);
  } finally {
    ReactServerRenderingTransaction.release(transaction);

    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
  }
}

var ReactServerRendering = {
  renderToString: bXOp,
  renderToStaticMarkup: bRpP
};
/* bandol: node_modules/react/lib/DOMProperty.js */
/* imports:
[]
*/
/* default export: DOMProperty */
/* exports:
undefined
*/


function bQAm(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var bPZO = {
  MUST_USE_ATTRIBUTE: 0x1,
  MUST_USE_PROPERTY: 0x2,
  HAS_SIDE_EFFECTS: 0x4,
  HAS_BOOLEAN_VALUE: 0x8,
  HAS_NUMERIC_VALUE: 0x10,
  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = bPZO;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
    }

    for (var propName in Properties) {
      !!DOMProperty.properties.hasOwnProperty(propName) ? 'production' !== 'production' ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(false) : undefined;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseAttribute: bQAm(propConfig, Injection.MUST_USE_ATTRIBUTE),
        mustUseProperty: bQAm(propConfig, Injection.MUST_USE_PROPERTY),
        hasSideEffects: bQAm(propConfig, Injection.HAS_SIDE_EFFECTS),
        hasBooleanValue: bQAm(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: bQAm(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: bQAm(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: bQAm(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
      };

      !(!propertyInfo.mustUseAttribute || !propertyInfo.mustUseProperty) ? 'production' !== 'production' ? invariant(false, 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(false) : undefined;
      !(propertyInfo.mustUseProperty || !propertyInfo.hasSideEffects) ? 'production' !== 'production' ? invariant(false, 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(false) : undefined;
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? 'production' !== 'production' ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(false) : undefined;

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];
        propertyInfo.attributeName = attributeName;
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMPropertyNames.hasOwnProperty(propName)) {
        propertyInfo.propertyName = DOMPropertyNames[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      DOMProperty.properties[propName] = propertyInfo;
    }
  }
};
var bxMx = {};

var DOMProperty = {

  ID_ATTRIBUTE_NAME: 'data-reactid',

  properties: {},

  getPossibleStandardName: 'production' !== 'production' ? {} : null,

  _isCustomAttributeFunctions: [],

  isCustomAttribute: function (attributeName) {
    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
      if (isCustomAttributeFn(attributeName)) {
        return true;
      }
    }
    return false;
  },

  getDefaultValueForProperty: function (nodeName, prop) {
    var nodeDefaults = bxMx[nodeName];
    var testElement;
    if (!nodeDefaults) {
      bxMx[nodeName] = nodeDefaults = {};
    }
    if (!(prop in nodeDefaults)) {
      testElement = document.createElement(nodeName);
      nodeDefaults[prop] = testElement[prop];
    }
    return nodeDefaults[prop];
  },

  injection: bPZO
};
/* bandol: node_modules/react/lib/SVGDOMPropertyConfig.js */
/* imports:
[]
*/
/* default export: SVGDOMPropertyConfig */
/* exports:
undefined
*/


var bVB8 = DOMProperty.injection.MUST_USE_ATTRIBUTE;

var brr3 = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

var SVGDOMPropertyConfig = {
  Properties: {
    clipPath: bVB8,
    cx: bVB8,
    cy: bVB8,
    d: bVB8,
    dx: bVB8,
    dy: bVB8,
    fill: bVB8,
    fillOpacity: bVB8,
    fontFamily: bVB8,
    fontSize: bVB8,
    fx: bVB8,
    fy: bVB8,
    gradientTransform: bVB8,
    gradientUnits: bVB8,
    markerEnd: bVB8,
    markerMid: bVB8,
    markerStart: bVB8,
    offset: bVB8,
    opacity: bVB8,
    patternContentUnits: bVB8,
    patternUnits: bVB8,
    points: bVB8,
    preserveAspectRatio: bVB8,
    r: bVB8,
    rx: bVB8,
    ry: bVB8,
    spreadMethod: bVB8,
    stopColor: bVB8,
    stopOpacity: bVB8,
    stroke: bVB8,
    strokeDasharray: bVB8,
    strokeLinecap: bVB8,
    strokeOpacity: bVB8,
    strokeWidth: bVB8,
    textAnchor: bVB8,
    transform: bVB8,
    version: bVB8,
    viewBox: bVB8,
    x1: bVB8,
    x2: bVB8,
    x: bVB8,
    xlinkActuate: bVB8,
    xlinkArcrole: bVB8,
    xlinkHref: bVB8,
    xlinkRole: bVB8,
    xlinkShow: bVB8,
    xlinkTitle: bVB8,
    xlinkType: bVB8,
    xmlBase: bVB8,
    xmlLang: bVB8,
    xmlSpace: bVB8,
    y1: bVB8,
    y2: bVB8,
    y: bVB8
  },
  DOMAttributeNamespaces: {
    xlinkActuate: brr3.xlink,
    xlinkArcrole: brr3.xlink,
    xlinkHref: brr3.xlink,
    xlinkRole: brr3.xlink,
    xlinkShow: brr3.xlink,
    xlinkTitle: brr3.xlink,
    xlinkType: brr3.xlink,
    xmlBase: brr3.xml,
    xmlLang: brr3.xml,
    xmlSpace: brr3.xml
  },
  DOMAttributeNames: {
    clipPath: 'clip-path',
    fillOpacity: 'fill-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    patternContentUnits: 'patternContentUnits',
    patternUnits: 'patternUnits',
    preserveAspectRatio: 'preserveAspectRatio',
    spreadMethod: 'spreadMethod',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strokeDasharray: 'stroke-dasharray',
    strokeLinecap: 'stroke-linecap',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    textAnchor: 'text-anchor',
    viewBox: 'viewBox',
    xlinkActuate: 'xlink:actuate',
    xlinkArcrole: 'xlink:arcrole',
    xlinkHref: 'xlink:href',
    xlinkRole: 'xlink:role',
    xlinkShow: 'xlink:show',
    xlinkTitle: 'xlink:title',
    xlinkType: 'xlink:type',
    xmlBase: 'xml:base',
    xmlLang: 'xml:lang',
    xmlSpace: 'xml:space'
  }
};
/* bandol: node_modules/react/lib/getEventCharCode.js */
/* imports:
[]
*/
/* default export: getEventCharCode */
/* exports:
undefined
*/

function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    charCode = keyCode;
  }

  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}
/* bandol: node_modules/react/lib/getEventModifierState.js */
/* imports:
[]
*/
/* default export: getEventModifierState */
/* exports:
undefined
*/


var bbBz = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Meta': 'metaKey',
  'Shift': 'shiftKey'
};

function blrg(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = bbBz[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return blrg;
}
/* bandol: node_modules/react/lib/ViewportMetrics.js */
/* imports:
[]
*/
/* default export: ViewportMetrics */
/* exports:
undefined
*/


var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function (scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};
/* bandol: node_modules/react/lib/getEventTarget.js */
/* imports:
[]
*/
/* default export: getEventTarget */
/* exports:
undefined
*/

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  return target.nodeType === 3 ? target.parentNode : target;
}
/* bandol: node_modules/react/lib/SyntheticEvent.js */
/* imports:
[]
*/
/* default export: SyntheticEvent */
/* exports:
undefined
*/

var bGey = {
  type: null,
  target: null,

  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  this.dispatchConfig = dispatchConfig;
  this.dispatchMarker = dispatchMarker;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
}

assign(SyntheticEvent.prototype, {

  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;

    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;

    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  persist: function () {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  isPersistent: emptyFunction.thatReturnsFalse,

  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      this[propName] = null;
    }
    this.dispatchConfig = null;
    this.dispatchMarker = null;
    this.nativeEvent = null;
  }

});

SyntheticEvent.Interface = bGey;

SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var prototype = Object.create(Super.prototype);
  assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);
/* bandol: node_modules/react/lib/SyntheticUIEvent.js */
/* imports:
[]
*/
/* default export: SyntheticUIEvent */
/* exports:
undefined
*/

var b4y3 = {
  view: function (event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target != null && target.window === target) {
      return target;
    }

    var doc = target.ownerDocument;

    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function (event) {
    return event.detail || 0;
  }
};

function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, b4y3);
/* bandol: node_modules/react/lib/SyntheticMouseEvent.js */
/* imports:
[]
*/
/* default export: SyntheticMouseEvent */
/* exports:
undefined
*/

var bKvr = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState,
  button: function (event) {
    var button = event.button;
    if ('which' in event) {
      return button;
    }

    return button === 2 ? 2 : button === 4 ? 1 : 0;
  },
  buttons: null,
  relatedTarget: function (event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  },

  pageX: function (event) {
    return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
  },
  pageY: function (event) {
    return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
  }
};

function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, bKvr);
/* bandol: node_modules/react/lib/SyntheticWheelEvent.js */
/* imports:
[]
*/
/* default export: SyntheticWheelEvent */
/* exports:
undefined
*/

var bRp9 = {
  deltaX: function (event) {
    return 'deltaX' in event ? event.deltaX : 'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function (event) {
    return 'deltaY' in event ? event.deltaY : 'wheelDeltaY' in event ? -event.wheelDeltaY : 'wheelDelta' in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,

  deltaMode: null
};

function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, bRp9);
/* bandol: node_modules/react/lib/SyntheticTouchEvent.js */
/* imports:
[]
*/
/* default export: SyntheticTouchEvent */
/* exports:
undefined
*/

var bXO3 = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState
};

function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, bXO3);
/* bandol: node_modules/react/lib/SyntheticDragEvent.js */
/* imports:
[]
*/
/* default export: SyntheticDragEvent */
/* exports:
undefined
*/

var bxMV = {
  dataTransfer: null
};

function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticDragEvent, bxMV);
/* bandol: node_modules/react/lib/getEventKey.js */
/* imports:
[]
*/
/* default export: getEventKey */
/* exports:
undefined
*/

var bQAd = {
  'Esc': 'Escape',
  'Spacebar': ' ',
  'Left': 'ArrowLeft',
  'Up': 'ArrowUp',
  'Right': 'ArrowRight',
  'Down': 'ArrowDown',
  'Del': 'Delete',
  'Win': 'OS',
  'Menu': 'ContextMenu',
  'Apps': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'MozPrintableKey': 'Unidentified'
};

var bPZ5 = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
  118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta'
};

function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    var key = bQAd[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode(nativeEvent);

    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    return bPZ5[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}
/* bandol: node_modules/react/lib/SyntheticKeyboardEvent.js */
/* imports:
[]
*/
/* default export: SyntheticKeyboardEvent */
/* exports:
undefined
*/

var brrx = {
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState,

  charCode: function (event) {
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    return 0;
  },
  keyCode: function (event) {
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  },
  which: function (event) {
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  }
};

function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, brrx);
/* bandol: node_modules/react/lib/SyntheticFocusEvent.js */
/* imports:
[]
*/
/* default export: SyntheticFocusEvent */
/* exports:
undefined
*/

var by4Q = {
  relatedTarget: null
};

function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, by4Q);
/* bandol: node_modules/react/lib/SyntheticClipboardEvent.js */
/* imports:
[]
*/
/* default export: SyntheticClipboardEvent */
/* exports:
undefined
*/

var bqRO = {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticClipboardEvent, bqRO);
/* bandol: node_modules/fbjs/lib/ExecutionEnvironment.js */
/* imports:
[]
*/
/* default export: ExecutionEnvironment */
/* exports:
undefined
*/


var bJpQ = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ExecutionEnvironment = {

  canUseDOM: bJpQ,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: bJpQ && !!(window.addEventListener || window.attachEvent),

  canUseViewport: bJpQ && !!window.screen,

  isInWorker: !bJpQ };
/* bandol: node_modules/react/lib/setInnerHTML.js */
/* imports:
[]
*/
/* default export: setInnerHTML */
/* exports:
undefined
*/


var bwR2 = /^[ \r\n\t\f]/;
var bkRQ = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

var setInnerHTML = function (node, html) {
  node.innerHTML = html;
};

if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
  setInnerHTML = function (node, html) {
    MSApp.execUnsafeLocalFunction(function () {
      node.innerHTML = html;
    });
  };
}

if (ExecutionEnvironment.canUseDOM) {
  var b5MZ = document.createElement('div');
  b5MZ.innerHTML = ' ';
  if (b5MZ.innerHTML === '') {
    setInnerHTML = function (node, html) {
      if (node.parentNode) {
        node.parentNode.replaceChild(node, node);
      }

      if (bwR2.test(html) || html[0] === '<' && bkRQ.test(html)) {
        node.innerHTML = String.fromCharCode(0xFEFF) + html;

        var textNode = node.firstChild;
        if (textNode.data.length === 1) {
          node.removeChild(textNode);
        } else {
          textNode.deleteData(0, 1);
        }
      } else {
        node.innerHTML = html;
      }
    };
  }
}
/* bandol: node_modules/fbjs/lib/isNode.js */
/* imports:
[]
*/
/* default export: isNode */
/* exports:
undefined
*/


function isNode(object) {
  return !!(object && (typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}
/* bandol: node_modules/fbjs/lib/isTextNode.js */
/* imports:
[]
*/
/* default export: isTextNode */
/* exports:
undefined
*/

function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}
/* bandol: node_modules/fbjs/lib/containsNode.js */
/* imports:
[]
*/
/* default export: containsNode */
/* exports:
undefined
*/

function containsNode(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var outerNode = _x,
        innerNode = _x2;
    _again = false;

    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (isTextNode(outerNode)) {
      return false;
    } else if (isTextNode(innerNode)) {
      _x = outerNode;
      _x2 = innerNode.parentNode;
      _again = true;
      continue _function;
    } else if (outerNode.contains) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  }
}
/* bandol: node_modules/react/lib/ReactDOMFeatureFlags.js */
/* imports:
[]
*/
/* default export: ReactDOMFeatureFlags */
/* exports:
undefined
*/


var ReactDOMFeatureFlags = {
  useCreateElement: false
};
/* bandol: node_modules/react/lib/isEventSupported.js */
/* imports:
[]
*/
/* default export: isEventSupported */
/* exports:
undefined
*/


var b1v8;
if (ExecutionEnvironment.canUseDOM) {
  b1v8 = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && b1v8 && eventNameSuffix === 'wheel') {
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}
/* bandol: node_modules/react/lib/forEachAccumulated.js */
/* imports:
[]
*/
/* default export: forEachAccumulated */
/* exports:
undefined
*/

var forEachAccumulated = function (arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
};
/* bandol: node_modules/react/lib/accumulateInto.js */
/* imports:
[]
*/
/* default export: accumulateInto */
/* exports:
undefined
*/


function accumulateInto(current, next) {
  !(next != null) ? 'production' !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : invariant(false) : undefined;
  if (current == null) {
    return next;
  }

  var currentIsArray = Array.isArray(current);
  var nextIsArray = Array.isArray(next);

  if (currentIsArray && nextIsArray) {
    current.push.apply(current, next);
    return current;
  }

  if (currentIsArray) {
    current.push(next);
    return current;
  }

  if (nextIsArray) {
    return [current].concat(next);
  }

  return [current, next];
}
/* bandol: node_modules/react/lib/ReactErrorUtils.js */
/* imports:
[]
*/
/* default export: ReactErrorUtils */
/* exports:
undefined
*/


var bL3O = null;

function b0dg(name, func, a, b) {
  try {
    return func(a, b);
  } catch (x) {
    if (bL3O === null) {
      bL3O = x;
    }
    return undefined;
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: b0dg,

  invokeGuardedCallbackWithCatch: b0dg,

  rethrowCaughtError: function () {
    if (bL3O) {
      var error = bL3O;
      bL3O = null;
      throw error;
    }
  }
};
/* bandol: node_modules/react/lib/EventConstants.js */
/* imports:
[]
*/
/* default export: EventConstants */
/* exports:
undefined
*/


var bEO0 = keyMirror({ bubbled: null, captured: null });

var b7Qd = keyMirror({
  topAbort: null,
  topBlur: null,
  topCanPlay: null,
  topCanPlayThrough: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topDurationChange: null,
  topEmptied: null,
  topEncrypted: null,
  topEnded: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topLoadedData: null,
  topLoadedMetadata: null,
  topLoadStart: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topPause: null,
  topPlay: null,
  topPlaying: null,
  topProgress: null,
  topRateChange: null,
  topReset: null,
  topScroll: null,
  topSeeked: null,
  topSeeking: null,
  topSelectionChange: null,
  topStalled: null,
  topSubmit: null,
  topSuspend: null,
  topTextInput: null,
  topTimeUpdate: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topVolumeChange: null,
  topWaiting: null,
  topWheel: null
});

var EventConstants = {
  topLevelTypes: b7Qd,
  PropagationPhases: bEO0
};
/* bandol: node_modules/react/lib/EventPluginUtils.js */
/* imports:
[]
*/
/* default export: EventPluginUtils */
/* exports:
undefined
*/

var bvXV = {
  Mount: null,
  injectMount: function (InjectedMount) {
    bvXV.Mount = InjectedMount;
  }
};

var baOJ = EventConstants.topLevelTypes;

function b2ML(topLevelType) {
  return topLevelType === baOJ.topMouseUp || topLevelType === baOJ.topTouchEnd || topLevelType === baOJ.topTouchCancel;
}

function beyn(topLevelType) {
  return topLevelType === baOJ.topMouseMove || topLevelType === baOJ.topTouchMove;
}
function bBee(topLevelType) {
  return topLevelType === baOJ.topMouseDown || topLevelType === baOJ.topTouchStart;
}

function bYzX(event, simulated, listener, domID) {
  var type = event.type || 'unknown-event';
  event.currentTarget = bvXV.Mount.getNode(domID);
  if (simulated) {
    ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event, domID);
  } else {
    ReactErrorUtils.invokeGuardedCallback(type, listener, event, domID);
  }
  event.currentTarget = null;
}

function bO7g(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;

  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }

      bYzX(event, simulated, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    bYzX(event, simulated, dispatchListeners, dispatchIDs);
  }
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

function b8P6(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;

  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }

      if (dispatchListeners[i](event, dispatchIDs[i])) {
        return dispatchIDs[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchIDs)) {
      return dispatchIDs;
    }
  }
  return null;
}

function bNVw(event) {
  var ret = b8P6(event);
  event._dispatchIDs = null;
  event._dispatchListeners = null;
  return ret;
}

function bdB9(event) {
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  !!Array.isArray(dispatchListener) ? 'production' !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : invariant(false) : undefined;
  var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

function b9xZ(event) {
  return !!event._dispatchListeners;
}

var EventPluginUtils = {
  isEndish: b2ML,
  isMoveish: beyn,
  isStartish: bBee,

  executeDirectDispatch: bdB9,
  executeDispatchesInOrder: bO7g,
  executeDispatchesInOrderStopAtTrue: bNVw,
  hasDispatches: b9xZ,

  getNode: function (id) {
    return bvXV.Mount.getNode(id);
  },
  getID: function (node) {
    return bvXV.Mount.getID(node);
  },

  injection: bvXV
};
/* bandol: node_modules/react/lib/EventPluginRegistry.js */
/* imports:
[]
*/
/* default export: EventPluginRegistry */
/* exports:
undefined
*/

var b3Ng = null;

var bpNm = {};

function bmnx() {
  if (!b3Ng) {
    return;
  }
  for (var pluginName in bpNm) {
    var PluginModule = bpNm[pluginName];
    var pluginIndex = b3Ng.indexOf(pluginName);
    !(pluginIndex > -1) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(false) : undefined;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !PluginModule.extractEvents ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(false) : undefined;
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !bnPv(publishedEvents[eventName], PluginModule, eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(false) : undefined;
    }
  }
}

function bnPv(dispatchConfig, PluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(false) : undefined;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        bzzE(phasedRegistrationName, PluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    bzzE(dispatchConfig.registrationName, PluginModule, eventName);
    return true;
  }
  return false;
}

function bzzE(registrationName, PluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? 'production' !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName) : invariant(false) : undefined;
  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
}

var EventPluginRegistry = {
  plugins: [],

  eventNameDispatchConfigs: {},

  registrationNameModules: {},

  registrationNameDependencies: {},

  injectEventPluginOrder: function (InjectedEventPluginOrder) {
    !!b3Ng ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(false) : undefined;

    b3Ng = Array.prototype.slice.call(InjectedEventPluginOrder);
    bmnx();
  },

  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (!bpNm.hasOwnProperty(pluginName) || bpNm[pluginName] !== PluginModule) {
        !!bpNm[pluginName] ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(false) : undefined;
        bpNm[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      bmnx();
    }
  },

  getPluginModuleForEvent: function (event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
    }
    for (var phase in dispatchConfig.phasedRegistrationNames) {
      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
        continue;
      }
      var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
      if (PluginModule) {
        return PluginModule;
      }
    }
    return null;
  },

  _resetEventPlugins: function () {
    b3Ng = null;
    for (var pluginName in bpNm) {
      if (bpNm.hasOwnProperty(pluginName)) {
        delete bpNm[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }
  }

};
/* bandol: node_modules/react/lib/EventPluginHub.js */
/* imports:
[]
*/
/* default export: EventPluginHub */
/* exports:
undefined
*/

var bV38 = {};

var bgGK = null;

var bMkZ = function (event, simulated) {
  if (event) {
    EventPluginUtils.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var b6QP = function (e) {
  return bMkZ(e, true);
};
var bZPg = function (e) {
  return bMkZ(e, false);
};

var bAVL = null;

var EventPluginHub = {
  injection: {
    injectMount: EventPluginUtils.injection.injectMount,

    injectInstanceHandle: function (InjectedInstanceHandle) {
      bAVL = InjectedInstanceHandle;
    },

    getInstanceHandle: function () {
      return bAVL;
    },

    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

  registrationNameModules: EventPluginRegistry.registrationNameModules,

  putListener: function (id, registrationName, listener) {
    !(typeof listener === 'function') ? 'production' !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : invariant(false) : undefined;

    var bankForRegistrationName = bV38[registrationName] || (bV38[registrationName] = {});
    bankForRegistrationName[id] = listener;

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(id, registrationName, listener);
    }
  },

  getListener: function (id, registrationName) {
    var bankForRegistrationName = bV38[registrationName];
    return bankForRegistrationName && bankForRegistrationName[id];
  },

  deleteListener: function (id, registrationName) {
    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(id, registrationName);
    }

    var bankForRegistrationName = bV38[registrationName];

    if (bankForRegistrationName) {
      delete bankForRegistrationName[id];
    }
  },

  deleteAllListeners: function (id) {
    for (var registrationName in bV38) {
      if (!bV38[registrationName][id]) {
        continue;
      }

      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(id, registrationName);
      }

      delete bV38[registrationName][id];
    }
  },

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },

  enqueueEvents: function (events) {
    if (events) {
      bgGK = accumulateInto(bgGK, events);
    }
  },

  processEventQueue: function (simulated) {
    var processingEventQueue = bgGK;
    bgGK = null;
    if (simulated) {
      forEachAccumulated(processingEventQueue, b6QP);
    } else {
      forEachAccumulated(processingEventQueue, bZPg);
    }
    !!bgGK ? 'production' !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(false) : undefined;

    ReactErrorUtils.rethrowCaughtError();
  },

  __purge: function () {
    bV38 = {};
  },

  __getListenerBank: function () {
    return bV38;
  }

};
/* bandol: node_modules/react/lib/ReactEventEmitterMixin.js */
/* imports:
[]
*/
/* default export: ReactEventEmitterMixin */
/* exports:
undefined
*/


function blKg(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue(false);
}

var ReactEventEmitterMixin = {
  handleTopLevel: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
    blKg(events);
  }
};
/* bandol: node_modules/react/lib/ReactBrowserEventEmitter.js */
/* imports:
[]
*/
/* default export: ReactBrowserEventEmitter */
/* exports:
undefined
*/


var bXr3 = {};
var bRK9 = false;
var bKer = 0;

var b4O3 = {
  topAbort: 'abort',
  topBlur: 'blur',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

var bGVy = '_reactListenersID' + String(Math.random()).slice(2);

function bbkz(mountAt) {
  if (!Object.prototype.hasOwnProperty.call(mountAt, bGVy)) {
    mountAt[bGVy] = bKer++;
    bXr3[mountAt[bGVy]] = {};
  }
  return bXr3[mountAt[bGVy]];
}

var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
  ReactEventListener: null,

  injection: {
    injectReactEventListener: function (ReactEventListener) {
      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
    }
  },

  setEnabled: function (enabled) {
    if (ReactBrowserEventEmitter.ReactEventListener) {
      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
    }
  },

  isEnabled: function () {
    return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
  },

  listenTo: function (registrationName, contentDocumentHandle) {
    var mountAt = contentDocumentHandle;
    var isListening = bbkz(mountAt);
    var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];

    var topLevelTypes = EventConstants.topLevelTypes;
    for (var i = 0; i < dependencies.length; i++) {
      var dependency = dependencies[i];
      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
        if (dependency === topLevelTypes.topWheel) {
          if (isEventSupported('wheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
          } else if (isEventSupported('mousewheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
          } else {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
          }
        } else if (dependency === topLevelTypes.topScroll) {

          if (isEventSupported('scroll', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
          } else {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
          }
        } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {

          if (isEventSupported('focus', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
          } else if (isEventSupported('focusin')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
          }

          isListening[topLevelTypes.topBlur] = true;
          isListening[topLevelTypes.topFocus] = true;
        } else if (b4O3.hasOwnProperty(dependency)) {
          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, b4O3[dependency], mountAt);
        }

        isListening[dependency] = true;
      }
    }
  },

  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
  },

  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
  },

  ensureScrollValueMonitoring: function () {
    if (!bRK9) {
      var refresh = ViewportMetrics.refreshScrollValues;
      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
      bRK9 = true;
    }
  },

  eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,

  registrationNameModules: EventPluginHub.registrationNameModules,

  putListener: EventPluginHub.putListener,

  getListener: EventPluginHub.getListener,

  deleteListener: EventPluginHub.deleteListener,

  deleteAllListeners: EventPluginHub.deleteAllListeners

});

ReactPerf.measureMethods(ReactBrowserEventEmitter, 'ReactBrowserEventEmitter', {
  putListener: 'putListener',
  deleteListener: 'deleteListener'
});
/* bandol: node_modules/react/lib/ReactMount.js */
/* imports:
[]
*/
/* default export: ReactMount */
/* exports:
undefined
*/


var bnkv = DOMProperty.ID_ATTRIBUTE_NAME;
var bzYE = {};

var bvYV = 1;
var bapJ = 9;
var b2aL = 11;

var benn = '__ReactMount_ownerDocument$' + Math.random().toString(36).slice(2);

var bBne = {};

var bYQX = {};

var bO6g = [];

function b8x6(string1, string2) {
  var minLen = Math.min(string1.length, string2.length);
  for (var i = 0; i < minLen; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      return i;
    }
  }
  return string1.length === string2.length ? -1 : minLen;
}

function bN0w(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === bapJ) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function bdJ9(container) {
  var rootElement = bN0w(container);
  return rootElement && ReactMount.getID(rootElement);
}

function b9XZ(node) {
  var id = bEn0(node);
  if (id) {
    if (bzYE.hasOwnProperty(id)) {
      var cached = bzYE[id];
      if (cached !== node) {
        !!b148(cached, id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', bnkv, id) : invariant(false) : undefined;

        bzYE[id] = node;
      }
    } else {
      bzYE[id] = node;
    }
  }

  return id;
}

function bEn0(node) {
  return node && node.getAttribute && node.getAttribute(bnkv) || '';
}

function b7Pd(node, id) {
  var oldID = bEn0(node);
  if (oldID !== id) {
    delete bzYE[oldID];
  }
  node.setAttribute(bnkv, id);
  bzYE[id] = node;
}

function bLbO(id) {
  if (!bzYE.hasOwnProperty(id) || !b148(bzYE[id], id)) {
    bzYE[id] = ReactMount.findReactNodeByID(id);
  }
  return bzYE[id];
}

function b0Kg(instance) {
  var id = ReactInstanceMap.get(instance)._rootNodeID;
  if (ReactEmptyComponentRegistry.isNullComponentID(id)) {
    return null;
  }
  if (!bzYE.hasOwnProperty(id) || !b148(bzYE[id], id)) {
    bzYE[id] = ReactMount.findReactNodeByID(id);
  }
  return bzYE[id];
}

function b148(node, id) {
  if (node) {
    !(bEn0(node) === id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Unexpected modification of `%s`', bnkv) : invariant(false) : undefined;

    var container = ReactMount.findReactContainerForID(id);
    if (container && containsNode(container, node)) {
      return true;
    }
  }

  return false;
}

function bwL2(id) {
  delete bzYE[id];
}

var bkvQ = null;
function b5rZ(ancestorID) {
  var ancestor = bzYE[ancestorID];
  if (ancestor && b148(ancestor, ancestorID)) {
    bkvQ = ancestor;
  } else {
    return false;
  }
}

function bJbQ(targetID) {
  bkvQ = null;
  ReactInstanceHandles.traverseAncestors(targetID, b5rZ);

  var foundNode = bkvQ;
  bkvQ = null;
  return foundNode;
}

function bq8O(componentInstance, rootID, container, transaction, shouldReuseMarkup, context) {
  if (ReactDOMFeatureFlags.useCreateElement) {
    context = assign({}, context);
    if (container.nodeType === bapJ) {
      context[benn] = container;
    } else {
      context[benn] = container.ownerDocument;
    }
  }

  var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
  componentInstance._renderedComponent._topLevelWrapper = componentInstance;
  ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup, transaction);
}

function byEQ(componentInstance, rootID, container, shouldReuseMarkup, context) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(shouldReuseMarkup);
  transaction.perform(bq8O, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}

function br4x(instance, container) {
  ReactReconciler.unmountComponent(instance);

  if (container.nodeType === bapJ) {
    container = container.documentElement;
  }

  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

function bQLd(node) {
  var reactRootID = bdJ9(node);
  return reactRootID ? reactRootID !== ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID) : false;
}

function bPM5(node) {
  for (; node && node.parentNode !== node; node = node.parentNode) {
    if (node.nodeType !== 1) {
      continue;
    }
    var nodeID = bEn0(node);
    if (!nodeID) {
      continue;
    }
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);

    var current = node;
    var lastID;
    do {
      lastID = bEn0(current);
      current = current.parentNode;
      if (current == null) {
        return null;
      }
    } while (lastID !== reactRootID);

    if (current === bYQX[reactRootID]) {
      return node;
    }
  }
  return null;
}

var bx3V = function () {};
bx3V.prototype.isReactComponent = {};

bx3V.prototype.render = function () {
  return this.props;
};

var ReactMount = {

  TopLevelWrapper: bx3V,

  _instancesByReactRootID: bBne,

  scrollMonitor: function (container, renderCallback) {
    renderCallback();
  },

  _updateRootComponent: function (prevComponent, nextElement, container, callback) {
    ReactMount.scrollMonitor(container, function () {
      ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
      if (callback) {
        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
      }
    });

    return prevComponent;
  },

  _registerComponent: function (nextComponent, container) {
    !(container && (container.nodeType === bvYV || container.nodeType === bapJ || container.nodeType === b2aL)) ? 'production' !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : invariant(false) : undefined;

    ReactBrowserEventEmitter.ensureScrollValueMonitoring();

    var reactRootID = ReactMount.registerContainer(container);
    bBne[reactRootID] = nextComponent;
    return reactRootID;
  },

  _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {
    'production' !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

    var componentInstance = instantiateReactComponent(nextElement, null);
    var reactRootID = ReactMount._registerComponent(componentInstance, container);

    ReactUpdates.batchedUpdates(byEQ, componentInstance, reactRootID, container, shouldReuseMarkup, context);

    return componentInstance;
  },

  renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    !(parentComponent != null && parentComponent._reactInternalInstance != null) ? 'production' !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : invariant(false) : undefined;
    return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
  },

  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    !ReactElement.isValidElement(nextElement) ? 'production' !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : invariant(false) : undefined;

    'production' !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : undefined;

    var nextWrappedElement = new ReactElement(bx3V, null, null, null, null, null, nextElement);

    var prevComponent = bBne[bdJ9(container)];

    if (prevComponent) {
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        var updatedCallback = callback && function () {
          callback.call(publicInst);
        };
        ReactMount._updateRootComponent(prevComponent, nextWrappedElement, container, updatedCallback);
        return publicInst;
      } else {
        ReactMount.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = bN0w(container);
    var containerHasReactMarkup = reactRootElement && !!bEn0(reactRootElement);
    var containerHasNonRootReactChild = bQLd(container);

    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, parentComponent != null ? parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context) : emptyObject)._renderedComponent.getPublicInstance();
    if (callback) {
      callback.call(component);
    }
    return component;
  },

  render: function (nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
  },

  registerContainer: function (container) {
    var reactRootID = bdJ9(container);
    if (reactRootID) {
      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
    }
    if (!reactRootID) {
      reactRootID = ReactInstanceHandles.createReactRootID();
    }
    bYQX[reactRootID] = container;
    return reactRootID;
  },

  unmountComponentAtNode: function (container) {
    'production' !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

    !(container && (container.nodeType === bvYV || container.nodeType === bapJ || container.nodeType === b2aL)) ? 'production' !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : invariant(false) : undefined;

    var reactRootID = bdJ9(container);
    var component = bBne[reactRootID];
    if (!component) {
      var containerHasNonRootReactChild = bQLd(container);

      var containerID = bEn0(container);
      var isContainerReactRoot = containerID && containerID === ReactInstanceHandles.getReactRootIDFromNodeID(containerID);

      return false;
    }
    ReactUpdates.batchedUpdates(br4x, component, container);
    delete bBne[reactRootID];
    delete bYQX[reactRootID];

    return true;
  },

  findReactContainerForID: function (id) {
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
    var container = bYQX[reactRootID];

    return container;
  },

  findReactNodeByID: function (id) {
    var reactRoot = ReactMount.findReactContainerForID(id);
    return ReactMount.findComponentRoot(reactRoot, id);
  },

  getFirstReactDOM: function (node) {
    return bPM5(node);
  },

  findComponentRoot: function (ancestorNode, targetID) {
    var firstChildren = bO6g;
    var childIndex = 0;

    var deepestAncestor = bJbQ(targetID) || ancestorNode;

    firstChildren[0] = deepestAncestor.firstChild;
    firstChildren.length = 1;

    while (childIndex < firstChildren.length) {
      var child = firstChildren[childIndex++];
      var targetChild;

      while (child) {
        var childID = ReactMount.getID(child);
        if (childID) {

          if (targetID === childID) {
            targetChild = child;
          } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
            firstChildren.length = childIndex = 0;
            firstChildren.push(child.firstChild);
          }
        } else {
          firstChildren.push(child.firstChild);
        }

        child = child.nextSibling;
      }

      if (targetChild) {
        firstChildren.length = 0;

        return targetChild;
      }
    }

    firstChildren.length = 0;

    !false ? 'production' !== 'production' ? invariant(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the DOM was unexpectedly mutated (e.g., by the browser), ' + 'usually due to forgetting a <tbody> when using tables, nesting tags ' + 'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' + 'parent. ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, ReactMount.getID(ancestorNode)) : invariant(false) : undefined;
  },

  _mountImageIntoNode: function (markup, container, shouldReuseMarkup, transaction) {
    !(container && (container.nodeType === bvYV || container.nodeType === bapJ || container.nodeType === b2aL)) ? 'production' !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : invariant(false) : undefined;

    if (shouldReuseMarkup) {
      var rootElement = bN0w(container);
      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
        return;
      } else {
        var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

        var rootMarkup = rootElement.outerHTML;
        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);

        var normalizedMarkup = markup;


        var diffIndex = b8x6(normalizedMarkup, rootMarkup);
        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

        !(container.nodeType !== bapJ) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;
      }
    }

    !(container.nodeType !== bapJ) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;

    if (transaction.useCreateElement) {
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
      container.appendChild(markup);
    } else {
      setInnerHTML(container, markup);
    }
  },

  ownerDocumentContextKey: benn,

  getReactRootID: bdJ9,

  getID: b9XZ,

  setID: b7Pd,

  getNode: bLbO,

  getNodeFromInstance: b0Kg,

  isValid: b148,

  purgeID: bwL2
};

ReactPerf.measureMethods(ReactMount, 'ReactMount', {
  _renderNewRootComponent: '_renderNewRootComponent',
  _mountImageIntoNode: '_mountImageIntoNode'
});
/* bandol: node_modules/react/lib/EventPropagators.js */
/* imports:
[]
*/
/* default export: EventPropagators */
/* exports:
undefined
*/


var bGay = EventConstants.PropagationPhases;
var bbJz = EventPluginHub.getListener;

function bl2g(id, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return bbJz(id, registrationName);
}

function bVq8(domID, upwards, event) {
  var phase = upwards ? bGay.bubbled : bGay.captured;
  var listener = bl2g(domID, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
  }
}

function bg3K(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, bVq8, event);
  }
}

function bMMZ(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker, bVq8, event);
  }
}

function b66P(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = bbJz(id, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
    }
  }
}

function bZag(event) {
  if (event && event.dispatchConfig.registrationName) {
    b66P(event.dispatchMarker, null, event);
  }
}

function bA7L(events) {
  forEachAccumulated(events, bg3K);
}

function b3Lg(events) {
  forEachAccumulated(events, bMMZ);
}

function bplm(leave, enter, fromID, toID) {
  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, b66P, leave, enter);
}

function bm4x(events) {
  forEachAccumulated(events, bZag);
}

var EventPropagators = {
  accumulateTwoPhaseDispatches: bA7L,
  accumulateTwoPhaseDispatchesSkipTarget: b3Lg,
  accumulateDirectDispatches: bm4x,
  accumulateEnterLeaveDispatches: bplm
};
/* bandol: node_modules/fbjs/lib/EventListener.js */
/* imports:
[]
*/
/* default export: EventListener */
/* exports:
undefined
*/

var EventListener = {
  listen: function (target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function () {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function () {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  capture: function (target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function () {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function () {}
};
/* bandol: node_modules/react/lib/SimpleEventPlugin.js */
/* imports:
[]
*/
/* default export: SimpleEventPlugin */
/* exports:
undefined
*/


var bP75 = EventConstants.topLevelTypes;

var bxvV = {
  abort: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onAbort: true }),
      captured: keyOf({ onAbortCapture: true })
    }
  },
  blur: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onBlur: true }),
      captured: keyOf({ onBlurCapture: true })
    }
  },
  canPlay: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCanPlay: true }),
      captured: keyOf({ onCanPlayCapture: true })
    }
  },
  canPlayThrough: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCanPlayThrough: true }),
      captured: keyOf({ onCanPlayThroughCapture: true })
    }
  },
  click: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onClick: true }),
      captured: keyOf({ onClickCapture: true })
    }
  },
  contextMenu: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onContextMenu: true }),
      captured: keyOf({ onContextMenuCapture: true })
    }
  },
  copy: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCopy: true }),
      captured: keyOf({ onCopyCapture: true })
    }
  },
  cut: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCut: true }),
      captured: keyOf({ onCutCapture: true })
    }
  },
  doubleClick: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDoubleClick: true }),
      captured: keyOf({ onDoubleClickCapture: true })
    }
  },
  drag: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDrag: true }),
      captured: keyOf({ onDragCapture: true })
    }
  },
  dragEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragEnd: true }),
      captured: keyOf({ onDragEndCapture: true })
    }
  },
  dragEnter: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragEnter: true }),
      captured: keyOf({ onDragEnterCapture: true })
    }
  },
  dragExit: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragExit: true }),
      captured: keyOf({ onDragExitCapture: true })
    }
  },
  dragLeave: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragLeave: true }),
      captured: keyOf({ onDragLeaveCapture: true })
    }
  },
  dragOver: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragOver: true }),
      captured: keyOf({ onDragOverCapture: true })
    }
  },
  dragStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragStart: true }),
      captured: keyOf({ onDragStartCapture: true })
    }
  },
  drop: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDrop: true }),
      captured: keyOf({ onDropCapture: true })
    }
  },
  durationChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDurationChange: true }),
      captured: keyOf({ onDurationChangeCapture: true })
    }
  },
  emptied: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onEmptied: true }),
      captured: keyOf({ onEmptiedCapture: true })
    }
  },
  encrypted: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onEncrypted: true }),
      captured: keyOf({ onEncryptedCapture: true })
    }
  },
  ended: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onEnded: true }),
      captured: keyOf({ onEndedCapture: true })
    }
  },
  error: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onError: true }),
      captured: keyOf({ onErrorCapture: true })
    }
  },
  focus: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onFocus: true }),
      captured: keyOf({ onFocusCapture: true })
    }
  },
  input: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onInput: true }),
      captured: keyOf({ onInputCapture: true })
    }
  },
  keyDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onKeyDown: true }),
      captured: keyOf({ onKeyDownCapture: true })
    }
  },
  keyPress: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onKeyPress: true }),
      captured: keyOf({ onKeyPressCapture: true })
    }
  },
  keyUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onKeyUp: true }),
      captured: keyOf({ onKeyUpCapture: true })
    }
  },
  load: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoad: true }),
      captured: keyOf({ onLoadCapture: true })
    }
  },
  loadedData: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoadedData: true }),
      captured: keyOf({ onLoadedDataCapture: true })
    }
  },
  loadedMetadata: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoadedMetadata: true }),
      captured: keyOf({ onLoadedMetadataCapture: true })
    }
  },
  loadStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoadStart: true }),
      captured: keyOf({ onLoadStartCapture: true })
    }
  },

  mouseDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseDown: true }),
      captured: keyOf({ onMouseDownCapture: true })
    }
  },
  mouseMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseMove: true }),
      captured: keyOf({ onMouseMoveCapture: true })
    }
  },
  mouseOut: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseOut: true }),
      captured: keyOf({ onMouseOutCapture: true })
    }
  },
  mouseOver: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseOver: true }),
      captured: keyOf({ onMouseOverCapture: true })
    }
  },
  mouseUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseUp: true }),
      captured: keyOf({ onMouseUpCapture: true })
    }
  },
  paste: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPaste: true }),
      captured: keyOf({ onPasteCapture: true })
    }
  },
  pause: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPause: true }),
      captured: keyOf({ onPauseCapture: true })
    }
  },
  play: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPlay: true }),
      captured: keyOf({ onPlayCapture: true })
    }
  },
  playing: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPlaying: true }),
      captured: keyOf({ onPlayingCapture: true })
    }
  },
  progress: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onProgress: true }),
      captured: keyOf({ onProgressCapture: true })
    }
  },
  rateChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onRateChange: true }),
      captured: keyOf({ onRateChangeCapture: true })
    }
  },
  reset: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onReset: true }),
      captured: keyOf({ onResetCapture: true })
    }
  },
  scroll: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onScroll: true }),
      captured: keyOf({ onScrollCapture: true })
    }
  },
  seeked: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSeeked: true }),
      captured: keyOf({ onSeekedCapture: true })
    }
  },
  seeking: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSeeking: true }),
      captured: keyOf({ onSeekingCapture: true })
    }
  },
  stalled: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onStalled: true }),
      captured: keyOf({ onStalledCapture: true })
    }
  },
  submit: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSubmit: true }),
      captured: keyOf({ onSubmitCapture: true })
    }
  },
  suspend: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSuspend: true }),
      captured: keyOf({ onSuspendCapture: true })
    }
  },
  timeUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTimeUpdate: true }),
      captured: keyOf({ onTimeUpdateCapture: true })
    }
  },
  touchCancel: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchCancel: true }),
      captured: keyOf({ onTouchCancelCapture: true })
    }
  },
  touchEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchEnd: true }),
      captured: keyOf({ onTouchEndCapture: true })
    }
  },
  touchMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchMove: true }),
      captured: keyOf({ onTouchMoveCapture: true })
    }
  },
  touchStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchStart: true }),
      captured: keyOf({ onTouchStartCapture: true })
    }
  },
  volumeChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onVolumeChange: true }),
      captured: keyOf({ onVolumeChangeCapture: true })
    }
  },
  waiting: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onWaiting: true }),
      captured: keyOf({ onWaitingCapture: true })
    }
  },
  wheel: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onWheel: true }),
      captured: keyOf({ onWheelCapture: true })
    }
  }
};

var bXz3 = {
  topAbort: bxvV.abort,
  topBlur: bxvV.blur,
  topCanPlay: bxvV.canPlay,
  topCanPlayThrough: bxvV.canPlayThrough,
  topClick: bxvV.click,
  topContextMenu: bxvV.contextMenu,
  topCopy: bxvV.copy,
  topCut: bxvV.cut,
  topDoubleClick: bxvV.doubleClick,
  topDrag: bxvV.drag,
  topDragEnd: bxvV.dragEnd,
  topDragEnter: bxvV.dragEnter,
  topDragExit: bxvV.dragExit,
  topDragLeave: bxvV.dragLeave,
  topDragOver: bxvV.dragOver,
  topDragStart: bxvV.dragStart,
  topDrop: bxvV.drop,
  topDurationChange: bxvV.durationChange,
  topEmptied: bxvV.emptied,
  topEncrypted: bxvV.encrypted,
  topEnded: bxvV.ended,
  topError: bxvV.error,
  topFocus: bxvV.focus,
  topInput: bxvV.input,
  topKeyDown: bxvV.keyDown,
  topKeyPress: bxvV.keyPress,
  topKeyUp: bxvV.keyUp,
  topLoad: bxvV.load,
  topLoadedData: bxvV.loadedData,
  topLoadedMetadata: bxvV.loadedMetadata,
  topLoadStart: bxvV.loadStart,
  topMouseDown: bxvV.mouseDown,
  topMouseMove: bxvV.mouseMove,
  topMouseOut: bxvV.mouseOut,
  topMouseOver: bxvV.mouseOver,
  topMouseUp: bxvV.mouseUp,
  topPaste: bxvV.paste,
  topPause: bxvV.pause,
  topPlay: bxvV.play,
  topPlaying: bxvV.playing,
  topProgress: bxvV.progress,
  topRateChange: bxvV.rateChange,
  topReset: bxvV.reset,
  topScroll: bxvV.scroll,
  topSeeked: bxvV.seeked,
  topSeeking: bxvV.seeking,
  topStalled: bxvV.stalled,
  topSubmit: bxvV.submit,
  topSuspend: bxvV.suspend,
  topTimeUpdate: bxvV.timeUpdate,
  topTouchCancel: bxvV.touchCancel,
  topTouchEnd: bxvV.touchEnd,
  topTouchMove: bxvV.touchMove,
  topTouchStart: bxvV.touchStart,
  topVolumeChange: bxvV.volumeChange,
  topWaiting: bxvV.waiting,
  topWheel: bxvV.wheel
};

for (var bR09 in bXz3) {
  bXz3[bR09].dependencies = [bR09];
}

var bK7r = keyOf({ onClick: null });
var b4L3 = {};

var SimpleEventPlugin = {

  eventTypes: bxvV,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var dispatchConfig = bXz3[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case bP75.topAbort:
      case bP75.topCanPlay:
      case bP75.topCanPlayThrough:
      case bP75.topDurationChange:
      case bP75.topEmptied:
      case bP75.topEncrypted:
      case bP75.topEnded:
      case bP75.topError:
      case bP75.topInput:
      case bP75.topLoad:
      case bP75.topLoadedData:
      case bP75.topLoadedMetadata:
      case bP75.topLoadStart:
      case bP75.topPause:
      case bP75.topPlay:
      case bP75.topPlaying:
      case bP75.topProgress:
      case bP75.topRateChange:
      case bP75.topReset:
      case bP75.topSeeked:
      case bP75.topSeeking:
      case bP75.topStalled:
      case bP75.topSubmit:
      case bP75.topSuspend:
      case bP75.topTimeUpdate:
      case bP75.topVolumeChange:
      case bP75.topWaiting:
        EventConstructor = SyntheticEvent;
        break;
      case bP75.topKeyPress:
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }

      case bP75.topKeyDown:
      case bP75.topKeyUp:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case bP75.topBlur:
      case bP75.topFocus:
        EventConstructor = SyntheticFocusEvent;
        break;
      case bP75.topClick:
        if (nativeEvent.button === 2) {
          return null;
        }

      case bP75.topContextMenu:
      case bP75.topDoubleClick:
      case bP75.topMouseDown:
      case bP75.topMouseMove:
      case bP75.topMouseOut:
      case bP75.topMouseOver:
      case bP75.topMouseUp:
        EventConstructor = SyntheticMouseEvent;
        break;
      case bP75.topDrag:
      case bP75.topDragEnd:
      case bP75.topDragEnter:
      case bP75.topDragExit:
      case bP75.topDragLeave:
      case bP75.topDragOver:
      case bP75.topDragStart:
      case bP75.topDrop:
        EventConstructor = SyntheticDragEvent;
        break;
      case bP75.topTouchCancel:
      case bP75.topTouchEnd:
      case bP75.topTouchMove:
      case bP75.topTouchStart:
        EventConstructor = SyntheticTouchEvent;
        break;
      case bP75.topScroll:
        EventConstructor = SyntheticUIEvent;
        break;
      case bP75.topWheel:
        EventConstructor = SyntheticWheelEvent;
        break;
      case bP75.topCopy:
      case bP75.topCut:
      case bP75.topPaste:
        EventConstructor = SyntheticClipboardEvent;
        break;
    }
    !EventConstructor ? 'production' !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(false) : undefined;
    var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent, nativeEventTarget);
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  },

  didPutListener: function (id, registrationName, listener) {
    if (registrationName === bK7r) {
      var node = ReactMount.getNode(id);
      if (!b4L3[id]) {
        b4L3[id] = EventListener.listen(node, 'click', emptyFunction);
      }
    }
  },

  willDeleteListener: function (id, registrationName) {
    if (registrationName === bK7r) {
      b4L3[id].remove();
      delete b4L3[id];
    }
  }

};
/* bandol: node_modules/react/lib/ServerReactRootIndex.js */
/* imports:
[]
*/
/* default export: ServerReactRootIndex */
/* exports:
undefined
*/

var bQRd = Math.pow(2, 53);

var ServerReactRootIndex = {
  createReactRootIndex: function () {
    return Math.ceil(Math.random() * bQRd);
  }
};
/* bandol: node_modules/fbjs/lib/shallowEqual.js */
/* imports:
[]
*/
/* default export: shallowEqual */
/* exports:
undefined
*/


var brKx = Object.prototype.hasOwnProperty;

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = brKx.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}
/* bandol: node_modules/react/lib/isTextInputElement.js */
/* imports:
[]
*/
/* default export: isTextInputElement */
/* exports:
undefined
*/

var bVqg = {
  'color': true,
  'date': true,
  'datetime': true,
  'datetime-local': true,
  'email': true,
  'month': true,
  'number': true,
  'password': true,
  'range': true,
  'search': true,
  'tel': true,
  'text': true,
  'time': true,
  'url': true,
  'week': true
};

function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && (nodeName === 'input' && bVqg[elem.type] || nodeName === 'textarea');
}
/* bandol: node_modules/fbjs/lib/getActiveElement.js */
/* imports:
[]
*/
/* default export: getActiveElement */
/* exports:
undefined
*/


function getActiveElement() {
  if (typeof document === 'undefined') {
    return null;
  }
  try {
    return document.activeElement || document.body;
  } catch (e) {
    return document.body;
  }
}
/* bandol: node_modules/fbjs/lib/focusNode.js */
/* imports:
[]
*/
/* default export: focusNode */
/* exports:
undefined
*/

function focusNode(node) {
  try {
    node.focus();
  } catch (e) {}
}
/* bandol: node_modules/react/lib/getTextContentAccessor.js */
/* imports:
[]
*/
/* default export: getTextContentAccessor */
/* exports:
undefined
*/


var bl2J = null;

function getTextContentAccessor() {
  if (!bl2J && ExecutionEnvironment.canUseDOM) {
    bl2J = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return bl2J;
}
/* bandol: node_modules/react/lib/getNodeForCharacterOffset.js */
/* imports:
[]
*/
/* default export: getNodeForCharacterOffset */
/* exports:
undefined
*/

function bGa8(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

function bbJX(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

function getNodeForCharacterOffset(root, offset) {
  var node = bGa8(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = bGa8(bbJX(node));
  }
}
/* bandol: node_modules/react/lib/ReactDOMSelection.js */
/* imports:
[]
*/
/* default export: ReactDOMSelection */
/* exports:
undefined
*/

function bP7V(anchorNode, anchorOffset, focusNode, focusOffset) {
  return anchorNode === focusNode && anchorOffset === focusOffset;
}

function bxvA(node) {
  var selection = document.selection;
  var selectedRange = selection.createRange();
  var selectedLength = selectedRange.text.length;

  var fromStart = selectedRange.duplicate();
  fromStart.moveToElementText(node);
  fromStart.setEndPoint('EndToStart', selectedRange);

  var startOffset = fromStart.text.length;
  var endOffset = startOffset + selectedLength;

  return {
    start: startOffset,
    end: endOffset
  };
}

function bXzy(node) {
  var selection = window.getSelection && window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode = selection.focusNode;
  var focusOffset = selection.focusOffset;

  var currentRange = selection.getRangeAt(0);

  try {
    currentRange.startContainer.nodeType;
    currentRange.endContainer.nodeType;
  } catch (e) {
    return null;
  }

  var isSelectionCollapsed = bP7V(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);

  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var isTempRangeCollapsed = bP7V(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
  var end = start + rangeLength;

  var detectionRange = document.createRange();
  detectionRange.setStart(anchorNode, anchorOffset);
  detectionRange.setEnd(focusNode, focusOffset);
  var isBackward = detectionRange.collapsed;

  return {
    start: isBackward ? end : start,
    end: isBackward ? start : end
  };
}

function bR0l(node, offsets) {
  var range = document.selection.createRange().duplicate();
  var start, end;

  if (typeof offsets.end === 'undefined') {
    start = offsets.start;
    end = start;
  } else if (offsets.start > offsets.end) {
    start = offsets.end;
    end = offsets.start;
  } else {
    start = offsets.start;
    end = offsets.end;
  }

  range.moveToElementText(node);
  range.moveStart('character', start);
  range.setEndPoint('EndToStart', range);
  range.moveEnd('character', end - start);
  range.select();
}

function bK7N(node, offsets) {
  if (!window.getSelection) {
    return;
  }

  var selection = window.getSelection();
  var length = node[getTextContentAccessor()].length;
  var start = Math.min(offsets.start, length);
  var end = typeof offsets.end === 'undefined' ? start : Math.min(offsets.end, length);

  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);

  if (startMarker && endMarker) {
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}

var b4Lx = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);

var ReactDOMSelection = {
  getOffsets: b4Lx ? bxvA : bXzy,

  setOffsets: b4Lx ? bR0l : bK7N
};
/* bandol: node_modules/react/lib/ReactInputSelection.js */
/* imports:
[]
*/
/* default export: ReactInputSelection */
/* exports:
undefined
*/


function bQRw(node) {
  return containsNode(document.documentElement, node);
}

var ReactInputSelection = {

  hasSelectionCapabilities: function (elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
  },

  getSelectionInformation: function () {
    var focusedElem = getActiveElement();
    return {
      focusedElem: focusedElem,
      selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
    };
  },

  restoreSelection: function (priorSelectionInformation) {
    var curFocusedElem = getActiveElement();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;
    if (curFocusedElem !== priorFocusedElem && bQRw(priorFocusedElem)) {
      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
        ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
      }
      focusNode(priorFocusedElem);
    }
  },

  getSelection: function (input) {
    var selection;

    if ('selectionStart' in input) {
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      var range = document.selection.createRange();

      if (range.parentElement() === input) {
        selection = {
          start: -range.moveStart('character', -input.value.length),
          end: -range.moveEnd('character', -input.value.length)
        };
      }
    } else {
      selection = ReactDOMSelection.getOffsets(input);
    }

    return selection || { start: 0, end: 0 };
  },

  setSelection: function (input, offsets) {
    var start = offsets.start;
    var end = offsets.end;
    if (typeof end === 'undefined') {
      end = start;
    }

    if ('selectionStart' in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    } else {
      ReactDOMSelection.setOffsets(input, offsets);
    }
  }
};
/* bandol: node_modules/react/lib/SelectEventPlugin.js */
/* imports:
[]
*/
/* default export: SelectEventPlugin */
/* exports:
undefined
*/


var b7ma = EventConstants.topLevelTypes;

var bLwq = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var b088 = {
  select: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSelect: null }),
      captured: keyOf({ onSelectCapture: null })
    },
    dependencies: [b7ma.topBlur, b7ma.topContextMenu, b7ma.topFocus, b7ma.topKeyDown, b7ma.topMouseDown, b7ma.topMouseUp, b7ma.topSelectionChange]
  }
};

var b194 = null;
var bwVR = null;
var bk29 = null;
var b5LK = false;

var bJ0z = false;
var bqlJ = keyOf({ onSelect: null });

function byyb(node) {
  if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  } else if (document.selection) {
    var range = document.selection.createRange();
    return {
      parentElement: range.parentElement(),
      text: range.text,
      top: range.boundingTop,
      left: range.boundingLeft
    };
  }
}

function brKl(nativeEvent, nativeEventTarget) {
  if (b5LK || b194 == null || b194 !== getActiveElement()) {
    return null;
  }

  var currentSelection = byyb(b194);
  if (!bk29 || !shallowEqual(bk29, currentSelection)) {
    bk29 = currentSelection;

    var syntheticEvent = SyntheticEvent.getPooled(b088.select, bwVR, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = b194;

    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

var SelectEventPlugin = {

  eventTypes: b088,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    if (!bJ0z) {
      return null;
    }

    switch (topLevelType) {
      case b7ma.topFocus:
        if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
          b194 = topLevelTarget;
          bwVR = topLevelTargetID;
          bk29 = null;
        }
        break;
      case b7ma.topBlur:
        b194 = null;
        bwVR = null;
        bk29 = null;
        break;

      case b7ma.topMouseDown:
        b5LK = true;
        break;
      case b7ma.topContextMenu:
      case b7ma.topMouseUp:
        b5LK = false;
        return brKl(nativeEvent, nativeEventTarget);

      case b7ma.topSelectionChange:
        if (bLwq) {
          break;
        }

      case b7ma.topKeyDown:
      case b7ma.topKeyUp:
        return brKl(nativeEvent, nativeEventTarget);
    }

    return null;
  },

  didPutListener: function (id, registrationName, listener) {
    if (registrationName === bqlJ) {
      bJ0z = true;
    }
  }
};
/* bandol: node_modules/react/lib/ReactReconcileTransaction.js */
/* imports:
[]
*/
/* default export: ReactReconcileTransaction */
/* exports:
undefined
*/

var b853 = {
  initialize: ReactInputSelection.getSelectionInformation,

  close: ReactInputSelection.restoreSelection
};

var bNvy = {
  initialize: function () {
    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
    ReactBrowserEventEmitter.setEnabled(false);
    return currentlyEnabled;
  },

  close: function (previouslyEnabled) {
    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
  }
};

var bdzO = {
  initialize: function () {
    this.reactMountReady.reset();
  },

  close: function () {
    this.reactMountReady.notifyAll();
  }
};

var b9an = [b853, bNvy, bdzO];

function ReactReconcileTransaction(forceHTML) {
  this.reinitializeTransaction();

  this.renderToStaticMarkup = false;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = !forceHTML && ReactDOMFeatureFlags.useCreateElement;
}

var bEZz = {
  getTransactionWrappers: function () {
    return b9an;
  },

  getReactMountReady: function () {
    return this.reactMountReady;
  },

  destructor: function () {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(ReactReconcileTransaction.prototype, Transaction.Mixin, bEZz);

PooledClass.addPoolingTo(ReactReconcileTransaction);
/* bandol: node_modules/react/lib/ReactInjection.js */
/* imports:
[]
*/
/* default export: ReactInjection */
/* exports:
undefined
*/


var ReactInjection = {
  Component: ReactComponentEnvironment.injection,
  Class: ReactClass.injection,
  DOMProperty: DOMProperty.injection,
  EmptyComponent: ReactEmptyComponent.injection,
  EventPluginHub: EventPluginHub.injection,
  EventEmitter: ReactBrowserEventEmitter.injection,
  NativeComponent: ReactNativeComponent.injection,
  Perf: ReactPerf.injection,
  RootIndex: ReactRootIndex.injection,
  Updates: ReactUpdates.injection
};
/* bandol: node_modules/fbjs/lib/getUnboundedScrollPosition.js */
/* imports:
[]
*/
/* default export: getUnboundedScrollPosition */
/* exports:
undefined
*/

function getUnboundedScrollPosition(scrollable) {
  if (scrollable === window) {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}
/* bandol: node_modules/react/lib/ReactEventListener.js */
/* imports:
[]
*/
/* default export: ReactEventListener */
/* exports:
undefined
*/


var bv3v = 11;

function baJR(node) {
  var nodeID = ReactMount.getID(node);
  var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
  var container = ReactMount.findReactContainerForID(rootID);
  var parent = ReactMount.getFirstReactDOM(container);
  return parent;
}

function b2A1(topLevelType, nativeEvent) {
  this.topLevelType = topLevelType;
  this.nativeEvent = nativeEvent;
  this.ancestors = [];
}
assign(b2A1.prototype, {
  destructor: function () {
    this.topLevelType = null;
    this.nativeEvent = null;
    this.ancestors.length = 0;
  }
});
PooledClass.addPoolingTo(b2A1, PooledClass.twoArgumentPooler);

function be9P(bookKeeping) {

  void bY3V;
  bBQ6(bookKeeping);
}

function bBQ6(bookKeeping) {
  var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;

  var ancestor = topLevelTarget;
  while (ancestor) {
    bookKeeping.ancestors.push(ancestor);
    ancestor = baJR(ancestor);
  }

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    topLevelTarget = bookKeeping.ancestors[i];
    var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

function bY3V(bookKeeping) {
  var path = bookKeeping.nativeEvent.path;
  var currentNativeTarget = path[0];
  var eventsFired = 0;
  for (var i = 0; i < path.length; i++) {
    var currentPathElement = path[i];
    if (currentPathElement.nodeType === bv3v) {
      currentNativeTarget = path[i + 1];
    }

    var reactParent = ReactMount.getFirstReactDOM(currentPathElement);
    if (reactParent === currentPathElement) {
      var currentPathElementID = ReactMount.getID(currentPathElement);
      var newRootID = ReactInstanceHandles.getReactRootIDFromNodeID(currentPathElementID);
      bookKeeping.ancestors.push(currentPathElement);

      var topLevelTargetID = ReactMount.getID(currentPathElement) || '';
      eventsFired++;
      ReactEventListener._handleTopLevel(bookKeeping.topLevelType, currentPathElement, topLevelTargetID, bookKeeping.nativeEvent, currentNativeTarget);

      while (currentPathElementID !== newRootID) {
        i++;
        currentPathElement = path[i];
        currentPathElementID = ReactMount.getID(currentPathElement);
      }
    }
  }
  if (eventsFired === 0) {
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, window, '', bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

function bOLb(cb) {
  var scrollPosition = getUnboundedScrollPosition(window);
  cb(scrollPosition);
}

var ReactEventListener = {
  _enabled: true,
  _handleTopLevel: null,

  WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,

  setHandleTopLevel: function (handleTopLevel) {
    ReactEventListener._handleTopLevel = handleTopLevel;
  },

  setEnabled: function (enabled) {
    ReactEventListener._enabled = !!enabled;
  },

  isEnabled: function () {
    return ReactEventListener._enabled;
  },

  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
    var element = handle;
    if (!element) {
      return null;
    }
    return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
    var element = handle;
    if (!element) {
      return null;
    }
    return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  monitorScrollValue: function (refresh) {
    var callback = bOLb.bind(null, refresh);
    EventListener.listen(window, 'scroll', callback);
  },

  dispatchEvent: function (topLevelType, nativeEvent) {
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = b2A1.getPooled(topLevelType, nativeEvent);
    try {
      ReactUpdates.batchedUpdates(be9P, bookKeeping);
    } finally {
      b2A1.release(bookKeeping);
    }
  }
};
/* bandol: node_modules/react/lib/escapeTextContentForBrowser.js */
/* imports:
[]
*/
/* default export: escapeTextContentForBrowser */
/* exports:
undefined
*/


var bmP0 = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  '\'': '&#x27;'
};

var bnGw = /[&><"']/g;

function bzk5(match) {
  return bmP0[match];
}

function escapeTextContentForBrowser(text) {
  return ('' + text).replace(bnGw, bzk5);
}
/* bandol: node_modules/react/lib/setTextContent.js */
/* imports:
[]
*/
/* default export: setTextContent */
/* exports:
undefined
*/

var setTextContent = function (node, text) {
  node.textContent = text;
};

if (ExecutionEnvironment.canUseDOM) {
  if (!('textContent' in document.documentElement)) {
    setTextContent = function (node, text) {
      setInnerHTML(node, escapeTextContentForBrowser(text));
    };
  }
}
/* bandol: node_modules/react/lib/quoteAttributeValueForBrowser.js */
/* imports:
[]
*/
/* default export: quoteAttributeValueForBrowser */
/* exports:
undefined
*/

function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextContentForBrowser(value) + '"';
}
/* bandol: node_modules/react/lib/DOMPropertyOperations.js */
/* imports:
[]
*/
/* default export: DOMPropertyOperations */
/* exports:
undefined
*/

var b6dE = /^[a-zA-Z_][\w\.\-]*$/;
var bZzy = {};
var bArv = {};

function b3Ov(attributeName) {
  if (bArv.hasOwnProperty(attributeName)) {
    return true;
  }
  if (bZzy.hasOwnProperty(attributeName)) {
    return false;
  }
  if (b6dE.test(attributeName)) {
    bArv[attributeName] = true;
    return true;
  }
  bZzy[attributeName] = true;
  'production' !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : undefined;
  return false;
}

function bpR4(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

var DOMPropertyOperations = {
  createMarkupForID: function (id) {
    return DOMProperty.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
  },

  setAttributeForID: function (node, id) {
    node.setAttribute(DOMProperty.ID_ATTRIBUTE_NAME, id);
  },

  createMarkupForProperty: function (name, value) {
    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
    if (propertyInfo) {
      if (bpR4(propertyInfo, value)) {
        return '';
      }
      var attributeName = propertyInfo.attributeName;
      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        return attributeName + '=""';
      }
      return attributeName + '=' + quoteAttributeValueForBrowser(value);
    } else if (DOMProperty.isCustomAttribute(name)) {
      if (value == null) {
        return '';
      }
      return name + '=' + quoteAttributeValueForBrowser(value);
    }
    return null;
  },

  createMarkupForCustomAttribute: function (name, value) {
    if (!b3Ov(name) || value == null) {
      return '';
    }
    return name + '=' + quoteAttributeValueForBrowser(value);
  },

  setValueForProperty: function (node, name, value) {
    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, value);
      } else if (bpR4(propertyInfo, value)) {
        this.deleteValueForProperty(node, name);
      } else if (propertyInfo.mustUseAttribute) {
        var attributeName = propertyInfo.attributeName;
        var namespace = propertyInfo.attributeNamespace;

        if (namespace) {
          node.setAttributeNS(namespace, attributeName, '' + value);
        } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
          node.setAttribute(attributeName, '');
        } else {
          node.setAttribute(attributeName, '' + value);
        }
      } else {
        var propName = propertyInfo.propertyName;

        if (!propertyInfo.hasSideEffects || '' + node[propName] !== '' + value) {
          node[propName] = value;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      DOMPropertyOperations.setValueForAttribute(node, name, value);
    }
  },

  setValueForAttribute: function (node, name, value) {
    if (!b3Ov(name)) {
      return;
    }
    if (value == null) {
      node.removeAttribute(name);
    } else {
      node.setAttribute(name, '' + value);
    }
  },

  deleteValueForProperty: function (node, name) {
    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, undefined);
      } else if (propertyInfo.mustUseAttribute) {
        node.removeAttribute(propertyInfo.attributeName);
      } else {
        var propName = propertyInfo.propertyName;
        var defaultValue = DOMProperty.getDefaultValueForProperty(node.nodeName, propName);
        if (!propertyInfo.hasSideEffects || '' + node[propName] !== defaultValue) {
          node[propName] = defaultValue;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      node.removeAttribute(name);
    }
  }

};

ReactPerf.measureMethods(DOMPropertyOperations, 'DOMPropertyOperations', {
  setValueForProperty: 'setValueForProperty',
  setValueForAttribute: 'setValueForAttribute',
  deleteValueForProperty: 'deleteValueForProperty'
});
/* bandol: node_modules/react/lib/ReactMultiChildUpdateTypes.js */
/* imports:
[]
*/
/* default export: ReactMultiChildUpdateTypes */
/* exports:
undefined
*/

var ReactMultiChildUpdateTypes = keyMirror({
  INSERT_MARKUP: null,
  MOVE_EXISTING: null,
  REMOVE_NODE: null,
  SET_MARKUP: null,
  TEXT_CONTENT: null
});
/* bandol: node_modules/fbjs/lib/getMarkupWrap.js */
/* imports:
[]
*/
/* default export: getMarkupWrap */
/* exports:
undefined
*/

var bKVN = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

var b4gx = {};

var bG78 = [1, '<select multiple="true">', '</select>'];
var bbvX = [1, '<table>', '</table>'];
var blyJ = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var bVvg = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];

var bgk8 = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': bG78,
  'option': bG78,

  'caption': bbvX,
  'colgroup': bbvX,
  'tbody': bbvX,
  'tfoot': bbvX,
  'thead': bbvX,

  'td': blyJ,
  'th': blyJ
};

var bMYd = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
bMYd.forEach(function (nodeName) {
  bgk8[nodeName] = bVvg;
  b4gx[nodeName] = true;
});

function getMarkupWrap(nodeName) {
  !!!bKVN ? 'production' !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : undefined;
  if (!bgk8.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!b4gx.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      bKVN.innerHTML = '<link />';
    } else {
      bKVN.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    b4gx[nodeName] = !bKVN.firstChild;
  }
  return b4gx[nodeName] ? bgk8[nodeName] : null;
}
/* bandol: node_modules/fbjs/lib/toArray.js */
/* imports:
[]
*/
/* default export: toArray */
/* exports:
undefined
*/

function toArray(obj) {
  var length = obj.length;

  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? 'production' !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : undefined;

  !(typeof length === 'number') ? 'production' !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : undefined;

  !(length === 0 || length - 1 in obj) ? 'production' !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : undefined;

  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {}
  }

  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}
/* bandol: node_modules/fbjs/lib/createArrayFromMixed.js */
/* imports:
[]
*/
/* default export: createArrayFromMixed */
/* exports:
undefined
*/

function bR3l(obj) {
  return !!obj && (typeof obj == 'object' || typeof obj == 'function') && 'length' in obj && !('setInterval' in obj) && typeof obj.nodeType != 'number' && (Array.isArray(obj) || 'callee' in obj || 'item' in obj);
}

function createArrayFromMixed(obj) {
  if (!bR3l(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}
/* bandol: node_modules/fbjs/lib/createNodesFromMarkup.js */
/* imports:
[]
*/
/* default export: createNodesFromMarkup */
/* exports:
undefined
*/

var bPBV = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

var bxqA = /^\s*<(\w+)/;

function bXey(markup) {
  var nodeNameMatch = markup.match(bxqA);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

function createNodesFromMarkup(markup, handleScript) {
  var node = bPBV;
  !!!bPBV ? 'production' !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : undefined;
  var nodeName = bXey(markup);

  var wrap = nodeName && getMarkupWrap(nodeName);
  if (wrap) {
    node.innerHTML = wrap[1] + markup + wrap[2];

    var wrapDepth = wrap[0];
    while (wrapDepth--) {
      node = node.lastChild;
    }
  } else {
    node.innerHTML = markup;
  }

  var scripts = node.getElementsByTagName('script');
  if (scripts.length) {
    !handleScript ? 'production' !== 'production' ? invariant(false, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(false) : undefined;
    createArrayFromMixed(scripts).forEach(handleScript);
  }

  var nodes = createArrayFromMixed(node.childNodes);
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return nodes;
}
/* bandol: node_modules/react/lib/Danger.js */
/* imports:
[]
*/
/* default export: Danger */
/* exports:
undefined
*/


var byMb = /^(<[^ \/>]+)/;
var brNl = 'data-danger-index';

function bQew(markup) {
  return markup.substring(1, markup.indexOf(' '));
}

var Danger = {
  dangerouslyRenderMarkup: function (markupList) {
    !ExecutionEnvironment.canUseDOM ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString for server rendering.') : invariant(false) : undefined;
    var nodeName;
    var markupByNodeName = {};

    for (var i = 0; i < markupList.length; i++) {
      !markupList[i] ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(false) : undefined;
      nodeName = bQew(markupList[i]);
      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
      markupByNodeName[nodeName][i] = markupList[i];
    }
    var resultList = [];
    var resultListAssignmentCount = 0;
    for (nodeName in markupByNodeName) {
      if (!markupByNodeName.hasOwnProperty(nodeName)) {
        continue;
      }
      var markupListByNodeName = markupByNodeName[nodeName];

      var resultIndex;
      for (resultIndex in markupListByNodeName) {
        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
          var markup = markupListByNodeName[resultIndex];

          markupListByNodeName[resultIndex] = markup.replace(byMb, '$1 ' + brNl + '="' + resultIndex + '" ');
        }
      }

      var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction);

      for (var j = 0; j < renderNodes.length; ++j) {
        var renderNode = renderNodes[j];
        if (renderNode.hasAttribute && renderNode.hasAttribute(brNl)) {

          resultIndex = +renderNode.getAttribute(brNl);
          renderNode.removeAttribute(brNl);

          !!resultList.hasOwnProperty(resultIndex) ? 'production' !== 'production' ? invariant(false, 'Danger: Assigning to an already-occupied result index.') : invariant(false) : undefined;

          resultList[resultIndex] = renderNode;

          resultListAssignmentCount += 1;
        }
      }
    }

    !(resultListAssignmentCount === resultList.length) ? 'production' !== 'production' ? invariant(false, 'Danger: Did not assign to every index of resultList.') : invariant(false) : undefined;

    !(resultList.length === markupList.length) ? 'production' !== 'production' ? invariant(false, 'Danger: Expected markup to render %s nodes, but rendered %s.', markupList.length, resultList.length) : invariant(false) : undefined;

    return resultList;
  },

  dangerouslyReplaceNodeWithMarkup: function (oldChild, markup) {
    !ExecutionEnvironment.canUseDOM ? 'production' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' + 'worker thread. Make sure `window` and `document` are available ' + 'globally before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;
    !markup ? 'production' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(false) : undefined;
    !(oldChild.tagName.toLowerCase() !== 'html') ? 'production' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' + '<html> node. This is because browser quirks make this unreliable ' + 'and/or slow. If you want to render to the root you must use ' + 'server rendering. See ReactDOMServer.renderToString().') : invariant(false) : undefined;

    var newChild;
    if (typeof markup === 'string') {
      newChild = createNodesFromMarkup(markup, emptyFunction)[0];
    } else {
      newChild = markup;
    }
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }

};
/* bandol: node_modules/react/lib/DOMChildrenOperations.js */
/* imports:
[]
*/
/* default export: DOMChildrenOperations */
/* exports:
undefined
*/

function bqKJ(parentNode, childNode, index) {
  var beforeChild = index >= parentNode.childNodes.length ? null : parentNode.childNodes.item(index);

  parentNode.insertBefore(childNode, beforeChild);
}

var DOMChildrenOperations = {

  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

  updateTextContent: setTextContent,

  processUpdates: function (updates, markupList) {
    var update;

    var initialChildren = null;

    var updatedChildren = null;

    for (var i = 0; i < updates.length; i++) {
      update = updates[i];
      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING || update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
        var updatedIndex = update.fromIndex;
        var updatedChild = update.parentNode.childNodes[updatedIndex];
        var parentID = update.parentID;

        !updatedChild ? 'production' !== 'production' ? invariant(false, 'processUpdates(): Unable to find child %s of element. This ' + 'probably means the DOM was unexpectedly mutated (e.g., by the ' + 'browser), usually due to forgetting a <tbody> when using tables, ' + 'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' + 'in an <svg> parent. Try inspecting the child nodes of the element ' + 'with React ID `%s`.', updatedIndex, parentID) : invariant(false) : undefined;

        initialChildren = initialChildren || {};
        initialChildren[parentID] = initialChildren[parentID] || [];
        initialChildren[parentID][updatedIndex] = updatedChild;

        updatedChildren = updatedChildren || [];
        updatedChildren.push(updatedChild);
      }
    }

    var renderedMarkup;

    if (markupList.length && typeof markupList[0] === 'string') {
      renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
    } else {
      renderedMarkup = markupList;
    }

    if (updatedChildren) {
      for (var j = 0; j < updatedChildren.length; j++) {
        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
      }
    }

    for (var k = 0; k < updates.length; k++) {
      update = updates[k];
      switch (update.type) {
        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
          bqKJ(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
          break;
        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
          bqKJ(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
          break;
        case ReactMultiChildUpdateTypes.SET_MARKUP:
          setInnerHTML(update.parentNode, update.content);
          break;
        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
          setTextContent(update.parentNode, update.content);
          break;
        case ReactMultiChildUpdateTypes.REMOVE_NODE:
          break;
      }
    }
  }

};

ReactPerf.measureMethods(DOMChildrenOperations, 'DOMChildrenOperations', {
  updateTextContent: 'updateTextContent'
});
/* bandol: node_modules/react/lib/ReactDOMIDOperations.js */
/* imports:
[]
*/
/* default export: ReactDOMIDOperations */
/* exports:
undefined
*/

var bJlz = {
  dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
  style: '`style` must be set using `updateStylesByID()`.'
};

var ReactDOMIDOperations = {
  updatePropertyByID: function (id, name, value) {
    var node = ReactMount.getNode(id);
    !!bJlz.hasOwnProperty(name) ? 'production' !== 'production' ? invariant(false, 'updatePropertyByID(...): %s', bJlz[name]) : invariant(false) : undefined;

    if (value != null) {
      DOMPropertyOperations.setValueForProperty(node, name, value);
    } else {
      DOMPropertyOperations.deleteValueForProperty(node, name);
    }
  },

  dangerouslyReplaceNodeWithMarkupByID: function (id, markup) {
    var node = ReactMount.getNode(id);
    DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
  },

  dangerouslyProcessChildrenUpdates: function (updates, markup) {
    for (var i = 0; i < updates.length; i++) {
      updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
    }
    DOMChildrenOperations.processUpdates(updates, markup);
  }
};

ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
  dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
  dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
});
/* bandol: node_modules/react/lib/ReactComponentBrowserEnvironment.js */
/* imports:
[]
*/
/* default export: ReactComponentBrowserEnvironment */
/* exports:
undefined
*/

var ReactComponentBrowserEnvironment = {

  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,

  replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,

  unmountIDFromEnvironment: function (rootNodeID) {
    ReactMount.purgeID(rootNodeID);
  }

};
/* bandol: node_modules/react/lib/ReactDOMTextComponent.js */
/* imports:
[]
*/
/* default export: ReactDOMTextComponent */
/* exports:
undefined
*/

var ReactDOMTextComponent = function (props) {};

assign(ReactDOMTextComponent.prototype, {
  construct: function (text) {
    this._currentElement = text;
    this._stringText = '' + text;

    this._rootNodeID = null;
    this._mountIndex = 0;
  },

  mountComponent: function (rootID, transaction, context) {

    this._rootNodeID = rootID;
    if (transaction.useCreateElement) {
      var ownerDocument = context[ReactMount.ownerDocumentContextKey];
      var el = ownerDocument.createElement('span');
      DOMPropertyOperations.setAttributeForID(el, rootID);

      ReactMount.getID(el);
      setTextContent(el, this._stringText);
      return el;
    } else {
      var escapedText = escapeTextContentForBrowser(this._stringText);

      if (transaction.renderToStaticMarkup) {
        return escapedText;
      }

      return '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' + escapedText + '</span>';
    }
  },

  receiveComponent: function (nextText, transaction) {
    if (nextText !== this._currentElement) {
      this._currentElement = nextText;
      var nextStringText = '' + nextText;
      if (nextStringText !== this._stringText) {
        this._stringText = nextStringText;
        var node = ReactMount.getNode(this._rootNodeID);
        DOMChildrenOperations.updateTextContent(node, nextStringText);
      }
    }
  },

  unmountComponent: function () {
    ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
  }

});
/* bandol: node_modules/react/lib/validateDOMNesting.js */
/* imports:
[]
*/
/* default export: validateDOMNesting */
/* exports:
undefined
*/


var validateDOMNesting = emptyFunction;
/* bandol: node_modules/react/lib/canDefineProperty.js */
/* imports:
[]
*/
/* default export: canDefineProperty */
/* exports:
undefined
*/


var canDefineProperty = false;
/* bandol: node_modules/react/lib/flattenChildren.js */
/* imports:
[]
*/
/* default export: flattenChildren */
/* exports:
undefined
*/

function b5NK(traverseContext, child, name) {
  var result = traverseContext;
  var keyUnique = result[name] === undefined;

  if (keyUnique && child != null) {
    result[name] = child;
  }
}

function flattenChildren(children) {
  if (children == null) {
    return children;
  }
  var result = {};
  traverseAllChildren(children, b5NK, result);
  return result;
}
/* bandol: node_modules/react/lib/ReactChildReconciler.js */
/* imports:
[]
*/
/* default export: ReactChildReconciler */
/* exports:
undefined
*/


function bkr9(childInstances, child, name) {
  var keyUnique = childInstances[name] === undefined;

  if (child != null && keyUnique) {
    childInstances[name] = instantiateReactComponent(child, null);
  }
}

var ReactChildReconciler = {
  instantiateChildren: function (nestedChildNodes, transaction, context) {
    if (nestedChildNodes == null) {
      return null;
    }
    var childInstances = {};
    traverseAllChildren(nestedChildNodes, bkr9, childInstances);
    return childInstances;
  },

  updateChildren: function (prevChildren, nextChildren, transaction, context) {
    if (!nextChildren && !prevChildren) {
      return null;
    }
    var name;
    for (name in nextChildren) {
      if (!nextChildren.hasOwnProperty(name)) {
        continue;
      }
      var prevChild = prevChildren && prevChildren[name];
      var prevElement = prevChild && prevChild._currentElement;
      var nextElement = nextChildren[name];
      if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
        ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
        nextChildren[name] = prevChild;
      } else {
        if (prevChild) {
          ReactReconciler.unmountComponent(prevChild, name);
        }

        var nextChildInstance = instantiateReactComponent(nextElement, null);
        nextChildren[name] = nextChildInstance;
      }
    }

    for (name in prevChildren) {
      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
        ReactReconciler.unmountComponent(prevChildren[name]);
      }
    }
    return nextChildren;
  },

  unmountChildren: function (renderedChildren) {
    for (var name in renderedChildren) {
      if (renderedChildren.hasOwnProperty(name)) {
        var renderedChild = renderedChildren[name];
        ReactReconciler.unmountComponent(renderedChild);
      }
    }
  }

};
/* bandol: node_modules/react/lib/ReactMultiChild.js */
/* imports:
[]
*/
/* default export: ReactMultiChild */
/* exports:
undefined
*/

var b8a3 = 0;

var bNMy = [];

var bd5O = [];

function b9Nn(parentID, markup, toIndex) {
  bNMy.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    markupIndex: bd5O.push(markup) - 1,
    content: null,
    fromIndex: null,
    toIndex: toIndex
  });
}

function bE7z(parentID, fromIndex, toIndex) {
  bNMy.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: toIndex
  });
}

function b7Ma(parentID, fromIndex) {
  bNMy.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: null
  });
}

function bLqq(parentID, markup) {
  bNMy.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.SET_MARKUP,
    markupIndex: null,
    content: markup,
    fromIndex: null,
    toIndex: null
  });
}

function b0z8(parentID, textContent) {
  bNMy.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
    markupIndex: null,
    content: textContent,
    fromIndex: null,
    toIndex: null
  });
}

function b1d4() {
  if (bNMy.length) {
    ReactComponentEnvironment.processChildrenUpdates(bNMy, bd5O);
    bwNR();
  }
}

function bwNR() {
  bNMy.length = 0;
  bd5O.length = 0;
}

var ReactMultiChild = {
  Mixin: {

    _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {
      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
    },

    _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, transaction, context) {
      var nextChildren;

      nextChildren = flattenChildren(nextNestedChildrenElements);
      return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
    },

    mountChildren: function (nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;
      var mountImages = [];
      var index = 0;
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];

          var rootID = this._rootNodeID + name;
          var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
          child._mountIndex = index++;
          mountImages.push(mountImage);
        }
      }
      return mountImages;
    },

    updateTextContent: function (nextContent) {
      b8a3++;
      var errorThrown = true;
      try {
        var prevChildren = this._renderedChildren;

        ReactChildReconciler.unmountChildren(prevChildren);

        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name)) {
            this._unmountChild(prevChildren[name]);
          }
        }

        this.setTextContent(nextContent);
        errorThrown = false;
      } finally {
        b8a3--;
        if (!b8a3) {
          if (errorThrown) {
            bwNR();
          } else {
            b1d4();
          }
        }
      }
    },

    updateMarkup: function (nextMarkup) {
      b8a3++;
      var errorThrown = true;
      try {
        var prevChildren = this._renderedChildren;

        ReactChildReconciler.unmountChildren(prevChildren);
        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name)) {
            this._unmountChildByName(prevChildren[name], name);
          }
        }
        this.setMarkup(nextMarkup);
        errorThrown = false;
      } finally {
        b8a3--;
        if (!b8a3) {
          if (errorThrown) {
            bwNR();
          } else {
            b1d4();
          }
        }
      }
    },

    updateChildren: function (nextNestedChildrenElements, transaction, context) {
      b8a3++;
      var errorThrown = true;
      try {
        this._updateChildren(nextNestedChildrenElements, transaction, context);
        errorThrown = false;
      } finally {
        b8a3--;
        if (!b8a3) {
          if (errorThrown) {
            bwNR();
          } else {
            b1d4();
          }
        }
      }
    },

    _updateChildren: function (nextNestedChildrenElements, transaction, context) {
      var prevChildren = this._renderedChildren;
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, transaction, context);
      this._renderedChildren = nextChildren;
      if (!nextChildren && !prevChildren) {
        return;
      }
      var name;

      var lastIndex = 0;
      var nextIndex = 0;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (prevChild === nextChild) {
          this.moveChild(prevChild, nextIndex, lastIndex);
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            this._unmountChild(prevChild);
          }

          this._mountChildByNameAtIndex(nextChild, name, nextIndex, transaction, context);
        }
        nextIndex++;
      }

      for (name in prevChildren) {
        if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
          this._unmountChild(prevChildren[name]);
        }
      }
    },

    unmountChildren: function () {
      var renderedChildren = this._renderedChildren;
      ReactChildReconciler.unmountChildren(renderedChildren);
      this._renderedChildren = null;
    },

    moveChild: function (child, toIndex, lastIndex) {
      if (child._mountIndex < lastIndex) {
        bE7z(this._rootNodeID, child._mountIndex, toIndex);
      }
    },

    createChild: function (child, mountImage) {
      b9Nn(this._rootNodeID, mountImage, child._mountIndex);
    },

    removeChild: function (child) {
      b7Ma(this._rootNodeID, child._mountIndex);
    },

    setTextContent: function (textContent) {
      b0z8(this._rootNodeID, textContent);
    },

    setMarkup: function (markup) {
      bLqq(this._rootNodeID, markup);
    },

    _mountChildByNameAtIndex: function (child, name, index, transaction, context) {
      var rootID = this._rootNodeID + name;
      var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
      child._mountIndex = index;
      this.createChild(child, mountImage);
    },

    _unmountChild: function (child) {
      this.removeChild(child);
      child._mountIndex = null;
    }

  }

};
/* bandol: node_modules/react/lib/LinkedValueUtils.js */
/* imports:
[]
*/
/* default export: LinkedValueUtils */
/* exports:
undefined
*/


var bvVv = {
  'button': true,
  'checkbox': true,
  'image': true,
  'hidden': true,
  'radio': true,
  'reset': true,
  'submit': true
};

function babR(inputProps) {
  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(false) : undefined;
}
function b2G1(inputProps) {
  babR(inputProps);
  !(inputProps.value == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(false) : undefined;
}

function be3P(inputProps) {
  babR(inputProps);
  !(inputProps.checked == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(false) : undefined;
}

var bB76 = {
  value: function (props, propName, componentName) {
    if (!props[propName] || bvVv[props.type] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  checked: function (props, propName, componentName) {
    if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  onChange: ReactPropTypes.func
};

var bY0V = {};
function bO0b(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

var LinkedValueUtils = {
  checkPropTypes: function (tagName, props, owner) {
    for (var propName in bB76) {
      if (bB76.hasOwnProperty(propName)) {
        var error = bB76[propName](props, propName, tagName, ReactPropTypeLocations.prop);
      }
      if (error instanceof Error && !(error.message in bY0V)) {
        bY0V[error.message] = true;

        var addendum = bO0b(owner);
        'production' !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : undefined;
      }
    }
  },

  getValue: function (inputProps) {
    if (inputProps.valueLink) {
      b2G1(inputProps);
      return inputProps.valueLink.value;
    }
    return inputProps.value;
  },

  getChecked: function (inputProps) {
    if (inputProps.checkedLink) {
      be3P(inputProps);
      return inputProps.checkedLink.value;
    }
    return inputProps.checked;
  },

  executeOnChange: function (inputProps, event) {
    if (inputProps.valueLink) {
      b2G1(inputProps);
      return inputProps.valueLink.requestChange(event.target.value);
    } else if (inputProps.checkedLink) {
      be3P(inputProps);
      return inputProps.checkedLink.requestChange(event.target.checked);
    } else if (inputProps.onChange) {
      return inputProps.onChange.call(undefined, event);
    }
  }
};
/* bandol: node_modules/react/lib/ReactDOMTextarea.js */
/* imports:
[]
*/
/* default export: ReactDOMTextarea */
/* exports:
undefined
*/


function bnxw() {
  if (this._rootNodeID) {
    ReactDOMTextarea.updateWrapper(this);
  }
}

var ReactDOMTextarea = {
  getNativeProps: function (inst, props, context) {
    !(props.dangerouslySetInnerHTML == null) ? 'production' !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(false) : undefined;

    var nativeProps = assign({}, props, {
      defaultValue: undefined,
      value: undefined,
      children: inst._wrapperState.initialValue,
      onChange: inst._wrapperState.onChange
    });

    return nativeProps;
  },

  mountWrapper: function (inst, props) {

    var defaultValue = props.defaultValue;

    var children = props.children;
    if (children != null) {
      !(defaultValue == null) ? 'production' !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(false) : undefined;
      if (Array.isArray(children)) {
        !(children.length <= 1) ? 'production' !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : invariant(false) : undefined;
        children = children[0];
      }

      defaultValue = '' + children;
    }
    if (defaultValue == null) {
      defaultValue = '';
    }
    var value = LinkedValueUtils.getValue(props);

    inst._wrapperState = {
      initialValue: '' + (value != null ? value : defaultValue),
      onChange: bzG5.bind(inst)
    };
  },

  updateWrapper: function (inst) {
    var props = inst._currentElement.props;
    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
    }
  }
};

function bzG5(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);
  ReactUpdates.asap(bnxw, this);
  return returnValue;
}
/* bandol: node_modules/react/lib/ReactDOMSelect.js */
/* imports:
[]
*/
/* default export: ReactDOMSelect */
/* exports:
undefined
*/


var b6NE = '__ReactDOMSelect_value$' + Math.random().toString(36).slice(2);

function bZpy() {
  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
    this._wrapperState.pendingUpdate = false;

    var props = this._currentElement.props;
    var value = LinkedValueUtils.getValue(props);

    if (value != null) {
      bpa4(this, Boolean(props.multiple), value);
    }
  }
}

function bAdv(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

var b3bv = ['value', 'defaultValue'];

function bpa4(inst, multiple, propValue) {
  var selectedValue, i;
  var options = ReactMount.getNode(inst._rootNodeID).options;

  if (multiple) {
    selectedValue = {};
    for (i = 0; i < propValue.length; i++) {
      selectedValue['' + propValue[i]] = true;
    }
    for (i = 0; i < options.length; i++) {
      var selected = selectedValue.hasOwnProperty(options[i].value);
      if (options[i].selected !== selected) {
        options[i].selected = selected;
      }
    }
  } else {
    selectedValue = '' + propValue;
    for (i = 0; i < options.length; i++) {
      if (options[i].value === selectedValue) {
        options[i].selected = true;
        return;
      }
    }
    if (options.length) {
      options[0].selected = true;
    }
  }
}

var ReactDOMSelect = {
  valueContextKey: b6NE,

  getNativeProps: function (inst, props, context) {
    return assign({}, props, {
      onChange: inst._wrapperState.onChange,
      value: undefined
    });
  },

  mountWrapper: function (inst, props) {

    var value = LinkedValueUtils.getValue(props);
    inst._wrapperState = {
      pendingUpdate: false,
      initialValue: value != null ? value : props.defaultValue,
      onChange: bm60.bind(inst),
      wasMultiple: Boolean(props.multiple)
    };
  },

  processChildContext: function (inst, props, context) {
    var childContext = assign({}, context);
    childContext[b6NE] = inst._wrapperState.initialValue;
    return childContext;
  },

  postUpdateWrapper: function (inst) {
    var props = inst._currentElement.props;

    inst._wrapperState.initialValue = undefined;

    var wasMultiple = inst._wrapperState.wasMultiple;
    inst._wrapperState.wasMultiple = Boolean(props.multiple);

    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      inst._wrapperState.pendingUpdate = false;
      bpa4(inst, Boolean(props.multiple), value);
    } else if (wasMultiple !== Boolean(props.multiple)) {
      if (props.defaultValue != null) {
        bpa4(inst, Boolean(props.multiple), props.defaultValue);
      } else {
        bpa4(inst, Boolean(props.multiple), props.multiple ? [] : '');
      }
    }
  }
};

function bm60(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  this._wrapperState.pendingUpdate = true;
  ReactUpdates.asap(bZpy, this);
  return returnValue;
}
/* bandol: node_modules/react/lib/ReactDOMOption.js */
/* imports:
[]
*/
/* default export: ReactDOMOption */
/* exports:
undefined
*/


var bMQd = ReactDOMSelect.valueContextKey;

var ReactDOMOption = {
  mountWrapper: function (inst, props, context) {
    var selectValue = context[bMQd];

    var selected = null;
    if (selectValue != null) {
      selected = false;
      if (Array.isArray(selectValue)) {
        for (var i = 0; i < selectValue.length; i++) {
          if ('' + selectValue[i] === '' + props.value) {
            selected = true;
            break;
          }
        }
      } else {
        selected = '' + selectValue === '' + props.value;
      }
    }

    inst._wrapperState = { selected: selected };
  },

  getNativeProps: function (inst, props, context) {
    var nativeProps = assign({ selected: undefined, children: undefined }, props);

    if (inst._wrapperState.selected != null) {
      nativeProps.selected = inst._wrapperState.selected;
    }

    var content = '';

    ReactChildren.forEach(props.children, function (child) {
      if (child == null) {
        return;
      }
      if (typeof child === 'string' || typeof child === 'number') {
        content += child;
      } else {
        'production' !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : undefined;
      }
    });

    if (content) {
      nativeProps.children = content;
    }

    return nativeProps;
  }

};
/* bandol: node_modules/react/lib/ReactDOMInput.js */
/* imports:
[]
*/
/* default export: ReactDOMInput */
/* exports:
undefined
*/


var blvJ = {};

function bVRg() {
  if (this._rootNodeID) {
    ReactDOMInput.updateWrapper(this);
  }
}

var ReactDOMInput = {
  getNativeProps: function (inst, props, context) {
    var value = LinkedValueUtils.getValue(props);
    var checked = LinkedValueUtils.getChecked(props);

    var nativeProps = assign({}, props, {
      defaultChecked: undefined,
      defaultValue: undefined,
      value: value != null ? value : inst._wrapperState.initialValue,
      checked: checked != null ? checked : inst._wrapperState.initialChecked,
      onChange: inst._wrapperState.onChange
    });

    return nativeProps;
  },

  mountWrapper: function (inst, props) {

    var defaultValue = props.defaultValue;
    inst._wrapperState = {
      initialChecked: props.defaultChecked || false,
      initialValue: defaultValue != null ? defaultValue : null,
      onChange: bg58.bind(inst)
    };
  },

  mountReadyWrapper: function (inst) {
    blvJ[inst._rootNodeID] = inst;
  },

  unmountWrapper: function (inst) {
    delete blvJ[inst._rootNodeID];
  },

  updateWrapper: function (inst) {
    var props = inst._currentElement.props;

    var checked = props.checked;
    if (checked != null) {
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'checked', checked || false);
    }

    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
    }
  }
};

function bg58(event) {
  var props = this._currentElement.props;

  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  ReactUpdates.asap(bVRg, this);

  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var rootNode = ReactMount.getNode(this._rootNodeID);
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }

      var otherID = ReactMount.getID(otherNode);
      !otherID ? 'production' !== 'production' ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the ' + 'same `name` is not supported.') : invariant(false) : undefined;
      var otherInstance = blvJ[otherID];
      !otherInstance ? 'production' !== 'production' ? invariant(false, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(false) : undefined;

      ReactUpdates.asap(bVRg, otherInstance);
    }
  }

  return returnValue;
}
/* bandol: node_modules/react/lib/ReactDOMButton.js */
/* imports:
[]
*/
/* default export: ReactDOMButton */
/* exports:
undefined
*/


var bblX = {
  onClick: true,
  onDoubleClick: true,
  onMouseDown: true,
  onMouseMove: true,
  onMouseUp: true,

  onClickCapture: true,
  onDoubleClickCapture: true,
  onMouseDownCapture: true,
  onMouseMoveCapture: true,
  onMouseUpCapture: true
};

var ReactDOMButton = {
  getNativeProps: function (inst, props, context) {
    if (!props.disabled) {
      return props;
    }

    var nativeProps = {};
    for (var key in props) {
      if (props.hasOwnProperty(key) && !bblX[key]) {
        nativeProps[key] = props[key];
      }
    }

    return nativeProps;
  }
};
/* bandol: node_modules/fbjs/lib/memoizeStringOnly.js */
/* imports:
[]
*/
/* default export: memoizeStringOnly */
/* exports:
undefined
*/

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}
/* bandol: node_modules/fbjs/lib/hyphenate.js */
/* imports:
[]
*/
/* default export: hyphenate */
/* exports:
undefined
*/


var bGX8 = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(bGX8, '-$1').toLowerCase();
}
/* bandol: node_modules/fbjs/lib/hyphenateStyleName.js */
/* imports:
[]
*/
/* default export: hyphenateStyleName */
/* exports:
undefined
*/


var b4Ax = /^ms-/;

function hyphenateStyleName(string) {
  return hyphenate(string).replace(b4Ax, '-ms-');
}
/* bandol: node_modules/react/lib/CSSProperty.js */
/* imports:
[]
*/
/* default export: CSSProperty */
/* exports:
undefined
*/

var bxKA = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

function bXay(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

var bRvl = ['Webkit', 'ms', 'Moz', 'O'];

Object.keys(bxKA).forEach(function (prop) {
  bRvl.forEach(function (prefix) {
    bxKA[bXay(prefix, prop)] = bxKA[prop];
  });
});

var bKkN = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: bxKA,
  shorthandPropertyExpansions: bKkN
};
/* bandol: node_modules/react/lib/dangerousStyleValue.js */
/* imports:
[]
*/
/* default export: dangerousStyleValue */
/* exports:
undefined
*/


var bPqV = CSSProperty.isUnitlessNumber;

function dangerousStyleValue(name, value) {

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || bPqV.hasOwnProperty(name) && bPqV[name]) {
    return '' + value;
  }

  if (typeof value === 'string') {
    value = value.trim();
  }
  return value + 'px';
}
/* bandol: node_modules/react/lib/CSSPropertyOperations.js */
/* imports:
[]
*/
/* default export: CSSPropertyOperations */
/* exports:
undefined
*/


var blvM = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

var bVR4 = false;
var brgl = 'cssFloat';
if (ExecutionEnvironment.canUseDOM) {
  var bQvw = document.createElement('div').style;
  try {
    bQvw.font = '';
  } catch (e) {
    bVR4 = true;
  }

  if (document.documentElement.style.cssFloat === undefined) {
    brgl = 'styleFloat';
  }
}

var CSSPropertyOperations = {
  createMarkupForStyles: function (styles) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];

      if (styleValue != null) {
        serialized += blvM(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue) + ';';
      }
    }
    return serialized || null;
  },

  setValueForStyles: function (node, styles) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }

      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
      if (styleName === 'float') {
        styleName = brgl;
      }
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = bVR4 && CSSProperty.shorthandPropertyExpansions[styleName];
        if (expansion) {
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }

};

ReactPerf.measureMethods(CSSPropertyOperations, 'CSSPropertyOperations', {
  setValueForStyles: 'setValueForStyles'
});
/* bandol: node_modules/react/lib/findDOMNode.js */
/* imports:
[]
*/
/* default export: findDOMNode */
/* exports:
undefined
*/

function findDOMNode(componentOrElement) {
  if (componentOrElement == null) {
    return null;
  }
  if (componentOrElement.nodeType === 1) {
    return componentOrElement;
  }
  if (ReactInstanceMap.has(componentOrElement)) {
    return ReactMount.getNodeFromInstance(componentOrElement);
  }
  !(componentOrElement.render == null || typeof componentOrElement.render !== 'function') ? 'production' !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : invariant(false) : undefined;
  !false ? 'production' !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : invariant(false) : undefined;
}
/* bandol: node_modules/react/lib/AutoFocusUtils.js */
/* imports:
[]
*/
/* default export: AutoFocusUtils */
/* exports:
undefined
*/


var bble = {
  componentDidMount: function () {
    if (this.props.autoFocus) {
      focusNode(findDOMNode(this));
    }
  }
};

var AutoFocusUtils = {
  Mixin: bble,

  focusDOMComponent: function () {
    focusNode(ReactMount.getNode(this._rootNodeID));
  }
};
/* bandol: node_modules/react/lib/ReactDOMComponent.js */
/* imports:
[]
*/
/* default export: ReactDOMComponent */
/* exports:
undefined
*/


var ba6d = ReactBrowserEventEmitter.deleteListener;
var b2Nk = ReactBrowserEventEmitter.listenTo;
var beYl = ReactBrowserEventEmitter.registrationNameModules;

var bB4E = { 'string': true, 'number': true };

var bYn4 = keyOf({ children: null });
var bOZG = keyOf({ style: null });
var b8AY = keyOf({ __html: null });

var bNPx = 1;

function bdZ0(internalInstance) {
  if (internalInstance) {
    var owner = internalInstance._currentElement._owner || null;
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' This DOM node was rendered by `' + name + '`.';
      }
    }
  }
  return '';
}

function b9ld() {
  return this;
}

function bEze() {
  var component = this._reactInternalComponent;

  return !!component;
}

function b7GY() {}

function bL7m(partialProps, callback) {
  var component = this._reactInternalComponent;

  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function b0A1(partialProps, callback) {
  var component = this._reactInternalComponent;

  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function b1q2(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return '[' + obj.map(b1q2).join(', ') + ']';
    } else {
      var pairs = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
          pairs.push(keyEscaped + ': ' + b1q2(obj[key]));
        }
      }
      return '{' + pairs.join(', ') + '}';
    }
  } else if (typeof obj === 'string') {
    return JSON.stringify(obj);
  } else if (typeof obj === 'function') {
    return '[function object]';
  }

  return String(obj);
}

var bwg8 = {};

function bkg8(component, props) {
  if (!props) {
    return;
  }

  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? 'production' !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(false) : undefined;
    !(typeof props.dangerouslySetInnerHTML === 'object' && b8AY in props.dangerouslySetInnerHTML) ? 'production' !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' + 'for more information.') : invariant(false) : undefined;
  }

  !(props.style == null || typeof props.style === 'object') ? 'production' !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, ' + 'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' + 'using JSX.%s', bdZ0(component)) : invariant(false) : undefined;
}

function b5ma(id, registrationName, listener, transaction) {
  var container = ReactMount.findReactContainerForID(id);
  if (container) {
    var doc = container.nodeType === bNPx ? container.ownerDocument : container;
    b2Nk(registrationName, doc);
  }
  transaction.getReactMountReady().enqueue(bJ2L, {
    id: id,
    registrationName: registrationName,
    listener: listener
  });
}

function bJ2L() {
  var listenerToPut = this;
  ReactBrowserEventEmitter.putListener(listenerToPut.id, listenerToPut.registrationName, listenerToPut.listener);
}

var bqqn = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function byqY() {
  var inst = this;

  !inst._rootNodeID ? 'production' !== 'production' ? invariant(false, 'Must be mounted to trap events') : invariant(false) : undefined;
  var node = ReactMount.getNode(inst._rootNodeID);
  !node ? 'production' !== 'production' ? invariant(false, 'trapBubbledEvent(...): Requires node to be rendered.') : invariant(false) : undefined;

  switch (inst._tag) {
    case 'iframe':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
      break;
    case 'video':
    case 'audio':

      inst._wrapperState.listeners = [];

      for (var event in bqqn) {
        if (bqqn.hasOwnProperty(event)) {
          inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes[event], bqqn[event], node));
        }
      }

      break;
    case 'img':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
      break;
    case 'form':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit', node)];
      break;
  }
}

function brge() {
  ReactDOMInput.mountReadyWrapper(this);
}

function bQvr() {
  ReactDOMSelect.postUpdateWrapper(this);
}

var bPqq = {
  'area': true,
  'base': true,
  'br': true,
  'col': true,
  'embed': true,
  'hr': true,
  'img': true,
  'input': true,
  'keygen': true,
  'link': true,
  'meta': true,
  'param': true,
  'source': true,
  'track': true,
  'wbr': true
};

var bxKq = {
  'listing': true,
  'pre': true,
  'textarea': true
};

var bXaz = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
var bRvK = {};
var bKkv = {}.hasOwnProperty;

function b4Al(tag) {
  if (!bKkv.call(bRvK, tag)) {
    !bXaz.test(tag) ? 'production' !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : invariant(false) : undefined;
    bRvK[tag] = true;
  }
}

function bGXZ(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

function ReactDOMComponent(tag) {
  b4Al(tag);
  this._tag = tag.toLowerCase();
  this._renderedChildren = null;
  this._previousStyle = null;
  this._previousStyleCopy = null;
  this._rootNodeID = null;
  this._wrapperState = null;
  this._topLevelWrapper = null;
  this._nodeWithLegacyProperties = null;
}

ReactDOMComponent.displayName = 'ReactDOMComponent';

ReactDOMComponent.Mixin = {

  construct: function (element) {
    this._currentElement = element;
  },

  mountComponent: function (rootID, transaction, context) {
    this._rootNodeID = rootID;

    var props = this._currentElement.props;

    switch (this._tag) {
      case 'iframe':
      case 'img':
      case 'form':
      case 'video':
      case 'audio':
        this._wrapperState = {
          listeners: null
        };
        transaction.getReactMountReady().enqueue(byqY, this);
        break;
      case 'button':
        props = ReactDOMButton.getNativeProps(this, props, context);
        break;
      case 'input':
        ReactDOMInput.mountWrapper(this, props, context);
        props = ReactDOMInput.getNativeProps(this, props, context);
        break;
      case 'option':
        ReactDOMOption.mountWrapper(this, props, context);
        props = ReactDOMOption.getNativeProps(this, props, context);
        break;
      case 'select':
        ReactDOMSelect.mountWrapper(this, props, context);
        props = ReactDOMSelect.getNativeProps(this, props, context);
        context = ReactDOMSelect.processChildContext(this, props, context);
        break;
      case 'textarea':
        ReactDOMTextarea.mountWrapper(this, props, context);
        props = ReactDOMTextarea.getNativeProps(this, props, context);
        break;
    }

    bkg8(this, props);


    var mountImage;
    if (transaction.useCreateElement) {
      var ownerDocument = context[ReactMount.ownerDocumentContextKey];
      var el = ownerDocument.createElement(this._currentElement.type);
      DOMPropertyOperations.setAttributeForID(el, this._rootNodeID);

      ReactMount.getID(el);
      this._updateDOMProperties({}, props, transaction, el);
      this._createInitialChildren(transaction, props, context, el);
      mountImage = el;
    } else {
      var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
      var tagContent = this._createContentMarkup(transaction, props, context);
      if (!tagContent && bPqq[this._tag]) {
        mountImage = tagOpen + '/>';
      } else {
        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
      }
    }

    switch (this._tag) {
      case 'input':
        transaction.getReactMountReady().enqueue(brge, this);

      case 'button':
      case 'select':
      case 'textarea':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
    }

    return mountImage;
  },

  _createOpenTagMarkupAndPutListeners: function (transaction, props) {
    var ret = '<' + this._currentElement.type;

    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (beYl.hasOwnProperty(propKey)) {
        if (propValue) {
          b5ma(this._rootNodeID, propKey, propValue, transaction);
        }
      } else {
        if (propKey === bOZG) {
          if (propValue) {
            propValue = this._previousStyleCopy = assign({}, props.style);
          }
          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
        }
        var markup = null;
        if (this._tag != null && bGXZ(this._tag, props)) {
          if (propKey !== bYn4) {
            markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
          }
        } else {
          markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
        }
        if (markup) {
          ret += ' ' + markup;
        }
      }
    }

    if (transaction.renderToStaticMarkup) {
      return ret;
    }

    var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
    return ret + ' ' + markupForID;
  },

  _createContentMarkup: function (transaction, props, context) {
    var ret = '';

    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        ret = innerHTML.__html;
      }
    } else {
      var contentToUse = bB4E[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        ret = escapeTextContentForBrowser(contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        ret = mountImages.join('');
      }
    }
    if (bxKq[this._tag] && ret.charAt(0) === '\n') {
      return '\n' + ret;
    } else {
      return ret;
    }
  },

  _createInitialChildren: function (transaction, props, context, el) {
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        setInnerHTML(el, innerHTML.__html);
      }
    } else {
      var contentToUse = bB4E[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        setTextContent(el, contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        for (var i = 0; i < mountImages.length; i++) {
          el.appendChild(mountImages[i]);
        }
      }
    }
  },

  receiveComponent: function (nextElement, transaction, context) {
    var prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
  },

  updateComponent: function (transaction, prevElement, nextElement, context) {
    var lastProps = prevElement.props;
    var nextProps = this._currentElement.props;

    switch (this._tag) {
      case 'button':
        lastProps = ReactDOMButton.getNativeProps(this, lastProps);
        nextProps = ReactDOMButton.getNativeProps(this, nextProps);
        break;
      case 'input':
        ReactDOMInput.updateWrapper(this);
        lastProps = ReactDOMInput.getNativeProps(this, lastProps);
        nextProps = ReactDOMInput.getNativeProps(this, nextProps);
        break;
      case 'option':
        lastProps = ReactDOMOption.getNativeProps(this, lastProps);
        nextProps = ReactDOMOption.getNativeProps(this, nextProps);
        break;
      case 'select':
        lastProps = ReactDOMSelect.getNativeProps(this, lastProps);
        nextProps = ReactDOMSelect.getNativeProps(this, nextProps);
        break;
      case 'textarea':
        ReactDOMTextarea.updateWrapper(this);
        lastProps = ReactDOMTextarea.getNativeProps(this, lastProps);
        nextProps = ReactDOMTextarea.getNativeProps(this, nextProps);
        break;
    }

    bkg8(this, nextProps);
    this._updateDOMProperties(lastProps, nextProps, transaction, null);
    this._updateDOMChildren(lastProps, nextProps, transaction, context);

    if (!canDefineProperty && this._nodeWithLegacyProperties) {
      this._nodeWithLegacyProperties.props = nextProps;
    }

    if (this._tag === 'select') {
      transaction.getReactMountReady().enqueue(bQvr, this);
    }
  },

  _updateDOMProperties: function (lastProps, nextProps, transaction, node) {
    var propKey;
    var styleName;
    var styleUpdates;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
        continue;
      }
      if (propKey === bOZG) {
        var lastStyle = this._previousStyleCopy;
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
        this._previousStyleCopy = null;
      } else if (beYl.hasOwnProperty(propKey)) {
        if (lastProps[propKey]) {
          ba6d(this._rootNodeID, propKey);
        }
      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
        if (!node) {
          node = ReactMount.getNode(this._rootNodeID);
        }
        DOMPropertyOperations.deleteValueForProperty(node, propKey);
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = propKey === bOZG ? this._previousStyleCopy : lastProps[propKey];
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
        continue;
      }
      if (propKey === bOZG) {
        if (nextProp) {
          nextProp = this._previousStyleCopy = assign({}, nextProp);
        } else {
          this._previousStyleCopy = null;
        }
        if (lastProp) {
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }

          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          styleUpdates = nextProp;
        }
      } else if (beYl.hasOwnProperty(propKey)) {
        if (nextProp) {
          b5ma(this._rootNodeID, propKey, nextProp, transaction);
        } else if (lastProp) {
          ba6d(this._rootNodeID, propKey);
        }
      } else if (bGXZ(this._tag, nextProps)) {
        if (!node) {
          node = ReactMount.getNode(this._rootNodeID);
        }
        if (propKey === bYn4) {
          nextProp = null;
        }
        DOMPropertyOperations.setValueForAttribute(node, propKey, nextProp);
      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
        if (!node) {
          node = ReactMount.getNode(this._rootNodeID);
        }

        if (nextProp != null) {
          DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
        } else {
          DOMPropertyOperations.deleteValueForProperty(node, propKey);
        }
      }
    }
    if (styleUpdates) {
      if (!node) {
        node = ReactMount.getNode(this._rootNodeID);
      }
      CSSPropertyOperations.setValueForStyles(node, styleUpdates);
    }
  },

  _updateDOMChildren: function (lastProps, nextProps, transaction, context) {
    var lastContent = bB4E[typeof lastProps.children] ? lastProps.children : null;
    var nextContent = bB4E[typeof nextProps.children] ? nextProps.children : null;

    var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
    var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;

    var lastChildren = lastContent != null ? null : lastProps.children;
    var nextChildren = nextContent != null ? null : nextProps.children;

    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
    if (lastChildren != null && nextChildren == null) {
      this.updateChildren(null, transaction, context);
    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
      this.updateTextContent('');
    }

    if (nextContent != null) {
      if (lastContent !== nextContent) {
        this.updateTextContent('' + nextContent);
      }
    } else if (nextHtml != null) {
      if (lastHtml !== nextHtml) {
        this.updateMarkup('' + nextHtml);
      }
    } else if (nextChildren != null) {
      this.updateChildren(nextChildren, transaction, context);
    }
  },

  unmountComponent: function () {
    switch (this._tag) {
      case 'iframe':
      case 'img':
      case 'form':
      case 'video':
      case 'audio':
        var listeners = this._wrapperState.listeners;
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i].remove();
          }
        }
        break;
      case 'input':
        ReactDOMInput.unmountWrapper(this);
        break;
      case 'html':
      case 'head':
      case 'body':
        !false ? 'production' !== 'production' ? invariant(false, '<%s> tried to unmount. Because of cross-browser quirks it is ' + 'impossible to unmount some top-level components (eg <html>, ' + '<head>, and <body>) reliably and efficiently. To fix this, have a ' + 'single top-level component that never unmounts render these ' + 'elements.', this._tag) : invariant(false) : undefined;
        break;
    }

    this.unmountChildren();
    ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
    ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
    this._rootNodeID = null;
    this._wrapperState = null;
    if (this._nodeWithLegacyProperties) {
      var node = this._nodeWithLegacyProperties;
      node._reactInternalComponent = null;
      this._nodeWithLegacyProperties = null;
    }
  },

  getPublicInstance: function () {
    if (!this._nodeWithLegacyProperties) {
      var node = ReactMount.getNode(this._rootNodeID);

      node._reactInternalComponent = this;
      node.getDOMNode = b9ld;
      node.isMounted = bEze;
      node.setState = b7GY;
      node.replaceState = b7GY;
      node.forceUpdate = b7GY;
      node.setProps = bL7m;
      node.replaceProps = b0A1;

      node.props = this._currentElement.props;


      this._nodeWithLegacyProperties = node;
    }
    return this._nodeWithLegacyProperties;
  }

};

ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
  mountComponent: 'mountComponent',
  updateComponent: 'updateComponent'
});

assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
/* bandol: node_modules/react/lib/ReactBrowserComponentMixin.js */
/* imports:
[]
*/
/* default export: ReactBrowserComponentMixin */
/* exports:
undefined
*/


var bva9 = '_getDOMNodeDidWarn';

var ReactBrowserComponentMixin = {
  getDOMNode: function () {
    'production' !== 'production' ? warning(this.constructor[bva9], '%s.getDOMNode(...) is deprecated. Please use ' + 'ReactDOM.findDOMNode(instance) instead.', ReactInstanceMap.get(this).getName() || this.tagName || 'Unknown') : undefined;
    this.constructor[bva9] = true;
    return findDOMNode(this);
  }
};
/* bandol: node_modules/react/lib/HTMLDOMPropertyConfig.js */
/* imports:
[]
*/
/* default export: HTMLDOMPropertyConfig */
/* exports:
undefined
*/


var bMla = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var b63p = DOMProperty.injection.MUST_USE_PROPERTY;
var bZ6X = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var bAmk = DOMProperty.injection.HAS_SIDE_EFFECTS;
var b3Y5 = DOMProperty.injection.HAS_NUMERIC_VALUE;
var bpy2 = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
var bm2y = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var bnJg;
if (ExecutionEnvironment.canUseDOM) {
  var bzE4 = document.implementation;
  bnJg = bzE4 && bzE4.hasFeature && bzE4.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
}

var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
  Properties: {
    accept: null,
    acceptCharset: null,
    accessKey: null,
    action: null,
    allowFullScreen: bMla | bZ6X,
    allowTransparency: bMla,
    alt: null,
    async: bZ6X,
    autoComplete: null,

    autoPlay: bZ6X,
    capture: bMla | bZ6X,
    cellPadding: null,
    cellSpacing: null,
    charSet: bMla,
    challenge: bMla,
    checked: b63p | bZ6X,
    classID: bMla,

    className: bnJg ? bMla : b63p,
    cols: bMla | bpy2,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: bMla,
    controls: b63p | bZ6X,
    coords: null,
    crossOrigin: null,
    data: null,
    dateTime: bMla,
    'default': bZ6X,
    defer: bZ6X,
    dir: null,
    disabled: bMla | bZ6X,
    download: bm2y,
    draggable: null,
    encType: null,
    form: bMla,
    formAction: bMla,
    formEncType: bMla,
    formMethod: bMla,
    formNoValidate: bZ6X,
    formTarget: bMla,
    frameBorder: bMla,
    headers: null,
    height: bMla,
    hidden: bMla | bZ6X,
    high: null,
    href: null,
    hrefLang: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: b63p,
    inputMode: bMla,
    integrity: null,
    is: bMla,
    keyParams: bMla,
    keyType: bMla,
    kind: null,
    label: null,
    lang: null,
    list: bMla,
    loop: b63p | bZ6X,
    low: null,
    manifest: bMla,
    marginHeight: null,
    marginWidth: null,
    max: null,
    maxLength: bMla,
    media: bMla,
    mediaGroup: null,
    method: null,
    min: null,
    minLength: bMla,
    multiple: b63p | bZ6X,
    muted: b63p | bZ6X,
    name: null,
    nonce: bMla,
    noValidate: bZ6X,
    open: bZ6X,
    optimum: null,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: b63p | bZ6X,
    rel: null,
    required: bZ6X,
    reversed: bZ6X,
    role: bMla,
    rows: bMla | bpy2,
    rowSpan: null,
    sandbox: null,
    scope: null,
    scoped: bZ6X,
    scrolling: null,
    seamless: bMla | bZ6X,
    selected: b63p | bZ6X,
    shape: null,
    size: bMla | bpy2,
    sizes: bMla,
    span: bpy2,
    spellCheck: null,
    src: null,
    srcDoc: b63p,
    srcLang: null,
    srcSet: bMla,
    start: b3Y5,
    step: null,
    style: null,
    summary: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    useMap: null,
    value: b63p | bAmk,
    width: bMla,
    wmode: bMla,
    wrap: null,

    about: bMla,
    datatype: bMla,
    inlist: bMla,
    prefix: bMla,

    property: bMla,
    resource: bMla,
    'typeof': bMla,
    vocab: bMla,

    autoCapitalize: bMla,
    autoCorrect: bMla,

    autoSave: null,

    color: null,

    itemProp: bMla,
    itemScope: bMla | bZ6X,
    itemType: bMla,

    itemID: bMla,
    itemRef: bMla,

    results: null,

    security: bMla,

    unselectable: bMla
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMPropertyNames: {
    autoComplete: 'autocomplete',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    autoSave: 'autosave',

    encType: 'encoding',
    hrefLang: 'hreflang',
    radioGroup: 'radiogroup',
    spellCheck: 'spellcheck',
    srcDoc: 'srcdoc',
    srcSet: 'srcset'
  }
};
/* bandol: node_modules/react/lib/EnterLeaveEventPlugin.js */
/* imports:
[]
*/
/* default export: EnterLeaveEventPlugin */
/* exports:
undefined
*/


var bb3e = EventConstants.topLevelTypes;
var blYM = ReactMount.getFirstReactDOM;

var bVl4 = {
  mouseEnter: {
    registrationName: keyOf({ onMouseEnter: null }),
    dependencies: [bb3e.topMouseOut, bb3e.topMouseOver]
  },
  mouseLeave: {
    registrationName: keyOf({ onMouseLeave: null }),
    dependencies: [bb3e.topMouseOut, bb3e.topMouseOver]
  }
};

var bgnL = [null, null];

var EnterLeaveEventPlugin = {

  eventTypes: bVl4,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    if (topLevelType === bb3e.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== bb3e.topMouseOut && topLevelType !== bb3e.topMouseOver) {
      return null;
    }

    var win;
    if (topLevelTarget.window === topLevelTarget) {
      win = topLevelTarget;
    } else {
      var doc = topLevelTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    var fromID = '';
    var toID = '';
    if (topLevelType === bb3e.topMouseOut) {
      from = topLevelTarget;
      fromID = topLevelTargetID;
      to = blYM(nativeEvent.relatedTarget || nativeEvent.toElement);
      if (to) {
        toID = ReactMount.getID(to);
      } else {
        to = win;
      }
      to = to || win;
    } else {
      from = win;
      to = topLevelTarget;
      toID = topLevelTargetID;
    }

    if (from === to) {
      return null;
    }

    var leave = SyntheticMouseEvent.getPooled(bVl4.mouseLeave, fromID, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = from;
    leave.relatedTarget = to;

    var enter = SyntheticMouseEvent.getPooled(bVl4.mouseEnter, toID, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = to;
    enter.relatedTarget = from;

    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

    bgnL[0] = leave;
    bgnL[1] = enter;

    return bgnL;
  }

};
/* bandol: node_modules/react/lib/DefaultEventPluginOrder.js */
/* imports:
[]
*/
/* default export: DefaultEventPluginOrder */
/* exports:
undefined
*/

var DefaultEventPluginOrder = [keyOf({ ResponderEventPlugin: null }), keyOf({ SimpleEventPlugin: null }), keyOf({ TapEventPlugin: null }), keyOf({ EnterLeaveEventPlugin: null }), keyOf({ ChangeEventPlugin: null }), keyOf({ SelectEventPlugin: null }), keyOf({ BeforeInputEventPlugin: null })];
/* bandol: node_modules/react/lib/ClientReactRootIndex.js */
/* imports:
[]
*/
/* default export: ClientReactRootIndex */
/* exports:
undefined
*/


var bGKZ = 0;

var ClientReactRootIndex = {
  createReactRootIndex: function () {
    return bGKZ++;
  }
};
/* bandol: node_modules/react/lib/ChangeEventPlugin.js */
/* imports:
[]
*/
/* default export: ChangeEventPlugin */
/* exports:
undefined
*/


var bOG = EventConstants.topLevelTypes;

var b8Y = {
  change: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onChange: null }),
      captured: keyOf({ onChangeCapture: null })
    },
    dependencies: [bOG.topBlur, bOG.topChange, bOG.topClick, bOG.topFocus, bOG.topInput, bOG.topKeyDown, bOG.topKeyUp, bOG.topSelectionChange]
  }
};

var bNx = null;
var bd0 = null;
var b9d = null;
var bEe = null;

function b7Y(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

var bLm = false;
if (ExecutionEnvironment.canUseDOM) {
  bLm = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
}

function b01(nativeEvent) {
  var event = SyntheticEvent.getPooled(b8Y.change, bd0, nativeEvent, getEventTarget(nativeEvent));
  EventPropagators.accumulateTwoPhaseDispatches(event);

  ReactUpdates.batchedUpdates(b12, event);
}

function b12(event) {
  EventPluginHub.enqueueEvents(event);
  EventPluginHub.processEventQueue(false);
}

function bw8(target, targetID) {
  bNx = target;
  bd0 = targetID;
  bNx.attachEvent('onchange', b01);
}

function bk8() {
  if (!bNx) {
    return;
  }
  bNx.detachEvent('onchange', b01);
  bNx = null;
  bd0 = null;
}

function b5a(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bOG.topChange) {
    return topLevelTargetID;
  }
}
function bJL(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bOG.topFocus) {
    bk8();
    bw8(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === bOG.topBlur) {
    bk8();
  }
}

var bqn = false;
if (ExecutionEnvironment.canUseDOM) {
  bqn = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
}

var byY = {
  get: function () {
    return bEe.get.call(this);
  },
  set: function (val) {
    b9d = '' + val;
    bEe.set.call(this, val);
  }
};

function brVe(target, targetID) {
  bNx = target;
  bd0 = targetID;
  b9d = target.value;
  bEe = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');

  Object.defineProperty(bNx, 'value', byY);
  bNx.attachEvent('onpropertychange', bPXq);
}

function bQrr() {
  if (!bNx) {
    return;
  }

  delete bNx.value;
  bNx.detachEvent('onpropertychange', bPXq);

  bNx = null;
  bd0 = null;
  b9d = null;
  bEe = null;
}

function bPXq(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  var value = nativeEvent.srcElement.value;
  if (value === b9d) {
    return;
  }
  b9d = value;

  b01(nativeEvent);
}

function bxgq(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bOG.topInput) {
    return topLevelTargetID;
  }
}

function bX4z(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bOG.topFocus) {
    bQrr();
    brVe(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === bOG.topBlur) {
    bQrr();
  }
}

function bRyK(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bOG.topSelectionChange || topLevelType === bOG.topKeyUp || topLevelType === bOG.topKeyDown) {
    if (bNx && bNx.value !== b9d) {
      b9d = bNx.value;
      return bd0;
    }
  }
}

function bKLv(elem) {
  return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function b45l(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bOG.topClick) {
    return topLevelTargetID;
  }
}

var ChangeEventPlugin = {

  eventTypes: b8Y,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {

    var getTargetIDFunc, handleEventFunc;
    if (b7Y(topLevelTarget)) {
      if (bLm) {
        getTargetIDFunc = b5a;
      } else {
        handleEventFunc = bJL;
      }
    } else if (isTextInputElement(topLevelTarget)) {
      if (bqn) {
        getTargetIDFunc = bxgq;
      } else {
        getTargetIDFunc = bRyK;
        handleEventFunc = bX4z;
      }
    } else if (bKLv(topLevelTarget)) {
      getTargetIDFunc = b45l;
    }

    if (getTargetIDFunc) {
      var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
      if (targetID) {
        var event = SyntheticEvent.getPooled(b8Y.change, targetID, nativeEvent, nativeEventTarget);
        event.type = 'change';
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
    }
  }

};
/* bandol: node_modules/react/lib/SyntheticInputEvent.js */
/* imports:
[]
*/
/* default export: SyntheticInputEvent */
/* exports:
undefined
*/

var bY4 = {
  data: null
};

function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticInputEvent, bY4);
/* bandol: node_modules/react/lib/SyntheticCompositionEvent.js */
/* imports:
[]
*/
/* default export: SyntheticCompositionEvent */
/* exports:
undefined
*/

var bBE = {
  data: null
};

function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticCompositionEvent, bBE);
/* bandol: node_modules/react/lib/FallbackCompositionState.js */
/* imports:
[]
*/
/* default export: FallbackCompositionState */
/* exports:
undefined
*/

function FallbackCompositionState(root) {
  this._root = root;
  this._startText = this.getText();
  this._fallbackText = null;
}

assign(FallbackCompositionState.prototype, {
  destructor: function () {
    this._root = null;
    this._startText = null;
    this._fallbackText = null;
  },

  getText: function () {
    if ('value' in this._root) {
      return this._root.value;
    }
    return this._root[getTextContentAccessor()];
  },

  getData: function () {
    if (this._fallbackText) {
      return this._fallbackText;
    }

    var start;
    var startValue = this._startText;
    var startLength = startValue.length;
    var end;
    var endValue = this.getText();
    var endLength = endValue.length;

    for (start = 0; start < startLength; start++) {
      if (startValue[start] !== endValue[start]) {
        break;
      }
    }

    var minEnd = startLength - start;
    for (end = 1; end <= minEnd; end++) {
      if (startValue[startLength - end] !== endValue[endLength - end]) {
        break;
      }
    }

    var sliceTail = end > 1 ? 1 - end : undefined;
    this._fallbackText = endValue.slice(start, sliceTail);
    return this._fallbackText;
  }
});

PooledClass.addPoolingTo(FallbackCompositionState);
/* bandol: node_modules/react/lib/BeforeInputEventPlugin.js */
/* imports:
[]
*/
/* default export: BeforeInputEventPlugin */
/* exports:
undefined
*/


var bXz = [9, 13, 27, 32];
var bRK = 229;

var bKv = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var b4l = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  b4l = document.documentMode;
}

var bGZ = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !b4l && !blM();

var bbe = ExecutionEnvironment.canUseDOM && (!bKv || b4l && b4l > 8 && b4l <= 11);

function blM() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var bV4 = 32;
var bgL = String.fromCharCode(bV4);

var bMa = EventConstants.topLevelTypes;

var b6p = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onBeforeInput: null }),
      captured: keyOf({ onBeforeInputCapture: null })
    },
    dependencies: [bMa.topCompositionEnd, bMa.topKeyPress, bMa.topTextInput, bMa.topPaste]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionEnd: null }),
      captured: keyOf({ onCompositionEndCapture: null })
    },
    dependencies: [bMa.topBlur, bMa.topCompositionEnd, bMa.topKeyDown, bMa.topKeyPress, bMa.topKeyUp, bMa.topMouseDown]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionStart: null }),
      captured: keyOf({ onCompositionStartCapture: null })
    },
    dependencies: [bMa.topBlur, bMa.topCompositionStart, bMa.topKeyDown, bMa.topKeyPress, bMa.topKeyUp, bMa.topMouseDown]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionUpdate: null }),
      captured: keyOf({ onCompositionUpdateCapture: null })
    },
    dependencies: [bMa.topBlur, bMa.topCompositionUpdate, bMa.topKeyDown, bMa.topKeyPress, bMa.topKeyUp, bMa.topMouseDown]
  }
};

var bZX = false;

function bAk(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

function b35(topLevelType) {
  switch (topLevelType) {
    case bMa.topCompositionStart:
      return b6p.compositionStart;
    case bMa.topCompositionEnd:
      return b6p.compositionEnd;
    case bMa.topCompositionUpdate:
      return b6p.compositionUpdate;
  }
}

function bp2(topLevelType, nativeEvent) {
  return topLevelType === bMa.topKeyDown && nativeEvent.keyCode === bRK;
}

function bmy(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case bMa.topKeyUp:
      return bXz.indexOf(nativeEvent.keyCode) !== -1;
    case bMa.topKeyDown:
      return nativeEvent.keyCode !== bRK;
    case bMa.topKeyPress:
    case bMa.topMouseDown:
    case bMa.topBlur:
      return true;
    default:
      return false;
  }
}

function bng(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

var bz4 = null;

function bv9(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (bKv) {
    eventType = b35(topLevelType);
  } else if (!bz4) {
    if (bp2(topLevelType, nativeEvent)) {
      eventType = b6p.compositionStart;
    }
  } else if (bmy(topLevelType, nativeEvent)) {
    eventType = b6p.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (bbe) {
    if (!bz4 && eventType === b6p.compositionStart) {
      bz4 = FallbackCompositionState.getPooled(topLevelTarget);
    } else if (eventType === b6p.compositionEnd) {
      if (bz4) {
        fallbackData = bz4.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    event.data = fallbackData;
  } else {
    var customData = bng(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

function bad(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case bMa.topCompositionEnd:
      return bng(nativeEvent);
    case bMa.topKeyPress:
      var which = nativeEvent.which;
      if (which !== bV4) {
        return null;
      }

      bZX = true;
      return bgL;

    case bMa.topTextInput:
      var chars = nativeEvent.data;

      if (chars === bgL && bZX) {
        return null;
      }

      return chars;

    default:
      return null;
  }
}

function b2k(topLevelType, nativeEvent) {
  if (bz4) {
    if (topLevelType === bMa.topCompositionEnd || bmy(topLevelType, nativeEvent)) {
      var chars = bz4.getData();
      FallbackCompositionState.release(bz4);
      bz4 = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case bMa.topPaste:
      return null;
    case bMa.topKeyPress:
      if (nativeEvent.which && !bAk(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case bMa.topCompositionEnd:
      return bbe ? null : nativeEvent.data;
    default:
      return null;
  }
}

function bel(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var chars;

  if (bGZ) {
    chars = bad(topLevelType, nativeEvent);
  } else {
    chars = b2k(topLevelType, nativeEvent);
  }

  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(b6p.beforeInput, topLevelTargetID, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

var BeforeInputEventPlugin = {

  eventTypes: b6p,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    return [bv9(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget), bel(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget)];
  }
};
/* bandol: node_modules/react/lib/ReactDefaultInjection.js */
/* imports:
[]
*/
/* default export: ReactDefaultInjection */
/* exports:
undefined
*/


var bPq = false;

function bxq() {
  if (bPq) {
    return;
  }
  bPq = true;

  ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);

  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
  ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
  ReactInjection.EventPluginHub.injectMount(ReactMount);

  ReactInjection.EventPluginHub.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    ChangeEventPlugin: ChangeEventPlugin,
    SelectEventPlugin: SelectEventPlugin,
    BeforeInputEventPlugin: BeforeInputEventPlugin
  });

  ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);

  ReactInjection.NativeComponent.injectTextComponentClass(ReactDOMTextComponent);

  ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);

  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
  ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);

  ReactInjection.EmptyComponent.injectEmptyComponent('noscript');

  ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
  ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);

  ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex);

  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
}

var ReactDefaultInjection = {
  inject: bxq
};
/* bandol: node_modules/react/lib/ReactDOMServer.js */
/* imports:
[]
*/
/* default export: ReactDOMServer */
/* exports:
undefined
*/


ReactDefaultInjection.inject();

var ReactDOMServer = {
  renderToString: ReactServerRendering.renderToString,
  renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
  version: ReactVersion
};
/* bandol: node_modules/react/lib/renderSubtreeIntoContainer.js */
/* imports:
[]
*/
/* default export: renderSubtreeIntoContainer */
/* exports:
undefined
*/
var renderSubtreeIntoContainer = ReactMount.renderSubtreeIntoContainer;
/* bandol: node_modules/react/lib/ReactDOM.js */
/* imports:
[]
*/
/* default export: ReactDOM */
/* exports:
undefined
*/


ReactDefaultInjection.inject();

var bQr = ReactPerf.measure('React', 'render', ReactMount.render);

var ReactDOM = {
  findDOMNode: findDOMNode,
  render: bQr,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion,

  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
};
/* bandol: node_modules/react/lib/React.js */
/* imports:
[]
*/
/* default export: React */
/* exports:
undefined
*/

var React = {};

assign(React, ReactIsomorphic);

assign(React, {
  findDOMNode: deprecated('findDOMNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.findDOMNode),
  render: deprecated('render', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.render),
  unmountComponentAtNode: deprecated('unmountComponentAtNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.unmountComponentAtNode),

  renderToString: deprecated('renderToString', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToString),
  renderToStaticMarkup: deprecated('renderToStaticMarkup', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToStaticMarkup)
});

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;
React.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMServer;
/* bandol: actual.js */
/* imports:
[]
*/
/* default export: undefined */
/* exports:
undefined
*/


ReactDOM.render(React.createElement('h1', null, 'Hello Bandol'), document.getElementById('content'));

}());