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
