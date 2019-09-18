# full-query-rules-powered-lanes

Create a Query Rules with:
Condition: empty query + get_lanes as a ruleContext
Consequence: "Return custom data" that returns this type of object below

```javascript
{
	"lanes": [{
			"position": 2,
			"label": "Christmas Selection",
			"nbProducts": 8,
			"ruleContext": "lane_christmas_selection"
		}, {
			"position": 4,
			"label": "Pick of the Month",
			"nbProducts": 8,
			"ruleContext": "lane_picks_month"
		}, {
			"position": 3,
			"label": "St Patrick Must Have",
			"nbProducts": 8,
			"ruleContext": "lane_st_patrick"
		},
		{
			"position": 2,
			"label": "On Sale",
			"nbProducts": 8,
			"ruleContext": "lane_promotion"
		}
	]
}
```

* position is the position of the lane in the UI
* label is the label of the lane that will be displayed just above it
* nbProducts is the number of products that will be displaed in the lane
* ruleContext is the context that will be used to trigger another Query Rules that has other consequences