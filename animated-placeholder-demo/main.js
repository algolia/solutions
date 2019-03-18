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

let searchBar = document.getElementsByClassName("ais-SearchBox-input")[0]; //Getting the searchbar input
let counter = 0;

function getRandomDelayBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Printing the placeholder text in a 'typing' effect
function printLetter(string, input) {
  let placeholderCharsArray = string.split(""); //Splitting the string into character seperated array
  let originalString = string; //Storing the full placeholder
  let currentPlaceholder = input.getAttribute("placeholder"); //Getting the current placeholder value
  let newPlaceholder = currentPlaceholder + placeholderCharsArray[counter]; //Appending the next letter to current placeholder

  setTimeout(function() {
    input.setAttribute("placeholder", newPlaceholder); //Modifying the placeholder text
    counter++;
    //Looping until the placeholder is fully printed
    if (counter < placeholderCharsArray.length) {
      printLetter(originalString, input);
    }
  }, getRandomDelayBetween(50, 90)); //Using a random speed to simulate 'human' typing
}

//Func to init the animation
function animatePlaceholder() {
  searchBar.setAttribute("placeholder", ""); //Removing the initial placeholder
  printLetter(placeholder, searchBar); //Starting the animation
}

animatePlaceholder();
