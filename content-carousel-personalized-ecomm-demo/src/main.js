import instantsearch from "instantsearch.js";
import algoliasearch from "algoliasearch";
import { configure, index } from "instantsearch.js/es/widgets";
import { carousel } from "./carousel";

const searchClient = algoliasearch(
  "H15E474HQJ",
  "a74e88d5ceb60cc33383489932a000ab"
);

const search = instantsearch({
  indexName: 'e_commerce',
  searchClient,
});

const userTokenSelector = document.getElementById("user-token-selector");
userTokenSelector.addEventListener("change", () => {
  userTokenSelector.disabled = true;
  search.removeWidgets(carouselWidgets);
  getCarouselConfigs().then((carousels) => {
    console.log(carousels)
    userTokenSelector.disabled = false;
    carouselWidgets = createWidgets(carousels);
    search.addWidgets(carouselWidgets);
  });
});

function getUserToken() {
  return userTokenSelector.value;
}

function getCarouselConfigs() {
  return searchClient
    .initIndex("carousel_config")
    .search("", {
      facetFilters: ['userToken:' + getUserToken()],
      attributesToHighlight: [],
      attributesToRetrieve: ["title", "indexName", "configure"],
    })
    .then((res) => res.hits);
}

let carouselWidgets = [];
function createWidgets(carousels) {
  console.log(carousel)
  const container = document.querySelector("#stacked-carousels");

  container.innerText = "";

  return carousels.map((carouselConfig) => {
    console.log(carouselConfig)
    const carouselContainer = document.createElement("div");
    carouselContainer.className = "carousel";

    const indexWidget = index({
      indexName: carouselConfig.indexName,
      indexId: carouselConfig.objectID,
    });

    if (carouselConfig.configure) {
      console.log(carouselConfig.configure)
      indexWidget.addWidgets([
        configure({
          ...carouselConfig.configure,
          userToken: getUserToken(),
        }),
      ]);
    }

    indexWidget.addWidgets([
      carousel({
        title: carouselConfig.title,
        container: carouselContainer,
      }),
    ]);

    container.appendChild(carouselContainer);
    return indexWidget;
  });
}

// retrieve the carousel configuration once
getCarouselConfigs().then((carousels) => {
  userTokenSelector.disabled = false;
  carouselWidgets = createWidgets(carousels);
  console.log(carousels)
  search.addWidgets(carouselWidgets);
  console.log(carouselWidgets)
  search.start();
});
