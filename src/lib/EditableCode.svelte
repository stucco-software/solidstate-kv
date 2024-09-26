<script>
  import { onMount } from 'svelte';

  export let src

  let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

  let result = '…'

  onMount(async () => {
    let fn = new AsyncFunction(src)
    result = await fn()
  })

  $: {
    try {
      let fn = new AsyncFunction(src.replace(/&gt;/ig, '>'))
      fn().then(r => result = r).catch(e => result = e)
    } catch (e) {
      result = `…`
    }
  }

  $: {
    if (typeof result === 'object') {
      try {
        result = JSON.stringify(result, null, '  ')
      } catch {
        result = "…"
      }
    }
  }

</script>

<div class="container">
<pre><code
  bind:innerHTML={src}
  contenteditable="true">
</code></pre>
<pre><code>{ result }</code></pre>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--txt-color);
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  pre {
    margin: 0;
    max-height: 75vh;
  }
  pre:first-of-type {
    border-right: 1px solid var(--txt-color);
  }
  pre:last-of-type {
    border-top: 1px solid var(--txt-color);
  }
  code:focus {
    outline: none;
  }
</style>