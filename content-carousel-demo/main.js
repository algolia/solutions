import contentCarousel from "./content-carousel/content-carousel.js";

const search = instantsearch({
  indexName: "solution_retail_dataset",
  searchClient: algoliasearch("RSBCBF0EG8", "fac0c6dc5e242a210d0047f51cec2b77"),
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 8,
    ruleContexts: ["get_carousels"],
  }),
  contentCarousel({
    container: "#carousel",
    template: `
    <div class="item">
      <figure class="hit-image-container"><div class="hit-image-container-box"><img class="hit-image" src="{{image_link}}" alt=""></div></figure>
      <p class="hit-category">&#8203;​</p>
      <div class="item-content">
          <p class="brand hit-tag">{{{_highlightResult.brand.value}}}</p>
          <p class="name">{{{_highlightResult.name.value}}}</p>
          <div class="hit-description">{{{price}}}</div>
      </div>
    </div>
`,
  }),
]);

search.start();
