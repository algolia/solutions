import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';

// Not specific to this demo
import { attachEventListeners } from './ui';
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
  sortBy,
} from './widgets';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  searchClient,
  indexName: 'instant_search',
});

const searchParams = new URLSearchParams(window.location.search);

const widgets = [
  brands,
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
  sortBy,
];

if (!searchParams.get('page')) {
  widgets.push(categories);
}

search.addWidgets(widgets);
search.start();

attachEventListeners();
