(function () {
/**bandol> resource: node_modules/react/lib/deprecated.js */

function deprecated(fnName, newModule, newPackage, ctx, fn) {
  var warned = false;


  return fn;
}
/**bandol> resource: node_modules/react/lib/Object.assign.js */


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
/**bandol> resource: node_modules/fbjs/lib/invariant.js */


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
/**bandol> resource: node_modules/react/lib/ReactCurrentOwner.js */

var ReactCurrentOwner = {
  current: null

};
/**bandol> resource: node_modules/react/lib/ReactElement.js */

var b8qv = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var bNXN = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: b8qv,

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
      if (config.hasOwnProperty(propName) && !bNXN.hasOwnProperty(propName)) {
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
      if (config.hasOwnProperty(propName) && !bNXN.hasOwnProperty(propName)) {
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
  return typeof object === 'object' && object !== null && object.$$typeof === b8qv;
};
/**bandol> resource: node_modules/react/lib/onlyChild.js */

function onlyChild(children) {
  !ReactElement.isValidElement(children) ? 'production' !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : undefined;
  return children;
}
/**bandol> resource: node_modules/react/lib/ReactVersion.js */
var bPq = '0.14.7';
/**bandol> resource: node_modules/react/lib/getIteratorFn.js */

var bYZx = typeof Symbol === 'function' && Symbol.iterator;
var bORm = '@@iterator';
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (bYZx && maybeIterable[bYZx] || maybeIterable[bORm]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}
/**bandol> resource: node_modules/fbjs/lib/emptyFunction.js */


function bBqm(arg) {
  return function () {
    return arg;
  };
}

function emptyFunction() {}

emptyFunction.thatReturns = bBqm;
emptyFunction.thatReturnsFalse = bBqm(false);
emptyFunction.thatReturnsTrue = bBqm(true);
emptyFunction.thatReturnsNull = bBqm(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};
/**bandol> resource: node_modules/react/lib/ReactPropTypeLocationNames.js */


var ReactPropTypeLocationNames = {};
/**bandol> resource: node_modules/react/lib/ReactPropTypes.js */


var bVEr = '<<anonymous>>';

var ReactPropTypes = {
  array: bMxl('array'),
  bool: bMxl('boolean'),
  func: bMxl('function'),
  number: bMxl('number'),
  object: bMxl('object'),
  string: bMxl('string'),

  any: b6qN(),
  arrayOf: bZAz,
  element: bAq7(),
  instanceOf: b3qN,
  node: bzPn(),
  objectOf: bm5L,
  oneOf: bpdX,
  oneOfType: bnd4,
  shape: bvdE
};

function bgdY(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    componentName = componentName || bVEr;
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

function bMxl(expectedType) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bad9(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];

      var preciseType = b2YB(propValue);

      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return bgdY(validate);
}

function b6qN() {
  return bgdY(emptyFunction.thatReturns(null));
}

function bZAz(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = bad9(propValue);
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
  return bgdY(validate);
}

function bAq7() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!ReactElement.isValidElement(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return bgdY(validate);
}

function b3qN(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || bVEr;
      var actualClassName = be5A(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return bgdY(validate);
}

function bpdX(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    return bgdY(function () {
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
  return bgdY(validate);
}

function bm5L(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bad9(propValue);
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
  return bgdY(validate);
}

function bnd4(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    return bgdY(function () {
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
  return bgdY(validate);
}

function bzPn() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return bgdY(validate);
}

function bvdE(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bad9(propValue);
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
  return bgdY(validate);
}

function bad9(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    return 'object';
  }
  return propType;
}

function b2YB(propValue) {
  var propType = bad9(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

function be5A(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name;
}
/**bandol> resource: node_modules/fbjs/lib/mapObject.js */


var blJZ = Object.prototype.hasOwnProperty;

function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (blJZ.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}
/**bandol> resource: node_modules/react/lib/ReactDOMFactories.js */

function bbEp(tag) {
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

}, bbEp);
/**bandol> resource: node_modules/fbjs/lib/warning.js */


var warning = emptyFunction;
/**bandol> resource: node_modules/fbjs/lib/keyOf.js */


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
/**bandol> resource: node_modules/fbjs/lib/keyMirror.js */

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
/**bandol> resource: node_modules/fbjs/lib/emptyObject.js */


var emptyObject = {};
/**bandol> resource: node_modules/react/lib/ReactNoopUpdateQueue.js */


function bQyX(publicInstance, callerName) {}

function bPE1(publicInstance) {
  return false;
}

function bxLO(publicInstance, callback) {}

function bXEY(publicInstance) {
  bQyX(publicInstance, 'forceUpdate');
}

function bREn(publicInstance, completeState) {
  bQyX(publicInstance, 'replaceState');
}

function bKYa(publicInstance, partialState) {
  bQyX(publicInstance, 'setState');
}

function b4mJ(publicInstance, partialProps) {
  bQyX(publicInstance, 'setProps');
}

function bGEQ(publicInstance, props) {
  bQyX(publicInstance, 'replaceProps');
}

var ReactNoopUpdateQueue = {
  isMounted: bPE1,
  enqueueCallback: bxLO,
  enqueueForceUpdate: bXEY,
  enqueueReplaceState: bREn,
  enqueueSetState: bKYa,
  enqueueSetProps: b4mJ,
  enqueueReplaceProps: bGEQ
};
/**bandol> resource: node_modules/react/lib/ReactComponent.js */

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
/**bandol> resource: node_modules/react/lib/ReactClass.js */


var bYE3 = keyOf({ mixins: null });

var bOEe = keyMirror({
  DEFINE_ONCE: null,

  DEFINE_MANY: null,

  OVERRIDE_BASE: null,

  DEFINE_MANY_MERGED: null
});

var b88x = [];

var bdyk = {
  mixins: bOEe.DEFINE_MANY,

  statics: bOEe.DEFINE_MANY,

  propTypes: bOEe.DEFINE_MANY,

  contextTypes: bOEe.DEFINE_MANY,

  childContextTypes: bOEe.DEFINE_MANY,

  getDefaultProps: bOEe.DEFINE_MANY_MERGED,

  getInitialState: bOEe.DEFINE_MANY_MERGED,

  getChildContext: bOEe.DEFINE_MANY_MERGED,

  render: bOEe.DEFINE_ONCE,

  componentWillMount: bOEe.DEFINE_MANY,

  componentDidMount: bOEe.DEFINE_MANY,

  componentWillReceiveProps: bOEe.DEFINE_MANY,

  shouldComponentUpdate: bOEe.DEFINE_ONCE,

  componentWillUpdate: bOEe.DEFINE_MANY,

  componentDidUpdate: bOEe.DEFINE_MANY,

  componentWillUnmount: bOEe.DEFINE_MANY,

  updateComponent: bOEe.OVERRIDE_BASE

};

function b95B(Constructor, displayName) {
  Constructor.displayName = displayName;
}

function bEYR(Constructor, mixins) {
  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      bqO2(Constructor, mixins[i]);
    }
  }
}

function b77R(Constructor, childContextTypes) {
  Constructor.childContextTypes = assign({}, Constructor.childContextTypes, childContextTypes);
}

function bLYg(Constructor, contextTypes) {
  Constructor.contextTypes = assign({}, Constructor.contextTypes, contextTypes);
}

function b0ZL(Constructor, getDefaultProps) {
  if (Constructor.getDefaultProps) {
    Constructor.getDefaultProps = bQyG(Constructor.getDefaultProps, getDefaultProps);
  } else {
    Constructor.getDefaultProps = getDefaultProps;
  }
}

function b1AQ(Constructor, propTypes) {
  Constructor.propTypes = assign({}, Constructor.propTypes, propTypes);
}

function bwOp(Constructor, statics) {
  byJZ(Constructor, statics);
}

function bkOK() {}

var b5yz = {
  displayName: b95B,
  mixins: bEYR,
  childContextTypes: b77R,
  contextTypes: bLYg,
  getDefaultProps: b0ZL,
  propTypes: b1AQ,
  statics: bwOp,
  autobind: bkOK
};

function bJYP(proto, name) {
  var specPolicy = bdyk.hasOwnProperty(name) ? bdyk[name] : null;

  if (bbEV.hasOwnProperty(name)) {
    !(specPolicy === bOEe.OVERRIDE_BASE) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : undefined;
  }

  if (proto.hasOwnProperty(name)) {
    !(specPolicy === bOEe.DEFINE_MANY || specPolicy === bOEe.DEFINE_MANY_MERGED) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : undefined;
  }
}

function bqO2(Constructor, spec) {
  if (!spec) {
    return;
  }

  !(typeof spec !== 'function') ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
  !!ReactElement.isValidElement(spec) ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;

  var proto = Constructor.prototype;

  if (spec.hasOwnProperty(bYE3)) {
    b5yz.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === bYE3) {
      continue;
    }

    var property = spec[name];
    bJYP(proto, name);

    if (b5yz.hasOwnProperty(name)) {
      b5yz[name](Constructor, property);
    } else {
      var isReactClassMethod = bdyk.hasOwnProperty(name);
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
          var specPolicy = bdyk[name];

          !(isReactClassMethod && (specPolicy === bOEe.DEFINE_MANY_MERGED || specPolicy === bOEe.DEFINE_MANY)) ? 'production' !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : undefined;

          if (specPolicy === bOEe.DEFINE_MANY_MERGED) {
            proto[name] = bQyG(proto[name], property);
          } else if (specPolicy === bOEe.DEFINE_MANY) {
            proto[name] = bPEE(proto[name], property);
          }
        } else {
          proto[name] = property;
        }
      }
    }
  }
}

function byJZ(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in b5yz;
    !!isReserved ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : undefined;

    var isInherited = name in Constructor;
    !!isInherited ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : undefined;
    Constructor[name] = property;
  }
}

function brOA(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : undefined;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : undefined;
      one[key] = two[key];
    }
  }
  return one;
}

function bQyG(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    brOA(c, a);
    brOA(c, b);
    return c;
  };
}

function bPEE(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

function bxLr(component, method) {
  var boundMethod = method.bind(component);

  return boundMethod;
}

function bXE8(component) {
  for (var autoBindKey in component.__reactAutoBindMap) {
    if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
      var method = component.__reactAutoBindMap[autoBindKey];
      component[autoBindKey] = bxLr(component, method);
    }
  }
}

function bREq(newState, callback) {
  this.updater.enqueueReplaceState(this, newState);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
}

function bKY5() {
  return this.updater.isMounted(this);
}

function b4m7(partialProps, callback) {
  this.updater.enqueueSetProps(this, partialProps);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
}

function bGEr(newProps, callback) {
  this.updater.enqueueReplaceProps(this, newProps);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
}

var bbEV = {
  replaceState: bREq,
  isMounted: bKY5,
  setProps: b4m7,
  replaceProps: bGEr
};

var blJx = function () {};
assign(blJx.prototype, ReactComponent.prototype, bbEV);

function bVEn(spec) {
  var Constructor = function (props, context, updater) {
    if (this.__reactAutoBindMap) {
      bXE8(this);
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
  Constructor.prototype = new blJx();
  Constructor.prototype.constructor = Constructor;

  b88x.forEach(bqO2.bind(null, Constructor));

  bqO2(Constructor, spec);

  if (Constructor.getDefaultProps) {
    Constructor.defaultProps = Constructor.getDefaultProps();
  }

  !Constructor.prototype.render ? 'production' !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : undefined;

  for (var methodName in bdyk) {
    if (!Constructor.prototype[methodName]) {
      Constructor.prototype[methodName] = null;
    }
  }

  return Constructor;
}

function brOw(mixin) {
  b88x.push(mixin);
}

var ReactClass = {
  createClass: bVEn,


  injection: {
    injectMixin: brOw
  }

};
/**bandol> resource: node_modules/react/lib/ReactRootIndex.js */
function beOY(_createReactRootIndex) {
  ReactRootIndex.createReactRootIndex = _createReactRootIndex;
}

var bBk7 = {
  injectCreateReactRootIndex: beOY
};

var ReactRootIndex = {
  createReactRootIndex: null,
  injection: bBk7
};
/**bandol> resource: node_modules/react/lib/ReactInstanceHandles.js */


var b4w7 = '.';
var bGwr = b4w7.length;

var bbXV = 10000;

function bl6x(index) {
  return b4w7 + index.toString(36);
}

function bVMn(id, index) {
  return id.charAt(index) === b4w7 || index === id.length;
}

function bgbw(id) {
  return id === '' || id.charAt(0) === b4w7 && id.charAt(id.length - 1) !== b4w7;
}

function bMXr(ancestorID, descendantID) {
  return descendantID.indexOf(ancestorID) === 0 && bVMn(descendantID, ancestorID.length);
}

function b6wB(id) {
  return id ? id.substr(0, id.lastIndexOf(b4w7)) : '';
}

function bZ3E(ancestorID, destinationID) {
  !(bgbw(ancestorID) && bgbw(destinationID)) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(false) : undefined;
  !bMXr(ancestorID, destinationID) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(false) : undefined;
  if (ancestorID === destinationID) {
    return ancestorID;
  }

  var start = ancestorID.length + bGwr;
  var i;
  for (i = start; i < destinationID.length; i++) {
    if (bVMn(destinationID, i)) {
      break;
    }
  }
  return destinationID.substr(0, i);
}

function bAwX(oneID, twoID) {
  var minLength = Math.min(oneID.length, twoID.length);
  if (minLength === 0) {
    return '';
  }
  var lastCommonMarkerIndex = 0;

  for (var i = 0; i <= minLength; i++) {
    if (bVMn(oneID, i) && bVMn(twoID, i)) {
      lastCommonMarkerIndex = i;
    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
      break;
    }
  }
  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
  !bgbw(longestCommonID) ? 'production' !== 'production' ? invariant(false, 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(false) : undefined;
  return longestCommonID;
}

function b3nB(start, stop, cb, arg, skipFirst, skipLast) {
  start = start || '';
  stop = stop || '';
  !(start !== stop) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(false) : undefined;
  var traverseUp = bMXr(stop, start);
  !(traverseUp || bMXr(start, stop)) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(false) : undefined;

  var depth = 0;
  var traverse = traverseUp ? b6wB : bZ3E;
  for (var id = start;; id = traverse(id, stop)) {
    var ret;
    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
      ret = cb(id, traverseUp, arg);
    }
    if (ret === false || id === stop) {
      break;
    }
    !(depth++ < bbXV) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop, id) : invariant(false) : undefined;
  }
}

function bppv() {
  return bl6x(ReactRootIndex.createReactRootIndex());
}

function bmZd(rootID, name) {
  return rootID + name;
}

function bnAr(id) {
  if (id && id.charAt(0) === b4w7 && id.length > 1) {
    var index = id.indexOf(b4w7, 1);
    return index > -1 ? id.substr(0, index) : id;
  }
  return null;
}

function bz4Q(leaveID, enterID, cb, upArg, downArg) {
  var ancestorID = bAwX(leaveID, enterID);
  if (ancestorID !== leaveID) {
    b3nB(leaveID, ancestorID, cb, upArg, false, true);
  }
  if (ancestorID !== enterID) {
    b3nB(ancestorID, enterID, cb, downArg, true, false);
  }
}

function bvxe(targetID, cb, arg) {
  if (targetID) {
    b3nB('', targetID, cb, arg, true, false);
    b3nB(targetID, '', cb, arg, false, true);
  }
}

function baxv(targetID, cb, arg) {
  if (targetID) {
    b3nB('', targetID, cb, arg, true, true);
    b3nB(targetID, '', cb, arg, true, true);
  }
}

function b238(targetID, cb, arg) {
  b3nB('', targetID, cb, arg, true, false);
}

var ReactInstanceHandles = {
  createReactRootID: bppv,
  createReactID: bmZd,
  getReactRootIDFromNodeID: bnAr,
  traverseEnterLeave: bz4Q,
  traverseTwoPhase: bvxe,
  traverseTwoPhaseSkipTarget: baxv,
  traverseAncestors: b238,


  getFirstCommonAncestorID: bAwX,

  _getNextDescendantID: bZ3E,

  isAncestorIDOf: bMXr,

  SEPARATOR: b4w7

};
/**bandol> resource: node_modules/react/lib/traverseAllChildren.js */


var bqm2 = ReactInstanceHandles.SEPARATOR;
var byKZ = ':';

var brnA = {
  '=': '=0',
  '.': '=1',
  ':': '=2'
};

var bQGG = /[=.:]/g;

function bP4E(match) {
  return brnA[match];
}

function bxRr(component, index) {
  if (component && component.key != null) {
    return bRbq(component.key);
  }

  return index.toString(36);
}

function bXZ8(text) {
  return ('' + text).replace(bQGG, bP4E);
}

function bRbq(key) {
  return '$' + bXZ8(key);
}

function bKP5(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
    callback(traverseContext, children, nameSoFar === '' ? bqm2 + bxRr(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0;
  var nextNamePrefix = nameSoFar === '' ? bqm2 : nameSoFar + byKZ;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + bxRr(child, i);
      subtreeCount += bKP5(child, nextName, callback, traverseContext);
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
          nextName = nextNamePrefix + bxRr(child, ii++);
          subtreeCount += bKP5(child, nextName, callback, traverseContext);
        }
      } else {
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + bRbq(entry[0]) + byKZ + bxRr(child, 0);
            subtreeCount += bKP5(child, nextName, callback, traverseContext);
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

  return bKP5(children, '', callback, traverseContext);
}
/**bandol> resource: node_modules/react/lib/PooledClass.js */

var bEwR = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var b7wR = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var bLxg = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var b03L = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var b1pQ = function (a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var bwXp = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? 'production' !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : undefined;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var bkMK = 10;
var b5wz = bEwR;

var bJQP = function (CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || b5wz;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = bkMK;
  }
  NewKlass.release = bwXp;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: bJQP,
  oneArgumentPooler: bEwR,
  twoArgumentPooler: b7wR,
  threeArgumentPooler: bLxg,
  fourArgumentPooler: b03L,
  fiveArgumentPooler: b1pQ
};
/**bandol> resource: node_modules/react/lib/ReactChildren.js */


var bngr = PooledClass.twoArgumentPooler;
var bzXQ = PooledClass.fourArgumentPooler;

var bvre = /\/(?!\/)/g;
function bakv(text) {
  return ('' + text).replace(bvre, '//');
}

function b2m8(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
b2m8.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(b2m8, bngr);

function be4Y(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

function bBw7(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = b2m8.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, be4Y, traverseContext);
  b2m8.release(traverseContext);
}

function bYA3(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
bYA3.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(bYA3, bzXQ);

function bOKe(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    b8wx(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild !== child ? bakv(mappedChild.key || '') + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function b8wx(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = bakv(prefix) + '/';
  }
  var traverseContext = bYA3.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, bOKe, traverseContext);
  bYA3.release(traverseContext);
}

function bNRV(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  b8wx(children, result, null, func, context);
  return result;
}

function bdKk(traverseContext, child, name) {
  return null;
}

function b9wB(children, context) {
  return traverseAllChildren(children, bdKk, null);
}

var ReactChildren = {
  forEach: bBw7,
  map: bNRV,
  mapIntoWithKeyPrefixInternal: b8wx,
  count: b9wB,
  toArray: toArray
};
/**bandol> resource: node_modules/react/lib/ReactIsomorphic.js */


var bA8X = ReactElement.createElement;
var b3MB = ReactElement.createFactory;
var bp6v = ReactElement.cloneElement;

function bmVd(mixin) {
  return mixin;
}

var b4y3 = {

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,

  createElement: bA8X,
  cloneElement: bp6v,
  isValidElement: ReactElement.isValidElement,

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: b3MB,
  createMixin: bmVd,

  DOM: ReactDOMFactories,

  version: bPq,

  __spread: assign
};
/**bandol> resource: node_modules/react/lib/ReactNativeComponent.js */


var bXk8 = null;
var bRkq = null;

var bK85 = {};
var b467 = null;

function bG8r(componentClass) {
  bRkq = componentClass;
}

function bbrV(componentClass) {
  b467 = componentClass;
}

function bllx(componentClasses) {
  assign(bK85, componentClasses);
}

var bVkn = {
  injectGenericComponentClass: bG8r,
  injectTextComponentClass: bbrV,
  injectComponentClasses: bllx
};

function bgRw(element) {
  if (typeof element.type === 'function') {
    return element.type;
  }
  var tag = element.type;
  var componentClass = bK85[tag];
  if (componentClass == null) {
    bK85[tag] = componentClass = bXk8(tag);
  }
  return componentClass;
}

function bM8r(element) {
  !bRkq ? 'production' !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : invariant(false) : undefined;
  return new bRkq(element.type, element.props);
}

function b6AB(text) {
  return new b467(text);
}

function bZqE(component) {
  return component instanceof b467;
}

var ReactNativeComponent = {
  getComponentClassForElement: bgRw,
  createInternalComponent: bM8r,
  createInstanceForText: b6AB,
  isTextComponent: bZqE,
  injection: bVkn
};
/**bandol> resource: node_modules/react/lib/ReactOwner.js */
function bQkG(object) {
  return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
}

function bPkE(component, ref, owner) {
  !ReactOwner.isValidOwner(owner) ? 'production' !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might ' + 'be adding a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
  owner.attachRef(ref, component);
}

function bxPr(component, ref, owner) {
  !ReactOwner.isValidOwner(owner) ? 'production' !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might ' + 'be removing a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;

  if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
    owner.detachRef(ref);
  }
}

var ReactOwner = {
  isValidOwner: bQkG,
  addComponentAsRefTo: bPkE,
  removeComponentAsRefFrom: bxPr
};
/**bandol> resource: node_modules/react/lib/ReactRef.js */


var ReactRef = {};

function bVkp(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function brAA(ref, component, owner) {
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
    bVkp(ref, instance, element._owner);
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
    brAA(ref, instance, element._owner);
  }
};
/**bandol> resource: node_modules/react/lib/ReactReconciler.js */

function bK8K() {
  ReactRef.attachRefs(this, this._currentElement);
}

function b46e(internalInstance, rootID, transaction, context) {
  var markup = internalInstance.mountComponent(rootID, transaction, context);
  if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
    transaction.getReactMountReady().enqueue(bK8K, internalInstance);
  }
  return markup;
}

function bG8z(internalInstance) {
  ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
  internalInstance.unmountComponent();
}

function bbrb(internalInstance, nextElement, transaction, context) {
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
    transaction.getReactMountReady().enqueue(bK8K, internalInstance);
  }
}

function bllq(internalInstance, transaction) {
  internalInstance.performUpdateIfNecessary(transaction);
}

var ReactReconciler = {
  mountComponent: b46e,
  unmountComponent: bG8z,
  receiveComponent: bbrb,
  performUpdateIfNecessary: bllq
};
/**bandol> resource: node_modules/react/lib/ReactEmptyComponentRegistry.js */

var bPkA = {};

function bxPG(id) {
  return !!bPkA[id];
}

function bXkJ(id) {
  bPkA[id] = true;
}

function bRka(id) {
  delete bPkA[id];
}

var ReactEmptyComponentRegistry = {
  isNullComponentID: bxPG,
  registerNullComponentID: bXkJ,
  deregisterNullComponentID: bRka
};
/**bandol> resource: node_modules/react/lib/ReactEmptyComponent.js */


var bkbr;

function b5ZL(component) {
  bkbr = ReactElement.createElement(component);
}

var bJEb = {
  injectEmptyComponent: b5ZL
};

var ReactEmptyComponent = function (instantiate) {
  this._currentElement = null;
  this._rootNodeID = null;
  this._renderedComponent = instantiate(bkbr);
};

function bqZR(element) {}

function byx6(rootID, transaction, context) {
  ReactEmptyComponentRegistry.registerNullComponentID(rootID);
  this._rootNodeID = rootID;
  return ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, context);
}

function brAq() {}

function bQkz(rootID, transaction, context) {
  ReactReconciler.unmountComponent(this._renderedComponent);
  ReactEmptyComponentRegistry.deregisterNullComponentID(this._rootNodeID);
  this._rootNodeID = null;
  this._renderedComponent = null;
}

assign(ReactEmptyComponent.prototype, {
  construct: bqZR,
  mountComponent: byx6,
  receiveComponent: brAq,
  unmountComponent: bQkz
});

ReactEmptyComponent.injection = bJEb;
/**bandol> resource: node_modules/react/lib/shouldUpdateReactComponent.js */

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
/**bandol> resource: node_modules/react/lib/Transaction.js */
function bEQN() {
  this.transactionWrappers = this.getTransactionWrappers();
  if (this.wrapperInitData) {
    this.wrapperInitData.length = 0;
  } else {
    this.wrapperInitData = [];
  }
  this._isInTransaction = false;
}

function b7KX() {
  return !!this._isInTransaction;
}

function bLGa(method, scope, a, b, c, d, e, f) {
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
}

function b0yN(startIndex) {
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
}

function b1Vq(startIndex) {
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

var bwQz = {
  reinitializeTransaction: bEQN,


  _isInTransaction: false,

  getTransactionWrappers: null,

  isInTransaction: b7KX,
  perform: bLGa,
  initializeAll: b0yN,
  closeAll: b1Vq
};

var Transaction = {

  Mixin: bwQz,

  OBSERVED_ERROR: {}

};
/**bandol> resource: node_modules/react/lib/ReactPerf.js */
function b84d(object, objectName, methodNames) {}

function bNlB(objName, fnName, func) {
  return func;
}

function bd2v(measure) {
  ReactPerf.storedMeasure = measure;
}

var ReactPerf = {
  enableMeasure: false,

  storedMeasure: b9GY,

  measureMethods: b84d,
  measure: bNlB,


  injection: {
    injectMeasure: bd2v
  }
};

function b9GY(objName, fnName, func) {
  return func;
}
/**bandol> resource: node_modules/react/lib/CallbackQueue.js */

function CallbackQueue() {
  this._callbacks = null;
  this._contexts = null;
}

function beE2(callback, context) {
  this._callbacks = this._callbacks || [];
  this._contexts = this._contexts || [];
  this._callbacks.push(callback);
  this._contexts.push(context);
}

function bB31() {
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
}

function bY29() {
  this._callbacks = null;
  this._contexts = null;
}

function bOVp() {
  this.reset();
}

assign(CallbackQueue.prototype, {
  enqueue: beE2,
  notifyAll: bB31,
  reset: bY29,
  destructor: bOVp
});

PooledClass.addPoolingTo(CallbackQueue);
/**bandol> resource: node_modules/react/lib/ReactUpdates.js */


var brGq = [];
var bQMz = CallbackQueue.getPooled();
var bPgA = false;

var bx6G = null;

function bX2J() {
  !(ReactUpdates.ReactReconcileTransaction && bx6G) ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(false) : undefined;
}

function bR6a() {
  this.dirtyComponentsLength = brGq.length;
}

function bK4K() {
  if (this.dirtyComponentsLength !== brGq.length) {
    brGq.splice(0, this.dirtyComponentsLength);
    bmyr();
  } else {
    brGq.length = 0;
  }
}

var b4xe = {
  initialize: bR6a,
  close: bK4K
};

function bGxz() {
  this.callbackQueue.reset();
}

function bbyb() {
  this.callbackQueue.notifyAll();
}

var blPq = {
  initialize: bGxz,
  close: bbyb
};

var bVpp = [b4xe, blPq];

function bg2R() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue.getPooled();
  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(false);
}

function bMbX() {
  return bVpp;
}

function b6Rz() {
  this.dirtyComponentsLength = null;
  CallbackQueue.release(this.callbackQueue);
  this.callbackQueue = null;
  ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
  this.reconcileTransaction = null;
}

function bZeA(method, scope, a) {
  return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
}

assign(bg2R.prototype, Transaction.Mixin, {
  getTransactionWrappers: bMbX,
  destructor: b6Rz,
  perform: bZeA
});

PooledClass.addPoolingTo(bg2R);

function bAAP(callback, a, b, c, d, e) {
  bX2J();
  bx6G.batchedUpdates(callback, a, b, c, d, e);
}

function b3Pl(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function bpKk(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === brGq.length) ? 'production' !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, brGq.length) : invariant(false) : undefined;

  brGq.sort(b3Pl);

  for (var i = 0; i < len; i++) {
    var component = brGq[i];

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

var bmyr = function () {
  while (brGq.length || bPgA) {
    if (brGq.length) {
      var transaction = bg2R.getPooled();
      transaction.perform(bpKk, null, transaction);
      bg2R.release(transaction);
    }

    if (bPgA) {
      bPgA = false;
      var queue = bQMz;
      bQMz = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};
bmyr = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', bmyr);

function bnX1(component) {
  bX2J();

  if (!bx6G.isBatchingUpdates) {
    bx6G.batchedUpdates(bnX1, component);
    return;
  }

  brGq.push(component);
}

function bzAK(callback, context) {
  !bx6G.isBatchingUpdates ? 'production' !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(false) : undefined;
  bQMz.enqueue(callback, context);
  bPgA = true;
}

function bvgM(ReconcileTransaction) {
  !ReconcileTransaction ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : invariant(false) : undefined;
  ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
}

function ba20(_batchingStrategy) {
  !_batchingStrategy ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : invariant(false) : undefined;
  !(typeof _batchingStrategy.batchedUpdates === 'function') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : invariant(false) : undefined;
  !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(false) : undefined;
  bx6G = _batchingStrategy;
}

var b2Q2 = {
  injectReconcileTransaction: bvgM,
  injectBatchingStrategy: ba20
};

var ReactUpdates = {
  ReactReconcileTransaction: null,

  batchedUpdates: bAAP,
  enqueueUpdate: bnX1,
  flushBatchedUpdates: bmyr,
  injection: b2Q2,
  asap: bzAK
};
/**bandol> resource: node_modules/react/lib/ReactInstanceMap.js */
function b5XL(key) {
  key._reactInternalInstance = undefined;
}

function bJKb(key) {
  return key._reactInternalInstance;
}

function bq4R(key) {
  return key._reactInternalInstance !== undefined;
}

function byZ6(key, value) {
  key._reactInternalInstance = value;
}

var ReactInstanceMap = {
  remove: b5XL,
  get: bJKb,
  has: bq4R,
  set: byZ6
};
/**bandol> resource: node_modules/react/lib/ReactUpdateQueue.js */


function bYN9(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}

function bONp(publicInstance, callerName) {
  var internalInstance = ReactInstanceMap.get(publicInstance);
  if (!internalInstance) {
    return null;
  }

  return internalInstance;
}

function b82d(publicInstance) {
  var internalInstance = ReactInstanceMap.get(publicInstance);
  if (internalInstance) {
    return !!internalInstance._renderedComponent;
  } else {
    return false;
  }
}

function bNNB(publicInstance, callback) {
  !(typeof callback === 'function') ? 'production' !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
  var internalInstance = bONp(publicInstance);

  if (!internalInstance) {
    return null;
  }

  if (internalInstance._pendingCallbacks) {
    internalInstance._pendingCallbacks.push(callback);
  } else {
    internalInstance._pendingCallbacks = [callback];
  }

  bYN9(internalInstance);
}

function bdqv(internalInstance, callback) {
  !(typeof callback === 'function') ? 'production' !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
  if (internalInstance._pendingCallbacks) {
    internalInstance._pendingCallbacks.push(callback);
  } else {
    internalInstance._pendingCallbacks = [callback];
  }
  bYN9(internalInstance);
}

function b9LY(publicInstance) {
  var internalInstance = bONp(publicInstance, 'forceUpdate');

  if (!internalInstance) {
    return;
  }

  internalInstance._pendingForceUpdate = true;

  bYN9(internalInstance);
}

function bELN(publicInstance, completeState) {
  var internalInstance = bONp(publicInstance, 'replaceState');

  if (!internalInstance) {
    return;
  }

  internalInstance._pendingStateQueue = [completeState];
  internalInstance._pendingReplaceState = true;

  bYN9(internalInstance);
}

function b7yX(publicInstance, partialState) {
  var internalInstance = bONp(publicInstance, 'setState');

  if (!internalInstance) {
    return;
  }

  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
  queue.push(partialState);

  bYN9(internalInstance);
}

function bLNa(publicInstance, partialProps) {
  var internalInstance = bONp(publicInstance, 'setProps');
  if (!internalInstance) {
    return;
  }
  ReactUpdateQueue.enqueueSetPropsInternal(internalInstance, partialProps);
}

function b05N(internalInstance, partialProps) {
  var topLevelWrapper = internalInstance._topLevelWrapper;
  !topLevelWrapper ? 'production' !== 'production' ? invariant(false, 'setProps(...): You called `setProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;

  var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
  var element = wrapElement.props;
  var props = assign({}, element.props, partialProps);
  topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));

  bYN9(topLevelWrapper);
}

function b1rq(publicInstance, props) {
  var internalInstance = bONp(publicInstance, 'replaceProps');
  if (!internalInstance) {
    return;
  }
  ReactUpdateQueue.enqueueReplacePropsInternal(internalInstance, props);
}

function bwMz(internalInstance, props) {
  var topLevelWrapper = internalInstance._topLevelWrapper;
  !topLevelWrapper ? 'production' !== 'production' ? invariant(false, 'replaceProps(...): You called `replaceProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;

  var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
  var element = wrapElement.props;
  topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));

  bYN9(topLevelWrapper);
}

function bkQr(internalInstance, newElement) {
  internalInstance._pendingElement = newElement;
  bYN9(internalInstance);
}

var ReactUpdateQueue = {
  isMounted: b82d,
  enqueueCallback: bNNB,
  enqueueCallbackInternal: bdqv,
  enqueueForceUpdate: b9LY,
  enqueueReplaceState: bELN,
  enqueueSetState: b7yX,
  enqueueSetProps: bLNa,
  enqueueSetPropsInternal: b05N,
  enqueueReplaceProps: b1rq,
  enqueueReplacePropsInternal: bwMz,
  enqueueElementInternal: bkQr
};
/**bandol> resource: node_modules/react/lib/ReactPropTypeLocations.js */


var ReactPropTypeLocations = keyMirror({
  prop: null,
  context: null,
  childContext: null
});
/**bandol> resource: node_modules/react/lib/ReactComponentEnvironment.js */


var beq2 = false;

function bBL1(environment) {
  !!beq2 ? 'production' !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : undefined;
  ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
  ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
  ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
  beq2 = true;
}

var ReactComponentEnvironment = {
  unmountIDFromEnvironment: null,

  replaceNodeWithMarkupByID: null,

  processChildrenUpdates: null,

  injection: {
    injectEnvironment: bBL1
  }

};
/**bandol> resource: node_modules/react/lib/ReactCompositeComponent.js */


function br9q(component) {
  var owner = component._currentElement._owner || null;
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function bQqz(Component) {}
bQqz.prototype.render = function () {
  var Component = ReactInstanceMap.get(this)._currentElement.type;
  return Component(this.props, this.context, this.updater);
};

var bPNA = 1;

function bxBG(element) {
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
}

function bX9J(rootID, transaction, context) {
  this._context = context;
  this._mountOrder = bPNA++;
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
    inst = new bQqz(Component);
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
}

function bRwa() {
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
}

function bKNK(context) {
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
}

function b40e(context) {
  var maskedContext = this._maskContext(context);

  return maskedContext;
}

function bGLz(currentContext) {
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
}

function bbqb(newProps) {
  return newProps;
}

function blqq(propTypes, props, location) {
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
        var addendum = br9q(this);

        if (location === ReactPropTypeLocations.prop) {
          'production' !== 'production' ? warning(false, 'Failed Composite propType: %s%s', error.message, addendum) : undefined;
        } else {
          'production' !== 'production' ? warning(false, 'Failed Context Types: %s%s', error.message, addendum) : undefined;
        }
      }
    }
  }
}

function bVNp(nextElement, transaction, nextContext) {
  var prevElement = this._currentElement;
  var prevContext = this._context;

  this._pendingElement = null;

  this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
}

function bgqR(transaction) {
  if (this._pendingElement != null) {
    ReactReconciler.receiveComponent(this, this._pendingElement || this._currentElement, transaction, this._context);
  }

  if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
    this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
  }
}

function bMNX(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
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
}

function b65z(props, context) {
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
}

function bZNA(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
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
}

function bA5P(transaction, context) {
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
}

function b32l(prevComponentID, nextMarkup) {
  ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
}

function bp2k() {
  var inst = this._instance;
  var renderedComponent = inst.render();


  return renderedComponent;
}

function bmqr() {
  var renderedComponent;
  ReactCurrentOwner.current = this;
  try {
    renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
  } finally {
    ReactCurrentOwner.current = null;
  }
  !(renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)) ? 'production' !== 'production' ? invariant(false, '%s.render(): A valid ReactComponent must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
  return renderedComponent;
}

function bnq1(ref, component) {
  var inst = this.getPublicInstance();
  !(inst != null) ? 'production' !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : invariant(false) : undefined;
  var publicComponentInstance = component.getPublicInstance();

  var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
  refs[ref] = publicComponentInstance;
}

function bz2K(ref) {
  var refs = this.getPublicInstance().refs;
  delete refs[ref];
}

function bv2M() {
  var type = this._currentElement.type;
  var constructor = this._instance && this._instance.constructor;
  return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
}

function baq0() {
  var inst = this._instance;
  if (inst instanceof bQqz) {
    return null;
  }
  return inst;
}

var b292 = {
  construct: bxBG,
  mountComponent: bX9J,
  unmountComponent: bRwa,
  _maskContext: bKNK,
  _processContext: b40e,
  _processChildContext: bGLz,
  _processProps: bbqb,
  _checkPropTypes: blqq,
  receiveComponent: bVNp,
  performUpdateIfNecessary: bgqR,
  updateComponent: bMNX,
  _processPendingState: b65z,
  _performComponentUpdate: bZNA,
  _updateRenderedComponent: bA5P,
  _replaceNodeWithMarkupByID: b32l,
  _renderValidatedComponentWithoutOwnerOrContext: bp2k,
  _renderValidatedComponent: bmqr,
  attachRef: bnq1,
  detachRef: bz2K,
  getName: bv2M,
  getPublicInstance: baq0,

  _instantiateReactComponent: null

};

ReactPerf.measureMethods(b292, 'ReactCompositeComponent', {
  mountComponent: 'mountComponent',
  updateComponent: 'updateComponent',
  _renderValidatedComponent: '_renderValidatedComponent'
});

var ReactCompositeComponent = {

  Mixin: b292

};
/**bandol> resource: node_modules/react/lib/instantiateReactComponent.js */

var bbqk = function () {};
assign(bbqk.prototype, ReactCompositeComponent.Mixin, {
  _instantiateReactComponent: instantiateReactComponent
});

function blqr(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function bVNQ(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

function instantiateReactComponent(node) {
  var instance;

  if (node === null || node === false) {
    instance = new ReactEmptyComponent(instantiateReactComponent);
  } else if (typeof node === 'object') {
    var element = node;
    !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? 'production' !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, blqr(element._owner)) : invariant(false) : undefined;

    if (typeof element.type === 'string') {
      instance = ReactNativeComponent.createInternalComponent(element);
    } else if (bVNQ(element.type)) {
      instance = new element.type(element);
    } else {
      instance = new bbqk();
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
/**bandol> resource: node_modules/react/lib/ReactServerRenderingTransaction.js */
function bPG8() {
  this.reactMountReady.reset();
}

var bxme = {
  initialize: bPG8,


  close: emptyFunction
};

var bX9n = [bxme];

function ReactServerRenderingTransaction(renderToStaticMarkup) {
  this.reinitializeTransaction();
  this.renderToStaticMarkup = renderToStaticMarkup;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = false;
}

function bRwy() {
  return bX9n;
}

function bKNk() {
  return this.reactMountReady;
}

function b40g() {
  CallbackQueue.release(this.reactMountReady);
  this.reactMountReady = null;
}

var bGLa = {
  getTransactionWrappers: bRwy,
  getReactMountReady: bKNk,
  destructor: b40g
};

assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, bGLa);

PooledClass.addPoolingTo(ReactServerRenderingTransaction);
/**bandol> resource: node_modules/react/lib/ReactServerBatchingStrategy.js */
function bQbQ(callback) {}

var ReactServerBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: bQbQ
};
/**bandol> resource: node_modules/react/lib/adler32.js */


var brmX = 65521;

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
    a %= brmX;
    b %= brmX;
  }
  for (; i < l; i++) {
    b += a += data.charCodeAt(i);
  }
  a %= brmX;
  b %= brmX;
  return a | b << 16;
}
/**bandol> resource: node_modules/react/lib/ReactMarkupChecksum.js */


var bJPg = /\/?>/;

function bqka(markup) {
  var checksum = adler32(markup);

  return markup.replace(bJPg, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
}

function bymX(markup, element) {
  var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
  existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
  var markupChecksum = adler32(markup);
  return markupChecksum === existingChecksum;
}

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  addChecksumToMarkup: bqka,
  canReuseMarkup: bymX
};
/**bandol> resource: node_modules/react/lib/ReactDefaultBatchingStrategy.js */
function bEv9() {
  ReactDefaultBatchingStrategy.isBatchingUpdates = false;
}

var b7vl = {
  initialize: emptyFunction,
  close: bEv9
};

var bLXl = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var b00v = [bLXl, b7vl];

function b18R() {
  this.reinitializeTransaction();
}

function bwmy() {
  return b00v;
}

assign(b18R.prototype, Transaction.Mixin, {
  getTransactionWrappers: bwmy
});

var bkmZ = new b18R();

function b5v1(callback, a, b, c, d, e) {
  var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

  ReactDefaultBatchingStrategy.isBatchingUpdates = true;

  if (alreadyBatchingUpdates) {
    callback(a, b, c, d, e);
  } else {
    bkmZ.perform(callback, null, a, b, c, d, e);
  }
}

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: b5v1
};
/**bandol> resource: node_modules/react/lib/ReactServerRendering.js */

function bdVp(element) {
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

function b906(element) {
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

var b9d = {
  renderToString: bdVp,
  renderToStaticMarkup: b906
};
/**bandol> resource: node_modules/react/lib/DOMProperty.js */


function beg4(value, bitmask) {
  return (value & bitmask) === bitmask;
}

function bBBk(domPropertyConfig) {
  var Injection = bYrZ;
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

      mustUseAttribute: beg4(propConfig, Injection.MUST_USE_ATTRIBUTE),
      mustUseProperty: beg4(propConfig, Injection.MUST_USE_PROPERTY),
      hasSideEffects: beg4(propConfig, Injection.HAS_SIDE_EFFECTS),
      hasBooleanValue: beg4(propConfig, Injection.HAS_BOOLEAN_VALUE),
      hasNumericValue: beg4(propConfig, Injection.HAS_NUMERIC_VALUE),
      hasPositiveNumericValue: beg4(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
      hasOverloadedBooleanValue: beg4(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
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

var bYrZ = {
  MUST_USE_ATTRIBUTE: 0x1,
  MUST_USE_PROPERTY: 0x2,
  HAS_SIDE_EFFECTS: 0x4,
  HAS_BOOLEAN_VALUE: 0x8,
  HAS_NUMERIC_VALUE: 0x10,
  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

  injectDOMPropertyConfig: bBBk
};
var bO4A = {};

function b8vZ(attributeName) {
  for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
    var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
    if (isCustomAttributeFn(attributeName)) {
      return true;
    }
  }
  return false;
}

function bNK5(nodeName, prop) {
  var nodeDefaults = bO4A[nodeName];
  var testElement;
  if (!nodeDefaults) {
    bO4A[nodeName] = nodeDefaults = {};
  }
  if (!(prop in nodeDefaults)) {
    testElement = document.createElement(nodeName);
    nodeDefaults[prop] = testElement[prop];
  }
  return nodeDefaults[prop];
}

var DOMProperty = {

  ID_ATTRIBUTE_NAME: 'data-reactid',

  properties: {},

  getPossibleStandardName: 'production' !== 'production' ? {} : null,

  _isCustomAttributeFunctions: [],

  isCustomAttribute: b8vZ,
  getDefaultValueForProperty: bNK5,


  injection: bYrZ
};
/**bandol> resource: node_modules/react/lib/SVGDOMPropertyConfig.js */


var baG2 = DOMProperty.injection.MUST_USE_ATTRIBUTE;

var b25g = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

var SVGDOMPropertyConfig = {
  Properties: {
    clipPath: baG2,
    cx: baG2,
    cy: baG2,
    d: baG2,
    dx: baG2,
    dy: baG2,
    fill: baG2,
    fillOpacity: baG2,
    fontFamily: baG2,
    fontSize: baG2,
    fx: baG2,
    fy: baG2,
    gradientTransform: baG2,
    gradientUnits: baG2,
    markerEnd: baG2,
    markerMid: baG2,
    markerStart: baG2,
    offset: baG2,
    opacity: baG2,
    patternContentUnits: baG2,
    patternUnits: baG2,
    points: baG2,
    preserveAspectRatio: baG2,
    r: baG2,
    rx: baG2,
    ry: baG2,
    spreadMethod: baG2,
    stopColor: baG2,
    stopOpacity: baG2,
    stroke: baG2,
    strokeDasharray: baG2,
    strokeLinecap: baG2,
    strokeOpacity: baG2,
    strokeWidth: baG2,
    textAnchor: baG2,
    transform: baG2,
    version: baG2,
    viewBox: baG2,
    x1: baG2,
    x2: baG2,
    x: baG2,
    xlinkActuate: baG2,
    xlinkArcrole: baG2,
    xlinkHref: baG2,
    xlinkRole: baG2,
    xlinkShow: baG2,
    xlinkTitle: baG2,
    xlinkType: baG2,
    xmlBase: baG2,
    xmlLang: baG2,
    xmlSpace: baG2,
    y1: baG2,
    y2: baG2,
    y: baG2
  },
  DOMAttributeNamespaces: {
    xlinkActuate: b25g.xlink,
    xlinkArcrole: b25g.xlink,
    xlinkHref: b25g.xlink,
    xlinkRole: b25g.xlink,
    xlinkShow: b25g.xlink,
    xlinkTitle: b25g.xlink,
    xlinkType: b25g.xlink,
    xmlBase: b25g.xml,
    xmlLang: b25g.xml,
    xmlSpace: b25g.xml
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
/**bandol> resource: node_modules/react/lib/getEventCharCode.js */

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
/**bandol> resource: node_modules/react/lib/getEventModifierState.js */


var bzmm = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Meta': 'metaKey',
  'Shift': 'shiftKey'
};

function bvL2(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = bzmm[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return bvL2;
}
/**bandol> resource: node_modules/react/lib/ViewportMetrics.js */
function bnel(scrollPosition) {
  ViewportMetrics.currentScrollLeft = scrollPosition.x;
  ViewportMetrics.currentScrollTop = scrollPosition.y;
}

var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: bnel
};
/**bandol> resource: node_modules/react/lib/getEventTarget.js */

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  return target.nodeType === 3 ? target.parentNode : target;
}
/**bandol> resource: node_modules/react/lib/SyntheticEvent.js */
function b6nX(event) {
  return event.timeStamp || Date.now();
}

var bZQ9 = {
  type: null,
  target: null,

  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: b6nX,

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

function bAOZ() {
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
}

function b35x() {
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
}

function bpq8() {
  this.isPersistent = emptyFunction.thatReturnsTrue;
}

function bmEG() {
  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    this[propName] = null;
  }
  this.dispatchConfig = null;
  this.dispatchMarker = null;
  this.nativeEvent = null;
}

assign(SyntheticEvent.prototype, {
  preventDefault: bAOZ,
  stopPropagation: b35x,
  persist: bpq8,

  isPersistent: emptyFunction.thatReturnsFalse,

  destructor: bmEG
});

SyntheticEvent.Interface = bZQ9;

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
/**bandol> resource: node_modules/react/lib/SyntheticUIEvent.js */
function bV6Q(event) {
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
}

function bg6r(event) {
  return event.detail || 0;
}

var bMRz = {
  view: bV6Q,
  detail: bg6r
};

function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, bMRz);
/**bandol> resource: node_modules/react/lib/SyntheticMouseEvent.js */
function bKxk(event) {
  var button = event.button;
  if ('which' in event) {
    return button;
  }

  return button === 2 ? 2 : button === 4 ? 1 : 0;
}

function b4ng(event) {
  return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
}

function bGva(event) {
  return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
}

function bbbk(event) {
  return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
}

var blmr = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState,
  button: bKxk,

  buttons: null,
  relatedTarget: b4ng,
  pageX: bGva,
  pageY: bbbk
};

function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, blmr);
/**bandol> resource: node_modules/react/lib/SyntheticWheelEvent.js */
function bxye(event) {
  return 'deltaX' in event ? event.deltaX : 'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
}

function bXAn(event) {
  return 'deltaY' in event ? event.deltaY : 'wheelDeltaY' in event ? -event.wheelDeltaY : 'wheelDelta' in event ? -event.wheelDelta : 0;
}

var bRly = {
  deltaX: bxye,
  deltaY: bXAn,

  deltaZ: null,

  deltaMode: null
};

function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, bRly);
/**bandol> resource: node_modules/react/lib/SyntheticTouchEvent.js */

var bP08 = {
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

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, bP08);
/**bandol> resource: node_modules/react/lib/SyntheticDragEvent.js */

var bQ7Q = {
  dataTransfer: null
};

function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticDragEvent, bQ7Q);
/**bandol> resource: node_modules/react/lib/getEventKey.js */

var byBX = {
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

var br6X = {
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
    var key = byBX[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode(nativeEvent);

    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    return br6X[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}
/**bandol> resource: node_modules/react/lib/SyntheticKeyboardEvent.js */
function bk4Z(event) {
  if (event.type === 'keypress') {
    return getEventCharCode(event);
  }
  return 0;
}

function b5z1(event) {
  if (event.type === 'keydown' || event.type === 'keyup') {
    return event.keyCode;
  }
  return 0;
}

function bJwg(event) {
  if (event.type === 'keypress') {
    return getEventCharCode(event);
  }
  if (event.type === 'keydown' || event.type === 'keyup') {
    return event.keyCode;
  }
  return 0;
}

var bqMa = {
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState,
  charCode: bk4Z,
  keyCode: b5z1,
  which: bJwg
};

function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, bqMa);
/**bandol> resource: node_modules/react/lib/SyntheticFocusEvent.js */

var bwey = {
  relatedTarget: null
};

function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, bwey);
/**bandol> resource: node_modules/react/lib/SyntheticClipboardEvent.js */
function b0gv(event) {
  return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
}

var b1MR = {
  clipboardData: b0gv
};

function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticClipboardEvent, b1MR);
/**bandol> resource: node_modules/fbjs/lib/ExecutionEnvironment.js */


var bLLl = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ExecutionEnvironment = {

  canUseDOM: bLLl,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: bLLl && !!(window.addEventListener || window.attachEvent),

  canUseViewport: bLLl && !!window.screen,

  isInWorker: !bLLl };
/**bandol> resource: node_modules/react/lib/setInnerHTML.js */


var b9z6 = /^[ \r\n\t\f]/;
var bEm9 = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

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
  var b7zl = document.createElement('div');
  b7zl.innerHTML = ' ';
  if (b7zl.innerHTML === '') {
    setInnerHTML = function (node, html) {
      if (node.parentNode) {
        node.parentNode.replaceChild(node, node);
      }

      if (b9z6.test(html) || html[0] === '<' && bEm9.test(html)) {
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
/**bandol> resource: node_modules/fbjs/lib/isNode.js */


function isNode(object) {
  return !!(object && (typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}
/**bandol> resource: node_modules/fbjs/lib/isTextNode.js */

function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}
/**bandol> resource: node_modules/fbjs/lib/containsNode.js */

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
/**bandol> resource: node_modules/react/lib/ReactDOMFeatureFlags.js */


var ReactDOMFeatureFlags = {
  useCreateElement: false
};
/**bandol> resource: node_modules/react/lib/isEventSupported.js */


var bdrp;
if (ExecutionEnvironment.canUseDOM) {
  bdrp = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true;
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

  if (!isSupported && bdrp && eventNameSuffix === 'wheel') {
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}
/**bandol> resource: node_modules/react/lib/forEachAccumulated.js */

var forEachAccumulated = function (arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
};
/**bandol> resource: node_modules/react/lib/accumulateInto.js */


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
/**bandol> resource: node_modules/react/lib/ReactErrorUtils.js */


var bOmA = null;

function b80Z(name, func, a, b) {
  try {
    return func(a, b);
  } catch (x) {
    if (bOmA === null) {
      bOmA = x;
    }
    return undefined;
  }
}

function bNm5() {
  if (bOmA) {
    var error = bOmA;
    bOmA = null;
    throw error;
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: b80Z,

  invokeGuardedCallbackWithCatch: b80Z,

  rethrowCaughtError: bNm5
};
/**bandol> resource: node_modules/react/lib/EventConstants.js */


var bBNk = keyMirror({ bubbled: null, captured: null });

var bYRZ = keyMirror({
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
  topLevelTypes: bYRZ,
  PropagationPhases: bBNk
};
/**bandol> resource: node_modules/react/lib/EventPluginUtils.js */
function bgxr(InjectedMount) {
  bMLz.Mount = InjectedMount;
}

var bMLz = {
  Mount: null,
  injectMount: bgxr
};

var b6yX = EventConstants.topLevelTypes;

function bZK9(topLevelType) {
  return topLevelType === b6yX.topMouseUp || topLevelType === b6yX.topTouchEnd || topLevelType === b6yX.topTouchCancel;
}

function bAkZ(topLevelType) {
  return topLevelType === b6yX.topMouseMove || topLevelType === b6yX.topTouchMove;
}
function b3Zx(topLevelType) {
  return topLevelType === b6yX.topMouseDown || topLevelType === b6yX.topTouchStart;
}

function bpg8(event, simulated, listener, domID) {
  var type = event.type || 'unknown-event';
  event.currentTarget = bMLz.Mount.getNode(domID);
  if (simulated) {
    ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event, domID);
  } else {
    ReactErrorUtils.invokeGuardedCallback(type, listener, event, domID);
  }
  event.currentTarget = null;
}

function bmbG(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;

  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }

      bpg8(event, simulated, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    bpg8(event, simulated, dispatchListeners, dispatchIDs);
  }
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

function bnll(event) {
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

function bzdm(event) {
  var ret = bnll(event);
  event._dispatchIDs = null;
  event._dispatchListeners = null;
  return ret;
}

function bvq2(event) {
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  !!Array.isArray(dispatchListener) ? 'production' !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : invariant(false) : undefined;
  var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

function baM2(event) {
  return !!event._dispatchListeners;
}

function b2yg(id) {
  return bMLz.Mount.getNode(id);
}

function beQ4(node) {
  return bMLz.Mount.getID(node);
}

var EventPluginUtils = {
  isEndish: bZK9,
  isMoveish: bAkZ,
  isStartish: b3Zx,

  executeDirectDispatch: bvq2,
  executeDispatchesInOrder: bmbG,
  executeDispatchesInOrderStopAtTrue: bzdm,
  hasDispatches: baM2,

  getNode: b2yg,
  getID: beQ4,


  injection: bMLz
};
/**bandol> resource: node_modules/react/lib/EventPluginRegistry.js */

var bxAe = null;

var bXyn = {};

function bR8y() {
  if (!bxAe) {
    return;
  }
  for (var pluginName in bXyn) {
    var PluginModule = bXyn[pluginName];
    var pluginIndex = bxAe.indexOf(pluginName);
    !(pluginIndex > -1) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(false) : undefined;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !PluginModule.extractEvents ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(false) : undefined;
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !bKmk(publishedEvents[eventName], PluginModule, eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(false) : undefined;
    }
  }
}

function bKmk(dispatchConfig, PluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(false) : undefined;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        b4zg(phasedRegistrationName, PluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    b4zg(dispatchConfig.registrationName, PluginModule, eventName);
    return true;
  }
  return false;
}

function b4zg(registrationName, PluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? 'production' !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName) : invariant(false) : undefined;
  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
}

function bGza(InjectedEventPluginOrder) {
  !!bxAe ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(false) : undefined;

  bxAe = Array.prototype.slice.call(InjectedEventPluginOrder);
  bR8y();
}

function bb6k(injectedNamesToPlugins) {
  var isOrderingDirty = false;
  for (var pluginName in injectedNamesToPlugins) {
    if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
      continue;
    }
    var PluginModule = injectedNamesToPlugins[pluginName];
    if (!bXyn.hasOwnProperty(pluginName) || bXyn[pluginName] !== PluginModule) {
      !!bXyn[pluginName] ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(false) : undefined;
      bXyn[pluginName] = PluginModule;
      isOrderingDirty = true;
    }
  }
  if (isOrderingDirty) {
    bR8y();
  }
}

function blGr(event) {
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
}

function bVPQ() {
  bxAe = null;
  for (var pluginName in bXyn) {
    if (bXyn.hasOwnProperty(pluginName)) {
      delete bXyn[pluginName];
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

var EventPluginRegistry = {
  plugins: [],

  eventNameDispatchConfigs: {},

  registrationNameModules: {},

  registrationNameDependencies: {},

  injectEventPluginOrder: bGza,
  injectEventPluginsByName: bb6k,
  getPluginModuleForEvent: blGr,
  _resetEventPlugins: bVPQ
};
/**bandol> resource: node_modules/react/lib/EventPluginHub.js */

var bqg7 = {};

var byNg = null;

var bry1 = function (event, simulated) {
  if (event) {
    EventPluginUtils.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var bQO9 = function (e) {
  return bry1(e, true);
};
var bPwR = function (e) {
  return bry1(e, false);
};

var bxA0 = null;

function bXPN(id, registrationName, listener) {
  !(typeof listener === 'function') ? 'production' !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : invariant(false) : undefined;

  var bankForRegistrationName = bqg7[registrationName] || (bqg7[registrationName] = {});
  bankForRegistrationName[id] = listener;

  var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
  if (PluginModule && PluginModule.didPutListener) {
    PluginModule.didPutListener(id, registrationName, listener);
  }
}

function bROR(id, registrationName) {
  var bankForRegistrationName = bqg7[registrationName];
  return bankForRegistrationName && bankForRegistrationName[id];
}

function bKO1(id, registrationName) {
  var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
  if (PluginModule && PluginModule.willDeleteListener) {
    PluginModule.willDeleteListener(id, registrationName);
  }

  var bankForRegistrationName = bqg7[registrationName];

  if (bankForRegistrationName) {
    delete bankForRegistrationName[id];
  }
}

function b4eN(id) {
  for (var registrationName in bqg7) {
    if (!bqg7[registrationName][id]) {
      continue;
    }

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(id, registrationName);
    }

    delete bqg7[registrationName][id];
  }
}

function bGOl(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
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
}

function bbg0(events) {
  if (events) {
    byNg = accumulateInto(byNg, events);
  }
}

function bl4p(simulated) {
  var processingEventQueue = byNg;
  byNg = null;
  if (simulated) {
    forEachAccumulated(processingEventQueue, bQO9);
  } else {
    forEachAccumulated(processingEventQueue, bPwR);
  }
  !!byNg ? 'production' !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(false) : undefined;

  ReactErrorUtils.rethrowCaughtError();
}

function bVyG() {
  bqg7 = {};
}

function bryX() {
  return bqg7;
}

function bQOQ(InjectedInstanceHandle) {
  bxA0 = InjectedInstanceHandle;
}

function bPw8() {
  return bxA0;
}

var EventPluginHub = {
  injection: {
    injectMount: EventPluginUtils.injection.injectMount,

    injectInstanceHandle: bQOQ,
    getInstanceHandle: bPw8,

    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

  registrationNameModules: EventPluginRegistry.registrationNameModules,

  putListener: bXPN,
  getListener: bROR,
  deleteListener: bKO1,
  deleteAllListeners: b4eN,
  extractEvents: bGOl,
  enqueueEvents: bbg0,
  processEventQueue: bl4p,
  __purge: bVyG,
  __getListenerBank: bryX
};
/**bandol> resource: node_modules/react/lib/ReactEventEmitterMixin.js */


function b59k(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue(false);
}

function bJOd(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
  b59k(events);
}

var ReactEventEmitterMixin = {
  handleTopLevel: bJOd
};
/**bandol> resource: node_modules/react/lib/ReactBrowserEventEmitter.js */


var bYxl = {};
var bOqw = false;
var b8rG = 0;

var bNOb = {
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

var bd66 = '_reactListenersID' + String(Math.random()).slice(2);

function b9Qz(mountAt) {
  if (!Object.prototype.hasOwnProperty.call(mountAt, bd66)) {
    mountAt[bd66] = b8rG++;
    bYxl[mountAt[bd66]] = {};
  }
  return bYxl[mountAt[bd66]];
}

function bEMv(enabled) {
  if (ReactBrowserEventEmitter.ReactEventListener) {
    ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
  }
}

function b75y() {
  return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
}

function bLOG(registrationName, contentDocumentHandle) {
  var mountAt = contentDocumentHandle;
  var isListening = b9Qz(mountAt);
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
      } else if (bNOb.hasOwnProperty(dependency)) {
        ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, bNOb[dependency], mountAt);
      }

      isListening[dependency] = true;
    }
  }
}

function b0ey(topLevelType, handlerBaseName, handle) {
  return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
}

function b1ep(topLevelType, handlerBaseName, handle) {
  return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
}

function bwAO() {
  if (!bOqw) {
    var refresh = ViewportMetrics.refreshScrollValues;
    ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
    bOqw = true;
  }
}

function bkKd(ReactEventListener) {
  ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
  ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
}

var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
  ReactEventListener: null,

  injection: {
    injectReactEventListener: bkKd
  },

  setEnabled: bEMv,
  isEnabled: b75y,
  listenTo: bLOG,
  trapBubbledEvent: b0ey,
  trapCapturedEvent: b1ep,
  ensureScrollValueMonitoring: bwAO,


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
/**bandol> resource: node_modules/react/lib/ReactMount.js */


var b8nG = DOMProperty.ID_ATTRIBUTE_NAME;
var bNbb = {};

var bdE6 = 1;
var b93z = 9;
var bErv = 11;

var b7dy = '__ReactMount_ownerDocument$' + Math.random().toString(36).slice(2);

var bL4G = {};

var b09y = {};

var b1Zp = [];

function bwpO(string1, string2) {
  var minLen = Math.min(string1.length, string2.length);
  for (var i = 0; i < minLen; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      return i;
    }
  }
  return string1.length === string2.length ? -1 : minLen;
}

function bkad(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === b93z) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function b53k(container) {
  var rootElement = bkad(container);
  return rootElement && ReactMount.getID(rootElement);
}

function bJRd(node) {
  var id = bqp7(node);
  if (id) {
    if (bNbb.hasOwnProperty(id)) {
      var cached = bNbb[id];
      if (cached !== node) {
        !!bPVR(cached, id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', b8nG, id) : invariant(false) : undefined;

        bNbb[id] = node;
      }
    } else {
      bNbb[id] = node;
    }
  }

  return id;
}

function bqp7(node) {
  return node && node.getAttribute && node.getAttribute(b8nG) || '';
}

function bypg(node, id) {
  var oldID = bqp7(node);
  if (oldID !== id) {
    delete bNbb[oldID];
  }
  node.setAttribute(b8nG, id);
  bNbb[id] = node;
}

function brB1(id) {
  if (!bNbb.hasOwnProperty(id) || !bPVR(bNbb[id], id)) {
    bNbb[id] = ReactMount.findReactNodeByID(id);
  }
  return bNbb[id];
}

function bQg9(instance) {
  var id = ReactInstanceMap.get(instance)._rootNodeID;
  if (ReactEmptyComponentRegistry.isNullComponentID(id)) {
    return null;
  }
  if (!bNbb.hasOwnProperty(id) || !bPVR(bNbb[id], id)) {
    bNbb[id] = ReactMount.findReactNodeByID(id);
  }
  return bNbb[id];
}

function bPVR(node, id) {
  if (node) {
    !(bqp7(node) === id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Unexpected modification of `%s`', b8nG) : invariant(false) : undefined;

    var container = ReactMount.findReactContainerForID(id);
    if (container && containsNode(container, node)) {
      return true;
    }
  }

  return false;
}

function bxp0(id) {
  delete bNbb[id];
}

var bXRN = null;
function bRMR(ancestorID) {
  var ancestor = bNbb[ancestorID];
  if (ancestor && bPVR(ancestor, ancestorID)) {
    bXRN = ancestor;
  } else {
    return false;
  }
}

function bKK1(targetID) {
  bXRN = null;
  ReactInstanceHandles.traverseAncestors(targetID, bRMR);

  var foundNode = bXRN;
  bXRN = null;
  return foundNode;
}

function b4ZN(componentInstance, rootID, container, transaction, shouldReuseMarkup, context) {
  if (ReactDOMFeatureFlags.useCreateElement) {
    context = assign({}, context);
    if (container.nodeType === b93z) {
      context[b7dy] = container;
    } else {
      context[b7dy] = container.ownerDocument;
    }
  }

  var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
  componentInstance._renderedComponent._topLevelWrapper = componentInstance;
  ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup, transaction);
}

function bGPl(componentInstance, rootID, container, shouldReuseMarkup, context) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(shouldReuseMarkup);
  transaction.perform(b4ZN, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}

function bbN0(instance, container) {
  ReactReconciler.unmountComponent(instance);

  if (container.nodeType === b93z) {
    container = container.documentElement;
  }

  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

function blap(node) {
  var reactRootID = b53k(node);
  return reactRootID ? reactRootID !== ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID) : false;
}

function bVxG(node) {
  for (; node && node.parentNode !== node; node = node.parentNode) {
    if (node.nodeType !== 1) {
      continue;
    }
    var nodeID = bqp7(node);
    if (!nodeID) {
      continue;
    }
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);

    var current = node;
    var lastID;
    do {
      lastID = bqp7(current);
      current = current.parentNode;
      if (current == null) {
        return null;
      }
    } while (lastID !== reactRootID);

    if (current === b09y[reactRootID]) {
      return node;
    }
  }
  return null;
}

var bgJE = function () {};
bgJE.prototype.isReactComponent = {};

bgJE.prototype.render = function () {
  return this.props;
};

function bMGw(container, renderCallback) {
  renderCallback();
}

function b6px(prevComponent, nextElement, container, callback) {
  ReactMount.scrollMonitor(container, function () {
    ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
    if (callback) {
      ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
    }
  });

  return prevComponent;
}

function bZ4G(nextComponent, container) {
  !(container && (container.nodeType === bdE6 || container.nodeType === b93z || container.nodeType === bErv)) ? 'production' !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : invariant(false) : undefined;

  ReactBrowserEventEmitter.ensureScrollValueMonitoring();

  var reactRootID = ReactMount.registerContainer(container);
  bL4G[reactRootID] = nextComponent;
  return reactRootID;
}

function bAbK(nextElement, container, shouldReuseMarkup, context) {
  'production' !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

  var componentInstance = instantiateReactComponent(nextElement, null);
  var reactRootID = ReactMount._registerComponent(componentInstance, container);

  ReactUpdates.batchedUpdates(bGPl, componentInstance, reactRootID, container, shouldReuseMarkup, context);

  return componentInstance;
}

function b39Y(parentComponent, nextElement, container, callback) {
  !(parentComponent != null && parentComponent._reactInternalInstance != null) ? 'production' !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : invariant(false) : undefined;
  return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
}

function bpVa(parentComponent, nextElement, container, callback) {
  !ReactElement.isValidElement(nextElement) ? 'production' !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : invariant(false) : undefined;

  'production' !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : undefined;

  var nextWrappedElement = new ReactElement(bgJE, null, null, null, null, null, nextElement);

  var prevComponent = bL4G[b53k(container)];

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

  var reactRootElement = bkad(container);
  var containerHasReactMarkup = reactRootElement && !!bqp7(reactRootElement);
  var containerHasNonRootReactChild = blap(container);

  var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
  var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, parentComponent != null ? parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context) : emptyObject)._renderedComponent.getPublicInstance();
  if (callback) {
    callback.call(component);
  }
  return component;
}

function bmGP(nextElement, container, callback) {
  return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
}

function bnbB(container) {
  var reactRootID = b53k(container);
  if (reactRootID) {
    reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
  }
  if (!reactRootID) {
    reactRootID = ReactInstanceHandles.createReactRootID();
  }
  b09y[reactRootID] = container;
  return reactRootID;
}

function bzLY(container) {
  'production' !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

  !(container && (container.nodeType === bdE6 || container.nodeType === b93z || container.nodeType === bErv)) ? 'production' !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : invariant(false) : undefined;

  var reactRootID = b53k(container);
  var component = bL4G[reactRootID];
  if (!component) {
    var containerHasNonRootReactChild = blap(container);

    var containerID = bqp7(container);
    var isContainerReactRoot = containerID && containerID === ReactInstanceHandles.getReactRootIDFromNodeID(containerID);

    return false;
  }
  ReactUpdates.batchedUpdates(bbN0, component, container);
  delete bL4G[reactRootID];
  delete b09y[reactRootID];

  return true;
}

function bvAX(id) {
  var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
  var container = b09y[reactRootID];

  return container;
}

function baVg(id) {
  var reactRoot = ReactMount.findReactContainerForID(id);
  return ReactMount.findComponentRoot(reactRoot, id);
}

function b2wx(node) {
  return bVxG(node);
}

function bere(ancestorNode, targetID) {
  var firstChildren = b1Zp;
  var childIndex = 0;

  var deepestAncestor = bKK1(targetID) || ancestorNode;

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
}

function bBlK(markup, container, shouldReuseMarkup, transaction) {
  !(container && (container.nodeType === bdE6 || container.nodeType === b93z || container.nodeType === bErv)) ? 'production' !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : invariant(false) : undefined;

  if (shouldReuseMarkup) {
    var rootElement = bkad(container);
    if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
      return;
    } else {
      var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
      rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

      var rootMarkup = rootElement.outerHTML;
      rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);

      var normalizedMarkup = markup;


      var diffIndex = bwpO(normalizedMarkup, rootMarkup);
      var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

      !(container.nodeType !== b93z) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;
    }
  }

  !(container.nodeType !== b93z) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;

  if (transaction.useCreateElement) {
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
    container.appendChild(markup);
  } else {
    setInnerHTML(container, markup);
  }
}

var ReactMount = {

  TopLevelWrapper: bgJE,

  _instancesByReactRootID: bL4G,

  scrollMonitor: bMGw,
  _updateRootComponent: b6px,
  _registerComponent: bZ4G,
  _renderNewRootComponent: bAbK,
  renderSubtreeIntoContainer: b39Y,
  _renderSubtreeIntoContainer: bpVa,
  render: bmGP,
  registerContainer: bnbB,
  unmountComponentAtNode: bzLY,
  findReactContainerForID: bvAX,
  findReactNodeByID: baVg,
  getFirstReactDOM: b2wx,
  findComponentRoot: bere,
  _mountImageIntoNode: bBlK,


  ownerDocumentContextKey: b7dy,

  getReactRootID: b53k,

  getID: bJRd,

  setID: bypg,

  getNode: brB1,

  getNodeFromInstance: bQg9,

  isValid: bPVR,

  purgeID: bxp0
};

ReactPerf.measureMethods(ReactMount, 'ReactMount', {
  _renderNewRootComponent: '_renderNewRootComponent',
  _mountImageIntoNode: '_mountImageIntoNode'
});
/**bandol> resource: node_modules/react/lib/EventPropagators.js */


var b3dY = EventConstants.PropagationPhases;
var bp8a = EventPluginHub.getListener;

function bmaP(id, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return bp8a(id, registrationName);
}

function bn2B(domID, upwards, event) {
  var phase = upwards ? b3dY.bubbled : b3dY.captured;
  var listener = bmaP(domID, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
  }
}

function bzpY(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, bn2B, event);
  }
}

function bvpX(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker, bn2B, event);
  }
}

function baag(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = bp8a(id, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
    }
  }
}

function b2dx(event) {
  if (event && event.dispatchConfig.registrationName) {
    baag(event.dispatchMarker, null, event);
  }
}

function beke(events) {
  forEachAccumulated(events, bzpY);
}

function bBmK(events) {
  forEachAccumulated(events, bvpX);
}

function bYyl(leave, enter, fromID, toID) {
  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, baag, leave, enter);
}

function bOlw(events) {
  forEachAccumulated(events, b2dx);
}

var EventPropagators = {
  accumulateTwoPhaseDispatches: beke,
  accumulateTwoPhaseDispatchesSkipTarget: bBmK,
  accumulateDirectDispatches: bOlw,
  accumulateEnterLeaveDispatches: bYyl
};
/**bandol> resource: node_modules/fbjs/lib/EventListener.js */
function bVwG() {
  target.removeEventListener(eventType, callback, false);
}

function bgmE() {
  target.detachEvent('on' + eventType, callback);
}

function bMaw(target, eventType, callback) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, false);
    return {
      remove: bVwG
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, callback);
    return {
      remove: bgmE
    };
  }
}

function b6Kx() {
  target.removeEventListener(eventType, callback, true);
}

function bZ7G(target, eventType, callback) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, true);
    return {
      remove: b6Kx
    };
  } else {
    return {
      remove: emptyFunction
    };
  }
}

function bA3K() {}

var EventListener = {
  listen: bMaw,
  capture: bZ7G,
  registerDefault: bA3K
};
/**bandol> resource: node_modules/react/lib/SimpleEventPlugin.js */


var bPLR = EventConstants.topLevelTypes;

var bx40 = {
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

var bXmN = {
  topAbort: bx40.abort,
  topBlur: bx40.blur,
  topCanPlay: bx40.canPlay,
  topCanPlayThrough: bx40.canPlayThrough,
  topClick: bx40.click,
  topContextMenu: bx40.contextMenu,
  topCopy: bx40.copy,
  topCut: bx40.cut,
  topDoubleClick: bx40.doubleClick,
  topDrag: bx40.drag,
  topDragEnd: bx40.dragEnd,
  topDragEnter: bx40.dragEnter,
  topDragExit: bx40.dragExit,
  topDragLeave: bx40.dragLeave,
  topDragOver: bx40.dragOver,
  topDragStart: bx40.dragStart,
  topDrop: bx40.drop,
  topDurationChange: bx40.durationChange,
  topEmptied: bx40.emptied,
  topEncrypted: bx40.encrypted,
  topEnded: bx40.ended,
  topError: bx40.error,
  topFocus: bx40.focus,
  topInput: bx40.input,
  topKeyDown: bx40.keyDown,
  topKeyPress: bx40.keyPress,
  topKeyUp: bx40.keyUp,
  topLoad: bx40.load,
  topLoadedData: bx40.loadedData,
  topLoadedMetadata: bx40.loadedMetadata,
  topLoadStart: bx40.loadStart,
  topMouseDown: bx40.mouseDown,
  topMouseMove: bx40.mouseMove,
  topMouseOut: bx40.mouseOut,
  topMouseOver: bx40.mouseOver,
  topMouseUp: bx40.mouseUp,
  topPaste: bx40.paste,
  topPause: bx40.pause,
  topPlay: bx40.play,
  topPlaying: bx40.playing,
  topProgress: bx40.progress,
  topRateChange: bx40.rateChange,
  topReset: bx40.reset,
  topScroll: bx40.scroll,
  topSeeked: bx40.seeked,
  topSeeking: bx40.seeking,
  topStalled: bx40.stalled,
  topSubmit: bx40.submit,
  topSuspend: bx40.suspend,
  topTimeUpdate: bx40.timeUpdate,
  topTouchCancel: bx40.touchCancel,
  topTouchEnd: bx40.touchEnd,
  topTouchMove: bx40.touchMove,
  topTouchStart: bx40.touchStart,
  topVolumeChange: bx40.volumeChange,
  topWaiting: bx40.waiting,
  topWheel: bx40.wheel
};

for (var bRaR in bXmN) {
  bXmN[bRaR].dependencies = [bRaR];
}

var bKw1 = keyOf({ onClick: null });
var b4XN = {};

function bG0l(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var dispatchConfig = bXmN[topLevelType];
  if (!dispatchConfig) {
    return null;
  }
  var EventConstructor;
  switch (topLevelType) {
    case bPLR.topAbort:
    case bPLR.topCanPlay:
    case bPLR.topCanPlayThrough:
    case bPLR.topDurationChange:
    case bPLR.topEmptied:
    case bPLR.topEncrypted:
    case bPLR.topEnded:
    case bPLR.topError:
    case bPLR.topInput:
    case bPLR.topLoad:
    case bPLR.topLoadedData:
    case bPLR.topLoadedMetadata:
    case bPLR.topLoadStart:
    case bPLR.topPause:
    case bPLR.topPlay:
    case bPLR.topPlaying:
    case bPLR.topProgress:
    case bPLR.topRateChange:
    case bPLR.topReset:
    case bPLR.topSeeked:
    case bPLR.topSeeking:
    case bPLR.topStalled:
    case bPLR.topSubmit:
    case bPLR.topSuspend:
    case bPLR.topTimeUpdate:
    case bPLR.topVolumeChange:
    case bPLR.topWaiting:
      EventConstructor = SyntheticEvent;
      break;
    case bPLR.topKeyPress:
      if (getEventCharCode(nativeEvent) === 0) {
        return null;
      }

    case bPLR.topKeyDown:
    case bPLR.topKeyUp:
      EventConstructor = SyntheticKeyboardEvent;
      break;
    case bPLR.topBlur:
    case bPLR.topFocus:
      EventConstructor = SyntheticFocusEvent;
      break;
    case bPLR.topClick:
      if (nativeEvent.button === 2) {
        return null;
      }

    case bPLR.topContextMenu:
    case bPLR.topDoubleClick:
    case bPLR.topMouseDown:
    case bPLR.topMouseMove:
    case bPLR.topMouseOut:
    case bPLR.topMouseOver:
    case bPLR.topMouseUp:
      EventConstructor = SyntheticMouseEvent;
      break;
    case bPLR.topDrag:
    case bPLR.topDragEnd:
    case bPLR.topDragEnter:
    case bPLR.topDragExit:
    case bPLR.topDragLeave:
    case bPLR.topDragOver:
    case bPLR.topDragStart:
    case bPLR.topDrop:
      EventConstructor = SyntheticDragEvent;
      break;
    case bPLR.topTouchCancel:
    case bPLR.topTouchEnd:
    case bPLR.topTouchMove:
    case bPLR.topTouchStart:
      EventConstructor = SyntheticTouchEvent;
      break;
    case bPLR.topScroll:
      EventConstructor = SyntheticUIEvent;
      break;
    case bPLR.topWheel:
      EventConstructor = SyntheticWheelEvent;
      break;
    case bPLR.topCopy:
    case bPLR.topCut:
    case bPLR.topPaste:
      EventConstructor = SyntheticClipboardEvent;
      break;
  }
  !EventConstructor ? 'production' !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(false) : undefined;
  var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent, nativeEventTarget);
  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

function bbm0(id, registrationName, listener) {
  if (registrationName === bKw1) {
    var node = ReactMount.getNode(id);
    if (!b4XN[id]) {
      b4XN[id] = EventListener.listen(node, 'click', emptyFunction);
    }
  }
}

function blLp(id, registrationName) {
  if (registrationName === bKw1) {
    b4XN[id].remove();
    delete b4XN[id];
  }
}

var SimpleEventPlugin = {

  eventTypes: bx40,

  extractEvents: bG0l,
  didPutListener: bbm0,
  willDeleteListener: blLp
};
/**bandol> resource: node_modules/react/lib/ServerReactRootIndex.js */

var brQ1 = Math.pow(2, 53);

function bQw9() {
  return Math.ceil(Math.random() * brQ1);
}

var ServerReactRootIndex = {
  createReactRootIndex: bQw9
};
/**bandol> resource: node_modules/fbjs/lib/shallowEqual.js */


var bVwX = Object.prototype.hasOwnProperty;

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

  var bHasOwnProperty = bVwX.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}
/**bandol> resource: node_modules/react/lib/isTextInputElement.js */

var blL7 = {
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
  return nodeName && (nodeName === 'input' && blL7[elem.type] || nodeName === 'textarea');
}
/**bandol> resource: node_modules/fbjs/lib/getActiveElement.js */


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
/**bandol> resource: node_modules/fbjs/lib/focusNode.js */

function focusNode(node) {
  try {
    node.focus();
  } catch (e) {}
}
/**bandol> resource: node_modules/react/lib/getTextContentAccessor.js */


var bbm4 = null;

function getTextContentAccessor() {
  if (!bbm4 && ExecutionEnvironment.canUseDOM) {
    bbm4 = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return bbm4;
}
/**bandol> resource: node_modules/react/lib/getNodeForCharacterOffset.js */

function b4Xq(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

function bG0G(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

function getNodeForCharacterOffset(root, offset) {
  var node = b4Xq(root);
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

    node = b4Xq(bG0G(node));
  }
}
/**bandol> resource: node_modules/react/lib/ReactDOMSelection.js */

function bQwb(anchorNode, anchorOffset, focusNode, focusOffset) {
  return anchorNode === focusNode && anchorOffset === focusOffset;
}

function bPLN(node) {
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

function bx46(node) {
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

  var isSelectionCollapsed = bQwb(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);

  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var isTempRangeCollapsed = bQwb(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

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

function bXmk(node, offsets) {
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

function bRab(node, offsets) {
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

var bKwY = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);

var ReactDOMSelection = {
  getOffsets: bKwY ? bPLN : bx46,

  setOffsets: bKwY ? bXmk : bRab
};
/**bandol> resource: node_modules/react/lib/ReactInputSelection.js */


function bkJL(node) {
  return containsNode(document.documentElement, node);
}

function b5RB(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
}

function bJqq() {
  var focusedElem = getActiveElement();
  return {
    focusedElem: focusedElem,
    selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
  };
}

function bqrp(priorSelectionInformation) {
  var curFocusedElem = getActiveElement();
  var priorFocusedElem = priorSelectionInformation.focusedElem;
  var priorSelectionRange = priorSelectionInformation.selectionRange;
  if (curFocusedElem !== priorFocusedElem && bkJL(priorFocusedElem)) {
    if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
      ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
    }
    focusNode(priorFocusedElem);
  }
}

function byGN(input) {
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
}

function brQ6(input, offsets) {
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

var ReactInputSelection = {
  hasSelectionCapabilities: b5RB,
  getSelectionInformation: bJqq,
  restoreSelection: bqrp,
  getSelection: byGN,
  setSelection: brQ6
};
/**bandol> resource: node_modules/react/lib/SelectEventPlugin.js */


var bBOZ = EventConstants.topLevelTypes;

var bYJK = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var bOax = {
  select: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSelect: null }),
      captured: keyOf({ onSelectCapture: null })
    },
    dependencies: [bBOZ.topBlur, bBOZ.topContextMenu, bBOZ.topFocus, bBOZ.topKeyDown, bBOZ.topMouseDown, bBOZ.topMouseUp, bBOZ.topSelectionChange]
  }
};

var b8GA = null;
var bNqM = null;
var bdAz = null;
var b9ba = false;

var bE0n = false;
var b74Q = keyOf({ onSelect: null });

function bLyV(node) {
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

function b0rQ(nativeEvent, nativeEventTarget) {
  if (b9ba || b8GA == null || b8GA !== getActiveElement()) {
    return null;
  }

  var currentSelection = bLyV(b8GA);
  if (!bdAz || !shallowEqual(bdAz, currentSelection)) {
    bdAz = currentSelection;

    var syntheticEvent = SyntheticEvent.getPooled(bOax.select, bNqM, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = b8GA;

    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

function b1Q3(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  if (!bE0n) {
    return null;
  }

  switch (topLevelType) {
    case bBOZ.topFocus:
      if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
        b8GA = topLevelTarget;
        bNqM = topLevelTargetID;
        bdAz = null;
      }
      break;
    case bBOZ.topBlur:
      b8GA = null;
      bNqM = null;
      bdAz = null;
      break;

    case bBOZ.topMouseDown:
      b9ba = true;
      break;
    case bBOZ.topContextMenu:
    case bBOZ.topMouseUp:
      b9ba = false;
      return b0rQ(nativeEvent, nativeEventTarget);

    case bBOZ.topSelectionChange:
      if (bYJK) {
        break;
      }

    case bBOZ.topKeyDown:
    case bBOZ.topKeyUp:
      return b0rQ(nativeEvent, nativeEventTarget);
  }

  return null;
}

function bwKE(id, registrationName, listener) {
  if (registrationName === b74Q) {
    bE0n = true;
  }
}

var SelectEventPlugin = {

  eventTypes: bOax,

  extractEvents: b1Q3,
  didPutListener: bwKE
};
/**bandol> resource: node_modules/react/lib/ReactReconcileTransaction.js */

var b6Yb = {
  initialize: ReactInputSelection.getSelectionInformation,

  close: ReactInputSelection.restoreSelection
};

function bZJ2() {
  var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
  ReactBrowserEventEmitter.setEnabled(false);
  return currentlyEnabled;
}

function bAZ4(previouslyEnabled) {
  ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
}

var b304 = {
  initialize: bZJ2,
  close: bAZ4
};

function bpGA() {
  this.reactMountReady.reset();
}

function bmR3() {
  this.reactMountReady.notifyAll();
}

var bnKM = {
  initialize: bpGA,
  close: bmR3
};

var bzZa = [b6Yb, b304, bnKM];

function ReactReconcileTransaction(forceHTML) {
  this.reinitializeTransaction();

  this.renderToStaticMarkup = false;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = !forceHTML && ReactDOMFeatureFlags.useCreateElement;
}

function bvZO() {
  return bzZa;
}

function ba1m() {
  return this.reactMountReady;
}

function b2Bn() {
  CallbackQueue.release(this.reactMountReady);
  this.reactMountReady = null;
}

var beLz = {
  getTransactionWrappers: bvZO,
  getReactMountReady: ba1m,
  destructor: b2Bn
};

assign(ReactReconcileTransaction.prototype, Transaction.Mixin, beLz);

PooledClass.addPoolingTo(ReactReconcileTransaction);
/**bandol> resource: node_modules/react/lib/ReactInjection.js */


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
/**bandol> resource: node_modules/fbjs/lib/getUnboundedScrollPosition.js */

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
/**bandol> resource: node_modules/react/lib/ReactEventListener.js */


var by3N = 11;

function brl6(node) {
  var nodeID = ReactMount.getID(node);
  var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
  var container = ReactMount.findReactContainerForID(rootID);
  var parent = ReactMount.getFirstReactDOM(container);
  return parent;
}

function bQJb(topLevelType, nativeEvent) {
  this.topLevelType = topLevelType;
  this.nativeEvent = nativeEvent;
  this.ancestors = [];
}

function bPJN() {
  this.topLevelType = null;
  this.nativeEvent = null;
  this.ancestors.length = 0;
}

assign(bQJb.prototype, {
  destructor: bPJN
});
PooledClass.addPoolingTo(bQJb, PooledClass.twoArgumentPooler);

function bx96(bookKeeping) {

  void bRJb;
  bXJk(bookKeeping);
}

function bXJk(bookKeeping) {
  var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;

  var ancestor = topLevelTarget;
  while (ancestor) {
    bookKeeping.ancestors.push(ancestor);
    ancestor = brl6(ancestor);
  }

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    topLevelTarget = bookKeeping.ancestors[i];
    var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

function bRJb(bookKeeping) {
  var path = bookKeeping.nativeEvent.path;
  var currentNativeTarget = path[0];
  var eventsFired = 0;
  for (var i = 0; i < path.length; i++) {
    var currentPathElement = path[i];
    if (currentPathElement.nodeType === by3N) {
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

function bKAY(cb) {
  var scrollPosition = getUnboundedScrollPosition(window);
  cb(scrollPosition);
}

function b49q(handleTopLevel) {
  ReactEventListener._handleTopLevel = handleTopLevel;
}

function bG3G(enabled) {
  ReactEventListener._enabled = !!enabled;
}

function bbL4() {
  return ReactEventListener._enabled;
}

function blX7(topLevelType, handlerBaseName, handle) {
  var element = handle;
  if (!element) {
    return null;
  }
  return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
}

function bVJX(topLevelType, handlerBaseName, handle) {
  var element = handle;
  if (!element) {
    return null;
  }
  return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
}

function bgL1(refresh) {
  var callback = bKAY.bind(null, refresh);
  EventListener.listen(window, 'scroll', callback);
}

function bM09(topLevelType, nativeEvent) {
  if (!ReactEventListener._enabled) {
    return;
  }

  var bookKeeping = bQJb.getPooled(topLevelType, nativeEvent);
  try {
    ReactUpdates.batchedUpdates(bx96, bookKeeping);
  } finally {
    bQJb.release(bookKeeping);
  }
}

var ReactEventListener = {
  _enabled: true,
  _handleTopLevel: null,

  WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,

  setHandleTopLevel: b49q,
  setEnabled: bG3G,
  isEnabled: bbL4,
  trapBubbledEvent: blX7,
  trapCapturedEvent: bVJX,
  monitorScrollValue: bgL1,
  dispatchEvent: bM09
};
/**bandol> resource: node_modules/react/lib/escapeTextContentForBrowser.js */


var b5BB = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  '\'': '&#x27;'
};

var bJnq = /[&><"']/g;

function bqbp(match) {
  return b5BB[match];
}

function escapeTextContentForBrowser(text) {
  return ('' + text).replace(bJnq, bqbp);
}
/**bandol> resource: node_modules/react/lib/setTextContent.js */

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
/**bandol> resource: node_modules/react/lib/quoteAttributeValueForBrowser.js */

function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextContentForBrowser(value) + '"';
}
/**bandol> resource: node_modules/react/lib/DOMPropertyOperations.js */

var bOwx = /^[a-zA-Z_][\w\.\-]*$/;
var b8eA = {};
var bN7M = {};

function bdLz(attributeName) {
  if (bN7M.hasOwnProperty(attributeName)) {
    return true;
  }
  if (b8eA.hasOwnProperty(attributeName)) {
    return false;
  }
  if (bOwx.test(attributeName)) {
    bN7M[attributeName] = true;
    return true;
  }
  b8eA[attributeName] = true;
  'production' !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : undefined;
  return false;
}

function b9Za(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

function bEAn(id) {
  return DOMProperty.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
}

function b79Q(node, id) {
  node.setAttribute(DOMProperty.ID_ATTRIBUTE_NAME, id);
}

function bLAV(name, value) {
  var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
  if (propertyInfo) {
    if (b9Za(propertyInfo, value)) {
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
}

function b0LQ(name, value) {
  if (!bdLz(name) || value == null) {
    return '';
  }
  return name + '=' + quoteAttributeValueForBrowser(value);
}

function b1B3(node, name, value) {
  var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
  if (propertyInfo) {
    var mutationMethod = propertyInfo.mutationMethod;
    if (mutationMethod) {
      mutationMethod(node, value);
    } else if (b9Za(propertyInfo, value)) {
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
}

function bwZE(node, name, value) {
  if (!bdLz(name)) {
    return;
  }
  if (value == null) {
    node.removeAttribute(name);
  } else {
    node.setAttribute(name, '' + value);
  }
}

function bkxL(node, name) {
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

var DOMPropertyOperations = {
  createMarkupForID: bEAn,
  setAttributeForID: b79Q,
  createMarkupForProperty: bLAV,
  createMarkupForCustomAttribute: b0LQ,
  setValueForProperty: b1B3,
  setValueForAttribute: bwZE,
  deleteValueForProperty: bkxL
};

ReactPerf.measureMethods(DOMPropertyOperations, 'DOMPropertyOperations', {
  setValueForProperty: 'setValueForProperty',
  setValueForAttribute: 'setValueForAttribute',
  deleteValueForProperty: 'deleteValueForProperty'
});
/**bandol> resource: node_modules/react/lib/ReactMultiChildUpdateTypes.js */

var ReactMultiChildUpdateTypes = keyMirror({
  INSERT_MARKUP: null,
  MOVE_EXISTING: null,
  REMOVE_NODE: null,
  SET_MARKUP: null,
  TEXT_CONTENT: null
});
/**bandol> resource: node_modules/fbjs/lib/getMarkupWrap.js */

var bnZM = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

var bzla = {};

var bvKO = [1, '<select multiple="true">', '</select>'];
var ba9m = [1, '<table>', '</table>'];
var b2Xn = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var beZz = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];

var bBpZ = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': bvKO,
  'option': bvKO,

  'caption': ba9m,
  'colgroup': ba9m,
  'tbody': ba9m,
  'tfoot': ba9m,
  'thead': ba9m,

  'td': b2Xn,
  'th': b2Xn
};

var bYlK = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
bYlK.forEach(function (nodeName) {
  bBpZ[nodeName] = beZz;
  bzla[nodeName] = true;
});

function getMarkupWrap(nodeName) {
  !!!bnZM ? 'production' !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : undefined;
  if (!bBpZ.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!bzla.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      bnZM.innerHTML = '<link />';
    } else {
      bnZM.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    bzla[nodeName] = !bnZM.firstChild;
  }
  return bzla[nodeName] ? bBpZ[nodeName] : null;
}
/**bandol> resource: node_modules/fbjs/lib/toArray.js */

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
/**bandol> resource: node_modules/fbjs/lib/createArrayFromMixed.js */

function bmz3(obj) {
  return !!obj && (typeof obj == 'object' || typeof obj == 'function') && 'length' in obj && !('setInterval' in obj) && typeof obj.nodeType != 'number' && (Array.isArray(obj) || 'callee' in obj || 'item' in obj);
}

function createArrayFromMixed(obj) {
  if (!bmz3(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}
/**bandol> resource: node_modules/fbjs/lib/createNodesFromMarkup.js */

var bAp4 = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

var b3R4 = /^\s*<(\w+)/;

function bprA(markup) {
  var nodeNameMatch = markup.match(b3R4);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

function createNodesFromMarkup(markup, handleScript) {
  var node = bAp4;
  !!!bAp4 ? 'production' !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : undefined;
  var nodeName = bprA(markup);

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
/**bandol> resource: node_modules/react/lib/Danger.js */


var bV4X = /^(<[^ \/>]+)/;
var bgZ1 = 'data-danger-index';

function bMg9(markup) {
  return markup.substring(1, markup.indexOf(' '));
}

function b6Gb(markupList) {
  !ExecutionEnvironment.canUseDOM ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString for server rendering.') : invariant(false) : undefined;
  var nodeName;
  var markupByNodeName = {};

  for (var i = 0; i < markupList.length; i++) {
    !markupList[i] ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(false) : undefined;
    nodeName = bMg9(markupList[i]);
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

        markupListByNodeName[resultIndex] = markup.replace(bV4X, '$1 ' + bgZ1 + '="' + resultIndex + '" ');
      }
    }

    var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction);

    for (var j = 0; j < renderNodes.length; ++j) {
      var renderNode = renderNodes[j];
      if (renderNode.hasAttribute && renderNode.hasAttribute(bgZ1)) {

        resultIndex = +renderNode.getAttribute(bgZ1);
        renderNode.removeAttribute(bgZ1);

        !!resultList.hasOwnProperty(resultIndex) ? 'production' !== 'production' ? invariant(false, 'Danger: Assigning to an already-occupied result index.') : invariant(false) : undefined;

        resultList[resultIndex] = renderNode;

        resultListAssignmentCount += 1;
      }
    }
  }

  !(resultListAssignmentCount === resultList.length) ? 'production' !== 'production' ? invariant(false, 'Danger: Did not assign to every index of resultList.') : invariant(false) : undefined;

  !(resultList.length === markupList.length) ? 'production' !== 'production' ? invariant(false, 'Danger: Expected markup to render %s nodes, but rendered %s.', markupList.length, resultList.length) : invariant(false) : undefined;

  return resultList;
}

function bZ92(oldChild, markup) {
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

var Danger = {
  dangerouslyRenderMarkup: b6Gb,
  dangerouslyReplaceNodeWithMarkup: bZ92
};
/**bandol> resource: node_modules/react/lib/DOMChildrenOperations.js */

function bb94(parentNode, childNode, index) {
  var beforeChild = index >= parentNode.childNodes.length ? null : parentNode.childNodes.item(index);

  parentNode.insertBefore(childNode, beforeChild);
}

function bl97(updates, markupList) {
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
        bb94(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
        break;
      case ReactMultiChildUpdateTypes.MOVE_EXISTING:
        bb94(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
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

var DOMChildrenOperations = {

  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

  updateTextContent: setTextContent,

  processUpdates: bl97
};

ReactPerf.measureMethods(DOMChildrenOperations, 'DOMChildrenOperations', {
  updateTextContent: 'updateTextContent'
});
/**bandol> resource: node_modules/react/lib/ReactDOMIDOperations.js */

var bRxb = {
  dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
  style: '`style` must be set using `updateStylesByID()`.'
};

function bKqY(id, name, value) {
  var node = ReactMount.getNode(id);
  !!bRxb.hasOwnProperty(name) ? 'production' !== 'production' ? invariant(false, 'updatePropertyByID(...): %s', bRxb[name]) : invariant(false) : undefined;

  if (value != null) {
    DOMPropertyOperations.setValueForProperty(node, name, value);
  } else {
    DOMPropertyOperations.deleteValueForProperty(node, name);
  }
}

function b4Kq(id, markup) {
  var node = ReactMount.getNode(id);
  DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
}

function bGgG(updates, markup) {
  for (var i = 0; i < updates.length; i++) {
    updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
  }
  DOMChildrenOperations.processUpdates(updates, markup);
}

var ReactDOMIDOperations = {
  updatePropertyByID: bKqY,
  dangerouslyReplaceNodeWithMarkupByID: b4Kq,
  dangerouslyProcessChildrenUpdates: bGgG
};

ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
  dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
  dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
});
/**bandol> resource: node_modules/react/lib/ReactComponentBrowserEnvironment.js */
function bXbk(rootNodeID) {
  ReactMount.purgeID(rootNodeID);
}

var ReactComponentBrowserEnvironment = {

  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,

  replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,

  unmountIDFromEnvironment: bXbk
};
/**bandol> resource: node_modules/react/lib/ReactDOMTextComponent.js */

var ReactDOMTextComponent = function (props) {};

function brP6(text) {
  this._currentElement = text;
  this._stringText = '' + text;

  this._rootNodeID = null;
  this._mountIndex = 0;
}

function bQPb(rootID, transaction, context) {

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
}

function bPQN(nextText, transaction) {
  if (nextText !== this._currentElement) {
    this._currentElement = nextText;
    var nextStringText = '' + nextText;
    if (nextStringText !== this._stringText) {
      this._stringText = nextStringText;
      var node = ReactMount.getNode(this._rootNodeID);
      DOMChildrenOperations.updateTextContent(node, nextStringText);
    }
  }
}

function bxG6() {
  ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
}

assign(ReactDOMTextComponent.prototype, {
  construct: brP6,
  mountComponent: bQPb,
  receiveComponent: bPQN,
  unmountComponent: bxG6
});
/**bandol> resource: node_modules/react/lib/validateDOMNesting.js */


var validateDOMNesting = emptyFunction;
/**bandol> resource: node_modules/react/lib/canDefineProperty.js */


var canDefineProperty = false;
/**bandol> resource: node_modules/react/lib/flattenChildren.js */

function bV4y(traverseContext, child, name) {
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
  traverseAllChildren(children, bV4y, result);
  return result;
}
/**bandol> resource: node_modules/react/lib/ReactChildReconciler.js */


function b4KK(childInstances, child, name) {
  var keyUnique = childInstances[name] === undefined;

  if (child != null && keyUnique) {
    childInstances[name] = instantiateReactComponent(child, null);
  }
}

function bGg3(nestedChildNodes, transaction, context) {
  if (nestedChildNodes == null) {
    return null;
  }
  var childInstances = {};
  traverseAllChildren(nestedChildNodes, b4KK, childInstances);
  return childInstances;
}

function bb9m(prevChildren, nextChildren, transaction, context) {
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
}

function bl9a(renderedChildren) {
  for (var name in renderedChildren) {
    if (renderedChildren.hasOwnProperty(name)) {
      var renderedChild = renderedChildren[name];
      ReactReconciler.unmountComponent(renderedChild);
    }
  }
}

var ReactChildReconciler = {
  instantiateChildren: bGg3,
  updateChildren: bb9m,
  unmountChildren: bl9a
};
/**bandol> resource: node_modules/react/lib/ReactMultiChild.js */

var bBKz = 0;

var bYva = [];

var bOBz = [];

function b8Kg(parentID, markup, toIndex) {
  bYva.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    markupIndex: bOBz.push(markup) - 1,
    content: null,
    fromIndex: null,
    toIndex: toIndex
  });
}

function bNw1(parentID, fromIndex, toIndex) {
  bYva.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: toIndex
  });
}

function bdmG(parentID, fromIndex) {
  bYva.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: null
  });
}

function b941(parentID, markup) {
  bYva.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.SET_MARKUP,
    markupIndex: null,
    content: markup,
    fromIndex: null,
    toIndex: null
  });
}

function bEy4(parentID, textContent) {
  bYva.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
    markupIndex: null,
    content: textContent,
    fromIndex: null,
    toIndex: null
  });
}

function b7Rx() {
  if (bYva.length) {
    ReactComponentEnvironment.processChildrenUpdates(bYva, bOBz);
    bLBJ();
  }
}

function bLBJ() {
  bYva.length = 0;
  bOBz.length = 0;
}

function b0Gp(nestedChildren, transaction, context) {
  return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
}

function b1bl(prevChildren, nextNestedChildrenElements, transaction, context) {
  var nextChildren;

  nextChildren = flattenChildren(nextNestedChildrenElements);
  return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
}

function bwEB(nestedChildren, transaction, context) {
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
}

function bkzq(nextContent) {
  bBKz++;
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
    bBKz--;
    if (!bBKz) {
      if (errorThrown) {
        bLBJ();
      } else {
        b7Rx();
      }
    }
  }
}

function b545(nextMarkup) {
  bBKz++;
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
    bBKz--;
    if (!bBKz) {
      if (errorThrown) {
        bLBJ();
      } else {
        b7Rx();
      }
    }
  }
}

function bJ72(nextNestedChildrenElements, transaction, context) {
  bBKz++;
  var errorThrown = true;
  try {
    this._updateChildren(nextNestedChildrenElements, transaction, context);
    errorThrown = false;
  } finally {
    bBKz--;
    if (!bBKz) {
      if (errorThrown) {
        bLBJ();
      } else {
        b7Rx();
      }
    }
  }
}

function bqQy(nextNestedChildrenElements, transaction, context) {
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
}

function bybM() {
  var renderedChildren = this._renderedChildren;
  ReactChildReconciler.unmountChildren(renderedChildren);
  this._renderedChildren = null;
}

function brPK(child, toIndex, lastIndex) {
  if (child._mountIndex < lastIndex) {
    bNw1(this._rootNodeID, child._mountIndex, toIndex);
  }
}

function bQPL(child, mountImage) {
  b8Kg(this._rootNodeID, mountImage, child._mountIndex);
}

function bPQZ(child) {
  bdmG(this._rootNodeID, child._mountIndex);
}

function bxGE(textContent) {
  bEy4(this._rootNodeID, textContent);
}

function bXb7(markup) {
  b941(this._rootNodeID, markup);
}

function bRxY(child, name, index, transaction, context) {
  var rootID = this._rootNodeID + name;
  var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
  child._mountIndex = index;
  this.createChild(child, mountImage);
}

function bKqB(child) {
  this.removeChild(child);
  child._mountIndex = null;
}

var ReactMultiChild = {
  Mixin: {
    _reconcilerInstantiateChildren: b0Gp,
    _reconcilerUpdateChildren: b1bl,
    mountChildren: bwEB,
    updateTextContent: bkzq,
    updateMarkup: b545,
    updateChildren: bJ72,
    _updateChildren: bqQy,
    unmountChildren: bybM,
    moveChild: brPK,
    createChild: bQPL,
    removeChild: bPQZ,
    setTextContent: bxGE,
    setMarkup: bXb7,
    _mountChildByNameAtIndex: bRxY,
    _unmountChild: bKqB
  }

};
/**bandol> resource: node_modules/react/lib/LinkedValueUtils.js */


var bMqR = {
  'button': true,
  'checkbox': true,
  'image': true,
  'hidden': true,
  'radio': true,
  'reset': true,
  'submit': true
};

function b6X5(inputProps) {
  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(false) : undefined;
}
function bZVe(inputProps) {
  b6X5(inputProps);
  !(inputProps.value == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(false) : undefined;
}

function bAR8(inputProps) {
  b6X5(inputProps);
  !(inputProps.checked == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(false) : undefined;
}

function b3Qn(props, propName, componentName) {
  if (!props[propName] || bMqR[props.type] || props.onChange || props.readOnly || props.disabled) {
    return null;
  }
  return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
}

function bpEO(props, propName, componentName) {
  if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
    return null;
  }
  return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
}

var bmB5 = {
  value: b3Qn,
  checked: bpEO,

  onChange: ReactPropTypes.func
};

var bnE8 = {};
function bzOq(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function bvE7(tagName, props, owner) {
  for (var propName in bmB5) {
    if (bmB5.hasOwnProperty(propName)) {
      var error = bmB5[propName](props, propName, tagName, ReactPropTypeLocations.prop);
    }
    if (error instanceof Error && !(error.message in bnE8)) {
      bnE8[error.message] = true;

      var addendum = bzOq(owner);
      'production' !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : undefined;
    }
  }
}

function ba5Z(inputProps) {
  if (inputProps.valueLink) {
    bZVe(inputProps);
    return inputProps.valueLink.value;
  }
  return inputProps.value;
}

function b2r4(inputProps) {
  if (inputProps.checkedLink) {
    bAR8(inputProps);
    return inputProps.checkedLink.value;
  }
  return inputProps.checked;
}

function beM6(inputProps, event) {
  if (inputProps.valueLink) {
    bZVe(inputProps);
    return inputProps.valueLink.requestChange(event.target.value);
  } else if (inputProps.checkedLink) {
    bAR8(inputProps);
    return inputProps.checkedLink.requestChange(event.target.checked);
  } else if (inputProps.onChange) {
    return inputProps.onChange.call(undefined, event);
  }
}

var LinkedValueUtils = {
  checkPropTypes: bvE7,
  getValue: ba5Z,
  getChecked: b2r4,
  executeOnChange: beM6
};
/**bandol> resource: node_modules/react/lib/ReactDOMTextarea.js */


function bGN3() {
  if (this._rootNodeID) {
    ReactDOMTextarea.updateWrapper(this);
  }
}

function bbMm(inst, props, context) {
  !(props.dangerouslySetInnerHTML == null) ? 'production' !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(false) : undefined;

  var nativeProps = assign({}, props, {
    defaultValue: undefined,
    value: undefined,
    children: inst._wrapperState.initialValue,
    onChange: inst._wrapperState.onChange
  });

  return nativeProps;
}

function blMa(inst, props) {

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
    onChange: bg9x.bind(inst)
  };
}

function bVzy(inst) {
  var props = inst._currentElement.props;
  var value = LinkedValueUtils.getValue(props);
  if (value != null) {
    ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
  }
}

var ReactDOMTextarea = {
  getNativeProps: bbMm,
  mountWrapper: blMa,
  updateWrapper: bVzy
};

function bg9x(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);
  ReactUpdates.asap(bGN3, this);
  return returnValue;
}
/**bandol> resource: node_modules/react/lib/ReactDOMSelect.js */


var bqJy = '__ReactDOMSelect_value$' + Math.random().toString(36).slice(2);

function byaM() {
  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
    this._wrapperState.pendingUpdate = false;

    var props = this._currentElement.props;
    var value = LinkedValueUtils.getValue(props);

    if (value != null) {
      bPAZ(this, Boolean(props.multiple), value);
    }
  }
}

function bPAZ(inst, multiple, propValue) {
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

function bxdE(inst, props, context) {
  return assign({}, props, {
    onChange: inst._wrapperState.onChange,
    value: undefined
  });
}

function bXg7(inst, props) {

  var value = LinkedValueUtils.getValue(props);
  inst._wrapperState = {
    pendingUpdate: false,
    initialValue: value != null ? value : props.defaultValue,
    onChange: b4PK.bind(inst),
    wasMultiple: Boolean(props.multiple)
  };
}

function bRBY(inst, props, context) {
  var childContext = assign({}, context);
  childContext[bqJy] = inst._wrapperState.initialValue;
  return childContext;
}

function bKBB(inst) {
  var props = inst._currentElement.props;

  inst._wrapperState.initialValue = undefined;

  var wasMultiple = inst._wrapperState.wasMultiple;
  inst._wrapperState.wasMultiple = Boolean(props.multiple);

  var value = LinkedValueUtils.getValue(props);
  if (value != null) {
    inst._wrapperState.pendingUpdate = false;
    bPAZ(inst, Boolean(props.multiple), value);
  } else if (wasMultiple !== Boolean(props.multiple)) {
    if (props.defaultValue != null) {
      bPAZ(inst, Boolean(props.multiple), props.defaultValue);
    } else {
      bPAZ(inst, Boolean(props.multiple), props.multiple ? [] : '');
    }
  }
}

var ReactDOMSelect = {
  valueContextKey: bqJy,

  getNativeProps: bxdE,
  mountWrapper: bXg7,
  processChildContext: bRBY,
  postUpdateWrapper: bKBB
};

function b4PK(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  this._wrapperState.pendingUpdate = true;
  ReactUpdates.asap(byaM, this);
  return returnValue;
}
/**bandol> resource: node_modules/react/lib/ReactDOMOption.js */


var bkpq = ReactDOMSelect.valueContextKey;

function b5x5(inst, props, context) {
  var selectValue = context[bkpq];

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
}

function bJB2(inst, props, context) {
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

var ReactDOMOption = {
  mountWrapper: b5x5,
  getNativeProps: bJB2
};
/**bandol> resource: node_modules/react/lib/ReactDOMInput.js */


var bd3G = {};

function b971() {
  if (this._rootNodeID) {
    ReactDOMInput.updateWrapper(this);
  }
}

function bER4(inst, props, context) {
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
}

function b7Zx(inst, props) {

  var defaultValue = props.defaultValue;
  inst._wrapperState = {
    initialChecked: props.defaultChecked || false,
    initialValue: defaultValue != null ? defaultValue : null,
    onChange: bwqB.bind(inst)
  };
}

function bLvJ(inst) {
  bd3G[inst._rootNodeID] = inst;
}

function b0Vp(inst) {
  delete bd3G[inst._rootNodeID];
}

function b13l(inst) {
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

var ReactDOMInput = {
  getNativeProps: bER4,
  mountWrapper: b7Zx,
  mountReadyWrapper: bLvJ,
  unmountWrapper: b0Vp,
  updateWrapper: b13l
};

function bwqB(event) {
  var props = this._currentElement.props;

  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  ReactUpdates.asap(b971, this);

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
      var otherInstance = bd3G[otherID];
      !otherInstance ? 'production' !== 'production' ? invariant(false, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(false) : undefined;

      ReactUpdates.asap(b971, otherInstance);
    }
  }

  return returnValue;
}
/**bandol> resource: node_modules/react/lib/ReactDOMButton.js */


var b86g = {
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

function bNL1(inst, props, context) {
  if (!props.disabled) {
    return props;
  }

  var nativeProps = {};
  for (var key in props) {
    if (props.hasOwnProperty(key) && !b86g[key]) {
      nativeProps[key] = props[key];
    }
  }

  return nativeProps;
}

var ReactDOMButton = {
  getNativeProps: bNL1
};
/**bandol> resource: node_modules/fbjs/lib/memoizeStringOnly.js */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}
/**bandol> resource: node_modules/fbjs/lib/hyphenate.js */


var bOyz = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(bOyz, '-$1').toLowerCase();
}
/**bandol> resource: node_modules/fbjs/lib/hyphenateStyleName.js */


var bY7a = /^ms-/;

function hyphenateStyleName(string) {
  return hyphenate(string).replace(bY7a, '-ms-');
}
/**bandol> resource: node_modules/react/lib/CSSProperty.js */

var baeZ = {
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

function b2p4(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

var bee6 = ['Webkit', 'ms', 'Moz', 'O'];

Object.keys(baeZ).forEach(function (prop) {
  bee6.forEach(function (prefix) {
    baeZ[b2p4(prefix, prop)] = baeZ[prop];
  });
});

var bBPz = {
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
  isUnitlessNumber: baeZ,
  shorthandPropertyExpansions: bBPz
};
/**bandol> resource: node_modules/react/lib/dangerousStyleValue.js */


var bvn7 = CSSProperty.isUnitlessNumber;

function dangerousStyleValue(name, value) {

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || bvn7.hasOwnProperty(name) && bvn7[name]) {
    return '' + value;
  }

  if (typeof value === 'string') {
    value = value.trim();
  }
  return value + 'px';
}
/**bandol> resource: node_modules/react/lib/CSSPropertyOperations.js */


var bAy8 = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

var b3Vn = false;
var bpYO = 'cssFloat';
if (ExecutionEnvironment.canUseDOM) {
  var bmY5 = document.createElement('div').style;
  try {
    bmY5.font = '';
  } catch (e) {
    b3Vn = true;
  }

  if (document.documentElement.style.cssFloat === undefined) {
    bpYO = 'styleFloat';
  }
}

function bnY8(styles) {
  var serialized = '';
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var styleValue = styles[styleName];

    if (styleValue != null) {
      serialized += bAy8(styleName) + ':';
      serialized += dangerousStyleValue(styleName, styleValue) + ';';
    }
  }
  return serialized || null;
}

function bznq(node, styles) {
  var style = node.style;
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }

    var styleValue = dangerousStyleValue(styleName, styles[styleName]);
    if (styleName === 'float') {
      styleName = bpYO;
    }
    if (styleValue) {
      style[styleName] = styleValue;
    } else {
      var expansion = b3Vn && CSSProperty.shorthandPropertyExpansions[styleName];
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

var CSSPropertyOperations = {
  createMarkupForStyles: bnY8,
  setValueForStyles: bznq
};

ReactPerf.measureMethods(CSSPropertyOperations, 'CSSPropertyOperations', {
  setValueForStyles: 'setValueForStyles'
});
/**bandol> resource: node_modules/react/lib/findDOMNode.js */

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
/**bandol> resource: node_modules/react/lib/AutoFocusUtils.js */
function bMzR() {
  if (this.props.autoFocus) {
    focusNode(findDOMNode(this));
  }
}

var b6L5 = {
  componentDidMount: bMzR
};

function bZYe() {
  focusNode(ReactMount.getNode(this._rootNodeID));
}

var AutoFocusUtils = {
  Mixin: b6L5,

  focusDOMComponent: bZYe
};
/**bandol> resource: node_modules/react/lib/ReactDOMComponent.js */


var bOgk = ReactBrowserEventEmitter.deleteListener;
var b8bw = ReactBrowserEventEmitter.listenTo;
var bN2E = ReactBrowserEventEmitter.registrationNameModules;

var bdRd = { 'string': true, 'number': true };

var b9Bk = keyOf({ children: null });
var bE5d = keyOf({ style: null });
var b7OL = keyOf({ __html: null });

var bL0z = 1;

function b0QR(internalInstance) {
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

function b1Pn() {
  return this;
}

function bwr6() {
  var component = this._reactInternalComponent;

  return !!component;
}

function bkX0() {}

function b5KY(partialProps, callback) {
  var component = this._reactInternalComponent;

  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function bJZN(partialProps, callback) {
  var component = this._reactInternalComponent;

  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function bqe3(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return '[' + obj.map(bqe3).join(', ') + ']';
    } else {
      var pairs = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
          pairs.push(keyEscaped + ': ' + bqe3(obj[key]));
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

function brq3(component, props) {
  if (!props) {
    return;
  }

  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? 'production' !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(false) : undefined;
    !(typeof props.dangerouslySetInnerHTML === 'object' && b7OL in props.dangerouslySetInnerHTML) ? 'production' !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' + 'for more information.') : invariant(false) : undefined;
  }

  !(props.style == null || typeof props.style === 'object') ? 'production' !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, ' + 'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' + 'using JSX.%s', b0QR(component)) : invariant(false) : undefined;
}

function bQYm(id, registrationName, listener, transaction) {
  var container = ReactMount.findReactContainerForID(id);
  if (container) {
    var doc = container.nodeType === bL0z ? container.ownerDocument : container;
    b8bw(registrationName, doc);
  }
  transaction.getReactMountReady().enqueue(bPYO, {
    id: id,
    registrationName: registrationName,
    listener: listener
  });
}

function bPYO() {
  var listenerToPut = this;
  ReactBrowserEventEmitter.putListener(listenerToPut.id, listenerToPut.registrationName, listenerToPut.listener);
}

var bxQx = {
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

function bX7p() {
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

      for (var event in bxQx) {
        if (bxQx.hasOwnProperty(event)) {
          inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes[event], bxQx[event], node));
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

function bRZP() {
  ReactDOMInput.mountReadyWrapper(this);
}

function bKZ2() {
  ReactDOMSelect.postUpdateWrapper(this);
}

var b4Rp = {
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

var bG4p = {
  'listing': true,
  'pre': true,
  'textarea': true
};

var bbe3 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
var blnv = {};
var bVYv = {}.hasOwnProperty;

function br8K(tag) {
  if (!bVYv.call(blnv, tag)) {
    !bbe3.test(tag) ? 'production' !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : invariant(false) : undefined;
    blnv[tag] = true;
  }
}

function bQzL(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

function ReactDOMComponent(tag) {
  br8K(tag);
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

function bPzZ(element) {
  this._currentElement = element;
}

function bxnE(rootID, transaction, context) {
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
      transaction.getReactMountReady().enqueue(bX7p, this);
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

  brq3(this, props);


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
    if (!tagContent && b4Rp[this._tag]) {
      mountImage = tagOpen + '/>';
    } else {
      mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
    }
  }

  switch (this._tag) {
    case 'input':
      transaction.getReactMountReady().enqueue(bRZP, this);

    case 'button':
    case 'select':
    case 'textarea':
      if (props.autoFocus) {
        transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
      }
      break;
  }

  return mountImage;
}

function bXw7(transaction, props) {
  var ret = '<' + this._currentElement.type;

  for (var propKey in props) {
    if (!props.hasOwnProperty(propKey)) {
      continue;
    }
    var propValue = props[propKey];
    if (propValue == null) {
      continue;
    }
    if (bN2E.hasOwnProperty(propKey)) {
      if (propValue) {
        bQYm(this._rootNodeID, propKey, propValue, transaction);
      }
    } else {
      if (propKey === bE5d) {
        if (propValue) {
          propValue = this._previousStyleCopy = assign({}, props.style);
        }
        propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
      }
      var markup = null;
      if (this._tag != null && bQzL(this._tag, props)) {
        if (propKey !== b9Bk) {
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
}

function bRYY(transaction, props, context) {
  var ret = '';

  var innerHTML = props.dangerouslySetInnerHTML;
  if (innerHTML != null) {
    if (innerHTML.__html != null) {
      ret = innerHTML.__html;
    }
  } else {
    var contentToUse = bdRd[typeof props.children] ? props.children : null;
    var childrenToUse = contentToUse != null ? null : props.children;
    if (contentToUse != null) {
      ret = escapeTextContentForBrowser(contentToUse);
    } else if (childrenToUse != null) {
      var mountImages = this.mountChildren(childrenToUse, transaction, context);
      ret = mountImages.join('');
    }
  }
  if (bG4p[this._tag] && ret.charAt(0) === '\n') {
    return '\n' + ret;
  } else {
    return ret;
  }
}

function bKyB(transaction, props, context, el) {
  var innerHTML = props.dangerouslySetInnerHTML;
  if (innerHTML != null) {
    if (innerHTML.__html != null) {
      setInnerHTML(el, innerHTML.__html);
    }
  } else {
    var contentToUse = bdRd[typeof props.children] ? props.children : null;
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
}

function b4dK(nextElement, transaction, context) {
  var prevElement = this._currentElement;
  this._currentElement = nextElement;
  this.updateComponent(transaction, prevElement, nextElement, context);
}

function bG43(transaction, prevElement, nextElement, context) {
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

  brq3(this, nextProps);
  this._updateDOMProperties(lastProps, nextProps, transaction, null);
  this._updateDOMChildren(lastProps, nextProps, transaction, context);

  if (!canDefineProperty && this._nodeWithLegacyProperties) {
    this._nodeWithLegacyProperties.props = nextProps;
  }

  if (this._tag === 'select') {
    transaction.getReactMountReady().enqueue(bKZ2, this);
  }
}

function bbem(lastProps, nextProps, transaction, node) {
  var propKey;
  var styleName;
  var styleUpdates;
  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
      continue;
    }
    if (propKey === bE5d) {
      var lastStyle = this._previousStyleCopy;
      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          styleUpdates = styleUpdates || {};
          styleUpdates[styleName] = '';
        }
      }
      this._previousStyleCopy = null;
    } else if (bN2E.hasOwnProperty(propKey)) {
      if (lastProps[propKey]) {
        bOgk(this._rootNodeID, propKey);
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
    var lastProp = propKey === bE5d ? this._previousStyleCopy : lastProps[propKey];
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
      continue;
    }
    if (propKey === bE5d) {
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
    } else if (bN2E.hasOwnProperty(propKey)) {
      if (nextProp) {
        bQYm(this._rootNodeID, propKey, nextProp, transaction);
      } else if (lastProp) {
        bOgk(this._rootNodeID, propKey);
      }
    } else if (bQzL(this._tag, nextProps)) {
      if (!node) {
        node = ReactMount.getNode(this._rootNodeID);
      }
      if (propKey === b9Bk) {
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
}

function blna(lastProps, nextProps, transaction, context) {
  var lastContent = bdRd[typeof lastProps.children] ? lastProps.children : null;
  var nextContent = bdRd[typeof nextProps.children] ? nextProps.children : null;

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
}

function bVYy() {
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
}

function bgpx() {
  if (!this._nodeWithLegacyProperties) {
    var node = ReactMount.getNode(this._rootNodeID);

    node._reactInternalComponent = this;
    node.getDOMNode = b1Pn;
    node.isMounted = bwr6;
    node.setState = bkX0;
    node.replaceState = bkX0;
    node.forceUpdate = bkX0;
    node.setProps = b5KY;
    node.replaceProps = bJZN;

    node.props = this._currentElement.props;


    this._nodeWithLegacyProperties = node;
  }
  return this._nodeWithLegacyProperties;
}

ReactDOMComponent.Mixin = {
  construct: bPzZ,
  mountComponent: bxnE,
  _createOpenTagMarkupAndPutListeners: bXw7,
  _createContentMarkup: bRYY,
  _createInitialChildren: bKyB,
  receiveComponent: b4dK,
  updateComponent: bG43,
  _updateDOMProperties: bbem,
  _updateDOMChildren: blna,
  unmountComponent: bVYy,
  getPublicInstance: bgpx
};

ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
  mountComponent: 'mountComponent',
  updateComponent: 'updateComponent'
});

assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
/**bandol> resource: node_modules/react/lib/ReactBrowserComponentMixin.js */


var bB2L = '_getDOMNodeDidWarn';

function bYM2() {
  'production' !== 'production' ? warning(this.constructor[bB2L], '%s.getDOMNode(...) is deprecated. Please use ' + 'ReactDOM.findDOMNode(instance) instead.', ReactInstanceMap.get(this).getName() || this.tagName || 'Unknown') : undefined;
  this.constructor[bB2L] = true;
  return findDOMNode(this);
}

var ReactBrowserComponentMixin = {
  getDOMNode: bYM2
};
/**bandol> resource: node_modules/react/lib/HTMLDOMPropertyConfig.js */


var b3XV = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var bpLE = DOMProperty.injection.MUST_USE_PROPERTY;
var bmKz = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var bn4K = DOMProperty.injection.HAS_SIDE_EFFECTS;
var bzxb = DOMProperty.injection.HAS_NUMERIC_VALUE;
var bv6p = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
var baPV = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var b2xy;
if (ExecutionEnvironment.canUseDOM) {
  var beKg = document.implementation;
  b2xy = beKg && beKg.hasFeature && beKg.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
}

var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
  Properties: {
    accept: null,
    acceptCharset: null,
    accessKey: null,
    action: null,
    allowFullScreen: b3XV | bmKz,
    allowTransparency: b3XV,
    alt: null,
    async: bmKz,
    autoComplete: null,

    autoPlay: bmKz,
    capture: b3XV | bmKz,
    cellPadding: null,
    cellSpacing: null,
    charSet: b3XV,
    challenge: b3XV,
    checked: bpLE | bmKz,
    classID: b3XV,

    className: b2xy ? b3XV : bpLE,
    cols: b3XV | bv6p,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: b3XV,
    controls: bpLE | bmKz,
    coords: null,
    crossOrigin: null,
    data: null,
    dateTime: b3XV,
    'default': bmKz,
    defer: bmKz,
    dir: null,
    disabled: b3XV | bmKz,
    download: baPV,
    draggable: null,
    encType: null,
    form: b3XV,
    formAction: b3XV,
    formEncType: b3XV,
    formMethod: b3XV,
    formNoValidate: bmKz,
    formTarget: b3XV,
    frameBorder: b3XV,
    headers: null,
    height: b3XV,
    hidden: b3XV | bmKz,
    high: null,
    href: null,
    hrefLang: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: bpLE,
    inputMode: b3XV,
    integrity: null,
    is: b3XV,
    keyParams: b3XV,
    keyType: b3XV,
    kind: null,
    label: null,
    lang: null,
    list: b3XV,
    loop: bpLE | bmKz,
    low: null,
    manifest: b3XV,
    marginHeight: null,
    marginWidth: null,
    max: null,
    maxLength: b3XV,
    media: b3XV,
    mediaGroup: null,
    method: null,
    min: null,
    minLength: b3XV,
    multiple: bpLE | bmKz,
    muted: bpLE | bmKz,
    name: null,
    nonce: b3XV,
    noValidate: bmKz,
    open: bmKz,
    optimum: null,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: bpLE | bmKz,
    rel: null,
    required: bmKz,
    reversed: bmKz,
    role: b3XV,
    rows: b3XV | bv6p,
    rowSpan: null,
    sandbox: null,
    scope: null,
    scoped: bmKz,
    scrolling: null,
    seamless: b3XV | bmKz,
    selected: bpLE | bmKz,
    shape: null,
    size: b3XV | bv6p,
    sizes: b3XV,
    span: bv6p,
    spellCheck: null,
    src: null,
    srcDoc: bpLE,
    srcLang: null,
    srcSet: b3XV,
    start: bzxb,
    step: null,
    style: null,
    summary: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    useMap: null,
    value: bpLE | bn4K,
    width: b3XV,
    wmode: b3XV,
    wrap: null,

    about: b3XV,
    datatype: b3XV,
    inlist: b3XV,
    prefix: b3XV,

    property: b3XV,
    resource: b3XV,
    'typeof': b3XV,
    vocab: b3XV,

    autoCapitalize: b3XV,
    autoCorrect: b3XV,

    autoSave: null,

    color: null,

    itemProp: b3XV,
    itemScope: b3XV | bmKz,
    itemType: b3XV,

    itemID: b3XV,
    itemRef: b3XV,

    results: null,

    security: b3XV,

    unselectable: b3XV
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
/**bandol> resource: node_modules/react/lib/EnterLeaveEventPlugin.js */


var bgr3 = EventConstants.topLevelTypes;
var bM7k = ReactMount.getFirstReactDOM;

var b64r = {
  mouseEnter: {
    registrationName: keyOf({ onMouseEnter: null }),
    dependencies: [bgr3.topMouseOut, bgr3.topMouseOver]
  },
  mouseLeave: {
    registrationName: keyOf({ onMouseLeave: null }),
    dependencies: [bgr3.topMouseOut, bgr3.topMouseOver]
  }
};

var bZvR = [null, null];

function bAee(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  if (topLevelType === bgr3.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
    return null;
  }
  if (topLevelType !== bgr3.topMouseOut && topLevelType !== bgr3.topMouseOver) {
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
  if (topLevelType === bgr3.topMouseOut) {
    from = topLevelTarget;
    fromID = topLevelTargetID;
    to = bM7k(nativeEvent.relatedTarget || nativeEvent.toElement);
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

  var leave = SyntheticMouseEvent.getPooled(b64r.mouseLeave, fromID, nativeEvent, nativeEventTarget);
  leave.type = 'mouseleave';
  leave.target = from;
  leave.relatedTarget = to;

  var enter = SyntheticMouseEvent.getPooled(b64r.mouseEnter, toID, nativeEvent, nativeEventTarget);
  enter.type = 'mouseenter';
  enter.target = to;
  enter.relatedTarget = from;

  EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

  bZvR[0] = leave;
  bZvR[1] = enter;

  return bZvR;
}

var EnterLeaveEventPlugin = {

  eventTypes: b64r,

  extractEvents: bAee
};
/**bandol> resource: node_modules/react/lib/DefaultEventPluginOrder.js */

var DefaultEventPluginOrder = [keyOf({ ResponderEventPlugin: null }), keyOf({ SimpleEventPlugin: null }), keyOf({ TapEventPlugin: null }), keyOf({ EnterLeaveEventPlugin: null }), keyOf({ ChangeEventPlugin: null }), keyOf({ SelectEventPlugin: null }), keyOf({ BeforeInputEventPlugin: null })];
/**bandol> resource: node_modules/react/lib/ClientReactRootIndex.js */


var blRv = 0;

function bVmv() {
  return blRv++;
}

var ClientReactRootIndex = {
  createReactRootIndex: bVmv
};
/**bandol> resource: node_modules/react/lib/ChangeEventPlugin.js */


var bYX2 = EventConstants.topLevelTypes;

var bOnk = {
  change: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onChange: null }),
      captured: keyOf({ onChangeCapture: null })
    },
    dependencies: [bYX2.topBlur, bYX2.topChange, bYX2.topClick, bYX2.topFocus, bYX2.topInput, bYX2.topKeyDown, bYX2.topKeyUp, bYX2.topSelectionChange]
  }
};

var b89w = null;
var bN8E = null;
var bdkd = null;
var b9Vk = null;

function bEld(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

var b70L = false;
if (ExecutionEnvironment.canUseDOM) {
  b70L = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
}

function bLVz(nativeEvent) {
  var event = SyntheticEvent.getPooled(bOnk.change, bN8E, nativeEvent, getEventTarget(nativeEvent));
  EventPropagators.accumulateTwoPhaseDispatches(event);

  ReactUpdates.batchedUpdates(b0OR, event);
}

function b0OR(event) {
  EventPluginHub.enqueueEvents(event);
  EventPluginHub.processEventQueue(false);
}

function b1On(target, targetID) {
  b89w = target;
  bN8E = targetID;
  b89w.attachEvent('onchange', bLVz);
}

function bw36() {
  if (!b89w) {
    return;
  }
  b89w.detachEvent('onchange', bLVz);
  b89w = null;
  bN8E = null;
}

function bk90(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bYX2.topChange) {
    return topLevelTargetID;
  }
}
function b50Y(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bYX2.topFocus) {
    bw36();
    b1On(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === bYX2.topBlur) {
    bw36();
  }
}

var bJeN = false;
if (ExecutionEnvironment.canUseDOM) {
  bJeN = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
}

function bq93() {
  return b9Vk.get.call(this);
}

function by68(val) {
  bdkd = '' + val;
  b9Vk.set.call(this, val);
}

var brL3 = {
  get: bq93,
  set: by68
};

function bQ0m(target, targetID) {
  b89w = target;
  bN8E = targetID;
  bdkd = target.value;
  b9Vk = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');

  Object.defineProperty(b89w, 'value', brL3);
  b89w.attachEvent('onpropertychange', bxEx);
}

function bPnO() {
  if (!b89w) {
    return;
  }

  delete b89w.value;
  b89w.detachEvent('onpropertychange', bxEx);

  b89w = null;
  bN8E = null;
  bdkd = null;
  b9Vk = null;
}

function bxEx(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  var value = nativeEvent.srcElement.value;
  if (value === bdkd) {
    return;
  }
  bdkd = value;

  bLVz(nativeEvent);
}

function bXxp(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bYX2.topInput) {
    return topLevelTargetID;
  }
}

function bR7P(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bYX2.topFocus) {
    bPnO();
    bQ0m(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === bYX2.topBlur) {
    bPnO();
  }
}

function bKG2(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bYX2.topSelectionChange || topLevelType === bYX2.topKeyUp || topLevelType === bYX2.topKeyDown) {
    if (b89w && b89w.value !== bdkd) {
      bdkd = b89w.value;
      return bN8E;
    }
  }
}

function b4lp(elem) {
  return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function bGZp(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === bYX2.topClick) {
    return topLevelTargetID;
  }
}

function bbx3(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {

  var getTargetIDFunc, handleEventFunc;
  if (bEld(topLevelTarget)) {
    if (b70L) {
      getTargetIDFunc = bk90;
    } else {
      handleEventFunc = b50Y;
    }
  } else if (isTextInputElement(topLevelTarget)) {
    if (bJeN) {
      getTargetIDFunc = bXxp;
    } else {
      getTargetIDFunc = bKG2;
      handleEventFunc = bR7P;
    }
  } else if (b4lp(topLevelTarget)) {
    getTargetIDFunc = bGZp;
  }

  if (getTargetIDFunc) {
    var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
    if (targetID) {
      var event = SyntheticEvent.getPooled(bOnk.change, targetID, nativeEvent, nativeEventTarget);
      event.type = 'change';
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }
  }

  if (handleEventFunc) {
    handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
  }
}

var ChangeEventPlugin = {

  eventTypes: bOnk,

  extractEvents: bbx3
};
/**bandol> resource: node_modules/react/lib/SyntheticInputEvent.js */

var bBAL = {
  data: null
};

function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticInputEvent, bBAL);
/**bandol> resource: node_modules/react/lib/SyntheticCompositionEvent.js */

var bevg = {
  data: null
};

function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticCompositionEvent, bevg);
/**bandol> resource: node_modules/react/lib/FallbackCompositionState.js */

function FallbackCompositionState(root) {
  this._root = root;
  this._startText = this.getText();
  this._fallbackText = null;
}

function bvNp() {
  this._root = null;
  this._startText = null;
  this._fallbackText = null;
}

function bagV() {
  if ('value' in this._root) {
    return this._root.value;
  }
  return this._root[getTextContentAccessor()];
}

function b2ly() {
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

assign(FallbackCompositionState.prototype, {
  destructor: bvNp,
  getText: bagV,
  getData: b2ly
});

PooledClass.addPoolingTo(FallbackCompositionState);
/**bandol> resource: node_modules/react/lib/BeforeInputEventPlugin.js */


var bVB8 = [9, 13, 27, 32];
var brr3 = 229;

var bQAm = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var bPZO = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  bPZO = document.documentMode;
}

var bxMx = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !bPZO && !bRpP();

var bXOp = ExecutionEnvironment.canUseDOM && (!bQAm || bPZO && bPZO > 8 && bPZO <= 11);

function bRpP() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var bKv2 = 32;
var b4yp = String.fromCharCode(bKv2);

var bG2p = EventConstants.topLevelTypes;

var bbZ3 = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onBeforeInput: null }),
      captured: keyOf({ onBeforeInputCapture: null })
    },
    dependencies: [bG2p.topCompositionEnd, bG2p.topKeyPress, bG2p.topTextInput, bG2p.topPaste]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionEnd: null }),
      captured: keyOf({ onCompositionEndCapture: null })
    },
    dependencies: [bG2p.topBlur, bG2p.topCompositionEnd, bG2p.topKeyDown, bG2p.topKeyPress, bG2p.topKeyUp, bG2p.topMouseDown]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionStart: null }),
      captured: keyOf({ onCompositionStartCapture: null })
    },
    dependencies: [bG2p.topBlur, bG2p.topCompositionStart, bG2p.topKeyDown, bG2p.topKeyPress, bG2p.topKeyUp, bG2p.topMouseDown]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionUpdate: null }),
      captured: keyOf({ onCompositionUpdateCapture: null })
    },
    dependencies: [bG2p.topBlur, bG2p.topCompositionUpdate, bG2p.topKeyDown, bG2p.topKeyPress, bG2p.topKeyUp, bG2p.topMouseDown]
  }
};

var blev = false;

function bVQv(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

function bgv3(topLevelType) {
  switch (topLevelType) {
    case bG2p.topCompositionStart:
      return bbZ3.compositionStart;
    case bG2p.topCompositionEnd:
      return bbZ3.compositionEnd;
    case bG2p.topCompositionUpdate:
      return bbZ3.compositionUpdate;
  }
}

function bM2k(topLevelType, nativeEvent) {
  return topLevelType === bG2p.topKeyDown && nativeEvent.keyCode === brr3;
}

function b6gr(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case bG2p.topKeyUp:
      return bVB8.indexOf(nativeEvent.keyCode) !== -1;
    case bG2p.topKeyDown:
      return nativeEvent.keyCode !== brr3;
    case bG2p.topKeyPress:
    case bG2p.topMouseDown:
    case bG2p.topBlur:
      return true;
    default:
      return false;
  }
}

function bZRR(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

var bAge = null;

function b36V(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (bQAm) {
    eventType = bgv3(topLevelType);
  } else if (!bAge) {
    if (bM2k(topLevelType, nativeEvent)) {
      eventType = bbZ3.compositionStart;
    }
  } else if (b6gr(topLevelType, nativeEvent)) {
    eventType = bbZ3.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (bXOp) {
    if (!bAge && eventType === bbZ3.compositionStart) {
      bAge = FallbackCompositionState.getPooled(topLevelTarget);
    } else if (eventType === bbZ3.compositionEnd) {
      if (bAge) {
        fallbackData = bAge.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    event.data = fallbackData;
  } else {
    var customData = bZRR(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

function bp3E(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case bG2p.topCompositionEnd:
      return bZRR(nativeEvent);
    case bG2p.topKeyPress:
      var which = nativeEvent.which;
      if (which !== bKv2) {
        return null;
      }

      blev = true;
      return b4yp;

    case bG2p.topTextInput:
      var chars = nativeEvent.data;

      if (chars === b4yp && blev) {
        return null;
      }

      return chars;

    default:
      return null;
  }
}

function bmLz(topLevelType, nativeEvent) {
  if (bAge) {
    if (topLevelType === bG2p.topCompositionEnd || b6gr(topLevelType, nativeEvent)) {
      var chars = bAge.getData();
      FallbackCompositionState.release(bAge);
      bAge = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case bG2p.topPaste:
      return null;
    case bG2p.topKeyPress:
      if (nativeEvent.which && !bVQv(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case bG2p.topCompositionEnd:
      return bXOp ? null : nativeEvent.data;
    default:
      return null;
  }
}

function bnLK(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var chars;

  if (bxMx) {
    chars = bp3E(topLevelType, nativeEvent);
  } else {
    chars = bmLz(topLevelType, nativeEvent);
  }

  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(bbZ3.beforeInput, topLevelTargetID, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

function bz6b(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  return [b36V(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget), bnLK(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget)];
}

var BeforeInputEventPlugin = {

  eventTypes: bbZ3,

  extractEvents: bz6b
};
/**bandol> resource: node_modules/react/lib/ReactDefaultInjection.js */


var bbBz = false;

function blrg() {
  if (bbBz) {
    return;
  }
  bbBz = true;

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

var bAdv = {
  inject: blrg
};
/**bandol> resource: node_modules/react/lib/ReactDOMServer.js */


bAdv.inject();

var ReactDOMServer = {
  renderToString: b9d.renderToString,
  renderToStaticMarkup: b9d.renderToStaticMarkup,
  version: bPq
};
/**bandol> resource: node_modules/react/lib/renderSubtreeIntoContainer.js */
var bRp9 = ReactMount.renderSubtreeIntoContainer;
/**bandol> resource: node_modules/react/lib/ReactDOM.js */


bAdv.inject();

var bGey = ReactPerf.measure('React', 'render', ReactMount.render);

var bKvr = {
  findDOMNode: findDOMNode,
  render: bGey,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: bPq,

  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: bRp9
};
/**bandol> resource: node_modules/react/lib/React.js */

var React = {};

assign(React, b4y3);

assign(React, {
  findDOMNode: deprecated('findDOMNode', 'ReactDOM', 'react-dom', bKvr, bKvr.findDOMNode),
  render: deprecated('render', 'ReactDOM', 'react-dom', bKvr, bKvr.render),
  unmountComponentAtNode: deprecated('unmountComponentAtNode', 'ReactDOM', 'react-dom', bKvr, bKvr.unmountComponentAtNode),

  renderToString: deprecated('renderToString', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToString),
  renderToStaticMarkup: deprecated('renderToStaticMarkup', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToStaticMarkup)
});

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bKvr;
React.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMServer;
/**bandol> resource: actual.js */


bKvr.render(React.createElement('h1', null, 'Hello Bandol'), document.getElementById('content'));

}());