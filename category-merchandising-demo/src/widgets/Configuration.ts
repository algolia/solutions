import { configure } from 'instantsearch.js/es/widgets';

const parameters = new URLSearchParams(window.location.search);

const page = parameters.get('page') || '';

const $pageLink = document.querySelector(`[data-page="${page}"]`);

if ($pageLink) {
  $pageLink.parentNode.classList.add('active');
}

const context = ((page) => {
  switch (page) {
    case '':
      return '';
    case 'phones':
      return 'cat_phones';
    case 'video_games':
      return 'cat_video_games';
    case 'appliances':
      return 'cat_appliances';
    default:
      return '';
  }
})(page);

export const configuration = configure({
  attributesToSnippet: ['description:10'],
  snippetEllipsisText: '…',
  removeWordsIfNoResults: 'allOptional',
  ruleContexts: context,
});
