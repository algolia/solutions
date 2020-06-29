import { connectSearchBox } from 'instantsearch.js/es/connectors';

const renderFederatedSearchBox = (
  { widgetParams, refine, query },
  isFirstRender
) => {
  const container = document.querySelector(widgetParams.container);

  if (isFirstRender) {
    container.innerHTML = `
        <div class="ais-SearchBox"><form action="" role="search" class="ais-SearchBox-form" novalidate=""><input class="ais-SearchBox-input" type="search" placeholder="Product, brand, color, …" autocomplete="off" autocorrect="off" autocapitalize="off" maxlength="512"><button class="ais-SearchBox-submit" type="submit" title="Submit the search query."><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18"> <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.67" transform="translate(1 1)"> <circle cx="7.11" cy="7.11" r="7.11"></circle> <path d="M16 16l-3.87-3.87"></path> </g> </svg></button><button class="ais-SearchBox-reset" type="reset" title="Clear the search query." hidden=""><svg class="ais-SearchBox-resetIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="10" height="10"> <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path> </svg></button><span class="ais-SearchBox-loadingIndicator" hidden=""><svg class="ais-SearchBox-loadingIcon" width="16" height="16" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#444"> <g fill="none" fillrule="evenodd"> <g transform="translate(1 1)" strokewidth="2"> <circle strokeopacity=".5" cx="18" cy="18" r="18"></circle> <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(337.428 18 18)"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform> </path> </g> </g> </svg></span></form></div>
        `;

    const reset = container.querySelector('.ais-SearchBox-reset');

    container.querySelector('input').addEventListener('input', e => {
      if (e.currentTarget.value) {
        reset.removeAttribute('hidden');
      } else {
        reset.setAttribute('hidden', '');
      }
      refine(e.currentTarget.value);
    });

    reset.addEventListener('click', () => {
      reset.setAttribute('hidden', '');
      refine('');
    });

    container.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      widgetParams.recentSearches.setRecentSearch(
        container.querySelector('input').value,
        container.querySelector('input').value
      );
      window.location.href = `${window.location.origin}${
        window.location.pathname
      }search.html?instant_search%5Bquery%5D=${
        container.querySelector('input').value
      }`;
    });

    window.dispatchEvent(new Event('searchLoaded'));
  }

  document
    .querySelector(widgetParams.container)
    .querySelector('input').value = query;
};

export const federatedSearchBox = connectSearchBox(renderFederatedSearchBox);
