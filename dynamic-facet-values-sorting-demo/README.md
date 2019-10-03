# dynamic-facet-values-sorting-demo

Create a Query Rule with "Return Custom Data" as a consequence that returns this type of object:

```javascript
{
    "facets": {
        "facetName": {
          "sortBy": "alpha:asc"
        },
        "facetName": {
          "sortBy": "count:desc"
        },
        "facetName": {
          "sortBy": "alpha:desc"
        },
        "facetName": {
          "sortBy": "count:desc"
        }
        "facetName": {
          "sortBy": ["male", "female", "unisex"] //It needs to be the values for the facet itself - ordered the way it needs to ordered on the front-end.
        }
     }
}
```