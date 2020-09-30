import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import {
  searchBox,
  hits,
  refinementList,
  pagination,
  configure,
} from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search_query_rules',
  searchClient,
});

search.addWidgets([
  searchBox({
    container: '#searchbox',
    placeholder: "try typing 'apple'",
  }),
  hits({
    container: '#hits',
    templates: {
      item: `
        <article>
          <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
          <ul class="tag-list">
            {{#categories}}<li>{{.}}</li>{{/categories}}
          </ul>
        </article>
        `,
    },
  }),
  refinementList({
    container: '#brand-list',
    attribute: 'categories',
    transformItems(items) {
      const facetFilters =
        (search.helper.lastResults.explain &&
          search.helper.lastResults.explain.params.rules.facetFilters) ||
        [];
      return items.map(item => ({
        ...item,
        isRefined:
          item.isRefined ||
          facetFilters.includes(`categories:${item.value.toLocaleLowerCase()}`),
      }));
    },
  }),
  pagination({
    container: '#pagination',
  }),
  configure({
    explain: ['params.rules'],
  }),
]);

search.start();
