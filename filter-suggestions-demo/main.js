/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'LHZDI5DUPD',
  '1c4c35589b99e4c4d5b3af4af86aed89'
);

const search = instantsearch({
  indexName: 'related_categories_example',
  routing: false,
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for items',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit) => `
            <div class="item">
                <figure class="hit-image-container"><div class="hit-image-container-box"><img class="hit-image" src="${
                  hit.image
                }" alt=""></div></figure>
                <p class="hit-category">&#8203;​</p>
                <div class="item-content">
                    <p class="brand hit-tag">${
                      hit._highlightResult.brand
                        ? hit._highlightResult.brand.value
                        : ''
                    }</p>
                    <p class="name">${hit._highlightResult.name.value}</p>
                    <div class="hit-description"><b class="hit-currency">$</b>${
                      hit.price
                    }</div>
                </div>
            </div>
            <br>
`,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
  instantsearch.widgets.stats({
    container: '#stats-container',
  }),
  instantsearch.widgets.refinementList({
    container: '#categories',
    attribute: 'categories',
  }),
  instantsearch.widgets.queryRuleContext({
    trackedFilters: {
      categories: (values) => values,
    },
  }),
  instantsearch.widgets.queryRuleCustomData({
    container: '#additional-categories',
    transformItems: function (items) {
      if (items.length > 0) {
        let transformedFilters = items[0].filters.map(function (item) {
          if (typeof item.filter === 'object') {
            item.filter = JSON.stringify(item.filter);
          }
          return item;
        });
        return [{ filters: transformedFilters }];
      } else {
        return items;
      }
    },
    templates: {
      default: `
      {{#items}}
        {{#filters}}
          <button class="additional-filter" data-filter="{{filter}}" data-filter-type="{{type}}", data-clear-filters="{{clear}}">{{name}}</button>
        {{/filters}}
      {{/items}}
      `,
    },
  }),
]);

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('additional-filter')) {
    let helper = search.helper;
    let data = event.target.dataset;
    let filter = JSON.parse(data.filter);
    if (data.clearFilters == 'true') {
      helper.clearRefinements();
    }

    if (data.filterType === 'disjunctive') {
      helper.addDisjunctiveFacetRefinement(filter.attribute, filter.value);
    }
    if (data.filterType === 'numeric') {
      helper.removeNumericRefinement(filter.attribute);
      helper.addNumericRefinement(
        filter.attribute,
        filter.operator,
        filter.value
      );
    }

    helper.search();
  }
});

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#price',
    attribute: 'price',
    pips: !1,

    tooltips: {
      format: function (rawValue) {
        return Math.round(rawValue).toLocaleString().concat('$');
      },
    },
    cssClasses: {
      root: ['rheostat', 'DefaultProgressBar_progressBar'],
      handle: ['DefaultHandle_handle'],
      tooltip: 'rheostat-value',
    },
  })
);

search.start();
