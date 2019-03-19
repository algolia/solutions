class SmartFilters {

  constructor(options, previousQuery) {
    Object.assign(this, options);
    this.previousQuery = "";
  }

  render(renderOptions){
    let query = renderOptions.state.query;

    const smartFiltersContainer = document.querySelector(this.container);

    let client = algoliasearch(this.appID, this.apiKey);
    let index = client.initIndex(this.indexName);
    let maxSuggestions = this.maxSuggestions;
    let filters = this.filters;
    console.log(this.previousQuery," // ",query);
    if (query != "" && query != this.previousQuery) {
      this.previousQuery = query;
      smartFiltersContainer.innerHTML = "";
      index.search(
        { query: query, hitsPerPage: 0, facets: [filters[0]] },
        (err, res) => {
          console.log(query);
          if (Object.keys(res.facets)[0] != undefined) {
            let facet = Object.keys(res.facets)[0];
            Object.keys(res.facets[facet]).forEach((key, counter) => {
              if (counter < maxSuggestions) {
                index.search(
                  {
                    query: query,
                    hitsPerPage: 0,
                    facets: [filters[1]],
                    facetFilters: [[facet + ":" + key]]
                  },
                  (err, result) => {
                    let facetsValues = result.facets[filters[1]];
                    let sortedFacetValues = Object.keys(facetsValues).sort(function(a, b) {
                      return facetsValues[b] - facetsValues[a];
                    });
                    let element = document.createElement("div");
                    element.classList.add('suggestion-tag');
                    element.setAttribute("alg-refinement-brand", key);
                    element.setAttribute("alg-refinement-size", sortedFacetValues[0]);
                    element.innerHTML = filters[0] + ': ' + key + ' | ' + filters[1] + ': ' + sortedFacetValues[0];
                    element.addEventListener("click", () => {
                      smartFiltersContainer.childNodes.forEach(child => {
                        child.classList.remove('smart-filters-active');
                      })
                      element.classList.add('smart-filters-active');
                    });
                    smartFiltersContainer.append(element);
                  }
                );
              }
            });
          }
        }
      );
    }
  }
}

export default SmartFilters;
