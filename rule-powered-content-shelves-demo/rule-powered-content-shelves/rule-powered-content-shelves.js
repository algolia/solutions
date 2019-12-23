const state = {
  lastShelvesReceived: null,
  shelfIndices: [],
};

const rulePoweredContentShelves = instantsearch.connectors.connectQueryRules(
  ({ items, widgetParams, instantSearchInstance }) => {
    // We don't display anything if we don't receive any shelves from the
    // Query Rules.
    if (items.length === 0 || !items[0].shelves) {
      return;
    }

    const shelves = items[0].shelves;
    shelves.sort(function(a, b) {
      return a.position - b.position;
    });

    // If the shelves haven't changed after a refinement, we don't need to update
    // the DOM.
    if (state.lastShelvesReceived === JSON.stringify(shelves)) {
      return;
    }

    state.lastShelvesReceived = JSON.stringify(shelves);
    const container = document.querySelector(widgetParams.container);

    // We unmount all previous shelves indices to have an updated InstantSearch
    // tree.
    instantSearchInstance.mainIndex.removeWidgets(state.shelfIndices);

    const shelfIndices = shelves.map(shelf => {
      const shelfContainer = document.createElement("div");
      const shelfTitle = document.createElement("h2");
      shelfTitle.innerText = shelf.label;
      const shelfRow = document.createElement("div");

      shelfContainer.append(shelfTitle, shelfRow);

      const shelfIndex = instantsearch.widgets
        .index({ indexName: instantSearchInstance.indexName })
        .addWidgets([
          instantsearch.widgets.configure({
            hitsPerPage: shelf.nbProducts,
            ruleContexts: [shelf.ruleContext],
          }),
          instantsearch.widgets.hits({
            container: shelfRow,
            templates: {
              item: widgetParams.template,
            },
          }),
        ]);

      return [shelfIndex, shelfContainer];
    });

    state.shelfIndices = shelfIndices.map(shelvesIndex => shelvesIndex[0]);
    const shelfContainers = shelfIndices.map(shelvesIndex => shelvesIndex[1]);

    instantSearchInstance.mainIndex.addWidgets(state.shelfIndices);
    container.append(...shelfContainers);
  }
);

export default rulePoweredContentShelves;
