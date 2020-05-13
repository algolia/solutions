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
                <figure class="hit-image-container"><div class="hit-image-container-box"><img class="hit-image" src="{{largeImage}}" alt=""></div></figure>
                <p class="hit-category">&#8203;​</p>
                <div class="item-content">
                    <p class="brand hit-tag">{{{_highlightResult.brand.value}}}</p>
                    <p class="name">{{{_highlightResult.name.value}}}</p>
                    <div class="hit-description">{{{price}}}<b class="hit-currency">€</b></div>
                </div>
            </div>
            <br>`
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "",
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

/***** ANIMATE 1 PLACEHOLDER *****/
// const searchBar = document.querySelector(".ais-SearchBox-input");
// const DELAY_AFTER_ANIMATION = 1000;
// const PLACEHOLDER = "This is an animated placeholder";

// const getRandomDelayBetween = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const setPlaceholder = (inputNode, placeholder) => {
//   inputNode.setAttribute("placeholder", placeholder);
// };

// const animateLetters = (
//   currentLetters,
//   remainingLetters,
//   inputNode
// ) => {
//   if (!remainingLetters.length) {
//     return 
//   }

//   currentLetters.push(remainingLetters.shift());

//   setTimeout(() => {
//     setPlaceholder(inputNode, currentLetters.join(""));
//     animateLetters(currentLetters, remainingLetters, inputNode);
//   }, getRandomDelayBetween(50, 90));
// };

// const animatePlaceholder = (inputNode, placeholder) => {
//   animateLetters([], placeholder.split(""), inputNode);
// };

// window.addEventListener("load", () => {
//   // Single placeholder option
//   animatePlaceholder(searchBar, PLACEHOLDER);
// });


/***** ANIMATE MULTIPLE PLACEHOLDERs *****/

const searchBar = document.querySelector(".ais-SearchBox-input");
const DELAY_AFTER_ANIMATION = 1000;
const PLACEHOLDERS = [
  "This is an animated placeholder", //1st animated placeholder
  "Search for green hoodie", 
  "Search for our latest items", 
  "Find your favorite movie" 
];

const getRandomDelayBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const setPlaceholder = (inputNode, placeholder) => {
  inputNode.setAttribute("placeholder", placeholder);
};

const animateLetters = (
  currentLetters,
  remainingLetters,
  inputNode,
  onAnimationEnd
) => {
  if (!remainingLetters.length) {
    return (
      typeof onAnimationEnd === "function" &&
      onAnimationEnd(currentLetters.join(""), inputNode)
    );
  }

  currentLetters.push(remainingLetters.shift());

  setTimeout(() => {
    setPlaceholder(inputNode, currentLetters.join(""));
    animateLetters(currentLetters, remainingLetters, inputNode, onAnimationEnd);
  }, getRandomDelayBetween(50, 90));
};

const animatePlaceholder = (inputNode, placeholder, onAnimationEnd) => {
  animateLetters([], placeholder.split(""), inputNode, onAnimationEnd);
};

const onAnimationEnd = (placeholder, inputNode) => {
  setTimeout(() => {
    let newPlaceholder =
      PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];

    do {
      newPlaceholder =
        PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
    } while (placeholder === newPlaceholder);

    animatePlaceholder(inputNode, newPlaceholder, onAnimationEnd);
  }, DELAY_AFTER_ANIMATION);
};

window.addEventListener("load", () => {
  // If we want multiple different placeholders, we pass our callback
  animatePlaceholder(
    searchBar,
    PLACEHOLDERS[0], 
    onAnimationEnd
  );
});
