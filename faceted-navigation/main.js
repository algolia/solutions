let appID = "latency";
let apiKey = "af044fb0788d6bb15f807e4420592bc5";

const search = instantsearch({
  indexName: "instant_search_solutions_ecommerce",
  searchClient: algoliasearch(appID, apiKey)
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 12
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results",
      item(hit) {
        return `
        <div class="item">
                <figure class="hit-image-container"><div class="hit-image-container-box"><img class="hit-image" src="${hit.image}" alt=""></div></figure>
                <p class="hit-category">&#8203;​</p>
                <div class="item-content">
                    <p class="brand hit-tag">${hit._highlightResult.brand ? hit._highlightResult.brand.value : ''}</p>
                    <p class="name">${hit._highlightResult.name.value}</p>
                    </div>
                    <div class="hit-description"><b class="hit-currency">$</b>${hit.price}</div>
            </div>
            <br>`;
      }
    }
  })
);


search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox"
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats-container"
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#brand",
    attribute: "brand",
    limit: 5,
    showMore: true,
    searchable: true,
    searchablePlaceholder: "Search our brands"
  })
);

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#price',
    attribute: 'price',
    pips: !1,


    tooltips: {
      format: function (rawValue) {
        return Math.round(rawValue).toLocaleString().concat("$")
      }
    },
    cssClasses: {
      root: ['rheostat', 'DefaultProgressBar_progressBar'],
      handle: [
        'DefaultHandle_handle'
      ],
      tooltip: 'rheostat-value'
    },
  })

);

// 1. Create a render function
const renderRefinementList = (renderOptions, isFirstRender) => {
  const {
    items,
    refine,
    createURL,
    isShowingMore,
    toggleShowMore,
    widgetParams,
  } = renderOptions;
  
  //Do some initial rendering and bind events
  if (isFirstRender) {
    const ul = document.createElement('ul');
    const button = document.createElement('button');
    button.classList.add('btn-showMore')
    button.textContent = 'Show more';

    button.addEventListener('click', () => {
      toggleShowMore();
    });

    widgetParams.container.appendChild(ul);
    widgetParams.container.appendChild(button);
  }

  //Render the widget
  widgetParams.container.querySelector('ul').innerHTML = items
    .map(
      item => `
        <li style="${isRefined(item)}">
          <a
            href="${createURL(item.value)}"
            data-value="${item.value}"
          >
            ${item.label} (${item.count})
          </a>
        </li>
      `
    )
    .join('');

  [...widgetParams.container.querySelectorAll('a')].forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      refine(event.currentTarget.dataset.value);
    });
  });

  const button = widgetParams.container.querySelector('button');
  button.textContent = isShowingMore ? 'Show less' : 'Show more';
};

function isRefined(item) {
  if (item.isRefined) {
    return 'font-weight: bold; background-color: rgba(83,101,252, 0.5)'
  }
}

// 2. Create the custom widget
const customRefinementList = instantsearch.connectors.connectRefinementList(
  renderRefinementList
);

// 3. Instantiate
search.addWidgets([
  customRefinementList({
    container: document.querySelector('#guided-search-facets'),
    attribute: 'categories',
    showMoreLimit: 40,
  })
]);

search.start();
