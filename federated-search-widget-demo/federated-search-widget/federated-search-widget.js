class FederatedSearchWidget {
  constructor(options) {
    Object.assign(this, options);
  }

  init(initOptions) {

    const searchboxContainer = document.querySelector(this.container);

    searchboxContainer.innerHTML = `
      <div id="searchbox">
        <div class="search-box-container">
            <input autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              placeholder="${this.placeholder}"
              role="textbox"
              spellcheck="false"
              type="text"
              value=""
              id="search-box-input">
        </div>
        <div id="clear-input"><i class="fas fa-times"></i></div>
        <div id="federated-results-container"></div>
      </div>
    `;

    let searchBoxInput = document.getElementById("search-box-input");
    let clearButton = document.getElementById("clear-input");
    let federatedResultsContainer = document.getElementById("federated-results-container");

    let columns = this.columns;
    let nbOfColumns = this.columns.length;
    let clickAnalytics = (this.clickAnalytics) ? this.clickAnalytics : false;
    let searchInsightsAPI;

    if(clickAnalytics){
      !(function(e, a, t, n, s, i, c) {
        (e.AlgoliaAnalyticsObject = s),
          (e.aa =
            e.aa ||
            function() {
              (e.aa.queue = e.aa.queue || []).push(arguments);
            }),
          (i = a.createElement(t)),
          (c = a.getElementsByTagName(t)[0]),
          (i.async = 1),
          (i.src = "https://cdn.jsdelivr.net/npm/search-insights@1.0.0"),
          c.parentNode.insertBefore(i, c);
      })(window, document, "script", 0, "aa");
  
      // Initialize Insights library
      aa("init", {
        appId: this.appID,
        apiKey: this.apiKey
      });
    }

    let client = algoliasearch(this.appID, this.apiKey);
    let indices = [];
    for (let i = 0; i < nbOfColumns; i++) {
      //To create the needed number of columns
      let column = document.createElement("div");
      column.classList.add("ais-federated-result-column");
      if (columns[i].displayOnMobile) {
        column.classList.add("mobile-format");
      } else {
        column.classList.add("hidesmall");
      }
      column.style.width = 100 / nbOfColumns + "%";
      if(columns[i].isFacetBased){
        column.innerHTML = `<div id="column-${i}-content"></div>`;
      }else{
        column.innerHTML = `<h3 class="column-title">${columns[i].title}</h3>
                          <div id="column-${i}-content"></div>`;
      }
      federatedResultsContainer.append(column);

      //To store all the different indices
      indices.push(client.initIndex(columns[i].indexName));
    }

    searchBoxInput.addEventListener("input", function(e) {
      let value = searchBoxInput.value;
      if (value == "") {
        clearButton.style.display = "none";
        federatedResultsContainer.style.display = "none";
      } else {
        clearButton.style.display = "block";
        federatedResultsContainer.style.display = "flex";

        //Perfom a search for each index
        indices.forEach((index, i) => {
          if(columns[i].isFacetBased){
            //Perform a search to get facets only
            index.search({ query: searchBoxInput.value, hitsPerPage: 1, facets: columns[i].facetsBasedOn }, (err, res) => {              
              columns[i].facetsBasedOn.forEach((facet, counter) => {
                let element = document.createElement("div");
                element.setAttribute("id", "facet-column-" + counter + "-content");
                document.getElementById("column-" + i + "-content").append(element);
                let container = document.getElementById("facet-column-" + counter + "-content");
                if(res.facets[facet] !== undefined){
                  displayFacetValues(Object.entries(res.facets[facet]).slice(0, columns[i].displayLimit), container, `<h3 class="column-title">${columns[i].title[counter]}</h3>`);
                }else{
                  container.innerHTML = `<h3 class="column-title">${columns[i].title[counter]}</h3><p>${columns[i].noResultLabel}</p>`;
                }
              })
              
            });
          }else{
            //Perform a search to get hits / query suggestions
            index.search({ query: searchBoxInput.value, hitsPerPage: columns[i].displayLimit, clickAnalytics: clickAnalytics }, (err, res) => {
              if(columns[i].isQuerySuggestionsBased != undefined && columns[i].isQuerySuggestionsBased){
                displayQuerySuggestions(res, columns[i].sourceIndexForQS, document.getElementById("column-" + i + "-content"), columns[i].redirectTo, columns[i].noResultLabel)
              }else{
                displayHits(
                  res,
                  document.getElementById("column-" + i + "-content"),
                  columns[i].itemTemplate,
                  columns[i].noResultLabel,
                  columns[i].redirectAttribute,
                  clickAnalytics,
                  columns[i].indexName,
                );
              }
            });
          }
        });
      }
    });

    //Clear button
    clearButton.addEventListener("click", function(e) {
      searchBoxInput.value = "";
      clearButton.style.display = "none";
      var event = new Event("input");
      searchBoxInput.dispatchEvent(event);
    });
  }
}

function displayQuerySuggestions(res, qsSourceIndex, container, redirectTo, noResultLabel){
  let hits = res.hits;

  container.innerHTML = '';
  if (hits.length > 0) {
    for (let i = 0; i < hits.length; i++) {
      let element = document.createElement("div");
      element.classList.add("hover-background");
      element.addEventListener("click", function(e) {
        window.location = encodeURI(redirectTo + hits[i].query);
      });
      if(i < Math.round(0.25 * hits.length)){
        if(hits[i][qsSourceIndex] != undefined){
          Object.keys(hits[i][qsSourceIndex].facets.exact_matches).forEach(key => {
              let array = hits[i][qsSourceIndex].facets.exact_matches[key];
              array.sort(function(a, b){
                if(a.count > b.count) return -1;
                if(a.count < b.count) return 1;
                return 0;
              });
            element.innerHTML = `<div style="padding: 10px;"><span class="inverted-highlight">${hits[i]._highlightResult.query.value}</span> <span class="in-facet"><i> in ${key, array[0].value}</i></span></div>`;
          })
        }
      }else{
        element.innerHTML = `<div style="padding: 10px;" class="inverted-highlight">${hits[i]._highlightResult.query.value}</div>`;
      }
      container.append(element);
    }
  } else {
    container.innerHTML = `<p>${noResultLabel}</p>`;
  }
}

function displayFacetValues(arrayOfFacetsAndCount, container, title){
  container.innerHTML = title;
  arrayOfFacetsAndCount.forEach(array => {
      let element = document.createElement("div");
      element.classList.add("hover-background");
      element.addEventListener("click", function(e) {
        //TODO
      });
      element.innerHTML = "<div style='padding: 10px;'>" + array[0] + "<span class='facet-count'> (" + array[1] + ")</span></div>";
      container.append(element);
  })
}

function displayHits(res, container, template, noResultLabel, redirectAttribute, clickAnalytics, indexName) {
  let hits = res.hits;

  if(clickAnalytics){
    hits.forEach((hit) => {
      hit._queryID = res.queryID;
      hit._position = res.hits.findIndex(hit => hit.objectID == hit.objectID) + 1; //The position cannot be 0
    })
  }


  container.innerHTML = '';
  if (hits.length > 0) {
    var regexGroup = new RegExp("(?<={{).+?(?=}})", "gm"); //Regex to match 'text' inside {{}}
    var regexGlobal = new RegExp("{{(.*?)}}", "gm"); //Regex to match '{{text}}'
    var foundAttributes = template.match(regexGlobal); //Array of all the {{text}}
    for (let i = 0; i < hits.length; i++) {
      let element = document.createElement("div");
      element.classList.add("hover-background");
      element.addEventListener("click", function(e) {

        if(clickAnalytics){
          //To send a click event
          aa("clickedObjectIDsAfterSearch", {
            eventName: "product_clicked",
            index: indexName,
            queryID: hits[i]._queryID,
            objectIDs: [hits[i].objectID],
            positions: [hits[i]._position]
          });

          //To send a conversion event
          aa('convertedObjectIDsAfterSearch', {
              eventName: 'product_clicked',
              index: indexName,
              queryID: hits[i]._queryID,
              objectIDs: [hits[i].objectID]
          });
        }

        window.location = hits[i][redirectAttribute];
      });

      let newTemplate = template;
      foundAttributes.forEach(globalAttr => {
        let attr = globalAttr.match(regexGroup)[0]; //Getting only the text inside the {{}}
        newTemplate = newTemplate.replace(globalAttr, resolve(attr, hits[i])); //Replace the template value by the real value from Algolia
      });

      element.innerHTML = newTemplate;
      container.append(element);
    }
  } else {
    container.innerHTML = `<p>${noResultLabel}</p>`;
  }
}

function resolve(path, obj = self, separator = ".") {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export default FederatedSearchWidget;
