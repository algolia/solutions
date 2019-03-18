class SuggestedQueriesNoResultsWidget {
  constructor(options) {
    Object.assign(this, options);
  }

  render(renderOptions) {
    let query = renderOptions.state.query;
    const suggestedQueriesContainer = document.querySelector(this.container);

    const client = algoliasearch(this.appID, this.apiKey);
    const suggestionIndex = client.initIndex(this.suggestionsIndex);
    const maxSuggestions = this.maxSuggestions;
    const suggestionsLabel = this.suggestionsLabel;
    const displayRelatedItems = this.displayRelatedItems;
    const mainIndex = client.initIndex(this.mainIndex);
    const itemTemplate = this.itemTemplate;
    const maxRelatedItems = this.maxRelatedItems;
    const relatedItemsLabel = this.relatedItemsLabel;

    if (renderOptions.results.hits.length <= 0) {
      getSuggestedQueries(
        suggestionIndex,
        query,
        suggestedQueriesContainer,
        maxSuggestions,
        suggestionsLabel,
        renderOptions.helper,
        displayRelatedItems,
        mainIndex,
        itemTemplate,
        maxRelatedItems,
        relatedItemsLabel
      );
    } else {
      suggestedQueriesContainer.innerHTML = "";
    }
  }
}

function getSuggestedQueries(
  suggestionIndex,
  query,
  container,
  maxSuggestions,
  suggestionsLabel,
  helper,
  displayRelatedItems = false,
  mainIndex = "",
  template = "",
  maxRelatedItems = 0,
  relatedItemsLabel = ""
) {
  var regexGroup = new RegExp("(?<={{).+?(?=}})", "gm"); //Regex to match 'text' inside {{}}
  var regexGlobal = new RegExp("{{(.*?)}}", "gm"); //Regex to match '{{text}}'
  var foundAttributes = template.match(regexGlobal); //Array of all the {{text}}

  suggestionIndex.search(
    {
      query: query,
      hitsPerPage: maxSuggestions,
      optionalWords: query.split(" ")
    },
    (err, res) => {
      if (res.hits.length > 0) {
        container.innerHTML = "";

        //Ordered list for related items if needed
        let relatedItemsOl = document.createElement("ol");
        relatedItemsOl.classList.add("ais-Hits-list");

        //Div container for suggested queries
        let suggestedQueriesSubContainer = document.createElement("div");
        suggestedQueriesSubContainer.style.marginBottom = "20px";
        suggestedQueriesSubContainer.innerHTML = `<h4>${suggestionsLabel}</h4>`;

        let firstSuggestion;

        //Looping through the suggested queries
        res.hits.forEach((hit, counter) => {
          //Create an element for each suggested query
          let element = document.createElement("span");
          element.classList.add("suggested-query");
          element.innerHTML = hit.query;
          if (counter == 0) {
            firstSuggestion = hit.query;
          }
          element.addEventListener("click", function(e) {
            helper.setQuery(hit.query).search(); //Set the query and search
          });
          suggestedQueriesSubContainer.append(element); //Append the suggested query to the suggestedQueriesSubContainer
          if (counter + 1 < res.hits.length) {
            //Display a comma only if the suggested query is not the last one
            suggestedQueriesSubContainer.append(
              (document.createElement("span").innerHTML = ", ")
            );
          }

          if (counter + 1 == res.hits.length) {
            //Append the suggestedQueriesSubContainer to the main container only at the end of the loop of the suggested queries
            container.append(suggestedQueriesSubContainer);
          }
        });

        //If related items are wanted below the suggested queries
        if (displayRelatedItems) {
          mainIndex.search(
            {
              query: firstSuggestion,
              hitsPerPage: maxRelatedItems
            },
            (err, response) => {
              console.log(response);
              response.hits.forEach(hit => {
                //Create an element for each related item
                let element = document.createElement("li");
                element.classList.add("ais-Hits-item");
                let newTemplate = template;
                foundAttributes.forEach(globalAttr => {
                  let attr = globalAttr.match(regexGroup)[0]; //Getting only the text inside the {{}}
                  newTemplate = newTemplate.replace(
                    globalAttr,
                    resolve(attr, hit)
                  ); //Replace the template value by the real value from Algolia
                });

                element.innerHTML = newTemplate;
                relatedItemsOl.append(element); //Append related item to the matching container
              });
            }
          );
          
          //Create a container and append the related items container to it
          let relatedItemsContainer = document.createElement("div");
          relatedItemsContainer.classList.add("ais-Hits");
          relatedItemsContainer.innerHTML = `<h4 style='color: black'>${relatedItemsLabel}</h4>`;
          relatedItemsContainer.append(relatedItemsOl);
          container.append(relatedItemsContainer);
        }
      }
    }
  );
}

function resolve(path, obj = self, separator = ".") {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export default SuggestedQueriesNoResultsWidget;
