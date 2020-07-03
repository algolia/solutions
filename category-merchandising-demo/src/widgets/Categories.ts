import { panel, hierarchicalMenu } from 'instantsearch.js/es/widgets';
import { collapseButtonText } from '../templates/panel';

const parameters = new URLSearchParams(window.location.search);

const page = parameters.get('page') || '';

if (!page) {
  document.querySelector('[data-widget="categories"]').style.order = '-1';
}

const header = page ? 'Subcategory' : 'Category';

const rootPath = ((page) => {
  switch (page) {
    case 'phones':
      return 'Cell Phones';
    case 'video_games':
      return 'Video Games';
    case 'Appliances':
      return 'Appliances';
    default:
      return null;
  }
})(page);

const categoryHierarchicalMenu = panel({
  templates: {
    header,
    collapseButtonText,
  },
  collapsed: () => false,
})(hierarchicalMenu);

export const categories = categoryHierarchicalMenu({
  container: '[data-widget="categories"]',
  rootPath,
  attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1'],
});
