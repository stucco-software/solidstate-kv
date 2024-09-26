<script type="text/javascript">
  import EditableCode from '$lib/EditableCode.svelte'
  import snippet from '$lib/snippets/localApp.js?raw'
  // import { localApp } from '$lib/solidstate-kv'
  import { onMount } from 'svelte'

  export let data
//   const app = localApp()
//
//   onMount(async () => {
//     const db = await app()
//     window.db = db
//   })

</script>
 <h1>
  KV Playground
</h1>
<p>
  Back to the <a href="/"><code>Solid State KV Docs</code></a>
</p>

<EditableCode src={snippet} />
