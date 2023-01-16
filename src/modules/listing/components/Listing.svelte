<script lang="ts">
  import { useStore } from '$storeon'
  import Pagination from '$core/components/Pagination.svelte'
  import Poster from '$core/components/Poster.svelte'

  import { getListing } from '../services/getListing'

  import type { SearchStore } from '$storeon/@types/SearchStore'

  export let section: keyof SearchStore['search'] | 'tag'
  export let page: number
  export let tagKey: string = ''

  const prefix =
    section === 'listing'
      ? '/listing/'
      : section === 'tag'
      ? `/tag/${tagKey}/`
      : '/'

  const { search } = useStore('search')
</script>

{#await getListing(page, section === 'tag' ? tagKey : $search[section].query, section)}
  <div class="p-32 flex flex-col items-center">
    <progress class="progress w-56" />
    <p class="text-base-content text-sm pt-2">Loading...</p>
  </div>
{:then { items, maxPage }}
  <section class="flex justify-center py-6">
    <Pagination max={maxPage} current={page} {prefix} />
  </section>

  <section class="grid grid-cols-2 gap-4 items-center px-4">
    {#each items as hentai}
      <a href={`/g/${hentai.id}`}>
        <Poster {hentai} />
      </a>
    {/each}
  </section>

  <section class="flex justify-center py-6">
    <Pagination max={maxPage} current={page} {prefix} />
  </section>
{:catch}
  <p>Failed</p>
{/await}
