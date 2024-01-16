import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import {
  searchBox,
  hits,
  configure,
  refinementList,
  panel,
  pagination,
  clearRefinements,
} from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch(
  'OMZTANDYKH',
  '464800040565d9ea37c930a288d537a1'
);
const searchFn = searchClient.search;
searchClient.search = async (queries) => {
  const { results } = await searchFn(queries);

  const prices = await getPrices(results[0].hits.map((hit) => hit.objectID));

  return {
    results: results.map((result) => ({
      ...result,
      hits: result.hits.map((hit) => ({
        ...hit,
        price: prices[hit.objectID],
      })),
    })),
  };
};

const search = instantsearch({
  indexName: 'products_index',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  insights: true,
});

// This would be the function that will call your api to retrieve the user prices
function getPrices(productIDs) {
  return new Promise(
    (resolve) =>
      setTimeout(() =>
        resolve(
          Object.fromEntries(
            productIDs.map((id) => [id, Math.round(Math.random() * 2000) / 100])
          )
        )
      ),
    10
  );
}

search.addWidgets([
  searchBox({
    container: '#searchbox',
  }),
  clearRefinements({
    container: '#clear-refinements',
  }),
  panel({
    templates: { header: () => 'brand' },
  })(refinementList)({
    container: '#brand-list',
    attribute: 'brand',
  }),
  hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <img src="${hit.image}" align="left" alt="${hit.name}" />
          <p class="hit-name">
            ${components.Highlight({ hit, attribute: 'name' })}
          </p>
          <p class="hit-description">
            ${components.Highlight({ hit, attribute: 'description' })}
          </p>
          <p class="hit-price">$${hit.price}</p>
        </article>
      `,
    },
  }),
  pagination({
    container: '#pagination',
  }),
]);

search.start();
