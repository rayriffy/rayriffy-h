<script lang="ts">
  import SearchBar from '$core/components/SearchBar.svelte'
  import Listing from '$modules/listing/components/Listing.svelte'
</script>

<svelte:head>
  <title>Riffy H</title>
</svelte:head>

<SearchBar section="main" />

<Listing section="main" page={1} />
