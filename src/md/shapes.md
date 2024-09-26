---
type: Documentation
prefLabel: Get Data Shapes
---

Get a single item with specified keys:

```
let ref = await db.get('hummus', {
  "ingredient": ""
})
ref = {
  "@id": "hummus",
  "ingredient": ["chickpeas", "lemon"]
}
```