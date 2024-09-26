---
type: Documentation
prefLabel: Delete
---

Delete a key/value pair with `db.delete`

```
let ref = await db.delete(@id, {
  "ingredient": "Lemon",
})
ref = {
  "@id": "hummus",
  "@type": "Dish",
  "ingredient": "Chickpeas"
}
```

Or delete the entire entity

```
let ref = await db.delete('hummus')
ref = null
```