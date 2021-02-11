import { connectHits } from 'instantsearch.js/es/connectors';
import onSaleImg from './onsale.png';

export const carousel = connectHits(function renderCarousel(
  { widgetParams: { container, title }, hits },
  isFirstRender
) {
  if (isFirstRender) {
    const section = document.createElement('section');
    container.appendChild(section);
    const h2 = document.createElement('h2');
    h2.innerText = title;
    section.appendChild(h2);
    const ul = document.createElement('ul');
    ul.classList.add('carousel-list-container');
    section.appendChild(ul);
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
});
