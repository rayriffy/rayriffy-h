<script lang="ts">
  import { page } from '$app/stores'

  import SearchBar from '$core/components/SearchBar.svelte'
  import Listing from '$modules/listing/components/Listing.svelte'
</script>

<SearchBar section="main" />

<Listing section="main" page={Number($page.params.page)} />
