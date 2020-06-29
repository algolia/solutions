import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';

// Not specific to this demo
import {
  brands,
  categories,
  clearFilters,
  clearFiltersEmptyResults,
  clearFiltersMobile,
  configuration,
  freeShipping,
  hitsPerPage,
  pagination,
  priceSlider,
  products,
  ratings,
  resultsNumberMobile,
  saveFiltersMobile,
  searchBox,
  sortBy,
} from './widgets';

// Those are the new widgets
import { contextSetter, virtualClear } from './widgets/category-merchandising';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  searchClient,
  indexName: 'instant_search',
});

search.addWidgets([
  brands,
  categories,
  clearFilters,
  clearFiltersEmptyResults,
  clearFiltersMobile,
  configuration,
  freeShipping,
  hitsPerPage,
  pagination,
  priceSlider,
  products,
  ratings,
  resultsNumberMobile,
  saveFiltersMobile,
  searchBox,
  sortBy,
  contextSetter({
    container: '.merchandising-filters',
    contexts: [
      {
        label: 'Cell phones',
        value: 'cat_phones',
      },
      {
        label: 'Video Games',
        value: 'cat_video_games',
      },
      {
        label: 'Appliances',
        value: 'cat_appliances',
      },
    ],
    // even if we have no specific parameters we need to provide an empty object
    searchParameters: {},
  }),
  virtualClear({}),
]);
search.start();
