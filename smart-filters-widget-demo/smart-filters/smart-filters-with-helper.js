class SmartFilters {
  constructor(options) {
    Object.assign(this, options);
    this.node = document.querySelector(this.container);
    this.derivedHelpers = [];
  }

  getConfiguration() {
    return {
      disjunctiveFacets: this.filters,
    };
  }

  init({ helper }) {
    helper.on('result', result => {
      const [mainFacetName] = this.filters;
      const facetValues = result
        .getFacetValues(mainFacetName)
        .slice(0, this.maxSuggestions);

      Promise.all(
        facetValues.map(_ =>
          helper.searchOnce({
            filters: `${mainFacetName}:"${_.name}"`,
          })
        )
      ).then(results => {
        this.renderSmartCategories({
          results: facetValues.map((_, idx) => ({
            mainFacetValue: _.name,
            response: results[idx],
          })),
          helper,
        });
      });
    });
  }

  renderSmartCategories({ helper, results }) {
    this.node.innerHTML = results
      .map(({ mainFacetValue, response }) => {
        const [mainFacetName, subFacetName] = this.filters;
        const [subFacetValue] = response.content
          .getFacetValues(subFacetName)
          .slice(0, 1)
          .map(_ => _.name);

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
      .join('');

    this.node.querySelectorAll('button').forEach(el => {
      el.addEventListener('click', event => {
        const [topLevelFacet, subLevelFacet] = this.filters;
        const data = event.currentTarget.dataset;

        event.currentTarget.classList.toggle('smart-filters-active');

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

export default SmartFilters;
