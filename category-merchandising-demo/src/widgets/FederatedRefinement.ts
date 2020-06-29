import { connectRefinementList } from 'instantsearch.js/es/connectors';

const renderFederatedRefinement = (
  { widgetParams, items, createURL },
  isFirstRender
) => {
  document.querySelector(widgetParams.container).innerHTML = `
        <ul>
        ${items
          .map(
            item => `
                <li>
                <a
                    href="${
                      widgetParams.menu
                        ? createURL(item.value)
                            .replace(
                              `${window.location.href}`,
                              `${window.location.href}search.html`
                            )
                            .replace('refinementList', 'hierarchicalMenu')
                        : createURL(item.value).replace(
                            `${window.location.href}`,
                            `${window.location.href}search.html`
                          )
                    }"
                    style="font-weight: ${item.isRefined ? 'bold' : ''}"
                >
                    ${item.label} (${item.count})
                </a>
                </li>`
          )
          .join('')}
        </ul>
    `;
};

export const federatedRefinement = connectRefinementList(
  renderFederatedRefinement
);
