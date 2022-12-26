<script lang="ts">
  import PageRenderer from '../../../modules/reader/PageRenderer.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1>{JSON.stringify(data)}</h1>
{#if data.hentai}
  <PageRenderer
    pages={data.hentai.images.pages}
    mediaId={data.hentai.media_id}
    excludes={data.excludes}
  />
{/if}
