/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'latency',
  'af044fb0788d6bb15f807e4420592bc5'
);

const search = instantsearch({
  indexName: 'instant_search_solutions_ecommerce',
  searchClient,
});

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
]);

search.start();
