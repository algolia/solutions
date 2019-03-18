/* global $, autocomplete, instantsearch */
function autocompleteRenderFn(renderParams, isFirstRendering) {
  const {
    container,
    placeholder,
    delayTime = 500,
    nbSuggestions = 5,
    historyTemplate,
    historyIndex,
    suggestionTemplate,
    suggestionsIndex,
    userId
  } = renderParams.widgetParams;

  if (isFirstRendering) {
    let $container = $(container);
    let inputClass = `autocomplete-input-${Date.now()}`;

    // If the autocomplete exists from a previous run of app(), remove it
    if ($container.find(".algolia-autocomplete")) {
      $container.find(".algolia-autocomplete").remove();
    }

    $container.append(
      `<input type="search" class="${inputClass}" id="aa-search-input" placeholder="${placeholder}"/>`
    );

    autocomplete(
      `.${inputClass}`,
      {
        hint: false
      },
      [
        {
          source: autocomplete.sources.hits(historyIndex, {
            hitsPerPage: 5,
            restrictSearchableAttributes: ["query"],
            filters: "user:" + userId
          }),
          displayKey: function(suggestion) {
            return suggestion.query;
          },
          templates: {
            suggestion: historyTemplate
          }
        },
        {
          source: autocomplete.sources.hits(suggestionsIndex, {
            hitsPerPage: nbSuggestions,
            restrictSearchableAttributes: ["query"]
          }),
          displayKey: function(suggestion) {
            return suggestion.query;
          },
          templates: {
            suggestion: suggestionTemplate
          }
        }
      ]
    )
      .on("autocomplete:selected", function(event, suggestion, dataset) {
        $(`.${inputClass}`).val(suggestion.query);
        renderParams.refine(suggestion.query);
        $("main").removeClass("grayout");
      })
      .on("autocomplete:cursorchanged", function(event, suggestion, dataset) {
        $(`.${inputClass}`).val(suggestion.query);
        renderParams.refine(suggestion.query);
      })
      .on("autocomplete:closed", function(event, suggestion, dataset) {
        //console.log("closed: " + $(`.${inputClass}`).val());
        saveInHistory($(`.${inputClass}`).val());
      });

    let debounceTimer = null;
    let lastQueryUpdatedAt = 0;

    // This is the regular instantSearch update of results
    $container.find(`.${inputClass}`).on("input", function(event) {
      $(document).keypress(function(e) {
        if (e.which === 13) {
          $container.find(".aa-dropdown-menu").hide();
          $("main").removeClass("grayout");
        } else {
          if ($(".aa-suggestion").length) {
            $("main").addClass("grayout");
          }
        }
      });

      const now = Date.now();

      if (now - lastQueryUpdatedAt < delayTime) {
        //console.log("Clearing timeout");
        clearTimeout(debounceTimer);
      }

      lastQueryUpdatedAt = now;
      debounceTimer = setTimeout(
        () => renderParams.refine(event.target.value),
        delayTime
      );
      //console.log("Setting timeout", debounceTimer);
      return false;
    });
  }

  // Gray out hits if suggestion dropdown exists
  if ($(".aa-dataset-1").find("span").length) {
    $("main").addClass("grayout");
  }

  // Add search to the history index
  function saveInHistory(query) {
    if (query.length > 3) {
      var objectID = userId + "|" + queryHash(query.trim());
      historyIndex.partialUpdateObject(
        {
          objectID: objectID,
          query: query.trim(),
          user: userId,
          score: {
            _operation: "Increment",
            value: 1
          },
          lastSearch: Date.now()
        },
        function(err, content) {
          if (err) {
            console.log(JSON.stringify(err));
          } else {
            console.log("objectID=" + content.objectID);
          }
        }
      );
    }
  }

  // To create a hash of the query for the saved search objectID
  function queryHash(query) {
    var hash = 0,
      i,
      chr;
    if (query.length === 0) return hash;
    for (i = 0; i < query.length; i++) {
      chr = query.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
}

window.autocompleteWidget = instantsearch.connectors.connectSearchBox(
  autocompleteRenderFn
);
