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
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results",
      item: `
            <div class="item">
                <div class="centered"><img src="{{image_link}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="brand">{{{_highlightResult.brand.value}}}</p>
                    <p class="name">{{{_highlightResult.item_title.value}}}</p>
                </div>
            </div>
            <p class="price">Price: {{{price}}}</p>
            <br>`
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "Type 'blue dress' to see specific sorting on the two facets"
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

const brandRefinementListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: "Brand"
  },
  hidden(options) {
    return options.results.nbHits === 0;
  }
})(instantsearch.widgets.refinementList);

search.addWidget(
  brandRefinementListWithPanel({
    container: "#brand",
    attribute: "brand",
    limit: 5,
    showMore: true,
    searchable: true,
    searchablePlaceholder: "Search our brands",
    sortBy(a, b) {
      const userData = search.helper.lastResults.userData;
      const attributeToSort = "brand";

      const customFacetSortData =
        userData &&
        userData.find(data => {
          return (
            data.facets &&
            data.facets[attributeToSort] &&
            data.facets[attributeToSort].sortBy
          );
        });

      if (!customFacetSortData) return 1;

      const facetSort = customFacetSortData.facets[attributeToSort].sortBy;
      const sort = Array.isArray(facetSort) ? "position" : facetSort;

      const [sortBy, direction = "ascending"] = sort.split(":");

      if (typeof SORTS[sortBy] !== "function") {
        console.log(
          `Sorting function not found for ${sortBy} - ${attributeToSort}`
        );
        return 1;
      }

      if (sort === "position") {
        return SORTS[sortBy](a, b, facetSort);
      }
      return SORTS[sortBy](a, b, direction);
    }
  })
);

const genderRefinementListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: "Gender"
  },
  hidden(options) {
    return options.results.nbHits === 0;
  }
})(instantsearch.widgets.refinementList);

search.addWidget(
  genderRefinementListWithPanel({
    container: "#gender",
    attribute: "gender",
    limit: 3,
    showMore: false,
    searchable: false,
    sortBy: (a, b) => {
      const userData = search.helper.lastResults.userData;
      const attributeToSort = "gender";

      const customFacetSortData =
        userData &&
        userData.find(data => {
          return (
            data.facets &&
            data.facets[attributeToSort] &&
            data.facets[attributeToSort].sortBy
          );
        });

      if (!customFacetSortData) return 1;

      const facetSort = customFacetSortData.facets[attributeToSort].sortBy;
      const sort = Array.isArray(facetSort) ? "position" : facetSort;

      const [sortBy, direction = "ascending"] = sort.split(":");

      if (typeof SORTS[sortBy] !== "function") {
        // Sorting function not found for ${sortBy} - ${attributeToSort}`
        return 1;
      }

      if (sort === "position") {
        return SORTS[sortBy](a, b, facetSort);
      }
      return SORTS[sortBy](a, b, direction);
    }
  })
);

search.start();

const positionSort = (a, b, positions) => {
  return positions.indexOf(a.name) - positions.indexOf(b.name);
};

const alphabeticalSort = (a, b, direction = "ascending") => {
  const ascendingScore = a.name > b.name ? 1 : -1;
  return direction === "ascending" ? ascendingScore : ascendingScore * -1;
};

const countSort = (a, b, direction = "ascending") => {
  const ascendingScore = a.count > b.count ? 1 : -1;
  return direction === "ascending" ? ascendingScore : ascendingScore * -1;
};

const SORTS = {
  alphabetical: alphabeticalSort,
  count: countSort,
  position: positionSort
};
