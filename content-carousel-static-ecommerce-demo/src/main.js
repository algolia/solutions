import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';
import { configure, index } from 'instantsearch.js/es/widgets';
import { connectHits } from 'instantsearch.js/es/connectors';
import onSaleImg from './onsale.png';

const searchClient = algoliasearch(
  'GENYJWQIK2',
  'd7a56394e700ad117ef483c12bc04481'
);

const search = instantsearch({
  indexName: 'e_commerce_transformed',
  searchClient,
});

// Customize UI of the Carousel
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
          ${
            hit.onSale
              ? `<img class="on-sale" src="${onSaleImg}" alt="">`
              : ''
          }
          <img src="${hit.image}" alt="${hit.name}">
          <span>${hit.brand}</span>
          <a href="#">
            <h3>${hit.name}</h3>
          </a>
          <p>${[...Array(hit.rating === 0 ? 1 : hit.rating).keys()]
            .map(() => '⭐️')
            .join('')}  (${hit.ratingsNumber})</p>
            <p><span ${
              hit.onSale ? 'style="text-decoration: line-through"' : ''
            }>$${hit.price}</span> ${
              hit.onSale ? `<span style="color: red">$${hit.newPrice}</span>` : ''}</p>
      </li>
      
      `
    )
    .join('');
};

const carousel = connectHits(renderCarousel);

// Add the widgets
search.addWidgets([
  // Carousel #1 - Popular 
  index({
    indexName: 'e_commerce_transformed',
    indexId: 'popular',
  }).addWidgets([
    configure({
      hitsPerPage: 8,
    }),
    carousel({
      container: '#carousel-most-popular',
    }),
  ]),

  // Carousel #2 - Best Rated 
  index({
    indexName: 'e_commerce_transformed_rating_desc',
    indexId: 'best-rated',
  }).addWidgets([
    configure({
      hitsPerPage: 8,
    }),
    carousel({
      container: '#carousel-best-rated',
    }),
  ]),

  // Carousel #3 - On Sale
  index({
    indexName: 'e_commerce_transformed',
    indexId: 'perso',
  }).addWidgets([
    configure({
      hitsPerPage: 8,
      filters: 'onSale:true'
    }),
    carousel({
      container: '#carousel-on-sale',
    }),
  ]),

  // Carousel #4 - These might interest you
  index({
    indexName: 'e_commerce_transformed',
    indexId: 'personalized',
  }).addWidgets([
    configure({
      hitsPerPage: 8,
      enablePersonalization: true,
      userToken: 'samsung_fan', // dynmically update user token
    }),
    carousel({
      container: '#carousel-personalized',
    }),
  ]),

  // Carousel #5 - Gifts for Black Friday
  index({
    indexName: 'e_commerce_transformed',
    indexId: 'black-friday-gifts',
  }).addWidgets([
    configure({
      hitsPerPage: 8,
      ruleContexts: 'carousel_black_friday',
    }),
    carousel({
      container: '#carousel-black-friday-sale',
    }),
  ])
]);

search.start();
