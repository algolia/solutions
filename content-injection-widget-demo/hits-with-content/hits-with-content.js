const isValidUserData = userData => userData && Array.isArray(userData);

const shouldInjectRecord = (position, start, end) =>
  position > start && position <= end;

const isFunction = unknown => typeof unknown === "function";

class HitsWithContent {
  constructor(options) {
    Object.assign(this, options);

    if (!isFunction(options.templates.item)) {
      throw new Error(
        "You need to provide a template function for rendering an item"
      );
    }

    if (!isFunction(options.templates.injectedItem)) {
      throw new Error(
        "You need to provide a template function for rendering an injected item"
      );
    }

    if (!isFunction(options.templates.noResults)) {
      throw new Error(
        "You need to provide a template function for rendering no results"
      );
    }
  }

  init = instantSearchOptions => {
    this.hitsContainer = document.querySelector("#hits");
  };

  render = renderOptions => {
    const response = renderOptions.results;
    const userData = response.userData;

    if (isValidUserData(userData)) {
      //Appending custom data at the beginning of the array of results only if it's in the range of the position
      let start = response.page * response.hitsPerPage + 1;
      let end = response.page * response.hitsPerPage + response.hitsPerPage;

      userData.forEach(record => {
        if (shouldInjectRecord(record.position, start, end)) {
          response.hits.splice(record.position - 1, 0, record);
        }
      });
    }

    // Clear current hits
    this.hitsContainer.innerHTML = "";

    if (!response.hits.length) {
      this.hitsContainer.innerHTML = this.templates.noResults(response);
      return;
    }

    response.hits.forEach((hit, index) => {
      const element = document.createElement("li");
      element.innerHTML = hit.injected
        ? this.templates.injectedItem(hit)
        : this.templates.item(hit);

      this.hitsContainer.append(element);

      if (isFunction(this.afterItemRenderer)) {
        this.afterItemRenderer(
          element,
          { ...hit, __position: index + 1 },
          response
        );
      }
    });
  };
}

export default HitsWithContent;
