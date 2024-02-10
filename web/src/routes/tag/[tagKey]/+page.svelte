<script>
  import { page } from '$app/stores'

  import Listing from '$modules/listing/components/Listing.svelte'
</script>

<svelte:head>
  <title>Tag · Riffy H</title>
</svelte:head>

<Listing section="tag" tagKey={$page.params.tagKey} page={1} />
