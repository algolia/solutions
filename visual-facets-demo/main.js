let appID = "XC1DYSAPBX";
let apiKey = "3720c40761477e74cb938856acebfa31";

const search = instantsearch({
  indexName: "colored_products",
  searchClient: algoliasearch(appID, apiKey)
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 10
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results",
      item: `
            <div class="item">
                <figure class="hit-image-container"><div class="hit-image-container-box"><img class="hit-image" src="{{image}}" alt=""></div></figure>
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
    placeholder: "Search for...",
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
    container: "#colors",
    attribute: "color",
    transformItems(items) {
      return items.map(item => ({
        ...item,
        hexaCode: getHexaCodeFromColor(item.label)
      }));
    },
    templates: {
      item: `
        <input type="checkbox" id="{{label}}" {{#isRefined}}checked{{/isRefined}}/>
        <label for="{{label}}" class="{{#isRefined}}isRefined{{/isRefined}}">
          {{label}}
          <span class="color" style="background-color: {{hexaCode}}"></span>
        </label>
      `
    }
  })
);

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: "#locations",
//     attribute: "availableIn",
//     transformItems(items) {
//       return items.map(item => ({
//         ...item,
//         image: getLocationImage(item.label)
//       }));
//     },
//     templates: {
//       item: `<span class="location-pair" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
//               <img class="location-image" src="assets/images/locations/{{image}}">
//               <span class="facet-value">{{label}} ({{count}})</span>
//             <span>`
//     }
//   })
// );

search.start();

const getHexaCodeFromColor = color => {
  return color ? color : "transparent";
};

const getLocationImage = location => {
  return location ? `${location.toLowerCase()}.jpeg` : "";
};
