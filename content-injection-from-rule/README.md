# Content Injection from Rule

[Run on CodeSandbox](https://codesandbox.io/s/github/algolia/solutions/tree/master/content-injection-from-rule)

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
  "consequence": {
    "userData": {
      "type": "free-return-policy",
      "image_url": "free-return-policy.jpg",
      "link": "https://example.com/landing/free-return-policy.html",
      "size": 2,
      "position": 4
    },
    "filterPromotes": true
  },
  "enabled": true,
  "objectID": "content-injection-from-rule"
}
```
