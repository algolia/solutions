import { connectHits } from 'instantsearch.js/es/connectors';

const renderQSHits = ({ widgetParams, hits, results }, isFirstRender) => {
  const recentSearches = widgetParams.recentSearches.getRecentSearches(
    results?.query
  );

  // Merge recent searches with quey suggestions, with a max of 5 recent searches
  // Queries found in the recent searches and the QS will be deduplicated and only the recent search ones will appear

  const toDisplay = [
    ...recentSearches
      .slice(0, 5)
      .map(recent => ({ ...recent, isRecent: true })),
    ...hits.filter(
      hit => !recentSearches.find(recent => recent.query === hit.query)
    ),
  ];

  document.querySelector(widgetParams.container).innerHTML = `
    <ul>
    ${toDisplay
      .map(
        hit => `
                <li><a href="./search.html?instant_search%5Bquery%5D=${
                  hit.query
                }">${hit.query}</a>${
          hit.isRecent ? '<span style="font-size: 14px"> (Recent)</span>' : ''
        }</li>
            `
      )
      .join('')}
    </ul>
    `;
};

export const QSHits = connectHits(renderQSHits);
