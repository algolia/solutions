class QRPoweredLanesWidget {
  constructor(options) {
    Object.assign(this, options);
  }

  render(options) {
    let client = algoliasearch(this.appID, this.apiKey);
    let index = client.initIndex(this.indexName);
    let lanesDomElement = document.querySelector(this.container);
    let lanes = [];

    lanes = options.results.userData[0].lanes;
    lanes.sort(function(a, b) {
      return a.position - b.position;
    });

    lanes.forEach(lane => {
      //To create the dom
      let laneDiv = document.createElement("div");
      laneDiv.classList.add("lane");

      let label = document.createElement("p");
      label.classList.add("label");
      label.innerHTML = lane.label;
      laneDiv.append(label);

      let innerLaneDiv = document.createElement("div");
      innerLaneDiv.classList.add("inner-lane");
      laneDiv.append(innerLaneDiv);

      let aisHits = document.createElement("div");
      aisHits.classList.add("ais-Hits");
      innerLaneDiv.append(aisHits);

      let aisHitsList = document.createElement("ol");
      aisHitsList.classList.add("ais-Hits-list");
      aisHits.append(aisHitsList);

      index.search(
        {
          query: "",
          hitsPerPage: lane.nbProducts,
          ruleContexts: [lane.ruleContext]
        },
        (err, res) => {
          displayHits(
            res,
            aisHitsList,
            this.template
          );
        }
      );

      lanesDomElement.append(laneDiv);
    });
  }
  
}



function displayHits(res, container, template) {
  let hits = res.hits;

  container.innerHTML = "";
  if (hits.length > 0) {
    var regexGroup = new RegExp("(?<={{).+?(?=}})", "gm"); //Regex to match 'text' inside {{}}
    var regexGlobal = new RegExp("{{(.*?)}}", "gm"); //Regex to match '{{text}}'
    var foundAttributes = template.match(regexGlobal); //Array of all the {{text}}
    for (let i = 0; i < hits.length; i++) {
      let element = document.createElement("li");
      element.classList.add("ais-Hits-item");

      let newTemplate = template;
      foundAttributes.forEach(globalAttr => {
        let attr = globalAttr.match(regexGroup)[0]; //Getting only the text inside the {{}}
        newTemplate = newTemplate.replace(globalAttr, resolve(attr, hits[i])); //Replace the template value by the real value from Algolia
      });

      element.innerHTML = newTemplate;
      container.append(element);
    }
  }
}

function resolve(path, obj = self, separator = ".") {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export default QRPoweredLanesWidget;
