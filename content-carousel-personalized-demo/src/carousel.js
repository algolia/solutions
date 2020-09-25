import { connectHits } from 'instantsearch.js/es/connectors';

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
});
