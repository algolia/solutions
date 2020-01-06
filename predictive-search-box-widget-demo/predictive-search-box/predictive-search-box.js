import * as RecentSearchesGlobalImport from "./../node_modules/recent-searches/dist/index.js";

// Webpack
// import RecentSearches from "recent-searches"

const RecentSearches = window.RecentSearches.default;

const filterUniques = (suggestions, query) => {
  const uniques = suggestions.reduce((acc, suggestion) => {
    if (acc[suggestion.query] || query === suggestion.query) return acc;
    acc[suggestion.query] = suggestion;
    return acc;
  }, {});

  return Object.values(uniques);
};

const isVisible = (container, element) => {
  let scrollLeft = container.scrollLeft;
  let scrollRight = scrollLeft + container.clientWidth;

  let elementLeft = element.offsetLeft;
  let elementRight = elementLeft + element.clientWidth;

  let visible = elementLeft >= scrollLeft && elementRight <= scrollRight;
  return {
    visible
  };
};

const renderSearchBoxContainer = (placeholder, value) => {
  return `
      <div id="searchbox">
        <div id="predictive-box" style="display: none;">
          <span id="predictive-box-text"></span>
        </div>
        <div
          id="search-box-container"
          class="search-box-container"
          role="combobox"
          aria-expanded="false"
          aria-haspopup="listbos"
          aria-owns="suggestion-tags"
          >
          <input 
            id="search-box-input"
            autocomplete="off"
            autofocus="true"
            placeholder="${placeholder || ""}"
            value="${value || ""}"
            type="text"
            aria-autocomplete="list"
            aria-controls="suggestion-tags"
            aria-activedescendant
          >
        </div>
        <div id="clear-input"><i class="fas fa-times"></i></div>
        <div class="suggestion-tags-container">
          <ul id="suggestion-tags" role="listbox" label="Suggestions"></ul>
        </div>
      </div>
    `;
};

const suppressComboBoxFocus = event => {
  if (isKey(event, 40, "ArrowDown")) return "ArrowDown";
  if (isKey(event, 38, "ArrowUp")) return "ArrowUp";
  if (isKey(event, 13, "Enter")) return "Enter";
  if (isKey(event, 27, "Escape")) return "Escape";
  return null;
};

const sanitizeQuery = query => query.replace(/\s+/gm, "");
const isKey = (event, code, name) =>
  event.which === code || event.keyCode === code || event.key === name;

class PredictiveSearchBox {
  constructor(options) {
    Object.assign(this, options);

    this.maxSavedSearchesPerQuery = this.maxSavedSearchesPerQuery || 4;
    this.recentSearchesEnabled = this.recentSearchesEnabled || false;

    this.client = algoliasearch(options.appID, options.apiKey);
    if (this.recentSearchesEnabled) {
      this.RecentSearches = new RecentSearches({
        namespace: this.querySuggestionsIndex
      });
    }

    this.querySuggestionsIndex = this.client.initIndex(
      this.querySuggestionsIndex
    );

    this.tabActionSuggestion = null;
    this.previousSearchBoxEvent = null;
  }

  init(instantSearchOptions) {
    const widgetContainer = document.querySelector(this.container);

    if (!widgetContainer) {
      throw new Error(
        `Could not find widget container ${this.container} inside the DOM`
      );
    }

    widgetContainer.innerHTML = renderSearchBoxContainer(
      this.placeholder,
      instantSearchOptions.helper.state.query
    );

    this.predictiveSearchBox = widgetContainer.querySelector("#predictive-box");
    this.predictiveSearchBoxItem = widgetContainer.querySelector(
      "#predictive-box-text"
    );
    this.predictiveSearchBoxContainer = widgetContainer.querySelector(
      "#search-box-container"
    );

    this.clearButton = widgetContainer.querySelector("#clear-input");
    this.searchBoxInput = widgetContainer.querySelector("#search-box-input");
    this.suggestionTagsContainer = widgetContainer.querySelector(
      "#suggestion-tags"
    );

    this.registerSearchBoxHandlers(
      instantSearchOptions.helper,
      this.searchBoxInput,
      this.clearButton
    );
  }

  registerSearchBoxHandlers = (helper, searchBox, clearButton) => {
    searchBox.addEventListener("keydown", this.onSearchBoxKeyDown);
    searchBox.addEventListener("input", event => {
      this.updateTabActionSuggestion(event);
      helper.setQuery(event.currentTarget.value).search();
    });
    clearButton.addEventListener("click", this.clear);
  };

  setSearchBoxValue = value => {
    this.searchBoxInput.value = value;
    this.searchBoxInput.dispatchEvent(new Event("input"));
  };

  onSearchBoxKeyDown = event => {
    // If there is no suggestion, jump to next element
    // If user presses tab once, highlight selection
    // If user presses tab twice, jump to next element
    // If input value = suggestion, jump to next element
    this.onKeyBoardNavigation(event);

    if (
      !this.tabActionSuggestion ||
      !event.currentTarget.value ||
      (!isKey(event, 9, "Tab") && !isKey(event, 39, "ArrowRight"))
    ) {
      this.previousSearchBoxEvent = null;
      return;
    }

    const isPressingTabTwice =
      this.previousSearchBoxEvent &&
      isKey(event, 9, "Tab") &&
      isKey(this.previousSearchBoxEvent, 9, "Tab");

    const isPressingArrowRightTwice =
      this.previousSearchBoxEvent &&
      isKey(event, 39, "ArrowRight") &&
      isKey(this.previousSearchBoxEvent, 39, "ArrowRight");

    // Store previous event so we can skip navigation later
    this.previousSearchBoxEvent = event;

    if (isPressingTabTwice || isPressingArrowRightTwice) return null;

    event.preventDefault();
    this.setPredictiveSearchBoxValue();
    this.setSearchBoxValue(this.tabActionSuggestion);
  };

  updateSuggestionTags = hits => {
    if (!this.maxSuggestions || this.maxSuggestions <= 0) return hits;

    this.clearSuggestionTags();

    hits.slice(0, this.maxSuggestions).forEach(suggestion => {
      const suggestionElement = document.createElement("li");

      suggestionElement.setAttribute("role", "option");
      suggestionElement.setAttribute(
        "id",
        `suggestion-${sanitizeQuery(suggestion.query)}`
      );

      suggestionElement.classList.add("suggestion-tag");
      suggestionElement.innerHTML = `<span><i class="fas ${suggestion.__recent__ &&
        "fa-clock"}"></i>${suggestion._highlightResult.query.value}</span>`;

      suggestionElement.addEventListener("click", () => {
        if (this.recentSearchesEnabled) {
          this.RecentSearches.setRecentSearch(suggestion.query, suggestion);
        }
        this.setSearchBoxValue(suggestion.query);
        this.setPredictiveSearchBoxValue();
      });
      this.suggestionTagsContainer.append(suggestionElement);
    });

    this.updateScrollIndicator();
    this.updateExpandedA11y(hits.length > 0);

    if (this.suggestionTagsContainer.firstChild) {
      this.scrollElementToView(this.suggestionTagsContainer.firstChild);
    }
  };

  updateTabActionSuggestion = event => {
    const query = event.currentTarget.value;

    if (!query) {
      this.clearSuggestionTags();
      this.updateExpandedA11y(false);
      this.predictiveSearchBox.style.display = "none";
      this.clearButton.style.display = "none";
      return;
    }

    // If new query does not match prefix, reset the prediction
    if (
      this.tabActionSuggestion &&
      !this.tabActionSuggestion.startsWith(query)
    ) {
      this.setPredictiveSearchBoxValue();
    }

    this.querySuggestionsIndex
      .search({ query })
      .then(response => {
        let suggestions;
        if(this.recentSearchesEnabled){
        const recentSearches = this.RecentSearches.getRecentSearches(query)
          .slice(0, this.maxSavedSearchesPerQuery)
          .map(suggestion => ({ ...suggestion.data, __recent__: true }));

          suggestions = filterUniques(
          recentSearches.concat(response.hits),
          query
        ).filter(hit => hit.query.startsWith(query) && hit.query !== query);
        }else{
          suggestions = response.hits.filter(
            hit => hit.query.startsWith(query) && hit.query !== query
          );
        }

        if (!suggestions.length) {
          this.clearSuggestions();
          return [];
        }

        this.predictiveSearchBox.style.display = "flex";
        this.setPredictiveSearchBoxValue(suggestions[0].query);
        this.tabActionSuggestion = suggestions[0].query;
        return suggestions;
      })
      .then(this.updateSuggestionTags);
  };

  clearSuggestionTags = () => {
    this.suggestionTagsContainer.innerHTML = "";
  };

  clearSuggestions = () => {
    this.tabActionSuggestion = null;
    this.setPredictiveSearchBoxValue();
  };

  clear = () => {
    this.searchBoxInput.value = "";
    this.setPredictiveSearchBoxValue();

    this.clearSuggestionTags();
    this.updateExpandedA11y(false);

    this.tabActionSuggestion = null;
    this.searchBoxInput.dispatchEvent(new Event("input"));
  };

  // Keyboard navigation
  onKeyBoardNavigation = event => {
    const hijackedKey = suppressComboBoxFocus(event);
    // Keep the focus inside the textbox
    if (hijackedKey) event.preventDefault();

    // Select current value
    if (hijackedKey === "Enter") {
      const currentSelectedElement = this.suggestionTagsContainer.querySelector(
        '[aria-selected="true"]'
      );

      if (currentSelectedElement) {
        this.clearSuggestions();
        currentSelectedElement.dispatchEvent(new Event("click"));
        this.searchBoxInput.dispatchEvent(new Event("input"));
      }
    }

    // Handle ArrowDown
    if (
      hijackedKey === "ArrowDown" &&
      this.suggestionTagsContainer.childNodes
    ) {
      const currentSelectedElement = this.suggestionTagsContainer.querySelector(
        '[aria-selected="true"]'
      );

      const suggestions = Array.from(this.suggestionTagsContainer.childNodes);
      if (!suggestions.length) return;

      // Set first element to selected
      if (!currentSelectedElement) {
        const firstSuggestion = suggestions[0];
        firstSuggestion.setAttribute("aria-selected", true);
        this.scrollElementToView(firstSuggestion);
        this.updateActiveDescendantA11y(firstSuggestion.id);
        return;
      }

      // Set next element to selected
      const nextSelectedElement =
        suggestions[
          (suggestions.indexOf(currentSelectedElement) + 1) % suggestions.length
        ];

      currentSelectedElement.removeAttribute("aria-selected");
      nextSelectedElement.setAttribute("aria-selected", true);
      this.scrollElementToView(
        nextSelectedElement,
        suggestions.indexOf(currentSelectedElement) !== suggestions.length - 1
      );
      this.updateActiveDescendantA11y(nextSelectedElement.id);
    }

    // Handle ArrowUp
    if (hijackedKey === "ArrowUp" && this.suggestionTagsContainer.childNodes) {
      const currentSelectedElement = this.suggestionTagsContainer.querySelector(
        '[aria-selected="true"]'
      );

      const suggestions = Array.from(this.suggestionTagsContainer.childNodes);
      if (!suggestions.length) return;

      // Set last element to selected
      if (!currentSelectedElement) {
        const lastSuggestion = suggestions[suggestions.length - 1];
        lastSuggestion.setAttribute("aria-selected", true);
        this.scrollElementToView(lastSuggestion);
        this.updateActiveDescendantA11y(lastSuggestion.id);
        return;
      }

      // Set previous element to selected
      const currentIndex = suggestions.indexOf(currentSelectedElement) - 1;
      const nextSelectedElement =
        suggestions[
          currentIndex === -1
            ? suggestions.length - 1
            : currentIndex % suggestions.length
        ];

      currentSelectedElement.removeAttribute("aria-selected");
      nextSelectedElement.setAttribute("aria-selected", true);
      this.scrollElementToView(nextSelectedElement);
      this.updateActiveDescendantA11y(nextSelectedElement.id);
    }

    if (hijackedKey === "Escape") {
      this.clear();
      this.updateActiveDescendantA11y();
    }
  };

  // a11y helpers
  updateExpandedA11y = expanded => {
    if (
      this.predictiveSearchBoxContainer.getAttribute("aria-expanded") !==
      String(expanded)
    ) {
      this.predictiveSearchBoxContainer.setAttribute("aria-expanded", expanded);
    }
  };

  updateActiveDescendantA11y = activeDescendantID => {
    if (
      activeDescendantID &&
      this.searchBoxInput.getAttribute("aria-activedescendant") !==
        String(activeDescendantID)
    ) {
      return this.searchBoxInput.setAttribute(
        "aria-activedescendant",
        activeDescendantID
      );
    }
    this.searchBoxInput.removeAttribute("aria-activedescendant");
  };

  updateScrollIndicator = () => {
    const container = this.suggestionTagsContainer;
    if (
      container.offsetHeight < container.scrollHeight ||
      container.offsetWidth < container.scrollWidth
    ) {
      container.parentNode.classList.add("overflowing-indicator-right");
      container.addEventListener("scroll", this.onSuggestionScroll);
    } else {
      container.parentNode.classList.remove("overflowing-indicator");
    }
  };

  setPredictiveSearchBoxValue = value => {
    this.predictiveSearchBoxItem.innerText = value || "";
  };

  scrollElementToView = (element, forward) => {
    const { visible } = isVisible(this.suggestionTagsContainer, element);

    if (!visible) {
      this.animatedElementID = element.id;

      const scrollableParent = this.suggestionTagsContainer.parentNode
        .parentNode;
      const parentRects = scrollableParent.getBoundingClientRect();
      const clientRects = element.getBoundingClientRect();

      const currentScroll = this.suggestionTagsContainer.scrollLeft;

      const position =
        scrollableParent.scrollLeft + clientRects.left - parentRects.left - 16;

      if (forward) {
        return this.animateToView(currentScroll, clientRects.width + 16);
      }
      this.animateToView(currentScroll, position);
    }
  };

  animateToView = (startValue, change) => {
    const DURATION = 600;
    const start = performance.now();
    // Used for cancellation of the animation
    const elementID = this.animatedElementID;
    // https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
    const sineEasing = (t, b, c, d) =>
      c * Math.sin((t / d) * (Math.PI / 2)) + b;

    const animate = () => {
      window.requestAnimationFrame(() => {
        const elapsed = performance.now() - start;
        if (elapsed > DURATION || this.animatedElementID !== elementID) return;

        const position = sineEasing(elapsed, startValue, change, DURATION);
        this.suggestionTagsContainer.scrollLeft = position;
        animate();
      });
    };
    animate();
  };

  onSuggestionScroll = () => {
    window.requestAnimationFrame(() => {
      const width =
        this.suggestionTagsContainer.scrollWidth -
        this.suggestionTagsContainer.offsetWidth;

      const scroll = this.suggestionTagsContainer.scrollLeft;
      const container = this.suggestionTagsContainer.parentNode;

      if (scroll === 0) {
        container.classList.add("overflowing-indicator-right");
        container.classList.remove("overflowing-indicator-left");
        return;
      }

      if (scroll === width) {
        container.classList.remove("overflowing-indicator-right");
        container.classList.add("overflowing-indicator-left");
        return;
      }

      container.classList.add(
        "overflowing-indicator-right",
        "overflowing-indicator-left"
      );
    });
  };
}

export default PredictiveSearchBox;
