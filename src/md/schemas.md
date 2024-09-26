---
type: Documentation
prefLabel: Schemas
---

Entities can be given schemas with the `@type` key. A `@type` can be defined with a schema:

```
let dishSchema = await db.schema("Dish", {
  "name": String,
  "ingredient": ID
})

let ingredientSchema = await db.schema("Ingredient", {
  "name": String,
  "aka": String,
  "vegetarian": Boolean
})
```

Keys can also be given data:

```
let ref = await db.post("vegetarian", {
  "description": "Does this ingredient made entirely from non-animal products?"
})
```

<p><mark>Okay but _why_ would you do this?</mark></p>

Keys can also be given schemas:

```
let vegSchema = await db.schema('vegetarian', {
  "description": String,
  "@domain": "Ingredient",
  "@range": Boolean
})
```

<p><mark>See above. Does this enable static type checking by surfacing errors? Can we use this to do introspection?</mark></p>