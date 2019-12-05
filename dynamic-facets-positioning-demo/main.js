let appID = "RSBCBF0EG8";
let apiKey = "fac0c6dc5e242a210d0047f51cec2b77";
let indexName = "solution_retail_dataset";

const search = instantsearch({
  indexName: indexName,
  searchClient: algoliasearch(appID, apiKey)
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 12
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results",
      item: `
            <div class="item">
                <div class="centered"><img src="{{image_link}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="brand">{{{_highlightResult.brand.value}}}</p>
                    <p class="name">{{{_highlightResult.item_title.value}}}</p>
                </div>
            </div>
            <p class="price">Price: {{{price}}}€</p>
            <br>`
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "Type 'red dress' to see new positions on the two facets"
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats-container"
  })
);

//Widget to change position of Facets
search.addWidget({
  render(renderOptions) {
    const results = renderOptions.results;
    const userData = results.userData;
    const facetsContainer = document.querySelector("#facets-container");

    if (!userData) return null;

    const customFacetsData = userData.find(
      data => data.customFacets && Array.isArray(data.customFacets)
    );

    if (!customFacetsData) return null;

    Array.from(facetsContainer.children).forEach((node, index) => {
      node.style.order = index + 1;
    });

    customFacetsData.customFacets.forEach(facet => {
      const element = document.getElementById(facet.name);

      if (element) {
        element.style.order = facet.position - 1;
      }
    });
  }
});

const brandRefinementListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: "Brand"
  },
  hidden(options) {
    return options.results.nbHits === 0;
  }
})(instantsearch.widgets.refinementList);

search.addWidget(
  brandRefinementListWithPanel({
    container: "#brand",
    attribute: "brand",
    limit: 5,
    showMore: true,
    searchable: true,
    searchablePlaceholder: "Search our brands"
  })
);

const genderRefinementListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: "Gender"
  },
  hidden(options) {
    return options.results.nbHits === 0;
  }
})(instantsearch.widgets.refinementList);

search.addWidget(
  genderRefinementListWithPanel({
    container: "#gender",
    attribute: "gender",
    limit: 3,
    showMore: false,
    searchable: false
  })
);

search.start();
