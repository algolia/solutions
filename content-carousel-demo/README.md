# content-carousel

Create a Query Rules with:

- Condition: empty query + "get_carousels" as a `ruleContext`
- Consequence: "Return custom data" that returns the type of object below

```json
{
  "carousels": [
    {
      "position": 2,
      "label": "Christmas Selection",
      "nbProducts": 8,
      "ruleContext": "carousel_christmas_selection"
    },
    {
      "position": 4,
      "label": "Pick of the Month",
      "nbProducts": 8,
      "ruleContext": "carousel_picks_month"
    },
    {
      "position": 3,
      "label": "St Patrick Must Have",
      "nbProducts": 8,
      "ruleContext": "carousel_st_patrick"
    },
    {
      "position": 2,
      "label": "On Sale",
      "nbProducts": 8,
      "ruleContext": "carousel_promotion"
    }
  ]
}
```

- `position` is the position of the carousel in the UI
- `label` is the label of the carousel that will be displayed just above it
- `nbProducts` is the number of products that will be displayed in the carousel
- `ruleContext` is the context that will be used to trigger another Query Rules that has other consequences
