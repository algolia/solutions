

const state = {
  lastCarouselsReceived: null,
  carouselIndices: [],
};

const contentCarousel = instantsearch.connectors.connectQueryRules(
  ({ items, widgetParams, instantSearchInstance }) => {
    // We don't display anything if we don't receive any carousels from the
    // Query Rules.
    if (items.length === 0 || !items[0].carousels) {
      return;
    }

    const carousels = items[0].carousels;
    carousels.sort(function(a, b) {
      return a.position - b.position;
    });

    // If the carousels haven't changed after a refinement, we don't need to update
    // the DOM.
    if (state.lastCarouselsReceived === JSON.stringify(carousels)) {
      return;
    }

    state.lastCarouselsReceived = JSON.stringify(carousels);
    const container = document.querySelector(widgetParams.container);

    // We unmount all previous carousels indices to have an updated InstantSearch
    // tree.
    instantSearchInstance.mainIndex.removeWidgets(state.carouselIndices);

    const carouselIndices = carousels.map(carousel => {
      console.log(carousel)
      const carouselContainer = document.createElement("div");
      const carouselTitle = document.createElement("h2");
      carouselTitle.innerText = carousel.label;
      const carouselRow = document.createElement("div");

      carouselContainer.append(carouselTitle, carouselRow);

      const carouselIndex = instantsearch.widgets
        .index({ indexName: instantSearchInstance.indexName })
        .addWidgets([
          instantsearch.widgets.configure({
            hitsPerPage: carousel.nbProducts,
            ruleContexts: [carousel.ruleContext],
          }),
          instantsearch.widgets.hits({
            container: carouselRow,
            templates: {
              item: widgetParams.template,
            },
          }),
        ]);
        
      return [carouselIndex, carouselContainer];
    });


   

    state.carouselIndices = carouselIndices.map(
      carouselsIndex => carouselsIndex[0]
    );
    const carouselContainers = carouselIndices.map(
      carouselsIndex => carouselsIndex[1]
    );

    instantSearchInstance.mainIndex.addWidgets(state.carouselIndices);
    container.append(...carouselContainers);
  }
);

export default contentCarousel;
