import { connectHits } from "instantsearch.js/es/connectors";
// import { configure, hits, EXPERIMENTAL_configureRelatedItems } from 'instantsearch.js/es/widgets';
// import instantsearch from 'instantsearch.js';
// import algoliasearch from 'algoliasearch';


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
    const underline = document.createElement('div')
    underline.classList.add("underline")
    h2.appendChild(underline)
    const ul = document.createElement("ul");
    ul.classList.add("carousel-list-container");
    section.appendChild(ul);
  }

  container.querySelector("ul").innerHTML = hits
    .map(
      (hit) => `
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
          <div class="hit-price">$${hit.price}</div>
        </div>
        </li>
      `
    )
    .join("");
});


const ratings = (hit) =>{
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