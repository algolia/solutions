class SmartFilters {
  constructor(options) {
    Object.assign(this, options);
    this.node = document.querySelector(this.container);
    this.derivedHelpers = [];
  }

  getConfiguration() {
    return {
      disjunctiveFacets: this.filters
    };
  }

  init({ instantSearchInstance, helper }) {
    helper.on("result", (result, state) => {
      const [mainFacetName, subFacetName] = this.filters;
      const facetValues = result
        .getFacetValues(mainFacetName)
        .slice(0, this.maxSuggestions)
        .map(_ => _.name);

      let currentRefinements = result._state.disjunctiveFacetsRefinements;
      if (
        instantSearchInstance.helper.state.query != "" &&
        result.hits.length > 0 &&
        !(this.filters[0] in currentRefinements) &&
        !(this.filters[1] in currentRefinements)
      ) {
        instantSearchInstance.client
          .search(
            facetValues.map(_ => ({
              indexName: helper.getIndex(),
              params: {
                query: state.query,
                hitsPerPage: 0,
                facets: [subFacetName],
                filters: `${mainFacetName}:"${_}"`
              }
            }))
          )
          .then(response => {
            const subFacetValues = response.results.flatMap(
              (result, idx) =>
                (result.facets &&
                  result.facets[subFacetName] &&
                  Object.entries(result.facets[subFacetName])
                    .sort(([_, a], [__, b]) => a - b)
                    .slice(0, 1)
                    .map(([_]) => [facetValues[idx], _])) ||
                ""
            );

            this.renderSmartCategories({
              facetValues: subFacetValues,
              helper
            });
          });
      } else {
        var e = document.getElementById("smart-filters");
        deleteChildren(e);
      }
    });
  }

  renderSmartCategories({ helper, facetValues }) {
    const selected = document.querySelector(".smart-filters-active");

    this.node.innerHTML = facetValues
      .map(([mainFacetValue, subFacetValue]) => {
        const [mainFacetName, subFacetName] = this.filters;

        if (!subFacetValue) {
          return;
        }

        return `
          <button
            class="suggestion-tag"
            data-top-level-facet="${mainFacetValue}"
            data-sub-level-facet="${subFacetValue}"
          >
            <span class="suggestion-tag-content">
              <span class="smart-icon">${this.smartIcon}</span>
              <span>
                ${ucwords(mainFacetName)}: ${mainFacetValue}<br />
                ${ucwords(subFacetName)}: ${subFacetValue}
              </span>
            </span>
          </button>
        `;
      })
      .join("");

    if (selected) {
      const data = selected.dataset;
      const topLevel = `[data-top-level-facet="${data.topLevelFacet}"]`;
      const subLevel = `[data-sub-level-facet="${data.subLevelFacet}"]`;
      const el = document.querySelector(`${topLevel}${subLevel}`);
      if (el) {
        el.classList.add("smart-filters-active");
      }
      var e = document.getElementById("smart-filters");
      deleteChildren(e);
    }

    this.node.querySelectorAll("button").forEach(el => {
      el.addEventListener("click", event => {
        const [topLevelFacet, subLevelFacet] = this.filters;
        const data = event.currentTarget.dataset;

        event.currentTarget.classList.toggle("smart-filters-active");

        helper
          .toggleFacetRefinement(topLevelFacet, data.topLevelFacet)
          .toggleFacetRefinement(subLevelFacet, data.subLevelFacet)
          .search();
      });
    });
  }
}

function ucwords(str) {
  str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
  return str;
}

function deleteChildren(parentNode) {
  var child = parentNode.lastElementChild;
  while (child) {
    parentNode.removeChild(child);
    child = parentNode.lastElementChild;
  }
}

export default SmartFilters;
