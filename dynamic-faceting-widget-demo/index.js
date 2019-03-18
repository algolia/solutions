/* global instantsearch*/

const FACET_CONFIG = {
  //free_shipping: "non_numeric_attributes",
  //rating: "numeric_attributes",
  // price: "numeric_attributes",
  // hierarchicalCategories: "non_numeric_attributes",
  //price_range: "non_numeric_attributes",
  screen_size: "numeric_attributes",
  brand: "non_numeric_attributes",
  type: "non_numeric_attributes",
  resolution: "non_numeric_attributes",
  diagonal: "non_numeric_attributes",
  memory: "non_numeric_attributes",
  storage: "non_numeric_attributes",
  colors: "non_numeric_attributes",
  fidelity: "non_numeric_attributes",
  phoneModels: "non_numeric_attributes"
};

const nameToDisplay = {
  rating: "Rating",
  screen_size: "Screen Size (inches)",
  brand: "Brand",
  price_range: "Price Range ($)",
  type: "Type",
  resolution: "Resolution",
  diagonal: "Diagonal (inches)",
  memory: "Memory",
  storage: "Storage",
  colors: "Color",
  fidelity: "Fidelity",
  phoneModels: "Phone Model"
};

const MAX_FACET_DISPLAYED = 10;

const search = instantsearch({
  appId: "5NICTDJ5Q3",
  apiKey: "fe2708f4939640ae043e0a04008fbb10",
  indexName: "instant_search_dynamic_faceting",
  searchParameters: {
    hitsPerPage: 12,
    facets: ["dynamic_attributes"]
  },
  searchFunction: function(h) {
    const helper = this.helper;
    // After changing the query, reset active facets
    helper.setState(helper.state.setDisjunctiveFacets([""]));
    helper.searchOnce({ hitsPerPage: 0 }).then(function(params) {
      const content = params.content;
      if (content.facets) {
        const newFacetsArr = content.getFacetValues("dynamic_attributes");

        // Sort facets array by count DESC LIMIT 10 to use for refinementLists
        let facetsForRefinement = newFacetsArr
          .sort((a, b) => {
            return b.count - a.count;
          }) // (a, b) => b.count - a.count
          .slice(0, MAX_FACET_DISPLAYED)
          .map(facetObj => FACET_CONFIG[facetObj.name] + "." + facetObj.name);

        // facets = facetsForRefinement; --> Keep global variable and just make widgets for all of the items in the array?
        // Update helper state to use newly retrieved facets
        helper.setState(helper.state.setDisjunctiveFacets(facetsForRefinement));
        h.setState(helper.state.setDisjunctiveFacets(facetsForRefinement));
      }
      h.search();
    });
  }
});

const refinementListContainer = document.body.querySelector(
  "#refinement-lists"
);

const dynamicFacetsWidget = {
  getConfiguration: function() {},
  init: function(options) {
    // This method executes once, when the dynamicFacetsWidget is initialized
    const refineElement = function(el) {
      el.setAttribute("data-refined", "refined");
      el.checked = true;
    };
    const unrefineElement = function(el) {
      el.setAttribute("data-refined", "unrefined");
      el.checked = false;
    };

    const _facetClickHandler = function(e) {
      let element = e.target;

      // Only continue if the target of the click is a valid selection
      if (e.target.className !== "ais-refinement-list--checkbox") {
        return false;
      }

      let type = element.getAttribute("data-facet-type"),
        name = element.getAttribute("data-facet-name"),
        value = element.getAttribute("data-facet-value"),
        facetAttributeName = type + "." + name;

      if (type === "non_numeric_attributes") {
        options.helper.toggleRefinement(facetAttributeName, value).search();
        element.getAttribute("data-refined") === "refined"
          ? unrefineElement(element)
          : refineElement(element);
      }

      if (type === "numeric_attributes") {
        if (element.getAttribute("data-refined") === "refined") {
          // Already refined:
          // (1) Determine type of numeric refinement and removeNumericRefinement
          if (element.textContent.indexOf("-") === -1) {
            // Simple greater-than integer refinement
            options.helper
              .removeNumericRefinement(
                facetAttributeName,
                ">=",
                parseInt(value, 10)
              )
              .search();
          } else {
            // Mock range-based refinement (actually filters on string)
            options.helper.toggleRefinement(facetAttributeName, value).search();
          }
          // (2) setAttribute to unrefined...this can be used for CSS too
          element.setAttribute("data-refined", "unrefined");
          element.checked = false;
        } else {
          // Not yet refined:
          // (1) Determine type of numeric refinement and addNumericRefinement
          if (element.textContent.indexOf("-") === -1) {
            // Simple greater-than integer refinement
            options.helper
              .addNumericRefinement(
                facetAttributeName,
                ">=",
                parseInt(value, 10)
              )
              .search();
          } else {
            // Mock range-based refinement (actually filters on string)
            options.helper.toggleRefinement(facetAttributeName, value).search();
          }
          // (2) setAttribute to refined...this can be used for CSS too
          element.setAttribute("data-refined", "refined");
          element.checked = true;
        }
      }
    };

    refinementListContainer.addEventListener("click", _facetClickHandler);
  },
  render: function(options) {
    const content = options.results;
    let facetValues = content.disjunctiveFacets.map(facet => {
      return {
        name: facet.name,
        values: content.getFacetValues(facet.name)
      };
    });
    // Sort facet values by count
    let sortedFacetValues = facetValues.sort(
      (a, b) =>
        b.values.reduce((p, c) => p + c.count, 0) -
        a.values.reduce((p, c) => p + c.count, 0)
    );

    // Create array of current refinements as strings
    let currentRefinements = content.getRefinements().map(refinementObj => {
      return refinementObj.attributeName + "." + refinementObj.name;
    });

    refinementListContainer.innerHTML = "";

    sortedFacetValues.map((facet, index, array) => {
      let facetParent = facet.name.split(".")[0],
        facetName = facet.name.split(".")[1];

      let newRefinementList = document.createElement("div"),
        header = document.createElement("div"),
        refinementListBody = document.createElement("div"),
        refinementListList = document.createElement("div");

      header.className = "ais-refinement-list--header ais-header";

      newRefinementList.className = "ais-root ais-refinement-list";
      refinementListBody.className = "ais-body ais-refinement-list--body";
      refinementListList.className = "ais-refinement-list--list";

      header.textContent = nameToDisplay[facetName];

      newRefinementList.appendChild(header);
      refinementListBody.appendChild(refinementListList);
      newRefinementList.appendChild(refinementListBody);
      refinementListContainer.appendChild(newRefinementList);

      facet.values.map((value, index) => {
        if (index < 7) {
          let listItemContainer = document.createElement("div"),
            listItem = document.createElement("div"),
            listItemLabel = document.createElement("label"),
            listInput = document.createElement("input"),
            listSpan = document.createElement("span");

          listItemContainer.className = "ais-refinement-list--item";
          listItemLabel.className = "ais-refinement-list--label";
          listInput.className = "ais-refinement-list--checkbox";
          listSpan.className = "ais-refinement-list--count";

          listItemLabel.textContent = value.name;
          listSpan.innerHTML = value.count;

          listInput.setAttribute("type", "checkbox");
          listInput.setAttribute("data-facet-type", facetParent);
          listInput.setAttribute("data-facet-name", facetName);
          listInput.setAttribute("data-facet-value", value.name);
          listInput.setAttribute("data-facet-count", value.count);

          listItemLabel.append(listInput);
          listItemLabel.append(listSpan);
          listItem.append(listItemLabel);
          listItemContainer.append(listItem);

          if (
            currentRefinements.indexOf(
              facetParent + "." + facetName + "." + value.name
            ) !== -1
          ) {
            // Set data-attribute to indicate that this value is currently refined upon
            listInput.setAttribute("data-refined", "refined");
            listInput.checked = true;
          }

          refinementListBody.appendChild(listItemContainer);
        }
      });
    });
  }
};

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

search.addWidget(dynamicFacetsWidget);

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
