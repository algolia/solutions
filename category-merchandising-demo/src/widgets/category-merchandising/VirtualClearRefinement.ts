import { connectClearRefinements } from 'instantsearch.js/es/connectors';

const renderVirtualClear = ({ refine }) => {
  window.addEventListener('clearRefinements', () => {
    refine();
  });
};

export const virtualClear = connectClearRefinements(renderVirtualClear);
