let appID = "RSBCBF0EG8";
let apiKey = "fac0c6dc5e242a210d0047f51cec2b77";

const qrLane1 = instantsearch({
  indexName: "solution_retail_dataset",
  searchClient: algoliasearch(appID, apiKey)
});

qrLane1.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 8,
    ruleContexts: ["lane_christmas_selection"]
  })
);

qrLane1.addWidget(
  instantsearch.widgets.hits({
    container: "#lane_1",
    templates: {
      empty: "No results",
      item: `
            <div class="item">
                <div class="centered"><img src="{{image_link}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="brand">{{brand}}</p>
                    <p class="name">{{item_title}}</p>
                </div>
            </div>
            <p class="price">Price: {{{price}}}€</p>
            <br>`
    }
  })
);

// --------------------

const qrLane2 = instantsearch({
  indexName: "solution_retail_dataset",
  searchClient: algoliasearch(appID, apiKey)
});

qrLane2.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 8,
    ruleContexts: ["lane_picks_month"]
  })
);

qrLane2.addWidget(
  instantsearch.widgets.hits({
    container: "#lane_2",
    templates: {
      empty: "No results",
      item: `
            <div class="item">
                <div class="centered"><img src="{{image_link}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="brand">{{brand}}</p>
                    <p class="name">{{item_title}}</p>
                </div>
            </div>
            <p class="price">Price: {{{price}}}€</p>
            <br>`
    }
  })
);

// --------------------

const qrLane3 = instantsearch({
  indexName: "solution_retail_dataset",
  searchClient: algoliasearch(appID, apiKey)
});

qrLane3.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 8,
    ruleContexts: ["lane_st_patrick"]
  })
);

qrLane3.addWidget(
  instantsearch.widgets.hits({
    container: "#lane_3",
    templates: {
      empty: "No results",
      item: `
            <div class="item">
                <div class="centered"><img src="{{image_link}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="brand">{{brand}}</p>
                    <p class="name">{{item_title}}</p>
                </div>
            </div>
            <p class="price">Price: {{{price}}}€</p>
            <br>`
    }
  })
);

qrLane1.start();
qrLane2.start();
qrLane3.start();