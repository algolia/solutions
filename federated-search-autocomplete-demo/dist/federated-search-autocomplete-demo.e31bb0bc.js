// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@algolia/autocomplete-shared/dist/esm/createRef.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRef = createRef;

function createRef(initialValue) {
  return {
    current: initialValue
  };
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;

function debounce(fn, time) {
  var timerId = undefined;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
      return fn.apply(void 0, args);
    }, time);
  };
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/generateAutocompleteId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAutocompleteId = generateAutocompleteId;
var autocompleteId = 0;

function generateAutocompleteId() {
  return "autocomplete-".concat(autocompleteId++);
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/getAttributeValueByPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAttributeValueByPath = getAttributeValueByPath;

function getAttributeValueByPath(record, path) {
  return path.reduce(function (current, key) {
    return current && current[key];
  }, record);
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/getItemsCount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemsCount = getItemsCount;

function getItemsCount(state) {
  if (state.collections.length === 0) {
    return 0;
  }

  return state.collections.reduce(function (sum, collection) {
    return sum + collection.items.length;
  }, 0);
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/invariant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invariant = invariant;

/**
 * Throws an error if the condition is not met in development mode.
 * This is used to make development a better experience to provide guidance as
 * to where the error comes from.
 */
function invariant(condition, message) {
  if (!("development" !== 'production')) {
    return;
  }

  if (!condition) {
    throw new Error("[Autocomplete] ".concat(message));
  }
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/isEqual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = isEqual;

function isPrimitive(obj) {
  return obj !== Object(obj);
}

function isEqual(first, second) {
  if (first === second) {
    return true;
  }

  if (isPrimitive(first) || isPrimitive(second) || typeof first === 'function' || typeof second === 'function') {
    return first === second;
  }

  if (Object.keys(first).length !== Object.keys(second).length) {
    return false;
  }

  for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];

    if (!(key in second)) {
      return false;
    }

    if (!isEqual(first[key], second[key])) {
      return false;
    }
  }

  return true;
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/MaybePromise.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/warn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.warnCache = void 0;
var warnCache = {
  current: {}
};
/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 */

exports.warnCache = warnCache;

function warn(condition, message) {
  if (!("development" !== 'production')) {
    return;
  }

  if (condition) {
    return;
  }

  var sanitizedMessage = message.trim();
  var hasAlreadyPrinted = warnCache.current[sanitizedMessage];

  if (!hasAlreadyPrinted) {
    warnCache.current[sanitizedMessage] = true; // eslint-disable-next-line no-console

    console.warn("[Autocomplete] ".concat(sanitizedMessage));
  }
}
},{}],"node_modules/@algolia/autocomplete-shared/dist/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createRef = require("./createRef");

Object.keys(_createRef).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createRef[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createRef[key];
    }
  });
});

var _debounce = require("./debounce");

Object.keys(_debounce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _debounce[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _debounce[key];
    }
  });
});

var _generateAutocompleteId = require("./generateAutocompleteId");

Object.keys(_generateAutocompleteId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _generateAutocompleteId[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _generateAutocompleteId[key];
    }
  });
});

var _getAttributeValueByPath = require("./getAttributeValueByPath");

Object.keys(_getAttributeValueByPath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getAttributeValueByPath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getAttributeValueByPath[key];
    }
  });
});

var _getItemsCount = require("./getItemsCount");

Object.keys(_getItemsCount).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getItemsCount[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getItemsCount[key];
    }
  });
});

var _invariant = require("./invariant");

Object.keys(_invariant).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _invariant[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _invariant[key];
    }
  });
});

var _isEqual = require("./isEqual");

Object.keys(_isEqual).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isEqual[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isEqual[key];
    }
  });
});

var _MaybePromise = require("./MaybePromise");

Object.keys(_MaybePromise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MaybePromise[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MaybePromise[key];
    }
  });
});

var _warn = require("./warn");

Object.keys(_warn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _warn[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _warn[key];
    }
  });
});
},{"./createRef":"node_modules/@algolia/autocomplete-shared/dist/esm/createRef.js","./debounce":"node_modules/@algolia/autocomplete-shared/dist/esm/debounce.js","./generateAutocompleteId":"node_modules/@algolia/autocomplete-shared/dist/esm/generateAutocompleteId.js","./getAttributeValueByPath":"node_modules/@algolia/autocomplete-shared/dist/esm/getAttributeValueByPath.js","./getItemsCount":"node_modules/@algolia/autocomplete-shared/dist/esm/getItemsCount.js","./invariant":"node_modules/@algolia/autocomplete-shared/dist/esm/invariant.js","./isEqual":"node_modules/@algolia/autocomplete-shared/dist/esm/isEqual.js","./MaybePromise":"node_modules/@algolia/autocomplete-shared/dist/esm/MaybePromise.js","./warn":"node_modules/@algolia/autocomplete-shared/dist/esm/warn.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/checkOptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkOptions = checkOptions;

var _autocompleteShared = require("@algolia/autocomplete-shared");

function checkOptions(options) {
  "development" !== 'production' ? (0, _autocompleteShared.warn)(!options.debug, 'The `debug` option is meant for development debugging and should not be used in production.') : void 0;
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/createStore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function createStore(reducer, props, onStoreStateChange) {
  var state = props.initialState;
  return {
    getState: function getState() {
      return state;
    },
    dispatch: function dispatch(action, payload) {
      var prevState = _objectSpread({}, state);

      state = reducer(state, {
        type: action,
        props: props,
        payload: payload
      });
      onStoreStateChange({
        state: state,
        prevState: prevState
      });
    }
  };
}
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/createConcurrentSafePromise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConcurrentSafePromise = createConcurrentSafePromise;

/**
 * Creates a runner that executes promises in a concurrent-safe way.
 *
 * This is useful to prevent older promises to resolve after a newer promise,
 * otherwise resulting in stale resolved values.
 */
function createConcurrentSafePromise() {
  var basePromiseId = -1;
  var latestResolvedId = -1;
  var latestResolvedValue = undefined;
  return function runConcurrentSafePromise(promise) {
    basePromiseId++;
    var currentPromiseId = basePromiseId;
    return Promise.resolve(promise).then(function (x) {
      // The promise might take too long to resolve and get outdated. This would
      // result in resolving stale values.
      // When this happens, we ignore the promise value and return the one
      // coming from the latest resolved value.
      //
      // +----------------------------------+
      // |        100ms                     |
      // | run(1) +--->  R1                 |
      // |        300ms                     |
      // | run(2) +-------------> R2 (SKIP) |
      // |        200ms                     |
      // | run(3) +--------> R3             |
      // +----------------------------------+
      if (latestResolvedValue && currentPromiseId < latestResolvedId) {
        return latestResolvedValue;
      }

      latestResolvedId = currentPromiseId;
      latestResolvedValue = x;
      return x;
    });
  };
}
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;

function flatten(values) {
  return values.reduce(function (a, b) {
    return a.concat(b);
  }, []);
}
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/getNextActiveItemId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextActiveItemId = getNextActiveItemId;

/**
 * Returns the next active item ID from the current state.
 *
 * We allow circular keyboard navigation from the base index.
 * The base index can either be `null` (nothing is highlighted) or `0`
 * (the first item is highlighted).
 * The base index is allowed to get assigned `null` only if
 * `props.defaultActiveItemId` is `null`. This pattern allows to "stop"
 * by the actual query before navigating to other suggestions as seen on
 * Google or Amazon.
 *
 * @param moveAmount The offset to increment (or decrement) the last index
 * @param baseIndex The current index to compute the next index from
 * @param itemCount The number of items
 * @param defaultActiveItemId The default active index to fallback to
 */
function getNextActiveItemId(moveAmount, baseIndex, itemCount, defaultActiveItemId) {
  if (moveAmount < 0 && (baseIndex === null || defaultActiveItemId !== null && baseIndex === 0)) {
    return itemCount + moveAmount;
  }

  var numericIndex = (baseIndex === null ? -1 : baseIndex) + moveAmount;

  if (numericIndex <= -1 || numericIndex >= itemCount) {
    return defaultActiveItemId === null ? null : 0;
  }

  return numericIndex;
}
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = void 0;

var noop = function noop() {};

exports.noop = noop;
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/getNormalizedSources.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNormalizedSources = getNormalizedSources;

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _noop = require("./noop");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function getNormalizedSources(getSources, params) {
  var seenSourceIds = [];
  return Promise.resolve(getSources(params)).then(function (sources) {
    (0, _autocompleteShared.invariant)(Array.isArray(sources), "The `getSources` function must return an array of sources but returned type ".concat(JSON.stringify(_typeof(sources)), ":\n\n").concat(JSON.stringify(sources, null, 2)));
    return Promise.all(sources // We allow `undefined` and `false` sources to allow users to use
    // `Boolean(query) && source` (=> `false`).
    // We need to remove these values at this point.
    .filter(function (maybeSource) {
      return Boolean(maybeSource);
    }).map(function (source) {
      (0, _autocompleteShared.invariant)(typeof source.sourceId === 'string', 'A source must provide a `sourceId` string.');

      if (seenSourceIds.includes(source.sourceId)) {
        throw new Error("[Autocomplete] The `sourceId` ".concat(JSON.stringify(source.sourceId), " is not unique."));
      }

      seenSourceIds.push(source.sourceId);

      var normalizedSource = _objectSpread({
        getItemInputValue: function getItemInputValue(_ref) {
          var state = _ref.state;
          return state.query;
        },
        getItemUrl: function getItemUrl() {
          return undefined;
        },
        onSelect: function onSelect(_ref2) {
          var setIsOpen = _ref2.setIsOpen;
          setIsOpen(false);
        },
        onActive: _noop.noop
      }, source);

      return Promise.resolve(normalizedSource);
    }));
  });
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./noop":"node_modules/@algolia/autocomplete-core/dist/esm/utils/noop.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/getActiveItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveItem = getActiveItem;

// We don't have access to the autocomplete source when we call `onKeyDown`
// or `onClick` because those are native browser events.
// However, we can get the source from the suggestion index.
function getCollectionFromActiveItemId(state) {
  // Given 3 sources with respectively 1, 2 and 3 suggestions: [1, 2, 3]
  // We want to get the accumulated counts:
  // [1, 1 + 2, 1 + 2 + 3] = [1, 3, 3 + 3] = [1, 3, 6]
  var accumulatedCollectionsCount = state.collections.map(function (collections) {
    return collections.items.length;
  }).reduce(function (acc, collectionsCount, index) {
    var previousValue = acc[index - 1] || 0;
    var nextValue = previousValue + collectionsCount;
    acc.push(nextValue);
    return acc;
  }, []); // Based on the accumulated counts, we can infer the index of the suggestion.

  var collectionIndex = accumulatedCollectionsCount.reduce(function (acc, current) {
    if (current <= state.activeItemId) {
      return acc + 1;
    }

    return acc;
  }, 0);
  return state.collections[collectionIndex];
}
/**
 * Gets the highlighted index relative to a suggestion object (not the absolute
 * highlighted index).
 *
 * Example:
 *  [['a', 'b'], ['c', 'd', 'e'], ['f']]
 *                      ↑
 *         (absolute: 3, relative: 1)
 */


function getRelativeActiveItemId(_ref) {
  var state = _ref.state,
      collection = _ref.collection;
  var isOffsetFound = false;
  var counter = 0;
  var previousItemsOffset = 0;

  while (isOffsetFound === false) {
    var currentCollection = state.collections[counter];

    if (currentCollection === collection) {
      isOffsetFound = true;
      break;
    }

    previousItemsOffset += currentCollection.items.length;
    counter++;
  }

  return state.activeItemId - previousItemsOffset;
}

function getActiveItem(state) {
  var collection = getCollectionFromActiveItemId(state);

  if (!collection) {
    return null;
  }

  var item = collection.items[getRelativeActiveItemId({
    state: state,
    collection: collection
  })];
  var source = collection.source;
  var itemInputValue = source.getItemInputValue({
    item: item,
    state: state
  });
  var itemUrl = source.getItemUrl({
    item: item,
    state: state
  });
  return {
    item: item,
    itemInputValue: itemInputValue,
    itemUrl: itemUrl,
    source: source
  };
}
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/isOrContainsNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOrContainsNode = isOrContainsNode;

function isOrContainsNode(parent, child) {
  return parent === child || parent.contains(child);
}
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/mapToAlgoliaResponse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToAlgoliaResponse = mapToAlgoliaResponse;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function mapToAlgoliaResponse(rawResults) {
  var results = rawResults.map(function (result) {
    var _hits;

    return _objectSpread(_objectSpread({}, result), {}, {
      hits: (_hits = result.hits) === null || _hits === void 0 ? void 0 : _hits.map(function (hit) {
        // Bring support for the Insights plugin.
        return _objectSpread(_objectSpread({}, hit), {}, {
          __autocomplete_indexName: result.index,
          __autocomplete_queryID: result.queryID
        });
      })
    });
  });
  return {
    results: results,
    hits: results.map(function (result) {
      return result.hits;
    }).filter(Boolean),
    facetHits: results.map(function (result) {
      var _facetHits;

      return (_facetHits = result.facetHits) === null || _facetHits === void 0 ? void 0 : _facetHits.map(function (facetHit) {
        // Bring support for the highlighting components.
        return {
          label: facetHit.value,
          count: facetHit.count,
          _highlightResult: {
            label: {
              value: facetHit.highlighted
            }
          }
        };
      });
    }).filter(Boolean)
  };
}
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createConcurrentSafePromise = require("./createConcurrentSafePromise");

Object.keys(_createConcurrentSafePromise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createConcurrentSafePromise[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createConcurrentSafePromise[key];
    }
  });
});

var _flatten = require("./flatten");

Object.keys(_flatten).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _flatten[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flatten[key];
    }
  });
});

var _getNextActiveItemId = require("./getNextActiveItemId");

Object.keys(_getNextActiveItemId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getNextActiveItemId[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getNextActiveItemId[key];
    }
  });
});

var _getNormalizedSources = require("./getNormalizedSources");

Object.keys(_getNormalizedSources).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getNormalizedSources[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getNormalizedSources[key];
    }
  });
});

var _getActiveItem = require("./getActiveItem");

Object.keys(_getActiveItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getActiveItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getActiveItem[key];
    }
  });
});

var _isOrContainsNode = require("./isOrContainsNode");

Object.keys(_isOrContainsNode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isOrContainsNode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isOrContainsNode[key];
    }
  });
});

var _mapToAlgoliaResponse = require("./mapToAlgoliaResponse");

Object.keys(_mapToAlgoliaResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mapToAlgoliaResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapToAlgoliaResponse[key];
    }
  });
});

var _noop = require("./noop");

Object.keys(_noop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _noop[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _noop[key];
    }
  });
});
},{"./createConcurrentSafePromise":"node_modules/@algolia/autocomplete-core/dist/esm/utils/createConcurrentSafePromise.js","./flatten":"node_modules/@algolia/autocomplete-core/dist/esm/utils/flatten.js","./getNextActiveItemId":"node_modules/@algolia/autocomplete-core/dist/esm/utils/getNextActiveItemId.js","./getNormalizedSources":"node_modules/@algolia/autocomplete-core/dist/esm/utils/getNormalizedSources.js","./getActiveItem":"node_modules/@algolia/autocomplete-core/dist/esm/utils/getActiveItem.js","./isOrContainsNode":"node_modules/@algolia/autocomplete-core/dist/esm/utils/isOrContainsNode.js","./mapToAlgoliaResponse":"node_modules/@algolia/autocomplete-core/dist/esm/utils/mapToAlgoliaResponse.js","./noop":"node_modules/@algolia/autocomplete-core/dist/esm/utils/noop.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/getAutocompleteSetters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAutocompleteSetters = getAutocompleteSetters;

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function getAutocompleteSetters(_ref) {
  var store = _ref.store;

  var setActiveItemId = function setActiveItemId(value) {
    store.dispatch('setActiveItemId', value);
  };

  var setQuery = function setQuery(value) {
    store.dispatch('setQuery', value);
  };

  var setCollections = function setCollections(rawValue) {
    var baseItemId = 0;
    var value = rawValue.map(function (collection) {
      return _objectSpread(_objectSpread({}, collection), {}, {
        // We flatten the stored items to support calling `getAlgoliaResults`
        // from the source itself.
        items: (0, _utils.flatten)(collection.items).map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            __autocomplete_id: baseItemId++
          });
        })
      });
    });
    store.dispatch('setCollections', value);
  };

  var setIsOpen = function setIsOpen(value) {
    store.dispatch('setIsOpen', value);
  };

  var setStatus = function setStatus(value) {
    store.dispatch('setStatus', value);
  };

  var setContext = function setContext(value) {
    store.dispatch('setContext', value);
  };

  return {
    setActiveItemId: setActiveItemId,
    setQuery: setQuery,
    setCollections: setCollections,
    setIsOpen: setIsOpen,
    setStatus: setStatus,
    setContext: setContext
  };
}
},{"./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/getDefaultProps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultProps = getDefaultProps;

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _utils = require("./utils");

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function getDefaultProps(props, pluginSubscribers) {
  var _props$id;
  /* eslint-disable no-restricted-globals */


  var environment = typeof window !== 'undefined' ? window : {};
  /* eslint-enable no-restricted-globals */

  var plugins = props.plugins || [];
  return _objectSpread(_objectSpread({
    debug: false,
    openOnFocus: false,
    placeholder: '',
    autoFocus: false,
    defaultActiveItemId: null,
    stallThreshold: 300,
    environment: environment,
    shouldPanelOpen: function shouldPanelOpen(_ref) {
      var state = _ref.state;
      return (0, _autocompleteShared.getItemsCount)(state) > 0;
    }
  }, props), {}, {
    // Since `generateAutocompleteId` triggers a side effect (it increments
    // an internal counter), we don't want to execute it if unnecessary.
    id: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : (0, _autocompleteShared.generateAutocompleteId)(),
    plugins: plugins,
    // The following props need to be deeply defaulted.
    initialState: _objectSpread({
      activeItemId: null,
      query: '',
      completion: null,
      collections: [],
      isOpen: false,
      status: 'idle',
      context: {}
    }, props.initialState),
    onStateChange: function onStateChange(params) {
      var _props$onStateChange;

      (_props$onStateChange = props.onStateChange) === null || _props$onStateChange === void 0 ? void 0 : _props$onStateChange.call(props, params);
      plugins.forEach(function (x) {
        var _x$onStateChange;

        return (_x$onStateChange = x.onStateChange) === null || _x$onStateChange === void 0 ? void 0 : _x$onStateChange.call(x, params);
      });
    },
    onSubmit: function onSubmit(params) {
      var _props$onSubmit;

      (_props$onSubmit = props.onSubmit) === null || _props$onSubmit === void 0 ? void 0 : _props$onSubmit.call(props, params);
      plugins.forEach(function (x) {
        var _x$onSubmit;

        return (_x$onSubmit = x.onSubmit) === null || _x$onSubmit === void 0 ? void 0 : _x$onSubmit.call(x, params);
      });
    },
    onReset: function onReset(params) {
      var _props$onReset;

      (_props$onReset = props.onReset) === null || _props$onReset === void 0 ? void 0 : _props$onReset.call(props, params);
      plugins.forEach(function (x) {
        var _x$onReset;

        return (_x$onReset = x.onReset) === null || _x$onReset === void 0 ? void 0 : _x$onReset.call(x, params);
      });
    },
    getSources: function getSources(params) {
      return Promise.all([].concat(_toConsumableArray(plugins.map(function (plugin) {
        return plugin.getSources;
      })), [props.getSources]).filter(Boolean).map(function (getSources) {
        return (0, _utils.getNormalizedSources)(getSources, params);
      })).then(function (nested) {
        return (0, _utils.flatten)(nested);
      }).then(function (sources) {
        return sources.map(function (source) {
          return _objectSpread(_objectSpread({}, source), {}, {
            onSelect: function onSelect(params) {
              source.onSelect(params);
              pluginSubscribers.forEach(function (x) {
                var _x$onSelect;

                return (_x$onSelect = x.onSelect) === null || _x$onSelect === void 0 ? void 0 : _x$onSelect.call(x, params);
              });
            },
            onActive: function onActive(params) {
              source.onActive(params);
              pluginSubscribers.forEach(function (x) {
                var _x$onActive;

                return (_x$onActive = x.onActive) === null || _x$onActive === void 0 ? void 0 : _x$onActive.call(x, params);
              });
            }
          });
        });
      });
    },
    navigator: _objectSpread({
      navigate: function navigate(_ref2) {
        var itemUrl = _ref2.itemUrl;
        environment.location.assign(itemUrl);
      },
      navigateNewTab: function navigateNewTab(_ref3) {
        var itemUrl = _ref3.itemUrl;
        var windowReference = environment.open(itemUrl, '_blank', 'noopener');
        windowReference === null || windowReference === void 0 ? void 0 : windowReference.focus();
      },
      navigateNewWindow: function navigateNewWindow(_ref4) {
        var itemUrl = _ref4.itemUrl;
        environment.open(itemUrl, '_blank', 'noopener');
      }
    }, props.navigator)
  });
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/resolve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preResolve = preResolve;
exports.resolve = resolve;
exports.postResolve = postResolve;

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _utils = require("./utils");

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function isDescription(item) {
  return Boolean(item.execute);
}

function isRequesterDescription(description) {
  return Boolean(description.execute);
}

function preResolve(itemsOrDescription, sourceId) {
  if (isRequesterDescription(itemsOrDescription)) {
    return _objectSpread(_objectSpread({}, itemsOrDescription), {}, {
      requests: itemsOrDescription.queries.map(function (query) {
        return {
          query: query,
          sourceId: sourceId,
          transformResponse: itemsOrDescription.transformResponse
        };
      })
    });
  }

  return {
    items: itemsOrDescription,
    sourceId: sourceId
  };
}

function resolve(items) {
  var packed = items.reduce(function (acc, current) {
    if (!isDescription(current)) {
      acc.push(current);
      return acc;
    }

    var searchClient = current.searchClient,
        execute = current.execute,
        requests = current.requests;
    var container = acc.find(function (item) {
      return isDescription(current) && isDescription(item) && item.searchClient === searchClient && item.execute === execute;
    });

    if (container) {
      var _container$items;

      (_container$items = container.items).push.apply(_container$items, _toConsumableArray(requests));
    } else {
      var request = {
        execute: execute,
        items: requests,
        searchClient: searchClient
      };
      acc.push(request);
    }

    return acc;
  }, []);
  var values = packed.map(function (maybeDescription) {
    if (!isDescription(maybeDescription)) {
      return Promise.resolve(maybeDescription);
    }

    var _ref = maybeDescription,
        execute = _ref.execute,
        items = _ref.items,
        searchClient = _ref.searchClient;
    return execute({
      searchClient: searchClient,
      requests: items
    });
  });
  return Promise.all(values).then(function (responses) {
    return (0, _utils.flatten)(responses);
  });
}

function postResolve(responses, sources) {
  return sources.map(function (source) {
    var matches = responses.filter(function (response) {
      return response.sourceId === source.sourceId;
    });
    var results = matches.map(function (_ref2) {
      var items = _ref2.items;
      return items;
    });
    var transform = matches[0].transformResponse;
    var items = transform ? transform((0, _utils.mapToAlgoliaResponse)(results)) : results;
    (0, _autocompleteShared.invariant)(Array.isArray(items), "The `getItems` function must return an array of items but returned type ".concat(JSON.stringify(_typeof(items)), ":\n\n").concat(JSON.stringify(items, null, 2)));
    return {
      source: source,
      items: items
    };
  });
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/onInput.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onInput = onInput;

var _resolve = require("./resolve");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var lastStalledId = null;

function onInput(_ref) {
  var event = _ref.event,
      _ref$nextState = _ref.nextState,
      nextState = _ref$nextState === void 0 ? {} : _ref$nextState,
      props = _ref.props,
      query = _ref.query,
      refresh = _ref.refresh,
      store = _ref.store,
      setters = _objectWithoutProperties(_ref, ["event", "nextState", "props", "query", "refresh", "store"]);

  if (lastStalledId) {
    props.environment.clearTimeout(lastStalledId);
  }

  var setCollections = setters.setCollections,
      setIsOpen = setters.setIsOpen,
      setQuery = setters.setQuery,
      setActiveItemId = setters.setActiveItemId,
      setStatus = setters.setStatus;
  setQuery(query);
  setActiveItemId(props.defaultActiveItemId);

  if (!query && props.openOnFocus === false) {
    var _nextState$isOpen;

    setStatus('idle');
    setCollections(store.getState().collections.map(function (collection) {
      return _objectSpread(_objectSpread({}, collection), {}, {
        items: []
      });
    }));
    setIsOpen((_nextState$isOpen = nextState.isOpen) !== null && _nextState$isOpen !== void 0 ? _nextState$isOpen : props.shouldPanelOpen({
      state: store.getState()
    }));
    return Promise.resolve();
  }

  setStatus('loading');
  lastStalledId = props.environment.setTimeout(function () {
    setStatus('stalled');
  }, props.stallThreshold);
  return props.getSources(_objectSpread({
    query: query,
    refresh: refresh,
    state: store.getState()
  }, setters)).then(function (sources) {
    setStatus('loading');
    return Promise.all(sources.map(function (source) {
      return Promise.resolve(source.getItems(_objectSpread({
        query: query,
        refresh: refresh,
        state: store.getState()
      }, setters))).then(function (itemsOrDescription) {
        return (0, _resolve.preResolve)(itemsOrDescription, source.sourceId);
      });
    })).then(_resolve.resolve).then(function (responses) {
      return (0, _resolve.postResolve)(responses, sources);
    }).then(function (collections) {
      var _nextState$isOpen2;

      setStatus('idle');
      setCollections(collections);
      var isPanelOpen = props.shouldPanelOpen({
        state: store.getState()
      });
      setIsOpen((_nextState$isOpen2 = nextState.isOpen) !== null && _nextState$isOpen2 !== void 0 ? _nextState$isOpen2 : props.openOnFocus && !query && isPanelOpen || isPanelOpen);
      var highlightedItem = (0, _utils.getActiveItem)(store.getState());

      if (store.getState().activeItemId !== null && highlightedItem) {
        var item = highlightedItem.item,
            itemInputValue = highlightedItem.itemInputValue,
            itemUrl = highlightedItem.itemUrl,
            source = highlightedItem.source;
        source.onActive(_objectSpread({
          event: event,
          item: item,
          itemInputValue: itemInputValue,
          itemUrl: itemUrl,
          refresh: refresh,
          source: source,
          state: store.getState()
        }, setters));
      }
    }).finally(function () {
      if (lastStalledId) {
        props.environment.clearTimeout(lastStalledId);
      }
    });
  });
}
},{"./resolve":"node_modules/@algolia/autocomplete-core/dist/esm/resolve.js","./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/onKeyDown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onKeyDown = onKeyDown;

var _onInput = require("./onInput");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function onKeyDown(_ref) {
  var event = _ref.event,
      props = _ref.props,
      refresh = _ref.refresh,
      store = _ref.store,
      setters = _objectWithoutProperties(_ref, ["event", "props", "refresh", "store"]);

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    // Default browser behavior changes the caret placement on ArrowUp and
    // Arrow down.
    event.preventDefault();
    store.dispatch(event.key, null);
    var nodeItem = props.environment.document.getElementById("".concat(props.id, "-item-").concat(store.getState().activeItemId));

    if (nodeItem) {
      if (nodeItem.scrollIntoViewIfNeeded) {
        nodeItem.scrollIntoViewIfNeeded(false);
      } else {
        nodeItem.scrollIntoView(false);
      }
    }

    var highlightedItem = (0, _utils.getActiveItem)(store.getState());

    if (store.getState().activeItemId !== null && highlightedItem) {
      var item = highlightedItem.item,
          itemInputValue = highlightedItem.itemInputValue,
          itemUrl = highlightedItem.itemUrl,
          source = highlightedItem.source;
      source.onActive(_objectSpread({
        event: event,
        item: item,
        itemInputValue: itemInputValue,
        itemUrl: itemUrl,
        refresh: refresh,
        source: source,
        state: store.getState()
      }, setters));
    }
  } else if (event.key === 'Escape') {
    // This prevents the default browser behavior on `input[type="search"]`
    // from removing the query right away because we first want to close the
    // panel.
    event.preventDefault();
    store.dispatch(event.key, null);
  } else if (event.key === 'Enter') {
    // No active item, so we let the browser handle the native `onSubmit` form
    // event.
    if (store.getState().activeItemId === null || store.getState().collections.every(function (collection) {
      return collection.items.length === 0;
    })) {
      return;
    } // This prevents the `onSubmit` event to be sent because an item is
    // highlighted.


    event.preventDefault();

    var _ref2 = (0, _utils.getActiveItem)(store.getState()),
        _item = _ref2.item,
        _itemInputValue = _ref2.itemInputValue,
        _itemUrl = _ref2.itemUrl,
        _source = _ref2.source;

    if (event.metaKey || event.ctrlKey) {
      if (_itemUrl !== undefined) {
        _source.onSelect(_objectSpread({
          event: event,
          item: _item,
          itemInputValue: _itemInputValue,
          itemUrl: _itemUrl,
          refresh: refresh,
          source: _source,
          state: store.getState()
        }, setters));

        props.navigator.navigateNewTab({
          itemUrl: _itemUrl,
          item: _item,
          state: store.getState()
        });
      }
    } else if (event.shiftKey) {
      if (_itemUrl !== undefined) {
        _source.onSelect(_objectSpread({
          event: event,
          item: _item,
          itemInputValue: _itemInputValue,
          itemUrl: _itemUrl,
          refresh: refresh,
          source: _source,
          state: store.getState()
        }, setters));

        props.navigator.navigateNewWindow({
          itemUrl: _itemUrl,
          item: _item,
          state: store.getState()
        });
      }
    } else if (event.altKey) {// Keep native browser behavior
    } else {
      if (_itemUrl !== undefined) {
        _source.onSelect(_objectSpread({
          event: event,
          item: _item,
          itemInputValue: _itemInputValue,
          itemUrl: _itemUrl,
          refresh: refresh,
          source: _source,
          state: store.getState()
        }, setters));

        props.navigator.navigate({
          itemUrl: _itemUrl,
          item: _item,
          state: store.getState()
        });
        return;
      }

      (0, _onInput.onInput)(_objectSpread({
        event: event,
        nextState: {
          isOpen: false
        },
        props: props,
        query: _itemInputValue,
        refresh: refresh,
        store: store
      }, setters)).then(function () {
        _source.onSelect(_objectSpread({
          event: event,
          item: _item,
          itemInputValue: _itemInputValue,
          itemUrl: _itemUrl,
          refresh: refresh,
          source: _source,
          state: store.getState()
        }, setters));
      });
    }
  }
}
},{"./onInput":"node_modules/@algolia/autocomplete-core/dist/esm/onInput.js","./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/getPropGetters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropGetters = getPropGetters;

var _onInput = require("./onInput");

var _onKeyDown2 = require("./onKeyDown");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function getPropGetters(_ref) {
  var props = _ref.props,
      refresh = _ref.refresh,
      store = _ref.store,
      setters = _objectWithoutProperties(_ref, ["props", "refresh", "store"]);

  var getEnvironmentProps = function getEnvironmentProps(providedProps) {
    var inputElement = providedProps.inputElement,
        formElement = providedProps.formElement,
        panelElement = providedProps.panelElement,
        rest = _objectWithoutProperties(providedProps, ["inputElement", "formElement", "panelElement"]);

    return _objectSpread({
      // On touch devices, we do not rely on the native `blur` event of the
      // input to close the panel, but rather on a custom `touchstart` event
      // outside of the autocomplete elements.
      // This ensures a working experience on mobile because we blur the input
      // on touch devices when the user starts scrolling (`touchmove`).
      onTouchStart: function onTouchStart(event) {
        if (store.getState().isOpen === false || event.target === inputElement) {
          return;
        } // @TODO: support cases where there are multiple Autocomplete instances.
        // Right now, a second instance makes this computation return false.


        var isTargetWithinAutocomplete = [formElement, panelElement].some(function (contextNode) {
          return (0, _utils.isOrContainsNode)(contextNode, event.target) || (0, _utils.isOrContainsNode)(contextNode, props.environment.document.activeElement);
        });

        if (isTargetWithinAutocomplete === false) {
          store.dispatch('blur', null);
        }
      },
      // When scrolling on touch devices (mobiles, tablets, etc.), we want to
      // mimic the native platform behavior where the input is blurred to
      // hide the virtual keyboard. This gives more vertical space to
      // discover all the suggestions showing up in the panel.
      onTouchMove: function onTouchMove(event) {
        if (store.getState().isOpen === false || inputElement !== props.environment.document.activeElement || event.target === inputElement) {
          return;
        }

        inputElement.blur();
      }
    }, rest);
  };

  var getRootProps = function getRootProps(rest) {
    return _objectSpread({
      role: 'combobox',
      'aria-expanded': store.getState().isOpen,
      'aria-haspopup': 'listbox',
      'aria-owns': store.getState().isOpen ? "".concat(props.id, "-list") : undefined,
      'aria-labelledby': "".concat(props.id, "-label")
    }, rest);
  };

  var getFormProps = function getFormProps(providedProps) {
    var inputElement = providedProps.inputElement,
        rest = _objectWithoutProperties(providedProps, ["inputElement"]);

    return _objectSpread({
      action: '',
      noValidate: true,
      role: 'search',
      onSubmit: function onSubmit(event) {
        var _providedProps$inputE;

        event.preventDefault();
        props.onSubmit(_objectSpread({
          event: event,
          refresh: refresh,
          state: store.getState()
        }, setters));
        store.dispatch('submit', null);
        (_providedProps$inputE = providedProps.inputElement) === null || _providedProps$inputE === void 0 ? void 0 : _providedProps$inputE.blur();
      },
      onReset: function onReset(event) {
        var _providedProps$inputE2;

        event.preventDefault();
        props.onReset(_objectSpread({
          event: event,
          refresh: refresh,
          state: store.getState()
        }, setters));
        store.dispatch('reset', null);
        (_providedProps$inputE2 = providedProps.inputElement) === null || _providedProps$inputE2 === void 0 ? void 0 : _providedProps$inputE2.focus();
      }
    }, rest);
  };

  var getInputProps = function getInputProps(providedProps) {
    function onFocus(event) {
      // We want to trigger a query when `openOnFocus` is true
      // because the panel should open with the current query.
      if (props.openOnFocus || Boolean(store.getState().query)) {
        (0, _onInput.onInput)(_objectSpread({
          event: event,
          props: props,
          query: store.getState().completion || store.getState().query,
          refresh: refresh,
          store: store
        }, setters));
      }

      store.dispatch('focus', null);
    }

    var isTouchDevice = ('ontouchstart' in props.environment);

    var _ref2 = providedProps || {},
        inputElement = _ref2.inputElement,
        _ref2$maxLength = _ref2.maxLength,
        maxLength = _ref2$maxLength === void 0 ? 512 : _ref2$maxLength,
        rest = _objectWithoutProperties(_ref2, ["inputElement", "maxLength"]);

    var activeItem = (0, _utils.getActiveItem)(store.getState());
    return _objectSpread({
      'aria-autocomplete': 'both',
      'aria-activedescendant': store.getState().isOpen && store.getState().activeItemId !== null ? "".concat(props.id, "-item-").concat(store.getState().activeItemId) : undefined,
      'aria-controls': store.getState().isOpen ? "".concat(props.id, "-list") : undefined,
      'aria-labelledby': "".concat(props.id, "-label"),
      value: store.getState().completion || store.getState().query,
      id: "".concat(props.id, "-input"),
      autoComplete: 'off',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      enterKeyHint: activeItem !== null && activeItem !== void 0 && activeItem.itemUrl ? 'go' : 'search',
      spellCheck: 'false',
      autoFocus: props.autoFocus,
      placeholder: props.placeholder,
      maxLength: maxLength,
      type: 'search',
      onChange: function onChange(event) {
        (0, _onInput.onInput)(_objectSpread({
          event: event,
          props: props,
          query: event.currentTarget.value.slice(0, maxLength),
          refresh: refresh,
          store: store
        }, setters));
      },
      onKeyDown: function onKeyDown(event) {
        (0, _onKeyDown2.onKeyDown)(_objectSpread({
          event: event,
          props: props,
          refresh: refresh,
          store: store
        }, setters));
      },
      onFocus: onFocus,
      onBlur: function onBlur() {
        // We do rely on the `blur` event on touch devices.
        // See explanation in `onTouchStart`.
        if (!isTouchDevice) {
          store.dispatch('blur', null);
        }
      },
      onClick: function onClick(event) {
        // When the panel is closed and you click on the input while
        // the input is focused, the `onFocus` event is not triggered
        // (default browser behavior).
        // In an autocomplete context, it makes sense to open the panel in this
        // case.
        // We mimic this event by catching the `onClick` event which
        // triggers the `onFocus` for the panel to open.
        if (providedProps.inputElement === props.environment.document.activeElement && !store.getState().isOpen) {
          onFocus(event);
        }
      }
    }, rest);
  };

  var getLabelProps = function getLabelProps(rest) {
    return _objectSpread({
      htmlFor: "".concat(props.id, "-input"),
      id: "".concat(props.id, "-label")
    }, rest);
  };

  var getListProps = function getListProps(rest) {
    return _objectSpread({
      role: 'listbox',
      'aria-labelledby': "".concat(props.id, "-label"),
      id: "".concat(props.id, "-list")
    }, rest);
  };

  var getPanelProps = function getPanelProps(rest) {
    return _objectSpread({
      onMouseDown: function onMouseDown(event) {
        // Prevents the `activeElement` from being changed to the panel so
        // that the blur event is not triggered, otherwise it closes the
        // panel.
        event.preventDefault();
      },
      onMouseLeave: function onMouseLeave() {
        store.dispatch('mouseleave', null);
      }
    }, rest);
  };

  var getItemProps = function getItemProps(providedProps) {
    var item = providedProps.item,
        source = providedProps.source,
        rest = _objectWithoutProperties(providedProps, ["item", "source"]);

    return _objectSpread({
      id: "".concat(props.id, "-item-").concat(item.__autocomplete_id),
      role: 'option',
      'aria-selected': store.getState().activeItemId === item.__autocomplete_id,
      onMouseMove: function onMouseMove(event) {
        if (item.__autocomplete_id === store.getState().activeItemId) {
          return;
        }

        store.dispatch('mousemove', item.__autocomplete_id);
        var activeItem = (0, _utils.getActiveItem)(store.getState());

        if (store.getState().activeItemId !== null && activeItem) {
          var _item = activeItem.item,
              itemInputValue = activeItem.itemInputValue,
              itemUrl = activeItem.itemUrl,
              _source = activeItem.source;

          _source.onActive(_objectSpread({
            event: event,
            item: _item,
            itemInputValue: itemInputValue,
            itemUrl: itemUrl,
            refresh: refresh,
            source: _source,
            state: store.getState()
          }, setters));
        }
      },
      onMouseDown: function onMouseDown(event) {
        // Prevents the `activeElement` from being changed to the item so it
        // can remain with the current `activeElement`.
        event.preventDefault();
      },
      onClick: function onClick(event) {
        var itemInputValue = source.getItemInputValue({
          item: item,
          state: store.getState()
        });
        var itemUrl = source.getItemUrl({
          item: item,
          state: store.getState()
        }); // If `getItemUrl` is provided, it means that the suggestion
        // is a link, not plain text that aims at updating the query.
        // We can therefore skip the state change because it will update
        // the `activeItemId`, resulting in a UI flash, especially
        // noticeable on mobile.

        var runPreCommand = itemUrl ? Promise.resolve() : (0, _onInput.onInput)(_objectSpread({
          event: event,
          nextState: {
            isOpen: false
          },
          props: props,
          query: itemInputValue,
          refresh: refresh,
          store: store
        }, setters));
        runPreCommand.then(function () {
          source.onSelect(_objectSpread({
            event: event,
            item: item,
            itemInputValue: itemInputValue,
            itemUrl: itemUrl,
            refresh: refresh,
            source: source,
            state: store.getState()
          }, setters));
        });
      }
    }, rest);
  };

  return {
    getEnvironmentProps: getEnvironmentProps,
    getRootProps: getRootProps,
    getFormProps: getFormProps,
    getLabelProps: getLabelProps,
    getInputProps: getInputProps,
    getPanelProps: getPanelProps,
    getListProps: getListProps,
    getItemProps: getItemProps
  };
}
},{"./onInput":"node_modules/@algolia/autocomplete-core/dist/esm/onInput.js","./onKeyDown":"node_modules/@algolia/autocomplete-core/dist/esm/onKeyDown.js","./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/getCompletion.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompletion = getCompletion;

var _utils = require("./utils");

function getCompletion(_ref) {
  var state = _ref.state;

  if (state.isOpen === false || state.activeItemId === null) {
    return null;
  }

  var _ref2 = (0, _utils.getActiveItem)(state),
      itemInputValue = _ref2.itemInputValue;

  return itemInputValue || null;
}
},{"./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/stateReducer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateReducer = void 0;

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _getCompletion = require("./getCompletion");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var stateReducer = function stateReducer(state, action) {
  switch (action.type) {
    case 'setActiveItemId':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: action.payload
        });
      }

    case 'setQuery':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          query: action.payload,
          completion: null
        });
      }

    case 'setCollections':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          collections: action.payload
        });
      }

    case 'setIsOpen':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          isOpen: action.payload
        });
      }

    case 'setStatus':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          status: action.payload
        });
      }

    case 'setContext':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          context: _objectSpread(_objectSpread({}, state.context), action.payload)
        });
      }

    case 'ArrowDown':
      {
        var nextState = _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: (0, _utils.getNextActiveItemId)(1, state.activeItemId, (0, _autocompleteShared.getItemsCount)(state), action.props.defaultActiveItemId)
        });

        return _objectSpread(_objectSpread({}, nextState), {}, {
          completion: (0, _getCompletion.getCompletion)({
            state: nextState
          })
        });
      }

    case 'ArrowUp':
      {
        var _nextState = _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: (0, _utils.getNextActiveItemId)(-1, state.activeItemId, (0, _autocompleteShared.getItemsCount)(state), action.props.defaultActiveItemId)
        });

        return _objectSpread(_objectSpread({}, _nextState), {}, {
          completion: (0, _getCompletion.getCompletion)({
            state: _nextState
          })
        });
      }

    case 'Escape':
      {
        if (state.isOpen) {
          return _objectSpread(_objectSpread({}, state), {}, {
            isOpen: false,
            completion: null
          });
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          query: '',
          status: 'idle',
          collections: []
        });
      }

    case 'submit':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: null,
          isOpen: false,
          status: 'idle'
        });
      }

    case 'reset':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: // Since we open the panel on reset when openOnFocus=true
          // we need to restore the highlighted index to the defaultActiveItemId. (DocSearch use-case)
          // Since we close the panel when openOnFocus=false
          // we lose track of the highlighted index. (Query-suggestions use-case)
          action.props.openOnFocus === true ? action.props.defaultActiveItemId : null,
          status: 'idle',
          query: ''
        });
      }

    case 'focus':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: action.props.defaultActiveItemId,
          isOpen: (action.props.openOnFocus || Boolean(state.query)) && action.props.shouldPanelOpen({
            state: state
          })
        });
      }

    case 'blur':
      {
        if (action.props.debug) {
          return state;
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          isOpen: false,
          activeItemId: null
        });
      }

    case 'mousemove':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: action.payload
        });
      }

    case 'mouseleave':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          activeItemId: action.props.defaultActiveItemId
        });
      }

    default:
      (0, _autocompleteShared.invariant)(false, "The reducer action ".concat(JSON.stringify(action.type), " is not supported."));
      return state;
  }
};

exports.stateReducer = stateReducer;
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./getCompletion":"node_modules/@algolia/autocomplete-core/dist/esm/getCompletion.js","./utils":"node_modules/@algolia/autocomplete-core/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/createAutocomplete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAutocomplete = createAutocomplete;

var _checkOptions = require("./checkOptions");

var _createStore = require("./createStore");

var _getAutocompleteSetters = require("./getAutocompleteSetters");

var _getDefaultProps = require("./getDefaultProps");

var _getPropGetters = require("./getPropGetters");

var _onInput = require("./onInput");

var _stateReducer = require("./stateReducer");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function createAutocomplete(options) {
  (0, _checkOptions.checkOptions)(options);
  var subscribers = [];
  var props = (0, _getDefaultProps.getDefaultProps)(options, subscribers);
  var store = (0, _createStore.createStore)(_stateReducer.stateReducer, props, onStoreStateChange);
  var setters = (0, _getAutocompleteSetters.getAutocompleteSetters)({
    store: store
  });
  var propGetters = (0, _getPropGetters.getPropGetters)(_objectSpread({
    props: props,
    refresh: refresh,
    store: store
  }, setters));

  function onStoreStateChange(_ref) {
    var prevState = _ref.prevState,
        state = _ref.state;
    props.onStateChange(_objectSpread({
      prevState: prevState,
      state: state,
      refresh: refresh
    }, setters));
  }

  function refresh() {
    return (0, _onInput.onInput)(_objectSpread({
      event: new Event('input'),
      nextState: {
        isOpen: store.getState().isOpen
      },
      props: props,
      query: store.getState().query,
      refresh: refresh,
      store: store
    }, setters));
  }

  props.plugins.forEach(function (plugin) {
    var _plugin$subscribe;

    return (_plugin$subscribe = plugin.subscribe) === null || _plugin$subscribe === void 0 ? void 0 : _plugin$subscribe.call(plugin, _objectSpread(_objectSpread({}, setters), {}, {
      refresh: refresh,
      onSelect: function onSelect(fn) {
        subscribers.push({
          onSelect: fn
        });
      },
      onActive: function onActive(fn) {
        subscribers.push({
          onActive: fn
        });
      }
    }));
  });
  return _objectSpread(_objectSpread({
    refresh: refresh
  }, propGetters), setters);
}
},{"./checkOptions":"node_modules/@algolia/autocomplete-core/dist/esm/checkOptions.js","./createStore":"node_modules/@algolia/autocomplete-core/dist/esm/createStore.js","./getAutocompleteSetters":"node_modules/@algolia/autocomplete-core/dist/esm/getAutocompleteSetters.js","./getDefaultProps":"node_modules/@algolia/autocomplete-core/dist/esm/getDefaultProps.js","./getPropGetters":"node_modules/@algolia/autocomplete-core/dist/esm/getPropGetters.js","./onInput":"node_modules/@algolia/autocomplete-core/dist/esm/onInput.js","./stateReducer":"node_modules/@algolia/autocomplete-core/dist/esm/stateReducer.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteApi.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteCollection.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteContext.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteEnvironment.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteOptions.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteSource.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompletePropGetters.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompletePlugin.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteSetters.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteState.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteStore.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteSubscribers.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-core/dist/esm/types/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AutocompleteApi = require("./AutocompleteApi");

Object.keys(_AutocompleteApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteApi[key];
    }
  });
});

var _AutocompleteCollection = require("./AutocompleteCollection");

Object.keys(_AutocompleteCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteCollection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteCollection[key];
    }
  });
});

var _AutocompleteContext = require("./AutocompleteContext");

Object.keys(_AutocompleteContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteContext[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteContext[key];
    }
  });
});

var _AutocompleteEnvironment = require("./AutocompleteEnvironment");

Object.keys(_AutocompleteEnvironment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteEnvironment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteEnvironment[key];
    }
  });
});

var _AutocompleteOptions = require("./AutocompleteOptions");

Object.keys(_AutocompleteOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteOptions[key];
    }
  });
});

var _AutocompleteSource = require("./AutocompleteSource");

Object.keys(_AutocompleteSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteSource[key];
    }
  });
});

var _AutocompletePropGetters = require("./AutocompletePropGetters");

Object.keys(_AutocompletePropGetters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompletePropGetters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompletePropGetters[key];
    }
  });
});

var _AutocompletePlugin = require("./AutocompletePlugin");

Object.keys(_AutocompletePlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompletePlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompletePlugin[key];
    }
  });
});

var _AutocompleteSetters = require("./AutocompleteSetters");

Object.keys(_AutocompleteSetters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteSetters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteSetters[key];
    }
  });
});

var _AutocompleteState = require("./AutocompleteState");

Object.keys(_AutocompleteState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteState[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteState[key];
    }
  });
});

var _AutocompleteStore = require("./AutocompleteStore");

Object.keys(_AutocompleteStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteStore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteStore[key];
    }
  });
});

var _AutocompleteSubscribers = require("./AutocompleteSubscribers");

Object.keys(_AutocompleteSubscribers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteSubscribers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteSubscribers[key];
    }
  });
});
},{"./AutocompleteApi":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteApi.js","./AutocompleteCollection":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteCollection.js","./AutocompleteContext":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteContext.js","./AutocompleteEnvironment":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteEnvironment.js","./AutocompleteOptions":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteOptions.js","./AutocompleteSource":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteSource.js","./AutocompletePropGetters":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompletePropGetters.js","./AutocompletePlugin":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompletePlugin.js","./AutocompleteSetters":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteSetters.js","./AutocompleteState":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteState.js","./AutocompleteStore":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteStore.js","./AutocompleteSubscribers":"node_modules/@algolia/autocomplete-core/dist/esm/types/AutocompleteSubscribers.js"}],"node_modules/@algolia/autocomplete-core/dist/esm/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
var version = '1.0.1';
exports.version = version;
},{}],"node_modules/@algolia/autocomplete-core/dist/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createAutocomplete = require("./createAutocomplete");

Object.keys(_createAutocomplete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createAutocomplete[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createAutocomplete[key];
    }
  });
});

var _getDefaultProps = require("./getDefaultProps");

Object.keys(_getDefaultProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getDefaultProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getDefaultProps[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _version = require("./version");

Object.keys(_version).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _version[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _version[key];
    }
  });
});
},{"./createAutocomplete":"node_modules/@algolia/autocomplete-core/dist/esm/createAutocomplete.js","./getDefaultProps":"node_modules/@algolia/autocomplete-core/dist/esm/getDefaultProps.js","./types":"node_modules/@algolia/autocomplete-core/dist/esm/types/index.js","./version":"node_modules/@algolia/autocomplete-core/dist/esm/version.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/elements/ClearIcon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearIcon = void 0;

var ClearIcon = function ClearIcon(_ref) {
  var environment = _ref.environment;
  var element = environment.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  element.setAttribute('class', 'aa-ClearIcon');
  element.setAttribute('viewBox', '0 0 24 24');
  element.setAttribute('width', '18');
  element.setAttribute('height', '18');
  element.setAttribute('fill', 'currentColor');
  var path = environment.document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z');
  element.appendChild(path);
  return element;
};

exports.ClearIcon = ClearIcon;
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/utils/getHTMLElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTMLElement = getHTMLElement;

var _autocompleteShared = require("@algolia/autocomplete-shared");

function getHTMLElement(environment, value) {
  if (typeof value === 'string') {
    var element = environment.document.querySelector(value);
    (0, _autocompleteShared.invariant)(element !== null, "The element ".concat(JSON.stringify(value), " is not in the document."));
    return element;
  }

  return value;
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/utils/mergeClassNames.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeClassNames = mergeClassNames;

function mergeClassNames() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return values.reduce(function (acc, current) {
    Object.keys(current).forEach(function (key) {
      var accValue = acc[key];
      var currentValue = current[key];

      if (accValue !== currentValue) {
        acc[key] = [accValue, currentValue].filter(Boolean).join(' ');
      }
    });
    return acc;
  }, {});
}
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/utils/mergeDeep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDeep = mergeDeep;

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var isObject = function isObject(value) {
  return value && _typeof(value) === 'object';
};

function mergeDeep() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return values.reduce(function (acc, current) {
    Object.keys(current).forEach(function (key) {
      var accValue = acc[key];
      var currentValue = current[key];

      if (Array.isArray(accValue) && Array.isArray(currentValue)) {
        acc[key] = accValue.concat.apply(accValue, _toConsumableArray(currentValue));
      } else if (isObject(accValue) && isObject(currentValue)) {
        acc[key] = mergeDeep(accValue, currentValue);
      } else {
        acc[key] = currentValue;
      }
    });
    return acc;
  }, {});
}
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/utils/setProperties.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProperty = setProperty;
exports.setProperties = setProperties;
exports.setPropertiesWithoutEvents = setPropertiesWithoutEvents;

/* eslint-disable */

/*
 * Taken from Preact
 *
 * See https://github.com/preactjs/preact/blob/6ab49d9020740127577bf4af66bf63f4af7f9fee/src/diff/props.js#L58-L151
 */
function setStyle(style, key, value) {
  if (value === null) {
    style[key] = '';
  } else if (typeof value !== 'number') {
    style[key] = value;
  } else {
    style[key] = value + 'px';
  }
}
/**
 * Proxy an event to hooked event handlers
 */


function eventProxy(event) {
  this._listeners[event.type](event);
}
/**
 * Set a property value on a DOM node
 */


function setProperty(dom, name, value) {
  var useCapture;
  var nameLower;
  var oldValue = dom[name];

  if (name === 'style') {
    if (typeof value == 'string') {
      dom.style = value;
    } else {
      if (value === null) {
        dom.style = '';
      } else {
        for (name in value) {
          if (!oldValue || value[name] !== oldValue[name]) {
            setStyle(dom.style, name, value[name]);
          }
        }
      }
    }
  } // Benchmark for comparison: https://esbench.com/bench/574c954bdb965b9a00965ac6
  else if (name[0] === 'o' && name[1] === 'n') {
      useCapture = name !== (name = name.replace(/Capture$/, ''));
      nameLower = name.toLowerCase();
      if (nameLower in dom) name = nameLower;
      name = name.slice(2);
      if (!dom._listeners) dom._listeners = {};
      dom._listeners[name] = value;

      if (value) {
        if (!oldValue) dom.addEventListener(name, eventProxy, useCapture);
      } else {
        dom.removeEventListener(name, eventProxy, useCapture);
      }
    } else if (name !== 'list' && name !== 'tagName' && // HTMLButtonElement.form and HTMLInputElement.form are read-only but can be set using
    // setAttribute
    name !== 'form' && name !== 'type' && name !== 'size' && name !== 'download' && name !== 'href' && name in dom) {
      dom[name] = value == null ? '' : value;
    } else if (typeof value != 'function' && name !== 'dangerouslySetInnerHTML') {
      if (value == null || value === false && // ARIA-attributes have a different notion of boolean values.
      // The value `false` is different from the attribute not
      // existing on the DOM, so we can't remove it. For non-boolean
      // ARIA-attributes we could treat false as a removal, but the
      // amount of exceptions would cost us too many bytes. On top of
      // that other VDOM frameworks also always stringify `false`.
      !/^ar/.test(name)) {
        dom.removeAttribute(name);
      } else {
        dom.setAttribute(name, value);
      }
    }
}

function getNormalizedName(name) {
  switch (name) {
    case 'onChange':
      return 'onInput';

    default:
      return name;
  }
}

function setProperties(dom, props) {
  for (var name in props) {
    setProperty(dom, getNormalizedName(name), props[name]);
  }
}

function setPropertiesWithoutEvents(dom, props) {
  for (var name in props) {
    if (!(name[0] === 'o' && name[1] === 'n')) {
      setProperty(dom, getNormalizedName(name), props[name]);
    }
  }
}
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getHTMLElement = require("./getHTMLElement");

Object.keys(_getHTMLElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getHTMLElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getHTMLElement[key];
    }
  });
});

var _mergeClassNames = require("./mergeClassNames");

Object.keys(_mergeClassNames).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mergeClassNames[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeClassNames[key];
    }
  });
});

var _mergeDeep = require("./mergeDeep");

Object.keys(_mergeDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mergeDeep[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeDeep[key];
    }
  });
});

var _setProperties = require("./setProperties");

Object.keys(_setProperties).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _setProperties[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setProperties[key];
    }
  });
});
},{"./getHTMLElement":"node_modules/@algolia/autocomplete-js/dist/esm/utils/getHTMLElement.js","./mergeClassNames":"node_modules/@algolia/autocomplete-js/dist/esm/utils/mergeClassNames.js","./mergeDeep":"node_modules/@algolia/autocomplete-js/dist/esm/utils/mergeDeep.js","./setProperties":"node_modules/@algolia/autocomplete-js/dist/esm/utils/setProperties.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/getCreateDomElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCreateDomElement = getCreateDomElement;

var _utils = require("./utils");

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function getCreateDomElement(environment) {
  return function createDomElement(tagName, _ref) {
    var _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        props = _objectWithoutProperties(_ref, ["children"]);

    var element = environment.document.createElement(tagName);
    (0, _utils.setProperties)(element, props);
    element.append.apply(element, _toConsumableArray(children));
    return element;
  };
}
},{"./utils":"node_modules/@algolia/autocomplete-js/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/elements/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _getCreateDomElement = require("../getCreateDomElement");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Input = function Input(_ref) {
  var autocompleteScopeApi = _ref.autocompleteScopeApi,
      environment = _ref.environment,
      classNames = _ref.classNames,
      getInputProps = _ref.getInputProps,
      getInputPropsCore = _ref.getInputPropsCore,
      onDetachedEscape = _ref.onDetachedEscape,
      state = _ref.state,
      props = _objectWithoutProperties(_ref, ["autocompleteScopeApi", "environment", "classNames", "getInputProps", "getInputPropsCore", "onDetachedEscape", "state"]);

  var createDomElement = (0, _getCreateDomElement.getCreateDomElement)(environment);
  var element = createDomElement('input', props);
  var inputProps = getInputProps(_objectSpread({
    state: state,
    props: getInputPropsCore({
      inputElement: element
    }),
    inputElement: element
  }, autocompleteScopeApi));
  (0, _utils.setProperties)(element, _objectSpread(_objectSpread({}, inputProps), {}, {
    onKeyDown: function onKeyDown(event) {
      if (onDetachedEscape && event.key === 'Escape') {
        event.preventDefault();
        onDetachedEscape();
        return;
      }

      inputProps.onKeyDown(event);
    }
  }));
  return element;
};

exports.Input = Input;
},{"../getCreateDomElement":"node_modules/@algolia/autocomplete-js/dist/esm/getCreateDomElement.js","../utils":"node_modules/@algolia/autocomplete-js/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/elements/LoadingIcon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingIcon = void 0;

var LoadingIcon = function LoadingIcon(_ref) {
  var environment = _ref.environment;
  var element = environment.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  element.setAttribute('class', 'aa-LoadingIcon');
  element.setAttribute('viewBox', '0 0 100 100');
  element.setAttribute('width', '20');
  element.setAttribute('height', '20');
  element.innerHTML = "<circle\n  cx=\"50\"\n  cy=\"50\"\n  fill=\"none\"\n  r=\"35\"\n  stroke=\"currentColor\"\n  stroke-dasharray=\"164.93361431346415 56.97787143782138\"\n  stroke-width=\"6\"\n>\n  <animateTransform\n    attributeName=\"transform\"\n    type=\"rotate\"\n    repeatCount=\"indefinite\"\n    dur=\"1s\"\n    values=\"0 50 50;90 50 50;180 50 50;360 50 50\"\n    keyTimes=\"0;0.40;0.65;1\"\n  />\n</circle>";
  return element;
};

exports.LoadingIcon = LoadingIcon;
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/elements/SearchIcon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchIcon = void 0;

var SearchIcon = function SearchIcon(_ref) {
  var environment = _ref.environment;
  var element = environment.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  element.setAttribute('class', 'aa-SubmitIcon');
  element.setAttribute('viewBox', '0 0 24 24');
  element.setAttribute('width', '20');
  element.setAttribute('height', '20');
  element.setAttribute('fill', 'currentColor');
  var path = environment.document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z');
  element.appendChild(path);
  return element;
};

exports.SearchIcon = SearchIcon;
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/elements/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ClearIcon = require("./ClearIcon");

Object.keys(_ClearIcon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ClearIcon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ClearIcon[key];
    }
  });
});

var _Input = require("./Input");

Object.keys(_Input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Input[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Input[key];
    }
  });
});

var _LoadingIcon = require("./LoadingIcon");

Object.keys(_LoadingIcon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LoadingIcon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LoadingIcon[key];
    }
  });
});

var _SearchIcon = require("./SearchIcon");

Object.keys(_SearchIcon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SearchIcon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SearchIcon[key];
    }
  });
});
},{"./ClearIcon":"node_modules/@algolia/autocomplete-js/dist/esm/elements/ClearIcon.js","./Input":"node_modules/@algolia/autocomplete-js/dist/esm/elements/Input.js","./LoadingIcon":"node_modules/@algolia/autocomplete-js/dist/esm/elements/LoadingIcon.js","./SearchIcon":"node_modules/@algolia/autocomplete-js/dist/esm/elements/SearchIcon.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/createAutocompleteDom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAutocompleteDom = createAutocompleteDom;

var _elements = require("./elements");

var _getCreateDomElement = require("./getCreateDomElement");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function createAutocompleteDom(_ref) {
  var autocomplete = _ref.autocomplete,
      autocompleteScopeApi = _ref.autocompleteScopeApi,
      classNames = _ref.classNames,
      environment = _ref.environment,
      isDetached = _ref.isDetached,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? 'Search' : _ref$placeholder,
      propGetters = _ref.propGetters,
      setIsModalOpen = _ref.setIsModalOpen,
      state = _ref.state;
  var createDomElement = (0, _getCreateDomElement.getCreateDomElement)(environment);
  var rootProps = propGetters.getRootProps(_objectSpread({
    state: state,
    props: autocomplete.getRootProps({})
  }, autocompleteScopeApi));
  var root = createDomElement('div', _objectSpread({
    class: classNames.root
  }, rootProps));
  var detachedContainer = createDomElement('div', {
    class: classNames.detachedContainer,
    onMouseDown: function onMouseDown(event) {
      event.stopPropagation();
    }
  });
  var detachedOverlay = createDomElement('div', {
    class: classNames.detachedOverlay,
    children: [detachedContainer],
    onMouseDown: function onMouseDown() {
      setIsModalOpen(false);
      autocomplete.setIsOpen(false);
    }
  });
  var labelProps = propGetters.getLabelProps(_objectSpread({
    state: state,
    props: autocomplete.getLabelProps({})
  }, autocompleteScopeApi));
  var submitButton = createDomElement('button', {
    class: classNames.submitButton,
    type: 'submit',
    title: 'Submit',
    children: [(0, _elements.SearchIcon)({
      environment: environment
    })]
  });
  var label = createDomElement('label', _objectSpread({
    class: classNames.label,
    children: [submitButton]
  }, labelProps));
  var clearButton = createDomElement('button', {
    class: classNames.clearButton,
    type: 'reset',
    title: 'Clear',
    children: [(0, _elements.ClearIcon)({
      environment: environment
    })]
  });
  var loadingIndicator = createDomElement('div', {
    class: classNames.loadingIndicator,
    children: [(0, _elements.LoadingIcon)({
      environment: environment
    })]
  });
  var input = (0, _elements.Input)({
    class: classNames.input,
    environment: environment,
    state: state,
    getInputProps: propGetters.getInputProps,
    getInputPropsCore: autocomplete.getInputProps,
    autocompleteScopeApi: autocompleteScopeApi,
    onDetachedEscape: isDetached ? function () {
      autocomplete.setIsOpen(false);
      setIsModalOpen(false);
    } : undefined
  });
  var inputWrapperPrefix = createDomElement('div', {
    class: classNames.inputWrapperPrefix,
    children: [label, loadingIndicator]
  });
  var inputWrapperSuffix = createDomElement('div', {
    class: classNames.inputWrapperSuffix,
    children: [clearButton]
  });
  var inputWrapper = createDomElement('div', {
    class: classNames.inputWrapper,
    children: [input]
  });
  var formProps = propGetters.getFormProps(_objectSpread({
    state: state,
    props: autocomplete.getFormProps({
      inputElement: input
    })
  }, autocompleteScopeApi));
  var form = createDomElement('form', _objectSpread({
    class: classNames.form,
    children: [inputWrapperPrefix, inputWrapper, inputWrapperSuffix]
  }, formProps));
  var panelProps = propGetters.getPanelProps(_objectSpread({
    state: state,
    props: autocomplete.getPanelProps({})
  }, autocompleteScopeApi));
  var panel = createDomElement('div', _objectSpread({
    class: classNames.panel
  }, panelProps));

  if ("development" === 'test') {
    (0, _utils.setProperties)(panel, {
      'data-testid': 'panel'
    });
  }

  if (isDetached) {
    var detachedSearchButtonIcon = createDomElement('div', {
      class: classNames.detachedSearchButtonIcon,
      children: [(0, _elements.SearchIcon)({
        environment: environment
      })]
    });
    var detachedSearchButtonPlaceholder = createDomElement('div', {
      class: classNames.detachedSearchButtonPlaceholder,
      textContent: placeholder
    });
    var detachedSearchButton = createDomElement('button', {
      class: classNames.detachedSearchButton,
      onClick: function onClick(event) {
        event.preventDefault();
        setIsModalOpen(true);
      },
      children: [detachedSearchButtonIcon, detachedSearchButtonPlaceholder]
    });
    var detachedCancelButton = createDomElement('button', {
      class: classNames.detachedCancelButton,
      textContent: 'Cancel',
      onClick: function onClick() {
        autocomplete.setIsOpen(false);
        setIsModalOpen(false);
      }
    });
    var detachedFormContainer = createDomElement('div', {
      class: classNames.detachedFormContainer,
      children: [form, detachedCancelButton]
    });
    detachedContainer.appendChild(detachedFormContainer);
    root.appendChild(detachedSearchButton);
  } else {
    root.appendChild(form);
  }

  return {
    detachedContainer: detachedContainer,
    detachedOverlay: detachedOverlay,
    inputWrapper: inputWrapper,
    input: input,
    root: root,
    form: form,
    label: label,
    submitButton: submitButton,
    clearButton: clearButton,
    loadingIndicator: loadingIndicator,
    panel: panel
  };
}
},{"./elements":"node_modules/@algolia/autocomplete-js/dist/esm/elements/index.js","./getCreateDomElement":"node_modules/@algolia/autocomplete-js/dist/esm/getCreateDomElement.js","./utils":"node_modules/@algolia/autocomplete-js/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/createEffectWrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEffectWrapper = createEffectWrapper;

function createEffectWrapper() {
  var effects = [];
  var cleanups = [];

  function runEffect(fn) {
    effects.push(fn);
    var effectCleanup = fn();
    cleanups.push(effectCleanup);
  }

  return {
    runEffect: runEffect,
    cleanupEffects: function cleanupEffects() {
      var currentCleanups = cleanups;
      cleanups = [];
      currentCleanups.forEach(function (cleanup) {
        cleanup();
      });
    },
    runEffects: function runEffects() {
      var currentEffects = effects;
      effects = [];
      currentEffects.forEach(function (effect) {
        runEffect(effect);
      });
    }
  };
}
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/createReactiveWrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReactiveWrapper = createReactiveWrapper;

function createReactiveWrapper() {
  var reactives = [];
  return {
    reactive: function reactive(value) {
      var current = value();
      var reactive = {
        _fn: value,
        _ref: {
          current: current
        },

        get value() {
          return this._ref.current;
        },

        set value(value) {
          this._ref.current = value;
        }

      };
      reactives.push(reactive);
      return reactive;
    },
    runReactives: function runReactives() {
      reactives.forEach(function (value) {
        value._ref.current = value._fn();
      });
    }
  };
}
},{}],"node_modules/preact/dist/preact.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = N;
exports.hydrate = O;
exports.h = exports.createElement = a;
exports.Fragment = y;
exports.createRef = h;
exports.Component = p;
exports.cloneElement = S;
exports.createContext = q;
exports.toChildArray = w;
exports.options = exports.isValidElement = void 0;
var n,
    l,
    u,
    i,
    t,
    o,
    r = {},
    f = [],
    e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
exports.isValidElement = l;
exports.options = n;

function c(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function s(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function a(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = {};

  for (o in l) "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
  if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (o in n.defaultProps) void 0 === f[o] && (f[o] = n.defaultProps[o]);
  return v(n, f, i, t, null);
}

function v(l, u, i, t, o) {
  var r = {
    type: l,
    props: u,
    key: i,
    ref: t,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o ? ++n.__v : o
  };
  return null != n.vnode && n.vnode(r), r;
}

function h() {
  return {
    current: null
  };
}

function y(n) {
  return n.children;
}

function p(n, l) {
  this.props = n, this.context = l;
}

function d(n, l) {
  if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? d(n) : null;
}

function _(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return _(n);
  }
}

function k(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
}

function b() {
  for (var n; b.__r = u.length;) n = u.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }), u = [], n.some(function (n) {
    var l, u, i, t, o, r;
    n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = c({}, t)).__v = t.__v + 1, I(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? d(t) : o, t.__h), T(u, t), t.__e != o && _(t)));
  });
}

function m(n, l, u, i, t, o, e, c, s, a) {
  var h,
      p,
      _,
      k,
      b,
      m,
      w,
      A = i && i.__k || f,
      P = A.length;

  for (u.__k = [], h = 0; h < l.length; h++) if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(y, {
    children: k
  }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
    if (k.__ = u, k.__b = u.__b + 1, null === (_ = A[h]) || _ && k.key == _.key && k.type === _.type) A[h] = void 0;else for (p = 0; p < P; p++) {
      if ((_ = A[p]) && k.key == _.key && k.type === _.type) {
        A[p] = void 0;
        break;
      }

      _ = null;
    }
    I(n, k, _ = _ || r, t, o, e, c, s, a), b = k.__e, (p = k.ref) && _.ref != p && (w || (w = []), _.ref && w.push(_.ref, null, k), w.push(p, k.__c || b, k)), null != b ? (null == m && (m = b), "function" == typeof k.type && null != k.__k && k.__k === _.__k ? k.__d = s = g(k, s, n) : s = x(n, k, _, A, b, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && _.__e == s && s.parentNode != n && (s = d(_));
  }

  for (u.__e = m, h = P; h--;) null != A[h] && ("function" == typeof u.type && null != A[h].__e && A[h].__e == u.__d && (u.__d = d(i, h + 1)), L(A[h], A[h]));

  if (w) for (h = 0; h < w.length; h++) z(w[h], w[++h], w[++h]);
}

function g(n, l, u) {
  var i, t;

  for (i = 0; i < n.__k.length; i++) (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? g(t, l, u) : x(u, t, t, n.__k, t.__e, l));

  return l;
}

function w(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    w(n, l);
  }) : l.push(n)), l;
}

function x(n, l, u, i, t, o) {
  var r, f, e;
  if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
    for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;

    n.insertBefore(t, o), r = o;
  }
  return void 0 !== r ? r : t.nextSibling;
}

function A(n, l, u, i, t) {
  var o;

  for (o in u) "children" === o || "key" === o || o in l || C(n, o, null, u[o], i);

  for (o in l) t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], i);
}

function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || e.test(l) ? u : u + "px";
}

function C(n, l, u, i, t) {
  var o;

  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || P(n.style, l, "");
      if (u) for (l in u) i && u[l] === i[l] || P(n.style, l, u[l]);
    }
  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? H : $, o) : n.removeEventListener(l, o ? H : $, o);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}

function $(l) {
  this.l[l.type + !1](n.event ? n.event(l) : l);
}

function H(l) {
  this.l[l.type + !0](n.event ? n.event(l) : l);
}

function I(l, u, i, t, o, r, f, e, s) {
  var a,
      v,
      h,
      d,
      _,
      k,
      b,
      g,
      w,
      x,
      A,
      P = u.type;

  if (void 0 !== u.constructor) return null;
  null != i.__h && (s = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (g = u.props, w = (a = P.contextType) && t[a.__c], x = a ? w ? w.props.value : a.__ : t, i.__c ? b = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new p(g, x), v.constructor = P, v.render = M), w && w.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = c({}, v.__s)), c(v.__s, P.getDerivedStateFromProps(g, v.__s))), d = v.props, _ = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== d && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v) {
          v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), v.__h.length && f.push(v);
          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
          v.componentDidUpdate(d, _, k);
        });
      }
      v.context = x, v.props = g, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (t = c(c({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (k = v.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === y && null == a.key ? a.props.children : a, m(l, Array.isArray(A) ? A : [A], u, i, t, o, r, f, e, s), v.base = u.__e, u.__h = null, v.__h.length && f.push(v), b && (v.__E = v.__ = null), v.__e = !1;
    } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = j(i.__e, u, i, t, o, r, f, s);

    (a = n.diffed) && a(u);
  } catch (l) {
    u.__v = null, (s || null != r) && (u.__e = e, u.__h = !!s, r[r.indexOf(e)] = null), n.__e(l, u, i);
  }
}

function T(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function j(n, l, u, i, t, o, e, c) {
  var a,
      v,
      h,
      y,
      p = u.props,
      d = l.props,
      _ = l.type,
      k = 0;
  if ("svg" === _ && (t = !0), null != o) for (; k < o.length; k++) if ((a = o[k]) && (a === n || (_ ? a.localName == _ : 3 == a.nodeType))) {
    n = a, o[k] = null;
    break;
  }

  if (null == n) {
    if (null === _) return document.createTextNode(d);
    n = t ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), o = null, c = !1;
  }

  if (null === _) p === d || c && n.data === d || (n.data = d);else {
    if (o = o && f.slice.call(n.childNodes), v = (p = u.props || r).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
      if (null != o) for (p = {}, y = 0; y < n.attributes.length; y++) p[n.attributes[y].name] = n.attributes[y].value;
      (h || v) && (h && (v && h.__html == v.__html || h.__html === n.innerHTML) || (n.innerHTML = h && h.__html || ""));
    }

    if (A(n, d, p, t, c), h) l.__k = [];else if (k = l.props.children, m(n, Array.isArray(k) ? k : [k], l, u, i, t && "foreignObject" !== _, o, e, n.firstChild, c), null != o) for (k = o.length; k--;) null != o[k] && s(o[k]);
    c || ("value" in d && void 0 !== (k = d.value) && (k !== n.value || "progress" === _ && !k) && C(n, "value", k, p.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== n.checked && C(n, "checked", k, p.checked, !1));
  }
  return n;
}

function z(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}

function L(l, u, i) {
  var t, o, r;

  if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || z(t, null, u)), i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    t.base = t.__P = null;
  }

  if (t = l.__k) for (r = 0; r < t.length; r++) t[r] && L(t[r], u, i);
  null != o && s(o);
}

function M(n, l, u) {
  return this.constructor(n, u);
}

function N(l, u, i) {
  var t, o, e;
  n.__ && n.__(l, u), o = (t = "function" == typeof i) ? null : i && i.__k || u.__k, e = [], I(u, l = (!t && i || u).__k = a(y, null, [l]), o || r, r, void 0 !== u.ownerSVGElement, !t && i ? [i] : o ? null : u.firstChild ? f.slice.call(u.childNodes) : null, e, !t && i ? i : o ? o.__e : u.firstChild, t), T(e, l);
}

function O(n, l) {
  N(n, l, O);
}

function S(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = c({}, n.props);

  for (o in l) "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
  return null != u && (f.children = u), v(n.type, f, i || n.key, t || n.ref, null);
}

function q(n, l) {
  var u = {
    __c: l = "__cC" + o++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(k);
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}

exports.options = n = {
  __e: function (n, l) {
    for (var u, i, t; l = l.__;) if ((u = l.__c) && !u.__) try {
      if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
    } catch (l) {
      n = l;
    }

    throw n;
  },
  __v: 0
}, exports.isValidElement = l = function (n) {
  return null != n && void 0 === n.constructor;
}, p.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof n && (n = n(c({}, u), this.props)), n && c(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
}, p.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), k(this));
}, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;
},{}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/HighlightedHit.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/constants/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HIGHLIGHT_POST_TAG = exports.HIGHLIGHT_PRE_TAG = void 0;
var HIGHLIGHT_PRE_TAG = '__aa-highlight__';
exports.HIGHLIGHT_PRE_TAG = HIGHLIGHT_PRE_TAG;
var HIGHLIGHT_POST_TAG = '__/aa-highlight__';
exports.HIGHLIGHT_POST_TAG = HIGHLIGHT_POST_TAG;
},{}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAttribute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAttribute = parseAttribute;

var _constants = require("../constants");

/**
 * Creates a data structure that allows to concatenate similar highlighting
 * parts in a single value.
 */
function createAttributeSet() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = initialValue;
  return {
    get: function get() {
      return value;
    },
    add: function add(part) {
      var lastPart = value[value.length - 1];

      if ((lastPart === null || lastPart === void 0 ? void 0 : lastPart.isHighlighted) === part.isHighlighted) {
        value[value.length - 1] = {
          value: lastPart.value + part.value,
          isHighlighted: lastPart.isHighlighted
        };
      } else {
        value.push(part);
      }
    }
  };
}

function parseAttribute(_ref) {
  var highlightedValue = _ref.highlightedValue;
  var preTagParts = highlightedValue.split(_constants.HIGHLIGHT_PRE_TAG);
  var firstValue = preTagParts.shift();
  var parts = createAttributeSet(firstValue ? [{
    value: firstValue,
    isHighlighted: false
  }] : []);
  preTagParts.forEach(function (part) {
    var postTagParts = part.split(_constants.HIGHLIGHT_POST_TAG);
    parts.add({
      value: postTagParts[0],
      isHighlighted: true
    });

    if (postTagParts[1] !== '') {
      parts.add({
        value: postTagParts[1],
        isHighlighted: false
      });
    }
  });
  return parts.get();
}
},{"../constants":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/constants/index.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitHighlight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAlgoliaHitHighlight = parseAlgoliaHitHighlight;

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _parseAttribute = require("./parseAttribute");

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function parseAlgoliaHitHighlight(_ref) {
  var hit = _ref.hit,
      attribute = _ref.attribute;
  var path = Array.isArray(attribute) ? attribute : [attribute];
  var highlightedValue = (0, _autocompleteShared.getAttributeValueByPath)(hit, ['_highlightResult'].concat(_toConsumableArray(path), ['value']));

  if (typeof highlightedValue !== 'string') {
    "development" !== 'production' ? (0, _autocompleteShared.warn)(false, "The attribute \"".concat(path.join('.'), "\" described by the path ").concat(JSON.stringify(path), " does not exist on the hit. Did you set it in `attributesToHighlight`?") + '\nSee https://www.algolia.com/doc/api-reference/api-parameters/attributesToHighlight/') : void 0;
    highlightedValue = (0, _autocompleteShared.getAttributeValueByPath)(hit, path) || '';
  }

  return (0, _parseAttribute.parseAttribute)({
    highlightedValue: highlightedValue
  });
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./parseAttribute":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAttribute.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/isPartHighlighted.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPartHighlighted = isPartHighlighted;
var htmlEscapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};
var hasAlphanumeric = new RegExp(/\w/i);
var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);

function unescape(value) {
  return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function (character) {
    return htmlEscapes[character];
  }) : value;
}

function isPartHighlighted(parts, i) {
  var _parts, _parts2;

  var current = parts[i];
  var isNextHighlighted = ((_parts = parts[i + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
  var isPreviousHighlighted = ((_parts2 = parts[i - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;

  if (!hasAlphanumeric.test(unescape(current.value)) && isPreviousHighlighted === isNextHighlighted) {
    return isPreviousHighlighted;
  }

  return current.isHighlighted;
}
},{}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/reverseHighlightedParts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseHighlightedParts = reverseHighlightedParts;

var _isPartHighlighted = require("./isPartHighlighted");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function reverseHighlightedParts(parts) {
  // We don't want to highlight the whole word when no parts match.
  if (!parts.some(function (part) {
    return part.isHighlighted;
  })) {
    return parts.map(function (part) {
      return _objectSpread(_objectSpread({}, part), {}, {
        isHighlighted: false
      });
    });
  }

  return parts.map(function (part, i) {
    return _objectSpread(_objectSpread({}, part), {}, {
      isHighlighted: !(0, _isPartHighlighted.isPartHighlighted)(parts, i)
    });
  });
}
},{"./isPartHighlighted":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/isPartHighlighted.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitReverseHighlight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAlgoliaHitReverseHighlight = parseAlgoliaHitReverseHighlight;

var _parseAlgoliaHitHighlight = require("./parseAlgoliaHitHighlight");

var _reverseHighlightedParts = require("./reverseHighlightedParts");

function parseAlgoliaHitReverseHighlight(props) {
  return (0, _reverseHighlightedParts.reverseHighlightedParts)((0, _parseAlgoliaHitHighlight.parseAlgoliaHitHighlight)(props));
}
},{"./parseAlgoliaHitHighlight":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitHighlight.js","./reverseHighlightedParts":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/reverseHighlightedParts.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitSnippet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAlgoliaHitSnippet = parseAlgoliaHitSnippet;

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _parseAttribute = require("./parseAttribute");

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function parseAlgoliaHitSnippet(_ref) {
  var hit = _ref.hit,
      attribute = _ref.attribute;
  var path = Array.isArray(attribute) ? attribute : [attribute];
  var highlightedValue = (0, _autocompleteShared.getAttributeValueByPath)(hit, ['_snippetResult'].concat(_toConsumableArray(path), ['value']));

  if (typeof highlightedValue !== 'string') {
    "development" !== 'production' ? (0, _autocompleteShared.warn)(false, "The attribute \"".concat(path.join('.'), "\" described by the path ").concat(JSON.stringify(path), " does not exist on the hit. Did you set it in `attributesToSnippet`?") + '\nSee https://www.algolia.com/doc/api-reference/api-parameters/attributesToSnippet/') : void 0;
    highlightedValue = (0, _autocompleteShared.getAttributeValueByPath)(hit, path) || '';
  }

  return (0, _parseAttribute.parseAttribute)({
    highlightedValue: highlightedValue
  });
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./parseAttribute":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAttribute.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitReverseSnippet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAlgoliaHitReverseSnippet = parseAlgoliaHitReverseSnippet;

var _parseAlgoliaHitSnippet = require("./parseAlgoliaHitSnippet");

var _reverseHighlightedParts = require("./reverseHighlightedParts");

function parseAlgoliaHitReverseSnippet(props) {
  return (0, _reverseHighlightedParts.reverseHighlightedParts)((0, _parseAlgoliaHitSnippet.parseAlgoliaHitSnippet)(props));
}
},{"./parseAlgoliaHitSnippet":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitSnippet.js","./reverseHighlightedParts":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/reverseHighlightedParts.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/SnippetedHit.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HighlightedHit = require("./HighlightedHit");

Object.keys(_HighlightedHit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HighlightedHit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _HighlightedHit[key];
    }
  });
});

var _parseAlgoliaHitHighlight = require("./parseAlgoliaHitHighlight");

Object.keys(_parseAlgoliaHitHighlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parseAlgoliaHitHighlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parseAlgoliaHitHighlight[key];
    }
  });
});

var _parseAlgoliaHitReverseHighlight = require("./parseAlgoliaHitReverseHighlight");

Object.keys(_parseAlgoliaHitReverseHighlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parseAlgoliaHitReverseHighlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parseAlgoliaHitReverseHighlight[key];
    }
  });
});

var _parseAlgoliaHitReverseSnippet = require("./parseAlgoliaHitReverseSnippet");

Object.keys(_parseAlgoliaHitReverseSnippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parseAlgoliaHitReverseSnippet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parseAlgoliaHitReverseSnippet[key];
    }
  });
});

var _parseAlgoliaHitSnippet = require("./parseAlgoliaHitSnippet");

Object.keys(_parseAlgoliaHitSnippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parseAlgoliaHitSnippet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parseAlgoliaHitSnippet[key];
    }
  });
});

var _SnippetedHit = require("./SnippetedHit");

Object.keys(_SnippetedHit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SnippetedHit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SnippetedHit[key];
    }
  });
});
},{"./HighlightedHit":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/HighlightedHit.js","./parseAlgoliaHitHighlight":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitHighlight.js","./parseAlgoliaHitReverseHighlight":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitReverseHighlight.js","./parseAlgoliaHitReverseSnippet":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitReverseSnippet.js","./parseAlgoliaHitSnippet":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/parseAlgoliaHitSnippet.js","./SnippetedHit":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/SnippetedHit.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/createRequester.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRequester = createRequester;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function createRequester(fetcher) {
  function execute(fetcherParams) {
    return fetcher({
      searchClient: fetcherParams.searchClient,
      queries: fetcherParams.requests.map(function (x) {
        return x.query;
      })
    }).then(function (responses) {
      return responses.map(function (response, index) {
        var _fetcherParams$reques = fetcherParams.requests[index],
            sourceId = _fetcherParams$reques.sourceId,
            transformResponse = _fetcherParams$reques.transformResponse;
        return {
          items: response,
          sourceId: sourceId,
          transformResponse: transformResponse
        };
      });
    });
  }

  return function createSpecifiedRequester(requesterParams) {
    return function requester(requestParams) {
      return _objectSpread(_objectSpread({
        execute: execute
      }, requesterParams), requestParams);
    };
  };
}
},{}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
var version = '1.0.1';
exports.version = version;
},{}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/search/fetchAlgoliaResults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAlgoliaResults = fetchAlgoliaResults;

var _constants = require("../constants");

var _version = require("../version");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function fetchAlgoliaResults(_ref) {
  var searchClient = _ref.searchClient,
      queries = _ref.queries,
      _ref$userAgents = _ref.userAgents,
      userAgents = _ref$userAgents === void 0 ? [] : _ref$userAgents;

  if (typeof searchClient.addAlgoliaAgent === 'function') {
    var algoliaAgents = [{
      segment: 'autocomplete-core',
      version: _version.version
    }].concat(_toConsumableArray(userAgents));
    algoliaAgents.forEach(function (_ref2) {
      var segment = _ref2.segment,
          version = _ref2.version;
      searchClient.addAlgoliaAgent(segment, version);
    });
  }

  return searchClient.search(queries.map(function (searchParameters) {
    var params = searchParameters.params,
        headers = _objectWithoutProperties(searchParameters, ["params"]);

    return _objectSpread(_objectSpread({}, headers), {}, {
      params: _objectSpread({
        hitsPerPage: 5,
        highlightPreTag: _constants.HIGHLIGHT_PRE_TAG,
        highlightPostTag: _constants.HIGHLIGHT_POST_TAG
      }, params)
    });
  })).then(function (response) {
    return response.results;
  });
}
},{"../constants":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/constants/index.js","../version":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/version.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/search/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchAlgoliaResults = require("./fetchAlgoliaResults");

Object.keys(_fetchAlgoliaResults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fetchAlgoliaResults[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fetchAlgoliaResults[key];
    }
  });
});
},{"./fetchAlgoliaResults":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/search/fetchAlgoliaResults.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/createAlgoliaRequester.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAlgoliaRequester = void 0;

var _search = require("../search");

var _createRequester = require("./createRequester");

var createAlgoliaRequester = (0, _createRequester.createRequester)(_search.fetchAlgoliaResults);
exports.createAlgoliaRequester = createAlgoliaRequester;
},{"../search":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/search/index.js","./createRequester":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/createRequester.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/getAlgoliaFacets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlgoliaFacets = getAlgoliaFacets;

var _createAlgoliaRequester = require("./createAlgoliaRequester");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Retrieves Algolia facet hits from multiple indices.
 */
function getAlgoliaFacets(requestParams) {
  var requester = (0, _createAlgoliaRequester.createAlgoliaRequester)({
    transformResponse: function transformResponse(response) {
      return response.facetHits;
    }
  });
  var queries = requestParams.queries.map(function (query) {
    return _objectSpread(_objectSpread({}, query), {}, {
      type: 'facet'
    });
  });
  return requester(_objectSpread(_objectSpread({}, requestParams), {}, {
    queries: queries
  }));
}
},{"./createAlgoliaRequester":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/createAlgoliaRequester.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/getAlgoliaResults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlgoliaResults = void 0;

var _createAlgoliaRequester = require("./createAlgoliaRequester");

/**
 * Retrieves Algolia results from multiple indices.
 */
var getAlgoliaResults = (0, _createAlgoliaRequester.createAlgoliaRequester)({
  transformResponse: function transformResponse(response) {
    return response.hits;
  }
});
exports.getAlgoliaResults = getAlgoliaResults;
},{"./createAlgoliaRequester":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/createAlgoliaRequester.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createRequester = require("./createRequester");

Object.keys(_createRequester).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createRequester[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createRequester[key];
    }
  });
});

var _getAlgoliaFacets = require("./getAlgoliaFacets");

Object.keys(_getAlgoliaFacets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getAlgoliaFacets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getAlgoliaFacets[key];
    }
  });
});

var _getAlgoliaResults = require("./getAlgoliaResults");

Object.keys(_getAlgoliaResults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getAlgoliaResults[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getAlgoliaResults[key];
    }
  });
});
},{"./createRequester":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/createRequester.js","./getAlgoliaFacets":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/getAlgoliaFacets.js","./getAlgoliaResults":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/getAlgoliaResults.js"}],"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highlight = require("./highlight");

Object.keys(_highlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _highlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _highlight[key];
    }
  });
});

var _requester = require("./requester");

Object.keys(_requester).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _requester[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _requester[key];
    }
  });
});

var _search = require("./search");

Object.keys(_search).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _search[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _search[key];
    }
  });
});
},{"./highlight":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/highlight/index.js","./requester":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/requester/index.js","./search":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/search/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/components/Highlight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHighlightComponent = createHighlightComponent;

var _autocompletePresetAlgolia = require("@algolia/autocomplete-preset-algolia");

function createHighlightComponent(_ref) {
  var createElement = _ref.createElement,
      Fragment = _ref.Fragment;
  return function Highlight(_ref2) {
    var hit = _ref2.hit,
        attribute = _ref2.attribute,
        _ref2$tagName = _ref2.tagName,
        tagName = _ref2$tagName === void 0 ? 'mark' : _ref2$tagName;
    return createElement(Fragment, {}, (0, _autocompletePresetAlgolia.parseAlgoliaHitHighlight)({
      hit: hit,
      attribute: attribute
    }).map(function (x, index) {
      return x.isHighlighted ? createElement(tagName, {
        key: index
      }, x.value) : x.value;
    }));
  };
}
},{"@algolia/autocomplete-preset-algolia":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/components/ReverseHighlight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReverseHighlightComponent = createReverseHighlightComponent;

var _autocompletePresetAlgolia = require("@algolia/autocomplete-preset-algolia");

function createReverseHighlightComponent(_ref) {
  var createElement = _ref.createElement,
      Fragment = _ref.Fragment;
  return function ReverseHighlight(_ref2) {
    var hit = _ref2.hit,
        attribute = _ref2.attribute,
        _ref2$tagName = _ref2.tagName,
        tagName = _ref2$tagName === void 0 ? 'mark' : _ref2$tagName;
    return createElement(Fragment, {}, (0, _autocompletePresetAlgolia.parseAlgoliaHitReverseHighlight)({
      hit: hit,
      attribute: attribute
    }).map(function (x, index) {
      return x.isHighlighted ? createElement(tagName, {
        key: index
      }, x.value) : x.value;
    }));
  };
}
},{"@algolia/autocomplete-preset-algolia":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/components/ReverseSnippet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReverseSnippetComponent = createReverseSnippetComponent;

var _autocompletePresetAlgolia = require("@algolia/autocomplete-preset-algolia");

function createReverseSnippetComponent(_ref) {
  var createElement = _ref.createElement,
      Fragment = _ref.Fragment;
  return function ReverseSnippet(_ref2) {
    var hit = _ref2.hit,
        attribute = _ref2.attribute,
        _ref2$tagName = _ref2.tagName,
        tagName = _ref2$tagName === void 0 ? 'mark' : _ref2$tagName;
    return createElement(Fragment, {}, (0, _autocompletePresetAlgolia.parseAlgoliaHitReverseSnippet)({
      hit: hit,
      attribute: attribute
    }).map(function (x, index) {
      return x.isHighlighted ? createElement(tagName, {
        key: index
      }, x.value) : x.value;
    }));
  };
}
},{"@algolia/autocomplete-preset-algolia":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/components/Snippet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSnippetComponent = createSnippetComponent;

var _autocompletePresetAlgolia = require("@algolia/autocomplete-preset-algolia");

function createSnippetComponent(_ref) {
  var createElement = _ref.createElement,
      Fragment = _ref.Fragment;
  return function Snippet(_ref2) {
    var hit = _ref2.hit,
        attribute = _ref2.attribute,
        _ref2$tagName = _ref2.tagName,
        tagName = _ref2$tagName === void 0 ? 'mark' : _ref2$tagName;
    return createElement(Fragment, {}, (0, _autocompletePresetAlgolia.parseAlgoliaHitSnippet)({
      hit: hit,
      attribute: attribute
    }).map(function (x, index) {
      return x.isHighlighted ? createElement(tagName, {
        key: index
      }, x.value) : x.value;
    }));
  };
}
},{"@algolia/autocomplete-preset-algolia":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Highlight = require("./Highlight");

Object.keys(_Highlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Highlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Highlight[key];
    }
  });
});

var _ReverseHighlight = require("./ReverseHighlight");

Object.keys(_ReverseHighlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ReverseHighlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ReverseHighlight[key];
    }
  });
});

var _ReverseSnippet = require("./ReverseSnippet");

Object.keys(_ReverseSnippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ReverseSnippet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ReverseSnippet[key];
    }
  });
});

var _Snippet = require("./Snippet");

Object.keys(_Snippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Snippet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Snippet[key];
    }
  });
});
},{"./Highlight":"node_modules/@algolia/autocomplete-js/dist/esm/components/Highlight.js","./ReverseHighlight":"node_modules/@algolia/autocomplete-js/dist/esm/components/ReverseHighlight.js","./ReverseSnippet":"node_modules/@algolia/autocomplete-js/dist/esm/components/ReverseSnippet.js","./Snippet":"node_modules/@algolia/autocomplete-js/dist/esm/components/Snippet.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/getDefaultOptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultOptions = getDefaultOptions;

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _preact = require("preact");

var _components = require("./components");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var defaultClassNames = {
  clearButton: 'aa-ClearButton',
  detachedCancelButton: 'aa-DetachedCancelButton',
  detachedContainer: 'aa-DetachedContainer',
  detachedFormContainer: 'aa-DetachedFormContainer',
  detachedOverlay: 'aa-DetachedOverlay',
  detachedSearchButton: 'aa-DetachedSearchButton',
  detachedSearchButtonIcon: 'aa-DetachedSearchButtonIcon',
  detachedSearchButtonPlaceholder: 'aa-DetachedSearchButtonPlaceholder',
  form: 'aa-Form',
  input: 'aa-Input',
  inputWrapper: 'aa-InputWrapper',
  inputWrapperPrefix: 'aa-InputWrapperPrefix',
  inputWrapperSuffix: 'aa-InputWrapperSuffix',
  item: 'aa-Item',
  label: 'aa-Label',
  list: 'aa-List',
  loadingIndicator: 'aa-LoadingIndicator',
  panel: 'aa-Panel',
  panelLayout: 'aa-PanelLayout',
  root: 'aa-Autocomplete',
  source: 'aa-Source',
  sourceFooter: 'aa-SourceFooter',
  sourceHeader: 'aa-SourceHeader',
  sourceNoResults: 'aa-SourceNoResults',
  submitButton: 'aa-SubmitButton'
};

var defaultRender = function defaultRender(_ref, root) {
  var children = _ref.children;
  (0, _preact.render)(children, root);
};

var defaultRenderer = {
  createElement: _preact.createElement,
  Fragment: _preact.Fragment
};

function getDefaultOptions(options) {
  var _core$id;

  var classNames = options.classNames,
      container = options.container,
      getEnvironmentProps = options.getEnvironmentProps,
      getFormProps = options.getFormProps,
      getInputProps = options.getInputProps,
      getItemProps = options.getItemProps,
      getLabelProps = options.getLabelProps,
      getListProps = options.getListProps,
      getPanelProps = options.getPanelProps,
      getRootProps = options.getRootProps,
      panelContainer = options.panelContainer,
      panelPlacement = options.panelPlacement,
      render = options.render,
      renderNoResults = options.renderNoResults,
      renderer = options.renderer,
      detachedMediaQuery = options.detachedMediaQuery,
      components = options.components,
      core = _objectWithoutProperties(options, ["classNames", "container", "getEnvironmentProps", "getFormProps", "getInputProps", "getItemProps", "getLabelProps", "getListProps", "getPanelProps", "getRootProps", "panelContainer", "panelPlacement", "render", "renderNoResults", "renderer", "detachedMediaQuery", "components"]);
  /* eslint-disable no-restricted-globals */


  var environment = typeof window !== 'undefined' ? window : {};
  /* eslint-enable no-restricted-globals */

  var containerElement = (0, _utils.getHTMLElement)(environment, container);
  (0, _autocompleteShared.invariant)(containerElement.tagName !== 'INPUT', 'The `container` option does not support `input` elements. You need to change the container to a `div`.');
  var defaultedRenderer = renderer !== null && renderer !== void 0 ? renderer : defaultRenderer;
  var defaultComponents = {
    Highlight: (0, _components.createHighlightComponent)(defaultedRenderer),
    ReverseHighlight: (0, _components.createReverseHighlightComponent)(defaultedRenderer),
    ReverseSnippet: (0, _components.createReverseSnippetComponent)(defaultedRenderer),
    Snippet: (0, _components.createSnippetComponent)(defaultedRenderer)
  };
  return {
    renderer: {
      classNames: (0, _utils.mergeClassNames)(defaultClassNames, classNames !== null && classNames !== void 0 ? classNames : {}),
      container: containerElement,
      getEnvironmentProps: getEnvironmentProps !== null && getEnvironmentProps !== void 0 ? getEnvironmentProps : function (_ref2) {
        var props = _ref2.props;
        return props;
      },
      getFormProps: getFormProps !== null && getFormProps !== void 0 ? getFormProps : function (_ref3) {
        var props = _ref3.props;
        return props;
      },
      getInputProps: getInputProps !== null && getInputProps !== void 0 ? getInputProps : function (_ref4) {
        var props = _ref4.props;
        return props;
      },
      getItemProps: getItemProps !== null && getItemProps !== void 0 ? getItemProps : function (_ref5) {
        var props = _ref5.props;
        return props;
      },
      getLabelProps: getLabelProps !== null && getLabelProps !== void 0 ? getLabelProps : function (_ref6) {
        var props = _ref6.props;
        return props;
      },
      getListProps: getListProps !== null && getListProps !== void 0 ? getListProps : function (_ref7) {
        var props = _ref7.props;
        return props;
      },
      getPanelProps: getPanelProps !== null && getPanelProps !== void 0 ? getPanelProps : function (_ref8) {
        var props = _ref8.props;
        return props;
      },
      getRootProps: getRootProps !== null && getRootProps !== void 0 ? getRootProps : function (_ref9) {
        var props = _ref9.props;
        return props;
      },
      panelContainer: panelContainer ? (0, _utils.getHTMLElement)(environment, panelContainer) : environment.document.body,
      panelPlacement: panelPlacement !== null && panelPlacement !== void 0 ? panelPlacement : 'input-wrapper-width',
      render: render !== null && render !== void 0 ? render : defaultRender,
      renderNoResults: renderNoResults,
      renderer: defaultedRenderer,
      detachedMediaQuery: detachedMediaQuery !== null && detachedMediaQuery !== void 0 ? detachedMediaQuery : getComputedStyle(environment.document.documentElement).getPropertyValue('--aa-detached-media-query'),
      components: _objectSpread(_objectSpread({}, defaultComponents), components)
    },
    core: _objectSpread(_objectSpread({}, core), {}, {
      id: (_core$id = core.id) !== null && _core$id !== void 0 ? _core$id : (0, _autocompleteShared.generateAutocompleteId)(),
      environment: environment
    })
  };
}
},{"@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","preact":"node_modules/preact/dist/preact.module.js","./components":"node_modules/@algolia/autocomplete-js/dist/esm/components/index.js","./utils":"node_modules/@algolia/autocomplete-js/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/getPanelPlacementStyle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPanelPlacementStyle = getPanelPlacementStyle;

function getPanelPlacementStyle(_ref) {
  var panelPlacement = _ref.panelPlacement,
      container = _ref.container,
      form = _ref.form,
      environment = _ref.environment;
  var containerRect = container.getBoundingClientRect();
  var top = containerRect.top + containerRect.height;

  switch (panelPlacement) {
    case 'start':
      {
        return {
          top: top,
          left: containerRect.left
        };
      }

    case 'end':
      {
        return {
          top: top,
          right: environment.document.documentElement.clientWidth - (containerRect.left + containerRect.width)
        };
      }

    case 'full-width':
      {
        return {
          top: top,
          left: 0,
          right: 0,
          width: 'unset',
          maxWidth: 'unset'
        };
      }

    case 'input-wrapper-width':
      {
        var formRect = form.getBoundingClientRect();
        return {
          top: top,
          left: formRect.left,
          right: environment.document.documentElement.clientWidth - (formRect.left + formRect.width),
          width: 'unset',
          maxWidth: 'unset'
        };
      }

    default:
      {
        throw new Error("[Autocomplete] The `panelPlacement` value ".concat(JSON.stringify(panelPlacement), " is not valid."));
      }
  }
}
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSearchBox = renderSearchBox;
exports.renderPanel = renderPanel;

var _utils = require("./utils");

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/** @jsx createElement */


function renderSearchBox(_ref) {
  var autocomplete = _ref.autocomplete,
      autocompleteScopeApi = _ref.autocompleteScopeApi,
      dom = _ref.dom,
      propGetters = _ref.propGetters,
      state = _ref.state;
  (0, _utils.setPropertiesWithoutEvents)(dom.root, propGetters.getRootProps(_objectSpread({
    state: state,
    props: autocomplete.getRootProps({})
  }, autocompleteScopeApi)));
  (0, _utils.setPropertiesWithoutEvents)(dom.input, propGetters.getInputProps(_objectSpread({
    state: state,
    props: autocomplete.getInputProps({
      inputElement: dom.input
    }),
    inputElement: dom.input
  }, autocompleteScopeApi)));
  (0, _utils.setProperties)(dom.label, {
    hidden: state.status === 'stalled'
  });
  (0, _utils.setProperties)(dom.loadingIndicator, {
    hidden: state.status !== 'stalled'
  });
  (0, _utils.setProperties)(dom.clearButton, {
    hidden: !state.query
  });
}

function renderPanel(render, _ref2) {
  var autocomplete = _ref2.autocomplete,
      autocompleteScopeApi = _ref2.autocompleteScopeApi,
      classNames = _ref2.classNames,
      createElement = _ref2.createElement,
      dom = _ref2.dom,
      Fragment = _ref2.Fragment,
      panelContainer = _ref2.panelContainer,
      propGetters = _ref2.propGetters,
      state = _ref2.state,
      components = _ref2.components;

  if (!state.isOpen) {
    if (panelContainer.contains(dom.panel)) {
      panelContainer.removeChild(dom.panel);
    }

    return;
  } // We add the panel element to the DOM when it's not yet appended and that the
  // items are fetched.


  if (!panelContainer.contains(dom.panel) && state.status !== 'loading') {
    panelContainer.appendChild(dom.panel);
  }

  dom.panel.classList.toggle('aa-Panel--stalled', state.status === 'stalled');
  var sections = state.collections.map(function (_ref3, sourceIndex) {
    var source = _ref3.source,
        items = _ref3.items;
    return createElement("section", {
      key: sourceIndex,
      className: classNames.source,
      "data-autocomplete-source-id": source.sourceId
    }, source.templates.header && createElement("div", {
      className: classNames.sourceHeader
    }, source.templates.header({
      components: components,
      createElement: createElement,
      Fragment: Fragment,
      items: items,
      source: source,
      state: state
    })), source.templates.noResults && items.length === 0 ? createElement("div", {
      className: classNames.sourceNoResults
    }, source.templates.noResults({
      components: components,
      createElement: createElement,
      Fragment: Fragment,
      source: source,
      state: state
    })) : createElement("ul", _extends({
      className: classNames.list
    }, propGetters.getListProps(_objectSpread({
      state: state,
      props: autocomplete.getListProps({})
    }, autocompleteScopeApi))), items.map(function (item) {
      var itemProps = autocomplete.getItemProps({
        item: item,
        source: source
      });
      return createElement("li", _extends({
        key: itemProps.id,
        className: classNames.item
      }, propGetters.getItemProps(_objectSpread({
        state: state,
        props: itemProps
      }, autocompleteScopeApi))), source.templates.item({
        components: components,
        createElement: createElement,
        Fragment: Fragment,
        item: item,
        state: state
      }));
    })), source.templates.footer && createElement("div", {
      className: classNames.sourceFooter
    }, source.templates.footer({
      components: components,
      createElement: createElement,
      Fragment: Fragment,
      items: items,
      source: source,
      state: state
    })));
  });
  var children = createElement(Fragment, null, createElement("div", {
    className: "aa-PanelLayout aa-Panel--scrollable"
  }, sections), createElement("div", {
    className: "aa-GradientBottom"
  }));
  var elements = sections.reduce(function (acc, current) {
    acc[current.props['data-autocomplete-source-id']] = current;
    return acc;
  }, {});
  render({
    children: children,
    state: state,
    sections: sections,
    elements: elements,
    createElement: createElement,
    Fragment: Fragment,
    components: components
  }, dom.panel);
}
},{"./utils":"node_modules/@algolia/autocomplete-js/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/autocomplete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autocomplete = autocomplete;

var _autocompleteCore = require("@algolia/autocomplete-core");

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _createAutocompleteDom = require("./createAutocompleteDom");

var _createEffectWrapper2 = require("./createEffectWrapper");

var _createReactiveWrapper = require("./createReactiveWrapper");

var _getDefaultOptions = require("./getDefaultOptions");

var _getPanelPlacementStyle = require("./getPanelPlacementStyle");

var _render = require("./render");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function autocomplete(options) {
  var _createEffectWrapper = (0, _createEffectWrapper2.createEffectWrapper)(),
      runEffect = _createEffectWrapper.runEffect,
      cleanupEffects = _createEffectWrapper.cleanupEffects,
      runEffects = _createEffectWrapper.runEffects;

  var _createReactiveWrappe = (0, _createReactiveWrapper.createReactiveWrapper)(),
      reactive = _createReactiveWrappe.reactive,
      runReactives = _createReactiveWrappe.runReactives;

  var hasNoResultsSourceTemplateRef = (0, _autocompleteShared.createRef)(false);
  var optionsRef = (0, _autocompleteShared.createRef)(options);
  var onStateChangeRef = (0, _autocompleteShared.createRef)(undefined);
  var props = reactive(function () {
    return (0, _getDefaultOptions.getDefaultOptions)(optionsRef.current);
  });
  var isDetached = reactive(function () {
    return props.value.core.environment.matchMedia(props.value.renderer.detachedMediaQuery).matches;
  });
  var autocomplete = reactive(function () {
    return (0, _autocompleteCore.createAutocomplete)(_objectSpread(_objectSpread({}, props.value.core), {}, {
      onStateChange: function onStateChange(params) {
        var _onStateChangeRef$cur, _props$value$core$onS, _props$value$core;

        hasNoResultsSourceTemplateRef.current = params.state.collections.some(function (collection) {
          return collection.source.templates.noResults;
        });
        (_onStateChangeRef$cur = onStateChangeRef.current) === null || _onStateChangeRef$cur === void 0 ? void 0 : _onStateChangeRef$cur.call(onStateChangeRef, params);
        (_props$value$core$onS = (_props$value$core = props.value.core).onStateChange) === null || _props$value$core$onS === void 0 ? void 0 : _props$value$core$onS.call(_props$value$core, params);
      },
      shouldPanelOpen: optionsRef.current.shouldPanelOpen || function (_ref) {
        var state = _ref.state;

        if (isDetached.value) {
          return true;
        }

        var hasItems = (0, _autocompleteShared.getItemsCount)(state) > 0;

        if (!props.value.core.openOnFocus && !state.query) {
          return hasItems;
        }

        var hasNoResultsTemplate = Boolean(hasNoResultsSourceTemplateRef.current || props.value.renderer.renderNoResults);
        return !hasItems && hasNoResultsTemplate || hasItems;
      }
    }));
  });
  var lastStateRef = (0, _autocompleteShared.createRef)(_objectSpread({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle'
  }, props.value.core.initialState));
  var propGetters = {
    getEnvironmentProps: props.value.renderer.getEnvironmentProps,
    getFormProps: props.value.renderer.getFormProps,
    getInputProps: props.value.renderer.getInputProps,
    getItemProps: props.value.renderer.getItemProps,
    getLabelProps: props.value.renderer.getLabelProps,
    getListProps: props.value.renderer.getListProps,
    getPanelProps: props.value.renderer.getPanelProps,
    getRootProps: props.value.renderer.getRootProps
  };
  var autocompleteScopeApi = {
    setActiveItemId: autocomplete.value.setActiveItemId,
    setQuery: autocomplete.value.setQuery,
    setCollections: autocomplete.value.setCollections,
    setIsOpen: autocomplete.value.setIsOpen,
    setStatus: autocomplete.value.setStatus,
    setContext: autocomplete.value.setContext,
    refresh: autocomplete.value.refresh
  };
  var dom = reactive(function () {
    return (0, _createAutocompleteDom.createAutocompleteDom)({
      autocomplete: autocomplete.value,
      autocompleteScopeApi: autocompleteScopeApi,
      classNames: props.value.renderer.classNames,
      environment: props.value.core.environment,
      isDetached: isDetached.value,
      placeholder: props.value.core.placeholder,
      propGetters: propGetters,
      setIsModalOpen: setIsModalOpen,
      state: lastStateRef.current
    });
  });

  function setPanelPosition() {
    (0, _utils.setProperties)(dom.value.panel, {
      style: isDetached.value ? {} : (0, _getPanelPlacementStyle.getPanelPlacementStyle)({
        panelPlacement: props.value.renderer.panelPlacement,
        container: dom.value.root,
        form: dom.value.form,
        environment: props.value.core.environment
      })
    });
  }

  function scheduleRender(state) {
    lastStateRef.current = state;
    var renderProps = {
      autocomplete: autocomplete.value,
      autocompleteScopeApi: autocompleteScopeApi,
      classNames: props.value.renderer.classNames,
      components: props.value.renderer.components,
      container: props.value.renderer.container,
      createElement: props.value.renderer.renderer.createElement,
      dom: dom.value,
      Fragment: props.value.renderer.renderer.Fragment,
      panelContainer: isDetached.value ? dom.value.detachedContainer : props.value.renderer.panelContainer,
      propGetters: propGetters,
      state: lastStateRef.current
    };
    var render = !(0, _autocompleteShared.getItemsCount)(state) && !hasNoResultsSourceTemplateRef.current && props.value.renderer.renderNoResults || props.value.renderer.render;
    (0, _render.renderSearchBox)(renderProps);
    (0, _render.renderPanel)(render, renderProps);
  }

  runEffect(function () {
    var environmentProps = autocomplete.value.getEnvironmentProps({
      formElement: dom.value.form,
      panelElement: dom.value.panel,
      inputElement: dom.value.input
    });
    (0, _utils.setProperties)(props.value.core.environment, environmentProps);
    return function () {
      (0, _utils.setProperties)(props.value.core.environment, Object.keys(environmentProps).reduce(function (acc, key) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, undefined));
      }, {}));
    };
  });
  runEffect(function () {
    var panelContainerElement = isDetached.value ? props.value.core.environment.document.body : props.value.renderer.panelContainer;
    var panelElement = isDetached.value ? dom.value.detachedOverlay : dom.value.panel;

    if (isDetached.value && lastStateRef.current.isOpen) {
      setIsModalOpen(true);
    }

    scheduleRender(lastStateRef.current);
    return function () {
      if (panelContainerElement.contains(panelElement)) {
        panelContainerElement.removeChild(panelElement);
      }
    };
  });
  runEffect(function () {
    var containerElement = props.value.renderer.container;
    containerElement.appendChild(dom.value.root);
    return function () {
      containerElement.removeChild(dom.value.root);
    };
  });
  runEffect(function () {
    var debouncedRender = (0, _autocompleteShared.debounce)(function (_ref2) {
      var state = _ref2.state;
      scheduleRender(state);
    }, 0);

    onStateChangeRef.current = function (_ref3) {
      var state = _ref3.state,
          prevState = _ref3.prevState;

      if (isDetached.value && prevState.isOpen !== state.isOpen) {
        setIsModalOpen(state.isOpen);
      } // The outer DOM might have changed since the last time the panel was
      // positioned. The layout might have shifted vertically for instance.
      // It's therefore safer to re-calculate the panel position before opening
      // it again.


      if (!isDetached.value && state.isOpen && !prevState.isOpen) {
        setPanelPosition();
      } // We scroll to the top of the panel whenever the query changes (i.e. new
      // results come in) so that users don't have to.


      if (state.query !== prevState.query) {
        var scrollablePanels = props.value.core.environment.document.querySelectorAll('.aa-Panel--scrollable');
        scrollablePanels.forEach(function (scrollablePanel) {
          if (scrollablePanel.scrollTop !== 0) {
            scrollablePanel.scrollTop = 0;
          }
        });
      }

      debouncedRender({
        state: state
      });
    };

    return function () {
      onStateChangeRef.current = undefined;
    };
  });
  runEffect(function () {
    var onResize = (0, _autocompleteShared.debounce)(function () {
      var previousIsDetached = isDetached.value;
      isDetached.value = props.value.core.environment.matchMedia(props.value.renderer.detachedMediaQuery).matches;

      if (previousIsDetached !== isDetached.value) {
        update({});
      } else {
        requestAnimationFrame(setPanelPosition);
      }
    }, 20);
    props.value.core.environment.addEventListener('resize', onResize);
    return function () {
      props.value.core.environment.removeEventListener('resize', onResize);
    };
  });
  runEffect(function () {
    if (!isDetached.value) {
      return function () {};
    }

    function toggleModalClassname(isActive) {
      dom.value.detachedContainer.classList.toggle('aa-DetachedContainer--modal', isActive);
    }

    function onChange(event) {
      toggleModalClassname(event.matches);
    }

    var isModalDetachedMql = props.value.core.environment.matchMedia(getComputedStyle(props.value.core.environment.document.documentElement).getPropertyValue('--aa-detached-modal-media-query'));
    toggleModalClassname(isModalDetachedMql.matches);
    isModalDetachedMql.addEventListener('change', onChange);
    return function () {
      isModalDetachedMql.removeEventListener('change', onChange);
    };
  });
  runEffect(function () {
    requestAnimationFrame(setPanelPosition);
    return function () {};
  });

  function destroy() {
    cleanupEffects();
  }

  function update() {
    var updatedOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    cleanupEffects();
    optionsRef.current = (0, _utils.mergeDeep)(props.value.renderer, props.value.core, {
      initialState: lastStateRef.current
    }, updatedOptions);
    runReactives();
    runEffects();
    autocomplete.value.refresh().then(function () {
      scheduleRender(lastStateRef.current);
    });
  }

  function setIsModalOpen(value) {
    requestAnimationFrame(function () {
      var prevValue = props.value.core.environment.document.body.contains(dom.value.detachedOverlay);

      if (value === prevValue) {
        return;
      }

      if (value) {
        props.value.core.environment.document.body.appendChild(dom.value.detachedOverlay);
        props.value.core.environment.document.body.classList.add('aa-Detached');
        dom.value.input.focus();
      } else {
        props.value.core.environment.document.body.removeChild(dom.value.detachedOverlay);
        props.value.core.environment.document.body.classList.remove('aa-Detached');
        autocomplete.value.setQuery('');
        autocomplete.value.refresh();
      }
    });
  }

  return _objectSpread(_objectSpread({}, autocompleteScopeApi), {}, {
    update: update,
    destroy: destroy
  });
}
},{"@algolia/autocomplete-core":"node_modules/@algolia/autocomplete-core/dist/esm/index.js","@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./createAutocompleteDom":"node_modules/@algolia/autocomplete-js/dist/esm/createAutocompleteDom.js","./createEffectWrapper":"node_modules/@algolia/autocomplete-js/dist/esm/createEffectWrapper.js","./createReactiveWrapper":"node_modules/@algolia/autocomplete-js/dist/esm/createReactiveWrapper.js","./getDefaultOptions":"node_modules/@algolia/autocomplete-js/dist/esm/getDefaultOptions.js","./getPanelPlacementStyle":"node_modules/@algolia/autocomplete-js/dist/esm/getPanelPlacementStyle.js","./render":"node_modules/@algolia/autocomplete-js/dist/esm/render.js","./utils":"node_modules/@algolia/autocomplete-js/dist/esm/utils/index.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
var version = '1.0.1';
exports.version = version;
},{}],"node_modules/@algolia/autocomplete-js/dist/esm/requesters/createAlgoliaRequester.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAlgoliaRequester = void 0;

var _autocompletePresetAlgolia = require("@algolia/autocomplete-preset-algolia");

var _version = require("../version");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var createAlgoliaRequester = (0, _autocompletePresetAlgolia.createRequester)(function (params) {
  return (0, _autocompletePresetAlgolia.fetchAlgoliaResults)(_objectSpread(_objectSpread({}, params), {}, {
    userAgents: [{
      segment: 'autocomplete-js',
      version: _version.version
    }]
  }));
});
exports.createAlgoliaRequester = createAlgoliaRequester;
},{"@algolia/autocomplete-preset-algolia":"node_modules/@algolia/autocomplete-preset-algolia/dist/esm/index.js","../version":"node_modules/@algolia/autocomplete-js/dist/esm/version.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/requesters/getAlgoliaFacets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlgoliaFacets = getAlgoliaFacets;

var _createAlgoliaRequester = require("./createAlgoliaRequester");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Retrieves Algolia facet hits from multiple indices.
 */
function getAlgoliaFacets(requestParams) {
  var requester = (0, _createAlgoliaRequester.createAlgoliaRequester)({
    transformResponse: function transformResponse(response) {
      return response.facetHits;
    }
  });
  var queries = requestParams.queries.map(function (query) {
    return _objectSpread(_objectSpread({}, query), {}, {
      type: 'facet'
    });
  });
  return requester(_objectSpread(_objectSpread({}, requestParams), {}, {
    queries: queries
  }));
}
},{"./createAlgoliaRequester":"node_modules/@algolia/autocomplete-js/dist/esm/requesters/createAlgoliaRequester.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/requesters/getAlgoliaResults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlgoliaResults = void 0;

var _createAlgoliaRequester = require("./createAlgoliaRequester");

/**
 * Retrieves Algolia results from multiple indices.
 */
var getAlgoliaResults = (0, _createAlgoliaRequester.createAlgoliaRequester)({
  transformResponse: function transformResponse(response) {
    return response.hits;
  }
});
exports.getAlgoliaResults = getAlgoliaResults;
},{"./createAlgoliaRequester":"node_modules/@algolia/autocomplete-js/dist/esm/requesters/createAlgoliaRequester.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/requesters/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getAlgoliaFacets = require("./getAlgoliaFacets");

Object.keys(_getAlgoliaFacets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getAlgoliaFacets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getAlgoliaFacets[key];
    }
  });
});

var _getAlgoliaResults = require("./getAlgoliaResults");

Object.keys(_getAlgoliaResults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getAlgoliaResults[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getAlgoliaResults[key];
    }
  });
});
},{"./getAlgoliaFacets":"node_modules/@algolia/autocomplete-js/dist/esm/requesters/getAlgoliaFacets.js","./getAlgoliaResults":"node_modules/@algolia/autocomplete-js/dist/esm/requesters/getAlgoliaResults.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteApi.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteClassNames.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteCollection.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteComponents.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteDom.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteOptions.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompletePlugin.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompletePropGetters.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteRender.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteRenderer.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteSource.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteState.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/HighlightHitParams.js":[function(require,module,exports) {

},{}],"node_modules/@algolia/autocomplete-js/dist/esm/types/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AutocompleteApi = require("./AutocompleteApi");

Object.keys(_AutocompleteApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteApi[key];
    }
  });
});

var _AutocompleteClassNames = require("./AutocompleteClassNames");

Object.keys(_AutocompleteClassNames).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteClassNames[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteClassNames[key];
    }
  });
});

var _AutocompleteCollection = require("./AutocompleteCollection");

Object.keys(_AutocompleteCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteCollection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteCollection[key];
    }
  });
});

var _AutocompleteComponents = require("./AutocompleteComponents");

Object.keys(_AutocompleteComponents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteComponents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteComponents[key];
    }
  });
});

var _AutocompleteDom = require("./AutocompleteDom");

Object.keys(_AutocompleteDom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteDom[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteDom[key];
    }
  });
});

var _AutocompleteOptions = require("./AutocompleteOptions");

Object.keys(_AutocompleteOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteOptions[key];
    }
  });
});

var _AutocompletePlugin = require("./AutocompletePlugin");

Object.keys(_AutocompletePlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompletePlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompletePlugin[key];
    }
  });
});

var _AutocompletePropGetters = require("./AutocompletePropGetters");

Object.keys(_AutocompletePropGetters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompletePropGetters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompletePropGetters[key];
    }
  });
});

var _AutocompleteRender = require("./AutocompleteRender");

Object.keys(_AutocompleteRender).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteRender[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteRender[key];
    }
  });
});

var _AutocompleteRenderer = require("./AutocompleteRenderer");

Object.keys(_AutocompleteRenderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteRenderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteRenderer[key];
    }
  });
});

var _AutocompleteSource = require("./AutocompleteSource");

Object.keys(_AutocompleteSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteSource[key];
    }
  });
});

var _AutocompleteState = require("./AutocompleteState");

Object.keys(_AutocompleteState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AutocompleteState[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteState[key];
    }
  });
});

var _HighlightHitParams = require("./HighlightHitParams");

Object.keys(_HighlightHitParams).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HighlightHitParams[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _HighlightHitParams[key];
    }
  });
});
},{"./AutocompleteApi":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteApi.js","./AutocompleteClassNames":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteClassNames.js","./AutocompleteCollection":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteCollection.js","./AutocompleteComponents":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteComponents.js","./AutocompleteDom":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteDom.js","./AutocompleteOptions":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteOptions.js","./AutocompletePlugin":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompletePlugin.js","./AutocompletePropGetters":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompletePropGetters.js","./AutocompleteRender":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteRender.js","./AutocompleteRenderer":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteRenderer.js","./AutocompleteSource":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteSource.js","./AutocompleteState":"node_modules/@algolia/autocomplete-js/dist/esm/types/AutocompleteState.js","./HighlightHitParams":"node_modules/@algolia/autocomplete-js/dist/esm/types/HighlightHitParams.js"}],"node_modules/@algolia/autocomplete-js/dist/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autocomplete = require("./autocomplete");

Object.keys(_autocomplete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _autocomplete[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _autocomplete[key];
    }
  });
});

var _requesters = require("./requesters");

Object.keys(_requesters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _requesters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _requesters[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
},{"./autocomplete":"node_modules/@algolia/autocomplete-js/dist/esm/autocomplete.js","./requesters":"node_modules/@algolia/autocomplete-js/dist/esm/requesters/index.js","./types":"node_modules/@algolia/autocomplete-js/dist/esm/types/index.js"}],"node_modules/@algolia/autocomplete-plugin-query-suggestions/dist/esm/getTemplates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplates = getTemplates;

/** @jsx createElement */
function getTemplates(_ref) {
  var onTapAhead = _ref.onTapAhead;
  return {
    item: function item(_ref2) {
      var item = _ref2.item,
          createElement = _ref2.createElement,
          components = _ref2.components;

      if (item.__autocomplete_qsCategory) {
        return createElement("div", {
          className: "aa-ItemWrapper"
        }, createElement("div", {
          className: "aa-ItemContent aa-ItemContent--indented"
        }, createElement("div", {
          className: "aa-ItemContentSubtitle aa-ItemContentSubtitle--standalone"
        }, createElement("span", {
          className: "aa-ItemContentSubtitleIcon"
        }), createElement("span", null, "in", ' ', createElement("span", {
          className: "aa-ItemContentSubtitleCategory"
        }, item.__autocomplete_qsCategory)))));
      }

      return createElement("div", {
        className: "aa-ItemWrapper"
      }, createElement("div", {
        className: "aa-ItemContent"
      }, createElement("div", {
        className: "aa-ItemIcon aa-ItemIcon--noBorder"
      }, createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, createElement("path", {
        d: "M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"
      }))), createElement("div", {
        className: "aa-ItemContentBody"
      }, createElement("div", {
        className: "aa-ItemContentTitle"
      }, createElement(components.ReverseHighlight, {
        hit: item,
        attribute: "query"
      })))), createElement("div", {
        className: "aa-ItemActions"
      }, createElement("button", {
        className: "aa-ItemActionButton",
        title: "Fill query with \"".concat(item.query, "\""),
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          onTapAhead(item);
        }
      }, createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, createElement("path", {
        d: "M8 17v-7.586l8.293 8.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-8.293-8.293h7.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1s1-0.448 1-1z"
      })))));
    }
  };
}
},{}],"node_modules/@algolia/autocomplete-plugin-query-suggestions/dist/esm/createQuerySuggestionsPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQuerySuggestionsPlugin = createQuerySuggestionsPlugin;

var _autocompleteJs = require("@algolia/autocomplete-js");

var _autocompleteShared = require("@algolia/autocomplete-shared");

var _getTemplates = require("./getTemplates");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function createQuerySuggestionsPlugin(_ref) {
  var searchClient = _ref.searchClient,
      indexName = _ref.indexName,
      _ref$getSearchParams = _ref.getSearchParams,
      getSearchParams = _ref$getSearchParams === void 0 ? function () {
    return {};
  } : _ref$getSearchParams,
      _ref$transformSource = _ref.transformSource,
      transformSource = _ref$transformSource === void 0 ? function (_ref2) {
    var source = _ref2.source;
    return source;
  } : _ref$transformSource,
      categoryAttribute = _ref.categoryAttribute,
      _ref$itemsWithCategor = _ref.itemsWithCategories,
      itemsWithCategories = _ref$itemsWithCategor === void 0 ? 1 : _ref$itemsWithCategor,
      _ref$categoriesPerIte = _ref.categoriesPerItem,
      categoriesPerItem = _ref$categoriesPerIte === void 0 ? 1 : _ref$categoriesPerIte;
  return {
    getSources: function getSources(_ref3) {
      var query = _ref3.query,
          setQuery = _ref3.setQuery,
          refresh = _ref3.refresh,
          state = _ref3.state;

      function onTapAhead(item) {
        setQuery("".concat(item.query, " "));
        refresh();
      }

      return [transformSource({
        source: {
          sourceId: 'querySuggestionsPlugin',
          getItemInputValue: function getItemInputValue(_ref4) {
            var item = _ref4.item;
            return item.query;
          },
          getItems: function getItems() {
            return (0, _autocompleteJs.getAlgoliaResults)({
              searchClient: searchClient,
              queries: [{
                indexName: indexName,
                query: query,
                params: getSearchParams({
                  state: state
                })
              }],
              transformResponse: function transformResponse(_ref5) {
                var hits = _ref5.hits;
                var querySuggestionsHits = hits[0];

                if (!query || !categoryAttribute) {
                  return querySuggestionsHits;
                }

                return querySuggestionsHits.reduce(function (acc, current, i) {
                  var items = [current];

                  if (i <= itemsWithCategories - 1) {
                    var categories = (0, _autocompleteShared.getAttributeValueByPath)(current, Array.isArray(categoryAttribute) ? categoryAttribute : [categoryAttribute]).map(function (x) {
                      return x.value;
                    }).slice(0, categoriesPerItem);

                    var _iterator = _createForOfIteratorHelper(categories),
                        _step;

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var category = _step.value;
                        items.push(_objectSpread({
                          __autocomplete_qsCategory: category
                        }, current));
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  }

                  acc.push.apply(acc, items);
                  return acc;
                }, []);
              }
            });
          },
          templates: (0, _getTemplates.getTemplates)({
            onTapAhead: onTapAhead
          })
        },
        onTapAhead: onTapAhead,
        state: state
      })];
    }
  };
}
},{"@algolia/autocomplete-js":"node_modules/@algolia/autocomplete-js/dist/esm/index.js","@algolia/autocomplete-shared":"node_modules/@algolia/autocomplete-shared/dist/esm/index.js","./getTemplates":"node_modules/@algolia/autocomplete-plugin-query-suggestions/dist/esm/getTemplates.js"}],"node_modules/@algolia/autocomplete-plugin-query-suggestions/dist/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createQuerySuggestionsPlugin = require("./createQuerySuggestionsPlugin");

Object.keys(_createQuerySuggestionsPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createQuerySuggestionsPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createQuerySuggestionsPlugin[key];
    }
  });
});

var _getTemplates = require("./getTemplates");

Object.keys(_getTemplates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getTemplates[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getTemplates[key];
    }
  });
});
},{"./createQuerySuggestionsPlugin":"node_modules/@algolia/autocomplete-plugin-query-suggestions/dist/esm/createQuerySuggestionsPlugin.js","./getTemplates":"node_modules/@algolia/autocomplete-plugin-query-suggestions/dist/esm/getTemplates.js"}],"node_modules/algoliasearch/dist/algoliasearch.umd.js":[function(require,module,exports) {
var define;
/*! algoliasearch.umd.js | 4.9.1 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).algoliasearch=e()}(this,(function(){"use strict";function t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function e(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function r(r){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?e(Object(a),!0).forEach((function(e){t(r,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(a)):e(Object(a)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(a,t))}))}return r}function n(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var u,i=t[Symbol.iterator]();!(n=(u=i.next()).done)&&(r.push(u.value),!e||r.length!==e);n=!0);}catch(t){a=!0,o=t}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(t){var e,r="algoliasearch-client-js-".concat(t.key),n=function(){return void 0===e&&(e=t.localStorage||window.localStorage),e},o=function(){return JSON.parse(n().getItem(r)||"{}")};return{get:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}};return Promise.resolve().then((function(){var r=JSON.stringify(t),n=o()[r];return Promise.all([n||e(),void 0!==n])})).then((function(t){var e=a(t,2),n=e[0],o=e[1];return Promise.all([n,o||r.miss(n)])})).then((function(t){return a(t,1)[0]}))},set:function(t,e){return Promise.resolve().then((function(){var a=o();return a[JSON.stringify(t)]=e,n().setItem(r,JSON.stringify(a)),e}))},delete:function(t){return Promise.resolve().then((function(){var e=o();delete e[JSON.stringify(t)],n().setItem(r,JSON.stringify(e))}))},clear:function(){return Promise.resolve().then((function(){n().removeItem(r)}))}}}function i(t){var e=o(t.caches),r=e.shift();return void 0===r?{get:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}},n=e();return n.then((function(t){return Promise.all([t,r.miss(t)])})).then((function(t){return a(t,1)[0]}))},set:function(t,e){return Promise.resolve(e)},delete:function(t){return Promise.resolve()},clear:function(){return Promise.resolve()}}:{get:function(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}};return r.get(t,n,a).catch((function(){return i({caches:e}).get(t,n,a)}))},set:function(t,n){return r.set(t,n).catch((function(){return i({caches:e}).set(t,n)}))},delete:function(t){return r.delete(t).catch((function(){return i({caches:e}).delete(t)}))},clear:function(){return r.clear().catch((function(){return i({caches:e}).clear()}))}}}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{serializable:!0},e={};return{get:function(r,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}},o=JSON.stringify(r);if(o in e)return Promise.resolve(t.serializable?JSON.parse(e[o]):e[o]);var u=n(),i=a&&a.miss||function(){return Promise.resolve()};return u.then((function(t){return i(t)})).then((function(){return u}))},set:function(r,n){return e[JSON.stringify(r)]=t.serializable?JSON.stringify(n):n,Promise.resolve(n)},delete:function(t){return delete e[JSON.stringify(t)],Promise.resolve()},clear:function(){return e={},Promise.resolve()}}}function c(t,e,r){var n={"x-algolia-api-key":r,"x-algolia-application-id":e};return{headers:function(){return t===m.WithinHeaders?n:{}},queryParameters:function(){return t===m.WithinQueryParameters?n:{}}}}function f(t){var e=0;return t((function r(){return e++,new Promise((function(n){setTimeout((function(){n(t(r))}),Math.min(100*e,1e3))}))}))}function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t,e){return Promise.resolve()};return Object.assign(t,{wait:function(r){return d(t.then((function(t){return Promise.all([e(t,r),t])})).then((function(t){return t[1]})))}})}function l(t){for(var e=t.length-1;e>0;e--){var r=Math.floor(Math.random()*(e+1)),n=t[e];t[e]=t[r],t[r]=n}return t}function p(t,e){return e?(Object.keys(e).forEach((function(r){t[r]=e[r](t)})),t):t}function h(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];var a=0;return t.replace(/%s/g,(function(){return encodeURIComponent(r[a++])}))}var m={WithinQueryParameters:0,WithinHeaders:1};function y(t,e){var r=t||{},n=r.data||{};return Object.keys(r).forEach((function(t){-1===["timeout","headers","queryParameters","data","cacheable"].indexOf(t)&&(n[t]=r[t])})),{data:Object.entries(n).length>0?n:void 0,timeout:r.timeout||e,headers:r.headers||{},queryParameters:r.queryParameters||{},cacheable:r.cacheable}}var g={Read:1,Write:2,Any:3},v=1,b=2,P=3;function w(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:v;return r(r({},t),{},{status:e,lastUpdate:Date.now()})}function O(t){return"string"==typeof t?{protocol:"https",url:t,accept:g.Any}:{protocol:t.protocol||"https",url:t.url,accept:t.accept||g.Any}}var I="DELETE",x="GET",j="POST",D="PUT";function q(t,e){return Promise.all(e.map((function(e){return t.get(e,(function(){return Promise.resolve(w(e))}))}))).then((function(t){var r=t.filter((function(t){return function(t){return t.status===v||Date.now()-t.lastUpdate>12e4}(t)})),n=t.filter((function(t){return function(t){return t.status===P&&Date.now()-t.lastUpdate<=12e4}(t)})),a=[].concat(o(r),o(n));return{getTimeout:function(t,e){return(0===n.length&&0===t?1:n.length+3+t)*e},statelessHosts:a.length>0?a.map((function(t){return O(t)})):e}}))}function S(t,e,n,a){var u=[],i=function(t,e){if(t.method===x||void 0===t.data&&void 0===e.data)return;var n=Array.isArray(t.data)?t.data:r(r({},t.data),e.data);return JSON.stringify(n)}(n,a),s=function(t,e){var n=r(r({},t.headers),e.headers),a={};return Object.keys(n).forEach((function(t){var e=n[t];a[t.toLowerCase()]=e})),a}(t,a),c=n.method,f=n.method!==x?{}:r(r({},n.data),a.data),d=r(r(r({"x-algolia-agent":t.userAgent.value},t.queryParameters),f),a.queryParameters),l=0,p=function e(r,o){var f=r.pop();if(void 0===f)throw{name:"RetryError",message:"Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",transporterStackTrace:R(u)};var p={data:i,headers:s,method:c,url:N(f,n.path,d),connectTimeout:o(l,t.timeouts.connect),responseTimeout:o(l,a.timeout)},h=function(t){var e={request:p,response:t,host:f,triesLeft:r.length};return u.push(e),e},m={onSuccess:function(t){return function(t){try{return JSON.parse(t.content)}catch(e){throw function(t,e){return{name:"DeserializationError",message:t,response:e}}(e.message,t)}}(t)},onRetry:function(n){var a=h(n);return n.isTimedOut&&l++,Promise.all([t.logger.info("Retryable failure",A(a)),t.hostsCache.set(f,w(f,n.isTimedOut?P:b))]).then((function(){return e(r,o)}))},onFail:function(t){throw h(t),function(t,e){var r=t.content,n=t.status,a=r;try{a=JSON.parse(r).message}catch(t){}return function(t,e,r){return{name:"ApiError",message:t,status:e,transporterStackTrace:r}}(a,n,e)}(t,R(u))}};return t.requester.send(p).then((function(t){return function(t,e){return function(t){var e=t.status;return t.isTimedOut||function(t){var e=t.isTimedOut,r=t.status;return!e&&0==~~r}(t)||2!=~~(e/100)&&4!=~~(e/100)}(t)?e.onRetry(t):2==~~(t.status/100)?e.onSuccess(t):e.onFail(t)}(t,m)}))};return q(t.hostsCache,e).then((function(t){return p(o(t.statelessHosts).reverse(),t.getTimeout)}))}function k(t){var e=t.hostsCache,r=t.logger,n=t.requester,o=t.requestsCache,u=t.responsesCache,i=t.timeouts,s=t.userAgent,c=t.hosts,f=t.queryParameters,d={hostsCache:e,logger:r,requester:n,requestsCache:o,responsesCache:u,timeouts:i,userAgent:s,headers:t.headers,queryParameters:f,hosts:c.map((function(t){return O(t)})),read:function(t,e){var r=y(e,d.timeouts.read),n=function(){return S(d,d.hosts.filter((function(t){return 0!=(t.accept&g.Read)})),t,r)};if(!0!==(void 0!==r.cacheable?r.cacheable:t.cacheable))return n();var o={request:t,mappedRequestOptions:r,transporter:{queryParameters:d.queryParameters,headers:d.headers}};return d.responsesCache.get(o,(function(){return d.requestsCache.get(o,(function(){return d.requestsCache.set(o,n()).then((function(t){return Promise.all([d.requestsCache.delete(o),t])}),(function(t){return Promise.all([d.requestsCache.delete(o),Promise.reject(t)])})).then((function(t){var e=a(t,2);e[0];return e[1]}))}))}),{miss:function(t){return d.responsesCache.set(o,t)}})},write:function(t,e){return S(d,d.hosts.filter((function(t){return 0!=(t.accept&g.Write)})),t,y(e,d.timeouts.write))}};return d}function T(t){var e={value:"Algolia for JavaScript (".concat(t,")"),add:function(t){var r="; ".concat(t.segment).concat(void 0!==t.version?" (".concat(t.version,")"):"");return-1===e.value.indexOf(r)&&(e.value="".concat(e.value).concat(r)),e}};return e}function N(t,e,r){var n=E(r),a="".concat(t.protocol,"://").concat(t.url,"/").concat("/"===e.charAt(0)?e.substr(1):e);return n.length&&(a+="?".concat(n)),a}function E(t){return Object.keys(t).map((function(e){return h("%s=%s",e,(r=t[e],"[object Object]"===Object.prototype.toString.call(r)||"[object Array]"===Object.prototype.toString.call(r)?JSON.stringify(t[e]):t[e]));var r})).join("&")}function R(t){return t.map((function(t){return A(t)}))}function A(t){var e=t.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return r(r({},t),{},{request:r(r({},t.request),{},{headers:r(r({},t.request.headers),e)})})}var C=function(t){return function(e,r){return t.transporter.write({method:j,path:"2/abtests",data:e},r)}},U=function(t){return function(e,r){return t.transporter.write({method:I,path:h("2/abtests/%s",e)},r)}},J=function(t){return function(e,r){return t.transporter.read({method:x,path:h("2/abtests/%s",e)},r)}},z=function(t){return function(e){return t.transporter.read({method:x,path:"2/abtests"},e)}},F=function(t){return function(e,r){return t.transporter.write({method:j,path:h("2/abtests/%s/stop",e)},r)}},H=function(t){return function(e){return t.transporter.read({method:x,path:"1/strategies/personalization"},e)}},M=function(t){return function(e,r){return t.transporter.write({method:j,path:"1/strategies/personalization",data:e},r)}};function K(t){return function e(r){return t.request(r).then((function(n){if(void 0!==t.batch&&t.batch(n.hits),!t.shouldStop(n))return n.cursor?e({cursor:n.cursor}):e({page:(r.page||0)+1})}))}({})}var W=function(t){return function(e,a){var o=a||{},u=o.queryParameters,i=n(o,["queryParameters"]),s=r({acl:e},void 0!==u?{queryParameters:u}:{});return d(t.transporter.write({method:j,path:"1/keys",data:s},i),(function(e,r){return f((function(n){return $(t)(e.key,r).catch((function(t){if(404!==t.status)throw t;return n()}))}))}))}},B=function(t){return function(e,r,n){var a=y(n);return a.queryParameters["X-Algolia-User-ID"]=e,t.transporter.write({method:j,path:"1/clusters/mapping",data:{cluster:r}},a)}},Q=function(t){return function(e,r,n){return t.transporter.write({method:j,path:"1/clusters/mapping/batch",data:{users:e,cluster:r}},n)}},G=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!0,requests:{action:"addEntry",body:[]}}},r),(function(e,r){return xt(t)(e.taskID,r)}))}},L=function(t){return function(e,r,n){return d(t.transporter.write({method:j,path:h("1/indexes/%s/operation",e),data:{operation:"copy",destination:r}},n),(function(r,n){return ut(t)(e,{methods:{waitTask:fe}}).waitTask(r.taskID,n)}))}},V=function(t){return function(e,n,a){return L(t)(e,n,r(r({},a),{},{scope:[le.Rules]}))}},_=function(t){return function(e,n,a){return L(t)(e,n,r(r({},a),{},{scope:[le.Settings]}))}},X=function(t){return function(e,n,a){return L(t)(e,n,r(r({},a),{},{scope:[le.Synonyms]}))}},Y=function(t){return function(e,r){return d(t.transporter.write({method:I,path:h("1/keys/%s",e)},r),(function(r,n){return f((function(r){return $(t)(e,n).then(r).catch((function(t){if(404!==t.status)throw t}))}))}))}},Z=function(t){return function(e,r,n){var a=r.map((function(t){return{action:"deleteEntry",body:{objectID:t}}}));return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!1,requests:a}},n),(function(e,r){return xt(t)(e.taskID,r)}))}},$=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/keys/%s",e)},r)}},tt=function(t){return function(e){return t.transporter.read({method:x,path:"/1/dictionaries/*/settings"},e)}},et=function(t){return function(e){return t.transporter.read({method:x,path:"1/logs"},e)}},rt=function(t){return function(e){return t.transporter.read({method:x,path:"1/clusters/mapping/top"},e)}},nt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/task/%s",e.toString())},r)}},at=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/clusters/mapping/%s",e)},r)}},ot=function(t){return function(e){var r=e||{},a=r.retrieveMappings,o=n(r,["retrieveMappings"]);return!0===a&&(o.getClusters=!0),t.transporter.read({method:x,path:"1/clusters/mapping/pending"},o)}},ut=function(t){return function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={transporter:t.transporter,appId:t.appId,indexName:e};return p(n,r.methods)}},it=function(t){return function(e){return t.transporter.read({method:x,path:"1/keys"},e)}},st=function(t){return function(e){return t.transporter.read({method:x,path:"1/clusters"},e)}},ct=function(t){return function(e){return t.transporter.read({method:x,path:"1/indexes"},e)}},ft=function(t){return function(e){return t.transporter.read({method:x,path:"1/clusters/mapping"},e)}},dt=function(t){return function(e,r,n){return d(t.transporter.write({method:j,path:h("1/indexes/%s/operation",e),data:{operation:"move",destination:r}},n),(function(r,n){return ut(t)(e,{methods:{waitTask:fe}}).waitTask(r.taskID,n)}))}},lt=function(t){return function(e,r){return d(t.transporter.write({method:j,path:"1/indexes/*/batch",data:{requests:e}},r),(function(e,r){return Promise.all(Object.keys(e.taskID).map((function(n){return ut(t)(n,{methods:{waitTask:fe}}).waitTask(e.taskID[n],r)})))}))}},pt=function(t){return function(e,r){return t.transporter.read({method:j,path:"1/indexes/*/objects",data:{requests:e}},r)}},ht=function(t){return function(e,n){var a=e.map((function(t){return r(r({},t),{},{params:E(t.params||{})})}));return t.transporter.read({method:j,path:"1/indexes/*/queries",data:{requests:a},cacheable:!0},n)}},mt=function(t){return function(e,a){return Promise.all(e.map((function(e){var o=e.params,u=o.facetName,i=o.facetQuery,s=n(o,["facetName","facetQuery"]);return ut(t)(e.indexName,{methods:{searchForFacetValues:ue}}).searchForFacetValues(u,i,r(r({},a),s))})))}},yt=function(t){return function(e,r){var n=y(r);return n.queryParameters["X-Algolia-User-ID"]=e,t.transporter.write({method:I,path:"1/clusters/mapping"},n)}},gt=function(t){return function(e,r,n){var a=r.map((function(t){return{action:"addEntry",body:t}}));return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!0,requests:a}},n),(function(e,r){return xt(t)(e.taskID,r)}))}},vt=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("1/keys/%s/restore",e)},r),(function(r,n){return f((function(r){return $(t)(e,n).catch((function(t){if(404!==t.status)throw t;return r()}))}))}))}},bt=function(t){return function(e,r,n){var a=r.map((function(t){return{action:"addEntry",body:t}}));return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!1,requests:a}},n),(function(e,r){return xt(t)(e.taskID,r)}))}},Pt=function(t){return function(e,r,n){return t.transporter.read({method:j,path:h("/1/dictionaries/%s/search",e),data:{query:r},cacheable:!0},n)}},wt=function(t){return function(e,r){return t.transporter.read({method:j,path:"1/clusters/mapping/search",data:{query:e}},r)}},Ot=function(t){return function(e,r){return d(t.transporter.write({method:D,path:"/1/dictionaries/*/settings",data:e},r),(function(e,r){return xt(t)(e.taskID,r)}))}},It=function(t){return function(e,r){var a=Object.assign({},r),o=r||{},u=o.queryParameters,i=n(o,["queryParameters"]),s=u?{queryParameters:u}:{},c=["acl","indexes","referers","restrictSources","queryParameters","description","maxQueriesPerIPPerHour","maxHitsPerQuery"];return d(t.transporter.write({method:D,path:h("1/keys/%s",e),data:s},i),(function(r,n){return f((function(r){return $(t)(e,n).then((function(t){return function(t){return Object.keys(a).filter((function(t){return-1!==c.indexOf(t)})).every((function(e){return t[e]===a[e]}))}(t)?Promise.resolve():r()}))}))}))}},xt=function(t){return function(e,r){return f((function(n){return nt(t)(e,r).then((function(t){return"published"!==t.status?n():void 0}))}))}},jt=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("1/indexes/%s/batch",t.indexName),data:{requests:e}},r),(function(e,r){return fe(t)(e.taskID,r)}))}},Dt=function(t){return function(e){return K(r(r({shouldStop:function(t){return void 0===t.cursor}},e),{},{request:function(r){return t.transporter.read({method:j,path:h("1/indexes/%s/browse",t.indexName),data:r},e)}}))}},qt=function(t){return function(e){var n=r({hitsPerPage:1e3},e);return K(r(r({shouldStop:function(t){return t.hits.length<n.hitsPerPage}},n),{},{request:function(e){return ie(t)("",r(r({},n),e)).then((function(t){return r(r({},t),{},{hits:t.hits.map((function(t){return delete t._highlightResult,t}))})}))}}))}},St=function(t){return function(e){var n=r({hitsPerPage:1e3},e);return K(r(r({shouldStop:function(t){return t.hits.length<n.hitsPerPage}},n),{},{request:function(e){return se(t)("",r(r({},n),e)).then((function(t){return r(r({},t),{},{hits:t.hits.map((function(t){return delete t._highlightResult,t}))})}))}}))}},kt=function(t){return function(e,r,a){var o=a||{},u=o.batchSize,i=n(o,["batchSize"]),s={taskIDs:[],objectIDs:[]};return d(function n(){var a,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,c=[];for(a=o;a<e.length&&(c.push(e[a]),c.length!==(u||1e3));a++);return 0===c.length?Promise.resolve(s):jt(t)(c.map((function(t){return{action:r,body:t}})),i).then((function(t){return s.objectIDs=s.objectIDs.concat(t.objectIDs),s.taskIDs.push(t.taskID),a++,n(a)}))}(),(function(e,r){return Promise.all(e.taskIDs.map((function(e){return fe(t)(e,r)})))}))}},Tt=function(t){return function(e){return d(t.transporter.write({method:j,path:h("1/indexes/%s/clear",t.indexName)},e),(function(e,r){return fe(t)(e.taskID,r)}))}},Nt=function(t){return function(e){var r=e||{},a=r.forwardToReplicas,o=y(n(r,["forwardToReplicas"]));return a&&(o.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/rules/clear",t.indexName)},o),(function(e,r){return fe(t)(e.taskID,r)}))}},Et=function(t){return function(e){var r=e||{},a=r.forwardToReplicas,o=y(n(r,["forwardToReplicas"]));return a&&(o.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/synonyms/clear",t.indexName)},o),(function(e,r){return fe(t)(e.taskID,r)}))}},Rt=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("1/indexes/%s/deleteByQuery",t.indexName),data:e},r),(function(e,r){return fe(t)(e.taskID,r)}))}},At=function(t){return function(e){return d(t.transporter.write({method:I,path:h("1/indexes/%s",t.indexName)},e),(function(e,r){return fe(t)(e.taskID,r)}))}},Ct=function(t){return function(e,r){return d(Ut(t)([e],r).then((function(t){return{taskID:t.taskIDs[0]}})),(function(e,r){return fe(t)(e.taskID,r)}))}},Ut=function(t){return function(e,r){var n=e.map((function(t){return{objectID:t}}));return kt(t)(n,de.DeleteObject,r)}},Jt=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,u=y(n(a,["forwardToReplicas"]));return o&&(u.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:I,path:h("1/indexes/%s/rules/%s",t.indexName,e)},u),(function(e,r){return fe(t)(e.taskID,r)}))}},zt=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,u=y(n(a,["forwardToReplicas"]));return o&&(u.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:I,path:h("1/indexes/%s/synonyms/%s",t.indexName,e)},u),(function(e,r){return fe(t)(e.taskID,r)}))}},Ft=function(t){return function(e){return Gt(t)(e).then((function(){return!0})).catch((function(t){if(404!==t.status)throw t;return!1}))}},Ht=function(t){return function(e,r,n){return t.transporter.read({method:j,path:h("1/answers/%s/prediction",t.indexName),data:{query:e,queryLanguages:r},cacheable:!0},n)}},Mt=function(t){return function(e,o){var u=o||{},i=u.query,s=u.paginate,c=n(u,["query","paginate"]),f=0;return function n(){return oe(t)(i||"",r(r({},c),{},{page:f})).then((function(t){for(var r=0,o=Object.entries(t.hits);r<o.length;r++){var u=a(o[r],2),i=u[0],c=u[1];if(e(c))return{object:c,position:parseInt(i,10),page:f}}if(f++,!1===s||f>=t.nbPages)throw{name:"ObjectNotFoundError",message:"Object not found."};return n()}))}()}},Kt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/%s",t.indexName,e)},r)}},Wt=function(){return function(t,e){for(var r=0,n=Object.entries(t.hits);r<n.length;r++){var o=a(n[r],2),u=o[0];if(o[1].objectID===e)return parseInt(u,10)}return-1}},Bt=function(t){return function(e,a){var o=a||{},u=o.attributesToRetrieve,i=n(o,["attributesToRetrieve"]),s=e.map((function(e){return r({indexName:t.indexName,objectID:e},u?{attributesToRetrieve:u}:{})}));return t.transporter.read({method:j,path:"1/indexes/*/objects",data:{requests:s}},i)}},Qt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/rules/%s",t.indexName,e)},r)}},Gt=function(t){return function(e){return t.transporter.read({method:x,path:h("1/indexes/%s/settings",t.indexName),data:{getVersion:2}},e)}},Lt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/synonyms/%s",t.indexName,e)},r)}},Vt=function(t){return function(e,r){return d(_t(t)([e],r).then((function(t){return{objectID:t.objectIDs[0],taskID:t.taskIDs[0]}})),(function(e,r){return fe(t)(e.taskID,r)}))}},_t=function(t){return function(e,r){var a=r||{},o=a.createIfNotExists,u=n(a,["createIfNotExists"]),i=o?de.PartialUpdateObject:de.PartialUpdateObjectNoCreate;return kt(t)(e,i,u)}},Xt=function(t){return function(e,u){var i=u||{},s=i.safe,c=i.autoGenerateObjectIDIfNotExist,f=i.batchSize,l=n(i,["safe","autoGenerateObjectIDIfNotExist","batchSize"]),p=function(e,r,n,a){return d(t.transporter.write({method:j,path:h("1/indexes/%s/operation",e),data:{operation:n,destination:r}},a),(function(e,r){return fe(t)(e.taskID,r)}))},m=Math.random().toString(36).substring(7),y="".concat(t.indexName,"_tmp_").concat(m),g=te({appId:t.appId,transporter:t.transporter,indexName:y}),v=[],b=p(t.indexName,y,"copy",r(r({},l),{},{scope:["settings","synonyms","rules"]}));return v.push(b),d((s?b.wait(l):b).then((function(){var t=g(e,r(r({},l),{},{autoGenerateObjectIDIfNotExist:c,batchSize:f}));return v.push(t),s?t.wait(l):t})).then((function(){var e=p(y,t.indexName,"move",l);return v.push(e),s?e.wait(l):e})).then((function(){return Promise.all(v)})).then((function(t){var e=a(t,3),r=e[0],n=e[1],u=e[2];return{objectIDs:n.objectIDs,taskIDs:[r.taskID].concat(o(n.taskIDs),[u.taskID])}})),(function(t,e){return Promise.all(v.map((function(t){return t.wait(e)})))}))}},Yt=function(t){return function(e,n){return re(t)(e,r(r({},n),{},{clearExistingRules:!0}))}},Zt=function(t){return function(e,n){return ae(t)(e,r(r({},n),{},{clearExistingSynonyms:!0}))}},$t=function(t){return function(e,r){return d(te(t)([e],r).then((function(t){return{objectID:t.objectIDs[0],taskID:t.taskIDs[0]}})),(function(e,r){return fe(t)(e.taskID,r)}))}},te=function(t){return function(e,r){var a=r||{},o=a.autoGenerateObjectIDIfNotExist,u=n(a,["autoGenerateObjectIDIfNotExist"]),i=o?de.AddObject:de.UpdateObject;if(i===de.UpdateObject){var s=!0,c=!1,f=void 0;try{for(var l,p=e[Symbol.iterator]();!(s=(l=p.next()).done);s=!0){if(void 0===l.value.objectID)return d(Promise.reject({name:"MissingObjectIDError",message:"All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."}))}}catch(t){c=!0,f=t}finally{try{s||null==p.return||p.return()}finally{if(c)throw f}}}return kt(t)(e,i,u)}},ee=function(t){return function(e,r){return re(t)([e],r)}},re=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,u=a.clearExistingRules,i=y(n(a,["forwardToReplicas","clearExistingRules"]));return o&&(i.queryParameters.forwardToReplicas=1),u&&(i.queryParameters.clearExistingRules=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/rules/batch",t.indexName),data:e},i),(function(e,r){return fe(t)(e.taskID,r)}))}},ne=function(t){return function(e,r){return ae(t)([e],r)}},ae=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,u=a.clearExistingSynonyms,i=a.replaceExistingSynonyms,s=y(n(a,["forwardToReplicas","clearExistingSynonyms","replaceExistingSynonyms"]));return o&&(s.queryParameters.forwardToReplicas=1),(i||u)&&(s.queryParameters.replaceExistingSynonyms=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/synonyms/batch",t.indexName),data:e},s),(function(e,r){return fe(t)(e.taskID,r)}))}},oe=function(t){return function(e,r){return t.transporter.read({method:j,path:h("1/indexes/%s/query",t.indexName),data:{query:e},cacheable:!0},r)}},ue=function(t){return function(e,r,n){return t.transporter.read({method:j,path:h("1/indexes/%s/facets/%s/query",t.indexName,e),data:{facetQuery:r},cacheable:!0},n)}},ie=function(t){return function(e,r){return t.transporter.read({method:j,path:h("1/indexes/%s/rules/search",t.indexName),data:{query:e}},r)}},se=function(t){return function(e,r){return t.transporter.read({method:j,path:h("1/indexes/%s/synonyms/search",t.indexName),data:{query:e}},r)}},ce=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,u=y(n(a,["forwardToReplicas"]));return o&&(u.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:D,path:h("1/indexes/%s/settings",t.indexName),data:e},u),(function(e,r){return fe(t)(e.taskID,r)}))}},fe=function(t){return function(e,r){return f((function(n){return function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/task/%s",t.indexName,e.toString())},r)}}(t)(e,r).then((function(t){return"published"!==t.status?n():void 0}))}))}},de={AddObject:"addObject",UpdateObject:"updateObject",PartialUpdateObject:"partialUpdateObject",PartialUpdateObjectNoCreate:"partialUpdateObjectNoCreate",DeleteObject:"deleteObject",DeleteIndex:"delete",ClearIndex:"clear"},le={Settings:"settings",Synonyms:"synonyms",Rules:"rules"},pe=1,he=2,me=3;function ye(t,e,n){var a,o={appId:t,apiKey:e,timeouts:{connect:1,read:2,write:30},requester:{send:function(t){return new Promise((function(e){var r=new XMLHttpRequest;r.open(t.method,t.url,!0),Object.keys(t.headers).forEach((function(e){return r.setRequestHeader(e,t.headers[e])}));var n,a=function(t,n){return setTimeout((function(){r.abort(),e({status:0,content:n,isTimedOut:!0})}),1e3*t)},o=a(t.connectTimeout,"Connection timeout");r.onreadystatechange=function(){r.readyState>r.OPENED&&void 0===n&&(clearTimeout(o),n=a(t.responseTimeout,"Socket timeout"))},r.onerror=function(){0===r.status&&(clearTimeout(o),clearTimeout(n),e({content:r.responseText||"Network request failed",status:r.status,isTimedOut:!1}))},r.onload=function(){clearTimeout(o),clearTimeout(n),e({content:r.responseText,status:r.status,isTimedOut:!1})},r.send(t.data)}))}},logger:(a=me,{debug:function(t,e){return pe>=a&&console.debug(t,e),Promise.resolve()},info:function(t,e){return he>=a&&console.info(t,e),Promise.resolve()},error:function(t,e){return console.error(t,e),Promise.resolve()}}),responsesCache:s(),requestsCache:s({serializable:!1}),hostsCache:i({caches:[u({key:"".concat("4.9.1","-").concat(t)}),s()]}),userAgent:T("4.9.1").add({segment:"Browser"})};return function(t){var e=t.appId,n=c(void 0!==t.authMode?t.authMode:m.WithinHeaders,e,t.apiKey),a=k(r(r({hosts:[{url:"".concat(e,"-dsn.algolia.net"),accept:g.Read},{url:"".concat(e,".algolia.net"),accept:g.Write}].concat(l([{url:"".concat(e,"-1.algolianet.com")},{url:"".concat(e,"-2.algolianet.com")},{url:"".concat(e,"-3.algolianet.com")}]))},t),{},{headers:r(r(r({},n.headers()),{"content-type":"application/x-www-form-urlencoded"}),t.headers),queryParameters:r(r({},n.queryParameters()),t.queryParameters)}));return p({transporter:a,appId:e,addAlgoliaAgent:function(t,e){a.userAgent.add({segment:t,version:e})},clearCache:function(){return Promise.all([a.requestsCache.clear(),a.responsesCache.clear()]).then((function(){}))}},t.methods)}(r(r(r({},o),n),{},{methods:{search:ht,searchForFacetValues:mt,multipleBatch:lt,multipleGetObjects:pt,multipleQueries:ht,copyIndex:L,copySettings:_,copySynonyms:X,copyRules:V,moveIndex:dt,listIndices:ct,getLogs:et,listClusters:st,multipleSearchForFacetValues:mt,getApiKey:$,addApiKey:W,listApiKeys:it,updateApiKey:It,deleteApiKey:Y,restoreApiKey:vt,assignUserID:B,assignUserIDs:Q,getUserID:at,searchUserIDs:wt,listUserIDs:ft,getTopUserIDs:rt,removeUserID:yt,hasPendingMappings:ot,clearDictionaryEntries:G,deleteDictionaryEntries:Z,getDictionarySettings:tt,getAppTask:nt,replaceDictionaryEntries:gt,saveDictionaryEntries:bt,searchDictionaryEntries:Pt,setDictionarySettings:Ot,waitAppTask:xt,initIndex:function(t){return function(e){return ut(t)(e,{methods:{batch:jt,delete:At,findAnswers:Ht,getObject:Kt,getObjects:Bt,saveObject:$t,saveObjects:te,search:oe,searchForFacetValues:ue,waitTask:fe,setSettings:ce,getSettings:Gt,partialUpdateObject:Vt,partialUpdateObjects:_t,deleteObject:Ct,deleteObjects:Ut,deleteBy:Rt,clearObjects:Tt,browseObjects:Dt,getObjectPosition:Wt,findObject:Mt,exists:Ft,saveSynonym:ne,saveSynonyms:ae,getSynonym:Lt,searchSynonyms:se,browseSynonyms:St,deleteSynonym:zt,clearSynonyms:Et,replaceAllObjects:Xt,replaceAllSynonyms:Zt,searchRules:ie,getRule:Qt,deleteRule:Jt,saveRule:ee,saveRules:re,replaceAllRules:Yt,browseRules:qt,clearRules:Nt}})}},initAnalytics:function(){return function(t){return function(t){var e=t.region||"us",n=c(m.WithinHeaders,t.appId,t.apiKey),a=k(r(r({hosts:[{url:"analytics.".concat(e,".algolia.com")}]},t),{},{headers:r(r(r({},n.headers()),{"content-type":"application/json"}),t.headers),queryParameters:r(r({},n.queryParameters()),t.queryParameters)}));return p({appId:t.appId,transporter:a},t.methods)}(r(r(r({},o),t),{},{methods:{addABTest:C,getABTest:J,getABTests:z,stopABTest:F,deleteABTest:U}}))}},initRecommendation:function(){return function(t){return function(t){var e=t.region||"us",n=c(m.WithinHeaders,t.appId,t.apiKey),a=k(r(r({hosts:[{url:"recommendation.".concat(e,".algolia.com")}]},t),{},{headers:r(r(r({},n.headers()),{"content-type":"application/json"}),t.headers),queryParameters:r(r({},n.queryParameters()),t.queryParameters)}));return p({appId:t.appId,transporter:a},t.methods)}(r(r(r({},o),t),{},{methods:{getPersonalizationStrategy:H,setPersonalizationStrategy:M}}))}}}}))}return ye.version="4.9.1",ye}));

},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/@algolia/autocomplete-theme-classic/dist/theme.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _autocompleteJs = require("@algolia/autocomplete-js");

var _autocompletePluginQuerySuggestions = require("@algolia/autocomplete-plugin-query-suggestions");

var _algoliasearch = _interopRequireDefault(require("algoliasearch"));

var _preact = require("preact");

require("@algolia/autocomplete-theme-classic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
// Import Algolia & Autocomplete Packages 
// Import the Autocomplete Classic Theme
// Instantiate the Algolia search client
var appId = 'latency';
var apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
var searchClient = (0, _algoliasearch.default)(appId, apiKey); // Create the Query Suggestions plugin 

var querySuggestionsPlugin = (0, _autocompletePluginQuerySuggestions.createQuerySuggestionsPlugin)({
  searchClient: searchClient,
  indexName: 'instant_search_demo_query_suggestions',
  getSearchParams: function getSearchParams(_ref) {
    var state = _ref.state;
    return {
      hitsPerPage: state.query ? 3 : 10
    };
  }
});
(0, _autocompleteJs.autocomplete)({
  container: '#autocomplete',
  //Define where your search box goes in the DOM
  placeholder: 'Search for products',
  //Define placeholder text
  openOnFocus: true,
  //If true, dropdown appears as soon as users focuses the input to display trending searches 
  // debug: true, //If true, keeps the panel open when inspecting elements in your browser DevTools
  plugins: [querySuggestionsPlugin],
  //Add the Query Suggestions plugin
  getSources: function getSources(_ref2) {
    var query = _ref2.query,
        state = _ref2.state;

    if (!query) {
      return [];
    }

    return [{
      sourceId: 'products',
      getItems: function getItems() {
        return (0, _autocompleteJs.getAlgoliaResults)({
          searchClient: searchClient,
          queries: [{
            indexName: 'instant_search',
            query: query,
            params: {
              hitsPerPage: 3,
              attributesToSnippet: ['name:10'],
              snippetEllipsisText: '…'
            }
          }]
        });
      },
      templates: {
        header: function header() {
          return (0, _preact.h)(_preact.Fragment, null, (0, _preact.h)("span", {
            className: "aa-SourceHeaderTitle"
          }, "Products"), (0, _preact.h)("div", {
            className: "aa-SourceHeaderLine"
          }));
        },
        item: function item(_ref3) {
          var item = _ref3.item,
              components = _ref3.components;
          return (0, _preact.h)(ProductItem, {
            hit: item,
            components: components
          });
        },
        noResults: function noResults() {
          return 'No products for this query.';
        }
      }
    }, {
      sourceId: 'productsCategories',
      getItems: function getItems(_ref4) {
        var query = _ref4.query;
        return (0, _autocompleteJs.getAlgoliaFacets)({
          searchClient: searchClient,
          queries: [{
            indexName: 'instant_search',
            facet: 'hierarchicalCategories.lvl1',
            params: {
              facetQuery: query,
              maxFacetHits: 2
            }
          }]
        });
      },
      templates: {
        header: function header() {
          return (0, _preact.h)(_preact.Fragment, null, (0, _preact.h)("span", {
            className: "aa-SourceHeaderTitle"
          }, "Products Categories"), (0, _preact.h)("div", {
            className: "aa-SourceHeaderLine"
          }));
        },
        item: function item(_ref5) {
          var item = _ref5.item;
          return (0, _preact.h)("div", null, item.label);
        }
      }
    }];
  }
}); // Add template for Product items

function ProductItem(_ref6) {
  var hit = _ref6.hit,
      components = _ref6.components;
  return (0, _preact.h)("a", {
    href: hit.url,
    className: "aa-ItemLink"
  }, (0, _preact.h)("div", {
    className: "aa-ItemContent"
  }, (0, _preact.h)("div", {
    className: "aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop"
  }, (0, _preact.h)("img", {
    src: hit.image,
    alt: hit.name,
    width: "40",
    height: "40"
  })), (0, _preact.h)("div", {
    className: "aa-ItemContentBody"
  }, (0, _preact.h)("div", {
    className: "aa-ItemContentTitle"
  }, (0, _preact.h)(components.Snippet, {
    hit: hit,
    attribute: "name"
  })), (0, _preact.h)("div", {
    className: "aa-ItemContentDescription"
  }, "From ", (0, _preact.h)("strong", null, hit.brand), " in", ' ', (0, _preact.h)("strong", null, hit.categories[0])), hit.rating > 0 && (0, _preact.h)("div", {
    className: "aa-ItemContentDescription"
  }, (0, _preact.h)("div", {
    style: {
      display: 'flex',
      gap: 1,
      color: '#ffc107'
    }
  }, Array.from({
    length: 5
  }, function (_value, index) {
    var isFilled = hit.rating >= index + 1;
    return (0, _preact.h)("svg", {
      key: index,
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: isFilled ? 'currentColor' : 'none',
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, (0, _preact.h)("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    }));
  }))), (0, _preact.h)("div", {
    className: "aa-ItemContentDescription",
    style: {
      color: '#000'
    }
  }, (0, _preact.h)("strong", null, "$", hit.price.toLocaleString())))), (0, _preact.h)("div", {
    className: "aa-ItemActions"
  }, (0, _preact.h)("button", {
    className: "aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly",
    type: "button",
    title: "Select",
    style: {
      pointerEvents: 'none'
    }
  }, (0, _preact.h)("svg", {
    viewBox: "0 0 24 24",
    width: "20",
    height: "20",
    fill: "currentColor"
  }, (0, _preact.h)("path", {
    d: "M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
  }))), (0, _preact.h)("button", {
    className: "aa-ItemActionButton",
    type: "button",
    title: "Add to cart"
  }, (0, _preact.h)("svg", {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    fill: "currentColor"
  }, (0, _preact.h)("path", {
    d: "M19 5h-14l1.5-2h11zM21.794 5.392l-2.994-3.992c-0.196-0.261-0.494-0.399-0.8-0.4h-12c-0.326 0-0.616 0.156-0.8 0.4l-2.994 3.992c-0.043 0.056-0.081 0.117-0.111 0.182-0.065 0.137-0.096 0.283-0.095 0.426v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.219-0.071-0.422-0.189-0.585-0.004-0.005-0.007-0.010-0.011-0.015zM4 7h16v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM15 10c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121c0-0.552-0.448-1-1-1s-1 0.448-1 1c0 1.38 0.561 2.632 1.464 3.536s2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536c0-0.552-0.448-1-1-1s-1 0.448-1 1z"
  })))));
}
},{"@algolia/autocomplete-js":"node_modules/@algolia/autocomplete-js/dist/esm/index.js","@algolia/autocomplete-plugin-query-suggestions":"node_modules/@algolia/autocomplete-plugin-query-suggestions/dist/esm/index.js","algoliasearch":"node_modules/algoliasearch/dist/algoliasearch.umd.js","preact":"node_modules/preact/dist/preact.module.js","@algolia/autocomplete-theme-classic":"node_modules/@algolia/autocomplete-theme-classic/dist/theme.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63607" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/federated-search-autocomplete-demo.e31bb0bc.js.map