import rulePoweredContentShelves from "./rule-powered-content-shelves/rule-powered-content-shelves.js";

const search = instantsearch({
  indexName: "solution_retail_dataset",
  searchClient: algoliasearch("RSBCBF0EG8", "fac0c6dc5e242a210d0047f51cec2b77"),
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 8,
    ruleContexts: ["get_shelves"],
  }),
  rulePoweredContentShelves({
    container: "#shelves",
    template: `
<div class="item">
  <div class="centered">
    <img src="{{image_link}}" alt="" />
  </div>

  <div class="centered">
    <div class="add-to-cart">
      <i class="fas fa-cart-plus"></i> Add
      <span class="hide-mobile hide-tablet">to Cart</span>
    </div>
  </div>

  <div class="item-content">
    <p class="brand">{{brand}}</p>
    <p class="name">{{item_title}}</p>
  </div>
</div>

<p class="price">Price: {{price}}</p>
`,
  }),
]);

search.start();
