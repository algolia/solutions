# Facet selection - autofilter (using params.explain)

[Run on CodeSandbox](https://codesandbox.io/s/github/algolia/solutions/tree/master/facet-selection-autofilter)

## Get started

To run this project locally, install the dependencies and run the local server:

```sh
npm install
npm start
```

Alternatively, you may use [Yarn](https://http://yarnpkg.com/):

```sh
yarn
yarn start
```

Open http://localhost:3000 to see your app.

## Requirements

This solution requires you to have a query rule like this set up:

```json
{
  "conditions": [
    {
      "pattern": "{facet:categories}",
      "anchoring": "contains",
      "alternatives": true
    }
  ],
  "consequence": {
    "params": {
      "automaticFacetFilters": [
        {
          "facet": "categories"
        }
      ]
    },
    "filterPromotes": true
  },
  "enabled": true,
  "objectID": "auto-facet-categories"
}
```
