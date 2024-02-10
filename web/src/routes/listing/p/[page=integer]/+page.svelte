<script lang="ts">
  import { page } from '$app/stores'

  import SearchBar from '$core/components/SearchBar.svelte'
  import Listing from '$modules/listing/components/Listing.svelte'
</script>

<svelte:head>
  <title>Listing · Riffy H</title>
</svelte:head>

<SearchBar section="listing" />

<Listing section="listing" page={Number($page.params.page)} />
