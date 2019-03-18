class PredictiveSearchBox {
  constructor(options) {
    Object.assign(this, options);
  }

  init(initOptions) {
    const predictiveSearchBoxContainer = document.querySelector(this.container);

    predictiveSearchBoxContainer.innerHTML = `
      <div id="searchbox">
        <div id="predictive-box" style="display: none;">
            <span id="predictive-item"></span>
        </div>
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
        <div id="suggestion-tags-container"></div>
      </div>
    `;

    let predictiveBox = document.getElementById("predictive-box");
    let predictiveSearchBoxItem = document.getElementById("predictive-item");
    let searchBoxInput = document.getElementById("search-box-input");
    let clearButton = document.getElementById("clear-input");
    let suggestionTags = document.getElementById("suggestion-tags-container");

    let client = algoliasearch(this.appID, this.apiKey);
    let suggestionIndex = client.initIndex(this.suggestionsIndex);

    let currentSuggestion;
    let maxSuggestions = this.maxSuggestions;

    searchBoxInput.addEventListener("input", function(evt) {
      let value = searchBoxInput.value;
      updateState(
        predictiveBox,
        searchBoxInput,
        clearButton,
        predictiveSearchBoxItem,
        suggestionIndex,
        maxSuggestions,
        suggestionTags
      ).then(current => {
        currentSuggestion = current;
      });
      initOptions.helper.setQuery(value).search(); //Set the query and search
    });

    //Clear button
    clearButton.addEventListener("click", function(e) {
      searchBoxInput.value = "";
      predictiveSearchBoxItem.innerText = "";

      removeTags(suggestionTags);

      currentSuggestion = "";
      clearButton.style.display = "none";
    });

    //To handle the tab key
    searchBoxInput.addEventListener("keydown", function(e) {
      if (e.keyCode == 9) {
        e.preventDefault();
        searchBoxInput.value = currentSuggestion;
        var event = new Event("input");
        searchBoxInput.dispatchEvent(event);
      }
    });
  }
}

function updateState(
  predictiveBox,
  searchBoxInput,
  clearButton,
  predictiveSearchBoxItem,
  suggestionIndex,
  maxSuggestions,
  suggestionTags
) {
  let currentSuggestion;
  let promise;
  if (searchBoxInput.value == "") {
    predictiveBox.style.display = "none";
    clearButton.style.display = "none";

    // Clear suggestion tags
    while (suggestionTags.lastChild) {
      suggestionTags.removeChild(suggestionTags.lastChild);
    }

    promise = new Promise(function(resolve, reject) {
      resolve("");
    });
  } else {
    clearButton.style.display = "block";
    promise = new Promise(function(resolve, reject) {
      suggestionIndex.search({ query: searchBoxInput.value }, (err, res) => {
        if (res.hits.length > 0) {
          predictiveBox.style.display = "flex";

          if (res.hits[0].query.startsWith(searchBoxInput.value)) {
            predictiveSearchBoxItem.innerText = res.hits[0].query;
            currentSuggestion = res.hits[0].query;
          } else {
            predictiveSearchBoxItem.innerText = "";
          }
        } else {
          predictiveSearchBoxItem.innerText = "";
        }

        // Update suggestionTags
        if (maxSuggestions || maxSuggestions === 0) {
          // Clear suggestion tags
          removeTags(suggestionTags);
          // Add tags up to maxSuggestions
          let addedTags = 0;
          if (
            res.hits.length > 1 ||
            (res.hits.length === 1 && res.hits[0].query != searchBoxInput.value)
          ) {
            res.hits.forEach(hit => {
              if (addedTags === maxSuggestions) {
                return;
              }
              let tagElement = document.createElement("div");
              tagElement.classList.add("suggestion-tag");
              tagElement.innerHTML = hit._highlightResult.query.value;
              tagElement.addEventListener("click", function(e) {
                searchBoxInput.value = hit.query;
                predictiveSearchBoxItem.innerText = hit.query;
                var event = new Event("input");
                searchBoxInput.dispatchEvent(event);
              });
              suggestionTags.append(tagElement);
              addedTags++;
            });
          }
        }

        resolve(currentSuggestion);
      });
    });
  }

  return promise;
}

function removeTags(suggestionTags){
  while (suggestionTags.lastChild) {
    suggestionTags.removeChild(suggestionTags.lastChild);
  }
}

export default PredictiveSearchBox;
