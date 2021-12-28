import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { connectInjectedHits } from './connectInjectedHits';

import './InjectedHits.css';

export const InjectedHits = connectHits(
  connectInjectedHits(({ injectedHits }) => (
    <div className="InjectedHits">
      <ul className="InjectedHits-list">
        {injectedHits.map(({ props, type, Hit }, index) => {
          return (
            <li key={index} className={`InjectedHits-${type}`}>
              <Hit {...props} />
            </li>
          );
        })}
      </ul>
    </div>
  ))
);
