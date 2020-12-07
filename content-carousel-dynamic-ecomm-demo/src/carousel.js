import { connectHits } from "instantsearch.js/es/connectors";
import { configure, hits, EXPERIMENTAL_configureRelatedItems } from 'instantsearch.js/es/widgets';
import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';


export const carousel = connectHits(function renderCarousel(
  { widgetParams: { container, title }, hits },
  isFirstRender
) {
  if (isFirstRender) {
    const section = document.createElement("section");
    container.appendChild(section);
    const h2 = document.createElement("h2");
    h2.innerText = title;
    section.appendChild(h2);
    const ul = document.createElement("ul");
    ul.classList.add("carousel-list-container");
    section.appendChild(ul);
  }

  container.querySelector("ul").innerHTML = hits
    .map(
      (hit) => {
        if (hit.newPrice === hit.price) {
          return `
          <li>
            <img src="${hit.image}" alt="${hit.name}">
            <div class="info">
            <div class="hit-name">
            ${hit.brand}
            </div>
              <h3 class="title">${hit.name}</h3>
            </div>
            <div class="hit-rating-price">
            <div class="hit-ratings">${ratings(hit.rating)} <p>(${hit.ratingsNumber})</p></div>
            <div class="hit-price"><p>$${hit.price}</p></div>
          </div>
          </li>
        `

        } else {
          return `
          <li>
          
            <img src="${hit.image}" alt="${hit.name}">
            <div class="info">
            <div class="hit-name">
            ${hit.brand}
            </div>
              <h3 class="title">${hit.name}</h3>
            </div>
            <div class="hit-rating-price">
            <div class="hit-ratings">${ratings(hit.rating)} <p>(${hit.ratingsNumber})</p></div>
            <div class="hit-price"><p class="cross-price">$${hit.price}</p><p class="price-new">$${hit.newPrice}</p></div>
          </div>
          </li>
        `
        }

      })
    .join("");
});

const searchRelated = instantsearch({
  indexName: "e_commerce_transformed_perso",
  searchClient: algoliasearch("GENYJWQIK2", "a847d02d26f1276fbb0281a7e51ee8a5"),
});


// RELATED CAROUSEL
const referenceHit = {
  objectID: "8532557",
  brand: 'Apple',
  image: '"https://cdn-demo.algolia.com/bestbuy-0118/8532557_sb.jpg"',
  name: '"Apple - MacBook Pro with Retina display - 13.3" Display - 8GB Memory - 128GB Flash Storage - Silver"',
  description: "With fifth-generation Intel Core processors, the latest graphics, and faster flash storage, the incredibly advanced MacBook Pro with Retina display moves even further ahead in performance and battery life.* *Compared with the previous generation.",
  categories: ["Name Brands", "Apple", "Mac"],
  popularity: 21442,
  free_shipping: true,
  hierarchicalCategories: {
    lvl0: "Name Brands",
    lvl1: "Name Brands > Apple",
    lvl2: "Name Brands > Apple > Mac",
  },
  onSale: false,
  price: 1299.99,
  price_range: "500 - 2000",
  seller: "RandomSeller#7",
  type: "Apple",
  url: "https://api.bestbuy.com/click/-/8532557/pdp",
  rating: 4,
  ratingsNumber: 397,
  newPrice: 1299.99
};


const carouselRelated = document.querySelector(".carousel-container")
const titleRelated = document.createElement("h2")
titleRelated.classList.add('h2-titleRelated')
titleRelated.innerText = "Because you purchase of Apple Mac Pro"
carouselRelated.before(titleRelated)



searchRelated.addWidgets([
  configure({
    hitsPerPage: 8,
    query: '',
  }),
  EXPERIMENTAL_configureRelatedItems({
    hit: referenceHit,
    matchingPatterns: {
      brand: { score: 3 },
      categories: { score: 2 },
    },
  }),
  hits({
    container: '.carousel-container',
    templates: {
      item: (hit) => `
     
      <div class="card-wrapper">
          <div class="img-hit">
            <img src="${hit.image}" align="left" alt="${hit.name}" class="hit-img" />
          </div>
          <div class="hit-name">
          ${hit.brand}
          </div>
          <div class="hit-description">
          ${hit.name}
          </div>
          <div class="hit-rating-price">
            <div class="hit-ratings">${ratings(hit.rating)} <p>(${hit.ratingsNumber})</p></div>
            <div class="hit-price">$${hit.price}</div>
          </div>
        </div>
        
      `

    }
  }),
]);

searchRelated.start()

const ratings = (hit) => {
  console.log(hit)
  switch (hit) {
    case hit = 0:
      return `<div>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      </div>`
      break;
    case hit = 1:
      return `<div>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      </div>`
      break;
    case hit = 2:
      return `<div>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      </div>`
      break;
    case hit = 3:
      return `<div>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      </div>`
      break;
    case hit = 4:
      return `<div>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i>
      </div>`
      break;
    case hit = 4:
      return `<div>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      </div>`
      break;
    default:
      return 'No ratings yet for this product'
      console.log('Erreur cas inconnu');
  }

}