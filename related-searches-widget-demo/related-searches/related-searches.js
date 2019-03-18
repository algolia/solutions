class RelatedQueriesWidget {
  constructor(options) {
    Object.assign(this, options);
  }

  render(renderOptions) {
    let query = renderOptions.state.query;
    const suggestedQueriesContainer = document.querySelector(this.container);

    if (query != "") {
      const client = algoliasearch(this.appID, this.apiKey);
      const suggestionIndex = client.initIndex(this.suggestionsIndex);
      const maxSuggestions = this.maxSuggestions;

      getSuggestedQueries(
        suggestionIndex,
        query,
        suggestedQueriesContainer,
        renderOptions.results.hits.length,
        maxSuggestions,
        renderOptions.helper
      );
    } else {
      suggestedQueriesContainer.innerHTML = "";
    }
  }
}

function getSuggestedQueries(
  index,
  query,
  container,
  searchResultLength,
  maxSuggestions,
  helper
) {
  index.search(
    {
      query: query,
      hitsPerPage: maxSuggestions,
      optionalWords: query.split(" ")
    },
    (err, res) => {
      if (res.hits.length > 0) {
        if (searchResultLength <= 0) {
          container.innerHTML = "";
        } else {
          container.innerHTML = "<h4>Related Searches</h4>";
          res.hits.forEach((hit, counter) => {
            let element = document.createElement("span");
            element.classList.add("suggested-query");
            element.innerHTML = hit.query;
            element.addEventListener("click", function(e) {
              helper.setQuery(hit.query).search(); //Set the query and search
            });
            container.append(element);
            if (counter + 1 < res.hits.length) {
              container.append(
                (document.createElement("span").innerHTML = ", ")
              );
            }
          });
        }
      }
    }
  );
}

export default RelatedQueriesWidget;
