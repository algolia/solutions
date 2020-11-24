import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';
import { configure, hits, EXPERIMENTAL_configureRelatedItems } from 'instantsearch.js/es/widgets';


const searchClient = algoliasearch(
  'GENYJWQIK2',
  'd7a56394e700ad117ef483c12bc04481'
);

const search = instantsearch({
  indexName: 'perso_movies_carousel',
  searchClient,
});

const referenceHit = {
  title: 'The Imitation Game',
  image: 'https://image.tmdb.org/t/p/w154/ntZGfHt4d73A9fDD4KUN4nbDQlq.jpg',
  color: '#192229',
  popularity_score: 108.4335114104872,
  actors: ['Benedict Cumberbatch', 'Keira Knightley', 'Matthew Goode'],
  genre: ['History', 'Drama', 'Thriller', 'War'],
  ongoing_watch: [],
  tmdb_id: 205596,
  views_last_7_days: 596898,
  days_to_expire: 44,
  objectID: '439434880',
};


// Add the widgets
search.addWidgets([
  configure({
    hitsPerPage: 15,
    query: '',
  }),
  EXPERIMENTAL_configureRelatedItems({
    hit: referenceHit,
    matchingPatterns: {
      genre: { score: 3 },
      actors: { score: 2 },
    },
  }),
  hits({
    container: '.carousel-container',
    templates: {
      item: (hit) => `
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
      `
    }
  }),
]);

search.start();
