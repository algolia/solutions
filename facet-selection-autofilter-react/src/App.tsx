import React, { useCallback } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  RefinementListProps,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const future = { preserveSharedStateOnUnmount: true };

function AutofilteredRefinementList(props: RefinementListProps) {
  const { results } = useInstantSearch();
  // @ts-ignore: `explain` it not typed in results
  const [facetFilter] = results.explain?.params?.rules?.facetFilters || [];
  const transformItems = useCallback<
    NonNullable<RefinementListProps['transformItems']>
  >(
    (items) =>
      items.map((item) => ({
        ...item,
        isRefined:
          item.isRefined ||
          facetFilter ===
            `${props.attribute}:${item.value.toLocaleLowerCase()}`,
      })),
    [facetFilter]
  );

  return <RefinementList {...props} transformItems={transformItems} />;
}

export function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">facet-selection-autofilter-react</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="instant_search_query_rules"
          future={future}
        >
          <Configure explain={['*']} hitsPerPage={8} />
          <div className="search-panel">
            <div className="search-panel__filters">
              <Panel header="categories">
                <AutofilteredRefinementList attribute="categories" />
              </Panel>
            </div>

            <div className="search-panel__results">
              <SearchBox
                placeholder="try typing 'apple'"
                className="searchbox"
              />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <div>
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="description" hit={hit} />
        </p>
      </div>
    </article>
  );
}
