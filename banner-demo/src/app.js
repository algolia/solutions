/* Global algoliasearch instantsearch */
const searchClient = algoliasearch(
  'latency',
  'af044fb0788d6bb15f807e4420592bc5'
);

const search = instantsearch({
  indexName: 'instant_search_solutions_ecommerce',
  searchClient,
});

// Custom configure for banner on context
const renderConfigure = (renderOptions, isFirstRender) => {
  const { refine } = renderOptions;

  if (isFirstRender) {
    const checkbox = document.getElementById('searchCheckbox');

    checkbox.addEventListener('change', event => {
      if (event.target.checked) {
        refine({
          ruleContexts: ['banner'],
        });
      } else {
        refine({});
      }
    });
  }
};

// Create the custom widget
const customConfigure = instantsearch.connectors.connectConfigure(
  renderConfigure,
  () => {}
);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.queryRuleCustomData({
    container: '#queryRuleCustomData',
    transformItems(items) {
      return items.filter(item => typeof item.banner !== 'undefined');
    },
    templates: {
      default: `
        {{#items}}
          {{#banner}}
            <section>
              <h2>{{title}}</h2>
              <a href="{{link}}">
                <img src="{{banner}}" alt="{{title}}">
              </a>
            </section>
          {{/banner}}
        {{/items}}
      `,
    },
  }),
  instantsearch.widgets.refinementList({
    container: '#refinement-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
</article>
`,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
  customConfigure({
    container: document.querySelector('#configure'),
    searchParameters: {
      hitsPerPage: 8,
    },
  }),
]);

search.start();
