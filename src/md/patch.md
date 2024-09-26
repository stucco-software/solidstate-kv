---
type: Documentation
prefLabel: Patch
---

Add a value to a key with `db.patch`

```
let ref = await db.patch('hummus', {
  ingredient: "Lemon",
})
ref = {
  "@id": "hummus",
  "@type": "Dish",
  "ingredient": ["Chickpeas", "Lemon"]
}
```