<script lang="ts">
  import { useStore } from '$storeon'

  import Poster from '$core/components/Poster.svelte'
  import SearchBar from '$core/components/SearchBar.svelte'

  import { getCollectionListing } from '$modules/listing/services/getCollectionListing'
  import Pagination from '$core/components/Pagination.svelte'

  const { collection, search } = useStore('collection', 'search')

  let page = 1

  const onPaginate = (event: CustomEvent<{ page: number }>) => {
    page = event.detail.page
  }
</script>

<SearchBar section="collection" />

{#await getCollectionListing( page, $search.collection, $collection.data.map(o => o.data) )}
  <div class="p-32 flex flex-col items-center">
    <progress class="progress w-56" />
    <p class="text-base-content text-sm pt-2">Loading...</p>
  </div>
{:then { items, maxPage }}
  <section class="flex justify-center py-6">
    <Pagination max={maxPage} current={page} on:paginate={onPaginate} />
  </section>

  <section class="grid grid-cols-2 gap-4 items-center px-4">
    {#each items as hentai (hentai.id)}
      <a href={`/g/${hentai.id}`}>
        <Poster {hentai} />
      </a>
    {/each}
  </section>

  <section class="flex justify-center py-6">
    <Pagination max={maxPage} current={page} on:paginate={onPaginate} />
  </section>
{:catch}
  <p>Failed</p>
{/await}
