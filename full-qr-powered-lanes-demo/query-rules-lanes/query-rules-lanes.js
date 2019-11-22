const state = {
  lastLanesReceived: null,
  lanesIndices: [],
};

const queryRulesLanes = instantsearch.connectors.connectQueryRules(
  ({ items, widgetParams, instantSearchInstance }) => {
    // We don't display anything if we don't receive any lanes from the
    // Query Rules.
    if (items.length === 0 || !items[0].lanes) {
      return;
    }

    const lanes = items[0].lanes;
    lanes.sort(function(a, b) {
      return a.position - b.position;
    });

    // If the lanes haven't changed after a refinement, we don't need to update
    // the DOM.
    if (state.lastLanesReceived === JSON.stringify(lanes)) {
      return;
    }

    state.lastLanesReceived = JSON.stringify(lanes);
    const container = document.querySelector(widgetParams.container);

    // We unmount all previous lanes indices to have an updated InstantSearch
    // tree.
    state.lanesIndices.forEach(contentShelvesIndex => {
      contentShelvesIndex.dispose();
    });

    const lanesIndices = lanes.map(lane => {
      const laneContainer = document.createElement("div");
      const laneTitle = document.createElement("h2");
      laneTitle.innerText = lane.label;
      const laneRow = document.createElement("div");

      laneContainer.append(laneTitle, laneRow);

      const laneIndex = instantsearch.widgets
        .index({ indexName: instantSearchInstance.indexName })
        .addWidgets([
          instantsearch.widgets.configure({
            hitsPerPage: lane.nbProducts,
            ruleContexts: [lane.ruleContext],
          }),
          instantsearch.widgets.hits({
            container: laneRow,
            templates: {
              item: widgetParams.template,
            },
          }),
        ]);

      return [laneIndex, laneContainer];
    });

    state.lanesIndices = lanesIndices.map(lanesIndex => lanesIndex[0]);
    const lanesContainers = lanesIndices.map(lanesIndex => lanesIndex[1]);

    instantSearchInstance.mainIndex.addWidgets(state.lanesIndices);
    container.append(...lanesContainers);
  }
);

export default queryRulesLanes;
