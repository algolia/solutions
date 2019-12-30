// You may need to change the import, depending on what build system you use
// this demo uses browserSync, so we globally assign the library - you probably should not use this
import * as RecentSearchesGlobalImport from "./../node_modules/recent-searches/dist/index.js";

// Webpack
// import RecentSearches from "recent-searches"

const RecentSearches = window.RecentSearches.default;

const isVisible = (container, element) => {
  let scrollTop = container.scrollTop;
  let scrollRight = scrollTop + container.clientHeight;

  let elementTop = element.offsetTop;
  let elementRight = elementTop + element.clientHeight;

  let visible = elementTop >= scrollTop && elementRight <= scrollRight;
  return {
    visible
  };
};

const filterUniques = (suggestions, query) => {
  const uniques = suggestions.reduce((acc, suggestion) => {
    if (acc[suggestion.query] || query === suggestion.query) return acc;
    acc[suggestion.query] = suggestion;
    return acc;
  }, {});

  return Object.values(uniques);
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
          aria-owns="searches-suggestions"
          >
          <input 
            id="search-box-input"
            autocomplete="off"
            autofocus="true"
            placeholder="${placeholder || "Search"}"
            value="${value || ""}"
            type="text"
            aria-autocomplete="list"
            aria-controls="searches-suggestions"
            aria-activedescendant
          >
        </div>
        <div class="recent-searches-container">
          <ul id="recent-searches-tags" role="listbox" label="Searches" style="display: none">
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

    if (typeof options.noResultsRenderer !== "function") {
      throw new Error(
        "You are required to pass a noResultRendered function that will render a no result message"
      );
    }
    // Default options
    this.maxSuggestions = this.maxSuggestions || 10;
    this.maxSavedSearchesPerQuery = this.maxSavedSearchesPerQuery || 4;

    this.RecentSearches = new RecentSearches({
      namespace: this.querySuggestionsIndex
    });

    this.client = algoliasearch(options.appID, options.apiKey);
    this.querySuggestionsIndex = this.client.initIndex(
      this.querySuggestionsIndex
    );

    this.tabActionSuggestion = null;
    this.previousSearchBoxEvent = null;
  }

  init(instantSearchOptions) {
    this.widgetContainer = document.querySelector(this.container);

    if (!this.widgetContainer) {
      throw new Error(
        `Could not find widget container ${this.container} inside the DOM`
      );
    }

    this.widgetContainer.innerHTML = renderSearchBoxContainer(
      this.placeholder,
      instantSearchOptions.helper.state.query
    );

    this.predictiveSearchBox = this.widgetContainer.querySelector(
      "#predictive-box"
    );
    this.predictiveSearchBoxItem = this.widgetContainer.querySelector(
      "#predictive-box-text"
    );
    this.predictiveSearchBoxContainer = this.widgetContainer.querySelector(
      "#search-box-container"
    );

    this.searchBoxInput = this.widgetContainer.querySelector(
      "#search-box-input"
    );
    this.suggestionTagsContainer = this.widgetContainer.querySelector(
      "#recent-searches-tags"
    );

    this.registerSearchBoxHandlers(
      instantSearchOptions.helper,
      this.searchBoxInput
    );
  }

  registerSearchBoxHandlers = (helper, searchBox) => {
    searchBox.addEventListener("keydown", this.onSearchBoxKeyDown);
    searchBox.addEventListener("input", event => {
      this.updateTabActionSuggestion(event);
      helper.setQuery(event.currentTarget.value).search();
    });

    searchBox.addEventListener("focus", event => {
      this.updateTabActionSuggestion(event);
      helper.setQuery(event.currentTarget.value).search();
    });

    document.addEventListener("click", event => {
      if (this.widgetContainer.contains(event.target)) return;
      this.closeSuggestionTags();
    });
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
    this.predictiveSearchBoxItem.innerText = "";
    this.setSearchBoxValue(this.tabActionSuggestion);
    this.closeSuggestionTags();
  };

  updateSuggestionTags = hits => {
    if (!this.maxSuggestions || this.maxSuggestions <= 0 || !hits.length) {
      return hits;
    }

    this.clearSuggestionTags();

    hits.slice(0, this.maxSuggestions).forEach(suggestion => {
      const suggestionElement = document.createElement("li");

      suggestionElement.setAttribute("role", "option");
      suggestionElement.setAttribute(
        "id",
        `suggestion-${sanitizeQuery(suggestion.query)}`
      );

      suggestionElement.classList.add("suggestion-tag");
      suggestionElement.innerHTML = suggestion.__recent__
        ? `<span><i class="fas fa-clock"></i>${suggestion.query}</span>`
        : `<span><i class="fas fa-search"></i>${suggestion._highlightResult.query.value}</span>`;

      suggestionElement.addEventListener("click", () => {
        this.RecentSearches.setRecentSearch(suggestion.query, suggestion);
        this.predictiveSearchBoxItem.innerText = "";
        this.setSearchBoxValue(suggestion.query);
        this.closeSuggestionTags();
      });

      suggestionElement.addEventListener("mouseenter", event => {
        const currentSelectedElement = this.suggestionTagsContainer.querySelector(
          '[aria-selected="true"]'
        );

        if (currentSelectedElement) {
          currentSelectedElement.removeAttribute("aria-selected");
        }

        event.currentTarget.setAttribute("aria-selected", true);
      });

      suggestionElement.addEventListener("mouseleave", event => {
        event.currentTarget.removeAttribute("aria-selected");
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
      this.closeSuggestionTags();
      this.updateExpandedA11y(false);
      this.predictiveSearchBox.style.display = "none";
      return;
    }

    // If new query does not match prefix, reset the prediction
    if (
      this.tabActionSuggestion &&
      !this.tabActionSuggestion.startsWith(query)
    ) {
      this.predictiveSearchBoxItem.innerText = "";
    }

    this.querySuggestionsIndex
      .search({ query })
      .then(response => {
        this.suggestionTagsContainer.style.display = "";

        const recentSearches = this.RecentSearches.getRecentSearches(query)
          .slice(0, this.maxSavedSearchesPerQuery)
          .map(suggestion => ({ ...suggestion.data, __recent__: true }));
        const suggestions = filterUniques(
          recentSearches.concat(response.hits),
          query
        );

        if (!suggestions.length) {
          this.clearSuggestions();
          this.suggestionTagsContainer.innerHTML = this.noResultsRenderer(
            query,
            response
          );
          return [];
        }

        if (suggestions[0].query.startsWith(query)) {
          this.predictiveSearchBox.style.display = "flex";
          this.predictiveSearchBoxItem.innerText = suggestions[0].query;
          this.tabActionSuggestion = suggestions[0].query;
        } else {
          this.predictiveSearchBoxItem.innerText = "";
        }
        return suggestions;
      })
      .then(this.updateSuggestionTags);
  };

  closeSuggestionTags = () => {
    this.suggestionTagsContainer.style.display = "none";
  };

  clearSuggestionTags = () => {
    this.suggestionTagsContainer.innerHTML = "";
  };

  clearSuggestions = () => {
    this.tabActionSuggestion = null;
    this.predictiveSearchBoxItem.innerText = "";
  };

  clear = () => {
    this.searchBoxInput.value = "";
    this.predictiveSearchBoxItem.innerText = "";

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
        currentSelectedElement.dispatchEvent(new Event("click"));
        this.searchBoxInput.dispatchEvent(new Event("input"));
        this.closeSuggestionTags();
        this.clearSuggestions();
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

  scrollElementToView = (element, forward) => {
    const { visible } = isVisible(this.suggestionTagsContainer, element);

    if (!visible) {
      this.animatedElementID = element.id;

      const scrollableParent = this.suggestionTagsContainer.parentNode
        .parentNode;
      const parentRects = scrollableParent.getBoundingClientRect();
      const clientRects = element.getBoundingClientRect();

      const currentScroll = this.suggestionTagsContainer.scrollTop;

      const position =
        scrollableParent.scrollTop + clientRects.top - parentRects.top - 16;

      if (forward) {
        return this.animateToView(currentScroll, clientRects.width + 16);
      }
      this.animateToView(currentScroll, position);
    }
  };
}

export default PredictiveSearchBox;
