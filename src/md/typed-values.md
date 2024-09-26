---
type: Documentation
prefLabel: Typed Values
---

Values can be strings, booleans, and numbers. Types can be specified as well:

```
db.put("chickpeas", {
  "aka": {
    "@type": string,
    "@value": "Garbs"
  }
})
db.put("chickpeas", {
  "gramsPerUnit": {
    "@type": number,
    "@value": 42
  }
})
db.put("chickpeas", {
  "vegetarian": {
    "@type": boolean,
    "@value": true
  }
})
```

Values can also be typed as `date`, `time`, `datTime`, `uri`, `integer`, `float`, `decimal`, or `double`.