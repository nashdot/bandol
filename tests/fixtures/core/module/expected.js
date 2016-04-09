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

var b4PK = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var bGN3 = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: b4PK,

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
      if (config.hasOwnProperty(propName) && !bGN3.hasOwnProperty(propName)) {
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
      if (config.hasOwnProperty(propName) && !bGN3.hasOwnProperty(propName)) {
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
  return typeof object === 'object' && object !== null && object.$$typeof === b4PK;
};
/**bandol> resource: node_modules/react/lib/onlyChild.js */

function onlyChild(children) {
  !ReactElement.isValidElement(children) ? 'production' !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : undefined;
  return children;
}
/**bandol> resource: node_modules/react/lib/ReactVersion.js */
var bQr = '0.14.7';
/**bandol> resource: node_modules/react/lib/getIteratorFn.js */

var bRBY = typeof Symbol === 'function' && Symbol.iterator;
var bKBB = '@@iterator';
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (bRBY && maybeIterable[bRBY] || maybeIterable[bKBB]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}
/**bandol> resource: node_modules/fbjs/lib/emptyFunction.js */


function bXg7(arg) {
  return function () {
    return arg;
  };
}

function emptyFunction() {}

emptyFunction.thatReturns = bXg7;
emptyFunction.thatReturnsFalse = bXg7(false);
emptyFunction.thatReturnsTrue = bXg7(true);
emptyFunction.thatReturnsNull = bXg7(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};
/**bandol> resource: node_modules/react/lib/ReactPropTypeLocationNames.js */


var ReactPropTypeLocationNames = {};
/**bandol> resource: node_modules/react/lib/ReactPropTypes.js */


var bER4 = '<<anonymous>>';

var ReactPropTypes = {
  array: bLvJ('array'),
  bool: bLvJ('boolean'),
  func: bLvJ('function'),
  number: bLvJ('number'),
  object: bLvJ('object'),
  string: bLvJ('string'),

  any: b0Vp(),
  arrayOf: b13l,
  element: bwqB(),
  instanceOf: bkpq,
  node: byaM(),
  objectOf: bJB2,
  oneOf: b5x5,
  oneOfType: bqJy,
  shape: brEK
};

function b7Zx(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    componentName = componentName || bER4;
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

function bLvJ(expectedType) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bQ6L(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];

      var preciseType = bPAZ(propValue);

      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return b7Zx(validate);
}

function b0Vp() {
  return b7Zx(emptyFunction.thatReturns(null));
}

function b13l(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = bQ6L(propValue);
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
  return b7Zx(validate);
}

function bwqB() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!ReactElement.isValidElement(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return b7Zx(validate);
}

function bkpq(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || bER4;
      var actualClassName = bxdE(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return b7Zx(validate);
}

function b5x5(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    return b7Zx(function () {
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
  return b7Zx(validate);
}

function bJB2(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bQ6L(propValue);
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
  return b7Zx(validate);
}

function bqJy(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    return b7Zx(function () {
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
  return b7Zx(validate);
}

function byaM() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return b7Zx(validate);
}

function brEK(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = bQ6L(propValue);
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
  return b7Zx(validate);
}

function bQ6L(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    return 'object';
  }
  return propType;
}

function bPAZ(propValue) {
  var propType = bQ6L(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

function bxdE(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name;
}
/**bandol> resource: node_modules/fbjs/lib/mapObject.js */


var b971 = Object.prototype.hasOwnProperty;

function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (b971.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}
/**bandol> resource: node_modules/react/lib/ReactDOMFactories.js */

function bd3G(tag) {
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

}, bd3G);
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


function bNL1(publicInstance, callerName) {}

var ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false;
  },

  enqueueCallback: function (publicInstance, callback) {},

  enqueueForceUpdate: function (publicInstance) {
    bNL1(publicInstance, 'forceUpdate');
  },

  enqueueReplaceState: function (publicInstance, completeState) {
    bNL1(publicInstance, 'replaceState');
  },

  enqueueSetState: function (publicInstance, partialState) {
    bNL1(publicInstance, 'setState');
  },

  enqueueSetProps: function (publicInstance, partialProps) {
    bNL1(publicInstance, 'setProps');
  },

  enqueueReplaceProps: function (publicInstance, props) {
    bNL1(publicInstance, 'replaceProps');
  }

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


var b6L5 = keyOf({ mixins: null });

var bZYe = keyMirror({
  DEFINE_ONCE: null,

  DEFINE_MANY: null,

  OVERRIDE_BASE: null,

  DEFINE_MANY_MERGED: null
});

var bAy8 = [];

var bpYO = {
  mixins: bZYe.DEFINE_MANY,

  statics: bZYe.DEFINE_MANY,

  propTypes: bZYe.DEFINE_MANY,

  contextTypes: bZYe.DEFINE_MANY,

  childContextTypes: bZYe.DEFINE_MANY,

  getDefaultProps: bZYe.DEFINE_MANY_MERGED,

  getInitialState: bZYe.DEFINE_MANY_MERGED,

  getChildContext: bZYe.DEFINE_MANY_MERGED,

  render: bZYe.DEFINE_ONCE,

  componentWillMount: bZYe.DEFINE_MANY,

  componentDidMount: bZYe.DEFINE_MANY,

  componentWillReceiveProps: bZYe.DEFINE_MANY,

  shouldComponentUpdate: bZYe.DEFINE_ONCE,

  componentWillUpdate: bZYe.DEFINE_MANY,

  componentDidUpdate: bZYe.DEFINE_MANY,

  componentWillUnmount: bZYe.DEFINE_MANY,

  updateComponent: bZYe.OVERRIDE_BASE

};

var bmY5 = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        bznq(Constructor, mixins[i]);
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
      Constructor.getDefaultProps = b2p4(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    Constructor.propTypes = assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    bvn7(Constructor, statics);
  },
  autobind: function () {} };

function bnY8(proto, name) {
  var specPolicy = bpYO.hasOwnProperty(name) ? bpYO[name] : null;

  if (bOyz.hasOwnProperty(name)) {
    !(specPolicy === bZYe.OVERRIDE_BASE) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : undefined;
  }

  if (proto.hasOwnProperty(name)) {
    !(specPolicy === bZYe.DEFINE_MANY || specPolicy === bZYe.DEFINE_MANY_MERGED) ? 'production' !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : undefined;
  }
}

function bznq(Constructor, spec) {
  if (!spec) {
    return;
  }

  !(typeof spec !== 'function') ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
  !!ReactElement.isValidElement(spec) ? 'production' !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;

  var proto = Constructor.prototype;

  if (spec.hasOwnProperty(b6L5)) {
    bmY5.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === b6L5) {
      continue;
    }

    var property = spec[name];
    bnY8(proto, name);

    if (bmY5.hasOwnProperty(name)) {
      bmY5[name](Constructor, property);
    } else {
      var isReactClassMethod = bpYO.hasOwnProperty(name);
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
          var specPolicy = bpYO[name];

          !(isReactClassMethod && (specPolicy === bZYe.DEFINE_MANY_MERGED || specPolicy === bZYe.DEFINE_MANY)) ? 'production' !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : undefined;

          if (specPolicy === bZYe.DEFINE_MANY_MERGED) {
            proto[name] = b2p4(proto[name], property);
          } else if (specPolicy === bZYe.DEFINE_MANY) {
            proto[name] = bee6(proto[name], property);
          }
        } else {
          proto[name] = property;
        }
      }
    }
  }
}

function bvn7(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in bmY5;
    !!isReserved ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : undefined;

    var isInherited = name in Constructor;
    !!isInherited ? 'production' !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : undefined;
    Constructor[name] = property;
  }
}

function baeZ(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : undefined;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? 'production' !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : undefined;
      one[key] = two[key];
    }
  }
  return one;
}

function b2p4(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    baeZ(c, a);
    baeZ(c, b);
    return c;
  };
}

function bee6(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

function bBPz(component, method) {
  var boundMethod = method.bind(component);

  return boundMethod;
}

function bY7a(component) {
  for (var autoBindKey in component.__reactAutoBindMap) {
    if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
      var method = component.__reactAutoBindMap[autoBindKey];
      component[autoBindKey] = bBPz(component, method);
    }
  }
}

var bOyz = {
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

var b86g = function () {};
assign(b86g.prototype, ReactComponent.prototype, bOyz);

var ReactClass = {
  createClass: function (spec) {
    var Constructor = function (props, context, updater) {
      if (this.__reactAutoBindMap) {
        bY7a(this);
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
    Constructor.prototype = new b86g();
    Constructor.prototype.constructor = Constructor;

    bAy8.forEach(bznq.bind(null, Constructor));

    bznq(Constructor, spec);

    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    !Constructor.prototype.render ? 'production' !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : undefined;

    for (var methodName in bpYO) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      bAy8.push(mixin);
    }
  }

};
/**bandol> resource: node_modules/react/lib/ReactRootIndex.js */


var bMzR = {
  injectCreateReactRootIndex: function (_createReactRootIndex) {
    ReactRootIndex.createReactRootIndex = _createReactRootIndex;
  }
};

var ReactRootIndex = {
  createReactRootIndex: null,
  injection: bMzR
};
/**bandol> resource: node_modules/react/lib/ReactInstanceHandles.js */


var bPzZ = '.';
var bxnE = bPzZ.length;

var bXw7 = 10000;

function bRYY(index) {
  return bPzZ + index.toString(36);
}

function bKyB(id, index) {
  return id.charAt(index) === bPzZ || index === id.length;
}

function b4dK(id) {
  return id === '' || id.charAt(0) === bPzZ && id.charAt(id.length - 1) !== bPzZ;
}

function bG43(ancestorID, descendantID) {
  return descendantID.indexOf(ancestorID) === 0 && bKyB(descendantID, ancestorID.length);
}

function bbem(id) {
  return id ? id.substr(0, id.lastIndexOf(bPzZ)) : '';
}

function blna(ancestorID, destinationID) {
  !(b4dK(ancestorID) && b4dK(destinationID)) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(false) : undefined;
  !bG43(ancestorID, destinationID) ? 'production' !== 'production' ? invariant(false, 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(false) : undefined;
  if (ancestorID === destinationID) {
    return ancestorID;
  }

  var start = ancestorID.length + bxnE;
  var i;
  for (i = start; i < destinationID.length; i++) {
    if (bKyB(destinationID, i)) {
      break;
    }
  }
  return destinationID.substr(0, i);
}

function bVYy(oneID, twoID) {
  var minLength = Math.min(oneID.length, twoID.length);
  if (minLength === 0) {
    return '';
  }
  var lastCommonMarkerIndex = 0;

  for (var i = 0; i <= minLength; i++) {
    if (bKyB(oneID, i) && bKyB(twoID, i)) {
      lastCommonMarkerIndex = i;
    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
      break;
    }
  }
  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
  !b4dK(longestCommonID) ? 'production' !== 'production' ? invariant(false, 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(false) : undefined;
  return longestCommonID;
}

function bgpx(start, stop, cb, arg, skipFirst, skipLast) {
  start = start || '';
  stop = stop || '';
  !(start !== stop) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(false) : undefined;
  var traverseUp = bG43(stop, start);
  !(traverseUp || bG43(start, stop)) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(false) : undefined;

  var depth = 0;
  var traverse = traverseUp ? bbem : blna;
  for (var id = start;; id = traverse(id, stop)) {
    var ret;
    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
      ret = cb(id, traverseUp, arg);
    }
    if (ret === false || id === stop) {
      break;
    }
    !(depth++ < bXw7) ? 'production' !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop, id) : invariant(false) : undefined;
  }
}

var ReactInstanceHandles = {
  createReactRootID: function () {
    return bRYY(ReactRootIndex.createReactRootIndex());
  },

  createReactID: function (rootID, name) {
    return rootID + name;
  },

  getReactRootIDFromNodeID: function (id) {
    if (id && id.charAt(0) === bPzZ && id.length > 1) {
      var index = id.indexOf(bPzZ, 1);
      return index > -1 ? id.substr(0, index) : id;
    }
    return null;
  },

  traverseEnterLeave: function (leaveID, enterID, cb, upArg, downArg) {
    var ancestorID = bVYy(leaveID, enterID);
    if (ancestorID !== leaveID) {
      bgpx(leaveID, ancestorID, cb, upArg, false, true);
    }
    if (ancestorID !== enterID) {
      bgpx(ancestorID, enterID, cb, downArg, true, false);
    }
  },

  traverseTwoPhase: function (targetID, cb, arg) {
    if (targetID) {
      bgpx('', targetID, cb, arg, true, false);
      bgpx(targetID, '', cb, arg, false, true);
    }
  },

  traverseTwoPhaseSkipTarget: function (targetID, cb, arg) {
    if (targetID) {
      bgpx('', targetID, cb, arg, true, true);
      bgpx(targetID, '', cb, arg, true, true);
    }
  },

  traverseAncestors: function (targetID, cb, arg) {
    bgpx('', targetID, cb, arg, true, false);
  },

  getFirstCommonAncestorID: bVYy,

  _getNextDescendantID: blna,

  isAncestorIDOf: bG43,

  SEPARATOR: bPzZ

};
/**bandol> resource: node_modules/react/lib/traverseAllChildren.js */


var bRZP = ReactInstanceHandles.SEPARATOR;
var bKZ2 = ':';

var b4Rp = {
  '=': '=0',
  '.': '=1',
  ':': '=2'
};

var bG4p = /[=.:]/g;

function bbe3(match) {
  return b4Rp[match];
}

function blnv(component, index) {
  if (component && component.key != null) {
    return br8K(component.key);
  }

  return index.toString(36);
}

function bVYv(text) {
  return ('' + text).replace(bG4p, bbe3);
}

function br8K(key) {
  return '$' + bVYv(key);
}

function bQzL(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
    callback(traverseContext, children, nameSoFar === '' ? bRZP + blnv(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0;
  var nextNamePrefix = nameSoFar === '' ? bRZP : nameSoFar + bKZ2;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + blnv(child, i);
      subtreeCount += bQzL(child, nextName, callback, traverseContext);
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
          nextName = nextNamePrefix + blnv(child, ii++);
          subtreeCount += bQzL(child, nextName, callback, traverseContext);
        }
      } else {
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + br8K(entry[0]) + bKZ2 + blnv(child, 0);
            subtreeCount += bQzL(child, nextName, callback, traverseContext);
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

  return bQzL(children, '', callback, traverseContext);
}
/**bandol> resource: node_modules/react/lib/PooledClass.js */

var b5KY = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var bJZN = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var bqe3 = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var byP8 = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var brq3 = function (a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var bQYm = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? 'production' !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : undefined;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var bPYO = 10;
var bxQx = b5KY;

var bX7p = function (CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || bxQx;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = bPYO;
  }
  NewKlass.release = bQYm;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: bX7p,
  oneArgumentPooler: b5KY,
  twoArgumentPooler: bJZN,
  threeArgumentPooler: bqe3,
  fourArgumentPooler: byP8,
  fiveArgumentPooler: brq3
};
/**bandol> resource: node_modules/react/lib/ReactChildren.js */


var bYM2 = PooledClass.twoArgumentPooler;
var bOgk = PooledClass.fourArgumentPooler;

var b8bw = /\/(?!\/)/g;
function bN2E(text) {
  return ('' + text).replace(b8bw, '//');
}

function bdRd(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
bdRd.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(bdRd, bYM2);

function b9Bk(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

function bE5d(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = bdRd.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, b9Bk, traverseContext);
  bdRd.release(traverseContext);
}

function b7OL(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
b7OL.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(b7OL, bOgk);

function bL0z(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    b0QR(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild !== child ? bN2E(mappedChild.key || '') + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function b0QR(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = bN2E(prefix) + '/';
  }
  var traverseContext = b7OL.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, bL0z, traverseContext);
  b7OL.release(traverseContext);
}

function b1Pn(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  b0QR(children, result, null, func, context);
  return result;
}

function bwr6(traverseContext, child, name) {
  return null;
}

function bkX0(children, context) {
  return traverseAllChildren(children, bwr6, null);
}

var ReactChildren = {
  forEach: bE5d,
  map: b1Pn,
  mapIntoWithKeyPrefixInternal: b0QR,
  count: bkX0,
  toArray: toArray
};
/**bandol> resource: node_modules/react/lib/ReactIsomorphic.js */


var b2xy = ReactElement.createElement;
var beKg = ReactElement.createFactory;
var bB2L = ReactElement.cloneElement;

var bKv = {

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,

  createElement: b2xy,
  cloneElement: bB2L,
  isValidElement: ReactElement.isValidElement,

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: beKg,
  createMixin: function (mixin) {
    return mixin;
  },

  DOM: ReactDOMFactories,

  version: bQr,

  __spread: assign
};
/**bandol> resource: node_modules/react/lib/ReactNativeComponent.js */


var bZvR = null;
var bAee = null;

var b3XV = {};
var bpLE = null;

var bmKz = {
  injectGenericComponentClass: function (componentClass) {
    bAee = componentClass;
  },

  injectTextComponentClass: function (componentClass) {
    bpLE = componentClass;
  },

  injectComponentClasses: function (componentClasses) {
    assign(b3XV, componentClasses);
  }
};

function bn4K(element) {
  if (typeof element.type === 'function') {
    return element.type;
  }
  var tag = element.type;
  var componentClass = b3XV[tag];
  if (componentClass == null) {
    b3XV[tag] = componentClass = bZvR(tag);
  }
  return componentClass;
}

function bzxb(element) {
  !bAee ? 'production' !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : invariant(false) : undefined;
  return new bAee(element.type, element.props);
}

function bv6p(text) {
  return new bpLE(text);
}

function baPV(component) {
  return component instanceof bpLE;
}

var ReactNativeComponent = {
  getComponentClassForElement: bn4K,
  createInternalComponent: bzxb,
  createInstanceForText: bv6p,
  isTextComponent: baPV,
  injection: bmKz
};
/**bandol> resource: node_modules/react/lib/ReactOwner.js */

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
/**bandol> resource: node_modules/react/lib/ReactRef.js */


var ReactRef = {};

function bM7k(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function b64r(ref, component, owner) {
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
    bM7k(ref, instance, element._owner);
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
    b64r(ref, instance, element._owner);
  }
};
/**bandol> resource: node_modules/react/lib/ReactReconciler.js */

function bgr3() {
  ReactRef.attachRefs(this, this._currentElement);
}

var ReactReconciler = {
  mountComponent: function (internalInstance, rootID, transaction, context) {
    var markup = internalInstance.mountComponent(rootID, transaction, context);
    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(bgr3, internalInstance);
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
      transaction.getReactMountReady().enqueue(bgr3, internalInstance);
    }
  },

  performUpdateIfNecessary: function (internalInstance, transaction) {
    internalInstance.performUpdateIfNecessary(transaction);
  }

};
/**bandol> resource: node_modules/react/lib/ReactEmptyComponentRegistry.js */

var bGZp = {};

function bbx3(id) {
  return !!bGZp[id];
}

function blRv(id) {
  bGZp[id] = true;
}

function bVmv(id) {
  delete bGZp[id];
}

var ReactEmptyComponentRegistry = {
  isNullComponentID: bbx3,
  registerNullComponentID: blRv,
  deregisterNullComponentID: bVmv
};
/**bandol> resource: node_modules/react/lib/ReactEmptyComponent.js */


var bKG2;

var b4lp = {
  injectEmptyComponent: function (component) {
    bKG2 = ReactElement.createElement(component);
  }
};

var ReactEmptyComponent = function (instantiate) {
  this._currentElement = null;
  this._rootNodeID = null;
  this._renderedComponent = instantiate(bKG2);
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

ReactEmptyComponent.injection = b4lp;
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

var bR7P = {
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

  Mixin: bR7P,

  OBSERVED_ERROR: {}

};
/**bandol> resource: node_modules/react/lib/ReactPerf.js */

var ReactPerf = {
  enableMeasure: false,

  storedMeasure: bXxp,

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

function bXxp(objName, fnName, func) {
  return func;
}
/**bandol> resource: node_modules/react/lib/CallbackQueue.js */

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
/**bandol> resource: node_modules/react/lib/ReactUpdates.js */


var b9Vk = [];
var bEld = CallbackQueue.getPooled();
var b70L = false;

var bLVz = null;

function b0OR() {
  !(ReactUpdates.ReactReconcileTransaction && bLVz) ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(false) : undefined;
}

var b1On = {
  initialize: function () {
    this.dirtyComponentsLength = b9Vk.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== b9Vk.length) {
      b9Vk.splice(0, this.dirtyComponentsLength);
      brL3();
    } else {
      b9Vk.length = 0;
    }
  }
};

var bw36 = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  close: function () {
    this.callbackQueue.notifyAll();
  }
};

var bk90 = [b1On, bw36];

function b50Y() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue.getPooled();
  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(false);
}

assign(b50Y.prototype, Transaction.Mixin, {
  getTransactionWrappers: function () {
    return bk90;
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

PooledClass.addPoolingTo(b50Y);

function bJeN(callback, a, b, c, d, e) {
  b0OR();
  bLVz.batchedUpdates(callback, a, b, c, d, e);
}

function bq93(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function by68(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === b9Vk.length) ? 'production' !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, b9Vk.length) : invariant(false) : undefined;

  b9Vk.sort(bq93);

  for (var i = 0; i < len; i++) {
    var component = b9Vk[i];

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

var brL3 = function () {
  while (b9Vk.length || b70L) {
    if (b9Vk.length) {
      var transaction = b50Y.getPooled();
      transaction.perform(by68, null, transaction);
      b50Y.release(transaction);
    }

    if (b70L) {
      b70L = false;
      var queue = bEld;
      bEld = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};
brL3 = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', brL3);

function bQ0m(component) {
  b0OR();

  if (!bLVz.isBatchingUpdates) {
    bLVz.batchedUpdates(bQ0m, component);
    return;
  }

  b9Vk.push(component);
}

function bPnO(callback, context) {
  !bLVz.isBatchingUpdates ? 'production' !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(false) : undefined;
  bEld.enqueue(callback, context);
  b70L = true;
}

var bxEx = {
  injectReconcileTransaction: function (ReconcileTransaction) {
    !ReconcileTransaction ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : invariant(false) : undefined;
    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
  },

  injectBatchingStrategy: function (_batchingStrategy) {
    !_batchingStrategy ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : invariant(false) : undefined;
    !(typeof _batchingStrategy.batchedUpdates === 'function') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : invariant(false) : undefined;
    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? 'production' !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(false) : undefined;
    bLVz = _batchingStrategy;
  }
};

var ReactUpdates = {
  ReactReconcileTransaction: null,

  batchedUpdates: bJeN,
  enqueueUpdate: bQ0m,
  flushBatchedUpdates: brL3,
  injection: bxEx,
  asap: bPnO
};
/**bandol> resource: node_modules/react/lib/ReactInstanceMap.js */

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
/**bandol> resource: node_modules/react/lib/ReactUpdateQueue.js */


function bN8E(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}

function bdkd(publicInstance, callerName) {
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
    var internalInstance = bdkd(publicInstance);

    if (!internalInstance) {
      return null;
    }

    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }

    bN8E(internalInstance);
  },

  enqueueCallbackInternal: function (internalInstance, callback) {
    !(typeof callback === 'function') ? 'production' !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    bN8E(internalInstance);
  },

  enqueueForceUpdate: function (publicInstance) {
    var internalInstance = bdkd(publicInstance, 'forceUpdate');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingForceUpdate = true;

    bN8E(internalInstance);
  },

  enqueueReplaceState: function (publicInstance, completeState) {
    var internalInstance = bdkd(publicInstance, 'replaceState');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingStateQueue = [completeState];
    internalInstance._pendingReplaceState = true;

    bN8E(internalInstance);
  },

  enqueueSetState: function (publicInstance, partialState) {
    var internalInstance = bdkd(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    bN8E(internalInstance);
  },

  enqueueSetProps: function (publicInstance, partialProps) {
    var internalInstance = bdkd(publicInstance, 'setProps');
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

    bN8E(topLevelWrapper);
  },

  enqueueReplaceProps: function (publicInstance, props) {
    var internalInstance = bdkd(publicInstance, 'replaceProps');
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

    bN8E(topLevelWrapper);
  },

  enqueueElementInternal: function (internalInstance, newElement) {
    internalInstance._pendingElement = newElement;
    bN8E(internalInstance);
  }

};
/**bandol> resource: node_modules/react/lib/ReactPropTypeLocations.js */


var ReactPropTypeLocations = keyMirror({
  prop: null,
  context: null,
  childContext: null
});
/**bandol> resource: node_modules/react/lib/ReactComponentEnvironment.js */


var b89w = false;

var ReactComponentEnvironment = {
  unmountIDFromEnvironment: null,

  replaceNodeWithMarkupByID: null,

  processChildrenUpdates: null,

  injection: {
    injectEnvironment: function (environment) {
      !!b89w ? 'production' !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : undefined;
      ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
      ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
      b89w = true;
    }
  }

};
/**bandol> resource: node_modules/react/lib/ReactCompositeComponent.js */


function bevg(component) {
  var owner = component._currentElement._owner || null;
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function bBAL(Component) {}
bBAL.prototype.render = function () {
  var Component = ReactInstanceMap.get(this)._currentElement.type;
  return Component(this.props, this.context, this.updater);
};

var bYX2 = 1;

var bOnk = {
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
    this._mountOrder = bYX2++;
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
      inst = new bBAL(Component);
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
          var addendum = bevg(this);

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
    if (inst instanceof bBAL) {
      return null;
    }
    return inst;
  },

  _instantiateReactComponent: null

};

ReactPerf.measureMethods(bOnk, 'ReactCompositeComponent', {
  mountComponent: 'mountComponent',
  updateComponent: 'updateComponent',
  _renderValidatedComponent: '_renderValidatedComponent'
});

var ReactCompositeComponent = {

  Mixin: bOnk

};
/**bandol> resource: node_modules/react/lib/instantiateReactComponent.js */

var bvNp = function () {};
assign(bvNp.prototype, ReactCompositeComponent.Mixin, {
  _instantiateReactComponent: instantiateReactComponent
});

function bagV(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function b2ly(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

function instantiateReactComponent(node) {
  var instance;

  if (node === null || node === false) {
    instance = new ReactEmptyComponent(instantiateReactComponent);
  } else if (typeof node === 'object') {
    var element = node;
    !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? 'production' !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, bagV(element._owner)) : invariant(false) : undefined;

    if (typeof element.type === 'string') {
      instance = ReactNativeComponent.createInternalComponent(element);
    } else if (b2ly(element.type)) {
      instance = new element.type(element);
    } else {
      instance = new bvNp();
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

var bmLz = {
  initialize: function () {
    this.reactMountReady.reset();
  },

  close: emptyFunction
};

var bnLK = [bmLz];

function ReactServerRenderingTransaction(renderToStaticMarkup) {
  this.reinitializeTransaction();
  this.renderToStaticMarkup = renderToStaticMarkup;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = false;
}

var bz6b = {
  getTransactionWrappers: function () {
    return bnLK;
  },

  getReactMountReady: function () {
    return this.reactMountReady;
  },

  destructor: function () {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, bz6b);

PooledClass.addPoolingTo(ReactServerRenderingTransaction);
/**bandol> resource: node_modules/react/lib/ReactServerBatchingStrategy.js */


var ReactServerBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function (callback) {}
};
/**bandol> resource: node_modules/react/lib/adler32.js */


var bp3E = 65521;

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
    a %= bp3E;
    b %= bp3E;
  }
  for (; i < l; i++) {
    b += a += data.charCodeAt(i);
  }
  a %= bp3E;
  b %= bp3E;
  return a | b << 16;
}
/**bandol> resource: node_modules/react/lib/ReactMarkupChecksum.js */


var b36V = /\/?>/;

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  addChecksumToMarkup: function (markup) {
    var checksum = adler32(markup);

    return markup.replace(b36V, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
  },

  canReuseMarkup: function (markup, element) {
    var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
  }
};
/**bandol> resource: node_modules/react/lib/ReactDefaultBatchingStrategy.js */


var bgv3 = {
  initialize: emptyFunction,
  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var bM2k = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var b6gr = [bM2k, bgv3];

function bZRR() {
  this.reinitializeTransaction();
}

assign(bZRR.prototype, Transaction.Mixin, {
  getTransactionWrappers: function () {
    return b6gr;
  }
});

var bAge = new bZRR();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function (callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      bAge.perform(callback, null, a, b, c, d, e);
    }
  }
};
/**bandol> resource: node_modules/react/lib/ReactServerRendering.js */

function blev(element) {
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

function bVQv(element) {
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

var bPq = {
  renderToString: blev,
  renderToStaticMarkup: bVQv
};
/**bandol> resource: node_modules/react/lib/DOMProperty.js */


function b4yp(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var bG2p = {
  MUST_USE_ATTRIBUTE: 0x1,
  MUST_USE_PROPERTY: 0x2,
  HAS_SIDE_EFFECTS: 0x4,
  HAS_BOOLEAN_VALUE: 0x8,
  HAS_NUMERIC_VALUE: 0x10,
  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = bG2p;
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

        mustUseAttribute: b4yp(propConfig, Injection.MUST_USE_ATTRIBUTE),
        mustUseProperty: b4yp(propConfig, Injection.MUST_USE_PROPERTY),
        hasSideEffects: b4yp(propConfig, Injection.HAS_SIDE_EFFECTS),
        hasBooleanValue: b4yp(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: b4yp(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: b4yp(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: b4yp(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
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
var bbZ3 = {};

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
    var nodeDefaults = bbZ3[nodeName];
    var testElement;
    if (!nodeDefaults) {
      bbZ3[nodeName] = nodeDefaults = {};
    }
    if (!(prop in nodeDefaults)) {
      testElement = document.createElement(nodeName);
      nodeDefaults[prop] = testElement[prop];
    }
    return nodeDefaults[prop];
  },

  injection: bG2p
};
/**bandol> resource: node_modules/react/lib/SVGDOMPropertyConfig.js */


var bRpP = DOMProperty.injection.MUST_USE_ATTRIBUTE;

var bKv2 = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

var SVGDOMPropertyConfig = {
  Properties: {
    clipPath: bRpP,
    cx: bRpP,
    cy: bRpP,
    d: bRpP,
    dx: bRpP,
    dy: bRpP,
    fill: bRpP,
    fillOpacity: bRpP,
    fontFamily: bRpP,
    fontSize: bRpP,
    fx: bRpP,
    fy: bRpP,
    gradientTransform: bRpP,
    gradientUnits: bRpP,
    markerEnd: bRpP,
    markerMid: bRpP,
    markerStart: bRpP,
    offset: bRpP,
    opacity: bRpP,
    patternContentUnits: bRpP,
    patternUnits: bRpP,
    points: bRpP,
    preserveAspectRatio: bRpP,
    r: bRpP,
    rx: bRpP,
    ry: bRpP,
    spreadMethod: bRpP,
    stopColor: bRpP,
    stopOpacity: bRpP,
    stroke: bRpP,
    strokeDasharray: bRpP,
    strokeLinecap: bRpP,
    strokeOpacity: bRpP,
    strokeWidth: bRpP,
    textAnchor: bRpP,
    transform: bRpP,
    version: bRpP,
    viewBox: bRpP,
    x1: bRpP,
    x2: bRpP,
    x: bRpP,
    xlinkActuate: bRpP,
    xlinkArcrole: bRpP,
    xlinkHref: bRpP,
    xlinkRole: bRpP,
    xlinkShow: bRpP,
    xlinkTitle: bRpP,
    xlinkType: bRpP,
    xmlBase: bRpP,
    xmlLang: bRpP,
    xmlSpace: bRpP,
    y1: bRpP,
    y2: bRpP,
    y: bRpP
  },
  DOMAttributeNamespaces: {
    xlinkActuate: bKv2.xlink,
    xlinkArcrole: bKv2.xlink,
    xlinkHref: bKv2.xlink,
    xlinkRole: bKv2.xlink,
    xlinkShow: bKv2.xlink,
    xlinkTitle: bKv2.xlink,
    xlinkType: bKv2.xlink,
    xmlBase: bKv2.xml,
    xmlLang: bKv2.xml,
    xmlSpace: bKv2.xml
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


var bxMx = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Meta': 'metaKey',
  'Shift': 'shiftKey'
};

function bXOp(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = bxMx[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return bXOp;
}
/**bandol> resource: node_modules/react/lib/ViewportMetrics.js */


var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function (scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};
/**bandol> resource: node_modules/react/lib/getEventTarget.js */

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  return target.nodeType === 3 ? target.parentNode : target;
}
/**bandol> resource: node_modules/react/lib/SyntheticEvent.js */

var bPZO = {
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

SyntheticEvent.Interface = bPZO;

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

var bQAm = {
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

SyntheticEvent.augmentClass(SyntheticUIEvent, bQAm);
/**bandol> resource: node_modules/react/lib/SyntheticMouseEvent.js */

var brr3 = {
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

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, brr3);
/**bandol> resource: node_modules/react/lib/SyntheticWheelEvent.js */

var bVB8 = {
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

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, bVB8);
/**bandol> resource: node_modules/react/lib/SyntheticTouchEvent.js */

var blrg = {
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

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, blrg);
/**bandol> resource: node_modules/react/lib/SyntheticDragEvent.js */

var bbBz = {
  dataTransfer: null
};

function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticDragEvent, bbBz);
/**bandol> resource: node_modules/react/lib/getEventKey.js */

var b4y3 = {
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

var bGey = {
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
    var key = b4y3[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode(nativeEvent);

    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    return bGey[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}
/**bandol> resource: node_modules/react/lib/SyntheticKeyboardEvent.js */

var bKvr = {
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

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, bKvr);
/**bandol> resource: node_modules/react/lib/SyntheticFocusEvent.js */

var bRp9 = {
  relatedTarget: null
};

function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, bRp9);
/**bandol> resource: node_modules/react/lib/SyntheticClipboardEvent.js */

var bXO3 = {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticClipboardEvent, bXO3);
/**bandol> resource: node_modules/fbjs/lib/ExecutionEnvironment.js */


var bxMV = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ExecutionEnvironment = {

  canUseDOM: bxMV,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: bxMV && !!(window.addEventListener || window.attachEvent),

  canUseViewport: bxMV && !!window.screen,

  isInWorker: !bxMV };
/**bandol> resource: node_modules/react/lib/setInnerHTML.js */


var brrx = /^[ \r\n\t\f]/;
var bQAd = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

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
  var bPZ5 = document.createElement('div');
  bPZ5.innerHTML = ' ';
  if (bPZ5.innerHTML === '') {
    setInnerHTML = function (node, html) {
      if (node.parentNode) {
        node.parentNode.replaceChild(node, node);
      }

      if (brrx.test(html) || html[0] === '<' && bQAd.test(html)) {
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


var by4Q;
if (ExecutionEnvironment.canUseDOM) {
  by4Q = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true;
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

  if (!isSupported && by4Q && eventNameSuffix === 'wheel') {
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


var bJpQ = null;

function bqRO(name, func, a, b) {
  try {
    return func(a, b);
  } catch (x) {
    if (bJpQ === null) {
      bJpQ = x;
    }
    return undefined;
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: bqRO,

  invokeGuardedCallbackWithCatch: bqRO,

  rethrowCaughtError: function () {
    if (bJpQ) {
      var error = bJpQ;
      bJpQ = null;
      throw error;
    }
  }
};
/**bandol> resource: node_modules/react/lib/EventConstants.js */


var bkRQ = keyMirror({ bubbled: null, captured: null });

var b5MZ = keyMirror({
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
  topLevelTypes: b5MZ,
  PropagationPhases: bkRQ
};
/**bandol> resource: node_modules/react/lib/EventPluginUtils.js */

var bO7g = {
  Mount: null,
  injectMount: function (InjectedMount) {
    bO7g.Mount = InjectedMount;
  }
};

var b8P6 = EventConstants.topLevelTypes;

function bNVw(topLevelType) {
  return topLevelType === b8P6.topMouseUp || topLevelType === b8P6.topTouchEnd || topLevelType === b8P6.topTouchCancel;
}

function bdB9(topLevelType) {
  return topLevelType === b8P6.topMouseMove || topLevelType === b8P6.topTouchMove;
}
function b9xZ(topLevelType) {
  return topLevelType === b8P6.topMouseDown || topLevelType === b8P6.topTouchStart;
}

function bEO0(event, simulated, listener, domID) {
  var type = event.type || 'unknown-event';
  event.currentTarget = bO7g.Mount.getNode(domID);
  if (simulated) {
    ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event, domID);
  } else {
    ReactErrorUtils.invokeGuardedCallback(type, listener, event, domID);
  }
  event.currentTarget = null;
}

function b7Qd(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;

  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }

      bEO0(event, simulated, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    bEO0(event, simulated, dispatchListeners, dispatchIDs);
  }
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

function bL3O(event) {
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

function b0dg(event) {
  var ret = bL3O(event);
  event._dispatchIDs = null;
  event._dispatchListeners = null;
  return ret;
}

function b1v8(event) {
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  !!Array.isArray(dispatchListener) ? 'production' !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : invariant(false) : undefined;
  var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

function bwR2(event) {
  return !!event._dispatchListeners;
}

var EventPluginUtils = {
  isEndish: bNVw,
  isMoveish: bdB9,
  isStartish: b9xZ,

  executeDirectDispatch: b1v8,
  executeDispatchesInOrder: b7Qd,
  executeDispatchesInOrderStopAtTrue: b0dg,
  hasDispatches: bwR2,

  getNode: function (id) {
    return bO7g.Mount.getNode(id);
  },
  getID: function (node) {
    return bO7g.Mount.getID(node);
  },

  injection: bO7g
};
/**bandol> resource: node_modules/react/lib/EventPluginRegistry.js */

var baOJ = null;

var b2ML = {};

function beyn() {
  if (!baOJ) {
    return;
  }
  for (var pluginName in b2ML) {
    var PluginModule = b2ML[pluginName];
    var pluginIndex = baOJ.indexOf(pluginName);
    !(pluginIndex > -1) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(false) : undefined;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !PluginModule.extractEvents ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(false) : undefined;
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !bBee(publishedEvents[eventName], PluginModule, eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(false) : undefined;
    }
  }
}

function bBee(dispatchConfig, PluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? 'production' !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(false) : undefined;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        bYzX(phasedRegistrationName, PluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    bYzX(dispatchConfig.registrationName, PluginModule, eventName);
    return true;
  }
  return false;
}

function bYzX(registrationName, PluginModule, eventName) {
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
    !!baOJ ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(false) : undefined;

    baOJ = Array.prototype.slice.call(InjectedEventPluginOrder);
    beyn();
  },

  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (!b2ML.hasOwnProperty(pluginName) || b2ML[pluginName] !== PluginModule) {
        !!b2ML[pluginName] ? 'production' !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(false) : undefined;
        b2ML[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      beyn();
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
    baOJ = null;
    for (var pluginName in b2ML) {
      if (b2ML.hasOwnProperty(pluginName)) {
        delete b2ML[pluginName];
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
/**bandol> resource: node_modules/react/lib/EventPluginHub.js */

var b3Ng = {};

var bpNm = null;

var bmnx = function (event, simulated) {
  if (event) {
    EventPluginUtils.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var bnPv = function (e) {
  return bmnx(e, true);
};
var bzzE = function (e) {
  return bmnx(e, false);
};

var bvXV = null;

var EventPluginHub = {
  injection: {
    injectMount: EventPluginUtils.injection.injectMount,

    injectInstanceHandle: function (InjectedInstanceHandle) {
      bvXV = InjectedInstanceHandle;
    },

    getInstanceHandle: function () {
      return bvXV;
    },

    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

  registrationNameModules: EventPluginRegistry.registrationNameModules,

  putListener: function (id, registrationName, listener) {
    !(typeof listener === 'function') ? 'production' !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : invariant(false) : undefined;

    var bankForRegistrationName = b3Ng[registrationName] || (b3Ng[registrationName] = {});
    bankForRegistrationName[id] = listener;

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(id, registrationName, listener);
    }
  },

  getListener: function (id, registrationName) {
    var bankForRegistrationName = b3Ng[registrationName];
    return bankForRegistrationName && bankForRegistrationName[id];
  },

  deleteListener: function (id, registrationName) {
    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(id, registrationName);
    }

    var bankForRegistrationName = b3Ng[registrationName];

    if (bankForRegistrationName) {
      delete bankForRegistrationName[id];
    }
  },

  deleteAllListeners: function (id) {
    for (var registrationName in b3Ng) {
      if (!b3Ng[registrationName][id]) {
        continue;
      }

      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(id, registrationName);
      }

      delete b3Ng[registrationName][id];
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
      bpNm = accumulateInto(bpNm, events);
    }
  },

  processEventQueue: function (simulated) {
    var processingEventQueue = bpNm;
    bpNm = null;
    if (simulated) {
      forEachAccumulated(processingEventQueue, bnPv);
    } else {
      forEachAccumulated(processingEventQueue, bzzE);
    }
    !!bpNm ? 'production' !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(false) : undefined;

    ReactErrorUtils.rethrowCaughtError();
  },

  __purge: function () {
    b3Ng = {};
  },

  __getListenerBank: function () {
    return b3Ng;
  }

};
/**bandol> resource: node_modules/react/lib/ReactEventEmitterMixin.js */


function bAVL(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue(false);
}

var ReactEventEmitterMixin = {
  handleTopLevel: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
    bAVL(events);
  }
};
/**bandol> resource: node_modules/react/lib/ReactBrowserEventEmitter.js */


var blKg = {};
var bV38 = false;
var bgGK = 0;

var bMkZ = {
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

var b6QP = '_reactListenersID' + String(Math.random()).slice(2);

function bZPg(mountAt) {
  if (!Object.prototype.hasOwnProperty.call(mountAt, b6QP)) {
    mountAt[b6QP] = bgGK++;
    blKg[mountAt[b6QP]] = {};
  }
  return blKg[mountAt[b6QP]];
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
    var isListening = bZPg(mountAt);
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
        } else if (bMkZ.hasOwnProperty(dependency)) {
          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, bMkZ[dependency], mountAt);
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
    if (!bV38) {
      var refresh = ViewportMetrics.refreshScrollValues;
      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
      bV38 = true;
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
/**bandol> resource: node_modules/react/lib/ReactMount.js */


var bBne = DOMProperty.ID_ATTRIBUTE_NAME;
var bYQX = {};

var bO6g = 1;
var b8x6 = 9;
var bN0w = 11;

var bdJ9 = '__ReactMount_ownerDocument$' + Math.random().toString(36).slice(2);

var b9XZ = {};

var bEn0 = {};

var b7Pd = [];

function bLbO(string1, string2) {
  var minLen = Math.min(string1.length, string2.length);
  for (var i = 0; i < minLen; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      return i;
    }
  }
  return string1.length === string2.length ? -1 : minLen;
}

function b0Kg(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === b8x6) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function b148(container) {
  var rootElement = b0Kg(container);
  return rootElement && ReactMount.getID(rootElement);
}

function bwL2(node) {
  var id = bkvQ(node);
  if (id) {
    if (bYQX.hasOwnProperty(id)) {
      var cached = bYQX[id];
      if (cached !== node) {
        !!byEQ(cached, id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', bBne, id) : invariant(false) : undefined;

        bYQX[id] = node;
      }
    } else {
      bYQX[id] = node;
    }
  }

  return id;
}

function bkvQ(node) {
  return node && node.getAttribute && node.getAttribute(bBne) || '';
}

function b5rZ(node, id) {
  var oldID = bkvQ(node);
  if (oldID !== id) {
    delete bYQX[oldID];
  }
  node.setAttribute(bBne, id);
  bYQX[id] = node;
}

function bJbQ(id) {
  if (!bYQX.hasOwnProperty(id) || !byEQ(bYQX[id], id)) {
    bYQX[id] = ReactMount.findReactNodeByID(id);
  }
  return bYQX[id];
}

function bq8O(instance) {
  var id = ReactInstanceMap.get(instance)._rootNodeID;
  if (ReactEmptyComponentRegistry.isNullComponentID(id)) {
    return null;
  }
  if (!bYQX.hasOwnProperty(id) || !byEQ(bYQX[id], id)) {
    bYQX[id] = ReactMount.findReactNodeByID(id);
  }
  return bYQX[id];
}

function byEQ(node, id) {
  if (node) {
    !(bkvQ(node) === id) ? 'production' !== 'production' ? invariant(false, 'ReactMount: Unexpected modification of `%s`', bBne) : invariant(false) : undefined;

    var container = ReactMount.findReactContainerForID(id);
    if (container && containsNode(container, node)) {
      return true;
    }
  }

  return false;
}

function br4x(id) {
  delete bYQX[id];
}

var bQLd = null;
function bPM5(ancestorID) {
  var ancestor = bYQX[ancestorID];
  if (ancestor && byEQ(ancestor, ancestorID)) {
    bQLd = ancestor;
  } else {
    return false;
  }
}

function bx3V(targetID) {
  bQLd = null;
  ReactInstanceHandles.traverseAncestors(targetID, bPM5);

  var foundNode = bQLd;
  bQLd = null;
  return foundNode;
}

function bXr3(componentInstance, rootID, container, transaction, shouldReuseMarkup, context) {
  if (ReactDOMFeatureFlags.useCreateElement) {
    context = assign({}, context);
    if (container.nodeType === b8x6) {
      context[bdJ9] = container;
    } else {
      context[bdJ9] = container.ownerDocument;
    }
  }

  var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
  componentInstance._renderedComponent._topLevelWrapper = componentInstance;
  ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup, transaction);
}

function bRK9(componentInstance, rootID, container, shouldReuseMarkup, context) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(shouldReuseMarkup);
  transaction.perform(bXr3, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}

function bKer(instance, container) {
  ReactReconciler.unmountComponent(instance);

  if (container.nodeType === b8x6) {
    container = container.documentElement;
  }

  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

function b4O3(node) {
  var reactRootID = b148(node);
  return reactRootID ? reactRootID !== ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID) : false;
}

function bGVy(node) {
  for (; node && node.parentNode !== node; node = node.parentNode) {
    if (node.nodeType !== 1) {
      continue;
    }
    var nodeID = bkvQ(node);
    if (!nodeID) {
      continue;
    }
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);

    var current = node;
    var lastID;
    do {
      lastID = bkvQ(current);
      current = current.parentNode;
      if (current == null) {
        return null;
      }
    } while (lastID !== reactRootID);

    if (current === bEn0[reactRootID]) {
      return node;
    }
  }
  return null;
}

var bbkz = function () {};
bbkz.prototype.isReactComponent = {};

bbkz.prototype.render = function () {
  return this.props;
};

var ReactMount = {

  TopLevelWrapper: bbkz,

  _instancesByReactRootID: b9XZ,

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
    !(container && (container.nodeType === bO6g || container.nodeType === b8x6 || container.nodeType === bN0w)) ? 'production' !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : invariant(false) : undefined;

    ReactBrowserEventEmitter.ensureScrollValueMonitoring();

    var reactRootID = ReactMount.registerContainer(container);
    b9XZ[reactRootID] = nextComponent;
    return reactRootID;
  },

  _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {
    'production' !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

    var componentInstance = instantiateReactComponent(nextElement, null);
    var reactRootID = ReactMount._registerComponent(componentInstance, container);

    ReactUpdates.batchedUpdates(bRK9, componentInstance, reactRootID, container, shouldReuseMarkup, context);

    return componentInstance;
  },

  renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    !(parentComponent != null && parentComponent._reactInternalInstance != null) ? 'production' !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : invariant(false) : undefined;
    return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
  },

  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    !ReactElement.isValidElement(nextElement) ? 'production' !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : invariant(false) : undefined;

    'production' !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : undefined;

    var nextWrappedElement = new ReactElement(bbkz, null, null, null, null, null, nextElement);

    var prevComponent = b9XZ[b148(container)];

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

    var reactRootElement = b0Kg(container);
    var containerHasReactMarkup = reactRootElement && !!bkvQ(reactRootElement);
    var containerHasNonRootReactChild = b4O3(container);

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
    var reactRootID = b148(container);
    if (reactRootID) {
      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
    }
    if (!reactRootID) {
      reactRootID = ReactInstanceHandles.createReactRootID();
    }
    bEn0[reactRootID] = container;
    return reactRootID;
  },

  unmountComponentAtNode: function (container) {
    'production' !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

    !(container && (container.nodeType === bO6g || container.nodeType === b8x6 || container.nodeType === bN0w)) ? 'production' !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : invariant(false) : undefined;

    var reactRootID = b148(container);
    var component = b9XZ[reactRootID];
    if (!component) {
      var containerHasNonRootReactChild = b4O3(container);

      var containerID = bkvQ(container);
      var isContainerReactRoot = containerID && containerID === ReactInstanceHandles.getReactRootIDFromNodeID(containerID);

      return false;
    }
    ReactUpdates.batchedUpdates(bKer, component, container);
    delete b9XZ[reactRootID];
    delete bEn0[reactRootID];

    return true;
  },

  findReactContainerForID: function (id) {
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
    var container = bEn0[reactRootID];

    return container;
  },

  findReactNodeByID: function (id) {
    var reactRoot = ReactMount.findReactContainerForID(id);
    return ReactMount.findComponentRoot(reactRoot, id);
  },

  getFirstReactDOM: function (node) {
    return bGVy(node);
  },

  findComponentRoot: function (ancestorNode, targetID) {
    var firstChildren = b7Pd;
    var childIndex = 0;

    var deepestAncestor = bx3V(targetID) || ancestorNode;

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
    !(container && (container.nodeType === bO6g || container.nodeType === b8x6 || container.nodeType === bN0w)) ? 'production' !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : invariant(false) : undefined;

    if (shouldReuseMarkup) {
      var rootElement = b0Kg(container);
      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
        return;
      } else {
        var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

        var rootMarkup = rootElement.outerHTML;
        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);

        var normalizedMarkup = markup;


        var diffIndex = bLbO(normalizedMarkup, rootMarkup);
        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

        !(container.nodeType !== b8x6) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;
      }
    }

    !(container.nodeType !== b8x6) ? 'production' !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;

    if (transaction.useCreateElement) {
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
      container.appendChild(markup);
    } else {
      setInnerHTML(container, markup);
    }
  },

  ownerDocumentContextKey: bdJ9,

  getReactRootID: b148,

  getID: bwL2,

  setID: b5rZ,

  getNode: bJbQ,

  getNodeFromInstance: bq8O,

  isValid: byEQ,

  purgeID: br4x
};

ReactPerf.measureMethods(ReactMount, 'ReactMount', {
  _renderNewRootComponent: '_renderNewRootComponent',
  _mountImageIntoNode: '_mountImageIntoNode'
});
/**bandol> resource: node_modules/react/lib/EventPropagators.js */


var b66P = EventConstants.PropagationPhases;
var bZag = EventPluginHub.getListener;

function bA7L(id, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return bZag(id, registrationName);
}

function b3Lg(domID, upwards, event) {
  var phase = upwards ? b66P.bubbled : b66P.captured;
  var listener = bA7L(domID, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
  }
}

function bplm(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, b3Lg, event);
  }
}

function bm4x(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker, b3Lg, event);
  }
}

function bnkv(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = bZag(id, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
    }
  }
}

function bzYE(event) {
  if (event && event.dispatchConfig.registrationName) {
    bnkv(event.dispatchMarker, null, event);
  }
}

function bvYV(events) {
  forEachAccumulated(events, bplm);
}

function bapJ(events) {
  forEachAccumulated(events, bm4x);
}

function b2aL(leave, enter, fromID, toID) {
  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, bnkv, leave, enter);
}

function benn(events) {
  forEachAccumulated(events, bzYE);
}

var EventPropagators = {
  accumulateTwoPhaseDispatches: bvYV,
  accumulateTwoPhaseDispatchesSkipTarget: bapJ,
  accumulateDirectDispatches: benn,
  accumulateEnterLeaveDispatches: b2aL
};
/**bandol> resource: node_modules/fbjs/lib/EventListener.js */

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
/**bandol> resource: node_modules/react/lib/SimpleEventPlugin.js */


var bGay = EventConstants.topLevelTypes;

var bbJz = {
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

var bl2g = {
  topAbort: bbJz.abort,
  topBlur: bbJz.blur,
  topCanPlay: bbJz.canPlay,
  topCanPlayThrough: bbJz.canPlayThrough,
  topClick: bbJz.click,
  topContextMenu: bbJz.contextMenu,
  topCopy: bbJz.copy,
  topCut: bbJz.cut,
  topDoubleClick: bbJz.doubleClick,
  topDrag: bbJz.drag,
  topDragEnd: bbJz.dragEnd,
  topDragEnter: bbJz.dragEnter,
  topDragExit: bbJz.dragExit,
  topDragLeave: bbJz.dragLeave,
  topDragOver: bbJz.dragOver,
  topDragStart: bbJz.dragStart,
  topDrop: bbJz.drop,
  topDurationChange: bbJz.durationChange,
  topEmptied: bbJz.emptied,
  topEncrypted: bbJz.encrypted,
  topEnded: bbJz.ended,
  topError: bbJz.error,
  topFocus: bbJz.focus,
  topInput: bbJz.input,
  topKeyDown: bbJz.keyDown,
  topKeyPress: bbJz.keyPress,
  topKeyUp: bbJz.keyUp,
  topLoad: bbJz.load,
  topLoadedData: bbJz.loadedData,
  topLoadedMetadata: bbJz.loadedMetadata,
  topLoadStart: bbJz.loadStart,
  topMouseDown: bbJz.mouseDown,
  topMouseMove: bbJz.mouseMove,
  topMouseOut: bbJz.mouseOut,
  topMouseOver: bbJz.mouseOver,
  topMouseUp: bbJz.mouseUp,
  topPaste: bbJz.paste,
  topPause: bbJz.pause,
  topPlay: bbJz.play,
  topPlaying: bbJz.playing,
  topProgress: bbJz.progress,
  topRateChange: bbJz.rateChange,
  topReset: bbJz.reset,
  topScroll: bbJz.scroll,
  topSeeked: bbJz.seeked,
  topSeeking: bbJz.seeking,
  topStalled: bbJz.stalled,
  topSubmit: bbJz.submit,
  topSuspend: bbJz.suspend,
  topTimeUpdate: bbJz.timeUpdate,
  topTouchCancel: bbJz.touchCancel,
  topTouchEnd: bbJz.touchEnd,
  topTouchMove: bbJz.touchMove,
  topTouchStart: bbJz.touchStart,
  topVolumeChange: bbJz.volumeChange,
  topWaiting: bbJz.waiting,
  topWheel: bbJz.wheel
};

for (var bVq8 in bl2g) {
  bl2g[bVq8].dependencies = [bVq8];
}

var bg3K = keyOf({ onClick: null });
var bMMZ = {};

var SimpleEventPlugin = {

  eventTypes: bbJz,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var dispatchConfig = bl2g[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case bGay.topAbort:
      case bGay.topCanPlay:
      case bGay.topCanPlayThrough:
      case bGay.topDurationChange:
      case bGay.topEmptied:
      case bGay.topEncrypted:
      case bGay.topEnded:
      case bGay.topError:
      case bGay.topInput:
      case bGay.topLoad:
      case bGay.topLoadedData:
      case bGay.topLoadedMetadata:
      case bGay.topLoadStart:
      case bGay.topPause:
      case bGay.topPlay:
      case bGay.topPlaying:
      case bGay.topProgress:
      case bGay.topRateChange:
      case bGay.topReset:
      case bGay.topSeeked:
      case bGay.topSeeking:
      case bGay.topStalled:
      case bGay.topSubmit:
      case bGay.topSuspend:
      case bGay.topTimeUpdate:
      case bGay.topVolumeChange:
      case bGay.topWaiting:
        EventConstructor = SyntheticEvent;
        break;
      case bGay.topKeyPress:
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }

      case bGay.topKeyDown:
      case bGay.topKeyUp:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case bGay.topBlur:
      case bGay.topFocus:
        EventConstructor = SyntheticFocusEvent;
        break;
      case bGay.topClick:
        if (nativeEvent.button === 2) {
          return null;
        }

      case bGay.topContextMenu:
      case bGay.topDoubleClick:
      case bGay.topMouseDown:
      case bGay.topMouseMove:
      case bGay.topMouseOut:
      case bGay.topMouseOver:
      case bGay.topMouseUp:
        EventConstructor = SyntheticMouseEvent;
        break;
      case bGay.topDrag:
      case bGay.topDragEnd:
      case bGay.topDragEnter:
      case bGay.topDragExit:
      case bGay.topDragLeave:
      case bGay.topDragOver:
      case bGay.topDragStart:
      case bGay.topDrop:
        EventConstructor = SyntheticDragEvent;
        break;
      case bGay.topTouchCancel:
      case bGay.topTouchEnd:
      case bGay.topTouchMove:
      case bGay.topTouchStart:
        EventConstructor = SyntheticTouchEvent;
        break;
      case bGay.topScroll:
        EventConstructor = SyntheticUIEvent;
        break;
      case bGay.topWheel:
        EventConstructor = SyntheticWheelEvent;
        break;
      case bGay.topCopy:
      case bGay.topCut:
      case bGay.topPaste:
        EventConstructor = SyntheticClipboardEvent;
        break;
    }
    !EventConstructor ? 'production' !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(false) : undefined;
    var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent, nativeEventTarget);
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  },

  didPutListener: function (id, registrationName, listener) {
    if (registrationName === bg3K) {
      var node = ReactMount.getNode(id);
      if (!bMMZ[id]) {
        bMMZ[id] = EventListener.listen(node, 'click', emptyFunction);
      }
    }
  },

  willDeleteListener: function (id, registrationName) {
    if (registrationName === bg3K) {
      bMMZ[id].remove();
      delete bMMZ[id];
    }
  }

};
/**bandol> resource: node_modules/react/lib/ServerReactRootIndex.js */

var b4L3 = Math.pow(2, 53);

var ServerReactRootIndex = {
  createReactRootIndex: function () {
    return Math.ceil(Math.random() * b4L3);
  }
};
/**bandol> resource: node_modules/fbjs/lib/shallowEqual.js */


var bK7r = Object.prototype.hasOwnProperty;

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

  var bHasOwnProperty = bK7r.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}
/**bandol> resource: node_modules/react/lib/isTextInputElement.js */

var bR09 = {
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
  return nodeName && (nodeName === 'input' && bR09[elem.type] || nodeName === 'textarea');
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


var bXz3 = null;

function getTextContentAccessor() {
  if (!bXz3 && ExecutionEnvironment.canUseDOM) {
    bXz3 = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return bXz3;
}
/**bandol> resource: node_modules/react/lib/getNodeForCharacterOffset.js */

function bP75(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

function bxvV(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

function getNodeForCharacterOffset(root, offset) {
  var node = bP75(root);
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

    node = bP75(bxvV(node));
  }
}
/**bandol> resource: node_modules/react/lib/ReactDOMSelection.js */

function bGa8(anchorNode, anchorOffset, focusNode, focusOffset) {
  return anchorNode === focusNode && anchorOffset === focusOffset;
}

function bbJX(node) {
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

function bl2J(node) {
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

  var isSelectionCollapsed = bGa8(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);

  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var isTempRangeCollapsed = bGa8(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

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

function bVqg(node, offsets) {
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

function brKx(node, offsets) {
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

var bQRd = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);

var ReactDOMSelection = {
  getOffsets: bQRd ? bbJX : bl2J,

  setOffsets: bQRd ? bVqg : brKx
};
/**bandol> resource: node_modules/react/lib/ReactInputSelection.js */


function b4Lx(node) {
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
    if (curFocusedElem !== priorFocusedElem && b4Lx(priorFocusedElem)) {
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
/**bandol> resource: node_modules/react/lib/SelectEventPlugin.js */


var b5LK = EventConstants.topLevelTypes;

var bJ0z = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var bqlJ = {
  select: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSelect: null }),
      captured: keyOf({ onSelectCapture: null })
    },
    dependencies: [b5LK.topBlur, b5LK.topContextMenu, b5LK.topFocus, b5LK.topKeyDown, b5LK.topMouseDown, b5LK.topMouseUp, b5LK.topSelectionChange]
  }
};

var byyb = null;
var brKl = null;
var bQRw = null;
var bP7V = false;

var bxvA = false;
var bXzy = keyOf({ onSelect: null });

function bR0l(node) {
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

function bK7N(nativeEvent, nativeEventTarget) {
  if (bP7V || byyb == null || byyb !== getActiveElement()) {
    return null;
  }

  var currentSelection = bR0l(byyb);
  if (!bQRw || !shallowEqual(bQRw, currentSelection)) {
    bQRw = currentSelection;

    var syntheticEvent = SyntheticEvent.getPooled(bqlJ.select, brKl, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = byyb;

    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

var SelectEventPlugin = {

  eventTypes: bqlJ,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    if (!bxvA) {
      return null;
    }

    switch (topLevelType) {
      case b5LK.topFocus:
        if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
          byyb = topLevelTarget;
          brKl = topLevelTargetID;
          bQRw = null;
        }
        break;
      case b5LK.topBlur:
        byyb = null;
        brKl = null;
        bQRw = null;
        break;

      case b5LK.topMouseDown:
        bP7V = true;
        break;
      case b5LK.topContextMenu:
      case b5LK.topMouseUp:
        bP7V = false;
        return bK7N(nativeEvent, nativeEventTarget);

      case b5LK.topSelectionChange:
        if (bJ0z) {
          break;
        }

      case b5LK.topKeyDown:
      case b5LK.topKeyUp:
        return bK7N(nativeEvent, nativeEventTarget);
    }

    return null;
  },

  didPutListener: function (id, registrationName, listener) {
    if (registrationName === bXzy) {
      bxvA = true;
    }
  }
};
/**bandol> resource: node_modules/react/lib/ReactReconcileTransaction.js */

var bLwq = {
  initialize: ReactInputSelection.getSelectionInformation,

  close: ReactInputSelection.restoreSelection
};

var b088 = {
  initialize: function () {
    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
    ReactBrowserEventEmitter.setEnabled(false);
    return currentlyEnabled;
  },

  close: function (previouslyEnabled) {
    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
  }
};

var b194 = {
  initialize: function () {
    this.reactMountReady.reset();
  },

  close: function () {
    this.reactMountReady.notifyAll();
  }
};

var bwVR = [bLwq, b088, b194];

function ReactReconcileTransaction(forceHTML) {
  this.reinitializeTransaction();

  this.renderToStaticMarkup = false;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = !forceHTML && ReactDOMFeatureFlags.useCreateElement;
}

var bk29 = {
  getTransactionWrappers: function () {
    return bwVR;
  },

  getReactMountReady: function () {
    return this.reactMountReady;
  },

  destructor: function () {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(ReactReconcileTransaction.prototype, Transaction.Mixin, bk29);

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


var bOLb = 11;

function b853(node) {
  var nodeID = ReactMount.getID(node);
  var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
  var container = ReactMount.findReactContainerForID(rootID);
  var parent = ReactMount.getFirstReactDOM(container);
  return parent;
}

function bNvy(topLevelType, nativeEvent) {
  this.topLevelType = topLevelType;
  this.nativeEvent = nativeEvent;
  this.ancestors = [];
}
assign(bNvy.prototype, {
  destructor: function () {
    this.topLevelType = null;
    this.nativeEvent = null;
    this.ancestors.length = 0;
  }
});
PooledClass.addPoolingTo(bNvy, PooledClass.twoArgumentPooler);

function bdzO(bookKeeping) {

  void bEZz;
  b9an(bookKeeping);
}

function b9an(bookKeeping) {
  var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;

  var ancestor = topLevelTarget;
  while (ancestor) {
    bookKeeping.ancestors.push(ancestor);
    ancestor = b853(ancestor);
  }

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    topLevelTarget = bookKeeping.ancestors[i];
    var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

function bEZz(bookKeeping) {
  var path = bookKeeping.nativeEvent.path;
  var currentNativeTarget = path[0];
  var eventsFired = 0;
  for (var i = 0; i < path.length; i++) {
    var currentPathElement = path[i];
    if (currentPathElement.nodeType === bOLb) {
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

function b7ma(cb) {
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
    var callback = b7ma.bind(null, refresh);
    EventListener.listen(window, 'scroll', callback);
  },

  dispatchEvent: function (topLevelType, nativeEvent) {
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = bNvy.getPooled(topLevelType, nativeEvent);
    try {
      ReactUpdates.batchedUpdates(bdzO, bookKeeping);
    } finally {
      bNvy.release(bookKeeping);
    }
  }
};
/**bandol> resource: node_modules/react/lib/escapeTextContentForBrowser.js */


var be9P = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  '\'': '&#x27;'
};

var bBQ6 = /[&><"']/g;

function bY3V(match) {
  return be9P[match];
}

function escapeTextContentForBrowser(text) {
  return ('' + text).replace(bBQ6, bY3V);
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

var bnGw = /^[a-zA-Z_][\w\.\-]*$/;
var bzk5 = {};
var bv3v = {};

function baJR(attributeName) {
  if (bv3v.hasOwnProperty(attributeName)) {
    return true;
  }
  if (bzk5.hasOwnProperty(attributeName)) {
    return false;
  }
  if (bnGw.test(attributeName)) {
    bv3v[attributeName] = true;
    return true;
  }
  bzk5[attributeName] = true;
  'production' !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : undefined;
  return false;
}

function b2A1(propertyInfo, value) {
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
      if (b2A1(propertyInfo, value)) {
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
    if (!baJR(name) || value == null) {
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
      } else if (b2A1(propertyInfo, value)) {
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
    if (!baJR(name)) {
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
/**bandol> resource: node_modules/react/lib/ReactMultiChildUpdateTypes.js */

var ReactMultiChildUpdateTypes = keyMirror({
  INSERT_MARKUP: null,
  MOVE_EXISTING: null,
  REMOVE_NODE: null,
  SET_MARKUP: null,
  TEXT_CONTENT: null
});
/**bandol> resource: node_modules/fbjs/lib/getMarkupWrap.js */

var bgk8 = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

var bMYd = {};

var b6dE = [1, '<select multiple="true">', '</select>'];
var bZzy = [1, '<table>', '</table>'];
var bArv = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var b3Ov = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];

var bpR4 = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': b6dE,
  'option': b6dE,

  'caption': bZzy,
  'colgroup': bZzy,
  'tbody': bZzy,
  'tfoot': bZzy,
  'thead': bZzy,

  'td': bArv,
  'th': bArv
};

var bmP0 = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
bmP0.forEach(function (nodeName) {
  bpR4[nodeName] = b3Ov;
  bMYd[nodeName] = true;
});

function getMarkupWrap(nodeName) {
  !!!bgk8 ? 'production' !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : undefined;
  if (!bpR4.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!bMYd.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      bgk8.innerHTML = '<link />';
    } else {
      bgk8.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    bMYd[nodeName] = !bgk8.firstChild;
  }
  return bMYd[nodeName] ? bpR4[nodeName] : null;
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

function bVvg(obj) {
  return !!obj && (typeof obj == 'object' || typeof obj == 'function') && 'length' in obj && !('setInterval' in obj) && typeof obj.nodeType != 'number' && (Array.isArray(obj) || 'callee' in obj || 'item' in obj);
}

function createArrayFromMixed(obj) {
  if (!bVvg(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}
/**bandol> resource: node_modules/fbjs/lib/createNodesFromMarkup.js */

var bG78 = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

var bbvX = /^\s*<(\w+)/;

function blyJ(markup) {
  var nodeNameMatch = markup.match(bbvX);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

function createNodesFromMarkup(markup, handleScript) {
  var node = bG78;
  !!!bG78 ? 'production' !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : undefined;
  var nodeName = blyJ(markup);

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


var bR3l = /^(<[^ \/>]+)/;
var bKVN = 'data-danger-index';

function b4gx(markup) {
  return markup.substring(1, markup.indexOf(' '));
}

var Danger = {
  dangerouslyRenderMarkup: function (markupList) {
    !ExecutionEnvironment.canUseDOM ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString for server rendering.') : invariant(false) : undefined;
    var nodeName;
    var markupByNodeName = {};

    for (var i = 0; i < markupList.length; i++) {
      !markupList[i] ? 'production' !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(false) : undefined;
      nodeName = b4gx(markupList[i]);
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

          markupListByNodeName[resultIndex] = markup.replace(bR3l, '$1 ' + bKVN + '="' + resultIndex + '" ');
        }
      }

      var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction);

      for (var j = 0; j < renderNodes.length; ++j) {
        var renderNode = renderNodes[j];
        if (renderNode.hasAttribute && renderNode.hasAttribute(bKVN)) {

          resultIndex = +renderNode.getAttribute(bKVN);
          renderNode.removeAttribute(bKVN);

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
/**bandol> resource: node_modules/react/lib/DOMChildrenOperations.js */

function bXey(parentNode, childNode, index) {
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
          bXey(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
          break;
        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
          bXey(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
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
/**bandol> resource: node_modules/react/lib/ReactDOMIDOperations.js */

var bxqA = {
  dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
  style: '`style` must be set using `updateStylesByID()`.'
};

var ReactDOMIDOperations = {
  updatePropertyByID: function (id, name, value) {
    var node = ReactMount.getNode(id);
    !!bxqA.hasOwnProperty(name) ? 'production' !== 'production' ? invariant(false, 'updatePropertyByID(...): %s', bxqA[name]) : invariant(false) : undefined;

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
/**bandol> resource: node_modules/react/lib/ReactComponentBrowserEnvironment.js */

var ReactComponentBrowserEnvironment = {

  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,

  replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,

  unmountIDFromEnvironment: function (rootNodeID) {
    ReactMount.purgeID(rootNodeID);
  }

};
/**bandol> resource: node_modules/react/lib/ReactDOMTextComponent.js */

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
/**bandol> resource: node_modules/react/lib/validateDOMNesting.js */


var validateDOMNesting = emptyFunction;
/**bandol> resource: node_modules/react/lib/canDefineProperty.js */


var canDefineProperty = false;
/**bandol> resource: node_modules/react/lib/flattenChildren.js */

function bPBV(traverseContext, child, name) {
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
  traverseAllChildren(children, bPBV, result);
  return result;
}
/**bandol> resource: node_modules/react/lib/ReactChildReconciler.js */


function bQew(childInstances, child, name) {
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
    traverseAllChildren(nestedChildNodes, bQew, childInstances);
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
/**bandol> resource: node_modules/react/lib/ReactMultiChild.js */

var bLqq = 0;

var b0z8 = [];

var b1d4 = [];

function bwNR(parentID, markup, toIndex) {
  b0z8.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    markupIndex: b1d4.push(markup) - 1,
    content: null,
    fromIndex: null,
    toIndex: toIndex
  });
}

function bkr9(parentID, fromIndex, toIndex) {
  b0z8.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: toIndex
  });
}

function b5NK(parentID, fromIndex) {
  b0z8.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: null
  });
}

function bJlz(parentID, markup) {
  b0z8.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.SET_MARKUP,
    markupIndex: null,
    content: markup,
    fromIndex: null,
    toIndex: null
  });
}

function bqKJ(parentID, textContent) {
  b0z8.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
    markupIndex: null,
    content: textContent,
    fromIndex: null,
    toIndex: null
  });
}

function byMb() {
  if (b0z8.length) {
    ReactComponentEnvironment.processChildrenUpdates(b0z8, b1d4);
    brNl();
  }
}

function brNl() {
  b0z8.length = 0;
  b1d4.length = 0;
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
      bLqq++;
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
        bLqq--;
        if (!bLqq) {
          if (errorThrown) {
            brNl();
          } else {
            byMb();
          }
        }
      }
    },

    updateMarkup: function (nextMarkup) {
      bLqq++;
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
        bLqq--;
        if (!bLqq) {
          if (errorThrown) {
            brNl();
          } else {
            byMb();
          }
        }
      }
    },

    updateChildren: function (nextNestedChildrenElements, transaction, context) {
      bLqq++;
      var errorThrown = true;
      try {
        this._updateChildren(nextNestedChildrenElements, transaction, context);
        errorThrown = false;
      } finally {
        bLqq--;
        if (!bLqq) {
          if (errorThrown) {
            brNl();
          } else {
            byMb();
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
        bkr9(this._rootNodeID, child._mountIndex, toIndex);
      }
    },

    createChild: function (child, mountImage) {
      bwNR(this._rootNodeID, mountImage, child._mountIndex);
    },

    removeChild: function (child) {
      b5NK(this._rootNodeID, child._mountIndex);
    },

    setTextContent: function (textContent) {
      bqKJ(this._rootNodeID, textContent);
    },

    setMarkup: function (markup) {
      bJlz(this._rootNodeID, markup);
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
/**bandol> resource: node_modules/react/lib/LinkedValueUtils.js */


var bO0b = {
  'button': true,
  'checkbox': true,
  'image': true,
  'hidden': true,
  'radio': true,
  'reset': true,
  'submit': true
};

function b8a3(inputProps) {
  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(false) : undefined;
}
function bNMy(inputProps) {
  b8a3(inputProps);
  !(inputProps.value == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(false) : undefined;
}

function bd5O(inputProps) {
  b8a3(inputProps);
  !(inputProps.checked == null && inputProps.onChange == null) ? 'production' !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(false) : undefined;
}

var b9Nn = {
  value: function (props, propName, componentName) {
    if (!props[propName] || bO0b[props.type] || props.onChange || props.readOnly || props.disabled) {
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

var bE7z = {};
function b7Ma(owner) {
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
    for (var propName in b9Nn) {
      if (b9Nn.hasOwnProperty(propName)) {
        var error = b9Nn[propName](props, propName, tagName, ReactPropTypeLocations.prop);
      }
      if (error instanceof Error && !(error.message in bE7z)) {
        bE7z[error.message] = true;

        var addendum = b7Ma(owner);
        'production' !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : undefined;
      }
    }
  },

  getValue: function (inputProps) {
    if (inputProps.valueLink) {
      bNMy(inputProps);
      return inputProps.valueLink.value;
    }
    return inputProps.value;
  },

  getChecked: function (inputProps) {
    if (inputProps.checkedLink) {
      bd5O(inputProps);
      return inputProps.checkedLink.value;
    }
    return inputProps.checked;
  },

  executeOnChange: function (inputProps, event) {
    if (inputProps.valueLink) {
      bNMy(inputProps);
      return inputProps.valueLink.requestChange(event.target.value);
    } else if (inputProps.checkedLink) {
      bd5O(inputProps);
      return inputProps.checkedLink.requestChange(event.target.checked);
    } else if (inputProps.onChange) {
      return inputProps.onChange.call(undefined, event);
    }
  }
};
/**bandol> resource: node_modules/react/lib/ReactDOMTextarea.js */


function bB76() {
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
      onChange: bY0V.bind(inst)
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

function bY0V(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);
  ReactUpdates.asap(bB76, this);
  return returnValue;
}
/**bandol> resource: node_modules/react/lib/ReactDOMSelect.js */


var bnxw = '__ReactDOMSelect_value$' + Math.random().toString(36).slice(2);

function bzG5() {
  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
    this._wrapperState.pendingUpdate = false;

    var props = this._currentElement.props;
    var value = LinkedValueUtils.getValue(props);

    if (value != null) {
      b2G1(this, Boolean(props.multiple), value);
    }
  }
}

function b2G1(inst, multiple, propValue) {
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
  valueContextKey: bnxw,

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
      onChange: be3P.bind(inst),
      wasMultiple: Boolean(props.multiple)
    };
  },

  processChildContext: function (inst, props, context) {
    var childContext = assign({}, context);
    childContext[bnxw] = inst._wrapperState.initialValue;
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
      b2G1(inst, Boolean(props.multiple), value);
    } else if (wasMultiple !== Boolean(props.multiple)) {
      if (props.defaultValue != null) {
        b2G1(inst, Boolean(props.multiple), props.defaultValue);
      } else {
        b2G1(inst, Boolean(props.multiple), props.multiple ? [] : '');
      }
    }
  }
};

function be3P(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  this._wrapperState.pendingUpdate = true;
  ReactUpdates.asap(bzG5, this);
  return returnValue;
}
/**bandol> resource: node_modules/react/lib/ReactDOMOption.js */


var bm60 = ReactDOMSelect.valueContextKey;

var ReactDOMOption = {
  mountWrapper: function (inst, props, context) {
    var selectValue = context[bm60];

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
/**bandol> resource: node_modules/react/lib/ReactDOMInput.js */


var bAdv = {};

function b3bv() {
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
      onChange: bpa4.bind(inst)
    };
  },

  mountReadyWrapper: function (inst) {
    bAdv[inst._rootNodeID] = inst;
  },

  unmountWrapper: function (inst) {
    delete bAdv[inst._rootNodeID];
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

function bpa4(event) {
  var props = this._currentElement.props;

  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  ReactUpdates.asap(b3bv, this);

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
      var otherInstance = bAdv[otherID];
      !otherInstance ? 'production' !== 'production' ? invariant(false, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(false) : undefined;

      ReactUpdates.asap(b3bv, otherInstance);
    }
  }

  return returnValue;
}
/**bandol> resource: node_modules/react/lib/ReactDOMButton.js */


var bZpy = {
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
      if (props.hasOwnProperty(key) && !bZpy[key]) {
        nativeProps[key] = props[key];
      }
    }

    return nativeProps;
  }
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


var b6NE = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(b6NE, '-$1').toLowerCase();
}
/**bandol> resource: node_modules/fbjs/lib/hyphenateStyleName.js */


var bMQd = /^ms-/;

function hyphenateStyleName(string) {
  return hyphenate(string).replace(bMQd, '-ms-');
}
/**bandol> resource: node_modules/react/lib/CSSProperty.js */

var bblX = {
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

function blvJ(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

var bVRg = ['Webkit', 'ms', 'Moz', 'O'];

Object.keys(bblX).forEach(function (prop) {
  bVRg.forEach(function (prefix) {
    bblX[blvJ(prefix, prop)] = bblX[prop];
  });
});

var bg58 = {
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
  isUnitlessNumber: bblX,
  shorthandPropertyExpansions: bg58
};
/**bandol> resource: node_modules/react/lib/dangerousStyleValue.js */


var bGX8 = CSSProperty.isUnitlessNumber;

function dangerousStyleValue(name, value) {

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || bGX8.hasOwnProperty(name) && bGX8[name]) {
    return '' + value;
  }

  if (typeof value === 'string') {
    value = value.trim();
  }
  return value + 'px';
}
/**bandol> resource: node_modules/react/lib/CSSPropertyOperations.js */


var bXay = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

var bRvl = false;
var bKkN = 'cssFloat';
if (ExecutionEnvironment.canUseDOM) {
  var b4Ax = document.createElement('div').style;
  try {
    b4Ax.font = '';
  } catch (e) {
    bRvl = true;
  }

  if (document.documentElement.style.cssFloat === undefined) {
    bKkN = 'styleFloat';
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
        serialized += bXay(styleName) + ':';
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
        styleName = bKkN;
      }
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = bRvl && CSSProperty.shorthandPropertyExpansions[styleName];
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


var bxKA = {
  componentDidMount: function () {
    if (this.props.autoFocus) {
      focusNode(findDOMNode(this));
    }
  }
};

var AutoFocusUtils = {
  Mixin: bxKA,

  focusDOMComponent: function () {
    focusNode(ReactMount.getNode(this._rootNodeID));
  }
};
/**bandol> resource: node_modules/react/lib/ReactDOMComponent.js */


var b8AY = ReactBrowserEventEmitter.deleteListener;
var bNPx = ReactBrowserEventEmitter.listenTo;
var bdZ0 = ReactBrowserEventEmitter.registrationNameModules;

var b9ld = { 'string': true, 'number': true };

var bEze = keyOf({ children: null });
var b7GY = keyOf({ style: null });
var bL7m = keyOf({ __html: null });

var b0A1 = 1;

function b1q2(internalInstance) {
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

function bwg8() {
  return this;
}

function bkg8() {
  var component = this._reactInternalComponent;

  return !!component;
}

function b5ma() {}

function bJ2L(partialProps, callback) {
  var component = this._reactInternalComponent;

  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function bqqn(partialProps, callback) {
  var component = this._reactInternalComponent;

  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function byqY(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return '[' + obj.map(byqY).join(', ') + ']';
    } else {
      var pairs = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
          pairs.push(keyEscaped + ': ' + byqY(obj[key]));
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

function bQvr(component, props) {
  if (!props) {
    return;
  }

  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? 'production' !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(false) : undefined;
    !(typeof props.dangerouslySetInnerHTML === 'object' && bL7m in props.dangerouslySetInnerHTML) ? 'production' !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' + 'for more information.') : invariant(false) : undefined;
  }

  !(props.style == null || typeof props.style === 'object') ? 'production' !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, ' + 'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' + 'using JSX.%s', b1q2(component)) : invariant(false) : undefined;
}

function bPqq(id, registrationName, listener, transaction) {
  var container = ReactMount.findReactContainerForID(id);
  if (container) {
    var doc = container.nodeType === b0A1 ? container.ownerDocument : container;
    bNPx(registrationName, doc);
  }
  transaction.getReactMountReady().enqueue(bxKq, {
    id: id,
    registrationName: registrationName,
    listener: listener
  });
}

function bxKq() {
  var listenerToPut = this;
  ReactBrowserEventEmitter.putListener(listenerToPut.id, listenerToPut.registrationName, listenerToPut.listener);
}

var bXaz = {
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

function bRvK() {
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

      for (var event in bXaz) {
        if (bXaz.hasOwnProperty(event)) {
          inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes[event], bXaz[event], node));
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

function bKkv() {
  ReactDOMInput.mountReadyWrapper(this);
}

function b4Al() {
  ReactDOMSelect.postUpdateWrapper(this);
}

var bGXZ = {
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

var bble = {
  'listing': true,
  'pre': true,
  'textarea': true
};

var blvM = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
var bVR4 = {};
var brgl = {}.hasOwnProperty;

function bQvw(tag) {
  if (!brgl.call(bVR4, tag)) {
    !blvM.test(tag) ? 'production' !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : invariant(false) : undefined;
    bVR4[tag] = true;
  }
}

function bPqV(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

function ReactDOMComponent(tag) {
  bQvw(tag);
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
        transaction.getReactMountReady().enqueue(bRvK, this);
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

    bQvr(this, props);


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
      if (!tagContent && bGXZ[this._tag]) {
        mountImage = tagOpen + '/>';
      } else {
        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
      }
    }

    switch (this._tag) {
      case 'input':
        transaction.getReactMountReady().enqueue(bKkv, this);

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
      if (bdZ0.hasOwnProperty(propKey)) {
        if (propValue) {
          bPqq(this._rootNodeID, propKey, propValue, transaction);
        }
      } else {
        if (propKey === b7GY) {
          if (propValue) {
            propValue = this._previousStyleCopy = assign({}, props.style);
          }
          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
        }
        var markup = null;
        if (this._tag != null && bPqV(this._tag, props)) {
          if (propKey !== bEze) {
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
      var contentToUse = b9ld[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        ret = escapeTextContentForBrowser(contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        ret = mountImages.join('');
      }
    }
    if (bble[this._tag] && ret.charAt(0) === '\n') {
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
      var contentToUse = b9ld[typeof props.children] ? props.children : null;
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

    bQvr(this, nextProps);
    this._updateDOMProperties(lastProps, nextProps, transaction, null);
    this._updateDOMChildren(lastProps, nextProps, transaction, context);

    if (!canDefineProperty && this._nodeWithLegacyProperties) {
      this._nodeWithLegacyProperties.props = nextProps;
    }

    if (this._tag === 'select') {
      transaction.getReactMountReady().enqueue(b4Al, this);
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
      if (propKey === b7GY) {
        var lastStyle = this._previousStyleCopy;
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
        this._previousStyleCopy = null;
      } else if (bdZ0.hasOwnProperty(propKey)) {
        if (lastProps[propKey]) {
          b8AY(this._rootNodeID, propKey);
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
      var lastProp = propKey === b7GY ? this._previousStyleCopy : lastProps[propKey];
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
        continue;
      }
      if (propKey === b7GY) {
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
      } else if (bdZ0.hasOwnProperty(propKey)) {
        if (nextProp) {
          bPqq(this._rootNodeID, propKey, nextProp, transaction);
        } else if (lastProp) {
          b8AY(this._rootNodeID, propKey);
        }
      } else if (bPqV(this._tag, nextProps)) {
        if (!node) {
          node = ReactMount.getNode(this._rootNodeID);
        }
        if (propKey === bEze) {
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
    var lastContent = b9ld[typeof lastProps.children] ? lastProps.children : null;
    var nextContent = b9ld[typeof nextProps.children] ? nextProps.children : null;

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
      node.getDOMNode = bwg8;
      node.isMounted = bkg8;
      node.setState = b5ma;
      node.replaceState = b5ma;
      node.forceUpdate = b5ma;
      node.setProps = bJ2L;
      node.replaceProps = bqqn;

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
/**bandol> resource: node_modules/react/lib/ReactBrowserComponentMixin.js */


var bOZG = '_getDOMNodeDidWarn';

var ReactBrowserComponentMixin = {
  getDOMNode: function () {
    'production' !== 'production' ? warning(this.constructor[bOZG], '%s.getDOMNode(...) is deprecated. Please use ' + 'ReactDOM.findDOMNode(instance) instead.', ReactInstanceMap.get(this).getName() || this.tagName || 'Unknown') : undefined;
    this.constructor[bOZG] = true;
    return findDOMNode(this);
  }
};
/**bandol> resource: node_modules/react/lib/HTMLDOMPropertyConfig.js */


var bm2y = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var bnJg = DOMProperty.injection.MUST_USE_PROPERTY;
var bzE4 = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var bva9 = DOMProperty.injection.HAS_SIDE_EFFECTS;
var ba6d = DOMProperty.injection.HAS_NUMERIC_VALUE;
var b2Nk = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
var beYl = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var bB4E;
if (ExecutionEnvironment.canUseDOM) {
  var bYn4 = document.implementation;
  bB4E = bYn4 && bYn4.hasFeature && bYn4.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
}

var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
  Properties: {
    accept: null,
    acceptCharset: null,
    accessKey: null,
    action: null,
    allowFullScreen: bm2y | bzE4,
    allowTransparency: bm2y,
    alt: null,
    async: bzE4,
    autoComplete: null,

    autoPlay: bzE4,
    capture: bm2y | bzE4,
    cellPadding: null,
    cellSpacing: null,
    charSet: bm2y,
    challenge: bm2y,
    checked: bnJg | bzE4,
    classID: bm2y,

    className: bB4E ? bm2y : bnJg,
    cols: bm2y | b2Nk,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: bm2y,
    controls: bnJg | bzE4,
    coords: null,
    crossOrigin: null,
    data: null,
    dateTime: bm2y,
    'default': bzE4,
    defer: bzE4,
    dir: null,
    disabled: bm2y | bzE4,
    download: beYl,
    draggable: null,
    encType: null,
    form: bm2y,
    formAction: bm2y,
    formEncType: bm2y,
    formMethod: bm2y,
    formNoValidate: bzE4,
    formTarget: bm2y,
    frameBorder: bm2y,
    headers: null,
    height: bm2y,
    hidden: bm2y | bzE4,
    high: null,
    href: null,
    hrefLang: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: bnJg,
    inputMode: bm2y,
    integrity: null,
    is: bm2y,
    keyParams: bm2y,
    keyType: bm2y,
    kind: null,
    label: null,
    lang: null,
    list: bm2y,
    loop: bnJg | bzE4,
    low: null,
    manifest: bm2y,
    marginHeight: null,
    marginWidth: null,
    max: null,
    maxLength: bm2y,
    media: bm2y,
    mediaGroup: null,
    method: null,
    min: null,
    minLength: bm2y,
    multiple: bnJg | bzE4,
    muted: bnJg | bzE4,
    name: null,
    nonce: bm2y,
    noValidate: bzE4,
    open: bzE4,
    optimum: null,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: bnJg | bzE4,
    rel: null,
    required: bzE4,
    reversed: bzE4,
    role: bm2y,
    rows: bm2y | b2Nk,
    rowSpan: null,
    sandbox: null,
    scope: null,
    scoped: bzE4,
    scrolling: null,
    seamless: bm2y | bzE4,
    selected: bnJg | bzE4,
    shape: null,
    size: bm2y | b2Nk,
    sizes: bm2y,
    span: b2Nk,
    spellCheck: null,
    src: null,
    srcDoc: bnJg,
    srcLang: null,
    srcSet: bm2y,
    start: ba6d,
    step: null,
    style: null,
    summary: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    useMap: null,
    value: bnJg | bva9,
    width: bm2y,
    wmode: bm2y,
    wrap: null,

    about: bm2y,
    datatype: bm2y,
    inlist: bm2y,
    prefix: bm2y,

    property: bm2y,
    resource: bm2y,
    'typeof': bm2y,
    vocab: bm2y,

    autoCapitalize: bm2y,
    autoCorrect: bm2y,

    autoSave: null,

    color: null,

    itemProp: bm2y,
    itemScope: bm2y | bzE4,
    itemType: bm2y,

    itemID: bm2y,
    itemRef: bm2y,

    results: null,

    security: bm2y,

    unselectable: bm2y
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


var bZ6X = EventConstants.topLevelTypes;
var bAmk = ReactMount.getFirstReactDOM;

var b3Y5 = {
  mouseEnter: {
    registrationName: keyOf({ onMouseEnter: null }),
    dependencies: [bZ6X.topMouseOut, bZ6X.topMouseOver]
  },
  mouseLeave: {
    registrationName: keyOf({ onMouseLeave: null }),
    dependencies: [bZ6X.topMouseOut, bZ6X.topMouseOver]
  }
};

var bpy2 = [null, null];

var EnterLeaveEventPlugin = {

  eventTypes: b3Y5,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    if (topLevelType === bZ6X.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== bZ6X.topMouseOut && topLevelType !== bZ6X.topMouseOver) {
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
    if (topLevelType === bZ6X.topMouseOut) {
      from = topLevelTarget;
      fromID = topLevelTargetID;
      to = bAmk(nativeEvent.relatedTarget || nativeEvent.toElement);
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

    var leave = SyntheticMouseEvent.getPooled(b3Y5.mouseLeave, fromID, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = from;
    leave.relatedTarget = to;

    var enter = SyntheticMouseEvent.getPooled(b3Y5.mouseEnter, toID, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = to;
    enter.relatedTarget = from;

    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

    bpy2[0] = leave;
    bpy2[1] = enter;

    return bpy2;
  }

};
/**bandol> resource: node_modules/react/lib/DefaultEventPluginOrder.js */

var DefaultEventPluginOrder = [keyOf({ ResponderEventPlugin: null }), keyOf({ SimpleEventPlugin: null }), keyOf({ TapEventPlugin: null }), keyOf({ EnterLeaveEventPlugin: null }), keyOf({ ChangeEventPlugin: null }), keyOf({ SelectEventPlugin: null }), keyOf({ BeforeInputEventPlugin: null })];
/**bandol> resource: node_modules/react/lib/ClientReactRootIndex.js */


var b63p = 0;

var ClientReactRootIndex = {
  createReactRootIndex: function () {
    return b63p++;
  }
};
/**bandol> resource: node_modules/react/lib/ChangeEventPlugin.js */


var b7Y = EventConstants.topLevelTypes;

var bLm = {
  change: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onChange: null }),
      captured: keyOf({ onChangeCapture: null })
    },
    dependencies: [b7Y.topBlur, b7Y.topChange, b7Y.topClick, b7Y.topFocus, b7Y.topInput, b7Y.topKeyDown, b7Y.topKeyUp, b7Y.topSelectionChange]
  }
};

var b01 = null;
var b12 = null;
var bw8 = null;
var bk8 = null;

function b5a(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

var bJL = false;
if (ExecutionEnvironment.canUseDOM) {
  bJL = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
}

function bqn(nativeEvent) {
  var event = SyntheticEvent.getPooled(bLm.change, b12, nativeEvent, getEventTarget(nativeEvent));
  EventPropagators.accumulateTwoPhaseDispatches(event);

  ReactUpdates.batchedUpdates(byY, event);
}

function byY(event) {
  EventPluginHub.enqueueEvents(event);
  EventPluginHub.processEventQueue(false);
}

function brVe(target, targetID) {
  b01 = target;
  b12 = targetID;
  b01.attachEvent('onchange', bqn);
}

function bQrr() {
  if (!b01) {
    return;
  }
  b01.detachEvent('onchange', bqn);
  b01 = null;
  b12 = null;
}

function bPXq(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === b7Y.topChange) {
    return topLevelTargetID;
  }
}
function bxgq(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === b7Y.topFocus) {
    bQrr();
    brVe(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === b7Y.topBlur) {
    bQrr();
  }
}

var bX4z = false;
if (ExecutionEnvironment.canUseDOM) {
  bX4z = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
}

var bRyK = {
  get: function () {
    return bk8.get.call(this);
  },
  set: function (val) {
    bw8 = '' + val;
    bk8.set.call(this, val);
  }
};

function bKLv(target, targetID) {
  b01 = target;
  b12 = targetID;
  bw8 = target.value;
  bk8 = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');

  Object.defineProperty(b01, 'value', bRyK);
  b01.attachEvent('onpropertychange', bGKZ);
}

function b45l() {
  if (!b01) {
    return;
  }

  delete b01.value;
  b01.detachEvent('onpropertychange', bGKZ);

  b01 = null;
  b12 = null;
  bw8 = null;
  bk8 = null;
}

function bGKZ(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  var value = nativeEvent.srcElement.value;
  if (value === bw8) {
    return;
  }
  bw8 = value;

  bqn(nativeEvent);
}

function bb3e(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === b7Y.topInput) {
    return topLevelTargetID;
  }
}

function blYM(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === b7Y.topFocus) {
    b45l();
    bKLv(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === b7Y.topBlur) {
    b45l();
  }
}

function bVl4(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === b7Y.topSelectionChange || topLevelType === b7Y.topKeyUp || topLevelType === b7Y.topKeyDown) {
    if (b01 && b01.value !== bw8) {
      bw8 = b01.value;
      return b12;
    }
  }
}

function bgnL(elem) {
  return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function bMla(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === b7Y.topClick) {
    return topLevelTargetID;
  }
}

var ChangeEventPlugin = {

  eventTypes: bLm,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {

    var getTargetIDFunc, handleEventFunc;
    if (b5a(topLevelTarget)) {
      if (bJL) {
        getTargetIDFunc = bPXq;
      } else {
        handleEventFunc = bxgq;
      }
    } else if (isTextInputElement(topLevelTarget)) {
      if (bX4z) {
        getTargetIDFunc = bb3e;
      } else {
        getTargetIDFunc = bVl4;
        handleEventFunc = blYM;
      }
    } else if (bgnL(topLevelTarget)) {
      getTargetIDFunc = bMla;
    }

    if (getTargetIDFunc) {
      var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
      if (targetID) {
        var event = SyntheticEvent.getPooled(bLm.change, targetID, nativeEvent, nativeEventTarget);
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
/**bandol> resource: node_modules/react/lib/SyntheticInputEvent.js */

var bEe = {
  data: null
};

function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticInputEvent, bEe);
/**bandol> resource: node_modules/react/lib/SyntheticCompositionEvent.js */

var b9d = {
  data: null
};

function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticCompositionEvent, b9d);
/**bandol> resource: node_modules/react/lib/FallbackCompositionState.js */

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
/**bandol> resource: node_modules/react/lib/BeforeInputEventPlugin.js */


var blM = [9, 13, 27, 32];
var bV4 = 229;

var bgL = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var bMa = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  bMa = document.documentMode;
}

var b6p = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !bMa && !bAk();

var bZX = ExecutionEnvironment.canUseDOM && (!bgL || bMa && bMa > 8 && bMa <= 11);

function bAk() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var b35 = 32;
var bp2 = String.fromCharCode(b35);

var bmy = EventConstants.topLevelTypes;

var bng = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onBeforeInput: null }),
      captured: keyOf({ onBeforeInputCapture: null })
    },
    dependencies: [bmy.topCompositionEnd, bmy.topKeyPress, bmy.topTextInput, bmy.topPaste]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionEnd: null }),
      captured: keyOf({ onCompositionEndCapture: null })
    },
    dependencies: [bmy.topBlur, bmy.topCompositionEnd, bmy.topKeyDown, bmy.topKeyPress, bmy.topKeyUp, bmy.topMouseDown]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionStart: null }),
      captured: keyOf({ onCompositionStartCapture: null })
    },
    dependencies: [bmy.topBlur, bmy.topCompositionStart, bmy.topKeyDown, bmy.topKeyPress, bmy.topKeyUp, bmy.topMouseDown]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionUpdate: null }),
      captured: keyOf({ onCompositionUpdateCapture: null })
    },
    dependencies: [bmy.topBlur, bmy.topCompositionUpdate, bmy.topKeyDown, bmy.topKeyPress, bmy.topKeyUp, bmy.topMouseDown]
  }
};

var bz4 = false;

function bv9(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

function bad(topLevelType) {
  switch (topLevelType) {
    case bmy.topCompositionStart:
      return bng.compositionStart;
    case bmy.topCompositionEnd:
      return bng.compositionEnd;
    case bmy.topCompositionUpdate:
      return bng.compositionUpdate;
  }
}

function b2k(topLevelType, nativeEvent) {
  return topLevelType === bmy.topKeyDown && nativeEvent.keyCode === bV4;
}

function bel(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case bmy.topKeyUp:
      return blM.indexOf(nativeEvent.keyCode) !== -1;
    case bmy.topKeyDown:
      return nativeEvent.keyCode !== bV4;
    case bmy.topKeyPress:
    case bmy.topMouseDown:
    case bmy.topBlur:
      return true;
    default:
      return false;
  }
}

function bBE(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

var bY4 = null;

function bOG(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (bgL) {
    eventType = bad(topLevelType);
  } else if (!bY4) {
    if (b2k(topLevelType, nativeEvent)) {
      eventType = bng.compositionStart;
    }
  } else if (bel(topLevelType, nativeEvent)) {
    eventType = bng.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (bZX) {
    if (!bY4 && eventType === bng.compositionStart) {
      bY4 = FallbackCompositionState.getPooled(topLevelTarget);
    } else if (eventType === bng.compositionEnd) {
      if (bY4) {
        fallbackData = bY4.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    event.data = fallbackData;
  } else {
    var customData = bBE(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

function b8Y(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case bmy.topCompositionEnd:
      return bBE(nativeEvent);
    case bmy.topKeyPress:
      var which = nativeEvent.which;
      if (which !== b35) {
        return null;
      }

      bz4 = true;
      return bp2;

    case bmy.topTextInput:
      var chars = nativeEvent.data;

      if (chars === bp2 && bz4) {
        return null;
      }

      return chars;

    default:
      return null;
  }
}

function bNx(topLevelType, nativeEvent) {
  if (bY4) {
    if (topLevelType === bmy.topCompositionEnd || bel(topLevelType, nativeEvent)) {
      var chars = bY4.getData();
      FallbackCompositionState.release(bY4);
      bY4 = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case bmy.topPaste:
      return null;
    case bmy.topKeyPress:
      if (nativeEvent.which && !bv9(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case bmy.topCompositionEnd:
      return bZX ? null : nativeEvent.data;
    default:
      return null;
  }
}

function bd0(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var chars;

  if (b6p) {
    chars = b8Y(topLevelType, nativeEvent);
  } else {
    chars = bNx(topLevelType, nativeEvent);
  }

  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(bng.beforeInput, topLevelTargetID, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

var BeforeInputEventPlugin = {

  eventTypes: bng,

  extractEvents: function (topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    return [bOG(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget), bd0(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget)];
  }
};
/**bandol> resource: node_modules/react/lib/ReactDefaultInjection.js */


var bGZ = false;

function bbe() {
  if (bGZ) {
    return;
  }
  bGZ = true;

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

var bxq = {
  inject: bbe
};
/**bandol> resource: node_modules/react/lib/ReactDOMServer.js */


bxq.inject();

var ReactDOMServer = {
  renderToString: bPq.renderToString,
  renderToStaticMarkup: bPq.renderToStaticMarkup,
  version: bQr
};
/**bandol> resource: node_modules/react/lib/renderSubtreeIntoContainer.js */
var bXz = ReactMount.renderSubtreeIntoContainer;
/**bandol> resource: node_modules/react/lib/ReactDOM.js */


bxq.inject();

var b4l = ReactPerf.measure('React', 'render', ReactMount.render);

var bRK = {
  findDOMNode: findDOMNode,
  render: b4l,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: bQr,

  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: bXz
};
/**bandol> resource: node_modules/react/lib/React.js */

var React = {};

assign(React, bKv);

assign(React, {
  findDOMNode: deprecated('findDOMNode', 'ReactDOM', 'react-dom', bRK, bRK.findDOMNode),
  render: deprecated('render', 'ReactDOM', 'react-dom', bRK, bRK.render),
  unmountComponentAtNode: deprecated('unmountComponentAtNode', 'ReactDOM', 'react-dom', bRK, bRK.unmountComponentAtNode),

  renderToString: deprecated('renderToString', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToString),
  renderToStaticMarkup: deprecated('renderToStaticMarkup', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToStaticMarkup)
});

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bRK;
React.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMServer;
/**bandol> resource: actual.js */


bRK.render(React.createElement('h1', null, 'Hello Bandol'), document.getElementById('content'));

}());