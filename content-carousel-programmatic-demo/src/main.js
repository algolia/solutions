import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';
import { configure, index } from 'instantsearch.js/es/widgets';
import { carousel } from './carousel';

const searchClient = algoliasearch(
  'GENYJWQIK2',
  'd7a56394e700ad117ef483c12bc04481'
);

const search = instantsearch({
  indexName: 'perso_movies_carousel',
  searchClient,
});

function getUserToken() {
  return 'action_crime';
}

function getCarousels() {
  // this requires an extra index, here "perso_movies_carousel_config", with this schema:
  // {
  //   "title": "my carousel",
  //   indexName": "my_index",
  //   "configure": {
  //     // any search parameter
  //     // userToken: true if it should be set for this index
  //   }
  // }
  return searchClient
    .initIndex('perso_movies_carousel_config')
    .search('', {
      attributesToHighlight: [],
      attributesToRetrieve: ['title', 'indexName', 'configure'],
    })
    .then((res) => res.hits);
}

// retrieve the carousel configuration once
getCarousels().then((carousels) => {
  const container = document.querySelector('#carousel-container');

  search.addWidgets(
    carousels.map((carouselConfig) => {
      const carouselContainer = document.createElement('div');

      const indexWidget = index({
        indexName: carouselConfig.indexName,
        indexId: carouselConfig.objectID,
      });

      if (carouselConfig.configure) {
        indexWidget.addWidgets([
          configure({
            ...carouselConfig.configure,
            // replace user token with the user's one if set by configure
            userToken: carouselConfig.configure.userToken
              ? getUserToken()
              : undefined,
          }),
        ]);
      }

      indexWidget.addWidgets([
        carousel({
          title: carouselConfig.title,
          container: carouselContainer,
        }),
      ]);

      container.appendChild(carouselContainer);

      return indexWidget;
    })
  );

  // only start _after_ carousels have been added
  search.start();
});
