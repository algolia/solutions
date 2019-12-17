import FederatedSearchWidget from "./federated-search-widget/federated-search-widget.js";

const appID = "932LAAGOT3";
const apiKey = "6a187532e8e703464da52c20555c37cf";

const renderQuerySuggestionWithCategory = (suggestion, sourceIndex) => {
  if (!suggestion[sourceIndex]) {
    return suggestion._highlightResult.query.value;
  }

  const bestMatchedFacet = Object.values(
    suggestion[sourceIndex].facets.exact_matches
  )
    .reduce((acc, arr) => acc.concat(arr), [])
    .sort((a, b) => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    });

  return `
        <div style="padding: 10px;">
          <span class="inverted-highlight">
            ${suggestion._highlightResult.query.value}
          </span>
          <span class="in-facet">
            <i>
              in ${bestMatchedFacet[0].value}
            </i>
          </span>
        </div>
      `;
};

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
    placeholder: "Search for products and brands",
    closeOnBlur: true,
    openOnFocus: true,
    columns: [
      {
        type: "QuerySuggestions",
        indexName: "atis-prods_query_suggestions",
        clickAnalytics: true,
        title: "Matching Keywords",
        noResultsRenderer: (query, response) =>
          `No Matching Suggestion for ${query}`,
        itemRenderer: hit =>
          renderQuerySuggestionWithCategory(hit, "atis-prods"),
        // itemRenderer: suggestion => `
        //   <a href="http://localhost:3000/?q=${suggestion.query}" target="_blank">
        //     ${suggestion._highlightResult.query.value}
        //   </a>
        // `
        afterItemRenderer: (element, hit, response, options) => {
          element.addEventListener("click", event => {
            event.preventDefault();

            document.querySelector("#search-box-input").value = hit.query;
            options.helper.setQuery(hit.query).search();

            document.querySelector("#search-results-container").style.display =
              "none";
          });
        }
      },
      {
        type: "Search",
        indexName: "atis-prods",
        title: "Matching Products",
        clickAnalytics: true,
        itemRenderer: hit => `
          <div class='hit'>
            <img src="${hit.largeImage}" alt="">
            <div>
              <p>${hit._highlightResult.title.value}</p>
              <p class="text-right">${hit.price}€</p>
              <div>
                <button class="click-button">Click Button</button>
                <button class="buy-button">Buy</button>
              </div>
            </div>
          </div>`,
        noResultsRenderer: (query, response) =>
          `No Matching Products for query ${query}`,
        afterItemRenderer: (element, hit, response, options) => {
          element.addEventListener("click", event => {
            event.stopPropagation();
            aa("clickedObjectIDsAfterSearch", {
              eventName: "product_clicked",
              index: "atis-prods",
              queryID: response.queryID,
              objectIDs: [hit.objectID],
              positions: [hit.__position]
            });
          });
          // Example of sending a click event
          element
            .querySelector(".click-button")
            .addEventListener("click", event => {
              event.stopPropagation();
              aa("clickedObjectIDsAfterSearch", {
                eventName: "product_clicked",
                index: "atis-prods",
                queryID: response.queryID,
                objectIDs: [hit.objectID],
                positions: [hit.__position]
              });
            });
          // Example of sending a conversion event
          element
            .querySelector(".buy-button")
            .addEventListener("click", event => {
              event.stopPropagation();
              aa("convertedObjectIDsAfterSearch", {
                eventName: "product_clicked",
                index: "atis-prods",
                queryID: response.queryID,
                objectIDs: [hit.objectID]
              });
            });
        }
      },
      {
        type: "Facets",
        indexName: "atis-prods",
        noResultLabel: "No result",
        facets: ["categories", "brand"],
        clickAnalytics: true,
        facetTitleRenderer: facet =>
          `<h3 class="column-title">${
            facet === "categories" ? "Matched Categories" : "Matched Brand"
          }</h3>`,
        itemRenderer: (facet, facetCategory) => `
          ${facet.name} ${facet.count}
        `,
        noResultsRenderer: (query, response) =>
          `No Matching Facet for query ${query}`,
        afterItemRenderer: (element, hit, response, options) => {
          // Add the facet refinement
          element.addEventListener("click", event => {
            event.preventDefault();
            const nextState = options.helper.state.addDisjunctiveFacetRefinement(
              hit.category,
              hit.name
            );
            window.location.href = options.createURL(nextState);
          });
        }
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
