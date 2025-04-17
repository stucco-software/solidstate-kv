<script type="text/javascript">
  import { arrayify } from '$lib/arrayify'
  export let data
</script>
<main>

  <h1>{data.prefLabel}</h1>
  {@html data.body}

  <h2>Table of Contents</h2>
    <ol>
      {#each data.hasPart as section}
        <li>
          <a href="#{section.id}">
            {section.prefLabel}
          </a>
          {#if section.hasPart}
            <ol>
              {#each section.hasPart as subsection}
                <li>
                  <a href="#{subsection.id}">
                    {subsection.prefLabel}
                  </a>
                </li>
              {/each}
            </ol>
          {/if}
        </li>
      {/each}
    </ol>

  {#each data.hasPart as section}
    <section id="{section.id}">
      <h2>
        {section.prefLabel}
      </h2>

      {@html section.body}
      {#if section.next}
        <ul>
          {#each arrayify(section.next) as next}
            <li>
              <a href="#{next.id}">{next.prefLabel}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </section>

    {#if section.hasPart}
      {#each section.hasPart as subsection}
        <section id="{subsection.id}">
          <h3>
            {subsection.prefLabel}
          </h3>
          {@html subsection.body}
        </section>
      {/each}
    {/if}
  {/each}

</main>

<footer>
  <p>Part of the <a href="https://rdf.systems/">RDF Systems</a> Project</p>
  <p>
    2024 <a href="https://stucco.software/">Stucco Software</a>
  </p>
</footer>