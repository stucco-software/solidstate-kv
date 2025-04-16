---
type: Documentation
prefLabel: DB
---

SolidState is an offline-first, realtime, multiplayer sync engine for RDF triples.

Create a local store:

```
import SolidState from "solidstate"
const db = new SolidState()
```

<p><mark>Assume something like, SPARQL endpoint or Local storage; we can persist multiple graphs seperate from each other as named graphs. Do we want to do that by default? Do we want to segregate them by db id or app id?
</mark></p>


## Replication & Sync

We want to replicate our local store to other devices, as well as servers. Some places where we want to sync things:

1. Other browser sessions. How do our browser sessions find each other?
2. Centralized triplestores, like Jena, Triply, AWS Neptune, or Oxigraph. How do we sync that?
3. Solid PODs attached to WebID, like https://solidid.stucco.software/ How do we sync that?

> Something like `zero` is a microservice that sits in front of a store. `gun.eco` is honestly similar, with peers connecting to a service that handles signalling and persistence. A solidstate microservice would be able to handle the peer-to-peer connections as well as emit events when things change, then provide configuration options to attach to triplestores/pods, as well as manage access control.

Ideally we want ALL OF THE ABOVE AT THE SAME TIME, or at least 1 AND (2 OR 3).

```
// pouch style
const db = new SolidState()
const remote = new SolidState('//triplestore.example.com')
db.sync(remote)

// gun.eco style
const db = SolidState(['//triplestore.example.com'])
// or
const db = SolidState({peers: ['//triplestore.example.com']})
````

## Conflict Resolution

> Create a metadata subgraph to handle either pouch-style commit and revision history _or_ gun.eco style "hypothetical amnesia machine" vector conflicts. It would be cool to have:
> 1. Full subject revision history
> 2. Flat access to most current subject state
