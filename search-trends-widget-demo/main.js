import SearchboxWithSearchTrends from "./searchbox-with-search-trends/searchbox-with-search-trends.js";

let appID = 'XC1DYSAPBX';
let apiKey = 'b83db9d2fa39d2ddbc26afb3f4f4be7f';
let indexName = "voice_search_demo";

const search = instantsearch({
  indexName: indexName,
  searchClient: algoliasearch(appID, apiKey),
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
                <div class="centered"><img src="{{image}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="brand">{{{_highlightResult.brand.value}}}</p>
                    <p class="name">{{{_highlightResult.name.value}}}</p>
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
    placeholder: "Search for products and brands",
  })
);

search.addWidget(
  new SearchboxWithSearchTrends({
    container: '#search-trends',
    appID: appID,
    apiKey: apiKey,
    indexName: indexName,
    trendIcon: '<i class="fas fa-fire"></i>',
    trendPeriodInDays: 2, 
    maxSearchTrends: 5,
    emptySearchTracked: true
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

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#brand",
    attribute: "brand",
    limit: 5,
    showMore: true,
    searchable: true,
    searchablePlaceholder: "Search our brands"
  })
);

search.start();
