# Programmatic and personalized content carousel

[Run on CodeSandbox](https://codesandbox.io/s/github/algolia/solutions/tree/master/content-carousel-personalized-demo)

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
  "userToken": "relevant_user_token",
  "configure": {
    "hitsPerPage": 10,
    "enablePersonalization": true,
  },
  "objectID": "61606000"
}
```

You also need to make sure that `userToken` is set up in [`attributesForFaceting`](https://www.algolia.com/doc/api-reference/api-parameters/attributesForFaceting/).
