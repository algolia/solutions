/**
 * @requires module:instantsearch
 */

import onSaleImg from '../onsale.png';

const renderCarousel = ({ widgetParams, hits }, isFirstRender) => {
  const container = document.querySelector(widgetParams.container);

  if (isFirstRender) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-single');

    container.appendChild(wrapper);

    const carouselTitle = document.createElement('h2');
    carouselTitle.textContent = widgetParams.title;
    wrapper.appendChild(carouselTitle);

    const carouselListContainer = document.createElement('ul');
    carouselListContainer.classList.add('carousels__list-container');
    carouselListContainer.setAttribute('id', widgetParams.context);
    wrapper.appendChild(carouselListContainer);

    wrapper.style.width = `${window.innerWidth -
      wrapper.getBoundingClientRect().left}px`;
  }

  const ul = container.querySelector(`ul#${widgetParams.context}`);
  ul.innerHTML = hits
    .map(
      (hit, index) => `
        <li class="analytics" data-object-id="${hit.objectID}" style="${
        index === hits.length - 1
          ? `padding-right: ${ul.getBoundingClientRect().left + 180}px`
          : ''
      }">
          <div>
            ${
              hit.onSale
                ? `<img class="on-sale" src="${onSaleImg}" alt="">`
                : ''
            }
            <img  src="${hit.image}" alt="${hit.name}">
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
        hit.onSale ? `<span style="color: red">$${hit.newPrice}</span>` : ''
      }</p>
        </div>
        </li>
    `
    )
    .join('');
};

export const customCarousel = instantsearch.connectors.connectHits(
  renderCarousel
);
