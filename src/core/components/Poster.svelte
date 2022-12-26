<script lang="ts">
  import OptimizedImage from './OptimizedImage.svelte'

  import { getImageUrl } from '../services/getImageUrl'
  import { tags } from '../../core/constants/tags'

  import type { MinifiedHentaiForListing } from '../@types/MinifiedHentaiForListing'

  export let hentai: MinifiedHentaiForListing

  const availableFlags = ['english', 'japanese', 'chinese']
  const filteredTags = tags
    .map(o => ({
      ...o,
      count: hentai.tags.find(j => j.name === o.name)?.amount ?? 0,
    }))
    .filter(o => o.count !== 0)
</script>

<article class="group relative rounded-lg overflow-hidden">
  <div
    class="absolute top-0 bottom-0 left-0 right-0 w-full transition opacity-0 hover:opacity-100 text-white flex flex-col justify-between px-4 py-8 bg-black/80"
  >
    <div>
      <div class="flex items-center pb-2 justify-between">
        {#each hentai.languages.filter( lang => availableFlags.includes(lang.name) ) as language}
          <div class="pr-2 w-10">
            <img src={`/flags/${language.name}.png`} alt={language.name} />
          </div>
        {/each}
        <div class="flex items-center">
          {hentai.num_pages ?? 0}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 pl-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            ><path
              d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"
            /><path d="M8 6h9v2H8z" /></svg
          >
        </div>
      </div>
      <p class="font-semibold truncate text-md sm:text-lg md:text-xl">
        {hentai.title}
      </p>
      <div
        class="pt-2 sm:pt-4 md:pt-6 flex justify-evenly text-center text-xs sm:text-sm md:text-md"
      >
        {#each filteredTags as filteredTag}
          <div>
            <div
              class={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${filteredTag.color} mx-auto`}
            />
            <p class="pt-0.5 md:pt-1">{filteredTag.count}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <OptimizedImage
    src={getImageUrl({
      image: hentai.images.cover,
      type: 'cover',
      mediaId: hentai.media_id,
    })}
    alt={hentai.title}
    width={hentai.images.cover.w}
    height={hentai.images.cover.h}
  />
</article>
