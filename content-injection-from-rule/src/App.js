import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Configure,
  RefinementList,
  Pagination,
  Highlight,
  Snippet,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

import { InjectedHits } from './InjectedHits';
import { FreeReturnPolicy } from './FreeReturnPolicy';

import './App.css';

const searchClient = algoliasearch(
  '5WNRH2J3IK',
  '64e897c7e06d86a32c3a8d409b403756'
);

function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">content-injection-from-rule</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="products">
          <div className="search-panel">
            <div className="search-panel__filters">
              <Configure facets={['*']} maxValuesPerFacet={20} />
              <RefinementList attribute="brand" />
            </div>

            <div className="search-panel__results">
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: '',
                }}
              />
              <InjectedHits
                hitComponent={Hit}
                slots={({ resultsByIndex }) => {
                  const freeReturnPolicy =
                    resultsByIndex.products.userData &&
                    resultsByIndex.products.userData.find(
                      ({ type }) => type === 'free-return-policy'
                    );

                  return [
                    {
                      injectAt: freeReturnPolicy && freeReturnPolicy.position,
                      getHits: () => [freeReturnPolicy],
                      slotComponent: FreeReturnPolicy,
                    },
                  ];
                }}
              />

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

function Hit(props) {
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={props.hit} />
      </h1>
      <p>
        <Snippet attribute="description" hit={props.hit} />
      </p>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
