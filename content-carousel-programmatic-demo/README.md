# Programmatic content carousel

[Run on CodeSandbox](https://codesandbox.io/s/github/algolia/solutions/tree/master/content-carousel-programmatic-demo)

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

A separate index for the carousel configurations (which can use query rules or personalization). An example record for that index is:

```json
{
  "title": "Just for you",
  "indexName": "perso_movies_carousel",
  "configure": {
    "hitsPerPage": 10,
    "enablePersonalization": true,
    "userToken": true
  },
  "objectID": "61606000"
}
```
