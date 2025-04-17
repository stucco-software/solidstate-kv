<script type="text/javascript">
  import SolidState from '$lib/solidstate-kv'
  import EditableCode from '$lib/EditableCode.svelte'

  import initDB from '$lib/snippets/localApp.js?raw'
  import setEntity from '$lib/snippets/setEntity.js?raw'

  export let data


  let db = SolidState()
  console.log(db)
  let writeDB = `{
  version: "0.0.1",
  persister: persist,
  post: fn
}`

  let refHummus
  let hummus = {
    "@type": "Food",
    "name": "Hummus",
    "ingredient": "Chickpeas and Lemon"
  }
  let refChickpeas
  let chickpeas = {
    "@id": "chickpeas",
    "@type": "Ingredient",
    "name": "Chickpeas",
    "ingredient": "Chickpeas and Lemon"
  }
  const run = async () => {
    refHummus = await db.post(hummus)
    refChickpeas = await db.post(chickpeas)
  }
  run()

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
{JSON.stringify(refChickpeas, null, 2)}
</code></pre>


