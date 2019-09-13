class HitsWithContent {
  constructor(options) {
    Object.assign(this, options);
  }

  // init(initOptions) {
  //   const hitsWithContentContainer = document.querySelector(this.container);

  //   hitsWithContentContainer.innerHTML = `
  //     <div id="hit-with-content"></div>
  //   `;

  //   //let client = algoliasearch(this.appID, this.apiKey);

  // }

  render(renderOptions) {
    console.log(renderOptions);

    const results = renderOptions.results;
    const userData = results.userData;

    //Appenning custom data at the beginning of the array of results only if it's in the range of the position
    let positionStart = results.page * results.hitsPerPage + 1;
    let positionEnd = results.page * results.hitsPerPage + results.hitsPerPage;

    if (userData != undefined) {
      userData.forEach(element => {
        if (
          element["position"] > positionStart &&
          element["position"] < positionEnd
        ) {
          results.hits.unshift(element);
        }
      });
    }

    //Assigning the real position to the object in case of click and conversion analytics implementation
    let counter = 0;
    results.hits.map(hit => {
      counter++;
      if (hit["injected"] != undefined && hit["injected"] == true) {
        hit._position = hit["position"];
        counter = counter - 1;
      } else {
        hit._position = results.page * results.hitsPerPage + counter;
      }
    });

    let pos = 0;
    let injectedPos = -1;
    let index = 0;

    //Reading the hits from the results and adding them to the DOM + Using the order css attribute (from Flex) to change the position of the injected content
    document.querySelector("#hits").innerHTML = results.hits
      .map(hit => {
        index++;
        if (hit["injected"] != undefined && hit["injected"] == true) { //Template for the injected content
          index = index - 1;
          injectedPos = hit["position"];
          return `<div class="ais-Hits-item" style="order:${injectedPos}">
          <div class="item">
              <div class="centered"><img src="${hit.image}" alt=""></div>
          </div>
          <a class="price" href="${hit.target}">${hit.button}</a>
          </div>
          <br>`;
        } else { //Template for the regular results
          if (injectedPos > -1 && index >= injectedPos) {
            pos = index + 1;
          } else {
            pos = index;
          }
          return `<div class="ais-Hits-item" style="order:${pos}">
                <div class="item">
                    <div class="centered"><img src="${hit.image_link}" alt=""></div>
                    <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                    <div class="item-content">
                        <p class="brand">${hit.brand}</p>
                        <p class="name">${hit._highlightResult.item_title.value}</p>
                    </div>
                </div>
                <p class="price">Price: ${hit.price}</p>
                </div>
                <br>`;
        }
      })
      .join("");
  }
}

export default HitsWithContent;
