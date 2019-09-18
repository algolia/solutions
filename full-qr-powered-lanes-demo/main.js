import QRPoweredLanesWidget from "./qr-powered-lanes-widget/qr-powered-lanes-widget.js";

let appID = "RSBCBF0EG8";
let apiKey = "fac0c6dc5e242a210d0047f51cec2b77";
let indexName = "solution_retail_dataset";

const getLanes = instantsearch({
  indexName: indexName,
  searchClient: algoliasearch(appID, apiKey)
});

getLanes.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 8,
    ruleContexts: ["get_lanes"]
  })
);

getLanes.addWidget(
  new QRPoweredLanesWidget({
    container: "#lanes",
    appID: appID,
    apiKey: apiKey,
    indexName: indexName,
    template: `
    <div class="item">
        <div class="centered"><img src="{{image_link}}" alt=""></div>
        <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
        <div class="item-content">
            <p class="brand">{{brand}}</p>
            <p class="name">{{item_title}}</p>
        </div>
    </div>
    <p class="price">Price: {{price}}</p>`
  })
);

getLanes.start();


