/* global instantsearch*/

const search = instantsearch({
  appId: "5NICTDJ5Q3",
  apiKey: "fe2708f4939640ae043e0a04008fbb10",
  indexName: "instant_search_dynamic_faceting",
  searchParameters: {
    hitsPerPage: 12,
    facets: ["dynamic_attributes"]
  }
});
search.addWidget(
  instantsearch.widgets.hits({
    container: document.querySelector("#products"),
    templates: {
      item: `    <div class="hit">
      <div class="hit-image">
        <img src="{{image}}" alt="{{name}}">
      </div>
      <div class="hit-content">
        <h2 class="hit-name">{{{_highlightResult.name.value}}}</h2>
        <p class="hit-category-breadcrumb">{{{categories}}}</p>
        <p class="hit-description">{{{_highlightResult.description.value}}}</p>
      </div>
    </div>`
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: document.querySelector("#searchBox"),
    placeholder: "Search for products",
    autofocus: false /* Only to avoid live preview taking focus */
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats"
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#brands",
    attributeName: "non_numeric_attributes.brand",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Brands"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#type",
    attributeName: "non_numeric_attributes.type",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Type"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#color",
    attributeName: "non_numeric_attributes.colors",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Color"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#resolution",
    attributeName: "non_numeric_attributes.resolution",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Resolution"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#screen-size",
    attributeName: "numeric_attributes.screen_size",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Screen Size (inches)"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#diagonal",
    attributeName: "non_numeric_attributes.diagonal",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Diagonal (inches)"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#memory",
    attributeName: "non_numeric_attributes.memory",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Memory"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#storage",
    attributeName: "non_numeric_attributes.storage",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Storage"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#phone-model",
    attributeName: "non_numeric_attributes.phoneModels",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Phone Model"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#fidelity",
    attributeName: "non_numeric_attributes.fidelity",
    operator: "or",
    limit: 5,
    showMore: true,
    templates: {
      header: "Fidelity"
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinedValues({
    container: "#current-refined-values",
    clearAll: "after",
    clearsQuery: true,
    attributes: [
      { name: "non_numeric_attributes.colors", label: "Colors" },
      { name: "non_numeric_attributes.brand", label: "Brand" },
      { name: "non_numeric_attributes,type", label: "Type" },
      { name: "numeric_attributes.screen_size", label: "Screen Size" },
      { name: "non_numeric_attributes.resolution", label: "Resolution" },
      { name: "non_numeric_attributes.diagonal", label: "Diagonal" },
      { name: "non_numeric_attributes.memory", label: "Memory" },
      { name: "non_numeric_attributes.storage", label: "Storage" },
      { name: "non_numeric_attributes.colors", label: "Color" },
      { name: "non_numeric_attributes.fidelity", label: "Fideltiy" },
      { name: "non_numeric_attributes.phoneModels", label: "Phone Model" }
    ],
    onlyListedAttributes: true
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: document.querySelector("#pagination")
  })
);

search.start();
