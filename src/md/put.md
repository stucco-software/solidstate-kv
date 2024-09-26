---
type: Documentation
prefLabel: Put
---

Replace the value of a given key with `db.put`.


```
let ref = await db.put('hummus, {
  "ingredient": "Chickpeas",
})
ref = {
  "@id": "hummus",
  "@type": "Dish",
  "ingredient": "Chickpeas"
}
```

<mark> Put and Post are similar but distinct! Post will replace the entire Entity, but Put will replace jut the specified keys. </mark>