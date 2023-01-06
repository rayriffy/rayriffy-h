<script lang="ts">
  import BlurredImage from '../../core/components/BlurredImage.svelte'
  import { getImageUrl } from '../../core/services/getImageUrl'

  import type { Image } from '../../core/@types/Image'

  export let pages: Image[]
  export let mediaId: string
  export let excludes: number[]
</script>

<section>
  {#each pages as page, i}
    {#if !excludes.includes(i + 1)}
      <BlurredImage
        src={getImageUrl({
          image: page,
          mediaId: mediaId,
          page: i + 1,
          type: 'gallery',
        })}
        width={page.w}
        height={page.h}
        alt={`page ${i + 1}`}
      />
    {/if}
  {/each}
</section>
