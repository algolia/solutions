import SuggestedQueriesNoResultsWidget from "./suggested-queries-no-results/suggested-queries-no-results.js";

let appID = '932LAAGOT3';
let apiKey = '6a187532e8e703464da52c20555c37cf';

const search = instantsearch({
  indexName: "atis-prods",
  searchClient: algoliasearch(appID, apiKey),
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 4
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: `No results for "{{query}}"`,
      item: `
            <div class="item">
                <div class="centered"><img src="{{largeImage}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="brand">{{{_highlightResult.brand.value}}}</p>
                    <p class="name">{{{_highlightResult.title.value}}}</p>
                </div>
            </div>
            <p class="price">Price: {{{price}}}€</p>
            <br>`
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Try iphone 9s"
  })
);

search.addWidget(
  new SuggestedQueriesNoResultsWidget({
    container: '#suggested-queries-no-results', //Mandatory
    suggestionsIndex: 'atis-prods_query_suggestions', //Mandatory
    appID: appID, //Mandatory
    apiKey: apiKey, //Mandatory
    maxSuggestions: 4, //Mandatory
    suggestionsLabel: "Why not try:",
    displayRelatedItems: true, //Optional - Default value: false
    mainIndex: 'atis-prods', //Optional - mandatory if displayRelatedItems: true
    itemTemplate: `
    <div class="item">
        <div class="centered"><img src="{{largeImage}}" alt=""></div>
        <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
        <div class="item-content">
            <p class="brand">{{brand}}</p>
            <p class="name">{{title}}</p>
        </div>
    </div>
    <p class="price">Price: {{price}}€</p>`, //Optional - mandatory if displayRelatedItems: true
    maxRelatedItems: 4, //Optional - mandatory if displayRelatedItems: true
    relatedItemsLabel: "You might be interested in:"  //Optional - mandatory if displayRelatedItems: true
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
