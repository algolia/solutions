import { connectConfigure } from 'instantsearch.js/es/connectors';

// Here to save the currently applied context
let currentContext = '';

const renderContextSetter = ({ widgetParams, refine }, isFirstRender) => {
  const container = document.querySelector(widgetParams.container);

  if (isFirstRender) {
    for (const context of widgetParams.contexts) {
      const button = document.createElement('button');
      button.classList.add('context-filter');
      button.textContent = context.label;
      button.setAttribute('data-context', context.value);

      button.addEventListener('click', () => {
        // Connected to a "virtual" clearRefinement widget, we need this in case some filters are already applied, as it may lead to no results displayed otherwise
        window.dispatchEvent(new Event('clearRefinements'));

        // We're getting the button related to the currently applied context (if one is currently applied)
        const isRefined = document.querySelector(
          `[data-context="${currentContext}"]`
        );

        // If it exists then we are updating it's UI to show that context is not applied anymore
        if (isRefined && isRefined !== button) {
          isRefined.classList.remove('context-filter--is-refined');
        }

        if (currentContext === context.value) {
          // If we're clicking on an already applied context, we un-apply the context
          refine({ ruleContexts: '' });
          currentContext = '';
        } else {
          // else we apply a context
          currentContext = context.value;

          // (we need to clear it first otherwise it will just add the context to the previous one)
          refine({ ruleContexts: '' });
          refine({ ruleContexts: context.value });
        }

        button.classList.toggle('context-filter--is-refined');
      });

      container.appendChild(button);
    }
  }
};

export const contextSetter = connectConfigure(renderContextSetter);
