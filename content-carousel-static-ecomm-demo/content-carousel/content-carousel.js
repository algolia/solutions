const state = {
  lastCarouselsReceived: null,
  carouselIndices: [],
};

const contentCarousel = instantsearch.connectors.connectQueryRules(
  ({ items, widgetParams, instantSearchInstance }) => {
    console.log(widgetParams)
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
            enablePersonalization: carousel.enablePersonalization,
            userToken: carousel.userToken
          }),
          instantsearch.widgets.hits({
            container: carouselRow,
            templates: {
              item: widgetParams.template,
            },
          }),
        ]);

       
      // const  configureRelated = (ID) => {
      //   const referenceHit = {
      //     objectID: "8532557",
      //     brand: 'Apple',
      //     image: '"https://cdn-demo.algolia.com/bestbuy-0118/8532557_sb.jpg"',
      //     name: '"Apple - MacBook Pro with Retina display - 13.3" Display - 8GB Memory - 128GB Flash Storage - Silver"',
      //     description: "With fifth-generation Intel Core processors, the latest graphics, and faster flash storage, the incredibly advanced MacBook Pro with Retina display moves even further ahead in performance and battery life.* *Compared with the previous generation.",
      //     categories: [ "Name Brands", "Apple", "Mac" ],
      //     popularity: 21442,
      //     free_shipping: true,
      //     hierarchicalCategories: {
      //       lvl0: "Name Brands",
      //       lvl1: "Name Brands > Apple",
      //       lvl2: "Name Brands > Apple > Mac",
      //       },
      //       onSale: false,
      //       price: 1299.99,
      //       price_range: "500 - 2000",
      //       seller: "RandomSeller#7",
      //       type: "Apple",
      //       url: "https://api.bestbuy.com/click/-/8532557/pdp",
      //       rating: 4,
      //       ratingsNumber: 397,
      //       newPrice: 1299.99
      //   };
      //     EXPERIMENTAL_configureRelatedItems({
      //       hit: referenceHit,
      //       ruleContexts: ["carousel_related"],
      //       matchingPatterns: {
      //         brand: { score: 3 },
      //         categories: { score: 2 },
      //       },
      //     })
      //   }

        // if (carousel.relatedItem) {
        //   carouselIndex.addWidgets[(configureRelated(carousel.relatedItem))]
        //   return [carouselIndex, carouselContainer]
        // } else {
         
        // }
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
