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
})({"node_modules/recent-searches/dist/index.js":[function(require,module,exports) {
var define;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("RecentSearches", [], factory);
	else if(typeof exports === 'object')
		exports["RecentSearches"] = factory();
	else
		root["RecentSearches"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./lib/MemoryStorage.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var MemoryStorage_MemoryStorage = function MemoryStorage(config) {
  var _this = this;

  _classCallCheck(this, MemoryStorage);

  _defineProperty(this, "DATA", {});

  _defineProperty(this, "KEY", void 0);

  _defineProperty(this, "DEFAULT_VALUE", void 0);

  _defineProperty(this, "getItem", function () {
    return _this.DATA[_this.KEY] || _this.DEFAULT_VALUE;
  });

  _defineProperty(this, "setItem", function (data) {
    _this.DATA[_this.KEY] = data;
    return true;
  });

  var key = config.key,
      defaultValue = config.defaultValue;
  this.DATA = {};
  this.KEY = key || DEFAULT_STORAGE_KEY;
  this.DEFAULT_VALUE = defaultValue;
};

/* harmony default export */ var lib_MemoryStorage = (MemoryStorage_MemoryStorage);
// CONCATENATED MODULE: ./lib/SafeLocalStorage.ts
function SafeLocalStorage_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SafeLocalStorage_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var DEFAULT_STORAGE_KEY = "__RECENT_SEARCHES__";
var isLocalStorageSupported = function isLocalStorageSupported() {
  var key = "__TEST__KEY__";

  try {
    localStorage.setItem(key, "");
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
var safeDataParse = function safeDataParse(data, defaultValue) {
  if (!data) {
    return defaultValue;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultValue;
  }
};
var SafeLocalStorage = function SafeLocalStorage(config) {
  var _this = this;

  SafeLocalStorage_classCallCheck(this, SafeLocalStorage);

  SafeLocalStorage_defineProperty(this, "KEY", void 0);

  SafeLocalStorage_defineProperty(this, "DEFAULT_VALUE", void 0);

  SafeLocalStorage_defineProperty(this, "getItem", function () {
    var data = localStorage.getItem(_this.KEY);
    return safeDataParse(data, _this.DEFAULT_VALUE);
  });

  SafeLocalStorage_defineProperty(this, "setItem", function (items) {
    try {
      localStorage.setItem(_this.KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      return false;
    }
  });

  var key = config.key,
      defaultValue = config.defaultValue;
  this.KEY = key || DEFAULT_STORAGE_KEY;
  this.DEFAULT_VALUE = defaultValue;
};

var SafeLocalStorage_NewSafeLocalStorage = function NewSafeLocalStorage(config) {
  if (!isLocalStorageSupported()) {
    return new lib_MemoryStorage(config);
  }

  return new SafeLocalStorage(config);
};

/* harmony default export */ var lib_SafeLocalStorage = (SafeLocalStorage_NewSafeLocalStorage);
// CONCATENATED MODULE: ./lib/utils/score.ts
var computeMatchScore = function computeMatchScore(search, query, rankBy, ttl) {
  var normalizedQuery = String(query);

  switch (rankBy) {
    case "PROXIMITY":
      return search.query.indexOf(normalizedQuery);

    case "TIME":
      return Math.log10(new Date().getTime() - search.timestamp);

    default:
      var matchDistance = search.query.indexOf(normalizedQuery);
      var timeDelta = Math.log2((new Date().getTime() - search.timestamp) / ttl + 1);
      var proximity = Math.log2(matchDistance + 1) || 1;

      if (matchDistance === -1) {
        return matchDistance;
      }

      return (0.01 + 0.49 * proximity + 0.49 * timeDelta) / 1;
  }
};

/* harmony default export */ var utils_score = (computeMatchScore);
// CONCATENATED MODULE: ./lib/utils/string.ts
var isBlank = function isBlank() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return /^\s*$/.test(str);
};

var isValidQuery = function isValidQuery(query) {
  return typeof query === "string" && !isBlank(query) || typeof query === "number";
};

/* harmony default export */ var string = (isValidQuery);
// CONCATENATED MODULE: ./lib/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentSearches", function() { return lib_RecentSearches; });
function lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lib_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var lib_RecentSearches = function RecentSearches() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  lib_classCallCheck(this, RecentSearches);

  lib_defineProperty(this, "TTL", void 0);

  lib_defineProperty(this, "LIMIT", void 0);

  lib_defineProperty(this, "STORAGE", void 0);

  lib_defineProperty(this, "RANKING", void 0);

  lib_defineProperty(this, "RECENT_SEARCHES", []);

  lib_defineProperty(this, "getRecentSearches", function (query) {
    if (!string(query)) {
      return _this.RECENT_SEARCHES;
    }

    var matchedSearches = _this.RECENT_SEARCHES.map(function (search) {
      var score = utils_score(search, query, _this.RANKING, _this.TTL);
      return {
        data: search.data,
        query: search.query,
        score: score,
        timestamp: search.timestamp
      };
    }).filter(_this.filterScoredResults).sort(_this.sortScoredResults).map(function (search) {
      return {
        data: search.data,
        query: search.query,
        timestamp: search.timestamp
      };
    });

    return matchedSearches;
  });

  lib_defineProperty(this, "setRecentSearch", function (query, data) {
    if (!string(query)) {
      return _this.RECENT_SEARCHES;
    }

    var search = {
      data: data,
      query: String(query),
      timestamp: new Date().getTime()
    };

    var existingQueryIndex = _this.RECENT_SEARCHES.findIndex(function (searchEntry) {
      return searchEntry.query === query;
    });

    if (existingQueryIndex > -1) {
      _this.RECENT_SEARCHES.splice(existingQueryIndex, 1);
    }

    _this.RECENT_SEARCHES.unshift(search);

    _this.RECENT_SEARCHES = _this.RECENT_SEARCHES.slice(0, _this.LIMIT);

    _this.STORAGE.setItem(_this.RECENT_SEARCHES);

    return _this.RECENT_SEARCHES;
  });

  lib_defineProperty(this, "filterScoredResults", function (search) {
    if (_this.RANKING === "TIME") {
      return true;
    }

    return search.score > -1;
  });

  lib_defineProperty(this, "sortScoredResults", function (a, b) {
    return a.score - b.score;
  });

  lib_defineProperty(this, "initializeStorageData", function () {
    var currentTimestamp = new Date().getTime();

    var items = _this.STORAGE.getItem().filter(function (search) {
      return search.timestamp + _this.TTL >= currentTimestamp;
    }).slice(0, _this.LIMIT);

    _this.STORAGE.setItem(items);

    _this.RECENT_SEARCHES = items;
    return items;
  });

  this.TTL = config.ttl || 1000 * 60 * 60 * 24;
  this.LIMIT = config.limit || 50;
  this.STORAGE = lib_SafeLocalStorage({
    defaultValue: [],
    key: config.namespace
  });
  this.RECENT_SEARCHES = this.initializeStorageData();
  this.RANKING = config.ranking || "PROXIMITY_AND_TIME";
}
/**
 * Retrieve recent searches for a given query.
 * If no query is passed, returns all recent searches
 *
 * @param  {string} query?
 * @returns Search[]
 */
;
/* harmony default export */ var lib = __webpack_exports__["default"] = (lib_RecentSearches);

/***/ })
/******/ ]);
});

},{}],"federated-search-widget/federated-search-widget.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recentSearches = _interopRequireDefault(require("recent-searches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterUniques = function filterUniques(suggestions, query) {
  var uniques = suggestions.reduce(function (acc, suggestion) {
    if (acc[suggestion.query] || query === suggestion.query) return acc;
    acc[suggestion.query] = suggestion;
    return acc;
  }, {});
  return Object.values(uniques);
};

var renderSearchBoxContainer = function renderSearchBoxContainer(placeholder, value) {
  return "\n  <div id=\"searchbox\">\n    <div \n      id=\"search-box-container\"\n      role=\"combobox\"\n      aria-expanded=\"false\"\n      aria-owns=\"search-results-container\"\n      aria-haspopup=\"grid\"\n      >\n      <input \n        id=\"search-box-input\"\n        autocomplete=\"off\"\n        aria-autocomplete=\"list\"\n        aria-controls=\"search-results-container\"\n        placeholder=\"".concat(placeholder, "\"\n        value=\"").concat(value, "\"\n        type=\"text\"\n      >\n    </div>\n    <div id=\"clear-input\"><i class=\"fas fa-times\"></i></div>\n    <div \n      style=\"display: none\"\n      id=\"search-results-container\"\n      role=\"grid\">\n    </div>\n  </div>\n");
};

var suppressComboBoxFocus = function suppressComboBoxFocus(event) {
  if (isKey(event, 40, "ArrowDown")) return "ArrowDown";
  if (isKey(event, 38, "ArrowUp")) return "ArrowUp";
  if (isKey(event, 13, "Enter")) return "Enter";
  if (isKey(event, 27, "Escape")) return "Escape";
  return null;
};

var sanitizeQuery = function sanitizeQuery(query) {
  return query.replace(/\s+/gm, "");
};

var isKey = function isKey(event, code, name) {
  return event.which === code || event.keyCode === code || event.key === name;
};

var validateMandatoryColumnOptions = function validateMandatoryColumnOptions(column) {
  var COLUMN_TYPES = ["QuerySuggestions", "Facets", "Search"];
  var MANDATORY_PARAMS = ["indexName", "type", "noResultsRenderer"];
  var errors = [];
  MANDATORY_PARAMS.forEach(function (param) {
    if (!column[param]) {
      errors.push(new Error("".concat(param, " parameter was not provided.")));
    }
  });

  if (COLUMN_TYPES.indexOf(column.type) === -1) {
    var message = "Column has unknown type ".concat(column.type, ". Valid column types are ").concat(COLUMN_TYPES.join(", "));
    errors.push(new Error(message));
  }

  return errors;
};

var validateQuerySuggestionsColumnOptions = function validateQuerySuggestionsColumnOptions(column) {
  var errors = [];

  if (typeof column.itemRenderer !== "function") {
    errors.push(new Error("Search column requires itemRenderer function param that returns the string you want to render"));
  }

  return errors;
};

var validateSearchColumnOptions = function validateSearchColumnOptions(column) {
  var errors = [];

  if (typeof column.itemRenderer !== "function") {
    errors.push(new Error("Search column requires itemRenderer function param that returns the string you want to render"));
  }

  return errors;
};

var validateFacetColumnOptions = function validateFacetColumnOptions(column) {
  var errors = [];

  if (!column.facets || !column.facets.length) {
    errors.push(new Error("Facets column requires you to specifiy a facets array that represents the facets you want displayed. Example: ['brand', 'category']"));
  }

  if (typeof column.itemRenderer !== "function") {
    errors.push(new Error("Search column requires itemRenderer function param that returns the string you want to render"));
  }

  if (typeof column.facetTitleRenderer !== "function") {
    errors.push(new Error("Facets column requires facetTitleRenderer function which returns the string you want to render. Example: function(facet){return 'Searched in ' + facet }"));
  }

  return errors;
};

var COLUMN_TYPE_VALIDATORS = {
  Search: validateSearchColumnOptions,
  QuerySuggestions: validateQuerySuggestionsColumnOptions,
  Facets: validateFacetColumnOptions
};

var initializeIndices = function initializeIndices(columns, client) {
  // Initialize a map [indexName: string]: AlgoliaIndex
  return columns.reduce(function (indices, column) {
    if (indices[column.indexName]) return indices;
    indices[column.indexName] = client.initIndex(column.indexName);
    return indices;
  }, {});
};

var initializeSearchInsights = function initializeSearchInsights(appId, apiKey) {
  !function (e, a, t, n, s, i, c) {
    e.AlgoliaAnalyticsObject = s, e.aa = e.aa || function () {
      (e.aa.queue = e.aa.queue || []).push(arguments);
    }, i = a.createElement(t), c = a.getElementsByTagName(t)[0], i.async = 1, i.src = "https://cdn.jsdelivr.net/npm/search-insights@1.0.0", c.parentNode.insertBefore(i, c);
  }(window, document, "script", 0, "aa");
  window.aa("init", {
    appId: appId,
    apiKey: apiKey
  });
  return true;
};

var enrichHitsWithClickAnalyticsData = function enrichHitsWithClickAnalyticsData(hits, queryID) {
  return hits.map(function (hit, index) {
    return _objectSpread({}, hit, {
      __queryID: queryID,
      __position: index + 1
    });
  });
};

var renderColumns = function renderColumns(resultsContainer, columns) {
  // This has the side effect of enriching the column with it's respective
  // container node. This way we can avoid relying on custom id's
  var DEFAULT_TITLE = function DEFAULT_TITLE(title) {
    return "<h3 class=\"column-title\">".concat(title, "</h3>");
  };

  var DEFAULT_RESULTS = function DEFAULT_RESULTS() {
    return "<ul></ul>";
  };

  return columns.map(function (column) {
    var columnNode = document.createElement("div");
    var titleHTML = typeof column.titleRenderer === "function" ? column.titleRenderer() : DEFAULT_TITLE(column.title);
    var resultsHTML = typeof column.resultsTemplate === "function" ? column.resultsTemplate() : DEFAULT_RESULTS();

    if (column.type !== "Facets") {
      columnNode.innerHTML = titleHTML + resultsHTML;
      resultsContainer.append(columnNode);
      return _objectSpread({}, column, {
        limit: column.limit || 5,
        columnNode: columnNode.lastChild
      });
    } else {
      column.facets.forEach(function (facet, index) {
        var innerColumn = document.createElement("div");
        var facetTitleHTML = column.facetTitleRenderer(facet);
        var resultsHTML = typeof column.resultsTemplate === "function" ? column.resultsTemplate([]) : DEFAULT_RESULTS();
        innerColumn.innerHTML = facetTitleHTML + resultsHTML;
        columnNode.appendChild(innerColumn);
      });
      resultsContainer.append(columnNode);
      return _objectSpread({}, column, {
        limit: column.limit || 5,
        columnNode: columnNode
      });
    }
  });
};

var FederatedSearchWidget = /*#__PURE__*/function () {
  function FederatedSearchWidget(options) {
    var _this = this;

    _classCallCheck(this, FederatedSearchWidget);

    _defineProperty(this, "onKeyBoardNavigation", function (event) {
      var hijackedKey = suppressComboBoxFocus(event); // Keep the focus inside the textbox

      if (hijackedKey) event.preventDefault();

      if (hijackedKey === "Enter") {
        var currentSelectedElement = _this.resultsContainer.querySelector('[aria-selected="true"]');

        if (currentSelectedElement) {
          return currentSelectedElement.dispatchEvent(new Event("click"));
        }

        _this.helper.setQuery(_this.searchBoxInput.value).search();

        _this.resultsContainer.style.display = "none";
      }

      if (hijackedKey === "ArrowDown") {
        // Handle ArrowDown
        var _currentSelectedElement = _this.resultsContainer.querySelector('[aria-selected="true"]');

        var suggestions = Array.from(_this.resultsContainer.querySelectorAll("li"));
        if (!suggestions.length) return; // Set first element to selected

        if (!_currentSelectedElement) {
          var firstSuggestion = suggestions[0];
          firstSuggestion.setAttribute("aria-selected", true);

          _this.updateActiveDescendantA11y(firstSuggestion.id);

          return;
        } // Set next element to selected


        var nextSelectedElement = suggestions[(suggestions.indexOf(_currentSelectedElement) + 1) % suggestions.length];

        _currentSelectedElement.removeAttribute("aria-selected");

        nextSelectedElement.setAttribute("aria-selected", true);

        _this.updateActiveDescendantA11y(nextSelectedElement.id);
      } // Handle ArrowUp


      if (hijackedKey === "ArrowUp") {
        var _currentSelectedElement2 = _this.resultsContainer.querySelector('[aria-selected="true"]');

        var _suggestions = Array.from(_this.resultsContainer.querySelectorAll("li"));

        if (!_suggestions.length) return; // Set last element to selected

        if (!_currentSelectedElement2) {
          var lastSuggestion = _suggestions[_suggestions.length - 1];
          lastSuggestion.setAttribute("aria-selected", true);

          _this.updateActiveDescendantA11y(lastSuggestion.id);

          return;
        } // Set previous element to selected


        var currentIndex = _suggestions.indexOf(_currentSelectedElement2) - 1;
        var _nextSelectedElement = _suggestions[currentIndex === -1 ? _suggestions.length - 1 : currentIndex % _suggestions.length];

        _currentSelectedElement2.removeAttribute("aria-selected");

        _nextSelectedElement.setAttribute("aria-selected", true);

        _this.updateActiveDescendantA11y(_nextSelectedElement.id);
      }

      if (hijackedKey === "Escape") {
        _this.clear();

        _this.updateActiveDescendantA11y();
      }
    });

    _defineProperty(this, "search", function (query, instantSearchOptions) {
      _this.clearButton.style.display = "block";
      _this.resultsContainer.style.display = "";

      _this.updateExpandedA11y(true); // Perfom a search for each index


      _this.columns.forEach(function (column) {
        var index = _this.indices[column.indexName];

        switch (column.type) {
          case "Facets":
            index.search({
              query: query,
              hitsPerPage: 1,
              facets: column.facets
            }).then(function (response) {
              renderFacets(column, response, query, instantSearchOptions);
              return response;
            });
            break;

          case "QuerySuggestions":
            index.search({
              query: query,
              hitsPerPage: column.limit,
              clickAnalytics: column.clickAnalytics
            }).then(function (response) {
              renderQuerySuggestions(column, response, query, instantSearchOptions, _this.RecentSearches, _this.maxSavedSearchesPerQuery);
              return response;
            });
            break;

          case "Search":
            index.search({
              query: query,
              hitsPerPage: column.limit,
              clickAnalytics: column.clickAnalytics
            }).then(function (response) {
              renderSearchHits(column, response, query, instantSearchOptions);
              return response;
            });
            break;
        }
      });
    });

    _defineProperty(this, "updateExpandedA11y", function (expanded) {
      if (_this.searchBoxContainer.getAttribute("aria-expanded") !== String(expanded)) {
        _this.searchBoxContainer.setAttribute("aria-expanded", expanded);
      }
    });

    _defineProperty(this, "updateActiveDescendantA11y", function (activeDescendantID) {
      if (activeDescendantID && _this.searchBoxInput.getAttribute("aria-activedescendant") !== String(activeDescendantID)) {
        return _this.searchBoxInput.setAttribute("aria-activedescendant", activeDescendantID);
      }

      _this.searchBoxInput.removeAttribute("aria-activedescendant");
    });

    _defineProperty(this, "clear", function () {
      _this.clearButton.style.display = "none";
      _this.resultsContainer.style.display = "none";
    });

    var mandatoryErrors = options.columns.reduce(function (acc, column) {
      return acc.concat(validateMandatoryColumnOptions(column));
    }, []);
    if (mandatoryErrors.length > 0) throw mandatoryErrors;
    var customColumnErrors = options.columns.reduce(function (acc, column) {
      return acc.concat(COLUMN_TYPE_VALIDATORS[column.type](column));
    }, []);
    if (customColumnErrors.length > 0) throw customColumnErrors;
    this.widgetOptions = {
      container: options.container,
      appID: options.appID,
      apiKey: options.apiKey,
      placeholder: options.placeholder || "Search by Algolia",
      closeOnBlur: typeof options.closeOnBlur !== "undefined" ? options.closeOnBlur : true,
      openOnFocus: typeof options.openOnFocus !== "undefined" ? options.openOnFocus : false
    };
    var querySuggestionOptions = options.columns.find(function (c) {
      return c.type === "QuerySuggestions";
    });
    this.maxSavedSearchesPerQuery = options.maxSavedSearchesPerQuery || 4;
    this.recentSearchesEnabled = options.recentSearchesEnabled || false;

    if (this.recentSearchesEnabled) {
      this.RecentSearches = new _recentSearches.default({
        namespace: querySuggestionOptions["indexName"]
      });
    }

    this.columnsMetaData = options.columns; // DOM Element references

    this.client = algoliasearch(this.widgetOptions.appID, this.widgetOptions.apiKey);
    this.indices = initializeIndices(this.columnsMetaData, this.client);
  }

  _createClass(FederatedSearchWidget, [{
    key: "init",
    value: function init(instantSearchOptions) {
      var _this2 = this;

      this.helper = instantSearchOptions.helper;
      this.widgetContainer = document.querySelector(this.widgetOptions.container);
      this.widgetContainer.innerHTML = renderSearchBoxContainer(this.widgetOptions.placeholder, instantSearchOptions.helper.state.query);
      this.searchBoxContainer = this.widgetContainer.querySelector("#search-box-container");
      this.searchBoxInput = this.widgetContainer.querySelector("#search-box-input");
      this.clearButton = this.widgetContainer.querySelector("#clear-input");
      this.resultsContainer = this.widgetContainer.querySelector("#search-results-container");

      if (this.columnsMetaData.some(function (column) {
        return column.clickAnalytics;
      })) {
        initializeSearchInsights(this.widgetOptions.appID, this.widgetOptions.apiKey);
      }

      this.columns = renderColumns(this.resultsContainer, this.columnsMetaData);
      this.searchBoxInput.addEventListener("keydown", this.onKeyBoardNavigation);
      this.searchBoxInput.addEventListener("input", function (event) {
        var query = event.currentTarget.value;

        if (!query) {
          _this2.clearButton.style.display = "none";
          _this2.resultsContainer.style.display = "none";

          _this2.updateExpandedA11y(false);

          return;
        }

        _this2.search(query, instantSearchOptions);
      });

      if (this.widgetOptions.openOnFocus) {
        this.searchBoxInput.addEventListener("focus", function (event) {
          var query = event.currentTarget.value;

          _this2.search(query, instantSearchOptions);
        });
      }

      if (this.widgetOptions.closeOnBlur) {
        document.addEventListener("click", function (event) {
          if (_this2.widgetContainer.contains(event.target)) {
            // Click has happened inside the widget
            return;
          }

          _this2.clearButton.style.display = "none";
          _this2.resultsContainer.style.display = "none";
        });
      } // Clear button


      this.clearButton.addEventListener("click", function (e) {
        _this2.searchBoxInput.value = "";
        _this2.clearButton.style.display = "none";
        var event = new Event("input");

        _this2.searchBoxInput.dispatchEvent(event);
      });
    } // Keyboard navigation

  }]);

  return FederatedSearchWidget;
}();

var renderFacets = function renderFacets(column, response, query, instantSearchOptions) {
  column.facets.forEach(function (facet, index) {
    var facetsNode = column.columnNode.childNodes[index].lastChild;
    facetsNode.innerHTML = "";

    if (!response.facets[facet]) {
      facetsNode.innerHTML = column.noResultsRenderer(query, response);
      return;
    }

    Object.entries(response.facets[facet]).slice(0, column.limit).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          value = _ref2[0],
          count = _ref2[1];

      var hit = {
        name: value,
        category: facet,
        count: count
      };
      var element = document.createElement("li"); // ID is required to manage aria-activedescendant

      element.id = "".concat(facet, "-").concat(sanitizeQuery(value), "-").concat(index);
      element.innerHTML = column.itemRenderer(hit);
      facetsNode.appendChild(element);

      if (typeof column.afterItemRenderer === "function") {
        column.afterItemRenderer(element, hit, response, instantSearchOptions);
      }
    });
  });
};

var renderQuerySuggestions = function renderQuerySuggestions(column, response, query, instantSearchOptions, recentSearches, maxSavedSearchesPerQuery) {
  column.columnNode.innerHTML = "";
  var hits;

  if (recentSearches) {
    var searches = recentSearches.getRecentSearches(query).slice(0, maxSavedSearchesPerQuery).map(function (suggestion) {
      return _objectSpread({}, suggestion.data, {
        __recent__: true
      });
    });
    hits = searches.concat(response.hits);
  } else {
    hits = response.hits;
  }

  if (!hits.length) {
    column.columnNode.innerHTML = column.noResultsRenderer(query, response);
    return;
  }

  hits.forEach(function (hit, index) {
    var element = document.createElement("li"); // ID is required to manage aria-activedescendant

    element.id = "".concat(sanitizeQuery(hit.query), "-").concat(index);
    element.innerHTML = typeof column.itemRenderer === "function" ? column.itemRenderer(hit, index, response) : hit._highlightResult.query.value;
    column.columnNode.append(element);

    if (typeof column.afterItemRenderer === "function") {
      column.afterItemRenderer(element, hit, response, instantSearchOptions, recentSearches);
    }
  });
};

var renderSearchHits = function renderSearchHits(column, response, query, instantSearchOptions) {
  var hits = response.queryID ? enrichHitsWithClickAnalyticsData(response.hits, response.queryID) : response.hits;
  column.columnNode.innerHTML = "";

  if (!hits.length) {
    column.columnNode.innerHTML = column.noResultsRenderer(query, response);
    return;
  }

  hits.forEach(function (hit, index) {
    var element = document.createElement("li"); // ID is required to manage aria-activedescendant

    element.id = "".concat(sanitizeQuery(hit.objectID), "-").concat(index);
    element.innerHTML = column.itemRenderer(hit);
    column.columnNode.append(element);

    if (typeof column.afterItemRenderer === "function") {
      column.afterItemRenderer(element, hit, response, instantSearchOptions);
    }
  });
};

var _default = FederatedSearchWidget;
exports.default = _default;
},{"recent-searches":"node_modules/recent-searches/dist/index.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _federatedSearchWidget = _interopRequireDefault(require("./federated-search-widget/federated-search-widget.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appID = "932LAAGOT3";
var apiKey = "6a187532e8e703464da52c20555c37cf";

var renderQuerySuggestionWithCategory = function renderQuerySuggestionWithCategory(suggestion, counter, response, sourceIndex) {
  if (!suggestion[sourceIndex]) {
    return suggestion._highlightResult.query.value;
  }

  var bestMatchedFacet = Object.values(suggestion[sourceIndex].facets.exact_matches).reduce(function (acc, arr) {
    return acc.concat(arr);
  }, []).sort(function (a, b) {
    if (a.count > b.count) return -1;
    if (a.count < b.count) return 1;
    return 0;
  });

  if (counter < Math.round(response.hits.length * 0.25)) {
    return "\n        <div>\n          <i class=\"fas ".concat(suggestion.__recent__ && "fa-clock", "\"></i>\n          <span class=\"inverted-highlight\">\n            ").concat(suggestion._highlightResult.query.value, "\n          </span>\n          <span class=\"in-facet\">\n            <i>\n              in ").concat(bestMatchedFacet[0].value, "\n            </i>\n          </span>\n        </div>\n      ");
  } else {
    return "\n      <div>\n        <i class=\"fas ".concat(suggestion.__recent__ && "fa-clock", "\"></i>\n        <span class=\"inverted-highlight\">\n          ").concat(suggestion._highlightResult.query.value, "\n        </span>\n      </div>\n    ");
  }
};

var numberWithCommas = function numberWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var virutalRefinementList = instantsearch.connectors.connectRefinementList(function () {});
var search = instantsearch({
  indexName: "atis-prods",
  searchClient: algoliasearch(appID, apiKey),
  routing: true // This option is mandatory to allow the createURL function to generate an URL.

});
search.addWidget(instantsearch.widgets.configure({
  hitsPerPage: 12
}));
search.addWidget( // Useful for debug purpose
instantsearch.widgets.currentRefinements({
  container: "#current-refinements"
}));
search.addWidget(instantsearch.widgets.hits({
  container: "#hits",
  templates: {
    empty: "No results",
    item: function item(hit) {
      return "\n            <div class=\"item\">\n                <div class=\"centered\"><img src=\"".concat(hit.largeImage, "\" alt=\"\"></div>\n                <div class=\"centered\"><div class=\"add-to-cart\"><i class=\"fas fa-cart-plus\"></i> Add <span class=\"hide-mobile hide-tablet\">to Cart</span></div></div>\n                <div class=\"item-content\">\n                    <p class=\"brand\">").concat(hit._highlightResult.brand && hit._highlightResult.brand.value, "</p>\n                    <p class=\"name\">").concat(hit._highlightResult.title.value, "</p>\n                </div>\n            </div>\n            <p class=\"price\">$").concat(hit.price, "</p>\n            <br>");
    }
  }
}));
search.addWidget(new _federatedSearchWidget.default({
  container: "#search-box",
  appID: appID,
  apiKey: apiKey,
  placeholder: "Search for products and brands",
  recentSearchesEnabled: false,
  maxSavedSearchesPerQuery: 4,
  closeOnBlur: true,
  openOnFocus: true,
  columns: [{
    type: "QuerySuggestions",
    indexName: "atis-prods_query_suggestions",
    clickAnalytics: true,
    title: "Suggestions",
    limit: 10,
    noResultsRenderer: function noResultsRenderer(query, response) {
      return "No Matching Suggestion for ".concat(query);
    },
    itemRenderer: function itemRenderer(hit, counter, response) {
      return renderQuerySuggestionWithCategory(hit, counter, response, "atis-prods");
    },
    // itemRenderer: suggestion => `
    //   <a href="http://localhost:3000/?q=${suggestion.query}" target="_blank">
    //     ${suggestion._highlightResult.query.value}
    //   </a>
    // `
    afterItemRenderer: function afterItemRenderer(element, hit, response, options, recentSearches) {
      element.addEventListener("click", function (event) {
        event.preventDefault();

        if (recentSearches) {
          recentSearches.setRecentSearch(hit.query, hit);
        }

        document.querySelector("#search-box-input").value = hit.query;
        options.helper.setQuery(hit.query).search();
        document.querySelector("#search-results-container").style.display = "none";
      });
    }
  }, {
    type: "Search",
    indexName: "atis-prods",
    title: "Products",
    clickAnalytics: true,
    itemRenderer: function itemRenderer(hit) {
      return "\n          <div class='hit'>\n            <img src=\"".concat(hit.largeImage, "\" alt=\"\">\n            <div class=\"hit-info\">\n              <p class=\"hit-title\">").concat(hit._highlightResult.title.value, "</p>\n              <div class=\"hit-actions\">\n                <div>\n                  <span class=\"hit-price\">").concat(hit.price, "\u20AC</span>\n                </div>\n                <div class=\"hit-buttons\">\n                  <button class=\"click-button\">View</button>\n                  <button class=\"buy-button\">Buy</button>\n                </div>\n              </div>\n            </div>\n          </div>");
    },
    noResultsRenderer: function noResultsRenderer(query, response) {
      return "No Matching Products for query ".concat(query);
    },
    afterItemRenderer: function afterItemRenderer(element, hit, response, options) {
      element.addEventListener("click", function (event) {
        event.stopPropagation();
        aa("clickedObjectIDsAfterSearch", {
          eventName: "product_clicked",
          index: "atis-prods",
          queryID: response.queryID,
          objectIDs: [hit.objectID],
          positions: [hit.__position]
        });
      }); // Example of sending a click event

      element.querySelector(".click-button").addEventListener("click", function (event) {
        event.stopPropagation();
        aa("clickedObjectIDsAfterSearch", {
          eventName: "product_clicked",
          index: "atis-prods",
          queryID: response.queryID,
          objectIDs: [hit.objectID],
          positions: [hit.__position]
        });
      }); // Example of sending a conversion event

      element.querySelector(".buy-button").addEventListener("click", function (event) {
        event.stopPropagation();
        aa("convertedObjectIDsAfterSearch", {
          eventName: "product_clicked",
          index: "atis-prods",
          queryID: response.queryID,
          objectIDs: [hit.objectID]
        });
      });
    }
  }, {
    type: "Facets",
    indexName: "atis-prods",
    noResultLabel: "No result",
    facets: ["categories", "brand"],
    clickAnalytics: true,
    facetTitleRenderer: function facetTitleRenderer(facet) {
      return "<h3 class=\"column-title\">".concat(facet === "categories" ? "Categories" : "Brands", "</h3>");
    },
    itemRenderer: function itemRenderer(facet, facetCategory) {
      return "\n          <span class=\"facet\">".concat(facet.name, "</span> ").concat(numberWithCommas(facet.count), "\n        ");
    },
    noResultsRenderer: function noResultsRenderer(query, response) {
      return "No Matching Facet for query ".concat(query);
    },
    afterItemRenderer: function afterItemRenderer(element, hit, response, options) {
      // Add the facet refinement
      element.addEventListener("click", function (event) {
        event.preventDefault();
        var nextState = options.helper.state.addDisjunctiveFacetRefinement(hit.category, hit.name);
        window.location.href = options.createURL(nextState);
      });
    }
  }]
}));
search.addWidget(instantsearch.widgets.pagination({
  container: "#pagination"
}));
search.addWidget(instantsearch.widgets.stats({
  container: "#stats-container"
}));
search.addWidget(instantsearch.widgets.refinementList({
  container: "#brand",
  attribute: "brand",
  limit: 5,
  showMore: true,
  searchable: true,
  searchablePlaceholder: "Search our brands"
}));
search.addWidget( // This widget is required otherwise we can't add the refinement to
// generate the URL with the refinement applied. The widget is headless
// it does not render anything. Note that for brand we don't have it because
// we already have a refinementList mounted on the page.
virutalRefinementList({
  attribute: "categories" // Need to be all the facets that are currently not visible on the website

}));
search.start();
},{"./federated-search-widget/federated-search-widget.js":"federated-search-widget/federated-search-widget.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65354" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map