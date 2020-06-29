import { connectHits } from 'instantsearch.js/es/connectors';

const renderProductCarousel = ({ widgetParams, hits }, isFirstRender) => {
  document.querySelector(widgetParams.container).innerHTML = `
            <ul class="product-carousel">
                ${hits
                  .map(
                    hit => `
                    <li>
                        <article class="hit">
                    <header class="hit-image-container">
                        <img src="${hit.image}" alt="${hit.name.replace(
                      '"',
                      "'"
                    )}" class="hit-image">
                    </header>

                    <div class="hit-info-container">
                        <p class="hit-category">${hit.categories[0]}</p>
                        <h1>${hit.name}</h1>
                        <footer>
                        <p>
                            <span class="hit-em">$</span> <strong>${
                              hit.price
                            }</strong>
                            <span class="hit-em hit-rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 16 16">
                            <path fill="#e2a400" fill-rule="evenodd" d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"/>
                            </svg>
                            ${hit.rating}
                            </span>
                        </p>
                        </footer>
                    </div>
                </article>
                    </li>
            `
                  )
                  .join('')}
            </ul>
        `;
};

export const productCarousel = connectHits(renderProductCarousel);
