---
type: Documentation
prefLabel: Persist Data
hasPart:
  - post
  - put
  - patch
  - delete
---

An **Entity** is identified by its `@id`. Create a new item with `db.post`.

```
let ref = await db.post("hummus", {
  "@type": "Food",
  "ingredient": "Chickpeas and Lemon"
})
ref = {
  "@id": "hummus",
  "@type": "Food",
  "ingredient": "Chickpeas and Lemon"
}
```