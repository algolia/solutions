import HitsWithContent from "./hits-with-content/hits-with-content.js";

let appID = "RSBCBF0EG8";
let apiKey = "fac0c6dc5e242a210d0047f51cec2b77";
let indexName = "solution_retail_dataset";

const search = instantsearch({
  indexName: indexName,
  searchClient: algoliasearch(appID, apiKey)
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 12
  })
);

search.addWidget(
  new HitsWithContent({
    container: "#hits",
    templates: {
      item: hit => `
        <div class="item">
          <img src="${hit.image_link}" alt="">
          <div class="item-content">
            <p class="brand">${hit.brand}</p>
            <p class="name">${hit._highlightResult.item_title.value}</p>
            <p class="price">Price: <span>${hit.price}</span></p>
            <div class="item-actions">
              <button class="view-button">View</button>
              <button class="add-to-cart">
                <i class="fas fa-cart-plus"></i> Buy
              </button>
            </div>
          </div>
        </div>
      `,
      injectedItem: hit => `
        <div class="item">
          <img src="${hit.image}" alt="">
          <a class="price" href="${hit.target}">${hit.button}</a>
        </div>
      `,
      noResults: response => `
        <div>No Results found for query <b>${response.query}</b></div>
      `
    },
    afterItemRenderer: (element, hit, response) => {
      const button = element.querySelector("button");

      if (button) {
        button.addEventListener("click", event => {
          event.stopPropagation();

          // aa("clickedObjectIDsAfterSearch", {
          //   eventName: "product_clicked",
          //   index: "atis-prods",
          //   queryID: response.queryID,
          //   objectIDs: [hit.objectID],
          //   positions: [hit.__position]
          // });
        });
      }
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "Type 'bag' and see the 5th result"
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
  instantsearch.widgets.rangeSlider({
    container: "#price",
    attribute: "price"
  })
);

search.start();
