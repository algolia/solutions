# rule-powered-content-shelves

Create a Query Rules with:

- Condition: empty query + "get_shelves" as a `ruleContext`
- Consequence: "Return custom data" that returns the type of object below

```json
{
  "shelves": [
    {
      "position": 2,
      "label": "Christmas Selection",
      "nbProducts": 8,
      "ruleContext": "shelf_christmas_selection"
    },
    {
      "position": 4,
      "label": "Pick of the Month",
      "nbProducts": 8,
      "ruleContext": "shelf_picks_month"
    },
    {
      "position": 3,
      "label": "St Patrick Must Have",
      "nbProducts": 8,
      "ruleContext": "shelf_st_patrick"
    },
    {
      "position": 2,
      "label": "On Sale",
      "nbProducts": 8,
      "ruleContext": "shelf_promotion"
    }
  ]
}
```

- `position` is the position of the shelf in the UI
- `label` is the label of the shelf that will be displayed just above it
- `nbProducts` is the number of products that will be displayed in the shelf
- `ruleContext` is the context that will be used to trigger another Query Rules that has other consequences
