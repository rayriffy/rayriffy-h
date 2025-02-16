<script lang="ts">
  import Poster from '$core/components/Poster.svelte'
  import SearchBar from '$core/components/SearchBar.svelte'
  import Pagination from '$core/components/Pagination.svelte'

  import { search } from '$nanostores/search'
  import { getCollectionListing } from '$modules/listing/services/getCollectionListing'
  import { collectionToHentai } from '$nanostores/computed/collectionToHentai'

  const onPaginate = (event: CustomEvent<{ page: number }>) => {
    search.setKey('collection', {
      ...search.get().collection,
      page: event.detail.page,
    })
  }
</script>

<svelte:head>
  <title>Collection · Riffy H</title>
</svelte:head>

<SearchBar section="collection" />

<div class="join -mb-2 px-4 pt-4">
  <a href="/collection/import" class="btn btn-sm join-item">Import</a>
  <a href="/collection/export" class="btn btn-active btn-sm join-item">Export</a>
</div>

{#await getCollectionListing($search.collection.page, $search.collection.query, $collectionToHentai)}
  <div class="flex flex-col items-center p-32">
    <progress class="progress w-56"></progress>
    <p class="pt-2 text-sm text-base-content">Loading...</p>
  </div>
{:then { items, maxPage }}
  <section class="flex justify-center py-6">
    <Pagination
      max={maxPage}
      current={$search.collection.page}
      on:paginate={onPaginate}
    />
  </section>

  <section class="grid grid-cols-2 items-center gap-4 px-4">
    {#each items as hentai (hentai.id)}
      <a href={`/g/${hentai.id}`}>
        <Poster {hentai} />
      </a>
    {/each}
  </section>

  <section class="flex justify-center py-6">
    <Pagination
      max={maxPage}
      current={$search.collection.page}
      on:paginate={onPaginate}
    />
  </section>
{:catch}
  <p>Failed</p>
{/await}
