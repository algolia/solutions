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

const userTokenSelector = document.getElementById('user-token-selector');
userTokenSelector.addEventListener('change', () => {
  userTokenSelector.disabled = true;
  search.removeWidgets(carouselWidgets);
  getCarousels().then((carousels) => {
    userTokenSelector.disabled = false;
    carouselWidgets = createWidgets(carousels);
    search.addWidgets(carouselWidgets);
  });
});

function getUserToken() {
  return userTokenSelector.value;
}

function getCarousels() {
  // this requires an extra index, here "personalized_movies_carousel_config",
  // with this schema:
  // {
  //   "title": "my carousel",
  //   "indexName": "my_index",
  //   "userToken": "user token for this ",
  //   "configure": {
  //     // any search parameter, e.g. "enablePersonalization": true
  //   }
  // }
  return searchClient
    .initIndex('personalized_movies_carousel_config')
    .search('', {
      facetFilters: ['userToken:' + getUserToken()],
      attributesToHighlight: [],
      attributesToRetrieve: ['title', 'indexName', 'configure'],
    })
    .then((res) => res.hits
    );
}

let carouselWidgets = [];
function createWidgets(carousels) {
  const container = document.querySelector('#carousel-container');

  container.innerText = '';

  return carousels.map((carouselConfig) => {
    const carouselContainer = document.createElement('div');

    const indexWidget = index({
      indexName: carouselConfig.indexName,
      indexId: carouselConfig.objectID,
    });

    if (carouselConfig.configure) {
      indexWidget.addWidgets([
        configure({
          ...carouselConfig.configure,
          userToken: getUserToken(),
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
  });
}

// retrieve the carousel configuration once
getCarousels().then((carousels) => {
  userTokenSelector.disabled = false;
  carouselWidgets = createWidgets(carousels);
  search.addWidgets(carouselWidgets);
  search.start();
});
