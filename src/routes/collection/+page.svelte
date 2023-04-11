<script lang="ts">
  import { useStore } from '$storeon'

  import Poster from '$core/components/Poster.svelte'
  import SearchBar from '$core/components/SearchBar.svelte'

  import { getCollectionListing } from '$modules/listing/services/getCollectionListing'
  import Pagination from '$core/components/Pagination.svelte'

  const { collection, search, dispatch } = useStore('collection', 'search')

  const onPaginate = (event: CustomEvent<{ page: number }>) => {
    dispatch('search/query', {
      target: 'collection',
      page: event.detail.page,
    })
  }
</script>

<svelte:head>
  <title>Collection · Riffy H</title>
</svelte:head>

<SearchBar section="collection" />

<div class="btn-group -mb-2 px-4 pt-4">
  <a href="/collection/import" class="btn-sm btn">Import</a>
  <a href="/collection/export" class="btn-active btn-sm btn">Export</a>
</div>

{#await getCollectionListing( $search.collection.page, $search.collection.query, $collection.data.map(o => o.data) )}
  <div class="flex flex-col items-center p-32">
    <progress class="progress w-56" />
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
