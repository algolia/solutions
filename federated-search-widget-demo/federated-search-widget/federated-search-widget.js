// QuerySuggestions
// indexName: string
// type: "QuerySuggestions" | "Facets" | "Search"
// limit: number? = 10
// querySuggestionsSourceIndex? string

// Search
// indexName: string
// type: "QuerySuggestions" | "Facets" | "Search"
// limit?: number = 3
// itemTemplate: TEMPLATE?
// redirectAttribute: string???

// Facets
// indexName: string
// type: "QuerySuggestions" | "Facets" | "Search"
// facets: string[]
// limit?: number = 3

// titleTemplate: () => titleString
// itemTemplate: () => titleString

const validateMandatoryColumnOptions = column => {
  const COLUMN_TYPES = ["QuerySuggestions", "Facets", "Search"];
  const MANDATORY_PARAMS = ["indexName", "type"];

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

const renderColumns = (resultsContainer, columns) => {
  // This has the side effect of enriching the column with it's respective
  // container node. This way we can avoid relying on custom id's
  return columns.map((column, index) => {
    const columnNode = document.createElement("div");
    columnNode.classList.add("ais-federated-result");

    columnNode.innerHTML = `<h3 class="column-title">${column.title}</h3>
                      <ul id="column-${index}-content"></ul>`;

    resultsContainer.append(columnNode);

    return {
      ...column,
      columnNode
    };
  });
};

class FederatedSearchWidget {
  constructor(options) {
    const mandatoryErrors = options.columns.reduce((acc, column) => {
      return acc.concat(validateMandatoryColumnOptions(column));
    }, []);

    if (mandatoryErrors.length > 0) throw mandatoryErrors;
    this.columnsMetaData = options.columns;

    // DOM Element references
    this.client = algoliasearch(options.appID, options.apiKey);
    this.indices = initializeIndices(options.columns, this.client);

    this.widgetContainer = document.querySelector(options.container);
    this.widgetContainer.innerHTML = `
    <div id="searchbox">
    <div class="search-box-container">
    <input autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    placeholder="${options.placeholder || ""}"
    role="textbox"
    spellcheck="false"
    type="text"
    value=""
    id="search-box-input">
    </div>
    <div id="clear-input"><i class="fas fa-times"></i></div>
    <div id="federated-results-container"></div>
    </div>
    `;
    this.searchBoxInput = this.widgetContainer.querySelector(
      "#search-box-input"
    );

    this.clearButton = this.widgetContainer.querySelector("#clear-input");
    this.resultsContainer = this.widgetContainer.querySelector(
      "#federated-results-container"
    );

    this.clickAnalytics = options.clickAnalytics
      ? initializeSearchInsights(options.appID, options.apiKey)
      : false;
  }

  init(initOptions) {
    this.columns = renderColumns(this.resultsContainer, this.columnsMetaData);

    this.searchBoxInput.addEventListener("input", event => {
      const { value } = event.currentTarget;

      if (!value) {
        this.clearButton.style.display = "none";
        this.resultsContainer.style.display = "none";
        return;
      }

      this.clearButton.style.display = "block";
      //@TODO Set display to inherit
      this.resultsContainer.style.display = "flex";

      // Perfom a search for each index
      this.columns.forEach(column => {
        const index = this.indices[column.indexName];

        switch (column.type) {
          case "Facets":
            index
              .search({
                query: value,
                hitsPerPage: 1,
                facets: column.facets
              })
              .then(response => {
                displayFacets(column, response, initOptions);
                return response;
              });
            break;
          case "QuerySuggestions":
            index
              .search({
                query: value,
                hitsPerPage: column.displayLimit,
                clickAnalytics: this.clickAnalytics
              })
              .then(response => {
                displayQuerySuggestions(
                  response,
                  column.sourceIndexForQS,
                  column.columnNode,
                  column.redirectTo,
                  column.noResultLabel
                );
                return response;
              });
            break;
          case "Search":
            index
              .search({
                query: value,
                hitsPerPage: column.displayLimit,
                clickAnalytics: this.clickAnalytics
              })
              .then(response => {
                displayHits(
                  response,
                  column.columnNode,
                  column.itemTemplate,
                  column.noResultLabel,
                  column.redirectAttribute,
                  this.clickAnalytics,
                  column.indexName
                );
                return response;
              });
            break;
        }
      });
    });

    // Clear button
    this.clearButton.addEventListener("click", e => {
      this.searchBoxInput.value = "";
      this.clearButton.style.display = "none";
      const event = new Event("input");
      this.searchBoxInput.dispatchEvent(event);
    });
  }
}

const displayFacets = (column, response, initOptions) => {
  column.facets.forEach((facet, index) => {
    const element = document.createElement("div");
    element.setAttribute("id", `facet-column-${index}-content`);
    column.columnNode.append(element);
    const container = document.getElementById(`facet-column-${index}-content`);
    if (response.facets[facet] !== undefined) {
      displayFacetValues(
        Object.entries(response.facets[facet]).slice(0, column.displayLimit),
        container,
        `<h3 class="column-title">${column.title[index]}</h3>`,
        initOptions,
        facet
      );
    } else {
      container.innerHTML = `<h3 class="column-title">${column.title[index]}</h3><p>${column.noResultLabel}</p>`;
    }
  });
};

function displayQuerySuggestions(
  response,
  qsSourceIndex,
  container,
  redirectTo,
  noResultLabel
) {
  const hits = response.hits;

  container.innerHTML = "";
  if (hits.length > 0) {
    for (let i = 0; i < hits.length; i++) {
      const element = document.createElement("div");
      element.classList.add("hover-background");
      element.addEventListener("click", function(e) {
        window.location = encodeURI(redirectTo + hits[i].query);
      });
      if (i < Math.round(0.25 * hits.length)) {
        if (hits[i][qsSourceIndex] != undefined) {
          Object.keys(hits[i][qsSourceIndex].facets.exact_matches).forEach(
            key => {
              const array = hits[i][qsSourceIndex].facets.exact_matches[key];
              array.sort(function(a, b) {
                if (a.count > b.count) return -1;
                if (a.count < b.count) return 1;
                return 0;
              });
              element.innerHTML = `<div style="padding: 10px;"><span class="inverted-highlight">${
                hits[i]._highlightResult.query.value
              }</span> <span class="in-facet"><i> in ${(key,
              array[0].value)}</i></span></div>`;
            }
          );
        }
      } else {
        element.innerHTML = `<div style="padding: 10px;" class="inverted-highlight">${hits[i]._highlightResult.query.value}</div>`;
      }
      container.append(element);
    }
  } else {
    container.innerHTML = `<p>${noResultLabel}</p>`;
  }
}

function displayFacetValues(
  arrayOfFacetsAndCount,
  container,
  title,
  initOptions,
  facet
) {
  container.innerHTML = title;
  arrayOfFacetsAndCount.forEach(array => {
    const element = document.createElement("div");
    element.classList.add("hover-background");
    element.addEventListener("click", e => {
      const nextStateWithFacetRefinement = initOptions.helper.state.addDisjunctiveFacetRefinement(
        facet,
        array[0]
      );
      const nextURLWithFacetRefinement = initOptions.createURL(
        nextStateWithFacetRefinement
      );
      // We could rather use an href on a link
      location.href = nextURLWithFacetRefinement;
    });
    element.innerHTML = `<div style='padding: 10px;'>${
      array[0]
    }<span class='facet-count'> (${array[1]})</span></div>`;
    container.append(element);
  });
}

function displayHits(
  response,
  container,
  template,
  noResultLabel,
  redirectAttribute,
  clickAnalytics,
  indexName
) {
  const hits = response.hits;

  if (clickAnalytics) {
    hits.forEach(hit => {
      hit._queryID = response.queryID;
      hit._position =
        response.hits.findIndex(hit => hit.objectID == hit.objectID) + 1; // The position cannot be 0
    });
  }

  container.innerHTML = "";
  if (hits.length > 0) {
    const regexGroup = new RegExp("(?<={{).+?(?=}})", "gm"); // Regex to match 'text' inside {{}}
    const regexGlobal = new RegExp("{{(.*?)}}", "gm"); // Regex to match '{{text}}'
    const foundAttributes = template.match(regexGlobal); // Array of all the {{text}}
    for (let i = 0; i < hits.length; i++) {
      const element = document.createElement("div");
      element.classList.add("hover-background");
      element.addEventListener("click", function(e) {
        if (clickAnalytics) {
          // To send a click event
          aa("clickedObjectIDsAfterSearch", {
            eventName: "product_clicked",
            index: indexName,
            queryID: hits[i]._queryID,
            objectIDs: [hits[i].objectID],
            positions: [hits[i]._position]
          });

          // To send a conversion event
          aa("convertedObjectIDsAfterSearch", {
            eventName: "product_clicked",
            index: indexName,
            queryID: hits[i]._queryID,
            objectIDs: [hits[i].objectID]
          });
        }

        window.location = hits[i][redirectAttribute];
      });

      let newTemplate = template;
      foundAttributes.forEach(globalAttr => {
        const attr = globalAttr.match(regexGroup)[0]; // Getting only the text inside the {{}}
        newTemplate = newTemplate.replace(globalAttr, resolve(attr, hits[i])); // Replace the template value by the real value from Algolia
      });

      element.innerHTML = newTemplate;
      container.append(element);
    }
  } else {
    container.innerHTML = `<p>${noResultLabel}</p>`;
  }
}

function resolve(path, obj = self, separator = ".") {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export default FederatedSearchWidget;
