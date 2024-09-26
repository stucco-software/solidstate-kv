---
type: Documentation
prefLabel: Get Relationships
---

Get related items with specified keys:

```
let ref = await db.get('hummus', {
  "ingredient": {
    "name": "",
    "aka": ""
  }
})
ref = {
  "@id": "hummus",
  "ingredient": [{
    "name": "Chickpeas",
    "aka": ["Garbanzos", "Garbs"]
  },{
    "name": "Lemon"
  }]
}
```