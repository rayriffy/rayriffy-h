<script lang="ts">
  import Pagination from '$core/components/Pagination.svelte'
  import Poster from '$core/components/Poster.svelte'

  import { search } from '$nanostores/search'
  import { settings } from '$nanostores/settings'
  import { api } from '$trpc/client'

  export let section: 'main' | 'listing' | 'tag'
  export let page: number
  export let tagKey: string = ''

  const prefix =
    section === 'listing'
      ? '/listing/'
      : section === 'tag'
        ? `/tag/${tagKey}/`
        : '/'

  $: listing = api.hentai.search.query({
    mode: section,
    query: section === 'tag' ? tagKey : $search[section].query,
    excludeTags: $settings.filteredTags ?? [],
    page,
  })
</script>

{#if $listing.isLoading}
  <div class="flex flex-col items-center p-32">
    <progress class="progress w-56"></progress>
    <p class="pt-2 text-sm text-base-content">Loading...</p>
  </div>
{:else if $listing.isSuccess}
  {@const { items, maxPage } = $listing.data}

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
{:else}
  <p>Failed</p>
{/if}
