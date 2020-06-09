let appID = '932LAAGOT3';
let apiKey = '6a187532e8e703464da52c20555c37cf';

const search = instantsearch({
  indexName: 'atis-prods',
  searchClient: algoliasearch(appID, apiKey),
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 12,
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: `
            <div class="item">
                <figure class="hit-image-container"><div class="hit-image-container-box"><img class="hit-image" src="{{largeImage}}" alt=""></div></figure>
                <p class="hit-category">&#8203;​</p>
                <div class="item-content">
                    <p class="brand hit-tag">{{{_highlightResult.brand.value}}}</p>
                    <p class="name">{{{_highlightResult.name.value}}}</p>
                    <div class="hit-description">{{{price}}}<b class="hit-currency">€</b></div>
                </div>
            </div>
            <br>`,
    },
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: '',
    showReset: true,
    showSubmit: true,
    showLoadingIndicator: true,
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats-container',
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#brand',
    attribute: 'brand',
    limit: 5,
    showMore: true,
    searchable: true,
    searchablePlaceholder: 'Search our brands',
  })
);

search.start();
