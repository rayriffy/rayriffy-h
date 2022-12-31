<script>
  import { page } from '$app/stores'

  import Listing from '$modules/listing/components/Listing.svelte'
</script>

<Listing section="tag" tagKey={$page.params.tagKey} page={1} />
