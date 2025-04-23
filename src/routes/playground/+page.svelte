<script type="text/javascript">
  import {onMount} from 'svelte'
  import SolidState from '$lib/solidstate-kv'
  import EditableCode from '$lib/EditableCode.svelte'

  import initDB from '$lib/snippets/localApp.js?raw'
  import setEntity from '$lib/snippets/setEntity.js?raw'

  export let data

  let writeDB = `{
  version: "0.0.1",
  persister: persist,
  post: fn,
  put: fn,
  get: fn
}`

  let refHummus
  let hummus = {
    "@type": "Food",
    "name": "Hummus",
    "ingredient": ["Garbanzo Beans", "Lemon"]
  }
  let refChickpeas
  let chickpeas = {
    "@id": "chickpeas",
    "@type": "Ingredient",
    "name": "Chickpeas"
  }

  let refHummusUpdate = "…"
  let hummusUpdate = {
    "ingredient": ["Chickpeas", "Lemon"]
  }

  let refHummusPatch = "…"
  let hummusPatch = {
    "ingredient": "Olive Oil"
  }
  const run = async (db) => {
    refHummus = await db.post(hummus)
    refChickpeas = await db.post(chickpeas)
    refHummusUpdate = await db.put(refHummus['@id'], hummusUpdate)
    refHummusPatch = await db.patch(refHummus['@id'], hummusPatch)
    let clear = await db.clear()
  }
  onMount(async () => {
    let db = await SolidState()
    console.log(db)
    run(db)
  })


  const r = (json) => JSON.stringify(json, null, 2)
</script>
 <h1>
  KV Playground
</h1>
<p>
  Back to the <a href="/"><code>Solid State KV Docs</code></a>
</p>

<h2>Initialize the Database</h2>

<p>
  To create a local database, call the `SolidState()` function.
</p>

<pre><code>
import SolidState from '$lib/solidstate-kv'
const db = SolidState()
</code></pre>

This will return
<pre>
// db
{writeDB}
</pre>

<h2>Write Data</h2>

<h3>Create A new Entity</h3>

Write a new document to the store with <code>db.post()</code>

<pre><code>
let ref = await db.post({r(hummus)})
</code></pre>

This will return a copy of the document.

<pre><code>
// ref
{JSON.stringify(refHummus, null, 2)}
</code></pre>

Note that we have a new property, <code>@id</code>. This is a generated UUID, but you can also provide your own, so long as it's unique to this entity.

<pre><code>
let ref = await db.post({r(chickpeas)})
</code></pre>

<pre><code>
// ref
{r(refChickpeas)}
</code></pre>

<h3>Update an Entity</h3>

Update an Entity with the <code>db.put()</code> function, passing the Entities <code>@id</code> as the first parameter, and the new keys as the second.

<pre><code>
{#if refHummus}
  let ref = await db.put("{refHummus['@id']}", {r(hummusUpdate)})
{/if}
</code></pre>

This will return the entire updated Entity:
<pre><code>
// ref
{r(refHummusUpdate)}
</code></pre>

Add to the existing value of an Entity with <code>db.patch()</code>.

<pre><code>
{#if refHummus}
  let ref = await db.patch("{refHummus['@id']}", {r(hummusPatch)})
{/if}
</code></pre>

This will return the entire updated Entity:
<pre><code>
// ref
{r(refHummusPatch)}
</code></pre>