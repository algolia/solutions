/* global instantsearch, algoliasearch, autocompleteWidget */

const appId = "5NICTDJ5Q3";
const apiKey = "fe2708f4939640ae043e0a04008fbb10";
const indexName = "instant_search";
const client = algoliasearch(appId, apiKey);
const suggestionsIndex = client.initIndex("prefix_query_suggestions");

const appIdHistory = "1TPQKXXIG1";
const apiKeyHistory = "7693a87151f58f4f35f831041348af2d";
const clientHistory = algoliasearch(appIdHistory, apiKeyHistory);
const historyIndex = clientHistory.initIndex("history");
const userId = "user-42";

const search = instantsearch({
  appId,
  apiKey,
  indexName,
  searchParameters: {
    hitsPerPage: 8,
    attributesToSnippet: ["description:24"],
    snippetEllipsisText: " [...]"
  }
});

function hitTemplate(hit) {
  return `
    <div class="hit">
      <div class="hit-image">
        <img src="${hit.image}" />
      </div>
      <div class="hit-content">
        <div>
          <div class="hit-name">${hit._highlightResult.name.value}</div>
          <div class="hit-description ">${
            hit._snippetResult.description.value
          }</div>
        </div>
        <div class="hit-price">$${hit.price}</div>
      </div>
    </div>
  `;
}

search.addWidget(
  instantsearch.widgets.hits({
    container: document.querySelector("#products"),
    templates: {
      item: function(hit) {
        return hitTemplate(hit);
      }
    }
  })
);

search.addWidget(
  window.autocompleteWidget({
    container: "#searchBox",
    placeholder: "Search for products by name, type, brand, ...",
    //delayTime,
    //nbSuggestions,
    historyTemplate: (savedQuery, answer) =>
      '<div class="history"><i class="far fa-clock"></i>&nbsp;' +
      savedQuery._highlightResult.query.value +
      "</div>",
    historyIndex,
    suggestionTemplate: (suggestion, answer) =>
      '<div class="suggestion">' +
      suggestion._highlightResult.query.value +
      "</div>",
    suggestionsIndex,
    userId
  })
);

/*
search.addWidget(
  instantsearch.widgets.refinementList({
    container: document.querySelector("#brand"),
    attributeName: "brand"
  })
);
*/

search.addWidget(
  instantsearch.widgets.pagination({
    container: document.querySelector("#pagination")
  })
);

search.start();
