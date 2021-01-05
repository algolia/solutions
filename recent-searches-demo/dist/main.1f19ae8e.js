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

},{}],"recent-searches/recent-searches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recentSearches = _interopRequireDefault(require("recent-searches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  return "\n      <div id=\"searchbox\">\n        <div id=\"predictive-box\" style=\"display: none;\">\n          <span id=\"predictive-box-text\"></span>\n        </div>\n        <div\n          id=\"search-box-container\"\n          class=\"search-box-container\"\n          role=\"combobox\"\n          aria-expanded=\"false\"\n          aria-haspopup=\"listbos\"\n          aria-owns=\"searches-suggestions\"\n          >\n          <input \n            id=\"search-box-input\"\n            autocomplete=\"off\"\n            autofocus=\"true\"\n            placeholder=\"".concat(placeholder || "Search", "\"\n            value=\"").concat(value || "", "\"\n            type=\"text\"\n            aria-autocomplete=\"list\"\n            aria-controls=\"searches-suggestions\"\n            aria-activedescendant\n          >\n        </div>\n        <div class=\"recent-searches-container\">\n          <ul id=\"recent-searches-tags\" role=\"listbox\" label=\"Searches\" style=\"display: none\">\n        </div>\n      </div>\n    ");
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

var PredictiveSearchBox = /*#__PURE__*/function () {
  function PredictiveSearchBox(options) {
    var _this = this;

    _classCallCheck(this, PredictiveSearchBox);

    _defineProperty(this, "registerSearchBoxHandlers", function (helper, searchBox) {
      searchBox.addEventListener("keydown", _this.onSearchBoxKeyDown);
      searchBox.addEventListener("input", function (event) {
        _this.updateTabActionSuggestion(event);

        helper.setQuery(event.currentTarget.value).search();
      });
      searchBox.addEventListener("focus", function (event) {
        _this.updateTabActionSuggestion(event);

        helper.setQuery(event.currentTarget.value).search();
      });
      document.addEventListener("click", function (event) {
        if (_this.widgetContainer.contains(event.target)) return;

        _this.closeSuggestionTags();
      });
    });

    _defineProperty(this, "setSearchBoxValue", function (value) {
      _this.searchBoxInput.value = value || "";

      _this.searchBoxInput.dispatchEvent(new Event("input"));
    });

    _defineProperty(this, "setPredictiveSearchBoxValue", function (value) {
      _this.predictiveSearchBoxItem.innerText = value || "";
    });

    _defineProperty(this, "onSearchBoxKeyDown", function (event) {
      // If there is no suggestion, jump to next element
      // If user presses tab once, highlight selection
      // If user presses tab twice, jump to next element
      // If input value = suggestion, jump to next element
      _this.onKeyBoardNavigation(event);

      if (!_this.tabActionSuggestion || !event.currentTarget.value || !isKey(event, 9, "Tab") && !isKey(event, 39, "ArrowRight")) {
        _this.previousSearchBoxEvent = null;
        return;
      }

      var isPressingTabTwice = _this.previousSearchBoxEvent && isKey(event, 9, "Tab") && isKey(_this.previousSearchBoxEvent, 9, "Tab");
      var isPressingArrowRightTwice = _this.previousSearchBoxEvent && isKey(event, 39, "ArrowRight") && isKey(_this.previousSearchBoxEvent, 39, "ArrowRight"); // Store previous event so we can skip navigation later

      _this.previousSearchBoxEvent = event;
      if (isPressingTabTwice || isPressingArrowRightTwice) return null;
      event.preventDefault();

      _this.setPredictiveSearchBoxValue();

      _this.setSearchBoxValue(_this.tabActionSuggestion);

      _this.closeSuggestionTags();
    });

    _defineProperty(this, "updateSuggestionTags", function (hits) {
      if (!_this.maxSuggestions || _this.maxSuggestions <= 0 || !hits.length) {
        return hits;
      }

      _this.clearSuggestionTags();

      hits.slice(0, _this.maxSuggestions).forEach(function (suggestion) {
        var suggestionElement = document.createElement("li");
        suggestionElement.setAttribute("role", "option");
        suggestionElement.setAttribute("id", "suggestion-".concat(sanitizeQuery(suggestion.query)));
        suggestionElement.dataset.query = suggestion.query;
        suggestionElement.classList.add("suggestion-tag");
        suggestionElement.innerHTML = suggestion.__recent__ ? "<span><i class=\"fas fa-clock\"></i>".concat(suggestion.query, "</span>") : "<span><i class=\"fas fa-search\"></i>".concat(suggestion._highlightResult.query.value, "</span>");
        suggestionElement.addEventListener("click", function () {
          _this.RecentSearches.setRecentSearch(suggestion.query, suggestion);

          _this.setPredictiveSearchBoxValue();

          _this.closeSuggestionTags();

          _this.searchBoxInput.value = suggestion.query;

          _this.helper.setQuery(suggestion.query).search();
        });
        suggestionElement.addEventListener("mouseenter", function (event) {
          var currentSelectedElement = _this.suggestionTagsContainer.querySelector('[aria-selected="true"]');

          if (currentSelectedElement) {
            currentSelectedElement.removeAttribute("aria-selected");
          }

          event.currentTarget.setAttribute("aria-selected", true);
        });
        suggestionElement.addEventListener("mouseleave", function (event) {
          event.currentTarget.removeAttribute("aria-selected");
        });

        _this.suggestionTagsContainer.append(suggestionElement);
      });

      _this.updateExpandedA11y(hits.length > 0);
    });

    _defineProperty(this, "updateTabActionSuggestion", function (event) {
      var query = event.currentTarget.value;

      if (!query) {
        _this.closeSuggestionTags();

        _this.updateExpandedA11y(false);

        _this.predictiveSearchBox.style.display = "none";
        return;
      } // If new query does not match prefix, reset the prediction


      if (_this.tabActionSuggestion && !_this.tabActionSuggestion.startsWith(query)) {
        _this.setPredictiveSearchBoxValue();
      }

      _this.querySuggestionsIndex.search({
        query: query
      }).then(function (response) {
        _this.suggestionTagsContainer.style.display = "";

        var recentSearches = _this.RecentSearches.getRecentSearches(query).slice(0, _this.maxSavedSearchesPerQuery).map(function (suggestion) {
          return _objectSpread({}, suggestion.data, {
            __recent__: true
          });
        });

        var suggestions = filterUniques(recentSearches.concat(response.hits), query);

        if (!suggestions.length) {
          _this.clearSuggestions();

          _this.suggestionTagsContainer.innerHTML = _this.noResultsRenderer(query, response);
          return [];
        }

        var prediction = suggestions[0].query;

        if (prediction.startsWith(query)) {
          _this.predictiveSearchBox.style.display = "flex";

          _this.setPredictiveSearchBoxValue(prediction);

          _this.tabActionSuggestion = prediction;
        } else {
          _this.setPredictiveSearchBoxValue();
        }

        return suggestions;
      }).then(_this.updateSuggestionTags);
    });

    _defineProperty(this, "closeSuggestionTags", function () {
      _this.suggestionTagsContainer.style.display = "none";
    });

    _defineProperty(this, "clearSuggestionTags", function () {
      _this.suggestionTagsContainer.innerHTML = "";
    });

    _defineProperty(this, "clearSuggestions", function () {
      _this.tabActionSuggestion = null;

      _this.setPredictiveSearchBoxValue();
    });

    _defineProperty(this, "clear", function () {
      _this.clearSuggestionTags();

      _this.setPredictiveSearchBoxValue();

      _this.updateExpandedA11y(false);

      _this.tabActionSuggestion = null;

      _this.setSearchBoxValue();
    });

    _defineProperty(this, "onKeyBoardNavigation", function (event) {
      var hijackedKey = suppressComboBoxFocus(event); // Keep the focus inside the textbox

      if (hijackedKey) event.preventDefault(); // Select current value

      if (hijackedKey === "Enter") {
        var currentSelectedElement = _this.suggestionTagsContainer.querySelector('[aria-selected="true"]');

        if (currentSelectedElement) {
          currentSelectedElement.dispatchEvent(new Event("click"));

          _this.closeSuggestionTags();

          _this.clearSuggestions();
        }
      } // Handle ArrowDown


      if (hijackedKey === "ArrowDown" && _this.suggestionTagsContainer.childNodes) {
        var _currentSelectedElement = _this.suggestionTagsContainer.querySelector('[aria-selected="true"]');

        var suggestions = Array.from(_this.suggestionTagsContainer.childNodes);
        if (!suggestions.length) return; // Set first element to selected

        if (!_currentSelectedElement) {
          var firstSuggestion = suggestions[0];

          _this.setPredictiveSearchBoxValue();

          _this.searchBoxInput.value = firstSuggestion.dataset.query;
          firstSuggestion.setAttribute("aria-selected", true);

          _this.updateActiveDescendantA11y(firstSuggestion.id);

          return;
        } // Set next element to selected


        var nextSelectedElement = suggestions[(suggestions.indexOf(_currentSelectedElement) + 1) % suggestions.length];

        _this.setPredictiveSearchBoxValue();

        _this.searchBoxInput.value = nextSelectedElement.dataset.query;

        _currentSelectedElement.removeAttribute("aria-selected");

        nextSelectedElement.setAttribute("aria-selected", true);

        _this.updateActiveDescendantA11y(nextSelectedElement.id);
      } // Handle ArrowUp


      if (hijackedKey === "ArrowUp" && _this.suggestionTagsContainer.childNodes) {
        var _currentSelectedElement2 = _this.suggestionTagsContainer.querySelector('[aria-selected="true"]');

        var _suggestions = Array.from(_this.suggestionTagsContainer.childNodes);

        if (!_suggestions.length) return; // Set last element to selected

        if (!_currentSelectedElement2) {
          var lastSuggestion = _suggestions[_suggestions.length - 1];

          _this.setPredictiveSearchBoxValue();

          _this.searchBoxInput.value = lastSuggestion.dataset.query;
          lastSuggestion.setAttribute("aria-selected", true);

          _this.updateActiveDescendantA11y(lastSuggestion.id);

          return;
        } // Set previous element to selected


        var currentIndex = _suggestions.indexOf(_currentSelectedElement2) - 1;
        var _nextSelectedElement = _suggestions[currentIndex === -1 ? _suggestions.length - 1 : currentIndex % _suggestions.length];

        _this.setPredictiveSearchBoxValue();

        _this.searchBoxInput.value = _nextSelectedElement.dataset.query;

        _currentSelectedElement2.removeAttribute("aria-selected");

        _nextSelectedElement.setAttribute("aria-selected", true);

        _this.updateActiveDescendantA11y(_nextSelectedElement.id);
      }

      if (hijackedKey === "Escape") {
        _this.clear();

        _this.updateActiveDescendantA11y();
      }
    });

    _defineProperty(this, "updateExpandedA11y", function (expanded) {
      if (_this.predictiveSearchBoxContainer.getAttribute("aria-expanded") !== String(expanded)) {
        _this.predictiveSearchBoxContainer.setAttribute("aria-expanded", expanded);
      }
    });

    _defineProperty(this, "updateActiveDescendantA11y", function (activeDescendantID) {
      if (activeDescendantID && _this.searchBoxInput.getAttribute("aria-activedescendant") !== String(activeDescendantID)) {
        return _this.searchBoxInput.setAttribute("aria-activedescendant", activeDescendantID);
      }

      _this.searchBoxInput.removeAttribute("aria-activedescendant");
    });

    Object.assign(this, options);

    if (typeof options.noResultsRenderer !== "function") {
      throw new Error("You are required to pass a noResultRendered function that will render a no result message");
    } // Default options


    this.maxSuggestions = this.maxSuggestions || 10;
    this.maxSavedSearchesPerQuery = this.maxSavedSearchesPerQuery || 4;
    this.RecentSearches = new _recentSearches.default({
      namespace: this.querySuggestionsIndex
    });
    this.client = algoliasearch(options.appID, options.apiKey);
    this.querySuggestionsIndex = this.client.initIndex(this.querySuggestionsIndex);
    this.tabActionSuggestion = null;
    this.previousSearchBoxEvent = null;
  }

  _createClass(PredictiveSearchBox, [{
    key: "init",
    value: function init(instantSearchOptions) {
      this.helper = instantSearchOptions.helper;
      this.widgetContainer = document.querySelector(this.container);

      if (!this.widgetContainer) {
        throw new Error("Could not find widget container ".concat(this.container, " inside the DOM"));
      }

      this.widgetContainer.innerHTML = renderSearchBoxContainer(this.placeholder, instantSearchOptions.helper.state.query);
      this.predictiveSearchBox = this.widgetContainer.querySelector("#predictive-box");
      this.predictiveSearchBoxItem = this.widgetContainer.querySelector("#predictive-box-text");
      this.predictiveSearchBoxContainer = this.widgetContainer.querySelector("#search-box-container");
      this.searchBoxInput = this.widgetContainer.querySelector("#search-box-input");
      this.suggestionTagsContainer = this.widgetContainer.querySelector("#recent-searches-tags");
      this.registerSearchBoxHandlers(instantSearchOptions.helper, this.searchBoxInput);
    }
  }]);

  return PredictiveSearchBox;
}();

var _default = PredictiveSearchBox;
exports.default = _default;
},{"recent-searches":"node_modules/recent-searches/dist/index.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _recentSearches = _interopRequireDefault(require("./recent-searches/recent-searches.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appID = "932LAAGOT3";
var apiKey = "6a187532e8e703464da52c20555c37cf";
var search = instantsearch({
  indexName: "atis-prods",
  searchClient: algoliasearch(appID, apiKey)
});
search.addWidget(instantsearch.widgets.configure({
  hitsPerPage: 12
}));
search.addWidget(instantsearch.widgets.hits({
  container: "#hits",
  templates: {
    empty: "No results",
    item: function item(hit) {
      return "\n        <div class=\"item\">\n            <div class=\"centered\"><img src=\"".concat(hit.largeImage, "\" alt=\"\"></div>\n            <div class=\"centered\"><div class=\"add-to-cart\"><i class=\"fas fa-cart-plus\"></i> Add <span class=\"hide-mobile hide-tablet\">to Cart</span></div></div>\n            <div class=\"item-content\">\n                <p class=\"brand\">").concat(hit._highlightResult.brand && hit._highlightResult.brand.value, "</p>\n                <p class=\"name\">").concat(hit._highlightResult.title.value, "</p>\n            </div>\n        </div>\n        <p class=\"price\">$").concat(hit.price, "</p>");
    }
  }
}));
search.addWidget(new _recentSearches.default({
  container: "#recent-searches",
  appID: appID,
  apiKey: apiKey,
  querySuggestionsIndex: "atis-prods_query_suggestions",
  placeholder: "Search with query suggestions",
  maxSavedSearchesPerQuery: 5,
  noResultsRenderer: function noResultsRenderer(query, response) {
    return "<li class=\"no-results\">No Matching Suggestion for <b>".concat(query, "</b></li>");
  }
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
search.addWidget(instantsearch.widgets.refinementList({
  container: "#categories",
  attribute: "categories"
}));
search.addWidget(instantsearch.widgets.rangeSlider({
  container: "#price",
  attribute: "price"
}));
search.start();
},{"./recent-searches/recent-searches.js":"recent-searches/recent-searches.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64456" + '/');

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