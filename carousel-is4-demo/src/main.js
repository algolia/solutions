import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';
import { configure, index } from 'instantsearch.js/es/widgets';

import { connectHits } from 'instantsearch.js/es/connectors';

const searchClient = algoliasearch(
  'GENYJWQIK2',
  'd7a56394e700ad117ef483c12bc04481'
);

const search = instantsearch({
  indexName: 'perso_movies_carousel',
  searchClient,
});

// Customize UI of the Query Suggestion Hits
const renderCarousel = ({ widgetParams, hits }, isFirstRender) => {
  const container = document.querySelector(widgetParams.container);

  if (isFirstRender) {
    const carouselUl = document.createElement('ul');
    carouselUl.classList.add('carousel-list-container');
    container.appendChild(carouselUl);
  }

  container.querySelector('ul').innerHTML = hits
    .map(
      (hit) => `
        <li>
          <img src="${hit.image}" alt="${hit.title}">
          <div class="overlay">
            <h3>${hit.title}</h3>
            <ul>
              ${hit.genre
                .map(
                  (genre) => `
                <li>${genre}</li>
              `
                )
                .join('')}
            </ul>
          </div>
        </li>
      `
    )
    .join('');
};

const carousel = connectHits(renderCarousel);

// Add the widgets
search.addWidgets([
  index({
    indexName: 'perso_movies_carousel_trending',
  }).addWidgets([
    configure({
      hitsPerPage: 12,
    }),
    carousel({
      container: '#carousel-trending',
    }),
  ]),
  index({
    indexName: 'perso_movies_carousel',
    indexId: 'popular',
  }).addWidgets([
    configure({
      hitsPerPage: 8,
    }),
    carousel({
      container: '#carousel-most-popular',
    }),
  ]),
  index({
    indexName: 'perso_movies_carousel',
    indexId: 'perso',
  }).addWidgets([
    configure({
      hitsPerPage: 10,
      enablePersonalization: true,
      userToken: 'action_crime_fan',
    }),
    carousel({
      container: '#carousel-personalization',
    }),
  ]),
  index({
    indexName: 'perso_movies_carousel',
    indexId: 'fantaco',
  }).addWidgets([
    configure({
      hitsPerPage: 8,
      ruleContexts: 'comedy_fantasy',
    }),
    carousel({
      container: '#carousel-fantaco',
    }),
  ]),
]);

search.start();
