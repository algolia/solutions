import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';
import { configure, hits, EXPERIMENTAL_configureRelatedItems } from 'instantsearch.js/es/widgets';
import contentCarousel from "./content-carousel/content-carousel.js";

const search = instantsearch({
  indexName: "e_commerce_transformed",
  searchClient: algoliasearch("GENYJWQIK2", "a847d02d26f1276fbb0281a7e51ee8a5"),
});


const referenceHit = {
  objectID: "8532557",
  brand: 'Apple',
  image: '"https://cdn-demo.algolia.com/bestbuy-0118/8532557_sb.jpg"',
  name: '"Apple - MacBook Pro with Retina display - 13.3" Display - 8GB Memory - 128GB Flash Storage - Silver"',
  description: "With fifth-generation Intel Core processors, the latest graphics, and faster flash storage, the incredibly advanced MacBook Pro with Retina display moves even further ahead in performance and battery life.* *Compared with the previous generation.",
  categories: [ "Name Brands", "Apple", "Mac" ],
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


// RULES CAROUSEL
search.addWidgets([
  configure({
    hitsPerPage: 8,
    ruleContexts: ["get_carousels"],
    enablePersonalization: true,
    userToken: 'apple_fan',
  }),
  EXPERIMENTAL_configureRelatedItems({
    hit: referenceHit,
    ruleContexts: ["carousel_related"],
    matchingPatterns: {
      brand: { score: 3 },
      categories: { score: 2 },
    },
  }),
  contentCarousel({
    container: "#carousel",
    template: `
    <div class="item">
    <figure class="hit-image-container"><div class="hit-image-container-box"><img class="hit-image" src="{{image}}" alt=""></div></figure>
    <p class="hit-category">&#8203;​</p>
    <div class="item-content">
    <p class="brand hit-tag">{{{_highlightResult.brand.value}}}</p>
    <p class="name">{{{_highlightResult.name.value}}}</p>
    <div class="hit-description">{{{price}}}</div>
    </div>
    </div>
    `,
  }),
]);

search.start();

// RELATED ITEMS
// Add the widgets
// search.addWidgets([
//   configure({
//     hitsPerPage: 8,
//     query: '',
//   }),
  // EXPERIMENTAL_configureRelatedItems({
  //   hit: referenceHit,
  //   matchingPatterns: {
  //     brand: { score: 3 },
  //     categories: { score: 2 },
  //   },
  // }),
  // hits({
  //   container: ".carousel-related",
  //   templates: {
  //     item: (hit) => `
  //     <div class="card-wrapper">    
  //         <div class="img-hit">
  //           <img src="${hit.image}" align="left" alt="${hit.name}" class="hit-img" />
  //         </div>
  //         <div class="hit-name">
  //         ${hit.brand}
  //         </div>
  //         <div class="hit-description">
  //         ${hit.name}
  //         </div>
  //         <div class="hit-rating-price">
  //           <div class="hit-ratings"> <p> (${hit.ratingsNumber})</p></div>
  //           <div class="hit-price">$${hit.price}</div>
  //         </div>
  //       </div>
  //     `
    
  //   }
  // }),
// ]);

// const carouselRelated = document.querySelector(".carousel-related")
// const titleRelated = document.createElement("h2")
// titleRelated.innerText = "Because you purchase of Apple Mac Pro"
// carouselRelated.before(titleRelated)