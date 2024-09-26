---
type: Documentation
prefLabel: Applications
---

```
const appConfig = {
  redirect_uri,
  client_id
}
const app = solidApp(appConfig)
const db = app.webID(url)
<!-- or -->
const db = app.provider(URL)
```

Other applications exist too, for non-SOLID SPARQL providers:

```
const appConfig = {
  endpoint,
  username,
  password
}
const app = sparqlApp(appConfig)
const db = app()
```

Or even local-first solutions for keeping all data on-device:

```
const app = localApp()
const db = app()
```

> If we store a local cache to speed up requests, how can that cache (which we can set locally without being authenticated) interact with the remote store in a unauthenticated session?

<p><mark>Assme something like, SPARQL endpoint or Local storage; we can persist multiple graphs seperate from each other as named graphs. Do we want to do that by default? Do we want to segregate them by db id or app id?
</mark></p>