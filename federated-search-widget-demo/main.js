import FederatedSearchWidget from "./federated-search-widget/federated-search-widget.js";

const appID = "932LAAGOT3";
const apiKey = "6a187532e8e703464da52c20555c37cf";

const virutalRefinementList = instantsearch.connectors.connectRefinementList(
  () => {}
);

const search = instantsearch({
  indexName: "atis-prods",
  searchClient: algoliasearch(appID, apiKey),
  routing: true // This option is mandatory to allow the createURL function to generate an URL.
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 12
  })
);

search.addWidget(
  // Useful for debug purpose
  instantsearch.widgets.currentRefinements({
    container: "#current-refinements"
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
    appID,
    apiKey,
    clickAnalytics: true, // Optional. Default: false
    placeholder: "Search for products and brands",
    columns: [
      {
        type: "QuerySuggestions",
        indexName: "atis-prods_query_suggestions",
        sourceIndexForQS: "atis-prods", // Optional: need to be used if the user wants to display 'in facet'
        limit: 10,
        title: "Matching Keywords",
        noResultLabel: "No Matching Queries",
        redirectTo: "https://www.mywebsite.com/search?q="
      },
      {
        type: "Search",
        indexName: "atis-prods",
        limit: 3,
        title: "Matching Products",
        itemTemplate: `<div class='hit'>
          <img src="{{largeImage}}" alt="">
          <div>
            <p>{{_highlightResult.title.value}}</p>
            <p class="text-right">{{price}}€</p>
          </div>
        </div>`,
        noResultLabel: "No Matching Products",
        redirectAttribute: "url"
      },
      {
        type: "Facets",
        indexName: "atis-prods",
        limit: 5,
        title: ["Matching Brands", "Matching Categories"],
        noResultLabel: "No result",
        facets: ["brand", "categories"]
      }
    ]
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
  // This widget is required otherwise we can't add the refinement to
  // generate the URL with the refinement applied. The widget is headless
  // it does not render anything. Note that for brand we don't have it because
  // we already have a refinementList mounted on the page.
  virutalRefinementList({
    attribute: "categories" // Need to be all the facets that are currently not visible on the website
  })
);

search.start();
