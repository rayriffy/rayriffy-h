<script lang="ts">
  import BlurredImage from './BlurredImage.svelte'

  import { getImageUrl } from '@riffyh/commons'

  import type { MinifiedHentaiForListing } from '../@types/MinifiedHentaiForListing'

  export let hentai: MinifiedHentaiForListing

  const availableFlags = ['english', 'japanese', 'chinese']
</script>

<article class="group relative">
  <div class="overflow-hidden rounded-xl shadow-md">
    <BlurredImage
      src={getImageUrl({
        image: hentai.images.cover,
        type: 'cover',
        mediaId: hentai.media_id,
      })}
      alt={hentai.title}
      width={hentai.images.cover.w}
      height={hentai.images.cover.h}
    />
  </div>
  <section class="mt-3">
    <div class="flex items-center space-x-2">
      {#each hentai.languages.filter( lang => availableFlags.includes(lang.name) ) as language}
        <img
          src={`/flags/${language.name}.png`}
          alt={language.name}
          class="h-5"
        />
      {/each}
      <p class="truncate font-medium text-base-content">
        {hentai.title}
      </p>
    </div>
  </section>
</article>
