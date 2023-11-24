<script lang="ts">
  import Pagination from '$core/components/Pagination.svelte'
  import Poster from '$core/components/Poster.svelte'

  import { search } from '$nanostores/search'
  import { getListing } from '../services/getListing'
  import { settings } from '$nanostores/settings'

  import type { Search } from '$nanostores/@types/Search'

  export let section: keyof Search | 'tag'
  export let page: number
  export let tagKey: string = ''

  const prefix =
    section === 'listing'
      ? '/listing/'
      : section === 'tag'
      ? `/tag/${tagKey}/`
      : '/'

  $: filteredTags = $settings.filteredTags ?? []
</script>

{#await getListing(page, section === 'tag' ? tagKey : $search[section].query, section, filteredTags)}
  <div class="flex flex-col items-center p-32">
    <progress class="progress w-56" />
    <p class="pt-2 text-sm text-base-content">Loading...</p>
  </div>
{:then { items, maxPage }}
  <section class="flex justify-center py-6">
    <Pagination max={maxPage} current={page} {prefix} />
  </section>

  <section class="grid grid-cols-2 items-center gap-4 px-4">
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
