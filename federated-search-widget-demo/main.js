import FederatedSearchWidget from "./federated-search-widget/federated-search-widget.js";

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
  new FederatedSearchWidget({
    container: "#search-box",
    appID: appID,
    apiKey: apiKey,
    clickAnalytics: true, //Optional. Default: false
    columns: [
      {
        indexName: "atis-prods_query_suggestions",
        isQuerySuggestionsBased: true,
        sourceIndexForQS:"atis-prods", //Optional: need to be used if the user wants to display 'in facet'
        displayLimit: 10,
        title: "Matching Keywords",
        displayOnMobile: true,
        noResultLabel: 'No Matching Queries',
        redirectTo: "https://www.noon.com/uae-en/search?q=",
      },
      {
        indexName: "atis-prods",
        displayLimit: 3,
        title: "Matching Products",
        displayOnMobile: true,
        itemTemplate: `<div class='hit'>
          <img src="{{largeImage}}" alt="">
          <div>
            <p>{{_highlightResult.title.value}}</p>
            <p class="text-right">{{price}}€</p>
          </div>
        </div>`,
        noResultLabel: 'No Matching Products',
        redirectAttribute: "url"
      },
      {
        indexName: "atis-prods",
        isFacetBased: true,
        displayLimit: 5,
        title: ["Matching Brands", "Matching Categories"],
        displayOnMobile: true,
        noResultLabel: 'No result',
        facetsBasedOn: ["brand", "categories"],
        type: "facet",
      }
    ],
    placeholder: "Search for products and brands"
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
