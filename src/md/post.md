---
type: Documentation
prefLabel: Post
---

Use `db.post` to replace an entire entity with a new value:

```
let ref = await db.post("hummus", {
  "@type": "Dish",
  "ingredient": "Garbanzo Beans"
})
ref = {
  "@id": "hummus",
  "@type": "Dish",
  "ingredient": "Garbanzo Beans"
}
```