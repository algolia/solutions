/* eslint-disable camelcase */
/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
  // onStateChange(...args) {
  //   console.log(args);
  // },
});

function taggedTemplateNoop(strings, ...keys) {
  const lastIndex = strings.length - 1;
  return (
    strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], '') +
    strings[lastIndex]
  );
}
const html = taggedTemplateNoop;

const templates = {
  'images-image'(item) {
    console.log(item);
    return html`
      ${item.layout_type}:
      <pre>${JSON.stringify(item.displayed_attributes, null, 2)}</pre>
    `;
  },
  'logo-text'(item) {
    console.log(item);
    return html`
      ${item.layout_type}:
      <pre>${JSON.stringify(item.displayed_attributes, null, 2)}</pre>
    `;
  },
  'images-text'({
    displayed_attributes: {
      name,
      logo_url,
      page_url,
      layout_label,
      promoted_items,
    },
  }) {
    return html`
      <p>
        <a href="${page_url}">
          <img
            src="${logo_url}"
            alt="${name}"
            style="height: 1em;vertical-align: middle"
          />${layout_label}
        </a>
      </p>
      <ul>
        ${promoted_items
          .map(
            promoted => html`
              <li>
                <a href="${promoted.product_page_url}">
                  <img
                    src="${promoted.thumbnail_url}"
                    alt="${promoted.product_name}"
                    style="height: 5em"
                  />
                  <p>${promoted.product_name}</p>
                </a>
              </li>
            `
          )
          .join('')}
      </ul>
    `;
  },
};

// TODO: turn filters into optional filtesr
// TODO: finish the three layouts
search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets
    .index({ indexName: 'instant_search_promotions' })
    .addWidgets([
      instantsearch.widgets.configure({
        page: 0,
        hitsPerPage: 1,
      }),
      instantsearch.widgets.hits({
        container: '#banner',
        templates: {
          item(item) {
            return templates[item.layout_type]?.(item);
          },
          empty: '',
        },
      }),
    ]),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
