let appID = "932LAAGOT3";
let apiKey = "6a187532e8e703464da52c20555c37cf";
let placeholder = "This is an animated placeholder";

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
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: placeholder,
    showReset: true,
    showSubmit: true,
    showLoadingIndicator: true
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

/***** ANIMATED PLACEHOLDER *****/
const searchBar = document.querySelector(".ais-SearchBox-input");

const getRandomDelayBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const setPlaceholder = (inputNode, newPlaceholder) =>
  inputNode.setAttribute("placeholder", newPlaceholder);

const printLetter = (currentLetters, remainingLetters, inputNode) => {
  if (!remainingLetters.length) {
    return;
  }

  currentLetters.push(remainingLetters.shift());

  setTimeout(() => {
    setPlaceholder(inputNode, currentLetters.join(""));
    printLetter(currentLetters, remainingLetters, inputNode);
  }, getRandomDelayBetween(50, 90));
};

const animatePlaceholder = (inputNode, placeholder) => {
  setPlaceholder(inputNode, "");
  printLetter([], placeholder.split(""), inputNode);
};

window.addEventListener("load", () => {
  animatePlaceholder(searchBar, "Whatever");
});
