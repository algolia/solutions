/* eslint-disable camelcase */
/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
  onStateChange({ uiState, setUiState }) {
    const bannerIndexId = 'instant_search_promotions';
    const mainIndexId = 'instant_search';
    const mainUiState = uiState[mainIndexId];

    setUiState({
      ...uiState,
      // set the refinements you wan to make optional here
      [bannerIndexId]: {
        optionalRefinement: {
          ...mainUiState.refinementList,
          ...mainUiState.menu,
          // set the attribute to [] if you don't want it to be inherited
          price: [],
        },
      },
    });
  },
});

// TODO: remove this, it was just for highlighting
function taggedTemplateNoop(strings, ...keys) {
  const lastIndex = strings.length - 1;
  return (
    strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], '') +
    strings[lastIndex]
  );
}
const html = taggedTemplateNoop;

const templates = {
  'images-image'(item) {
    console.log(item);
    return html`
      ${item.layout_type}:
      <pre>${JSON.stringify(item.displayed_attributes, null, 2)}</pre>
    `;
  },
  'logo-text'(item) {
    console.log(item);
    return html`
      ${item.layout_type}:
      <pre>${JSON.stringify(item.displayed_attributes, null, 2)}</pre>
    `;
  },
  'images-text'({
    displayed_attributes: {
      name,
      logo_url,
      page_url,
      layout_label,
      promoted_items,
    },
  }) {
    return html`
      <p>
        <a href="${page_url}">
          <img
            src="${logo_url}"
            alt="${name}"
            style="height: 1em;vertical-align: middle"
          />${layout_label}
        </a>
      </p>
      <ul>
        ${promoted_items
          .map(
            promoted => html`
              <li>
                <a href="${promoted.product_page_url}">
                  <img
                    src="${promoted.thumbnail_url}"
                    alt="${promoted.product_name}"
                    style="height: 5em"
                  />
                  <p>${promoted.product_name}</p>
                </a>
              </li>
            `
          )
          .join('')}
      </ul>
    `;
  },
};

// custom widget which translates regular refinements to optional refinements
function optionalRefinementTranslator() {
  return {
    render() {},
    getWidgetSearchParameters(state, { uiState }) {
      const { optionalRefinement = {} } = uiState;
      return Object.keys(optionalRefinement).reduce(
        (partialState, attribute) => {
          const values = optionalRefinement[attribute];
          // refinementList uses array, menu value directly.
          // this way we can consistently set the refinement
          const valuesAsArray = Array.isArray(values) ? values : [values];

          return partialState.setQueryParameters({
            // remove every widget's refinement for this attribute
            disjunctiveFacetsRefinements: {
              ...partialState.disjunctiveFacetsRefinements,
              [attribute]: [],
            },
            facetsRefinements: {
              ...partialState.facetsRefinements,
              [attribute]: [],
            },
            hierarchicalFacetsRefinements: {
              ...partialState.facetsRefinements,
              [attribute]: [],
            },
            numericRefinements: {
              ...partialState.facetsRefinements,
              [attribute]: [],
            },

            // add it again as an optional filter
            optionalFilters: [
              ...(partialState.optionalFilters || []),
              ...valuesAsArray.map(value => `${attribute}:${value}`),
            ],
          });
        },
        state
      );
    },
  };
}

function banner({ container }) {
  return instantsearch.widgets
    .index({ indexName: 'instant_search_promotions' })
    .addWidgets([
      instantsearch.widgets.configure({
        page: 0,
        hitsPerPage: 1,
      }),
      optionalRefinementTranslator(),
      instantsearch.widgets.hits({
        container,
        templates: {
          item(item) {
            return templates[item.layout_type]?.(item);
          },
          empty: '',
        },
      }),
    ]);
}

// TODO: finish the three layouts
search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  banner({ container: '#banner' }),
  instantsearch.widgets.panel({ templates: { header: 'brand' } })(
    instantsearch.widgets.refinementList
  )({
    container: '#refinement-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.panel({ templates: { header: 'categories' } })(
    instantsearch.widgets.menu
  )({
    container: '#menu',
    attribute: 'categories',
  }),
  instantsearch.widgets.panel({ templates: { header: 'price' } })(
    instantsearch.widgets.rangeSlider
  )({
    container: '#range',
    attribute: 'price',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();

window.search = search;
