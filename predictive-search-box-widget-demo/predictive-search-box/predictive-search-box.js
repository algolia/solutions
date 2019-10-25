const renderSearchBoxContainer = (placeholder, value) => {
  return `
      <div id="searchbox">
        <div id="predictive-box" style="display: none;">
          <span id="predictive-box-text"></span>
        </div>
        <div class="search-box-container">
          <input autocapitalize="off"
            placeholder="${placeholder}"
            id="search-box-input"
            autocomplete="off"
            autocorrect="off"
            role="textbox"
            spellcheck="false"
            type="search"
            value="${value}">
        </div>
        <div id="clear-input"><i class="fas fa-times"></i></div>
        <fieldset id="suggestion-tags-container"></fieldset>
      </div>
    `;
};

const renderTagInput = (query, highlightedQuery) => {
  const id = query.replace(/\s/, "");
  return `
    <input type="radio" id="${id}" tabindex="0"/>
    <label for="${id}">
      ${highlightedQuery}
    </label>
  `;
};

const isKey = (event, code, name) => {
  return event.which === code || event.keyCode === code || event.key === name;
};

class PredictiveSearchBox {
  constructor(options) {
    Object.assign(this, options);

    this.client = algoliasearch(options.appID, options.apiKey);
    this.querySuggestionsIndex = this.client.initIndex(
      this.querySuggestionsIndex
    );

    this.tabActionSuggestion = "";
  }

  init(initOptions) {
    const widgetContainer = document.querySelector(this.container);

    if (!widgetContainer) {
      throw new Error(
        `Could not find widget container ${this.container} inside the DOM`
      );
    }

    widgetContainer.innerHTML = renderSearchBoxContainer(
      this.placeholder,
      initOptions.helper.state.query
    );

    this.predictiveSearchBox = widgetContainer.querySelector("#predictive-box");
    this.predictiveSearchBoxItem = widgetContainer.querySelector(
      "#predictive-box-text"
    );
    this.clearButton = widgetContainer.querySelector("#clear-input");
    this.searchBoxInput = widgetContainer.querySelector("#search-box-input");
    this.suggestionTagsContainer = widgetContainer.querySelector(
      "#suggestion-tags-container"
    );

    this.registerSearchBoxHandlers(
      initOptions.helper,
      this.searchBoxInput,
      this.clearButton
    );
  }

  registerSearchBoxHandlers = (helper, searchBox, clearButton) => {
    searchBox.addEventListener("input", this.updateTabActionSuggestion);
    searchBox.addEventListener("keydown", this.onTabSelection);
    clearButton.addEventListener("click", this.clear);
    searchBox.addEventListener("input", event => {
      helper.setQuery(event.currentTarget.value).search();
    });
  };

  setSearchBoxValue = value => {
    this.searchBoxInput.value = value;
    this.searchBoxInput.dispatchEvent(new Event("input"));
  };

  onTabSelection = event => {
    if (!isKey(event, 39, "ArrowRight")) return;

    event.preventDefault();
    this.setSearchBoxValue(this.tabActionSuggestion);
  };

  updateSuggestionTags = hits => {
    if (!this.maxSuggestions || this.maxSuggestions <= 0) return hits;
    this.clearSuggestionTags();

    hits.slice(0, this.maxSuggestions).forEach(suggestion => {
      const suggestionElement = document.createElement("div");
      suggestionElement.classList.add("suggestion-tag");
      suggestionElement.innerHTML = renderTagInput(
        suggestion.query,
        suggestion._highlightResult.query.value
      );

      suggestionElement.addEventListener("click", () => {
        this.setSearchBoxValue(suggestion.query);
      });
      this.suggestionTagsContainer.append(suggestionElement);
    });
  };

  updateTabActionSuggestion = event => {
    const query = event.currentTarget.value;

    if (!query) {
      this.predictiveSearchBox.style.display = "none";
      this.clearButton.style.display = "none";
      return;
    }

    this.querySuggestionsIndex
      .search({ query })
      .then(response => {
        const suggestions = response.hits.filter(hit =>
          hit.query.startsWith(query)
        );

        if (!suggestions.length) {
          this.clearPredictiveSearchBox();
          return [];
        }

        this.predictiveSearchBox.style.display = "flex";
        this.predictiveSearchBoxItem.innerText = suggestions[0].query;
        this.tabActionSuggestion = suggestions[0].query;
        return suggestions.slice(1);
      })
      .then(this.updateSuggestionTags);
  };

  clearSuggestionTags = () => {
    this.suggestionTagsContainer.innerHTML = "";
  };

  clearPredictiveSearchBox = () => {
    this.tabActionSuggestion = "";
  };

  clear = event => {
    this.searchBoxInput.value = "";
    this.predictiveSearchBoxItem.innerText = "";
    this.clearSuggestionTags();

    this.tabActionSuggestion = "";
    event.target.style.display = "none";
    searchBoxInput.dispatchEvent(new Event("input"));
  };
}

export default PredictiveSearchBox;
