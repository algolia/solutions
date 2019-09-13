import HitsWithContent from "./hits-with-content/hits-with-content.js";

let appID = 'XC1DYSAPBX';
let apiKey = '3720c40761477e74cb938856acebfa31';

const search = instantsearch({
  indexName: "demo_ecommerce",
  searchClient: algoliasearch(appID, apiKey),
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 12
  })
);

search.addWidget(
  new HitsWithContent({
    container: '#hits'
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "Type 'bag' and see the 5th result",
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
