import RecentSearchesWidget from "./recent-searches/recent-searches.js";

let appID = "932LAAGOT3";
let apiKey = "6a187532e8e703464da52c20555c37cf";

const search = instantsearch({
  indexName: "atis-prods",
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
      item: hit => `
        <div class="item">
            <div class="centered"><img src="${hit.largeImage}" alt=""></div>
            <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
            <div class="item-content">
                <p class="brand">${hit._highlightResult.brand &&
                  hit._highlightResult.brand.value}</p>
                <p class="name">${hit._highlightResult.title.value}</p>
            </div>
        </div>
        <p class="price">\$${hit.price}</p>`
    }
  })
);

search.addWidget(
  new RecentSearchesWidget({
    container: "#recent-searches",
    appID: appID,
    apiKey: apiKey,
    querySuggestionsIndex: "atis-prods_query_suggestions",
    placeholder: "Search with query suggestions",
    maxSavedSearchesPerQuery: 5,
    noResultsRenderer: (query, response) =>
      `<li class="no-results">No Matching Suggestion for <b>${query}</b></li>`
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

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#categories",
    attribute: "categories"
  })
);

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: "#price",
    attribute: "price"
  })
);

search.start();
