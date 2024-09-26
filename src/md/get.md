---
type: Documentation
prefLabel: Getting Entities
hasPart:
  - shapes
  - get-relationships
  - get-reverse
---

Get a single item by `@id` with `db.get`

```
let ref = await db.get('hummus')
ref = {
  "@id": "hummus",
  "@type": "Dish",
  "name": "Hummus",
  "ingredient": ["chickpeas", "lemon"]
}
```