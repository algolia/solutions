import RecentSearches from "recent-searches"

const filterUniques = (suggestions, query) => {
  const uniques = suggestions.reduce((acc, suggestion) => {
    if (acc[suggestion.query] || query === suggestion.query) return acc;
    acc[suggestion.query] = suggestion;
    return acc;
  }, {});

  return Object.values(uniques);
};

const renderSearchBoxContainer = (placeholder, value) => `
  <div id="searchbox">
    <div 
      id="search-box-container"
      role="combobox"
      aria-expanded="false"
      aria-owns="search-results-container"
      aria-haspopup="grid"
      >
      <input 
        id="search-box-input"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="search-results-container"
        placeholder="${placeholder}"
        value="${value}"
        type="text"
      >
    </div>
    <div id="clear-input"><i class="fas fa-times"></i></div>
    <div 
      style="display: none"
      id="search-results-container"
      role="grid">
    </div>
  </div>
`;

const suppressComboBoxFocus = event => {
  if (isKey(event, 40, "ArrowDown")) return "ArrowDown";
  if (isKey(event, 38, "ArrowUp")) return "ArrowUp";
  if (isKey(event, 13, "Enter")) return "Enter";
  if (isKey(event, 27, "Escape")) return "Escape";
  return null;
};
const sanitizeQuery = query => query.replace(/\s+/gm, "");
const isKey = (event, code, name) =>
  event.which === code || event.keyCode === code || event.key === name;

const validateMandatoryColumnOptions = column => {
  const COLUMN_TYPES = ["QuerySuggestions", "Facets", "Search"];
  const MANDATORY_PARAMS = ["indexName", "type", "noResultsRenderer"];

  const errors = [];

  MANDATORY_PARAMS.forEach(param => {
    if (!column[param]) {
      errors.push(new Error(`${param} parameter was not provided.`));
    }
  });

  if (COLUMN_TYPES.indexOf(column.type) === -1) {
    const message = `Column has unknown type ${
      column.type
    }. Valid column types are ${COLUMN_TYPES.join(", ")}`;

    errors.push(new Error(message));
  }

  return errors;
};

const validateQuerySuggestionsColumnOptions = column => {
  const errors = [];
  if (typeof column.itemRenderer !== "function") {
    errors.push(
      new Error(
        "Search column requires itemRenderer function param that returns the string you want to render"
      )
    );
  }

  return errors;
};

const validateSearchColumnOptions = column => {
  const errors = [];
  if (typeof column.itemRenderer !== "function") {
    errors.push(
      new Error(
        "Search column requires itemRenderer function param that returns the string you want to render"
      )
    );
  }

  return errors;
};

const validateFacetColumnOptions = column => {
  const errors = [];
  if (!column.facets || !column.facets.length) {
    errors.push(
      new Error(
        "Facets column requires you to specifiy a facets array that represents the facets you want displayed. Example: ['brand', 'category']"
      )
    );
  }

  if (typeof column.itemRenderer !== "function") {
    errors.push(
      new Error(
        "Search column requires itemRenderer function param that returns the string you want to render"
      )
    );
  }

  if (typeof column.facetTitleRenderer !== "function") {
    errors.push(
      new Error(
        "Facets column requires facetTitleRenderer function which returns the string you want to render. Example: function(facet){return 'Searched in ' + facet }"
      )
    );
  }

  return errors;
};

const COLUMN_TYPE_VALIDATORS = {
  Search: validateSearchColumnOptions,
  QuerySuggestions: validateQuerySuggestionsColumnOptions,
  Facets: validateFacetColumnOptions
};

const initializeIndices = (columns, client) => {
  // Initialize a map [indexName: string]: AlgoliaIndex
  return columns.reduce((indices, column) => {
    if (indices[column.indexName]) return indices;
    indices[column.indexName] = client.initIndex(column.indexName);
    return indices;
  }, {});
};

const initializeSearchInsights = (appId, apiKey) => {
  !(function(e, a, t, n, s, i, c) {
    (e.AlgoliaAnalyticsObject = s),
      (e.aa =
        e.aa ||
        function() {
          (e.aa.queue = e.aa.queue || []).push(arguments);
        }),
      (i = a.createElement(t)),
      (c = a.getElementsByTagName(t)[0]),
      (i.async = 1),
      (i.src = "https://cdn.jsdelivr.net/npm/search-insights@1.0.0"),
      c.parentNode.insertBefore(i, c);
  })(window, document, "script", 0, "aa");

  window.aa("init", {
    appId,
    apiKey
  });

  return true;
};

const enrichHitsWithClickAnalyticsData = (hits, queryID) => {
  return hits.map((hit, index) => ({
    ...hit,
    __queryID: queryID,
    __position: index + 1
  }));
};

const renderColumns = (resultsContainer, columns) => {
  // This has the side effect of enriching the column with it's respective
  // container node. This way we can avoid relying on custom id's
  const DEFAULT_TITLE = title => `<h3 class="column-title">${title}</h3>`;
  const DEFAULT_RESULTS = () => `<ul></ul>`;

  return columns.map(column => {
    const columnNode = document.createElement("div");

    const titleHTML =
      typeof column.titleRenderer === "function"
        ? column.titleRenderer()
        : DEFAULT_TITLE(column.title);

    const resultsHTML =
      typeof column.resultsTemplate === "function"
        ? column.resultsTemplate()
        : DEFAULT_RESULTS();

    if (column.type !== "Facets") {
      columnNode.innerHTML = titleHTML + resultsHTML;
      resultsContainer.append(columnNode);

      return {
        ...column,
        limit: column.limit || 5,
        columnNode: columnNode.lastChild
      };
    } else {
      column.facets.forEach((facet, index) => {
        const innerColumn = document.createElement("div");
        const facetTitleHTML = column.facetTitleRenderer(facet);
        const resultsHTML =
          typeof column.resultsTemplate === "function"
            ? column.resultsTemplate([])
            : DEFAULT_RESULTS();

        innerColumn.innerHTML = facetTitleHTML + resultsHTML;
        columnNode.appendChild(innerColumn);
      });

      resultsContainer.append(columnNode);

      return {
        ...column,
        limit: column.limit || 5,
        columnNode: columnNode
      };
    }
  });
};

class FederatedSearchWidget {
  constructor(options) {
    const mandatoryErrors = options.columns.reduce((acc, column) => {
      return acc.concat(validateMandatoryColumnOptions(column));
    }, []);

    if (mandatoryErrors.length > 0) throw mandatoryErrors;

    const customColumnErrors = options.columns.reduce((acc, column) => {
      return acc.concat(COLUMN_TYPE_VALIDATORS[column.type](column));
    }, []);

    if (customColumnErrors.length > 0) throw customColumnErrors;

    this.widgetOptions = {
      container: options.container,
      appID: options.appID,
      apiKey: options.apiKey,
      placeholder: options.placeholder || "Search by Algolia",
      closeOnBlur:
        typeof options.closeOnBlur !== "undefined" ? options.closeOnBlur : true,
      openOnFocus:
        typeof options.openOnFocus !== "undefined" ? options.openOnFocus : false
    };

    const querySuggestionOptions = options.columns.find(
      c => c.type === "QuerySuggestions"
    );

    this.maxSavedSearchesPerQuery = options.maxSavedSearchesPerQuery || 4;
    this.recentSearchesEnabled = options.recentSearchesEnabled || false;
    if (this.recentSearchesEnabled) {
      this.RecentSearches = new RecentSearches({
        namespace: querySuggestionOptions["indexName"]
      });
    }

    this.columnsMetaData = options.columns;

    // DOM Element references
    this.client = algoliasearch(
      this.widgetOptions.appID,
      this.widgetOptions.apiKey
    );

    this.indices = initializeIndices(this.columnsMetaData, this.client);
  }

  init(instantSearchOptions) {
    this.helper = instantSearchOptions.helper;
    this.widgetContainer = document.querySelector(this.widgetOptions.container);
    this.widgetContainer.innerHTML = renderSearchBoxContainer(
      this.widgetOptions.placeholder,
      instantSearchOptions.helper.state.query
    );

    this.searchBoxContainer = this.widgetContainer.querySelector(
      "#search-box-container"
    );
    this.searchBoxInput = this.widgetContainer.querySelector(
      "#search-box-input"
    );

    this.clearButton = this.widgetContainer.querySelector("#clear-input");
    this.resultsContainer = this.widgetContainer.querySelector(
      "#search-results-container"
    );

    if (this.columnsMetaData.some(column => column.clickAnalytics)) {
      initializeSearchInsights(
        this.widgetOptions.appID,
        this.widgetOptions.apiKey
      );
    }

    this.columns = renderColumns(this.resultsContainer, this.columnsMetaData);

    this.searchBoxInput.addEventListener("keydown", this.onKeyBoardNavigation);
    this.searchBoxInput.addEventListener("input", event => {
      const query = event.currentTarget.value;

      if (!query) {
        this.clearButton.style.display = "none";
        this.resultsContainer.style.display = "none";
        this.updateExpandedA11y(false);
        return;
      }

      this.search(query, instantSearchOptions);
    });

    if (this.widgetOptions.openOnFocus) {
      this.searchBoxInput.addEventListener("focus", event => {
        const query = event.currentTarget.value;
        this.search(query, instantSearchOptions);
      });
    }

    if (this.widgetOptions.closeOnBlur) {
      document.addEventListener("click", event => {
        if (this.widgetContainer.contains(event.target)) {
          // Click has happened inside the widget
          return;
        }
        this.clearButton.style.display = "none";
        this.resultsContainer.style.display = "none";
      });
    }

    // Clear button
    this.clearButton.addEventListener("click", e => {
      this.searchBoxInput.value = "";
      this.clearButton.style.display = "none";
      const event = new Event("input");
      this.searchBoxInput.dispatchEvent(event);
    });
  }

  // Keyboard navigation
  onKeyBoardNavigation = event => {
    const hijackedKey = suppressComboBoxFocus(event);
    // Keep the focus inside the textbox
    if (hijackedKey) event.preventDefault();

    if (hijackedKey === "Enter") {
      const currentSelectedElement = this.resultsContainer.querySelector(
        '[aria-selected="true"]'
      );

      if (currentSelectedElement) {
        return currentSelectedElement.dispatchEvent(new Event("click"));
      }

      this.helper.setQuery(this.searchBoxInput.value).search();
      this.resultsContainer.style.display = "none";
    }

    if (hijackedKey === "ArrowDown") {
      // Handle ArrowDown
      const currentSelectedElement = this.resultsContainer.querySelector(
        '[aria-selected="true"]'
      );

      const suggestions = Array.from(
        this.resultsContainer.querySelectorAll("li")
      );
      if (!suggestions.length) return;

      // Set first element to selected
      if (!currentSelectedElement) {
        const firstSuggestion = suggestions[0];
        firstSuggestion.setAttribute("aria-selected", true);
        this.updateActiveDescendantA11y(firstSuggestion.id);
        return;
      }

      // Set next element to selected
      const nextSelectedElement =
        suggestions[
          (suggestions.indexOf(currentSelectedElement) + 1) % suggestions.length
        ];

      currentSelectedElement.removeAttribute("aria-selected");
      nextSelectedElement.setAttribute("aria-selected", true);
      this.updateActiveDescendantA11y(nextSelectedElement.id);
    }

    // Handle ArrowUp
    if (hijackedKey === "ArrowUp") {
      const currentSelectedElement = this.resultsContainer.querySelector(
        '[aria-selected="true"]'
      );

      const suggestions = Array.from(
        this.resultsContainer.querySelectorAll("li")
      );
      if (!suggestions.length) return;

      // Set last element to selected
      if (!currentSelectedElement) {
        const lastSuggestion = suggestions[suggestions.length - 1];
        lastSuggestion.setAttribute("aria-selected", true);
        this.updateActiveDescendantA11y(lastSuggestion.id);
        return;
      }

      // Set previous element to selected
      const currentIndex = suggestions.indexOf(currentSelectedElement) - 1;
      const nextSelectedElement =
        suggestions[
          currentIndex === -1
            ? suggestions.length - 1
            : currentIndex % suggestions.length
        ];

      currentSelectedElement.removeAttribute("aria-selected");
      nextSelectedElement.setAttribute("aria-selected", true);
      this.updateActiveDescendantA11y(nextSelectedElement.id);
    }

    if (hijackedKey === "Escape") {
      this.clear();
      this.updateActiveDescendantA11y();
    }
  };

  search = (query, instantSearchOptions) => {
    this.clearButton.style.display = "block";
    this.resultsContainer.style.display = "";
    this.updateExpandedA11y(true);

    // Perfom a search for each index
    this.columns.forEach(column => {
      const index = this.indices[column.indexName];

      switch (column.type) {
        case "Facets":
          index
            .search({
              query,
              hitsPerPage: 1,
              facets: column.facets
            })
            .then(response => {
              renderFacets(column, response, query, instantSearchOptions);
              return response;
            });
          break;
        case "QuerySuggestions":
          index
            .search({
              query,
              hitsPerPage: column.limit,
              clickAnalytics: column.clickAnalytics
            })
            .then(response => {
              renderQuerySuggestions(
                column,
                response,
                query,
                instantSearchOptions,
                this.RecentSearches,
                this.maxSavedSearchesPerQuery
              );
              return response;
            });
          break;
        case "Search":
          index
            .search({
              query,
              hitsPerPage: column.limit,
              clickAnalytics: column.clickAnalytics
            })
            .then(response => {
              renderSearchHits(column, response, query, instantSearchOptions);
              return response;
            });
          break;
      }
    });
  };

  updateExpandedA11y = expanded => {
    if (
      this.searchBoxContainer.getAttribute("aria-expanded") !== String(expanded)
    ) {
      this.searchBoxContainer.setAttribute("aria-expanded", expanded);
    }
  };

  updateActiveDescendantA11y = activeDescendantID => {
    if (
      activeDescendantID &&
      this.searchBoxInput.getAttribute("aria-activedescendant") !==
        String(activeDescendantID)
    ) {
      return this.searchBoxInput.setAttribute(
        "aria-activedescendant",
        activeDescendantID
      );
    }
    this.searchBoxInput.removeAttribute("aria-activedescendant");
  };

  clear = () => {
    this.clearButton.style.display = "none";
    this.resultsContainer.style.display = "none";
  };
}

const renderFacets = (column, response, query, instantSearchOptions) => {
  column.facets.forEach((facet, index) => {
    const facetsNode = column.columnNode.childNodes[index].lastChild;
    facetsNode.innerHTML = "";

    if (!response.facets[facet]) {
      facetsNode.innerHTML = column.noResultsRenderer(query, response);
      return;
    }

    Object.entries(response.facets[facet])
      .slice(0, column.limit)
      .forEach(([value, count]) => {
        const hit = {
          name: value,
          category: facet,
          count
        };
        const element = document.createElement("li");
        // ID is required to manage aria-activedescendant
        element.id = `${facet}-${sanitizeQuery(value)}-${index}`;

        element.innerHTML = column.itemRenderer(hit);
        facetsNode.appendChild(element);

        if (typeof column.afterItemRenderer === "function") {
          column.afterItemRenderer(
            element,
            hit,
            response,
            instantSearchOptions
          );
        }
      });
  });
};

const renderQuerySuggestions = (
  column,
  response,
  query,
  instantSearchOptions,
  recentSearches,
  maxSavedSearchesPerQuery
) => {
  column.columnNode.innerHTML = "";

  let hits;

  if (recentSearches) {
    const searches = recentSearches
      .getRecentSearches(query)
      .slice(0, maxSavedSearchesPerQuery)
      .map(suggestion => ({ ...suggestion.data, __recent__: true }));

    hits = searches.concat(response.hits);
  } else {
    hits = response.hits;
  }

  if (!hits.length) {
    column.columnNode.innerHTML = column.noResultsRenderer(query, response);
    return;
  }

  hits.forEach((hit, index) => {
    const element = document.createElement("li");
    // ID is required to manage aria-activedescendant
    element.id = `${sanitizeQuery(hit.query)}-${index}`;
    element.innerHTML =
      typeof column.itemRenderer === "function"
        ? column.itemRenderer(hit, index, response)
        : hit._highlightResult.query.value;

    column.columnNode.append(element);
    if (typeof column.afterItemRenderer === "function") {
      column.afterItemRenderer(
        element,
        hit,
        response,
        instantSearchOptions,
        recentSearches
      );
    }
  });
};

const renderSearchHits = (column, response, query, instantSearchOptions) => {
  const hits = response.queryID
    ? enrichHitsWithClickAnalyticsData(response.hits, response.queryID)
    : response.hits;

  column.columnNode.innerHTML = "";

  if (!hits.length) {
    column.columnNode.innerHTML = column.noResultsRenderer(query, response);
    return;
  }

  hits.forEach((hit, index) => {
    const element = document.createElement("li");
    // ID is required to manage aria-activedescendant
    element.id = `${sanitizeQuery(hit.objectID)}-${index}`;

    element.innerHTML = column.itemRenderer(hit);
    column.columnNode.append(element);

    if (typeof column.afterItemRenderer === "function") {
      column.afterItemRenderer(element, hit, response, instantSearchOptions);
    }
  });
};

export default FederatedSearchWidget;
