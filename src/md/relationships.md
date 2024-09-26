---
type: Documentation
prefLabel: Relationships
next:
  - get-relationships
  - get-reverse
---

Entities can be related to each other.

```
let hummus = await db.post("hummus", {
  "@type": "Dish"
})
let chickpeas = await db.post("chickpeas", {
  "@type": "Ingredient",
  "aka": "Garbanzo Beans"
})

let ref = await db.put('hummus, {
  "ingredient": {
    "@id": "chickpeas"
  }
})
ref = {
  "@id": "hummus",
  "@type": "Dish",
  "ingredient": "chickpeas"
}
```