---
type: Documentation
prefLabel: Get Reverse Relationships
---

Relationships can be reversed:

```
let ref = await db.get('chickpeas', {
  "name": "",
  "usedIn": {
    "@reverse": "ingredient"
  }
})
ref = {
  "@id": chickpeas,
  "usedIn": "hummus"
}
```